"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2942],{40488:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var o=t(85893),r=t(11151);const s={},a="ADR 011: ICS-20 transfer state entry for total amount of tokens in escrow",i={id:"adr-011-transfer-total-escrow-state-entry",title:"ADR 011: ICS-20 transfer state entry for total amount of tokens in escrow",description:"Changelog",source:"@site/architecture/adr-011-transfer-total-escrow-state-entry.md",sourceDirName:".",slug:"/adr-011-transfer-total-escrow-state-entry",permalink:"/architecture/adr-011-transfer-total-escrow-state-entry",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"ADR 010: IBC light clients as SDK modules",permalink:"/architecture/adr-010-light-clients-as-sdk-modules"},next:{title:"ADR 015: IBC Packet Receiver",permalink:"/architecture/adr-015-ibc-packet-receiver"}},c={},l=[{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"State entry denom -&gt; amount",id:"state-entry-denom---amount",level:3},{value:"Panic if amount is negative",id:"panic-if-amount-is-negative",level:3},{value:"Delete state entry if amount is zero",id:"delete-state-entry-if-amount-is-zero",level:3},{value:"Bundle escrow/unescrow with setting state entry",id:"bundle-escrowunescrow-with-setting-state-entry",level:3},{value:"gRPC query endpoint and CLI to retrieve amount",id:"grpc-query-endpoint-and-cli-to-retrieve-amount",level:3},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"adr-011-ics-20-transfer-state-entry-for-total-amount-of-tokens-in-escrow",children:"ADR 011: ICS-20 transfer state entry for total amount of tokens in escrow"}),"\n",(0,o.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"2023-05-24: Initial draft"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,o.jsx)(n.p,{children:"Accepted and applied in v7.1 of ibc-go"}),"\n",(0,o.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,o.jsx)(n.p,{children:"Every ICS-20 transfer channel has its own escrow bank account. This account is used to lock tokens that are transferred out of a chain that acts as the source of the tokens (i.e. when the tokens being transferred have not returned to the originating chain). This design makes it easy to query the balance of the escrow accounts and find out the total amount of tokens in escrow in a particular channel. However, there are use cases where it would be useful to determine the total escrowed amount of a given denomination across all channels where those tokens have been transferred out."}),"\n",(0,o.jsx)(n.p,{children:"For example: assuming that there are three channels between Cosmos Hub to Osmosis and 10 ATOM have been transferred from the Cosmos Hub to Osmosis on each of those channels, then we would like to know that 30 ATOM have been transferred (i.e. are locked in the escrow accounts of each channel) without needing to iterate over each escrow account to add up the balances of each."}),"\n",(0,o.jsxs)(n.p,{children:["For a sample use case where this feature would be useful, please refer to Osmosis' rate limiting use case described in ",(0,o.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/issues/2664",children:"#2664"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,o.jsx)(n.h3,{id:"state-entry-denom---amount",children:"State entry denom -> amount"}),"\n",(0,o.jsxs)(n.p,{children:["The total amount of tokens in escrow (across all transfer channels) for a given denomination is stored in state in an entry keyed by the denomination: ",(0,o.jsx)(n.code,{children:"totalEscrowForDenom/{denom}"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"panic-if-amount-is-negative",children:"Panic if amount is negative"}),"\n",(0,o.jsx)(n.p,{children:"If a negative amount is ever attempted to be stored, then the keeper function will panic:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go",children:'if coin.Amount.IsNegative() {\n  panic(fmt.Sprintf("amount cannot be negative: %s", coin.Amount))\n}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"delete-state-entry-if-amount-is-zero",children:"Delete state entry if amount is zero"}),"\n",(0,o.jsxs)(n.p,{children:["When setting the amount for a particular denomination, the value might be zero if all tokens that were transferred out of the chain have been transferred back. If this happens, then the state entry for this particular denomination will be deleted, since Cosmos SDK's ",(0,o.jsx)(n.code,{children:"x/bank"})," module prunes any non-zero balances:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go",children:"if coin.Amount.IsZero() {\n  store.Delete(key) // delete the key since Cosmos SDK x/bank module will prune any non-zero balances\n  return\n}\n"})}),"\n",(0,o.jsx)(n.h3,{id:"bundle-escrowunescrow-with-setting-state-entry",children:"Bundle escrow/unescrow with setting state entry"}),"\n",(0,o.jsx)(n.p,{children:"Two new functions are implemented that bundle together the operations of escrowing/unescrowing and setting the total escrow amount in state, since these operations need to be executed together."}),"\n",(0,o.jsx)(n.p,{children:"For escrowing tokens:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go",children:"// escrowToken will send the given token from the provided sender to the escrow address. It will also\n// update the total escrowed amount by adding the escrowed token to the current total escrow.\nfunc (k Keeper) escrowToken(ctx sdk.Context, sender, escrowAddress sdk.AccAddress, token sdk.Coin) error {\n  if err := k.bankKeeper.SendCoins(ctx, sender, escrowAddress, sdk.NewCoins(token)); err != nil {\n    // failure is expected for insufficient balances\n    return err\n  }\n\n  // track the total amount in escrow keyed by denomination to allow for efficient iteration\n  currentTotalEscrow := k.GetTotalEscrowForDenom(ctx, token.GetDenom())\n  newTotalEscrow := currentTotalEscrow.Add(token)\n  k.SetTotalEscrowForDenom(ctx, newTotalEscrow)\n\n  return nil\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"For unescrowing tokens:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go",children:'// unescrowToken will send the given token from the escrow address to the provided receiver. It will also\n// update the total escrow by deducting the unescrowed token from the current total escrow.\nfunc (k Keeper) unescrowToken(ctx sdk.Context, escrowAddress, receiver sdk.AccAddress, token sdk.Coin) error {\n  if err := k.bankKeeper.SendCoins(ctx, escrowAddress, receiver, sdk.NewCoins(token)); err != nil {\n    // NOTE: this error is only expected to occur given an unexpected bug or a malicious\n    // counterparty module. The bug may occur in bank or any part of the code that allows\n    // the escrow address to be drained. A malicious counterparty module could drain the\n    // escrow address by allowing more tokens to be sent back then were escrowed.\n    return errorsmod.Wrap(err, "unable to unescrow tokens, this may be caused by a malicious counterparty module or a bug: please open an issue on counterparty module")\n  }\n\n  // track the total amount in escrow keyed by denomination to allow for efficient iteration\n  currentTotalEscrow := k.GetTotalEscrowForDenom(ctx, token.GetDenom())\n  newTotalEscrow := currentTotalEscrow.Sub(token)\n  k.SetTotalEscrowForDenom(ctx, newTotalEscrow)\n\n  return nil\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["When tokens need to be escrowed in ",(0,o.jsx)(n.code,{children:"sendTransfer"}),", then ",(0,o.jsx)(n.code,{children:"escrowToken"})," is called; when tokens need to be unescrowed on execution of the ",(0,o.jsx)(n.code,{children:"OnRecvPacket"}),", ",(0,o.jsx)(n.code,{children:"OnAcknowledgementPacket"})," or ",(0,o.jsx)(n.code,{children:"OnTimeoutPacket"})," callbacks, then ",(0,o.jsx)(n.code,{children:"unescrowToken"})," is called."]}),"\n",(0,o.jsx)(n.h3,{id:"grpc-query-endpoint-and-cli-to-retrieve-amount",children:"gRPC query endpoint and CLI to retrieve amount"}),"\n",(0,o.jsx)(n.p,{children:"A gRPC query endpoint is added so that it is possible to retrieve the total amount for a given denomination:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-proto",children:'// TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom.\nrpc TotalEscrowForDenom(QueryTotalEscrowForDenomRequest) returns (QueryTotalEscrowForDenomResponse) {\n  option (google.api.http).get = "/ibc/apps/transfer/v1/denoms/{denom=**}/total_escrow";\n}\n\n// QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method.\nmessage QueryTotalEscrowForDenomRequest {\n  string denom = 1;\n}\n\n// QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method.\nmessage QueryTotalEscrowForDenomResponse {\n  cosmos.base.v1beta1.Coin amount = 1 [(gogoproto.nullable) = false];\n}\n'})}),"\n",(0,o.jsx)(n.p,{children:"And a CLI query is also available to retrieve the total amount via the command line:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"query ibc-transfer total-escrow [denom]\n"})}),"\n",(0,o.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,o.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Possibility to retrieve the total amount of a particular denomination in escrow across all transfer channels without iteration."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,o.jsx)(n.p,{children:"No notable consequences"}),"\n",(0,o.jsx)(n.h3,{id:"neutral",children:"Neutral"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"A new entry is added to state for every denomination that is transferred out of the chain."}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,o.jsx)(n.p,{children:"Issues:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/issues/2664",children:"#2664"})}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"PRs:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/3019",children:"#3019"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/3558",children:"#3558"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>a});var o=t(67294);const r={},s=o.createContext(r);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);