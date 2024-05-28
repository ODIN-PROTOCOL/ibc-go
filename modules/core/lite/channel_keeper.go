package lite

import (
	"bytes"

	errorsmod "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"
	clienttypes "github.com/cosmos/ibc-go/v8/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v8/modules/core/04-channel/types"
	commitmenttypes "github.com/cosmos/ibc-go/v8/modules/core/23-commitment/types"
	host "github.com/cosmos/ibc-go/v8/modules/core/24-host"
	"github.com/cosmos/ibc-go/v8/modules/core/exported"
	"github.com/cosmos/ibc-go/v8/modules/core/lite/types"
)

type ChannelKeeper struct {
	cdc          codec.BinaryCodec
	keeper       types.IBCLiteKeeper
	clientRouter types.ClientRouter
}

func NewChannelKeeper(cdc codec.BinaryCodec, keeper types.IBCLiteKeeper, clientRouter types.ClientRouter) *ChannelKeeper {
	return &ChannelKeeper{
		cdc:          cdc,
		keeper:       keeper,
		clientRouter: clientRouter,
	}
}

// Keeper will implement the expected interface of ChannelKeeper
// for keeper.Keeper so that the standard message server can implement
// IBC Lite without major changes to its structure

func (ck ChannelKeeper) SendPacket(
	ctx sdk.Context,
	_ *capabilitytypes.Capability,
	sourcePort string,
	sourceChannel string,
	destPort string,
	destChannel string,
	timeoutHeight clienttypes.Height,
	timeoutTimestamp uint64,
	data []byte,
) (uint64, error) {
	// Get LightClientModule associated with the destination channel
	// Note: This can be implemented by the current clientRouter
	lightClientModule, ok := ck.clientRouter.GetRoute(sourceChannel)
	if !ok {
		return 0, clienttypes.ErrClientNotFound
	}

	// Lookup counterparty associated with our channel and ensure that it was packet was indeed
	// sent by our counterparty.
	// Note: This can be implemented by the current keeper
	// TODO: Use context instead of sdk.Context eventually
	counterpartyClientID := ck.keeper.GetCounterparty(ctx, sourceChannel)
	if counterpartyClientID == "" {
		return 0, channeltypes.ErrChannelNotFound
	}

	if counterpartyClientID != destChannel {
		return 0, channeltypes.ErrInvalidChannelIdentifier
	}

	sequence, found := ck.keeper.GetNextSequenceSend(ctx, sourcePort, sourceChannel)
	if !found {
		sequence = 1
	}

	// construct packet from given fields and channel state
	packet := channeltypes.NewPacket(data, sequence, sourcePort, sourceChannel,
		destPort, destChannel, timeoutHeight, timeoutTimestamp)

	if err := packet.ValidateBasic(); err != nil {
		return 0, errorsmod.Wrap(err, "constructed packet failed basic validation")
	}

	latestHeight, ok := lightClientModule.LatestHeight(ctx, sourceChannel).(clienttypes.Height)
	if !ok {
		return 0, errorsmod.Wrapf(clienttypes.ErrInvalidHeight, "latest height of client (%s) is not a %T", sourceChannel, (*clienttypes.Height)(nil))
	}
	if latestHeight.IsZero() {
		return 0, errorsmod.Wrapf(clienttypes.ErrInvalidHeight, "cannot send packet using client (%s) with zero height", sourceChannel)
	}

	latestTimestamp, err := lightClientModule.TimestampAtHeight(ctx, sourceChannel, latestHeight)
	if err != nil {
		return 0, err
	}

	// check if packet is timed out on the receiving chain
	timeout := channeltypes.NewTimeout(packet.GetTimeoutHeight().(clienttypes.Height), packet.GetTimeoutTimestamp())
	if timeout.Elapsed(latestHeight, latestTimestamp) {
		return 0, errorsmod.Wrap(timeout.ErrTimeoutElapsed(latestHeight, latestTimestamp), "invalid packet timeout")
	}

	commitment := channeltypes.CommitLitePacket(ck.cdc, packet)

	ck.keeper.SetNextSequenceSend(ctx, sourcePort, sourceChannel, sequence+1)
	ck.keeper.SetPacketCommitment(ctx, sourcePort, sourceChannel, packet.GetSequence(), commitment)
	return packet.Sequence, nil
}

