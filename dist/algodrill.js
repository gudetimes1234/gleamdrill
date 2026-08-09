class I{withFields(G){let Y=Object.keys(this).map((W)=>(W in G)?G[W]:this[W]);return new this.constructor(...Y)}}class X6{static fromArray(G,Y){return q(G,Y)}[Symbol.iterator](){return new eY(this)}toArray(){return[...this]}atLeastLength(G){let Y=this;while(G-- >0&&Y)Y=Y.tail;return Y!==void 0}hasLength(G){let Y=this;while(G-- >0&&Y)Y=Y.tail;return G===-1&&Y instanceof L}countLength(){let G=this,Y=0;while(G)G=G.tail,Y++;return Y-1}}function M(G,Y){return new j1(G,Y)}function q(G,Y){let W=Y||C;for(let J=G.length-1;J>=0;--J)W=new j1(G[J],W);return W}class eY{#G;constructor(G){this.#G=G}next(){if(this.#G instanceof L)return{done:!0};else{let{head:G,tail:Y}=this.#G;return this.#G=Y,{value:G,done:!1}}}}class L extends X6{}var C=new L,G9=()=>C,V6=(G)=>G instanceof L;class j1 extends X6{constructor(G,Y){super();this.head=G,this.tail=Y}}var oG=(G,Y)=>new j1(G,Y),KG=(G)=>G instanceof j1,eG=(G)=>G.head,e0=(G)=>G.tail;class T1{bitSize;byteSize;bitOffset;rawBuffer;constructor(G,Y,W){if(!(G instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=Y??G.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=W??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(G.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=G}byteAt(G){if(G<0||G>=this.byteSize)return;return D1(this.rawBuffer,this.bitOffset,G)}equals(G){if(this.bitSize!==G.bitSize)return!1;let Y=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&G.bitOffset===0){for(let J=0;J<Y;J++)if(this.rawBuffer[J]!==G.rawBuffer[J])return!1;let W=this.bitSize%8;if(W){let J=8-W;if(this.rawBuffer[Y]>>J!==G.rawBuffer[Y]>>J)return!1}}else{for(let J=0;J<Y;J++){let Z=D1(this.rawBuffer,this.bitOffset,J),Q=D1(G.rawBuffer,G.bitOffset,J);if(Z!==Q)return!1}let W=this.bitSize%8;if(W){let J=D1(this.rawBuffer,this.bitOffset,Y),Z=D1(G.rawBuffer,G.bitOffset,Y),Q=8-W;if(J>>Q!==Z>>Q)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function D1(G,Y,W){if(Y===0)return G[W]??0;else{let J=G[W]<<Y&255,Z=G[W+1]>>8-Y;return J|Z}}class F6{constructor(G){this.value=G}}class F8 extends I{static isResult(G){return G instanceof F8}}class E extends F8{constructor(G){super();this[0]=G}isOk(){return!0}}var e=(G)=>new E(G),R0=(G)=>G instanceof E,L0=(G)=>G[0];class Z0 extends F8{constructor(G){super();this[0]=G}isOk(){return!1}}var X0=(G)=>new Z0(G),Y9=(G)=>G instanceof Z0;function Y0(G,Y){let W=[G,Y];while(W.length){let J=W.pop(),Z=W.pop();if(J===Z)continue;if(!oY(J)||!oY(Z))return!1;if(!mQ(J,Z)||yQ(J,Z)||bQ(J,Z)||gQ(J,Z)||hQ(J,Z)||_Q(J,Z)||vQ(J,Z))return!1;let K=Object.getPrototypeOf(J);if(K!==null&&typeof K.equals==="function")try{if(J.equals(Z))continue;else return!1}catch{}let[X,V]=fQ(J),F=X(J),H=X(Z);if(F.length!==H.length)return!1;for(let z of F)W.push(V(J,z),V(Z,z))}return!0}function fQ(G){if(G instanceof Map)return[(Y)=>Y.keys(),(Y,W)=>Y.get(W)];else{let Y=G instanceof globalThis.Error?["message"]:[];return[(W)=>[...Y,...Object.keys(W)],(W,J)=>W[J]]}}function yQ(G,Y){return G instanceof Date&&(G>Y||G<Y)}function bQ(G,Y){return!(G instanceof T1)&&G.buffer instanceof ArrayBuffer&&G.BYTES_PER_ELEMENT&&!(G.byteLength===Y.byteLength&&G.every((W,J)=>W===Y[J]))}function gQ(G,Y){return Array.isArray(G)&&G.length!==Y.length}function hQ(G,Y){return G instanceof Map&&G.size!==Y.size}function _Q(G,Y){return G instanceof Set&&(G.size!=Y.size||[...G].some((W)=>!Y.has(W)))}function vQ(G,Y){return G instanceof RegExp&&(G.source!==Y.source||G.flags!==Y.flags)}function oY(G){return typeof G==="object"&&G!==null}function mQ(G,Y){if(typeof G!=="object"&&typeof Y!=="object"&&(!G||!Y))return!1;if([Promise,WeakSet,WeakMap,Function].some((J)=>G instanceof J))return!1;return G.constructor===Y.constructor}function xG(G,Y,W,J,Z,Q,K){let X=new globalThis.Error(Q);X.gleam_error=G,X.file=Y,X.module=W,X.line=J,X.function=Z,X.fn=Z;for(let V in K)X[V]=K[V];return X}class w0 extends I{}var A1=new w0,W9=()=>A1;class C0 extends I{}var B1=new C0,J9=()=>B1;class I6 extends I{}var P1=new I6,Z9=()=>P1;class m extends I{constructor(G){super();this[0]=G}}var I8=(G)=>G instanceof m,H8=(G)=>G[0];class XG extends I{}var d=new XG;function uQ(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else{let Z=W.head;G=W.tail,Y=M(Z,J)}}}function $Q(G){return uQ(G,C)}function cQ(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return $Q(J);else{let Z=W.head;if(Z instanceof m){let Q=W.tail,K=Z[0];G=Q,Y=M(K,J)}else G=W.tail,Y=J}}}function H6(G){return cQ(G,C)}var Q9=new WeakMap,q6=new DataView(new ArrayBuffer(8)),z6=0;function M6(G){let Y=Q9.get(G);if(Y!==void 0)return Y;let W=z6++;if(z6===2147483647)z6=0;return Q9.set(G,W),W}function R6(G,Y){return G^Y+2654435769+(G<<6)+(G>>2)|0}function N6(G){let Y=0,W=G.length;for(let J=0;J<W;J++)Y=Math.imul(31,Y)+G.charCodeAt(J)|0;return Y}function V9(G){q6.setFloat64(0,G);let Y=q6.getInt32(0),W=q6.getInt32(4);return Math.imul(73244475,Y>>16^Y)^W}function pQ(G){return N6(G.toString())}function sQ(G){let Y=Object.getPrototypeOf(G);if(Y!==null&&typeof Y.hashCode==="function")try{let J=G.hashCode(G);if(typeof J==="number")return J}catch{}if(G instanceof Promise||G instanceof WeakSet||G instanceof WeakMap)return M6(G);if(G instanceof Date)return V9(G.getTime());let W=0;if(G instanceof ArrayBuffer)G=new Uint8Array(G);if(Array.isArray(G)||G instanceof Uint8Array)for(let J=0;J<G.length;J++)W=Math.imul(31,W)+s0(G[J])|0;else if(G instanceof Set)G.forEach((J)=>{W=W+s0(J)|0});else if(G instanceof Map)G.forEach((J,Z)=>{W=W+R6(s0(J),s0(Z))|0});else{let J=Object.keys(G);for(let Z=0;Z<J.length;Z++){let Q=J[Z],K=G[Q];W=W+R6(s0(K),N6(Q))|0}}return W}function s0(G){if(G===null)return 1108378658;if(G===void 0)return 1108378659;if(G===!0)return 1108378657;if(G===!1)return 1108378656;switch(typeof G){case"number":return V9(G);case"string":return N6(G);case"bigint":return pQ(G);case"object":return sQ(G);case"symbol":return M6(G);case"function":return M6(G);default:return 0}}class VG{constructor(G,Y){this.size=G,this.root=Y}}var w1=5,rQ=(1<<w1)-1,z8=Symbol();class yG{constructor(G,Y,W,J){this.datamap=Y,this.nodemap=W,this.data=J,this.generation=G}equals(G){if(this===G)return!0;if(!(G instanceof yG))return!1;if(this.datamap!==G.datamap||this.nodemap!==G.nodemap)return!1;let Y=this.data,W=G.data;if(Y.length!==W.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#G(W);let J=Y.length-C1(this.nodemap);for(let Z=0;Z<J;Z+=2)if(!Y0(Y[Z],W[Z])||!Y0(Y[Z+1],W[Z+1]))return!1;for(let Z=J;Z<Y.length;++Z)if(!Y[Z].equals(W[Z]))return!1;return!0}#G(G){let Y=this.data;G:for(let W=0;W<Y.length;W+=2){for(let J=0;J<G.length;J+=2)if(Y0(Y[W],G[J])){if(!Y0(Y[W+1],G[J+1]))return!1;continue G}return!1}return!0}hashCode(){let G=this.data,Y=G.length-C1(this.nodemap),W=0;for(let J=0;J<Y;J+=2)W=W+R6(s0(G[J+1]),s0(G[J]))|0;for(let J=Y;J<G.length;++J)W=W+G[J].hashCode()|0;return W}}var F9=iQ(0),I9=new VG(0,F9),nQ=X0(void 0);function iQ(G){return new yG(G,0,0,[])}function H9(G,Y){if(G.generation===Y)return G;let W=G.data.slice(0);return new yG(Y,G.datamap,G.nodemap,W)}function M8(G,Y,W,J){if(G.data[W]===J)return G;return G=H9(G,Y),G.data[W]=J,G}function K9(G,Y,W,J,Z,Q){let K=G.data,X=K.length,V=Array(X+2),F=0,H=0;while(F<J)V[H++]=K[F++];V[H++]=Z,V[H++]=Q;while(F<X)V[H++]=K[F++];return new yG(Y,G.datamap|W,G.nodemap,V)}function X9(G,Y,W,J){G=H9(G,Y);let Z=G.data,Q=Z.length;for(let K=J,X=J+2;X<Q;++X,++K)Z[K]=Z[X];return Z.pop(),Z.pop(),G.datamap^=W,G}function G1(){return I9}function FG(G,Y){let W=dQ(G.root,Y,s0(Y));return W!==z8?e(W):nQ}function dQ(G,Y,W){for(let Z=0;Z<32;Z+=w1){let Q=G.data,K=U6(W,Z);if(G.nodemap&K)G=Q[Q.length-1-fG(G.nodemap,K)];else if(G.datamap&K){let X=Math.imul(fG(G.datamap,K),2);return Y0(Y,Q[X])?Q[X+1]:z8}else return z8}let J=G.data;for(let Z=0;Z<J.length;Z+=2)if(Y0(Y,J[Z]))return J[Z+1];return z8}function S6(G){return{generation:z9(G),root:G.root,size:G.size,dict:G}}function q9(G){if(G.root===G.dict.root)return G.dict;return new VG(G.size,G.root)}function z9(G){let Y=G.root;if(Y.generation<Number.MAX_SAFE_INTEGER)return Y.generation+1;let W=[Y];while(W.length){let J=W.pop();J.generation=0;let Z=J.data.length-C1(J.nodemap);for(let Q=Z;Q<J.data.length;++Q)W.push(J.data[Q])}return 1}var q8=S6(I9);function bG(G,Y,W){q8.generation=z9(G),q8.size=G.size;let J=s0(Y),Z=R8(q8,G.root,Y,W,J,0);if(Z===G.root)return G;return new VG(q8.size,Z)}function R8(G,Y,W,J,Z,Q){let K=Y.data,X=G.generation;if(Q>32){for(let j=0;j<K.length;j+=2)if(Y0(W,K[j]))return M8(Y,X,j+1,J);return G.size+=1,K9(Y,X,0,K.length,W,J)}let V=U6(Z,Q);if(Y.nodemap&V){let j=K.length-1-fG(Y.nodemap,V),T=K[j];return T=R8(G,T,W,J,Z,Q+w1),M8(Y,X,j,T)}let F=Math.imul(fG(Y.datamap,V),2);if((Y.datamap&V)===0)return G.size+=1,K9(Y,X,V,F,W,J);if(Y0(W,K[F]))return M8(Y,X,F+1,J);let H=Q+w1,z=F9;z=R8(G,z,W,J,Z,H);let U=K[F],S=K[F+1],R=s0(U);z=R8(G,z,U,S,R,H),G.size-=1;let D=K.length,N=D-1-fG(Y.nodemap,V),A=Array(D-1),B=0,O=0;while(B<F)A[O++]=K[B++];B+=2;while(B<=N)A[O++]=K[B++];A[O++]=z;while(B<D)A[O++]=K[B++];return new yG(X,Y.datamap^V,Y.nodemap|V,A)}function M9(G,Y){let W=s0(G);return Y.root=R9(Y,Y.root,G,W,0),Y}function R9(G,Y,W,J,Z){let Q=Y.data,K=G.generation;if(Z>32){for(let F=0;F<Q.length;F+=2)if(Y0(W,Q[F]))return G.size-=1,X9(Y,K,0,F);return Y}let X=U6(J,Z),V=Math.imul(fG(Y.datamap,X),2);if((Y.nodemap&X)!==0){let F=Q.length-1-fG(Y.nodemap,X),H=Q[F];if(H=R9(G,H,W,J,Z+w1),H.nodemap!==0||H.data.length>2)return M8(Y,K,F,H);let z=Q.length,U=Array(z+1),S=0,R=0;while(S<V)U[R++]=Q[S++];U[R++]=H.data[0],U[R++]=H.data[1];while(S<F)U[R++]=Q[S++];S++;while(S<z)U[R++]=Q[S++];return new yG(K,Y.datamap|X,Y.nodemap^X,U)}if((Y.datamap&X)===0||!Y0(W,Q[V]))return Y;return G.size-=1,X9(Y,K,X,V)}function gG(G,Y,W){let J=[G.root];while(J.length){let Z=J.pop(),Q=Z.data,K=Q.length-C1(Z.nodemap);for(let X=0;X<K;X+=2)Y=W(Y,Q[X],Q[X+1]);for(let X=K;X<Q.length;++X)J.push(Q[X])}return Y}function C1(G){return G-=G>>>1&1431655765,G=(G&858993459)+(G>>>2&858993459),Math.imul(G+(G>>>4)&252645135,16843009)>>>24}function fG(G,Y){return C1(G&Y-1)}function U6(G,Y){return 1<<(G>>>Y&rQ)}function E1(G){return gG(G,C,(Y,W,J)=>{return M(W,Y)})}function L6(G,Y){let W=S6(G),J=((Z)=>{return M9(Y,Z)})(W);return q9(J)}class UG extends I{}var GG=new UG;class S9 extends I{}var x1=new S9;function tQ(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else G=W.tail,Y=J+1}}function HG(G){return tQ(G,0)}function Y1(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else{let Z=W.head;G=W.tail,Y=M(Z,J)}}}function o(G){return Y1(G,C)}function k1(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return!1;else{let Z=W.head;if(Y0(Z,J))return!0;else G=W.tail,Y=J}}}function U9(G){if(G instanceof L)return new Z0(void 0);else{let Y=G.head;return new E(Y)}}function oQ(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return o(Q);else{let{head:K,tail:X}=J,V;if(Z(K))V=M(K,Q);else V=Q;let H=V;G=X,Y=Z,W=H}}}function W1(G,Y){return oQ(G,Y,C)}function eQ(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return o(Q);else{let K=J.head;G=J.tail,Y=Z,W=M(Z(K),Q)}}}function H0(G,Y){return eQ(G,Y,C)}function GK(G,Y,W,J){while(!0){let Z=G,Q=Y,K=W,X=J;if(Z instanceof L)return o(X);else{let{head:V,tail:F}=Z,H=M(Q(V,K),X);G=F,Y=Q,W=K+1,J=H}}}function L9(G,Y){return GK(G,Y,0,C)}function O9(G,Y){while(!0){let W=G,J=Y;if(J<=0)return W;else if(W instanceof L)return W;else G=W.tail,Y=J-1}}function YK(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else{let Z=W.head;G=W.tail,Y=M(Z,J)}}}function b0(G,Y){return YK(o(G),Y)}function N8(G,Y){return M(Y,G)}function WK(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return o(J);else{let Z=W.head;G=W.tail,Y=Y1(Z,J)}}}function D9(G){return WK(G,C)}function E0(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return Z;else{let K=J.head;G=J.tail,Y=Q(Z,K),W=Q}}}function J1(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return new Z0(void 0);else{let{head:Z,tail:Q}=W;if(J(Z))return new E(Z);else G=Q,Y=J}}}function JK(G,Y,W,J){while(!0){let Z=G,Q=Y,K=W,X=J;if(Z instanceof L)return Y1(Q,X);else if(Q instanceof L)return Y1(Z,X);else{let{head:V,tail:F}=Z,H=Q.head,z=Q.tail,U=K(V,H);if(U instanceof w0)G=Z,Y=z,W=K,J=M(H,X);else if(U instanceof C0)G=F,Y=Q,W=K,J=M(V,X);else G=F,Y=Q,W=K,J=M(V,X)}}}function ZK(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return o(Q);else{let K=J.tail;if(K instanceof L){let X=J.head;return o(M(o(X),Q))}else{let X=J.head,V=K.head,F=K.tail,H=JK(X,V,Z,C);G=F,Y=Z,W=M(H,Q)}}}}function QK(G,Y,W,J){while(!0){let Z=G,Q=Y,K=W,X=J;if(Z instanceof L)return Y1(Q,X);else if(Q instanceof L)return Y1(Z,X);else{let{head:V,tail:F}=Z,H=Q.head,z=Q.tail,U=K(V,H);if(U instanceof w0)G=F,Y=Q,W=K,J=M(V,X);else if(U instanceof C0)G=Z,Y=z,W=K,J=M(H,X);else G=Z,Y=z,W=K,J=M(H,X)}}}function KK(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return o(Q);else{let K=J.tail;if(K instanceof L){let X=J.head;return o(M(o(X),Q))}else{let X=J.head,V=K.head,F=K.tail,H=QK(X,V,Z,C);G=F,Y=Z,W=M(H,Q)}}}}function XK(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return J;else if(Z instanceof UG)if(J.tail instanceof L)return J.head;else G=KK(J,Q,C),Y=x1,W=Q;else if(J.tail instanceof L){let X=J.head;return o(X)}else G=ZK(J,Q,C),Y=GG,W=Q}}function VK(G,Y,W,J,Z,Q){while(!0){let K=G,X=Y,V=W,F=J,H=Z,z=Q,U=M(H,V);if(K instanceof L)if(F instanceof UG)return M(o(U),z);else return M(U,z);else{let{head:S,tail:R}=K,D=X(H,S);if(F instanceof UG)if(D instanceof w0)G=R,Y=X,W=U,J=F,Z=S,Q=z;else if(D instanceof C0)G=R,Y=X,W=U,J=F,Z=S,Q=z;else{let N;if(F instanceof UG)N=M(o(U),z);else N=M(U,z);let A=N;if(R instanceof L)return M(q([S]),A);else{let{head:B,tail:O}=R,j,T=X(S,B);if(T instanceof w0)j=GG;else if(T instanceof C0)j=GG;else j=x1;let x=j;G=O,Y=X,W=q([S]),J=x,Z=B,Q=A}}else if(D instanceof w0){let N;if(F instanceof UG)N=M(o(U),z);else N=M(U,z);let A=N;if(R instanceof L)return M(q([S]),A);else{let{head:B,tail:O}=R,j,T=X(S,B);if(T instanceof w0)j=GG;else if(T instanceof C0)j=GG;else j=x1;let x=j;G=O,Y=X,W=q([S]),J=x,Z=B,Q=A}}else if(D instanceof C0){let N;if(F instanceof UG)N=M(o(U),z);else N=M(U,z);let A=N;if(R instanceof L)return M(q([S]),A);else{let{head:B,tail:O}=R,j,T=X(S,B);if(T instanceof w0)j=GG;else if(T instanceof C0)j=GG;else j=x1;let x=j;G=O,Y=X,W=q([S]),J=x,Z=B,Q=A}}else G=R,Y=X,W=U,J=F,Z=S,Q=z}}}function j9(G,Y){if(G instanceof L)return G;else{let W=G.tail;if(W instanceof L)return G;else{let J=G.head,Z=W.head,Q=W.tail,K,X=Y(J,Z);if(X instanceof w0)K=GG;else if(X instanceof C0)K=GG;else K=x1;let V=K,F=VK(Q,Y,q([J]),V,Z,C);return XK(F,GG,Y)}}}function T9(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return;else{let{head:Z,tail:Q}=W;J(Z),G=Q,Y=J}}}class P9 extends I{}var YV=new P9;class E9 extends I{}var XV=new E9;class x9 extends I{}var VV=new x9;function k9(G,Y){if(Y==="")return D6(G);else{let J=W0(G),Z=j6(J,Y);return H0(Z,W0)}}function NK(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else{let Z=W.head;G=W.tail,Y=J+Z}}}function f9(G){return NK(G,"")}class OG extends I{constructor(G,Y,W){super();this.expected=G,this.found=Y,this.path=W}}var h9=(G,Y,W)=>new OG(G,Y,W);class x0 extends I{constructor(G){super();this.function=G}}var OK=new x0(DK),h0=new x0(jK);var N0=new x0(TK);function YG(G,Y){let W=Y.function(G),J=W[0],Z=W[1];if(Z instanceof L)return new E(J);else return new Z0(Z)}function A6(G,Y,W){let J=W(G);if(J instanceof E)return[J[0],C];else return[J[0],q([new OG(Y,zG(G),C)])]}function DK(G){return A6(G,"Float",c9)}function hG(G,Y){return new x0((W)=>{let J=G.function(W),Z=J[0],Q=J[1];return[Y(Z),Q]})}function jK(G){return A6(G,"Int",p9)}function TK(G){return A6(G,"String",s9)}function AK(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(Q instanceof L)return Z;else{let{head:K,tail:X}=Q,V=K.function(J),F=V;if(V[1]instanceof L)return F;else G=J,Y=Z,W=X}}}function _9(G,Y){return new x0((W)=>{let J=G.function(W),Z=J;if(J[1]instanceof L)return Z;else return AK(W,Z,Y)})}function BK(G){let Y=_9(N0,q([(()=>{return hG(h0,q0)})(),(()=>{return hG(OK,S8)})()])),W=YG(G,Y);if(W instanceof E)return W[0];else return"<"+zG(G)+">"}function y1(G,Y){let W=H0(Y,(Z)=>{let K=W0(Z);return BK(K)}),J=H0(G[1],(Z)=>{return new OG(Z.expected,Z.found,b0(W,Z.path))});return[G[0],J]}function b1(G){return new x0((Y)=>{return $9(Y,G.function,(W,J)=>{return y1(W,q([J]))},0,C)})}function PK(G,Y,W,J,Z){while(!0){let Q=G,K=Y,X=W,V=J,F=Z;if(Q instanceof L){let z=X(V);return y1(z,o(K))}else{let{head:H,tail:z}=Q,U=B6(V,H);if(U instanceof E){let S=U[0];if(S instanceof m){let R=S[0];G=z,Y=M(H,K),W=X,J=R,Z=F}else return F(V,M(H,K))}else{let S=U[0],N=[X(V)[0],q([new OG(S,zG(V),C)])];return y1(N,o(K))}}}}function DG(G,Y,W){return new x0((J)=>{let Z=PK(G,C,Y.function,J,(H,z)=>{let R=[Y.function(H)[0],q([new OG("Field","Nothing",C)])];return y1(R,o(z))}),Q=Z[0],K=Z[1],X=W(Q).function(J),V=X[0],F=X[1];return[V,b0(K,F)]})}function S0(G){return new x0((Y)=>{return[G,C]})}function wK(G,Y){return q([new OG(G,zG(Y),C)])}function V0(G,Y,W){return DG(q([G]),Y,W)}function v9(G,Y,W,J){return new x0((Z)=>{let Q,K,X=B6(Z,G);if(X instanceof E){let D=X[0];if(D instanceof m){let N=D[0];K=W.function(N)}else K=[Y,C]}else{let D=X[0];K=[Y,q([new OG(D,zG(Z),C)])]}Q=y1(K,q([G]));let F=Q,H=F[0],z=F[1],U=J(H).function(Z),S=U[0],R=U[1];return[S,b0(z,R)]})}function m9(G){return new x0((Y)=>{if(r9(Y))return[d,C];else{let J=G.function(Y),Z=J[0],Q=J[1];return[new m(Z),Q]}})}function u9(G,Y){return new x0((W)=>{let J=G.function(W),Z=J[0],Q=J[1],X=Y(Z).function(W),V=X,F=X[0];if(Q instanceof L)return V;else return[F,Q]})}function g1(G,Y){return new x0((W)=>{return[G,wK(Y,W)]})}var EK=void 0;function W0(G){return G}function P6(G){if(/^[-+]?(\d+)$/.test(G))return e(parseInt(G));else return X0(EK)}function q0(G){return G.toString()}function D6(G){let Y=xK(G);if(Y)return h1(Array.from(Y).map((W)=>W.segment));else return h1(G.match(/./gsu))}var n9=void 0;function xK(G){if(globalThis.Intl&&Intl.Segmenter)return n9||=new Intl.Segmenter,n9.segment(G)[Symbol.iterator]()}function j6(G,Y){return h1(G.split(Y))}function T6(G,Y){return G.startsWith(Y)}var i9=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),K5=new RegExp(`^[${i9}]*`),X5=new RegExp(`[${i9}]*$`);function zG(G){if(typeof G==="string")return"String";else if(typeof G==="boolean")return"Bool";else if(fK(G))return"Result";else if(U8(G))return"List";else if(G instanceof T1)return"BitArray";else if(G instanceof VG)return"Dict";else if(Number.isInteger(G))return"Int";else if(Array.isArray(G))return"Array";else if(typeof G==="number")return"Float";else if(G===null)return"Nil";else if(G===void 0)return"Nil";else{let Y=typeof G;return Y.charAt(0).toUpperCase()+Y.slice(1)}}var{MAX_SAFE_INTEGER:V5,MIN_SAFE_INTEGER:F5}=Number;function S8(G){let Y=G.toString().replace("+","");if(Y.indexOf(".")>=0)return Y;else{let W=Y.indexOf("e");if(W>=0)return Y.slice(0,W)+".0"+Y.slice(W);else return Y+".0"}}class kK{#G=new Set;inspect(G){let Y=typeof G;if(G===!0)return"True";if(G===!1)return"False";if(G===null)return"//js(null)";if(G===void 0)return"Nil";if(Y==="string")return this.#J(G);if(Y==="bigint"||Number.isInteger(G))return G.toString();if(Y==="number")return S8(G);if(G instanceof F6)return this.#K(G);if(G instanceof T1)return this.#Q(G);if(G instanceof RegExp)return`//js(${G})`;if(G instanceof Date)return`//js(Date("${G.toISOString()}"))`;if(G instanceof globalThis.Error)return`//js(${G.toString()})`;if(G instanceof Function){let J=[];for(let Z of Array(G.length).keys())J.push(String.fromCharCode(Z+97));return`//fn(${J.join(", ")}) { ... }`}if(this.#G.size===this.#G.add(G).size)return"//js(circular reference)";let W;if(Array.isArray(G))W=`#(${G.map((J)=>this.inspect(J)).join(", ")})`;else if(U8(G))W=this.#W(G);else if(G instanceof I)W=this.#Y(G);else if(G instanceof VG)W=this.#Z(G);else if(G instanceof Set)return`//js(Set(${[...G].map((J)=>this.inspect(J)).join(", ")}))`;else W=this.#X(G);return this.#G.delete(G),W}#X(G){let Y=Object.getPrototypeOf(G)?.constructor?.name||"Object",W=[];for(let Q of Object.keys(G))W.push(`${this.inspect(Q)}: ${this.inspect(G[Q])}`);let J=W.length?" "+W.join(", ")+" ":"";return`//js(${Y==="Object"?"":Y+" "}{${J}})`}#Z(G){let Y="dict.from_list([",W=!0;return Y=gG(G,Y,(J,Z,Q)=>{if(!W)J=J+", ";return W=!1,J+"#("+this.inspect(Z)+", "+this.inspect(Q)+")"}),Y+"])"}#Y(G){let Y=Object.keys(G).map((W)=>{let J=this.inspect(G[W]);return isNaN(parseInt(W))?`${W}: ${J}`:J}).join(", ");return Y?`${G.constructor.name}(${Y})`:G.constructor.name}#W(G){if(V6(G))return"[]";let Y='charlist.from_string("',W="[",J=G;while(KG(J)){let Z=J.head;if(J=J.tail,W!=="[")W+=", ";if(W+=this.inspect(Z),Y)if(Number.isInteger(Z)&&Z>=32&&Z<=126)Y+=String.fromCharCode(Z);else Y=null}if(Y)return Y+'")';else return W+"]"}#J(G){let Y='"';for(let W=0;W<G.length;W++){let J=G[W];switch(J){case`
`:Y+="\\n";break;case"\r":Y+="\\r";break;case"\t":Y+="\\t";break;case"\f":Y+="\\f";break;case"\\":Y+="\\\\";break;case'"':Y+="\\\"";break;default:if(J<" "||J>"~"&&J<" ")Y+="\\u{"+J.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else Y+=J}}return Y+='"',Y}#K(G){return`//utfcodepoint(${String.fromCodePoint(G.value)})`}#Q(G){if(G.bitSize===0)return"<<>>";let Y="<<";for(let W=0;W<G.byteSize-1;W++)Y+=G.byteAt(W).toString(),Y+=", ";if(G.byteSize*8===G.bitSize)Y+=G.byteAt(G.byteSize-1).toString();else{let W=G.bitSize%8;Y+=G.byteAt(G.byteSize-1)>>8-W,Y+=`:size(${W})`}return Y+=">>",Y}}function B6(G,Y){if(G instanceof VG){let J=FG(G,Y);return e(J.isOk()?new m(J[0]):new XG)}if(G instanceof WeakMap||G instanceof Map){let J={},Z=G.get(Y,J);if(Z===J)return e(new XG);return e(new m(Z))}let W=Number.isInteger(Y);if(W&&Y>=0&&Y<8&&U8(G)){let J=0;for(let Z of G){if(J===Y)return e(new m(Z));J++}return X0("Indexable")}if(W&&Array.isArray(G)||G&&typeof G==="object"||G&&Object.getPrototypeOf(G)===Object.prototype){if(Y in G)return e(new m(G[Y]));return e(new XG)}return X0(W?"Indexable":"Dict")}function $9(G,Y,W,J,Z){if(!(U8(G)||Array.isArray(G))){let K=h9("List",zG(G),Z);return[Z,h1([K])]}let Q=[];for(let K of G){let X=Y(K),[V,F]=X;if(KG(F)){let[H,z]=W(X,J.toString());return[Z,z]}Q.push(V),J++}return[h1(Q),Z]}function c9(G){if(typeof G==="number")return e(G);return X0(0)}function p9(G){if(Number.isInteger(G))return e(G);return X0(0)}function s9(G){if(typeof G==="string")return e(G);return X0("")}function r9(G){return G===null||G===void 0}function h1(G){let Y=G9(),W=G.length;while(W--)Y=oG(G[W],Y);return Y}function U8(G){return V6(G)||KG(G)}function fK(G){return R0(G)||Y9(G)}class d9 extends I{}var yK=new d9;class C6 extends I{}var h5=new C6;class a9 extends I{}var _5=new a9;class l9 extends I{}var v5=new l9;class t9 extends I{}var m5=new t9;class o9 extends I{}var u5=new o9;function L8(G,Y){if(G instanceof E){let W=G[0];return new E(Y(W))}else return G}function e9(G,Y){if(G instanceof E)return G;else{let W=G[0];return new Z0(Y(W))}}function _1(G,Y){if(G instanceof E){let W=G[0];return Y(W)}else return G}function E6(G,Y){if(G instanceof E)return G[0];else return Y}class x6 extends I{}var i5=new x6;class k6 extends I{}var d5=new k6;class GW extends I{}var a5=new GW;class YW extends I{}var KF=new YW;class WW extends I{}var IF=new WW;class JW extends I{}var _K=new JW;class ZW extends I{}var HF=new ZW;class QW extends I{}var vK=new QW;class XW extends I{}var NF=new XW;function VW(G,Y,W){if(G)return Y;else return W()}function A0(G){return G}function f6(G){return JSON.stringify(G)}function IW(G){return Object.fromEntries(G)}function vG(G){return G}function HW(G){let Y=[];while(KG(G))Y.push(eG(G)),G=e0(G);return Y}function qW(){return null}function zW(G){try{let Y=JSON.parse(G);return e(Y)}catch(Y){return X0($K(Y,G))}}function $K(G,Y){if(cK(G))return MW();return pK(G,Y)}function cK(G){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(G.message)}function pK(G,Y){let W=[sK,rK,iK,nK];for(let J of W){let Z=J(G,Y);if(Z)return Z}return Q1("")}function sK(G){let W=/unexpected token '(.)', ".+" is not valid JSON/i.exec(G.message);if(!W)return null;let J=D8(W[1]);return Q1(J)}function rK(G){let W=/unexpected token (.) in JSON at position (\d+)/i.exec(G.message);if(!W)return null;let J=D8(W[1]);return Q1(J)}function nK(G,Y){let J=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(G.message);if(!J)return null;let Z=Number(J[2]),Q=Number(J[3]),K=dK(Z,Q,Y),X=D8(Y[K]);return Q1(X)}function iK(G){let W=/unexpected (identifier|token) "(.)"/i.exec(G.message);if(!W)return null;let J=D8(W[2]);return Q1(J)}function D8(G){return"0x"+G.charCodeAt(0).toString(16).toUpperCase()}function dK(G,Y,W){if(G===1)return Y-1;let J=1,Z=0;return W.split("").find((Q,K)=>{if(Q===`
`)J+=1;if(J===G)return Z=K+Y,!0;return!1}),Z}class RW extends I{}var aK=new RW,MW=()=>aK;class NW extends I{constructor(G){super();this[0]=G}}var Q1=(G)=>new NW(G);class SW extends I{constructor(G){super();this[0]=G}}function lK(G,Y){return _1(zW(G),(W)=>{let J=YG(W,Y);return e9(J,(Z)=>{return new SW(Z)})})}function y6(G,Y){return lK(G,Y)}function UW(G){return f6(G)}function _0(G){return vG(G)}function b6(G){return vG(G)}function mG(G){return vG(G)}function tK(){return qW()}function g6(G,Y){if(G instanceof m){let W=G[0];return Y(W)}else return tK()}function v1(G){return IW(G)}function oK(G){return HW(G)}function j8(G,Y){let J=H0(G,Y);return oK(J)}function m1(G){return G.replaceAll(/[><&"']/g,(Y)=>{switch(Y){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return Y}})}var w=C,K1=new Z0(void 0);function U0(G){return M(G,w)}var eK=Z9(),G7=W9(),Y7=J9();function T8(G,Y){if(G.name===Y.name)return Y7;else if(G.name<Y.name)return G7;else return eK}class n0 extends I{constructor(G,Y,W){super();this.kind=G,this.name=Y,this.value=W}}class X1 extends I{constructor(G,Y,W){super();this.kind=G,this.name=Y,this.value=W}}class j0 extends I{constructor(G,Y,W,J,Z,Q,K,X){super();this.kind=G,this.name=Y,this.handler=W,this.include=J,this.prevent_default=Z,this.stop_propagation=Q,this.debounce=K,this.throttle=X}}class V1 extends I{constructor(G,Y,W){super();this.prevent_default=G,this.stop_propagation=Y,this.message=W}}class BW extends I{constructor(G){super();this.kind=G}}class PW extends I{constructor(G){super();this.kind=G}}var _6=0,v6=1,m6=2,u6=0,$6=new BW(u6),Q7=1,c6=new PW(Q7),p6=2;function wW(G,Y){return new n0(_6,G,Y)}function CW(G,Y){return new X1(v6,G,Y)}function s6(G,Y,W,J,Z,Q,K){return new j0(m6,G,Y,W,J,Z,Q,K)}function K7(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else{let Z=W.head;if(Z instanceof n0){let Q=Z.name;if(Q==="")G=W.tail,Y=J;else if(Q==="class"){let K=Z.value;if(K==="")G=W.tail,Y=J;else{let X=W.tail;if(X instanceof L){let V=Z;G=X,Y=M(V,J)}else{let V=X.head;if(V instanceof n0)if(V.name==="class"){let H=Z.kind,z=K,U=X.tail,S=V.value,R=z+" "+S,D=new n0(H,"class",R);G=M(D,U),Y=J}else{let H=Z;G=X,Y=M(H,J)}else{let F=Z;G=X,Y=M(F,J)}}}}else if(Q==="style"){let K=Z.value;if(K==="")G=W.tail,Y=J;else{let X=W.tail;if(X instanceof L){let V=Z;G=X,Y=M(V,J)}else{let V=X.head;if(V instanceof n0)if(V.name==="style"){let H=Z.kind,z=K,U=X.tail,S=V.value,R=z+";"+S,D=new n0(H,"style",R);G=M(D,U),Y=J}else{let H=Z;G=X,Y=M(H,J)}else{let F=Z;G=X,Y=M(F,J)}}}}else{let K=Z;G=W.tail,Y=M(K,J)}}else{let Q=Z;G=W.tail,Y=M(Q,J)}}}}function EW(G){if(G instanceof L)return G;else if(G.tail instanceof L)return G;else{let J=j9(G,(Z,Q)=>{return T8(Q,Z)});return K7(J,w)}}function B0(G,Y){return wW(G,Y)}function r6(G,Y){return CW(G,Y)}function F7(G,Y){if(Y)return B0(G,"");else return r6(G,b6(!1))}function $(G){return B0("class",G)}function xW(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)return J;else if(W.head[1]){let Q=W.tail,K=W.head[0];return J+K+" "+xW(Q,J)}else G=W.tail,Y=J}}function A8(G){return $(xW(G,""))}function i0(G){return B0("id",G)}function kW(G){return B0("spellcheck",(()=>{if(G)return"true";else return"false"})())}function fW(G){return B0("tabindex",q0(G))}function n6(G){return F7("disabled",G)}function yW(G){return B0("for",G)}function bW(G){return B0("max",G)}function gW(G){return B0("min",G)}function hW(G){return B0("placeholder",G)}function _W(G){return B0("type",G)}function B8(G){return B0("value",G)}class u1 extends I{constructor(G,Y,W){super();this.synchronous=G,this.before_paint=Y,this.after_paint=W}}class vW extends I{constructor(G,Y,W,J,Z,Q,K){super();this.dispatch=G,this.emit=Y,this.select=W,this.root=J,this.provide=Z,this.subscribe=Q,this.unsubscribe=K}}var F1=new u1(w,w,w);function Q0(){return F1}function $1(G){return new u1(U0((W)=>{let J=W.dispatch;return G(J)}),F1.before_paint,F1.after_paint)}function i6(G){let Y=(W)=>{let J=W.root(),Z=W.dispatch;return G(Z,J)};return new u1(F1.synchronous,U0(Y),F1.after_paint)}function P8(G){return E0(G,F1,(Y,W)=>{return new u1(E0(W.synchronous,Y.synchronous,N8),E0(W.before_paint,Y.before_paint,N8),E0(W.after_paint,Y.after_paint,N8))})}function mW(G,Y,W,J,Z,Q,K,X){let V=new vW(Y,W,J,Z,Q,K,X);return T9(G.synchronous,(F)=>{return F(V)})}function G0(){return null}function cG(G,Y){return G?.get(Y)}function I1(G,Y,W){return G?.get(Y)??W()}function WG(G,Y){return G&&G.has(Y)}function m0(G,Y,W){return G??=new Map,G.set(Y,W),G}function w8(G,Y){return G?.delete(Y),G}function uW(G,Y){if(typeof G==="number"&&typeof Y==="number")return G===Y||G!==G&&Y!==Y;return G===Y}function $W(G,Y){while(!0){let W=G,J=Y;if(W instanceof L)if(J instanceof L)return!0;else return!1;else if(J instanceof L)return!1;else{let{head:Z,tail:Q}=W,K=J.head,X=J.tail,V=uW(Z,K);if(V)G=Q,Y=X;else return V}}}class d0 extends I{constructor(G,Y,W,J){super();this.kind=G,this.key=Y,this.children=W,this.keyed_children=J}}class a0 extends I{constructor(G,Y,W,J,Z,Q,K,X,V){super();this.kind=G,this.key=Y,this.namespace=W,this.tag=J,this.attributes=Z,this.children=Q,this.keyed_children=K,this.self_closing=X,this.void=V}}class JG extends I{constructor(G,Y,W){super();this.kind=G,this.key=Y,this.content=W}}class ZG extends I{constructor(G,Y,W,J,Z,Q){super();this.kind=G,this.key=Y,this.namespace=W,this.tag=J,this.attributes=Z,this.inner_html=Q}}class k0 extends I{constructor(G,Y,W,J){super();this.kind=G,this.key=Y,this.mapper=W,this.child=J}}class pG extends I{constructor(G,Y,W,J){super();this.kind=G,this.key=Y,this.dependencies=W,this.view=J}}var sG=0,AG=1,H1=2,cW=3,TG=4,a6=5;function E8(G,Y,W){return new d0(sG,G,Y,W)}function p1(G,Y,W,J,Z,Q,K,X){return new a0(AG,G,Y,W,EW(J),Z,Q,K,X)}function s1(G,Y){if(Y==="")if(G==="area")return!0;else if(G==="base")return!0;else if(G==="br")return!0;else if(G==="col")return!0;else if(G==="embed")return!0;else if(G==="hr")return!0;else if(G==="img")return!0;else if(G==="input")return!0;else if(G==="link")return!0;else if(G==="meta")return!0;else if(G==="param")return!0;else if(G==="source")return!0;else if(G==="track")return!0;else if(G==="wbr")return!0;else return!1;else return!1}function l6(G,Y){return new JG(H1,G,Y)}function pW(G,Y){if(G instanceof k0){let W=G.mapper;return new k0(TG,G.key,(J)=>{return A0(Y)(W(J))},A0(G.child))}else return new k0(TG,G.key,A0(Y),A0(G))}function sW(G,Y,W){return new pG(a6,G,Y,W)}function C8(G,Y){if(Y instanceof d0)return new d0(Y.kind,G,Y.children,Y.keyed_children);else if(Y instanceof a0)return new a0(Y.kind,G,Y.namespace,Y.tag,Y.attributes,Y.children,Y.keyed_children,Y.self_closing,Y.void);else if(Y instanceof JG)return new JG(Y.kind,G,Y.content);else if(Y instanceof ZG)return new ZG(Y.kind,G,Y.namespace,Y.tag,Y.attributes,Y.inner_html);else if(Y instanceof k0){let W=Y.child;return new k0(Y.kind,G,Y.mapper,C8(G,W))}else{let W=Y.view;return new pG(Y.kind,G,Y.dependencies,()=>{return C8(G,W())})}}class rW extends I{}var K4=new rW;class nW extends I{}var X4=new nW;class iW extends I{}var V4=new iW;class dW extends I{}var F4=new dW;class aW extends I{}var I4=new aW;function f0(G,Y,W){return p1("","",G,Y,W,G0(),!1,s1(G,""))}function r1(G){return l6("",G)}function lW(){return l6("","")}function tW(G){return E8("",G,G0())}function oW(G,Y){return sW("",G,Y)}function eW(G){return A0(G)}function GJ(G,Y){return pW(G,Y)}function l(G){return r1(G)}function YJ(G,Y){return f0("h2",G,Y)}function WJ(G,Y){return f0("h3",G,Y)}function K0(G,Y){return f0("div",G,Y)}function JJ(G,Y){return f0("pre",G,Y)}function ZJ(G,Y){return f0("code",G,Y)}function n1(G,Y){return f0("span",G,Y)}function PG(G,Y){return f0("button",G,Y)}function QJ(G){return f0("input",G,w)}function KJ(G,Y){return f0("label",G,Y)}function XJ(G,Y){return f0("textarea",M(r6("value",_0(Y)),G),q([r1(Y)]))}class x8 extends I{constructor(G,Y,W,J,Z){super();this.index=G,this.path=Y,this.removed=W,this.changes=J,this.children=Z}}class VJ extends I{constructor(G,Y){super();this.kind=G,this.content=Y}}class FJ extends I{constructor(G,Y){super();this.kind=G,this.inner_html=Y}}class IJ extends I{constructor(G,Y,W){super();this.kind=G,this.added=Y,this.removed=W}}class HJ extends I{constructor(G,Y,W){super();this.kind=G,this.key=Y,this.before=W}}class qJ extends I{constructor(G,Y,W){super();this.kind=G,this.index=Y,this.with=W}}class zJ extends I{constructor(G,Y){super();this.kind=G,this.index=Y}}class MJ extends I{constructor(G,Y,W){super();this.kind=G,this.children=Y,this.before=W}}var o6=0,e6=1,GY=2,YY=3,WY=4,JY=5,ZY=6;function wG(G,Y,W,J){return new x8(G,w,Y,W,J)}function RJ(G){return new VJ(o6,G)}function NJ(G){return new FJ(e6,G)}function QY(G,Y){return new IJ(GY,G,Y)}function SJ(G,Y){return new HJ(YY,G,Y)}function UJ(G){return new zJ(WY,G)}function MG(G,Y){return new qJ(JY,G,Y)}function KY(G,Y){return new MJ(ZY,G,Y)}function LJ(G,Y){return new x8(Y,M(G.index,G.path),G.removed,G.changes,G.children)}class DJ extends I{constructor(G,Y,W,J,Z,Q,K,X,V){super();this.kind=G,this.open_shadow_root=Y,this.will_adopt_styles=W,this.observed_attributes=J,this.observed_properties=Z,this.requested_contexts=Q,this.provided_contexts=K,this.vdom=X,this.memos=V}}class jJ extends I{constructor(G,Y,W){super();this.kind=G,this.patch=Y,this.memos=W}}class TJ extends I{constructor(G,Y,W){super();this.kind=G,this.name=Y,this.data=W}}class AJ extends I{constructor(G,Y,W){super();this.kind=G,this.key=Y,this.value=W}}class BJ extends I{constructor(G,Y){super();this.kind=G,this.key=Y}}class PJ extends I{constructor(G,Y){super();this.kind=G,this.key=Y}}class wJ extends I{constructor(G,Y){super();this.kind=G,this.messages=Y}}var CJ=(G)=>G instanceof wJ;class EJ extends I{constructor(G,Y,W){super();this.kind=G,this.name=Y,this.value=W}}var xJ=(G)=>G instanceof EJ;class kJ extends I{constructor(G,Y,W){super();this.kind=G,this.name=Y,this.value=W}}var fJ=(G)=>G instanceof kJ;class yJ extends I{constructor(G,Y,W,J){super();this.kind=G,this.path=Y,this.name=W,this.event=J}}var bJ=(G)=>G instanceof yJ;class gJ extends I{constructor(G,Y,W){super();this.kind=G,this.key=Y,this.value=W}}var hJ=(G)=>G instanceof gJ;var z7=0,M7=1,R7=2,N7=3,S7=4,U7=5;function _J(G,Y,W,J,Z,Q,K,X){return new DJ(z7,G,Y,W,J,Z,Q,K,X)}function XY(G,Y){return new jJ(M7,G,Y)}function vJ(G,Y){return new TJ(R7,G,Y)}function mJ(G,Y){return new AJ(N7,G,Y)}function uJ(G){return new BJ(S7,G)}function $J(G){return new PJ(U7,G)}class VY extends I{}var L7=new VY;class FY extends I{constructor(G,Y){super();this.key=G,this.parent=Y}}class IY extends I{constructor(G,Y){super();this.index=G,this.parent=Y}}class sJ extends I{constructor(G){super();this.parent=G}}var f8="\r",k8="\t",HY=`
`,y8=L7;function pJ(G){if(G instanceof L)return"";else{let Y=G.tail;return f9(Y)}}function qY(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(Z instanceof VY)return pJ(Q);else if(Z instanceof FY){let{key:K,parent:X}=Z;G=J,Y=X,W=M(k8,M(K,Q))}else if(Z instanceof IY){let{index:K,parent:X}=Z,V=M(k8,M(q0(K),Q));G=J,Y=X,W=V}else if(!J)return pJ(Q);else{let K=Z.parent;if(Q instanceof L)G=J,Y=K,W=Q;else{let X=Q.tail;G=J,Y=K,W=M(f8,X)}}}}function O7(G){return qY(!0,G,w)}function D7(G,Y){while(!0){let W=G,J=Y;if(J instanceof L)return!1;else{let{head:Z,tail:Q}=J,K=T6(W,Z);if(K)return K;else G=W,Y=Q}}}function rJ(G,Y){if(Y instanceof L)return!1;else return D7(O7(G),Y)}function nJ(G){return k9(G,f8)}function P0(G,Y,W){if(W==="")return new IY(Y,G);else return new FY(W,G)}function b8(G){return new sJ(G)}function zY(G,Y){return qY(!1,G,M(HY,M(Y,w)))}function i1(G){return qY(!1,G,w)}class RG extends I{constructor(G,Y,W,J,Z){super();this.events=G,this.vdoms=Y,this.old_vdoms=W,this.dispatched_paths=J,this.next_dispatched_paths=Z}}class CG extends I{constructor(G,Y){super();this.handlers=G,this.children=Y}}class h8 extends I{constructor(G,Y){super();this.mapper=G,this.events=Y}}class lJ extends I{constructor(G,Y,W){super();this.handlers=G,this.children=Y,this.vdoms=W}}class NY extends I{constructor(G,Y){super();this.path=G,this.handler=Y}}class MY extends I{constructor(G){super();this.path=G}}function j7(G,Y){return(W)=>{return G(Y(W))}}function tJ(){return new CG(G0(),G0())}function SY(){return new RG(tJ(),G0(),G0(),w,w)}function oJ(G,Y,W,J){return m0(G,zY(Y,W),J)}function dJ(G,Y,W){return E0(W,G,(J,Z)=>{if(Z instanceof j0){let{name:Q,handler:K}=Z;return oJ(J,Y,Q,K)}else return J})}function g8(G,Y,W,J,Z,Q){while(!0){let K=G,X=Y,V=W,F=J,H=Z,z=Q,U=H+1;if(z instanceof L)return new lJ(K,X,V);else{let S=z.head;if(S instanceof d0){let R=z.tail,D=S.key,N=S.children,A=P0(F,H,D),B=g8(K,X,V,A,0,N),O=B.handlers,j=B.children,T=B.vdoms;G=O,Y=j,W=T,J=F,Z=U,Q=R}else if(S instanceof a0){let R=z.tail,D=S.key,N=S.attributes,A=S.children,B=P0(F,H,D),O=dJ(K,B,N),j=g8(O,X,V,B,0,A),T=j.handlers,x=j.children,g=j.vdoms;G=T,Y=x,W=g,J=F,Z=U,Q=R}else if(S instanceof JG){let R=z.tail;G=K,Y=X,W=V,J=F,Z=U,Q=R}else if(S instanceof ZG){let R=z.tail,D=S.key,N=S.attributes,A=P0(F,H,D);G=dJ(K,A,N),Y=X,W=V,J=F,Z=U,Q=R}else if(S instanceof k0){let R=z.tail,D=S.key,N=S.mapper,A=S.child,B=P0(F,H,D),O=g8(G0(),G0(),V,b8(B),0,U0(A)),j=O.vdoms,T=new CG(O.handlers,O.children),x=new h8(N,T),g=m0(X,i1(B),x);G=K,Y=g,W=j,J=F,Z=U,Q=R}else{let R=z.tail,D=S.view,N=D(),A=m0(V,D,N),B=H,O=M(N,R);G=K,Y=X,W=A,J=F,Z=B,Q=O}}}}function UY(G,Y,W,J,Z){let Q=G.vdoms,K=Y.handlers,X=Y.children,V=g8(K,X,Q,W,J,Z),F=V.handlers,H=V.children,z=V.vdoms;return[new RG(G.events,z,G.old_vdoms,G.dispatched_paths,G.next_dispatched_paths),new CG(F,H)]}function _8(G,Y,W,J,Z){let Q=U0(Z);return UY(G,Y,W,J,Q)}function eJ(G){let Y=SY(),W=_8(Y,Y.events,y8,0,G),J=W[0],Z=W[1];return new RG(Z,J.vdoms,J.old_vdoms,J.dispatched_paths,J.next_dispatched_paths)}function GZ(G){return new RG(G.events,G0(),G.vdoms,G.next_dispatched_paths,w)}function YZ(G){return G.events}function WZ(G,Y){return new RG(Y,G.vdoms,G.old_vdoms,G.dispatched_paths,G.next_dispatched_paths)}function q1(G){return G.vdoms}function JZ(G,Y,W){return I1(G.old_vdoms,Y,W)}function ZZ(G,Y,W){let J=I1(G.old_vdoms,Y,W),Z=m0(G.vdoms,W,J);return new RG(G.events,Z,G.old_vdoms,G.dispatched_paths,G.next_dispatched_paths)}function QZ(G,Y,W){let J=m0(G.vdoms,Y,W);return new RG(G.events,J,G.old_vdoms,G.dispatched_paths,G.next_dispatched_paths)}function KZ(G,Y,W){return I1(G.children,Y,()=>{return new h8(W,tJ())}).events}function XZ(G,Y,W,J){let Z=new h8(W,J),Q=m0(G.children,Y,Z);return new CG(G.handlers,Q)}function z1(G,Y,W,J){let Z=oJ(G.handlers,Y,W,J);return new CG(Z,G.children)}function VZ(G,Y,W){return w8(G,zY(Y,W))}function v8(G,Y,W){let J=VZ(G.handlers,Y,W);return new CG(J,G.children)}function aJ(G,Y,W){return E0(W,G,(J,Z)=>{if(Z instanceof j0){let Q=Z.name;return VZ(J,Y,Q)}else return J})}function RY(G,Y,W,J,Z,Q){while(!0){let K=G,X=Y,V=W,F=J,H=Z,z=Q,U=H+1;if(z instanceof L)return new CG(K,X);else{let S=z.head;if(S instanceof d0){let R=z.tail,D=S.key,N=S.children,A=P0(F,H,D),B=RY(K,X,V,A,0,N),O=B.handlers,j=B.children;G=O,Y=j,W=V,J=F,Z=U,Q=R}else if(S instanceof a0){let R=z.tail,D=S.key,N=S.attributes,A=S.children,B=P0(F,H,D),O=aJ(K,B,N),j=RY(O,X,V,B,0,A),T=j.handlers,x=j.children;G=T,Y=x,W=V,J=F,Z=U,Q=R}else if(S instanceof JG){let R=z.tail;G=K,Y=X,W=V,J=F,Z=U,Q=R}else if(S instanceof ZG){let R=z.tail,D=S.key,N=S.attributes,A=P0(F,H,D);G=aJ(K,A,N),Y=X,W=V,J=F,Z=U,Q=R}else if(S instanceof k0){let R=z.tail,D=S.key,N=P0(F,H,D),A=w8(X,i1(N));G=K,Y=A,W=V,J=F,Z=U,Q=R}else{let R=z.tail,D=S.view;if(WG(V,D)){let A=cG(V,D),B=M(A,R);G=K,Y=X,W=V,J=F,Z=H,Q=B}else G=K,Y=X,W=V,J=F,Z=U,Q=R}}}}function m8(G,Y,W,J,Z){return RY(Y.handlers,Y.children,G.old_vdoms,W,J,U0(Z))}function NG(G,Y,W,J,Z,Q){let K=m8(G,Y,W,J,Z);return _8(G,K,W,J,Q)}function T7(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(Z instanceof L)return K1;else{let K=Z.tail;if(K instanceof L){let X=Z.head;if(WG(J.handlers,X)){let F=cG(J.handlers,X);return new E(hG(F,(H)=>{return new V1(H.prevent_default,H.stop_propagation,A0(Q)(H.message))}))}else return K1}else{let X=Z.head,V=K;if(WG(J.children,X)){let H=cG(J.children,X),z=j7(Q,H.mapper);G=H.events,Y=V,W=z}else return K1}}}}function LY(G,Y,W,J){let Z=nJ(Y+HY+W),Q=T7(G.events,Z,A0);if(Q instanceof E){let K=Q[0],X=YG(J,K);if(X instanceof E){let V=X[0];return new NY(Y,V)}else return new MY(Y)}else return new MY(Y)}function OY(G,Y){let W=M(Y.path,G.next_dispatched_paths),J=new RG(G.events,G.vdoms,G.old_vdoms,G.dispatched_paths,W);if(Y instanceof NY){let Z=Y.handler;return[J,new E(Z)]}else return[J,K1]}function FZ(G,Y,W,J){let Z=LY(G,Y,W,J);return((Q)=>{return OY(G,Q)})(Z)}function u8(G,Y){return rJ(Y,G.dispatched_paths)}class IZ extends I{constructor(G){super();this.message=G}}var HZ=(G)=>G instanceof IZ;class qZ extends I{constructor(G){super();this.callback=G}}var zZ=(G)=>G instanceof qZ;class MZ extends I{constructor(G){super();this.callback=G}}var RZ=(G)=>G instanceof MZ;class c8 extends I{constructor(G){super();this.message=G}}var NZ=(G)=>new c8(G),d1=(G)=>G instanceof c8;class DY extends I{constructor(G,Y){super();this.name=G,this.data=Y}}var SZ=(G,Y)=>new DY(G,Y),a1=(G)=>G instanceof DY;class jY extends I{constructor(G,Y){super();this.key=G,this.value=Y}}var UZ=(G,Y)=>new jY(G,Y),LZ=(G)=>G instanceof jY;class TY extends I{constructor(G,Y){super();this.key=G,this.decoder=Y}}var OZ=(G,Y)=>new TY(G,Y),DZ=(G)=>G instanceof TY;class AY extends I{constructor(G){super();this.key=G}}var jZ=(G)=>new AY(G),TZ=(G)=>G instanceof AY;class BY extends I{}var A7=new BY;var l1=(G)=>G instanceof BY;class PY extends I{constructor(G,Y,W,J,Z){super();this.name=G,this.init=Y,this.update=W,this.view=J,this.config=Z}}class wY extends I{constructor(G,Y,W,J,Z,Q,K,X,V,F,H,z,U,S){super();this.open_shadow_root=G,this.adopt_styles=Y,this.delegates_focus=W,this.attributes=J,this.properties=Z,this.contexts=Q,this.is_form_associated=K,this.on_form_autofill=X,this.on_form_reset=V,this.on_form_restore=F,this.on_form_disabled=H,this.on_connect=z,this.on_adopt=U,this.on_disconnect=S}}var BZ=new wY(!0,!0,!1,w,w,w,!1,d,d,d,d,d,d,d);var l0=(G,Y)=>{if(G===Y)return!0;if(G==null||Y==null)return!1;let W=typeof G;if(W!==typeof Y)return!1;if(W!=="object")return!1;if(G.constructor!==Y.constructor)return!1;if(Array.isArray(G))return B7(G,Y);return P7(G,Y)},B7=(G,Y)=>{let W=G.length;if(W!==Y.length)return!1;while(W--)if(!l0(G[W],Y[W]))return!1;return!0},P7=(G,Y)=>{let W=Object.keys(G),J=W.length;if(Object.keys(Y).length!==J)return!1;while(J--){let Z=W[J];if(!Object.hasOwn(Y,Z))return!1;if(!l0(G[Z],Y[Z]))return!1}return!0};class wZ extends I{constructor(G,Y){super();this.patch=G,this.cache=Y}}class EY extends I{constructor(G,Y,W){super();this.patch=G,this.cache=Y,this.events=W}}class CZ extends I{constructor(G,Y,W){super();this.added=G,this.removed=Y,this.events=W}}function PZ(G,Y,W,J,Z,Q,K){while(!0){let X=G,V=Y,F=W,H=J,z=Z,U=Q,S=K;if(H instanceof L)if(z instanceof L)return new CZ(U,S,F);else{let R=z.head;if(R instanceof j0){let D=R,N=z.tail,A=R.name,B=R.handler,O=z1(F,V,A,B),j=M(D,U);G=X,Y=V,W=O,J=H,Z=N,Q=j,K=S}else{let D=R,N=z.tail,A=M(D,U);G=X,Y=V,W=F,J=H,Z=N,Q=A,K=S}}else if(z instanceof L){let R=H.head;if(R instanceof j0){let D=R,N=H.tail,A=R.name,B=v8(F,V,A),O=M(D,S);G=X,Y=V,W=B,J=N,Z=z,Q=U,K=O}else{let D=R,N=H.tail,A=M(D,S);G=X,Y=V,W=F,J=N,Z=z,Q=U,K=A}}else{let{head:R,tail:D}=H,N=z.head,A=z.tail,B=T8(R,N);if(B instanceof w0)if(R instanceof j0){let O=R.name;G=X,Y=V,W=v8(F,V,O),J=D,Z=z,Q=U,K=M(R,S)}else G=X,Y=V,W=F,J=D,Z=z,Q=U,K=M(R,S);else if(B instanceof C0)if(R instanceof n0)if(N instanceof n0){let O,j=N.name;if(j==="value")O=X||R.value!==N.value;else if(j==="checked")O=X||R.value!==N.value;else if(j==="selected")O=X||R.value!==N.value;else O=R.value!==N.value;let T=O,x;if(T)x=M(N,U);else x=U;let g=x;G=X,Y=V,W=F,J=D,Z=A,Q=g,K=S}else if(N instanceof j0){let{name:O,handler:j}=N;G=X,Y=V,W=z1(F,V,O,j),J=D,Z=A,Q=M(N,U),K=M(R,S)}else G=X,Y=V,W=F,J=D,Z=A,Q=M(N,U),K=M(R,S);else if(R instanceof X1)if(N instanceof X1){let O,j=N.name;if(j==="scrollLeft")O=!0;else if(j==="scrollRight")O=!0;else if(j==="value")O=X||!l0(R.value,N.value);else if(j==="checked")O=X||!l0(R.value,N.value);else if(j==="selected")O=X||!l0(R.value,N.value);else O=!l0(R.value,N.value);let T=O,x;if(T)x=M(N,U);else x=U;let g=x;G=X,Y=V,W=F,J=D,Z=A,Q=g,K=S}else if(N instanceof j0){let{name:O,handler:j}=N;G=X,Y=V,W=z1(F,V,O,j),J=D,Z=A,Q=M(N,U),K=M(R,S)}else G=X,Y=V,W=F,J=D,Z=A,Q=M(N,U),K=M(R,S);else if(N instanceof j0){let{name:O,handler:j}=N,T=R.prevent_default.kind!==N.prevent_default.kind||R.stop_propagation.kind!==N.stop_propagation.kind||R.debounce!==N.debounce||R.throttle!==N.throttle,x;if(T)x=M(N,U);else x=U;let g=x;G=X,Y=V,W=z1(F,V,O,j),J=D,Z=A,Q=g,K=S}else{let O=R.name;G=X,Y=V,W=v8(F,V,O),J=D,Z=A,Q=M(N,U),K=M(R,S)}else if(N instanceof j0){let{name:O,handler:j}=N;G=X,Y=V,W=z1(F,V,O,j),J=H,Z=A,Q=M(N,U),K=S}else G=X,Y=V,W=F,J=H,Z=A,Q=M(N,U),K=S}}}function w7(G,Y,W,J){if(W==="input"&&Y==="")return u8(G,J);else if(W==="select"&&Y==="")return u8(G,J);else if(W==="textarea"&&Y==="")return u8(G,J);else return!1}function p8(G,Y,W,J,Z,Q,K,X,V,F,H,z,U,S){while(!0){let R=G,D=Y,N=W,A=J,B=Z,O=Q,j=K,T=X,x=V,g=F,y=H,h=z,i=U,t=S;if(R instanceof L)if(N instanceof L){let F0,M0=nG();if(g instanceof L)if(y instanceof L)F0=wG(x,j,g,y);else if(!M0)if(y.tail instanceof L&&j===0){let b=y.head;F0=LJ(b,x)}else F0=wG(x,j,g,y);else F0=wG(x,j,g,y);else F0=wG(x,j,g,y);return new EY(F0,i,t)}else{let F0=UY(i,t,h,T,N),M0=F0[0],a=F0[1],c=KY(N,T-O),b=M(c,g),u=wG(x,j,b,y);return new EY(u,M0,a)}else if(N instanceof L){let{head:F0,tail:M0}=R;if(F0.key===""||!WG(B,F0.key)){let c=m8(i,t,h,T,F0);G=M0,Y=D,W=N,J=A,Z=B,Q=O,K=j+1,X=T,V=x,F=g,H=y,z=h,U=i,S=c}else G=M0,Y=D,W=N,J=A,Z=B,Q=O,K=j,X=T,V=x,F=g,H=y,z=h,U=i,S=t}else{let F0=R.head,M0=N.head;if(F0.key!==M0.key){let a=R.tail,c=N.tail,b=WG(D,M0.key);if(WG(A,F0.key))if(b)if(WG(B,F0.key))G=a,Y=D,W=N,J=A,Z=B,Q=O-1,K=j,X=T,V=x,F=g,H=y,z=h,U=i,S=t;else{let _=cG(D,M0.key),v=T-O,f=M(SJ(M0.key,v),g),p=m0(B,M0.key,void 0);G=M(_,R),Y=D,W=N,J=A,Z=p,Q=O+1,K=j,X=T,V=x,F=f,H=y,z=h,U=i,S=t}else{let k=T-O,_=_8(i,t,h,T,M0),v=_[0],f=_[1],p=KY(U0(M0),k),s=M(p,g);G=R,Y=D,W=c,J=A,Z=B,Q=O+1,K=j,X=T+1,V=x,F=s,H=y,z=h,U=v,S=f}else if(b){let k=T-O,_=M(UJ(k),g),v=m8(i,t,h,T,F0);G=a,Y=D,W=N,J=A,Z=B,Q=O-1,K=j,X=T,V=x,F=_,H=y,z=h,U=i,S=v}else{let k=MG(T-O,M0),_=NG(i,t,h,T,F0,M0),v=_[0],f=_[1];G=a,Y=D,W=c,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(k,g),H=y,z=h,U=v,S=f}}else{let a=R.head;if(a instanceof d0){let c=N.head;if(c instanceof d0){let b=a,u=R.tail,k=c,_=N.tail,v=p8(b.children,b.keyed_children,k.children,k.keyed_children,G0(),0,0,0,T,w,w,P0(h,T,k.key),i,t),f=v.patch,p=v.cache,s=v.events,T0;if(f.changes instanceof L)if(f.children instanceof L)if(f.removed===0)T0=y;else T0=M(f,y);else T0=M(f,y);else T0=M(f,y);let o0=T0;G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=o0,z=h,U=p,S=s}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}else if(a instanceof a0){let c=N.head;if(c instanceof a0){let b=a,u=c;if(b.namespace===u.namespace&&b.tag===u.tag){let k=R.tail,_=N.tail,v=P0(h,T,u.key),f=w7(i,u.namespace,u.tag,v),p=PZ(f,v,t,b.attributes,u.attributes,w,w),s=p.added,T0=p.removed,t0=p.events,o0;if(s instanceof L&&T0 instanceof L)o0=w;else o0=U0(QY(s,T0));let y0=o0,lG=p8(b.children,b.keyed_children,u.children,u.keyed_children,G0(),0,0,0,T,y0,w,v,i,t0),p0=lG.patch,tG=lG.cache,V8=lG.events,O1;if(p0.changes instanceof L)if(p0.children instanceof L)if(p0.removed===0)O1=y;else O1=M(p0,y);else O1=M(p0,y);else O1=M(p0,y);let kQ=O1;G=k,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=kQ,z=h,U=tG,S=V8}else{let k=a,_=R.tail,v=c,f=N.tail,p=MG(T-O,v),s=NG(i,t,h,T,k,v),T0=s[0],t0=s[1];G=_,Y=D,W=f,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(p,g),H=y,z=h,U=T0,S=t0}}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}else if(a instanceof JG){let c=N.head;if(c instanceof JG){let b=a,u=c;if(b.content===u.content){let k=R.tail,_=N.tail;G=k,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=y,z=h,U=i,S=t}else{let k=R.tail,_=c,v=N.tail,f=wG(T,0,U0(RJ(_.content)),w);G=k,Y=D,W=v,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=M(f,y),z=h,U=i,S=t}}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}else if(a instanceof ZG){let c=N.head;if(c instanceof ZG){let b=a,u=R.tail,k=c,_=N.tail,v=P0(h,T,k.key),f=PZ(!1,v,t,b.attributes,k.attributes,w,w),p=f.added,s=f.removed,T0=f.events,t0;if(p instanceof L&&s instanceof L)t0=w;else t0=U0(QY(p,s));let o0=t0,y0;if(b.inner_html===k.inner_html)y0=o0;else y0=M(NJ(k.inner_html),o0);let p0=y0,tG;if(p0 instanceof L)tG=y;else tG=M(wG(T,0,p0,w),y);let V8=tG;G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=V8,z=h,U=i,S=T0}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}else if(a instanceof k0){let c=N.head;if(c instanceof k0){let b=a,u=R.tail,k=c,_=N.tail,v=P0(h,T,k.key),f=i1(v),p=p8(U0(b.child),G0(),U0(k.child),G0(),G0(),0,0,0,T,w,w,b8(v),i,KZ(t,f,b.mapper)),s=p.patch,T0=p.cache,t0=p.events,o0=XZ(t,f,k.mapper,t0),y0;if(s.changes instanceof L)if(s.children instanceof L)if(s.removed===0)y0=y;else y0=M(s,y);else y0=M(s,y);else y0=M(s,y);let p0=y0;G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=p0,z=h,U=T0,S=o0}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}else{let c=N.head;if(c instanceof pG){let b=a,u=R.tail,k=c,_=N.tail;if($W(b.dependencies,k.dependencies)){let f=ZZ(i,b.view,k.view);G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=g,H=y,z=h,U=f,S=t}else{let f=JZ(i,b.view,b.view),p=k.view(),s=QZ(i,k.view,p);G=M(f,u),Y=D,W=M(p,_),J=A,Z=B,Q=O,K=j,X=T,V=x,F=g,H=y,z=h,U=s,S=t}}else{let b=a,u=R.tail,k=c,_=N.tail,v=MG(T-O,k),f=NG(i,t,h,T,b,k),p=f[0],s=f[1];G=u,Y=D,W=_,J=A,Z=B,Q=O,K=j,X=T+1,V=x,F=M(v,g),H=y,z=h,U=p,S=s}}}}}}function t1(G,Y,W){let J=GZ(G),Z=p8(U0(Y),G0(),U0(W),G0(),G0(),0,0,0,0,w,w,y8,J,YZ(J)),Q=Z.patch,K=Z.cache,X=Z.events;return new wZ(Q,WZ(K,X))}var EZ=(G)=>G.reduceRight((Y,W)=>oG(W,Y),w),u0=(G,Y)=>{if(Array.isArray(G))for(let W=0;W<G.length;W++)Y(G[W]);else if(G)for(G;e0(G);G=e0(G))Y(eG(G))},xY=(G,Y)=>{if(!e0(G))return Y;else if(!e0(Y))return G;else return b0(G,Y)};var s8="http://www.w3.org/1999/xhtml",xZ=1,kZ=3,kY=8;var fZ=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:E7,clearTimeout:fY}=globalThis,x7=(G,Y)=>globalThis.document.createElementNS(G,Y),yZ=(G)=>globalThis.document.createTextNode(G),bZ=(G)=>globalThis.document.createComment(G),k7=()=>globalThis.document.createDocumentFragment(),EG=(G,Y,W)=>G.insertBefore(Y,W),gZ=fZ?(G,Y,W)=>G.moveBefore(Y,W):EG,hZ=(G,Y)=>G.removeChild(Y),f7=(G,Y)=>G.getAttribute(Y),_Z=(G,Y,W)=>G.setAttribute(Y,W),y7=(G,Y)=>G.removeAttribute(Y),b7=(G,Y,W,J)=>G.addEventListener(Y,W,J),vZ=(G,Y,W)=>G.removeEventListener(Y,W),g7=(G,Y)=>G.innerHTML=Y,h7=(G,Y)=>G.data=Y,$0=Symbol("lustre");class $Z{constructor(G,Y,W,J){this.kind=G,this.key=J,this.parent=Y,this.children=[],this.node=W,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===sG||this.kind===TG}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var c0=(G,Y,W,J,Z)=>{let Q=new $Z(G,Y,W,Z);return W[$0]=Q,Y?.children.splice(J,0,Q),Q},_7=(G)=>{let Y="";for(let W=G[$0];W.parent;W=W.parent){let J=W.parent&&W.parent.kind===TG?f8:k8;if(W.key)Y=`${J}${W.key}${Y}`;else{let Z=W.parent.children.indexOf(W);Y=`${J}${Z}${Y}`}}return Y.slice(1)};class bY{#G=null;#X;#Z;#Y=!1;constructor(G,Y,W,{debug:J=!1}={}){this.#G=G,this.#X=Y,this.#Z=W,this.#Y=J}mount(G){c0(AG,null,this.#G,0,null),this.#N(this.#G,null,this.#G[$0],0,G)}push(G,Y=null){this.#W=Y,this.#J.push({node:this.#G[$0],patch:G}),this.#K()}#W;#J=[];#K(){let G=this.#J;while(G.length){let{node:Y,patch:W}=G.pop(),{path:J,changes:Z,removed:Q,children:K}=W;u0(J,(V)=>{Y=Y.children[V]});let{children:X}=Y;if(u0(Z,(V)=>this.#Q(Y,V)),Q)this.#z(Y,X.length-Q,Q);u0(K,(V)=>{let F=X[V.index|0];this.#J.push({node:F,patch:V})})}}#Q(G,Y){switch(Y.kind){case o6:this.#B(G,Y);break;case e6:this.#D(G,Y);break;case GY:this.#R(G,Y);break;case YY:this.#H(G,Y);break;case WY:this.#U(G,Y);break;case JY:this.#V(G,Y);break;case ZY:this.#q(G,Y);break}}#q(G,{children:Y,before:W}){let J=k7(),Z=this.#I(G,W);this.#O(J,null,G,W|0,Y),EG(G.parentNode,J,Z)}#V(G,{index:Y,with:W}){this.#z(G,Y|0,1);let J=this.#I(G,Y);this.#N(G.parentNode,J,G,Y|0,W)}#I(G,Y){Y=Y|0;let{children:W}=G,J=W.length;if(Y<J)return W[Y].node;if(G.endNode)return G.endNode;if(!G.isVirtual)return null;while(G.isVirtual&&G.children.length){if(G.endNode)return G.endNode.nextSibling;G=G.children[G.children.length-1]}return G.node.nextSibling}#H(G,{key:Y,before:W}){W=W|0;let{children:J,parentNode:Z}=G,Q=J[W].node,K=J[W];for(let X=W+1;X<J.length;++X){let V=J[X];if(J[X]=K,K=V,V.key===Y){J[W]=V;break}}this.#S(Z,K,Q)}#F(G,Y,W){for(let J=0;J<Y.length;++J)this.#S(G,Y[J],W)}#S(G,Y,W){if(gZ(G,Y.node,W),Y.isVirtual)this.#F(G,Y.children,W);if(Y.endNode)gZ(G,Y.endNode,W)}#U(G,{index:Y}){this.#z(G,Y,1)}#z(G,Y,W){let{children:J,parentNode:Z}=G,Q=J.splice(Y,W);for(let K=0;K<Q.length;++K){let X=Q[K],{node:V,endNode:F,isVirtual:H,children:z}=X;if(hZ(Z,V),F)hZ(Z,F);if(this.#M(X),H)Q.push(...z)}}#M(G){let{debouncers:Y,children:W}=G;for(let{timeout:J}of Y.values())if(J)fY(J);Y.clear(),u0(W,(J)=>this.#M(J))}#R({node:G,handlers:Y,throttles:W,debouncers:J},{added:Z,removed:Q}){u0(Q,({name:K})=>{if(Y.delete(K))vZ(G,K,yY),this.#L(W,K,0),this.#L(J,K,0);else y7(G,K),uZ[K]?.removed?.(G,K)}),u0(Z,(K)=>this.#A(G,K))}#B({node:G},{content:Y}){h7(G,Y??"")}#D({node:G},{inner_html:Y}){g7(G,Y??"")}#O(G,Y,W,J,Z){u0(Z,(Q)=>this.#N(G,Y,W,J++,Q))}#N(G,Y,W,J,Z){switch(Z.kind){case AG:{let Q=this.#j(W,J,Z);this.#O(Q,null,Q[$0],0,Z.children),EG(G,Q,Y);break}case H1:{let Q=this.#P(W,J,Z);EG(G,Q,Y);break}case sG:{let K=this.#T("lustre:fragment",W,J,Z);if(EG(G,K,Y),this.#O(G,Y,K[$0],0,Z.children),this.#Y)K[$0].endNode=bZ(" /lustre:fragment "),EG(G,K[$0].endNode,Y);break}case cW:{let Q=this.#j(W,J,Z);this.#D({node:Q},Z),EG(G,Q,Y);break}case TG:{let Q=this.#T("lustre:map",W,J,Z);EG(G,Q,Y),this.#N(G,Y,Q[$0],0,Z.child);break}case a6:{let Q=this.#W?.get(Z.view)??Z.view();this.#N(G,Y,W,J,Q);break}}}#j(G,Y,{kind:W,key:J,tag:Z,namespace:Q,attributes:K}){let X=x7(Q||s8,Z);if(c0(W,G,X,Y,J),this.#Y&&J)_Z(X,"data-lustre-key",J);return u0(K,(V)=>this.#A(X,V)),X}#P(G,Y,{kind:W,key:J,content:Z}){let Q=yZ(Z??"");return c0(W,G,Q,Y,J),Q}#T(G,Y,W,{kind:J,key:Z}){let Q=this.#Y?bZ(v7(G,Z)):yZ("");return c0(J,Y,Q,W,Z),Q}#A(G,Y){let{debouncers:W,handlers:J,throttles:Z}=G[$0],{kind:Q,name:K,value:X,prevent_default:V,debounce:F,throttle:H}=Y;switch(Q){case _6:{let z=X??"";if(K==="virtual:defaultValue"){G.defaultValue=z;return}else if(K==="virtual:defaultChecked"){G.defaultChecked=!0;return}else if(K==="virtual:defaultSelected"){G.defaultSelected=!0;return}if(z!==f7(G,K))_Z(G,K,z);uZ[K]?.added?.(G,z);break}case v6:G[K]=X;break;case m6:{if(J.has(K))vZ(G,K,yY);let z=V.kind===u6;b7(G,K,yY,{passive:z}),this.#L(Z,K,H),this.#L(W,K,F),J.set(K,(U)=>this.#w(Y,U));break}}}#L(G,Y,W){let J=G.get(Y);if(W>0)if(J)J.delay=W;else G.set(Y,{delay:W});else if(J){let{timeout:Z}=J;if(Z)fY(Z);G.delete(Y)}}#w(G,Y){let{currentTarget:W,type:J}=Y,{debouncers:Z,throttles:Q}=W[$0],K=_7(W),{prevent_default:X,stop_propagation:V,include:F}=G;if(X.kind===p6)Y.preventDefault();if(V.kind===p6)Y.stopPropagation();if(J==="submit")Y.detail??={},Y.detail.formData=[...new FormData(Y.target,Y.submitter).entries()];let H=this.#X(Y,K,J,F),z=Q.get(J);if(z){let S=Date.now(),R=z.last||0;if(S>R+z.delay)z.last=S,z.lastEvent=Y,this.#Z(Y,H)}let U=Z.get(J);if(U)fY(U.timeout),U.timeout=E7(()=>{if(Y===Q.get(J)?.lastEvent)return;this.#Z(Y,H)},U.delay);if(!z&&!U)this.#Z(Y,H)}}var v7=(G,Y)=>{if(Y)return` ${G} key="${m1(Y)}" `;else return` ${G} `},yY=(G)=>{let{currentTarget:Y,type:W}=G;Y[$0].handlers.get(W)(G)},mZ=(G)=>{return{added(Y){Y[G]=!0},removed(Y){Y[G]=!1}}},m7=(G)=>{return{added(Y,W){Y[G]=W}}},uZ={checked:mZ("checked"),selected:mZ("selected"),value:m7("value"),autofocus:{added(G){queueMicrotask(()=>{G.focus?.()})}},autoplay:{added(G){try{G.play?.()}catch(Y){console.error(Y)}}}};function u7(G,Y,W){while(!0){let J=G,Z=Y,Q=W;if(J instanceof L)return[Z,o(Q)];else{let K=J.tail,X=J.head[0],V=J.head[1],F=C8(X,V),H;if(X==="")H=Z;else H=m0(Z,X,F);let z=H,U=M(F,Q);G=K,Y=z,W=U}}}function gY(G){return u7(G,G0(),w)}function hY(G,Y,W){let J=gY(W),Z=J[0],Q=J[1];return p1("","",G,Y,Q,Z,!1,s1(G,""))}function cZ(G,Y,W,J){let Z=gY(J),Q=Z[0],K=Z[1];return p1("",G,Y,W,K,Q,!1,s1(Y,G))}function _Y(G){let Y=gY(G),W=Y[0],J=Y[1];return E8("",J,W)}function M1(G,Y){return hY("div",G,Y)}var sZ=(G)=>{let Y=c0(AG,null,G,0,null),{children:W}=vY(Y,G,G.firstChild);if(W.length>1){let Z=c0(AG,null,G,0,null);return Y.kind=sG,Y.node=globalThis.document.createTextNode(""),Y.parent=Z,Z.children.push(Y),G.insertBefore(Y.node,G.firstChild),_Y(R1(W))}if(W.length===1)return W[0][1];let J=globalThis.document.createTextNode("");return c0(H1,Y,J,0,null),G.insertBefore(J,G.firstChild),lW()},rZ=(G,Y,W,J)=>{if(W.nodeType===kY){let Z=W.data.trim();if(Z.startsWith("lustre:fragment"))return p7(G,Y,W,J);if(Z.startsWith("lustre:map"))return s7(G,Y,W,J);if(Z.startsWith("lustre:memo"))return r7(G,Y,W,J);return null}if(W.nodeType===xZ)return $7(G,W,J);if(W.nodeType===kZ)return c7(G,W,J);return null},$7=(G,Y,W)=>{let J=Y.getAttribute("data-lustre-key")??"";if(J)Y.removeAttribute("data-lustre-key");let Z=c0(AG,G,Y,W,J),Q=Y.localName,K=Y.namespaceURI,X=!K||K===s8;if(X&&i7.includes(Q))d7(Q,Y);let V=n7(Y),{children:F}=vY(Z,Y,Y.firstChild),H=X?hY(Q,V,R1(F)):cZ(K,Q,V,R1(F));return o1(J,H,Y.nextSibling)},vY=(G,Y,W)=>{let J=[];while(W&&(W.nodeType!==kY||W.data.trim()!=="/lustre:fragment")){let Z=rZ(G,Y,W,J.length);if(Z)J.push([Z.key,Z.vnode]),W=Z.next;else W=W.nextSibling}return{children:J,end:W}},c7=(G,Y,W)=>{return c0(H1,G,Y,W,null),o1("",r1(Y.data),Y.nextSibling)},p7=(G,Y,W,J)=>{let Z=mY(W.data),Q=c0(sG,G,W,J,Z),{children:K,end:X}=vY(Q,Y,W.nextSibling);Q.endNode=X;let V=_Y(R1(K));return o1(Z,V,X?.nextSibling)},s7=(G,Y,W,J)=>{let Z=mY(W.data),Q=c0(TG,G,W,J,Z),K=nZ(Q,Y,W,0);if(!K)return null;let X=GJ(K.vnode,(V)=>V);return o1(Z,X,K.next)},r7=(G,Y,W,J)=>{let Z=mY(W.data),Q=nZ(G,Y,W,J);if(!Q)return null;Y.removeChild(W);let K=oW(R1([eW({})]),()=>Q.vnode);return o1(Z,K,Q.next)},nZ=(G,Y,W,J)=>{while(!0){if(W=W.nextSibling,!W)return null;let Z=rZ(G,Y,W,J);if(Z)return Z}},o1=(G,Y,W)=>{return{key:G,vnode:Y,next:W}},n7=(G)=>{let Y=[];for(let W=0;W<G.attributes.length;W++){let J=G.attributes[W];if(J.name!=="xmlns")Y.push(B0(J.localName,J.value))}return R1(Y)},i7=["input","select","textarea"],d7=(G,Y)=>{let{value:W,checked:J}=Y;if(G==="input"&&Y.type==="checkbox"&&!J)return;if(G==="input"&&Y.type==="radio"&&!J)return;if(Y.type!=="checkbox"&&Y.type!=="radio"&&!W)return;queueMicrotask(()=>{if(Y.value=W,Y.checked=J,Y.dispatchEvent(new Event("input",{bubbles:!0})),Y.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==Y)Y.dispatchEvent(new Event("blur",{bubbles:!0}))})},mY=(G)=>{let Y=G.match(/key="([^"]*)"/);if(!Y)return"";return a7(Y[1])},a7=(G)=>{return G.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},R1=(G)=>G.reduceRight((Y,W)=>oG(W,Y),w);var nG=()=>!!globalThis.document;class r8{constructor(G,[Y,W],J,Z,Q){this.root=G,this.#G=Y,this.#X=J,this.#Z=Z,this.root.addEventListener("context-request",(V)=>{if(!(V.context&&V.callback))return;if(!this.#K.has(V.context))return;V.stopImmediatePropagation();let F=this.#K.get(V.context);if(V.subscribe){let H=()=>{F.subscribers=F.subscribers.filter((z)=>z!==V.callback)};F.subscribers.push([V.callback,H]),V.callback(F.value,H)}else V.callback(F.value)});let K=(V,F,H)=>LY(this.#W,F,H,V),X=(V,F)=>{let[H,z]=OY(this.#W,F);if(this.#W=H,R0(z)){let U=L0(z);if(U.stop_propagation)V.stopPropagation();if(U.prevent_default)V.preventDefault();this.dispatch(U.message,!1)}};this.#J=new bY(this.root,K,X,Q),this.#Y=sZ(this.root),this.#W=SY(),this.#z(W),this.#R()}root=null;dispatch(G,Y=!1){if(this.#q)this.#V.push(G);else{let[W,J]=this.#Z(this.#G,G);this.#G=W,this.#U(Y),this.#z(J)}}emit(G,Y){(this.root.host??this.root).dispatchEvent(new dZ(G,Y))}provide(G,Y){if(!this.#K.has(G))this.#K.set(G,{value:Y,subscribers:[]});else{let W=this.#K.get(G);if(l0(W.value,Y))return;W.value=Y;for(let J=W.subscribers.length-1;J>=0;J--){let[Z,Q]=W.subscribers[J];if(!Z){W.subscribers.splice(J,1);continue}Z(Y,Q)}}}subscribe(G,Y){if(!G)return;this.#Q.get(G)?.(),(this.root.host??this.root).dispatchEvent(new uY(G,(J,Z)=>{let Q=this.#Q.get(G);if(Q!==Z)Q?.();let K=YG(J,Y);if(this.#Q.set(G,Z),R0(K))this.dispatch(L0(K),!0)},!0))}unsubscribe(G){let Y=this.#Q.get(G);if(Y)Y(),this.#Q.delete(G)}unsubscribeAll(){for(let[G,Y]of this.#Q)Y?.();this.#Q.clear()}#G;#X;#Z;#Y;#W;#J;#K=new Map;#Q=new Map;#q=!1;#V=[];#I=w;#H=w;#F=null;#S={dispatch:(G)=>this.dispatch(G),emit:(G,Y)=>this.emit(G,Y),select:()=>{},root:()=>this.root,provide:(G,Y)=>this.provide(G,Y),subscribe:(G,Y)=>this.subscribe(G,Y),unsubscribe:(G)=>this.unsubscribe(G)};#U(G=!1){if(this.#F)return;if(G)this.#F="sync",queueMicrotask(()=>this.#R());else this.#F=window.requestAnimationFrame(()=>this.#R())}#z(G){this.#q=!0;let Y=!1;while(!0){if(u0(G.synchronous,(J)=>J(this.#S)),this.#I=xY(this.#I,G.before_paint),this.#H=xY(this.#H,G.after_paint),!this.#V.length)break;let W=this.#V.shift();[this.#G,G]=this.#Z(this.#G,W),Y=!0}return this.#q=!1,Y}#M(G){if(this.#z(G))this.#U(!0)}#R(){this.#F=null;let G=this.#X(this.#G),{patch:Y,cache:W}=t1(this.#W,this.#Y,G);if(this.#W=W,this.#Y=G,this.#J.push(Y,q1(W)),KG(this.#I)){let J=iZ(this.#I);this.#I=w,queueMicrotask(()=>this.#M(J))}if(KG(this.#H)){let J=iZ(this.#H);this.#H=w,window.requestAnimationFrame(()=>this.#M(J))}}}function iZ(G){return{synchronous:G,after_paint:w,before_paint:w}}class uY extends Event{constructor(G,Y,W){super("context-request",{bubbles:!0,composed:!0});this.context=G,this.callback=Y,this.subscribe=W}}class dZ extends CustomEvent{isLustreEvent=!0;constructor(G,Y){super(G,{detail:Y,bubbles:!0,composed:!0})}}class aZ{#G;constructor(G,[Y,W],J,Z){this.#G=new r8(G,[Y,W],Z,J)}send(G){if(d1(G))this.dispatch(G.message,!1);else if(a1(G))this.emit(G.name,G.data);else if(l1(G));}dispatch(G){this.#G.dispatch(G)}emit(G,Y){this.#G.emit(G,Y)}}var lZ=({init:G,update:Y,view:W},J,Z)=>{if(!nG())return X0($Y());let Q=J instanceof HTMLElement?J:globalThis.document.querySelector(J);if(!Q)return X0(tZ(J));return e(new aZ(Q,G(Z),Y,W))};class o7{#G;#X;#Z;#Y;#W;#J;#K=G1();#Q=new Set;constructor(G,Y,W,J,Z,Q){let[K,X]=Y(Q);this.#G=K,this.#X=W,this.#Z=J,this.#Y=Z,this.#W=this.#Z(this.#G),this.#J=eJ(this.#W),this.#F(X)}send(G){if(HZ(G)){let{message:Y}=Y,W=this.#q(Y),J=t1(this.#J,this.#W,W);this.#W=W,this.#J=J.cache,this.broadcast(XY(J.patch,q1(J.cache)))}else if(zZ(G)){let{callback:Y}=G;if(this.#Q.add(Y),Y(_J(this.#Y.open_shadow_root,this.#Y.adopt_styles,E1(this.#Y.attributes),E1(this.#Y.properties),E1(this.#Y.contexts),this.#K,this.#W,q1(this.#J))),I8(this.#Y.on_connect))this.#V(H8(this.#Y.on_connect))}else if(RZ(G)){let{callback:Y}=G;if(this.#Q.delete(Y),I8(this.#Y.on_disconnect))this.#V(H8(this.#Y.on_disconnect))}else if(d1(G)){let{message:Y}=Y,[W,J]=this.#X(this.#G,Y),Z=this.#Z(W),Q=t1(this.#J,this.#W,Z);this.#F(J),this.#G=W,this.#W=Z,this.#J=Q.cache,this.broadcast(XY(Q.patch,q1(Q.cache)))}else if(a1(G)){let{name:Y,data:W}=G;this.broadcast(vJ(Y,W))}else if(LZ(G)){let{key:Y,value:W}=G,J=FG(this.#K,Y);if(R0(J)&&l0(L0(J),W))return;this.#K=bG(this.#K,Y,W),this.broadcast(mJ(Y,W))}else if(DZ(G)){let{key:Y,decoder:W}=G;this.broadcast(uJ(Y)),this.#Y.contexts=bG(this.#Y.contexts,Y,W)}else if(TZ(G)){let{key:Y}=G;this.broadcast($J(Y)),this.#Y.contexts=L6(this.#Y.contexts,Y)}else if(l1(G))this.#G=null,this.#X=null,this.#Z=null,this.#Y=null,this.#W=null,this.#J=null,this.#K=null,this.#Q.clear()}broadcast(G){for(let Y of this.#Q)Y(G)}#q(G){if(CJ(G)){let{messages:Y}=G,W=this.#G,J=Q0();for(let Z=Y;e0(Z);Z=e0(Z)){let Q=this.#q(eG(Z));if(R0(Q)){W=L0(Q)[0],J=P8(EZ([J,L0(Q)[1]]));break}}return this.#F(J),this.#G=W,this.#Z(W)}else if(xJ(G)){let{name:Y,value:W}=G,J=this.#I(Y,W);if(!R0(J))return this.#W;return this.#V(L0(J))}else if(fJ(G)){let{name:Y,value:W}=G,J=this.#H(Y,W);if(!R0(J))return this.#W;return this.#V(L0(J))}else if(bJ(G)){let{path:Y,name:W,event:J}=K,[Z,Q]=FZ(this.#J,Y,W,J);if(this.#J=Z,!R0(Q))return this.#W;let{message:K}=L0(Q);return this.#V(K)}else if(hJ(G)){let{key:Y,value:W}=G,J=FG(this.#Y.contexts,Y);if(!R0(J))return this.#W;if(J=YG(W,L0(J)),!R0(J))return this.#W;return this.#V(L0(J))}}#V(G){let[Y,W]=this.#X(this.#G,G);return this.#F(W),this.#G=Y,this.#Z(this.#G)}#I(G,Y){let W=FG(this.#Y.attributes,G);if(!R0(W))return W;return L0(W)(Y)}#H(G,Y){let W=FG(this.#Y.properties,G);if(!R0(W))return W;return L0(W)(Y)}#F(G){let Y=(V)=>this.send(NZ(V)),W=(V,F)=>this.send(SZ(V,F)),J=()=>{return},Z=()=>{return},Q=(V,F)=>this.send(UZ(V,F)),K=(V,F)=>this.send(OZ(V,F)),X=(V)=>this.send(jZ(V));globalThis.queueMicrotask(()=>{mW(G,Y,W,J,Z,Q,K,X)})}}class oZ extends I{constructor(G){super();this.selector=G}}var tZ=(G)=>new oZ(G);class eZ extends I{}var GQ=new eZ,$Y=()=>GQ;function YQ(G,Y,W){return new PY(d,G,Y,W,BZ)}function WQ(G,Y,W){return VW(!nG(),new Z0(GQ),()=>{return lZ(G,Y,W)})}function cY(G,Y,W){return G.slice(0,Y)+"    "+G.slice(W)}function pY(G,Y){let W=document.getElementById(G);if(W)W.selectionStart=W.selectionEnd=Y,W.focus()}function sY(G){return confirm(G)}function rY(G){alert(G)}class N1 extends I{}var S1=new N1;class n8 extends I{}var i8=new n8;class iG extends I{constructor(G,Y,W){super();this.category=G,this.subcategory=Y,this.title=W}}class J0 extends I{constructor(G,Y,W,J,Z,Q,K,X,V){super();this.route=G,this.selected_category=Y,this.selected_subcategory=W,this.selected=J,this.problem_index=Z,this.iteration_count=Q,this.current_iteration=K,this.draft=X,this.answer_revealed=V}}class e1 extends I{constructor(G){super();this[0]=G}}class G8 extends I{constructor(G){super();this[0]=G}}class Y8 extends I{constructor(G){super();this[0]=G}}class W8 extends I{constructor(G){super();this[0]=G}}class d8 extends I{}var JQ=new d8;class a8 extends I{}var ZQ=new a8;class J8 extends I{constructor(G){super();this[0]=G}}class l8 extends I{}var QQ=new l8;class Z8 extends I{}var KQ=new Z8;class Q8 extends I{constructor(G){super();this[0]=G}}class K8 extends I{}var XQ=new K8;class t8 extends I{}var VQ=new t8;class U1 extends I{constructor(G){super();this[0]=G}}class L1 extends I{constructor(G,Y,W){super();this.value=G,this.start=Y,this.end=W}}function X8(){return new J0(S1,d,d,C,0,3,1,"",!1)}class nY extends I{}var n=new nY;class FQ extends I{}var r=new FQ;class P extends I{constructor(G,Y,W,J){super();this.title=G,this.prompt=Y,this.solution=W,this.language=J}}class z0 extends I{constructor(G,Y){super();this.name=G,this.problems=Y}}class SG extends I{constructor(G,Y){super();this.name=G,this.subcategories=Y}}function IQ(G){if(G instanceof nY)return"Python";else return"Gleam"}function HQ(){return new SG("Gleam Tips",q([new z0("Idioms",q([new P("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",`pub fn length(items: List(a)) -> Int {
  case items {
    [] -> 0
    [_, ..rest] -> 1 + length(rest)
  }
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  case items {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [_, ..rest] -> last(rest)
  }
}`,r),new P("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",`pub fn reverse(items: List(a)) -> List(a) {
  reverse_loop(items, [])
}

fn reverse_loop(items: List(a), acc: List(a)) -> List(a) {
  case items {
    [] -> acc
    [first, ..rest] -> reverse_loop(rest, [first, ..acc])
  }
}

pub fn sum(numbers: List(Int)) -> Int {
  sum_loop(numbers, 0)
}

fn sum_loop(numbers: List(Int), acc: Int) -> Int {
  case numbers {
    [] -> acc
    [first, ..rest] -> sum_loop(rest, acc + first)
  }
}`,r),new P("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",`pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(list.fold(rest, first, int.max))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  list.fold(items, 0, fn(count, item) {
    case predicate(item) {
      True -> count + 1
      False -> count
    }
  })
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  list.scan(numbers, 0, fn(acc, n) { acc + n })
}`,r),new P("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.fold(dict.new(), fn(counts, word) {
    dict.upsert(counts, word, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`,r),new P("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",`pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  use port <- result.try(int.parse(port))
  use timeout <- result.try(int.parse(timeout))
  case host {
    "" -> Error(Nil)
    _ -> Ok(Config(host, port, timeout))
  }
}`,r),new P("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',`pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`,r),new P("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',`pub fn strip_comment(line: String) -> String {
  case line {
    "# " <> rest -> rest
    "#" <> rest -> rest
    _ -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.filter_map(fn(word) { list.first(string.to_graphemes(word)) })
  |> string.concat
  |> string.uppercase
}`,r),new P("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",`pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`,r),new P("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

pub fn add_points(player: Player, points: Int) -> Player {
  Player(..player, score: player.score + points)
}

pub fn level_up(player: Player) -> Player {
  Player(..player, level: player.level + 1, score: 0)
}`,r),new P("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",`pub fn dedupe(items: List(a)) -> List(a) {
  let #(kept, _) =
    list.fold(items, #([], set.new()), fn(acc, item) {
      let #(kept, seen) = acc
      case set.contains(seen, item) {
        True -> #(kept, seen)
        False -> #([item, ..kept], set.insert(seen, item))
      }
    })
  list.reverse(kept)
}`,r)]))]))}function qQ(){return new SG("NeetCode 150 (Gleam)",q([new z0("Arrays & Hashing",q([new P("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Solve it in Gleam.",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
  check(nums, set.new())
}

fn check(nums: List(Int), seen: set.Set(Int)) -> Bool {
  case nums {
    [] -> False
    [n, ..rest] ->
      case set.contains(seen, n) {
        True -> True
        False -> check(rest, set.insert(seen, n))
      }
  }
}`,r),new P("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise. Solve it in Gleam.",`pub fn is_anagram(s: String, t: String) -> Bool {
  counts(s) == counts(t)
}

fn counts(word: String) -> dict.Dict(String, Int) {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`,r),new P("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Solve it in Gleam.",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  find_pair(nums, target, 0, dict.new())
}

fn find_pair(
  nums: List(Int),
  target: Int,
  i: Int,
  seen: dict.Dict(Int, Int),
) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case dict.get(seen, target - n) {
        Ok(j) -> Ok(#(j, i))
        Error(Nil) -> find_pair(rest, target, i + 1, dict.insert(seen, n, i))
      }
  }
}`,r),new P("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve it in Gleam.",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    let key =
      string.to_graphemes(s)
      |> list.sort(string.compare)
      |> string.concat
    dict.upsert(acc, key, fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}`,r),new P("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Note: Gleam's stdlib has no heap - counting then sorting by frequency is the idiomatic approach. Solve it in Gleam.",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  nums
  |> list.fold(dict.new(), fn(acc, n) {
    dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { int.compare(b.1, a.1) })
  |> list.take(k)
  |> list.map(fn(pair) { pair.0 })
}`,r),new P("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time. Solve it in Gleam.",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
  let n = list.length(nums)
  let prefixes =
    [1, ..list.take(list.scan(nums, 1, fn(acc, x) { acc * x }), n - 1)]
  let suffixes =
    list.reverse(nums)
    |> list.scan(1, fn(acc, x) { acc * x })
    |> list.take(n - 1)
    |> fn(scanned) { [1, ..scanned] }
    |> list.reverse
  list.map2(prefixes, suffixes, fn(prefix, suffix) { prefix * suffix })
}`,r),new P("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time. Solve it in Gleam.",`pub fn longest_consecutive(nums: List(Int)) -> Int {
  let all = set.from_list(nums)
  all
  |> set.to_list
  |> list.fold(0, fn(best, n) {
    case set.contains(all, n - 1) {
      True -> best
      False -> int.max(best, run_length(all, n, 0))
    }
  })
}

fn run_length(all: set.Set(Int), n: Int, count: Int) -> Int {
  case set.contains(all, n) {
    True -> run_length(all, n + 1, count + 1)
    False -> count
  }
}`,r)])),new z0("Two Pointers",q([new P("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Note: in Gleam, comparing the cleaned graphemes with their reverse is the idiomatic answer. Solve it in Gleam.",`pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  cleaned == list.reverse(cleaned)
}

fn is_alphanumeric(g: String) -> Bool {
  case string.to_utf_codepoints(g) {
    [c] -> {
      let n = string.utf_codepoint_to_int(c)
      is_digit(n) || is_lowercase_letter(n)
    }
    _ -> False
  }
}

fn is_digit(n: Int) -> Bool {
  n >= 48 && n <= 57
}

fn is_lowercase_letter(n: Int) -> Bool {
  n >= 97 && n <= 122
}`,r),new P("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",`pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  search(numbers, list.reverse(numbers), 1, list.length(numbers), target)
}

fn search(
  from_left: List(Int),
  from_right: List(Int),
  lo: Int,
  hi: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case from_left, from_right {
    [left, ..left_rest], [right, ..right_rest] ->
      case lo >= hi {
        True -> Error(Nil)
        False ->
          case int.compare(left + right, target) {
            order.Eq -> Ok(#(lo, hi))
            order.Lt -> search(left_rest, from_right, lo + 1, hi, target)
            order.Gt -> search(from_left, right_rest, lo, hi - 1, target)
          }
      }
    _, _ -> Error(Nil)
  }
}`,r),new P("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  let sorted = list.sort(nums, int.compare)
  outer(sorted, set.new())
  |> set.to_list
}

fn outer(
  nums: List(Int),
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [first, ..rest] ->
      outer(rest, inner(first, rest, list.reverse(rest), list.length(rest), acc))
  }
}

fn inner(
  first: Int,
  from_left: List(Int),
  from_right: List(Int),
  remaining: Int,
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case remaining < 2 {
    True -> acc
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] ->
          case int.compare(first + left + right, 0) {
            order.Eq ->
              inner(
                first,
                left_rest,
                from_right,
                remaining - 1,
                set.insert(acc, #(first, left, right)),
              )
            order.Lt -> inner(first, left_rest, from_right, remaining - 1, acc)
            order.Gt -> inner(first, from_left, right_rest, remaining - 1, acc)
          }
        _, _ -> acc
      }
  }
}`,r),new P("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",`pub fn max_area(heights: List(Int)) -> Int {
  converge(heights, list.reverse(heights), list.length(heights) - 1, 0)
}

fn converge(
  from_left: List(Int),
  from_right: List(Int),
  width: Int,
  best: Int,
) -> Int {
  case width <= 0 {
    True -> best
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] -> {
          let area = int.min(left, right) * width
          let best = int.max(best, area)
          case left < right {
            True -> converge(left_rest, from_right, width - 1, best)
            False -> converge(from_left, right_rest, width - 1, best)
          }
        }
        _, _ -> best
      }
  }
}`,r)])),new z0("Sliding Window",q([new P("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell. Solve it in Gleam.",`pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [first, ..rest] -> {
      let #(_, best) =
        list.fold(rest, #(first, 0), fn(acc, price) {
          let #(min_price, best) = acc
          #(int.min(min_price, price), int.max(best, price - min_price))
        })
      best
    }
  }
}`,r),new P("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters. Solve it in Gleam.",`pub fn length_of_longest_substring(s: String) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.index_fold(#(dict.new(), 0, 0), fn(acc, g, i) {
      let #(last_seen, start, best) = acc
      let start = case dict.get(last_seen, g) {
        Ok(j) if j >= start -> j + 1
        _ -> start
      }
      #(dict.insert(last_seen, g, i), start, int.max(best, i - start + 1))
    })
  best
}`,r),new P("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get. Solve it in Gleam.",`pub fn character_replacement(s: String, k: Int) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.fold(#(dict.new(), [], 0), fn(acc, g) {
      let #(counts, window, best) = acc
      let counts = dict.upsert(counts, g, fn(n) { option.unwrap(n, 0) + 1 })
      let window = list.append(window, [g])
      let #(counts, window) = shrink(counts, window, k)
      #(counts, window, int.max(best, list.length(window)))
    })
  best
}

fn shrink(
  counts: dict.Dict(String, Int),
  window: List(String),
  k: Int,
) -> #(dict.Dict(String, Int), List(String)) {
  let size = list.length(window)
  let max_count = dict.fold(counts, 0, fn(top, _, count) { int.max(top, count) })
  case size - max_count > k, window {
    True, [oldest, ..rest] ->
      shrink(
        dict.upsert(counts, oldest, fn(n) { option.unwrap(n, 1) - 1 }),
        rest,
        k,
      )
    _, _ -> #(counts, window)
  }
}`,r),new P("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2. Solve it in Gleam.",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle = counts(string.to_graphemes(s1))
  let size = string.length(s1)
  let graphemes = string.to_graphemes(s2)
  slide(
    graphemes,
    list.drop(graphemes, size),
    counts(list.take(graphemes, size)),
    needle,
  )
}

fn counts(graphemes: List(String)) -> dict.Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

fn slide(
  window_start: List(String),
  upcoming: List(String),
  window: dict.Dict(String, Int),
  needle: dict.Dict(String, Int),
) -> Bool {
  case window == needle {
    True -> True
    False ->
      case window_start, upcoming {
        [oldest, ..rest_start], [next, ..rest_upcoming] ->
          slide(
            rest_start,
            rest_upcoming,
            window
              |> remove_one(oldest)
              |> dict.upsert(next, fn(n) { option.unwrap(n, 0) + 1 }),
            needle,
          )
        _, _ -> False
      }
  }
}

fn remove_one(
  window: dict.Dict(String, Int),
  g: String,
) -> dict.Dict(String, Int) {
  case dict.get(window, g) {
    Ok(1) -> dict.delete(window, g)
    Ok(n) -> dict.insert(window, g, n - 1)
    Error(Nil) -> window
  }
}`,r)])),new z0("Stack",q([new P("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Solve it in Gleam.",`pub fn is_valid(s: String) -> Bool {
  check(string.to_graphemes(s), [])
}

fn check(graphemes: List(String), stack: List(String)) -> Bool {
  case graphemes, stack {
    [], [] -> True
    [], _ -> False
    ["(", ..rest], _ -> check(rest, [")", ..stack])
    ["[", ..rest], _ -> check(rest, ["]", ..stack])
    ["{", ..rest], _ -> check(rest, ["}", ..stack])
    [close, ..rest], [expected, ..stack_rest] ->
      close == expected && check(rest, stack_rest)
    _, _ -> False
  }
}`,r),new P("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Note: model the stack as a list of #(value, min_so_far) tuples returned from each operation. Solve it in Gleam.",`pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  MinStack([])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let min = case stack.entries {
    [#(_, current_min), ..] -> int.min(value, current_min)
    [] -> value
  }
  MinStack([#(value, min), ..stack.entries])
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.entries {
    [_, ..rest] -> MinStack(rest)
    [] -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(value, _), ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(_, min), ..] -> Ok(min)
    [] -> Error(Nil)
  }
}`,r),new P("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. Solve it in Gleam.",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  let #(answers, _) =
    temps
    |> list.index_fold(#(dict.new(), []), fn(acc, temp, i) {
      let #(answers, stack) = acc
      let #(answers, stack) = pop_colder(answers, stack, temp, i)
      #(answers, [#(i, temp), ..stack])
    })
  list.index_map(temps, fn(_, i) {
    case dict.get(answers, i) {
      Ok(days) -> days
      Error(Nil) -> 0
    }
  })
}

fn pop_colder(
  answers: dict.Dict(Int, Int),
  stack: List(#(Int, Int)),
  temp: Int,
  i: Int,
) -> #(dict.Dict(Int, Int), List(#(Int, Int))) {
  case stack {
    [#(j, colder), ..rest] if colder < temp ->
      pop_colder(dict.insert(answers, j, i - j), rest, temp, i)
    _ -> #(answers, stack)
  }
}`,r)])),new z0("Binary Search",q([new P("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> halve(left, target, offset)
            order.Gt -> halve(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`,r),new P("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [a, b] -> Ok(int.min(a, b))
    _ -> {
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case first <= last {
        // This segment is fully sorted: the rotation point is not inside it.
        True -> Ok(first)
        False -> {
          let half = list.length(nums) / 2
          let #(left, right) = list.split(nums, half)
          case right {
            [mid, ..after] ->
              case mid >= first {
                // Left half sorted: the minimum is past the midpoint.
                True -> find_min(after)
                // Rotation point is in the left half, up to and including mid.
                False -> find_min(list.append(left, [mid]))
              }
            [] -> Error(Nil)
          }
        }
      }
    }
  }
}`,r),new P("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] ->
      case only == target {
        True -> Ok(offset)
        False -> Error(Nil)
      }
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case right {
        [mid, ..after] ->
          case mid == target {
            True -> Ok(offset + half)
            False ->
              case first <= mid {
                // Left half is sorted.
                True ->
                  case first <= target && target < mid {
                    True -> halve(left, target, offset)
                    False -> halve(after, target, offset + half + 1)
                  }
                // Right half is sorted.
                False ->
                  case mid < target && target <= last {
                    True -> halve(after, target, offset + half + 1)
                    False -> halve(left, target, offset)
                  }
              }
          }
        [] -> Error(Nil)
      }
    }
  }
}`,r)]))]))}function zQ(){return new SG("NeetCode 150",q([new z0("Arrays & Hashing",q([new P("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,n),new P("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",`def isAnagram(s, t):
    if len(s) != len(t):
        return False

    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] < 0:
            return False

    return True`,n),new P("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,n),new P("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`,n),new P("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",`from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,n),new P("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",`def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    return result`,n),new P("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`,n)])),new z0("Two Pointers",q([new P("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",`def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`,n),new P("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`,n),new P("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",`def threeSum(nums):
    nums.sort()
    result = []

    for i, a in enumerate(nums):
        if i > 0 and a == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1
        while left < right:
            total = a + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([a, nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

    return result`,n),new P("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`,n)])),new z0("Sliding Window",q([new P("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`,n),new P("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`,n),new P("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",`def characterReplacement(s, k):
    count = {}
    left = 0
    max_count = 0
    longest = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_count = max(max_count, count[s[right]])

        while (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1

        longest = max(longest, right - left + 1)

    return longest`,n),new P("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",`from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    need = Counter(s1)
    window = Counter(s2[:len(s1)])

    if window == need:
        return True

    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left_char = s2[i - len(s1)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]
        if window == need:
            return True

    return False`,n)])),new z0("Stack",q([new P("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`,n),new P("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",`class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        current_min = val if not self.mins else min(val, self.mins[-1])
        self.mins.append(current_min)

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]`,n),new P("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`,n)])),new z0("Binary Search",q([new P("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,n),new P("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`,n),new P("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,n)]))]))}function MQ(){return new SG("Python Tips",q([new z0("Idioms",q([new P("Counter for frequency maps","Write the idiomatic way to count element frequencies and get the n most common items.",`from collections import Counter

counts = Counter(nums)
counts.most_common(2)   # [(val, freq), (val, freq)]
counts[some_key]        # 0 for missing keys, no KeyError`,n),new P("defaultdict for grouping","Write the idiomatic way to group items into lists by a computed key, without checking whether the key exists.",`from collections import defaultdict

groups = defaultdict(list)
for word in words:
    groups[sorted(word)].append(word)

# defaultdict(int) for counters
# defaultdict(set) for unique membership`,n),new P("deque for O(1) popleft","Write a BFS skeleton using the right data structure for a queue.",`from collections import deque

queue = deque([start])
while queue:
    node = queue.popleft()   # O(1); list.pop(0) is O(n)
    for neighbor in graph[node]:
        queue.append(neighbor)`,n),new P("heapq for min/max heaps","Write how to build a min heap, push and pop, and how to fake a max heap.",`import heapq

heap = [3, 1, 4]
heapq.heapify(heap)      # O(n)
heapq.heappush(heap, 2)
smallest = heapq.heappop(heap)

# max heap: negate the values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)`,n),new P("Enumerate, zip, and unpacking","Write the idiomatic ways to iterate with an index, iterate two sequences in parallel, and swap two variables.",`for i, val in enumerate(nums):
    ...

for a, b in zip(list_a, list_b):
    ...

for i, val in enumerate(nums, start=1):  # 1-indexed
    ...

left, right = right, left`,n),new P("Slicing and reversal","Write how to reverse a sequence, take every nth element, and copy a list with slicing.",`s[::-1]      # reversed
s[::2]       # every 2nd element
s[:]         # shallow copy
s[-3:]       # last 3 elements
s[1:-1]      # drop first and last`,n),new P("Sorting with a key","Write how to sort by a custom key, sort descending, and sort by multiple fields.",`nums.sort()                          # in place
sorted_nums = sorted(nums)           # new list

words.sort(key=len)
words.sort(key=len, reverse=True)

# multiple fields: ascending name, descending age
people.sort(key=lambda p: (p.name, -p.age))`,n),new P("Building strings efficiently","Write the O(n) way to build a string from many pieces, and explain what to avoid.",`# Good: O(n)
parts = []
for c in chars:
    parts.append(c)
result = ''.join(parts)

# Bad: O(n^2) — strings are immutable,
# every += allocates a new string
result = ''
for c in chars:
    result += c`,n)]))]))}function e8(){return q([zQ(),qQ(),MQ(),HQ()])}function NQ(){return H0(e8(),(G)=>{return G.name})}function SQ(G){let Y=J1(e8(),(W)=>{return W.name===G});if(Y instanceof E){let W=Y[0];return H0(W.subcategories,(J)=>{return J.name})}else return C}function G6(G,Y){let W=J1(e8(),(J)=>{return J.name===G});if(W instanceof E){let J=W[0],Z=J1(J.subcategories,(Q)=>{return Q.name===Y});if(Z instanceof E)return Z[0].problems;else return C}else return C}function RQ(G,Y,W){let J=J1(G,Y);if(J instanceof E){let Z=J[0];return W(Z)}else return J}function Y6(G,Y,W){return RQ(e8(),(J)=>{return J.name===G},(J)=>{return RQ(J.subcategories,(Z)=>{return Z.name===Y},(Z)=>{return J1(Z.problems,(Q)=>{return Q.title===W})})})}function J6(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return e(globalThis.localStorage);else return X0(null)}catch{return X0(null)}}function Z6(G,Y){return QX(G.getItem(Y))}function iY(G,Y,W){try{return G.setItem(Y,W),e(null)}catch{return X0(null)}}function QX(G){if(G!==null)return e(G);else return X0(null)}var XX="algoDrillState",UQ="algoDrillState.v2";function LQ(G){let Y=W1(G.selected,(Z)=>{if(Y6(Z.category,Z.subcategory,Z.title)instanceof E)return!0;else return!1}),W=new J0(G.route,G.selected_category,G.selected_subcategory,Y,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed);if(W.route instanceof n8&&W.problem_index>=HG(Y))return new J0(S1,W.selected_category,W.selected_subcategory,W.selected,0,W.iteration_count,1,W.draft,W.answer_revealed);else return W}function OQ(){return V0("category",N0,(G)=>{return V0("subcategory",N0,(Y)=>{return V0("title",N0,(W)=>{return S0(new iG(G,Y,W))})})})}function Q6(G,Y){return v9(G,d,m9(N0),Y)}function DQ(){return u9(N0,(G)=>{if(G==="drill")return S0(i8);else return S0(S1)})}function VX(){return V0("currentView",DQ(),(G)=>{return Q6("selectedCategory",(Y)=>{return Q6("selectedSubcategory",(W)=>{return V0("selectedProblems",b1(OQ()),(J)=>{return V0("currentProblemIndex",h0,(Z)=>{return V0("iterationCount",h0,(Q)=>{return V0("currentIteration",h0,(K)=>{return S0(new J0(G,Y,W,J,Z,Q,K,"",!1))})})})})})})})}function FX(G){let Y=Z6(G,XX);if(Y instanceof E){let W=Y[0],J=y6(W,VX()),Z=L8(J,LQ);return E6(Z,X8())}else return X8()}function IX(){return V0("route",DQ(),(G)=>{return Q6("selectedCategory",(Y)=>{return Q6("selectedSubcategory",(W)=>{return V0("selected",b1(OQ()),(J)=>{return V0("problemIndex",h0,(Z)=>{return V0("iterationCount",h0,(Q)=>{return V0("currentIteration",h0,(K)=>{return S0(new J0(G,Y,W,J,Z,Q,K,"",!1))})})})})})})})}function jQ(){let G=J6();if(G instanceof E){let Y=G[0],W=Z6(Y,UQ);if(W instanceof E){let J=W[0],Z=y6(J,IX()),Q=L8(Z,LQ);return E6(Q,X8())}else return FX(Y)}else return X8()}function HX(G){let Y=v1(q([["route",_0((()=>{if(G.route instanceof N1)return"menu";else return"drill"})())],["selectedCategory",g6(G.selected_category,_0)],["selectedSubcategory",g6(G.selected_subcategory,_0)],["selected",j8(G.selected,(W)=>{return v1(q([["category",_0(W.category)],["subcategory",_0(W.subcategory)],["title",_0(W.title)]]))})],["problemIndex",mG(G.problem_index)],["iterationCount",mG(G.iteration_count)],["currentIteration",mG(G.current_iteration)]]));return UW(Y)}function TQ(G){return $1((Y)=>{let W=J6();if(W instanceof E){let J=W[0],Z=iY(J,UQ,HX(G));return}else return})}function dY(G,Y){return s6(G,hG(Y,(W)=>{return new V1(!1,!1,W)}),w,$6,$6,0,0)}function K6(G,Y){return s6(G,Y,w,c6,c6,0,0)}function aG(G,Y,W){return new V1(Y,W,G)}function QG(G){return dY("click",S0(G))}function AQ(G){return dY("input",DG(q(["target","value"]),N0,(Y)=>{return S0(G(Y))}))}function BQ(G){return dY("change",DG(q(["target","value"]),N0,(Y)=>{return S0(G(Y))}))}function MX(){return K6("keydown",V0("key",N0,(G)=>{return DG(q(["target","value"]),N0,(Y)=>{return DG(q(["target","selectionStart"]),h0,(W)=>{return DG(q(["target","selectionEnd"]),h0,(J)=>{if(G==="Tab")return S0(aG(new L1(Y,W,J),!0,!1));else return g1(aG(new L1("",0,0),!1,!1),"key")})})})}))}function RX(G,Y,W){let J="Problem "+q0(G.problem_index+1)+"/"+q0(HG(G.selected))+" | Iteration "+q0(G.current_iteration)+"/"+q0(G.iteration_count),Z=Y.category+"|"+Y.subcategory+"|"+Y.title+"|"+q0(G.current_iteration);return M1(q([$("drill-container")]),q([["header",K0(q([$("drill-header")]),q([PG(q([i0("exitDrill"),$("btn-secondary"),QG(KQ)]),q([l("Exit drill")])),K0(q([$("progress-text")]),q([l(J)]))]))],[Z,tW(q([K0(q([$("problem-section")]),q([YJ(C,q([l(W.title)])),K0(q([$("problem-category")]),q([l(Y.category+" › "+Y.subcategory+" · "+IQ(W.language))])),K0(q([$("problem-prompt")]),q([l(W.prompt)]))])),K0(q([$("code-section")]),q([XJ(q([i0("codeEditor"),hW("Write your solution here..."),kW(!1),B8(G.draft),AQ((Q)=>{return new U1(Q)}),MX()]),G.draft)])),K0(q([$("answer-section")]),q([PG(q([i0("toggleAnswer"),$("btn-secondary"),QG(XQ)]),q([l((()=>{if(G.answer_revealed)return"Hide answer";else return"Show answer"})())])),K0(q([i0("answerContent"),A8(q([["answer-content",!0],["hidden",!G.answer_revealed]]))]),q([JJ(C,q([ZJ(C,q([l(W.solution)]))]))]))])),K0(q([$("drill-footer")]),q([PG(q([i0("nextProblem"),$("btn-primary"),QG(VQ)]),q([l("Next")]))]))]))]]))}function wQ(G){return _1((()=>{let Y=G.selected,W=O9(Y,G.problem_index);return U9(W)})(),(Y)=>{return _1(Y6(Y.category,Y.subcategory,Y.title),(W)=>{return new E(RX(G,Y,W))})})}var CQ="src/algodrill/view/menu.gleam";function SX(G){return K6("keydown",V0("key",N0,(Y)=>{if(Y==="Enter")return S0(aG(G,!0,!1));else if(Y===" ")return S0(aG(G,!0,!1));else return g1(aG(G,!1,!1),"key")}))}function aY(G,Y,W){return K0(q([A8(q([["pane-item",!0],["selected",Y]])),fW(0),QG(W),SX(W)]),q([l(G)]))}function lY(G,Y){return K0(q([$("pane")]),q([WJ(C,q([l(G)])),Y]))}function UX(G,Y){return lY("Problems",(()=>{if(Y instanceof L)return K0(q([$("pane-list")]),q([K0(q([$("pane-empty")]),q([l("Pick a subcategory first")]))]));else{let W=G.selected_category,J;if(W instanceof m)J=W[0];else throw xG("let_assert",CQ,"algodrill/view/menu",171,"problem_pane","Pattern match failed, no pattern matched the value.",{value:W,start:4696,end:4742,pattern_start:4707,pattern_end:4716});let Z=G.selected_subcategory,Q;if(Z instanceof m)Q=Z[0];else throw xG("let_assert",CQ,"algodrill/view/menu",172,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Z,start:4749,end:4798,pattern_start:4760,pattern_end:4769});return M1(q([$("pane-list")]),H0(Y,(K)=>{let X=new iG(J,Q,K.title);return[K.title,aY(K.title,k1(G.selected,X),new W8(X))]}))}})())}function LX(G){let Y,W=G.selected_category;if(W instanceof m){let Z=W[0];Y=SQ(Z)}else Y=C;let J=Y;return lY("Subcategory",(()=>{if(J instanceof L)return K0(q([$("pane-list")]),q([K0(q([$("pane-empty")]),q([l("Pick a category first")]))]));else return M1(q([$("pane-list")]),H0(J,(Z)=>{return[Z,aY(Z,Y0(G.selected_subcategory,new m(Z)),new G8(Z))]}))})())}function OX(G){return lY("Category",M1(q([$("pane-list")]),H0(NQ(),(Y)=>{return[Y,aY(Y,Y0(G.selected_category,new m(Y)),new e1(Y))]})))}function DX(G){let Y,W=q(["Categories"]),J=b0(W,H6(q([G.selected_category])));Y=b0(J,H6(q([G.selected_subcategory])));let Z=Y,Q=HG(Z)-1;return K0(q([$("breadcrumbs")]),(()=>{let X=L9(Z,(V,F)=>{if(F===Q)return q([n1(q([$("breadcrumb")]),q([l(V)]))]);else return q([n1(q([$("breadcrumb clickable"),QG(new Y8(F))]),q([l(V)])),l(" "),n1(q([$("breadcrumb")]),q([l("/")])),l(" ")])});return D9(X)})())}function tY(G){let Y,W=G.selected_category,J=G.selected_subcategory;if(W instanceof m&&J instanceof m){let Q=W[0],K=J[0];Y=G6(Q,K)}else Y=C;let Z=Y;return K0(q([$("menu-container")]),q([DX(G),K0(q([$("panes-container")]),q([OX(G),LX(G),UX(G,Z)])),K0(q([$("iteration-control")]),q([KJ(q([yW("iterations")]),q([l("Repetitions per problem")])),QJ(q([_W("number"),i0("iterations"),gW("1"),bW("20"),B8(q0(G.iteration_count)),BQ((Q)=>{return new J8(Q)})])),n1(q([$("progress-text")]),q([l(q0(HG(G.selected))+" selected")]))])),PG(q([i0("startDrill"),$("btn-primary"),n6(G.selected instanceof L),QG(QQ)]),q([l("Start drill")])),l(" "),PG(q([i0("selectAll"),$("btn-secondary"),n6(Z instanceof L),QG(JQ)]),q([l("Select all in subcategory")])),l(" "),PG(q([i0("clearSelection"),$("btn-secondary"),QG(ZQ)]),q([l("Clear selection")]))]))}var TX="src/algodrill.gleam";function AX(G){if(G.route instanceof N1)return tY(G);else{let W=wQ(G);if(W instanceof E)return W[0];else return tY(G)}}function BX(G){if(G instanceof Z8)return!1;else if(G instanceof Q8)if(!G[0])return!1;else return!0;else if(G instanceof K8)return!1;else if(G instanceof U1)return!1;else if(G instanceof L1)return!1;else return!0}function EQ(G){return new J0(S1,G.selected_category,G.selected_subcategory,G.selected,0,G.iteration_count,1,"",!1)}function PX(G,Y){if(k1(G,Y))return W1(G,(J)=>{return!Y0(J,Y)});else return b0(G,q([Y]))}function wX(G,Y){if(Y instanceof e1){let W=Y[0];return[new J0(G.route,new m(W),d,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()]}else if(Y instanceof G8){let W=Y[0];return[new J0(G.route,G.selected_category,new m(W),G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()]}else if(Y instanceof Y8)if(Y[0]===0)return[new J0(G.route,d,d,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()];else return[new J0(G.route,G.selected_category,d,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()];else if(Y instanceof W8){let W=Y[0];return[new J0(G.route,G.selected_category,G.selected_subcategory,PX(G.selected,W),G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()]}else if(Y instanceof d8){let{selected_category:W,selected_subcategory:J}=G;if(W instanceof m&&J instanceof m){let Z=W[0],Q=J[0],K,X=G6(Z,Q),V=H0(X,(H)=>{return new iG(Z,Q,H.title)});K=W1(V,(H)=>{return!k1(G.selected,H)});let F=K;return[new J0(G.route,G.selected_category,G.selected_subcategory,b0(G.selected,F),G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()]}else return[G,Q0()]}else if(Y instanceof a8)return[new J0(G.route,G.selected_category,G.selected_subcategory,C,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.answer_revealed),Q0()];else if(Y instanceof J8){let W=Y[0],J,Z=P6(W);if(Z instanceof E){let K=Z[0];if(K>0)J=K;else J=1}else J=1;let Q=J;return[new J0(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,Q,G.current_iteration,G.draft,G.answer_revealed),Q0()]}else if(Y instanceof l8)if(G.selected instanceof L)return[G,Q0()];else return[new J0(i8,G.selected_category,G.selected_subcategory,G.selected,0,G.iteration_count,1,"",!1),Q0()];else if(Y instanceof Z8)return[G,$1((W)=>{return W(new Q8(sY("Exit the drill? Your typed code will be lost.")))})];else if(Y instanceof Q8)if(Y[0])return[EQ(G),Q0()];else return[G,Q0()];else if(Y instanceof K8)return[new J0(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,!G.answer_revealed),Q0()];else if(Y instanceof t8){let W;if(G.current_iteration<G.iteration_count)W=[G.current_iteration+1,G.problem_index];else W=[1,G.problem_index+1];let Z=W,Q=Z[0],K=Z[1];if(K>=HG(G.selected))return[EQ(G),$1((V)=>{return rY("Drill complete.")})];else return[new J0(G.route,G.selected_category,G.selected_subcategory,G.selected,K,G.iteration_count,Q,"",!1),Q0()]}else if(Y instanceof U1){let W=Y[0];return[new J0(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,W,G.answer_revealed),Q0()]}else{let{value:W,start:J,end:Z}=Y;return[new J0(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,cY(W,J,Z),G.answer_revealed),i6((Q,K)=>{return pY("codeEditor",J+4)})]}}function CX(G,Y){let W=wX(G,Y),J=W[0],Z=W[1];if(BX(Y))return[J,P8(q([TQ(J),Z]))];else return[J,Z]}function EX(G){return[jQ(),Q0()]}function xQ(){let G=YQ(EX,CX,AX),Y=WQ(G,"#app",void 0);if(!(Y instanceof E))throw xG("let_assert",TX,"algodrill",23,"main","Pattern match failed, no pattern matched the value.",{value:Y,start:763,end:812,pattern_start:774,pattern_end:779});return}xQ();
