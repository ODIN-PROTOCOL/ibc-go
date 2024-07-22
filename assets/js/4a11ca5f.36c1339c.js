"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3040],{45097:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>j,frontMatter:()=>d,metadata:()=>i,toc:()=>h});var n=t(85893),r=t(11151);const d={title:"Events",sidebar_label:"Events",sidebar_position:5,slug:"/apps/transfer/events"},c="Events",i={id:"apps/transfer/events",title:"Events",description:"MsgTransfer",source:"@site/docs/02-apps/01-transfer/05-events.md",sourceDirName:"02-apps/01-transfer",slug:"/apps/transfer/events",permalink:"/main/apps/transfer/events",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Events",sidebar_label:"Events",sidebar_position:5,slug:"/apps/transfer/events"},sidebar:"defaultSidebar",previous:{title:"Messages",permalink:"/main/apps/transfer/messages"},next:{title:"Metrics",permalink:"/main/apps/transfer/metrics"}},l={},h=[{value:"<code>MsgTransfer</code>",id:"msgtransfer",level:2},{value:"<code>OnRecvPacket</code> callback",id:"onrecvpacket-callback",level:2},{value:"<code>OnAcknowledgePacket</code> callback",id:"onacknowledgepacket-callback",level:2},{value:"<code>OnTimeoutPacket</code> callback",id:"ontimeoutpacket-callback",level:2}];function a(e){const s={code:"code",h1:"h1",h2:"h2",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"events",children:"Events"}),"\n",(0,n.jsx)(s.h2,{id:"msgtransfer",children:(0,n.jsx)(s.code,{children:"MsgTransfer"})}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Attribute Key"}),(0,n.jsx)(s.th,{children:"Attribute Value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ibc_transfer"}),(0,n.jsx)(s.td,{children:"sender"}),(0,n.jsx)(s.td,{children:"{sender}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ibc_transfer"}),(0,n.jsx)(s.td,{children:"receiver"}),(0,n.jsx)(s.td,{children:"{receiver}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ibc_transfer"}),(0,n.jsx)(s.td,{children:"tokens"}),(0,n.jsx)(s.td,{children:"{jsonTokens}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ibc_transfer"}),(0,n.jsx)(s.td,{children:"memo"}),(0,n.jsx)(s.td,{children:"{memo}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"ibc_transfer"}),(0,n.jsx)(s.td,{children:"forwarding_hops"}),(0,n.jsx)(s.td,{children:"{jsonForwardingHops}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"message"}),(0,n.jsx)(s.td,{children:"module"}),(0,n.jsx)(s.td,{children:"transfer"})]})]})]}),"\n",(0,n.jsxs)(s.h2,{id:"onrecvpacket-callback",children:[(0,n.jsx)(s.code,{children:"OnRecvPacket"})," callback"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Attribute Key"}),(0,n.jsx)(s.th,{children:"Attribute Value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"sender"}),(0,n.jsx)(s.td,{children:"{sender}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"receiver"}),(0,n.jsx)(s.td,{children:"{receiver}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"tokens"}),(0,n.jsx)(s.td,{children:"{jsonTokens}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"memo"}),(0,n.jsx)(s.td,{children:"{memo}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"forwarding_hops"}),(0,n.jsx)(s.td,{children:"{jsonForwardingHops}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"success"}),(0,n.jsx)(s.td,{children:"{ackSuccess}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"error"}),(0,n.jsx)(s.td,{children:"{ackError}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"denomination"}),(0,n.jsx)(s.td,{children:"trace_hash"}),(0,n.jsx)(s.td,{children:"{hex_hash}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"denomination"}),(0,n.jsx)(s.td,{children:"denom"}),(0,n.jsx)(s.td,{children:"{jsonDenom}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"message"}),(0,n.jsx)(s.td,{children:"module"}),(0,n.jsx)(s.td,{children:"transfer"})]})]})]}),"\n",(0,n.jsxs)(s.h2,{id:"onacknowledgepacket-callback",children:[(0,n.jsx)(s.code,{children:"OnAcknowledgePacket"})," callback"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Attribute Key"}),(0,n.jsx)(s.th,{children:"Attribute Value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"sender"}),(0,n.jsx)(s.td,{children:"{sender}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"receiver"}),(0,n.jsx)(s.td,{children:"{receiver}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"tokens"}),(0,n.jsx)(s.td,{children:"{jsonTokens}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"memo"}),(0,n.jsx)(s.td,{children:"{memo}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"forwarding_hops"}),(0,n.jsx)(s.td,{children:"{jsonForwardingHops}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"acknowledgement"}),(0,n.jsx)(s.td,{children:"{ack.String()}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"fungible_token_packet"}),(0,n.jsx)(s.td,{children:"success / error"}),(0,n.jsx)(s.td,{children:"{ack.Response}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"message"}),(0,n.jsx)(s.td,{children:"module"}),(0,n.jsx)(s.td,{children:"transfer"})]})]})]}),"\n",(0,n.jsxs)(s.h2,{id:"ontimeoutpacket-callback",children:[(0,n.jsx)(s.code,{children:"OnTimeoutPacket"})," callback"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Type"}),(0,n.jsx)(s.th,{children:"Attribute Key"}),(0,n.jsx)(s.th,{children:"Attribute Value"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"timeout"}),(0,n.jsx)(s.td,{children:"refund_receiver"}),(0,n.jsx)(s.td,{children:"{receiver}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"timeout"}),(0,n.jsx)(s.td,{children:"refund_tokens"}),(0,n.jsx)(s.td,{children:"{jsonTokens}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"timeout"}),(0,n.jsx)(s.td,{children:"memo"}),(0,n.jsx)(s.td,{children:"{memo}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"timeout"}),(0,n.jsx)(s.td,{children:"forwarding_hops"}),(0,n.jsx)(s.td,{children:"{jsonForwardingHops}"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"message"}),(0,n.jsx)(s.td,{children:"module"}),(0,n.jsx)(s.td,{children:"transfer"})]})]})]})]})}function j(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>i,a:()=>c});var n=t(67294);const r={},d=n.createContext(r);function c(e){const s=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(d.Provider,{value:s},e.children)}}}]);