func (ck ChannelKeeper) RecvPacket(
	ctx sdk.Context,
	_ *capabilitytypes.Capability,
	packet channeltypes.Packet,
	proof []byte,
	proofHeight exported.Height,
) error {
	// Lookup counterparty associated with our channel and ensure that it was packet was indeed
	// sent by our counterparty.
	// Note: This can be implemented by the current keeper
	// TODO: Use context instead of sdk.Context eventually
	counterpartyClientID := ck.keeper.GetCounterparty(ctx, packet.DestinationChannel)
	if counterpartyClientID == "" {
		return channeltypes.ErrChannelNotFound
	}

	if counterpartyClientID != packet.SourceChannel {
		return channeltypes.ErrInvalidChannelIdentifier
	}

	// create key/value pair for proof verification
	merklePath := commitmenttypes.NewMerklePath(host.PacketCommitmentPath(packet.SourcePort, packet.SourceChannel, packet.Sequence))
	// TODO: allow for custom prefix
	merklePath, err := commitmenttypes.ApplyPrefix(commitmenttypes.NewMerklePrefix([]byte(exported.StoreKey)), merklePath)
	if err != nil {
		return err
	}

	commitment := channeltypes.CommitLitePacket(ck.cdc, packet)

	// Get LightClientModule associated with the destination channel
	// Note: This can be implemented by the current clientRouter
	lightClientModule, ok := ck.clientRouter.GetRoute(packet.DestinationChannel)
	if !ok {
		return clienttypes.ErrClientNotFound
	}

	// TODO: Use context instead of sdk.Context eventually
	if err := lightClientModule.VerifyMembership(
		ctx,
		packet.DestinationChannel,
		proofHeight,
		0, 0,
		proof,
		merklePath,
		commitment,
	); err != nil {
		return err
	}

	// Set Packet Receipt to prevent timeout from occurring on counterparty
	ck.keeper.SetPacketReceipt(ctx, packet.DestinationPort, packet.DestinationChannel, packet.Sequence)
	return nil
}

func (ck ChannelKeeper) WriteAcknowledgement(
	ctx sdk.Context,
	_ *capabilitytypes.Capability,
	packet exported.PacketI,
	ack exported.Acknowledgement,
) error {
	// Lookup counterparty associated with our channel and ensure that it was packet was indeed
	// sent by our counterparty.
	// Note: This can be implemented by the current keeper
	// Can be implemented by current keeper with change in sdk.Context to context.Context
	ackHash := channeltypes.CommitAcknowledgement(ack.Acknowledgement())
	ck.keeper.SetPacketAcknowledgement(ctx, packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence(), ackHash)
	return nil
}

