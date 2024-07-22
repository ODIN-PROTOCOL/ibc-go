"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4104],{20813:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>n,metadata:()=>r,toc:()=>c});var s=i(85893),o=i(11151);const n={title:"Roadmap",sidebar_label:"Roadmap",sidebar_position:9,slug:"/roadmap/roadmap"},a="Roadmap ibc-go",r={id:"ibc/roadmap",title:"Roadmap",description:"Lastest update: December 21st, 2022",source:"@site/versioned_docs/version-v7.6.x/01-ibc/09-roadmap.md",sourceDirName:"01-ibc",slug:"/roadmap/roadmap",permalink:"/v7/roadmap/roadmap",draft:!1,unlisted:!1,tags:[],version:"v7.6.x",sidebarPosition:9,frontMatter:{title:"Roadmap",sidebar_label:"Roadmap",sidebar_position:9,slug:"/roadmap/roadmap"},sidebar:"defaultSidebar",previous:{title:"Protobuf Documentation",permalink:"/v7/ibc/proto-docs"},next:{title:"Troubleshooting",permalink:"/v7/ibc/troubleshooting"}},l={},c=[{value:"v7.0.0",id:"v700",level:2},{value:"02-client refactor",id:"02-client-refactor",level:3},{value:"Upgrade Cosmos SDK v0.47",id:"upgrade-cosmos-sdk-v047",level:3},{value:"Add <code>authz</code> support to 20-transfer",id:"add-authz-support-to-20-transfer",level:3},{value:"v7.1.0",id:"v710",level:2},{value:"Localhost connection",id:"localhost-connection",level:3},{value:"Support for Wasm light clients",id:"support-for-wasm-light-clients",level:3},{value:"v8.0.0",id:"v800",level:2},{value:"Channel upgradability",id:"channel-upgradability",level:3},{value:"Path unwinding",id:"path-unwinding",level:3}];function h(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",p:"p",strong:"strong",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"roadmap-ibc-go",children:"Roadmap ibc-go"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Lastest update: December 21st, 2022"})}),"\n",(0,s.jsx)(t.p,{children:"This document endeavours to inform the wider IBC community about plans and priorities for work on ibc-go by the team at Interchain GmbH. It is intended to broadly inform all users of ibc-go, including developers and operators of IBC, relayer, chain and wallet applications."}),"\n",(0,s.jsxs)(t.p,{children:["This roadmap should be read as a high-level guide, rather than a commitment to schedules and deliverables. The degree of specificity is inversely proportional to the timeline. We will update this document periodically to reflect the status and plans. For the latest expected release timelines, please check ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/wiki/Release-timeline",children:"here"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"v700",children:"v7.0.0"}),"\n",(0,s.jsx)(t.h3,{id:"02-client-refactor",children:"02-client refactor"}),"\n",(0,s.jsxs)(t.p,{children:["This refactor will make the development of light clients easier. The ibc-go implementation will finally align with the spec and light clients will be required to set their own client and consensus states. This will allow more flexibility for light clients to manage their own internal storage and do batch updates. See ",(0,s.jsx)(t.a,{href:"/architecture/adr-006-02-client-refactor",children:"ADR 006"})," for more information."]}),"\n",(0,s.jsxs)(t.p,{children:["Follow the progress with the ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/milestone/25",children:"beta"})," and ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/milestone/27",children:"RC"})," milestones or in the ",(0,s.jsx)(t.a,{href:"https://github.com/orgs/cosmos/projects/7/views/14",children:"project board"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"upgrade-cosmos-sdk-v047",children:"Upgrade Cosmos SDK v0.47"}),"\n",(0,s.jsxs)(t.p,{children:["Follow the progress with the ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/milestone/36",children:"milestone"}),"."]}),"\n",(0,s.jsxs)(t.h3,{id:"add-authz-support-to-20-transfer",children:["Add ",(0,s.jsx)(t.code,{children:"authz"})," support to 20-transfer"]}),"\n",(0,s.jsxs)(t.p,{children:["Authz goes cross chain: users can grant permission for their tokens to be transferred to another chain on their behalf. See ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/2431",children:"this issue"})," for more details."]}),"\n",(0,s.jsx)(t.h2,{id:"v710",children:"v7.1.0"}),"\n",(0,s.jsxs)(t.p,{children:["Because it is so important to have an ibc-go release compatible with the latest Cosmos SDK release, a couple of features will take a little longer and be released in ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/milestone/37",children:"v7.1.0"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"localhost-connection",children:"Localhost connection"}),"\n",(0,s.jsx)(t.p,{children:"This feature will add support for applications on a chain to communicate with applications on the same chain using the existing standard interface to communicate with applications on remote chains. This is a powerful UX improvement, particularly for those users interested in interacting with multiple smart contracts on a single chain through one interface."}),"\n",(0,s.jsxs)(t.p,{children:["For more details, see the design proposal and discussion ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/discussions/2191",children:"here"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"A special shout out to Strangelove for their substantial contribution on this feature."}),"\n",(0,s.jsx)(t.h3,{id:"support-for-wasm-light-clients",children:"Support for Wasm light clients"}),"\n",(0,s.jsx)(t.p,{children:"We will add support for Wasm light clients. The first Wasm client developed with ibc-go/v7 02-client refactor and stored as Wasm bytecode will be the GRANDPA light client used for Cosmos x Substrate IBC connections. This feature will be used also for a NEAR light client in the future."}),"\n",(0,s.jsx)(t.p,{children:"This feature was developed by Composable and Strangelove but will be upstreamed into ibc-go."}),"\n",(0,s.jsx)(t.h2,{id:"v800",children:"v8.0.0"}),"\n",(0,s.jsx)(t.h3,{id:"channel-upgradability",children:"Channel upgradability"}),"\n",(0,s.jsx)(t.p,{children:"Channel upgradability will allow chains to renegotiate an existing channel to take advantage of new features without having to create a new channel, thus preserving all existing packet state processed on the channel."}),"\n",(0,s.jsxs)(t.p,{children:["Follow the progress with the ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/milestone/29",children:"alpha milestone"})," or the ",(0,s.jsx)(t.a,{href:"https://github.com/orgs/cosmos/projects/7/views/17",children:"project board"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"path-unwinding",children:"Path unwinding"}),"\n",(0,s.jsx)(t.p,{children:"This feature will allow tokens with non-native denoms to be sent back automatically to their native chains before being sent to a final destination chain. This will allow tokens to reach a final destination with the least amount possible of hops from their native chain."}),"\n",(0,s.jsxs)(t.p,{children:["For more details, see this ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc/discussions/824",children:"discussion"}),"."]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.p,{children:["This roadmap is also available as a ",(0,s.jsx)(t.a,{href:"https://github.com/orgs/cosmos/projects/7/views/25",children:"project board"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["For the latest expected release timelines, please check ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/wiki/Release-timeline",children:"here"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["For the latest information on the progress of the work or the decisions made that might influence the roadmap, please follow our ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/wiki/Engineering-updates",children:"engineering updates"}),"."]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Note"}),": release version numbers may be subject to change."]})]})}function d(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>r,a:()=>a});var s=i(67294);const o={},n=s.createContext(o);function a(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);