func (ck ChannelKeeper) AcknowledgePacket(
	ctx sdk.Context,
	_ *capabilitytypes.Capability,
	packet channeltypes.Packet,
	acknowledgement []byte,
	proofAcked []byte,
	proofHeight exported.Height,
) error {
	// Lookup counterparty associated with our channel and ensure that it was packet was indeed
	// sent by our counterparty.
	// Note: This can be implemented by the current keeper
	// TODO: Use context instead of sdk.Context eventually
	counterpartyClientID := ck.keeper.GetCounterparty(ctx, packet.SourceChannel)
	if counterpartyClientID == "" {
		return channeltypes.ErrChannelNotFound
	}

	if counterpartyClientID != packet.DestinationChannel {
		return channeltypes.ErrInvalidChannelIdentifier
	}

	commitment := ck.keeper.GetPacketCommitment(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
	if len(commitment) == 0 {
		// TODO: events
		// emitAcknowledgePacketEvent(ctx, packet, channel)

		// This error indicates that the acknowledgement has already been relayed
		// or there is a misconfigured relayer attempting to prove an acknowledgement
		// for a packet never sent. Core IBC will treat this error as a no-op in order to
		// prevent an entire relay transaction from failing and consuming unnecessary fees.
		return channeltypes.ErrNoOpMsg
	}

	packetCommitment := channeltypes.CommitLitePacket(ck.cdc, packet)

	// verify we sent the packet and haven't cleared it out yet
	if !bytes.Equal(commitment, packetCommitment) {
		return errorsmod.Wrapf(channeltypes.ErrInvalidPacket, "commitment bytes are not equal: got (%v), expected (%v)", packetCommitment, commitment)
	}

	merklePath := commitmenttypes.NewMerklePath(host.PacketAcknowledgementPath(packet.DestinationPort, packet.DestinationChannel, packet.Sequence))
	// TODO: allow for custom prefix
	merklePath, err := commitmenttypes.ApplyPrefix(commitmenttypes.NewMerklePrefix([]byte(exported.StoreKey)), merklePath)
	if err != nil {
		return err
	}

	// Get LightClientModule associated with the destination channel
	// Note: This can be implemented by the current clientRouter
	lightClientModule, ok := ck.clientRouter.GetRoute(packet.SourceChannel)
	if !ok {
		return clienttypes.ErrClientNotFound
	}
	// TODO: Use context instead of sdk.Context eventually
	if err := lightClientModule.VerifyMembership(
		ctx,
		packet.SourceChannel,
		proofHeight,
		0, 0,
		proofAcked,
		merklePath,
		channeltypes.CommitAcknowledgement(acknowledgement),
	); err != nil {
		return err
	}

	ck.keeper.DeletePacketCommitment(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
	return nil
}

func (ck ChannelKeeper) TimeoutPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	proofTimeout []byte,
	proofHeight exported.Height,
	_ uint64,
) error {
	// Lookup counterparty associated with our channel and ensure that it was packet was indeed
	// sent by our counterparty.
	// Note: This can be implemented by the current keeper
	// TODO: Use context instead of sdk.Context eventually
	counterpartyClientID := ck.keeper.GetCounterparty(ctx, packet.SourceChannel)
	if counterpartyClientID == "" {
		return channeltypes.ErrChannelNotFound
	}

	if counterpartyClientID != packet.DestinationChannel {
		return channeltypes.ErrInvalidChannelIdentifier
	}

	// TODO: Use context instead of sdk.Context eventually
	commitment := ck.keeper.GetPacketCommitment(ctx, packet.SourcePort, packet.SourceChannel, packet.Sequence)
	if len(commitment) == 0 {
		// TODO: events
		// emitTimeoutPacketEvent(ctx, packet, channel)

		// This error indicates that the timeout has already been relayed
		// or there is a misconfigured relayer attempting to prove a timeout
		// for a packet never sent. Core IBC will treat this error as a no-op in order to
		// prevent an entire relay transaction from failing and consuming unnecessary fees.
		return channeltypes.ErrNoOpMsg
	}

	packetCommitment := channeltypes.CommitLitePacket(ck.cdc, packet)

	// verify we sent the packet and haven't cleared it out yet
	if !bytes.Equal(commitment, packetCommitment) {
		return errorsmod.Wrapf(channeltypes.ErrInvalidPacket, "packet commitment bytes are not equal: got (%v), expected (%v)", commitment, packetCommitment)
	}

	merklePath := commitmenttypes.NewMerklePath(host.PacketReceiptPath(packet.DestinationPort, packet.DestinationChannel, packet.Sequence))
	// TODO: allow for custom prefix
	merklePath, err := commitmenttypes.ApplyPrefix(commitmenttypes.NewMerklePrefix([]byte(exported.StoreKey)), merklePath)
	if err != nil {
		return err
	}

	// Get LightClientModule associated with the destination channel
	// Note: This can be implemented by the current clientRouter
	lightClientModule, ok := ck.clientRouter.GetRoute(packet.SourceChannel)
	if !ok {
		return clienttypes.ErrClientNotFound
	}
	// TODO: Use context instead of sdk.Context eventually
	if err := lightClientModule.VerifyNonMembership(
		ctx,
		packet.DestinationChannel,
		proofHeight,
		0, 0,
		proofTimeout,
		merklePath,
	); err != nil {
		return err
	}

	// TODO: Use context instead of sdk.Context eventually
	ck.keeper.DeletePacketCommitment(ctx, packet.SourcePort, packet.SourceChannel, packet.Sequence)

	// TODO: emit an event marking that we have processed the timeout
	// emitTimeoutPacketEvent(ctx, packet, channel)
	return nil
}