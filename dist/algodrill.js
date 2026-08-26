class P{withFields(I){let Z=Object.keys(this).map((J)=>(J in I)?I[J]:this[J]);return new this.constructor(...Z)}}class oZ{static fromArray(I,Z){return V(I,Z)}[Symbol.iterator](){return new nq(this)}toArray(){return[...this]}atLeastLength(I){let Z=this;while(I-- >0&&Z)Z=Z.tail;return Z!==void 0}hasLength(I){let Z=this;while(I-- >0&&Z)Z=Z.tail;return I===-1&&Z instanceof y}countLength(){let I=this,Z=0;while(I)I=I.tail,Z++;return Z-1}}function C(I,Z){return new M7(I,Z)}function V(I,Z){let J=Z||f;for(let Q=I.length-1;Q>=0;--Q)J=new M7(I[Q],J);return J}class nq{#I;constructor(I){this.#I=I}next(){if(this.#I instanceof y)return{done:!0};else{let{head:I,tail:Z}=this.#I;return this.#I=Z,{value:I,done:!1}}}}class y extends oZ{}var f=new y,gq=()=>f,eZ=(I)=>I instanceof y;class M7 extends oZ{constructor(I,Z){super();this.head=I,this.tail=Z}}var K8=(I,Z)=>new M7(I,Z),X6=(I)=>I instanceof M7,W8=(I)=>I.head,f4=(I)=>I.tail;class A7{bitSize;byteSize;bitOffset;rawBuffer;constructor(I,Z,J){if(!(I instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=Z??I.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=J??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(I.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=I}byteAt(I){if(I<0||I>=this.byteSize)return;return R7(this.rawBuffer,this.bitOffset,I)}equals(I){if(this.bitSize!==I.bitSize)return!1;let Z=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&I.bitOffset===0){for(let Q=0;Q<Z;Q++)if(this.rawBuffer[Q]!==I.rawBuffer[Q])return!1;let J=this.bitSize%8;if(J){let Q=8-J;if(this.rawBuffer[Z]>>Q!==I.rawBuffer[Z]>>Q)return!1}}else{for(let Q=0;Q<Z;Q++){let X=R7(this.rawBuffer,this.bitOffset,Q),Y=R7(I.rawBuffer,I.bitOffset,Q);if(X!==Y)return!1}let J=this.bitSize%8;if(J){let Q=R7(this.rawBuffer,this.bitOffset,Z),X=R7(I.rawBuffer,I.bitOffset,Z),Y=8-J;if(Q>>Y!==X>>Y)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function R7(I,Z,J){if(Z===0)return I[J]??0;else{let Q=I[J]<<Z&255,X=I[J+1]>>8-Z;return Q|X}}class IJ{constructor(I){this.value=I}}class W9 extends P{static isResult(I){return I instanceof W9}}class R extends W9{constructor(I){super();this[0]=I}isOk(){return!0}}var m1=(I)=>new R(I),O0=(I)=>I instanceof R,D0=(I)=>I[0];class V1 extends W9{constructor(I){super();this[0]=I}isOk(){return!1}}var o1=(I)=>new V1(I),fq=(I)=>I instanceof V1;function S1(I,Z){let J=[I,Z];while(J.length){let Q=J.pop(),X=J.pop();if(Q===X)continue;if(!xq(Q)||!xq(X))return!1;if(!cF(Q,X)||gF(Q,X)||fF(Q,X)||uF(Q,X)||$F(Q,X)||mF(Q,X)||vF(Q,X))return!1;let q=Object.getPrototypeOf(Q);if(q!==null&&typeof q.equals==="function")try{if(Q.equals(X))continue;else return!1}catch{}let[K,W]=nF(Q),G=K(Q),U=K(X);if(G.length!==U.length)return!1;for(let z of G)J.push(W(Q,z),W(X,z))}return!0}function nF(I){if(I instanceof Map)return[(Z)=>Z.keys(),(Z,J)=>Z.get(J)];else{let Z=I instanceof globalThis.Error?["message"]:[];return[(J)=>[...Z,...Object.keys(J)],(J,Q)=>J[Q]]}}function gF(I,Z){return I instanceof Date&&(I>Z||I<Z)}function fF(I,Z){return!(I instanceof A7)&&I.buffer instanceof ArrayBuffer&&I.BYTES_PER_ELEMENT&&!(I.byteLength===Z.byteLength&&I.every((J,Q)=>J===Z[Q]))}function uF(I,Z){return Array.isArray(I)&&I.length!==Z.length}function $F(I,Z){return I instanceof Map&&I.size!==Z.size}function mF(I,Z){return I instanceof Set&&(I.size!=Z.size||[...I].some((J)=>!Z.has(J)))}function vF(I,Z){return I instanceof RegExp&&(I.source!==Z.source||I.flags!==Z.flags)}function xq(I){return typeof I==="object"&&I!==null}function cF(I,Z){if(typeof I!=="object"&&typeof Z!=="object"&&(!I||!Z))return!1;if([Promise,WeakSet,WeakMap,Function].some((Q)=>I instanceof Q))return!1;return I.constructor===Z.constructor}function y6(I,Z){return Math.trunc(ZJ(I,Z))}function ZJ(I,Z){if(Z===0)return 0;else return I/Z}function R5(I,Z,J,Q,X,Y,q){let K=new globalThis.Error(Y);K.gleam_error=I,K.file=Z,K.module=J,K.line=Q,K.function=X,K.fn=X;for(let W in q)K[W]=q[W];return K}class m0 extends P{}var M5=new m0,uq=()=>M5;class L0 extends P{}var A5=new L0,$q=()=>A5;class JJ extends P{}var D5=new JJ,mq=()=>D5;class a extends P{constructor(I){super();this[0]=I}}var G9=(I)=>I instanceof a,U9=(I)=>I[0];class U4 extends P{}var U1=new U4;function pF(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else{let X=J.head;I=J.tail,Z=C(X,Q)}}}function sF(I){return pF(I,f)}function dF(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return sF(Q);else{let X=J.head;if(X instanceof a){let Y=J.tail,q=X[0];I=Y,Z=C(q,Q)}else I=J.tail,Z=Q}}}function QJ(I){return dF(I,f)}var vq=new WeakMap,XJ=new DataView(new ArrayBuffer(8)),YJ=0;function qJ(I){let Z=vq.get(I);if(Z!==void 0)return Z;let J=YJ++;if(YJ===2147483647)YJ=0;return vq.set(I,J),J}function KJ(I,Z){return I^Z+2654435769+(I<<6)+(I>>2)|0}function WJ(I){let Z=0,J=I.length;for(let Q=0;Q<J;Q++)Z=Math.imul(31,Z)+I.charCodeAt(Q)|0;return Z}function sq(I){XJ.setFloat64(0,I);let Z=XJ.getInt32(0),J=XJ.getInt32(4);return Math.imul(73244475,Z>>16^Z)^J}function iF(I){return WJ(I.toString())}function lF(I){let Z=Object.getPrototypeOf(I);if(Z!==null&&typeof Z.hashCode==="function")try{let Q=I.hashCode(I);if(typeof Q==="number")return Q}catch{}if(I instanceof Promise||I instanceof WeakSet||I instanceof WeakMap)return qJ(I);if(I instanceof Date)return sq(I.getTime());let J=0;if(I instanceof ArrayBuffer)I=new Uint8Array(I);if(Array.isArray(I)||I instanceof Uint8Array)for(let Q=0;Q<I.length;Q++)J=Math.imul(31,J)+z4(I[Q])|0;else if(I instanceof Set)I.forEach((Q)=>{J=J+z4(Q)|0});else if(I instanceof Map)I.forEach((Q,X)=>{J=J+KJ(z4(Q),z4(X))|0});else{let Q=Object.keys(I);for(let X=0;X<Q.length;X++){let Y=Q[X],q=I[Y];J=J+KJ(z4(q),WJ(Y))|0}}return J}function z4(I){if(I===null)return 1108378658;if(I===void 0)return 1108378659;if(I===!0)return 1108378657;if(I===!1)return 1108378656;switch(typeof I){case"number":return sq(I);case"string":return WJ(I);case"bigint":return iF(I);case"object":return lF(I);case"symbol":return qJ(I);case"function":return qJ(I);default:return 0}}class Y6{constructor(I,Z){this.size=I,this.root=Z}}var D7=5,rF=(1<<D7)-1,V9=Symbol();class B5{constructor(I,Z,J,Q){this.datamap=Z,this.nodemap=J,this.data=Q,this.generation=I}equals(I){if(this===I)return!0;if(!(I instanceof B5))return!1;if(this.datamap!==I.datamap||this.nodemap!==I.nodemap)return!1;let Z=this.data,J=I.data;if(Z.length!==J.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#I(J);let Q=Z.length-L7(this.nodemap);for(let X=0;X<Q;X+=2)if(!S1(Z[X],J[X])||!S1(Z[X+1],J[X+1]))return!1;for(let X=Q;X<Z.length;++X)if(!Z[X].equals(J[X]))return!1;return!0}#I(I){let Z=this.data;I:for(let J=0;J<Z.length;J+=2){for(let Q=0;Q<I.length;Q+=2)if(S1(Z[J],I[Q])){if(!S1(Z[J+1],I[Q+1]))return!1;continue I}return!1}return!0}hashCode(){let I=this.data,Z=I.length-L7(this.nodemap),J=0;for(let Q=0;Q<Z;Q+=2)J=J+KJ(z4(I[Q+1]),z4(I[Q]))|0;for(let Q=Z;Q<I.length;++Q)J=J+I[Q].hashCode()|0;return J}}var dq=tF(0),iq=new Y6(0,dq),aF=o1(void 0);function tF(I){return new B5(I,0,0,[])}function lq(I,Z){if(I.generation===Z)return I;let J=I.data.slice(0);return new B5(Z,I.datamap,I.nodemap,J)}function j9(I,Z,J,Q){if(I.data[J]===Q)return I;return I=lq(I,Z),I.data[J]=Q,I}function cq(I,Z,J,Q,X,Y){let q=I.data,K=q.length,W=Array(K+2),G=0,U=0;while(G<Q)W[U++]=q[G++];W[U++]=X,W[U++]=Y;while(G<K)W[U++]=q[G++];return new B5(Z,I.datamap|J,I.nodemap,W)}function pq(I,Z,J,Q){I=lq(I,Z);let X=I.data,Y=X.length;for(let q=Q,K=Q+2;K<Y;++K,++q)X[q]=X[K];return X.pop(),X.pop(),I.datamap^=J,I}function G8(){return iq}function q6(I,Z){let J=oF(I.root,Z,z4(Z));return J!==V9?m1(J):aF}function oF(I,Z,J){for(let X=0;X<32;X+=D7){let Y=I.data,q=UJ(J,X);if(I.nodemap&q)I=Y[Y.length-1-L5(I.nodemap,q)];else if(I.datamap&q){let K=Math.imul(L5(I.datamap,q),2);return S1(Z,Y[K])?Y[K+1]:V9}else return V9}let Q=I.data;for(let X=0;X<Q.length;X+=2)if(S1(Z,Q[X]))return Q[X+1];return V9}function GJ(I){return{generation:aq(I),root:I.root,size:I.size,dict:I}}function rq(I){if(I.root===I.dict.root)return I.dict;return new Y6(I.size,I.root)}function aq(I){let Z=I.root;if(Z.generation<Number.MAX_SAFE_INTEGER)return Z.generation+1;let J=[Z];while(J.length){let Q=J.pop();Q.generation=0;let X=Q.data.length-L7(Q.nodemap);for(let Y=X;Y<Q.data.length;++Y)J.push(Q.data[Y])}return 1}var z9=GJ(iq);function P5(I,Z,J){z9.generation=aq(I),z9.size=I.size;let Q=z4(Z),X=O9(z9,I.root,Z,J,Q,0);if(X===I.root)return I;return new Y6(z9.size,X)}function O9(I,Z,J,Q,X,Y){let q=Z.data,K=I.generation;if(Y>32){for(let w=0;w<q.length;w+=2)if(S1(J,q[w]))return j9(Z,K,w+1,Q);return I.size+=1,cq(Z,K,0,q.length,J,Q)}let W=UJ(X,Y);if(Z.nodemap&W){let w=q.length-1-L5(Z.nodemap,W),L=q[w];return L=O9(I,L,J,Q,X,Y+D7),j9(Z,K,w,L)}let G=Math.imul(L5(Z.datamap,W),2);if((Z.datamap&W)===0)return I.size+=1,cq(Z,K,W,G,J,Q);if(S1(J,q[G]))return j9(Z,K,G+1,Q);let U=Y+D7,z=dq;z=O9(I,z,J,Q,X,U);let j=q[G],O=q[G+1],H=z4(j);z=O9(I,z,j,O,H,U),I.size-=1;let N=q.length,M=N-1-L5(Z.nodemap,W),_=Array(N-1),T=0,h=0;while(T<G)_[h++]=q[T++];T+=2;while(T<=M)_[h++]=q[T++];_[h++]=z;while(T<N)_[h++]=q[T++];return new B5(K,Z.datamap^W,Z.nodemap|W,_)}function tq(I,Z){let J=z4(I);return Z.root=oq(Z,Z.root,I,J,0),Z}function oq(I,Z,J,Q,X){let Y=Z.data,q=I.generation;if(X>32){for(let G=0;G<Y.length;G+=2)if(S1(J,Y[G]))return I.size-=1,pq(Z,q,0,G);return Z}let K=UJ(Q,X),W=Math.imul(L5(Z.datamap,K),2);if((Z.nodemap&K)!==0){let G=Y.length-1-L5(Z.nodemap,K),U=Y[G];if(U=oq(I,U,J,Q,X+D7),U.nodemap!==0||U.data.length>2)return j9(Z,q,G,U);let z=Y.length,j=Array(z+1),O=0,H=0;while(O<W)j[H++]=Y[O++];j[H++]=U.data[0],j[H++]=U.data[1];while(O<G)j[H++]=Y[O++];O++;while(O<z)j[H++]=Y[O++];return new B5(q,Z.datamap|K,Z.nodemap^K,j)}if((Z.datamap&K)===0||!S1(J,Y[W]))return Z;return I.size-=1,pq(Z,q,K,W)}function S5(I,Z,J){let Q=[I.root];while(Q.length){let X=Q.pop(),Y=X.data,q=Y.length-L7(X.nodemap);for(let K=0;K<q;K+=2)Z=J(Z,Y[K],Y[K+1]);for(let K=q;K<Y.length;++K)Q.push(Y[K])}return Z}function L7(I){return I-=I>>>1&1431655765,I=(I&858993459)+(I>>>2&858993459),Math.imul(I+(I>>>4)&252645135,16843009)>>>24}function L5(I,Z){return L7(I&Z-1)}function UJ(I,Z){return 1<<(I>>>Z&rF)}function B7(I){return S5(I,f,(Z,J,Q)=>{return C(J,Z)})}function zJ(I,Z){let J=GJ(I),Q=((X)=>{return tq(Z,X)})(J);return rq(Q)}class n6 extends P{}var u4=new n6;class IK extends P{}var P7=new IK;function IH(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else I=J.tail,Z=Q+1}}function G0(I){return IH(I,0)}function ZH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return Y;else{let{head:q,tail:K}=Q;if(X(q))I=K,Z=X,J=Y+1;else I=K,Z=X,J=Y}}}function z8(I,Z){return ZH(I,Z,0)}function U8(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else{let X=J.head;I=J.tail,Z=C(X,Q)}}}function T1(I){return U8(I,f)}function V8(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return!1;else{let X=J.head;if(S1(X,Q))return!0;else I=J.tail,Z=Q}}}function F9(I){if(I instanceof y)return new V1(void 0);else{let Z=I.head;return new R(Z)}}function JH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return T1(Y);else{let{head:q,tail:K}=Q,W;if(X(q))W=C(q,Y);else W=Y;let U=W;I=K,Z=X,J=U}}}function J0(I,Z){return JH(I,Z,f)}function QH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return T1(Y);else{let{head:q,tail:K}=Q,W,G=X(q);if(G instanceof R){let z=G[0];W=C(z,Y)}else W=Y;let U=W;I=K,Z=X,J=U}}}function j8(I,Z){return QH(I,Z,f)}function XH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return T1(Y);else{let q=Q.head;I=Q.tail,Z=X,J=C(X(q),Y)}}}function N1(I,Z){return XH(I,Z,f)}function YH(I,Z,J,Q){while(!0){let X=I,Y=Z,q=J,K=Q;if(X instanceof y)return T1(K);else{let{head:W,tail:G}=X,U=C(Y(W,q),K);I=G,Z=Y,J=q+1,Q=U}}}function S7(I,Z){return YH(I,Z,0,f)}function H9(I,Z){while(!0){let J=I,Q=Z;if(Q<=0)return J;else if(J instanceof y)return J;else I=J.tail,Z=Q-1}}function qH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(X<=0)return T1(Y);else if(Q instanceof y)return T1(Y);else{let K=Q.head;I=Q.tail,Z=X-1,J=C(K,Y)}}}function N9(I,Z){return qH(I,Z,f)}function KH(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else{let X=J.head;I=J.tail,Z=C(X,Q)}}}function Q0(I,Z){return KH(T1(I),Z)}function R9(I,Z){return C(Z,I)}function WH(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return T1(Q);else{let X=J.head;I=J.tail,Z=U8(X,Q)}}}function O8(I){return WH(I,f)}function _7(I,Z){return O8(N1(I,Z))}function B0(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return X;else{let q=Q.head;I=Q.tail,Z=Y(X,q),J=Y}}}function F8(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return new V1(void 0);else{let{head:X,tail:Y}=J;if(Q(X))return new R(X);else I=Y,Z=Q}}}function ZK(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return new V1(void 0);else{let{head:X,tail:Y}=J,q=Q(X);if(q instanceof R)return q;else I=Y,Z=Q}}}function JK(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return!0;else{let{head:X,tail:Y}=J,q=Q(X);if(q)I=Y,Z=Q;else return q}}}function GH(I,Z,J,Q){while(!0){let X=I,Y=Z,q=J,K=Q;if(X instanceof y)return U8(Y,K);else if(Y instanceof y)return U8(X,K);else{let{head:W,tail:G}=X,U=Y.head,z=Y.tail,j=q(W,U);if(j instanceof m0)I=X,Z=z,J=q,Q=C(U,K);else if(j instanceof L0)I=G,Z=Y,J=q,Q=C(W,K);else I=G,Z=Y,J=q,Q=C(W,K)}}}function UH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return T1(Y);else{let q=Q.tail;if(q instanceof y){let K=Q.head;return T1(C(T1(K),Y))}else{let K=Q.head,W=q.head,G=q.tail,U=GH(K,W,X,f);I=G,Z=X,J=C(U,Y)}}}}function zH(I,Z,J,Q){while(!0){let X=I,Y=Z,q=J,K=Q;if(X instanceof y)return U8(Y,K);else if(Y instanceof y)return U8(X,K);else{let{head:W,tail:G}=X,U=Y.head,z=Y.tail,j=q(W,U);if(j instanceof m0)I=G,Z=Y,J=q,Q=C(W,K);else if(j instanceof L0)I=X,Z=z,J=q,Q=C(U,K);else I=X,Z=z,J=q,Q=C(U,K)}}}function VH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return T1(Y);else{let q=Q.tail;if(q instanceof y){let K=Q.head;return T1(C(T1(K),Y))}else{let K=Q.head,W=q.head,G=q.tail,U=zH(K,W,X,f);I=G,Z=X,J=C(U,Y)}}}}function jH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return Q;else if(X instanceof n6)if(Q.tail instanceof y)return Q.head;else I=VH(Q,Y,f),Z=P7,J=Y;else if(Q.tail instanceof y){let K=Q.head;return T1(K)}else I=UH(Q,Y,f),Z=u4,J=Y}}function OH(I,Z,J,Q,X,Y){while(!0){let q=I,K=Z,W=J,G=Q,U=X,z=Y,j=C(U,W);if(q instanceof y)if(G instanceof n6)return C(T1(j),z);else return C(j,z);else{let{head:O,tail:H}=q,N=K(U,O);if(G instanceof n6)if(N instanceof m0)I=H,Z=K,J=j,Q=G,X=O,Y=z;else if(N instanceof L0)I=H,Z=K,J=j,Q=G,X=O,Y=z;else{let M;if(G instanceof n6)M=C(T1(j),z);else M=C(j,z);let _=M;if(H instanceof y)return C(V([O]),_);else{let{head:T,tail:h}=H,w,L=K(O,T);if(L instanceof m0)w=u4;else if(L instanceof L0)w=u4;else w=P7;let S=w;I=h,Z=K,J=V([O]),Q=S,X=T,Y=_}}else if(N instanceof m0){let M;if(G instanceof n6)M=C(T1(j),z);else M=C(j,z);let _=M;if(H instanceof y)return C(V([O]),_);else{let{head:T,tail:h}=H,w,L=K(O,T);if(L instanceof m0)w=u4;else if(L instanceof L0)w=u4;else w=P7;let S=w;I=h,Z=K,J=V([O]),Q=S,X=T,Y=_}}else if(N instanceof L0){let M;if(G instanceof n6)M=C(T1(j),z);else M=C(j,z);let _=M;if(H instanceof y)return C(V([O]),_);else{let{head:T,tail:h}=H,w,L=K(O,T);if(L instanceof m0)w=u4;else if(L instanceof L0)w=u4;else w=P7;let S=w;I=h,Z=K,J=V([O]),Q=S,X=T,Y=_}}else I=H,Z=K,J=j,Q=G,X=O,Y=z}}}function M9(I,Z){if(I instanceof y)return I;else{let J=I.tail;if(J instanceof y)return I;else{let Q=I.head,X=J.head,Y=J.tail,q,K=Z(Q,X);if(K instanceof m0)q=u4;else if(K instanceof L0)q=u4;else q=P7;let W=q,G=OH(Y,Z,V([Q]),W,X,f);return jH(G,u4,Z)}}}function FH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(X<=0)return[T1(Y),Q];else if(Q instanceof y)return[T1(Y),f];else{let K=Q.head;I=Q.tail,Z=X-1,J=C(K,Y)}}}function QK(I,Z){return FH(I,Z,f)}function XK(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return;else{let{head:X,tail:Y}=J;Q(X),I=Y,Z=Q}}}class KK extends P{}var yT=new KK;class UK extends P{}var $T=new UK;class zK extends P{}var mT=new zK;function VK(I,Z){if(I===Z)return A5;else if(OK(I,Z))return M5;else return D5}function A9(I,Z){if(Z==="")return jJ(I);else{let Q=$1(I),X=OJ(Q,Z);return N1(X,$1)}}function DH(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else{let X=J.head;I=J.tail,Z=Q+X}}}function jK(I){return DH(I,"")}function LH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return Y;else{let q=Q.head;I=Q.tail,Z=X,J=Y+X+q}}}function D9(I,Z){if(I instanceof y)return"";else{let{head:J,tail:Q}=I;return LH(Q,Z,J)}}function L9(I){let J=FK(I);return HK(J)}class g6 extends P{constructor(I,Z,J){super();this.expected=I,this.found=Z,this.path=J}}var AK=(I,Z,J)=>new g6(I,Z,J);class b0 extends P{constructor(I){super();this.function=I}}var _H=new b0(TH),a0=new b0(EH);var C1=new b0(hH),w7=new b0(bH);function $4(I,Z){let J=Z.function(I),Q=J[0],X=J[1];if(X instanceof y)return new R(Q);else return new V1(X)}function HJ(I,Z,J){let Q=J(I);if(Q instanceof R)return[Q[0],f];else return[Q[0],V([new g6(Z,W6(I),f)])]}function TH(I){return HJ(I,"Float",PK)}function _5(I,Z){return new b0((J)=>{let Q=I.function(J),X=Q[0],Y=Q[1];return[Z(X),Y]})}function EH(I){return HJ(I,"Int",SK)}function hH(I){return HJ(I,"String",_K)}function CH(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Y instanceof y)return X;else{let{head:q,tail:K}=Y,W=q.function(Q),G=W;if(W[1]instanceof y)return G;else I=Q,Z=X,J=K}}}function DK(I,Z){return new b0((J)=>{let Q=I.function(J),X=Q;if(Q[1]instanceof y)return X;else return CH(J,X,Z)})}function wH(I){let Z=DK(C1,V([(()=>{return _5(a0,D1)})(),(()=>{return _5(_H,P9)})()])),J=$4(I,Z);if(J instanceof R)return J[0];else return"<"+W6(I)+">"}function C7(I,Z){let J=N1(Z,(X)=>{let q=$1(X);return wH(q)}),Q=N1(I[1],(X)=>{return new g6(X.expected,X.found,Q0(J,X.path))});return[I[0],Q]}function G6(I){return new b0((Z)=>{return BK(Z,I.function,(J,Q)=>{return C7(J,V([Q]))},0,f)})}function kH(I,Z,J,Q,X){while(!0){let Y=I,q=Z,K=J,W=Q,G=X;if(Y instanceof y){let z=K(W);return C7(z,T1(q))}else{let{head:U,tail:z}=Y,j=NJ(W,U);if(j instanceof R){let O=j[0];if(O instanceof a){let H=O[0];I=z,Z=C(U,q),J=K,Q=H,X=G}else return G(W,C(U,q))}else{let O=j[0],M=[K(W)[0],V([new g6(O,W6(W),f)])];return C7(M,T1(q))}}}}function H8(I,Z,J){return new b0((Q)=>{let X=kH(I,f,Z.function,Q,(U,z)=>{let H=[Z.function(U)[0],V([new g6("Field","Nothing",f)])];return C7(H,T1(z))}),Y=X[0],q=X[1],K=J(Y).function(Q),W=K[0],G=K[1];return[W,Q0(q,G)]})}function k1(I){return new b0((Z)=>{return[I,f]})}function LK(I,Z){return V([new g6(I,W6(Z),f)])}function x1(I,Z,J){return H8(V([I]),Z,J)}function m4(I,Z,J,Q){return new b0((X)=>{let Y,q,K=NJ(X,I);if(K instanceof R){let N=K[0];if(N instanceof a){let M=N[0];q=J.function(M)}else q=[Z,f]}else{let N=K[0];q=[Z,V([new g6(N,W6(X),f)])]}Y=C7(q,V([I]));let G=Y,U=G[0],z=G[1],j=Q(U).function(X),O=j[0],H=j[1];return[O,Q0(z,H)]})}function bH(I){if(S1($1(!0),I))return[!0,f];else if(S1($1(!1),I))return[!1,f];else return[!1,LK("Bool",I)]}function B9(I){return new b0((Z)=>{if(TK(Z))return[U1,f];else{let Q=I.function(Z),X=Q[0],Y=Q[1];return[new a(X),Y]}})}function k7(I,Z){return new b0((J)=>{let Q=I.function(J),X=Q[0],Y=Q[1],K=Z(X).function(J),W=K,G=K[0];if(Y instanceof y)return W;else return[G,Y]})}function b7(I,Z){return new b0((J)=>{return[I,LK(Z,J)]})}var xH=void 0;function $1(I){return I}function RJ(I){if(/^[-+]?(\d+)$/.test(I))return m1(parseInt(I));else return o1(xH)}function D1(I){return I.toString()}function jJ(I){let Z=nH(I);if(Z)return y7(Array.from(Z).map((J)=>J.segment));else return y7(I.match(/./gsu))}var EK=void 0;function nH(I){if(globalThis.Intl&&Intl.Segmenter)return EK||=new Intl.Segmenter,EK.segment(I)[Symbol.iterator]()}function E7(I){return I.toLowerCase()}function OK(I,Z){return I<Z}function OJ(I,Z){return y7(I.split(Z))}function FJ(I,Z){return I.indexOf(Z)>=0}function h7(I,Z){return I.startsWith(Z)}var hK=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),gH=new RegExp(`^[${hK}]*`),fH=new RegExp(`[${hK}]*$`);function FK(I){return I.replace(gH,"")}function HK(I){return I.replace(fH,"")}function W6(I){if(typeof I==="string")return"String";else if(typeof I==="boolean")return"Bool";else if($H(I))return"Result";else if(S9(I))return"List";else if(I instanceof A7)return"BitArray";else if(I instanceof Y6)return"Dict";else if(Number.isInteger(I))return"Int";else if(Array.isArray(I))return"Array";else if(typeof I==="number")return"Float";else if(I===null)return"Nil";else if(I===void 0)return"Nil";else{let Z=typeof I;return Z.charAt(0).toUpperCase()+Z.slice(1)}}var{MAX_SAFE_INTEGER:xE,MIN_SAFE_INTEGER:nE}=Number;function P9(I){let Z=I.toString().replace("+","");if(Z.indexOf(".")>=0)return Z;else{let J=Z.indexOf("e");if(J>=0)return Z.slice(0,J)+".0"+Z.slice(J);else return Z+".0"}}class uH{#I=new Set;inspect(I){let Z=typeof I;if(I===!0)return"True";if(I===!1)return"False";if(I===null)return"//js(null)";if(I===void 0)return"Nil";if(Z==="string")return this.#X(I);if(Z==="bigint"||Number.isInteger(I))return I.toString();if(Z==="number")return P9(I);if(I instanceof IJ)return this.#K(I);if(I instanceof A7)return this.#Y(I);if(I instanceof RegExp)return`//js(${I})`;if(I instanceof Date)return`//js(Date("${I.toISOString()}"))`;if(I instanceof globalThis.Error)return`//js(${I.toString()})`;if(I instanceof Function){let Q=[];for(let X of Array(I.length).keys())Q.push(String.fromCharCode(X+97));return`//fn(${Q.join(", ")}) { ... }`}if(this.#I.size===this.#I.add(I).size)return"//js(circular reference)";let J;if(Array.isArray(I))J=`#(${I.map((Q)=>this.inspect(Q)).join(", ")})`;else if(S9(I))J=this.#J(I);else if(I instanceof P)J=this.#Z(I);else if(I instanceof Y6)J=this.#Q(I);else if(I instanceof Set)return`//js(Set(${[...I].map((Q)=>this.inspect(Q)).join(", ")}))`;else J=this.#q(I);return this.#I.delete(I),J}#q(I){let Z=Object.getPrototypeOf(I)?.constructor?.name||"Object",J=[];for(let Y of Object.keys(I))J.push(`${this.inspect(Y)}: ${this.inspect(I[Y])}`);let Q=J.length?" "+J.join(", ")+" ":"";return`//js(${Z==="Object"?"":Z+" "}{${Q}})`}#Q(I){let Z="dict.from_list([",J=!0;return Z=S5(I,Z,(Q,X,Y)=>{if(!J)Q=Q+", ";return J=!1,Q+"#("+this.inspect(X)+", "+this.inspect(Y)+")"}),Z+"])"}#Z(I){let Z=Object.keys(I).map((J)=>{let Q=this.inspect(I[J]);return isNaN(parseInt(J))?`${J}: ${Q}`:Q}).join(", ");return Z?`${I.constructor.name}(${Z})`:I.constructor.name}#J(I){if(eZ(I))return"[]";let Z='charlist.from_string("',J="[",Q=I;while(X6(Q)){let X=Q.head;if(Q=Q.tail,J!=="[")J+=", ";if(J+=this.inspect(X),Z)if(Number.isInteger(X)&&X>=32&&X<=126)Z+=String.fromCharCode(X);else Z=null}if(Z)return Z+'")';else return J+"]"}#X(I){let Z='"';for(let J=0;J<I.length;J++){let Q=I[J];switch(Q){case`
`:Z+="\\n";break;case"\r":Z+="\\r";break;case"\t":Z+="\\t";break;case"\f":Z+="\\f";break;case"\\":Z+="\\\\";break;case'"':Z+="\\\"";break;default:if(Q<" "||Q>"~"&&Q<" ")Z+="\\u{"+Q.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else Z+=Q}}return Z+='"',Z}#K(I){return`//utfcodepoint(${String.fromCodePoint(I.value)})`}#Y(I){if(I.bitSize===0)return"<<>>";let Z="<<";for(let J=0;J<I.byteSize-1;J++)Z+=I.byteAt(J).toString(),Z+=", ";if(I.byteSize*8===I.bitSize)Z+=I.byteAt(I.byteSize-1).toString();else{let J=I.bitSize%8;Z+=I.byteAt(I.byteSize-1)>>8-J,Z+=`:size(${J})`}return Z+=">>",Z}}function NJ(I,Z){if(I instanceof Y6){let Q=q6(I,Z);return m1(Q.isOk()?new a(Q[0]):new U4)}if(I instanceof WeakMap||I instanceof Map){let Q={},X=I.get(Z,Q);if(X===Q)return m1(new U4);return m1(new a(X))}let J=Number.isInteger(Z);if(J&&Z>=0&&Z<8&&S9(I)){let Q=0;for(let X of I){if(Q===Z)return m1(new a(X));Q++}return o1("Indexable")}if(J&&Array.isArray(I)||I&&typeof I==="object"||I&&Object.getPrototypeOf(I)===Object.prototype){if(Z in I)return m1(new a(I[Z]));return m1(new U4)}return o1(J?"Indexable":"Dict")}function BK(I,Z,J,Q,X){if(!(S9(I)||Array.isArray(I))){let q=AK("List",W6(I),X);return[X,y7([q])]}let Y=[];for(let q of I){let K=Z(q),[W,G]=K;if(X6(G)){let[U,z]=J(K,Q.toString());return[X,z]}Y.push(W),Q++}return[y7(Y),X]}function PK(I){if(typeof I==="number")return m1(I);return o1(0)}function SK(I){if(Number.isInteger(I))return m1(I);return o1(0)}function _K(I){if(typeof I==="string")return m1(I);return o1("")}function TK(I){return I===null||I===void 0}function y7(I){let Z=gq(),J=I.length;while(J--)Z=K8(I[J],Z);return Z}function S9(I){return eZ(I)||X6(I)}function $H(I){return O0(I)||fq(I)}function _9(I,Z){if(I>Z)return I;else return Z}function CK(I,Z){if(I===Z)return A5;else if(I<Z)return M5;else return D5}class wK extends P{}var mH=new wK;class AJ extends P{}var Gh=new AJ;class kK extends P{}var Uh=new kK;class bK extends P{}var zh=new bK;class yK extends P{}var Vh=new yK;class xK extends P{}var jh=new xK;function H0(I,Z){if(I instanceof R){let J=I[0];return new R(Z(J))}else return I}function nK(I,Z){if(I instanceof R)return I;else{let J=I[0];return new V1(Z(J))}}function x7(I,Z){if(I instanceof R){let J=I[0];return Z(J)}else return I}function n7(I,Z){if(I instanceof R)return I[0];else return Z}class DJ extends P{}var Mh=new DJ;class LJ extends P{}var Ah=new LJ;class gK extends P{}var Dh=new gK;class fK extends P{}var kh=new fK;class uK extends P{}var nh=new uK;class $K extends P{}var sH=new $K;class mK extends P{}var gh=new mK;class vK extends P{}var dH=new vK;class pK extends P{}var vh=new pK;function sK(I,Z,J){if(I)return Z;else return J()}function y0(I){return I}function BJ(I){return JSON.stringify(I)}function iK(I){return Object.fromEntries(I)}function E5(I){return I}function lK(I){let Z=[];while(X6(I))Z.push(W8(I)),I=f4(I);return Z}function rK(){return null}function aK(I){try{let Z=JSON.parse(I);return m1(Z)}catch(Z){return o1(rH(Z,I))}}function rH(I,Z){if(aH(I))return tK();return tH(I,Z)}function aH(I){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(I.message)}function tH(I,Z){let J=[oH,eH,ZN,IN];for(let Q of J){let X=Q(I,Z);if(X)return X}return N8("")}function oH(I){let J=/unexpected token '(.)', ".+" is not valid JSON/i.exec(I.message);if(!J)return null;let Q=E9(J[1]);return N8(Q)}function eH(I){let J=/unexpected token (.) in JSON at position (\d+)/i.exec(I.message);if(!J)return null;let Q=E9(J[1]);return N8(Q)}function IN(I,Z){let Q=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(I.message);if(!Q)return null;let X=Number(Q[2]),Y=Number(Q[3]),q=JN(X,Y,Z),K=E9(Z[q]);return N8(K)}function ZN(I){let J=/unexpected (identifier|token) "(.)"/i.exec(I.message);if(!J)return null;let Q=E9(J[2]);return N8(Q)}function E9(I){return"0x"+I.charCodeAt(0).toString(16).toUpperCase()}function JN(I,Z,J){if(I===1)return Z-1;let Q=1,X=0;return J.split("").find((Y,q)=>{if(Y===`
`)Q+=1;if(Q===I)return X=q+Z,!0;return!1}),X}class oK extends P{}var QN=new oK,tK=()=>QN;class eK extends P{constructor(I){super();this[0]=I}}var N8=(I)=>new eK(I);class IW extends P{constructor(I){super();this[0]=I}}function XN(I,Z){return x7(aK(I),(J)=>{let Q=$4(J,Z);return nK(Q,(X)=>{return new IW(X)})})}function h5(I,Z){return XN(I,Z)}function ZW(I){return BJ(I)}function Y0(I){return E5(I)}function g7(I){return E5(I)}function v4(I){return E5(I)}function YN(){return rK()}function PJ(I,Z){if(I instanceof a){let J=I[0];return Z(J)}else return YN()}function C5(I){return iK(I)}function qN(I){return lK(I)}function U6(I,Z){let Q=N1(I,Z);return qN(Q)}function f7(I){return I.replaceAll(/[><&"']/g,(Z)=>{switch(Z){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return Z}})}var G1=f,R8=new V1(void 0);function P0(I){return C(I,G1)}var KN=mq(),WN=uq(),GN=$q();function h9(I,Z){if(I.name===Z.name)return GN;else if(I.name<Z.name)return WN;else return KN}class H4 extends P{constructor(I,Z,J){super();this.kind=I,this.name=Z,this.value=J}}class M8 extends P{constructor(I,Z,J){super();this.kind=I,this.name=Z,this.value=J}}class S0 extends P{constructor(I,Z,J,Q,X,Y,q,K){super();this.kind=I,this.name=Z,this.handler=J,this.include=Q,this.prevent_default=X,this.stop_propagation=Y,this.debounce=q,this.throttle=K}}class A8 extends P{constructor(I,Z,J){super();this.prevent_default=I,this.stop_propagation=Z,this.message=J}}class WW extends P{constructor(I){super();this.kind=I}}class GW extends P{constructor(I){super();this.kind=I}}var _J=0,TJ=1,EJ=2,hJ=0,CJ=new WW(hJ),jN=1,wJ=new GW(jN),kJ=2;function UW(I,Z){return new H4(_J,I,Z)}function zW(I,Z){return new M8(TJ,I,Z)}function bJ(I,Z,J,Q,X,Y,q){return new S0(EJ,I,Z,J,Q,X,Y,q)}function ON(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else{let X=J.head;if(X instanceof H4){let Y=X.name;if(Y==="")I=J.tail,Z=Q;else if(Y==="class"){let q=X.value;if(q==="")I=J.tail,Z=Q;else{let K=J.tail;if(K instanceof y){let W=X;I=K,Z=C(W,Q)}else{let W=K.head;if(W instanceof H4)if(W.name==="class"){let U=X.kind,z=q,j=K.tail,O=W.value,H=z+" "+O,N=new H4(U,"class",H);I=C(N,j),Z=Q}else{let U=X;I=K,Z=C(U,Q)}else{let G=X;I=K,Z=C(G,Q)}}}}else if(Y==="style"){let q=X.value;if(q==="")I=J.tail,Z=Q;else{let K=J.tail;if(K instanceof y){let W=X;I=K,Z=C(W,Q)}else{let W=K.head;if(W instanceof H4)if(W.name==="style"){let U=X.kind,z=q,j=K.tail,O=W.value,H=z+";"+O,N=new H4(U,"style",H);I=C(N,j),Z=Q}else{let U=X;I=K,Z=C(U,Q)}else{let G=X;I=K,Z=C(G,Q)}}}}else{let q=X;I=J.tail,Z=C(q,Q)}}else{let Y=X;I=J.tail,Z=C(Y,Q)}}}}function VW(I){if(I instanceof y)return I;else if(I.tail instanceof y)return I;else{let Q=M9(I,(X,Y)=>{return h9(Y,X)});return ON(Q,G1)}}function i1(I,Z){return UW(I,Z)}function u7(I,Z){return zW(I,Z)}function FN(I,Z){if(Z)return i1(I,"");else return u7(I,g7(!1))}function n(I){return i1("class",I)}function jW(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)return Q;else if(J.head[1]){let Y=J.tail,q=J.head[0];return Q+q+" "+jW(Y,Q)}else I=J.tail,Z=Q}}function v0(I){return n(jW(I,""))}function D8(I){return i1("id",I)}function C9(I,Z){if(I==="")return n("");else if(Z==="")return n("");else return i1("style",I+":"+Z+";")}function w9(I){return i1("tabindex",D1(I))}function f6(I){return FN("disabled",I)}function OW(I){return i1("for",I)}function FW(I){return i1("max",I)}function HW(I){return i1("min",I)}function NW(I){return i1("placeholder",I)}function yJ(I){return i1("type",I)}function xJ(I){return i1("value",I)}class b9 extends P{constructor(I,Z,J){super();this.synchronous=I,this.before_paint=Z,this.after_paint=J}}class RW extends P{constructor(I,Z,J,Q,X,Y,q){super();this.dispatch=I,this.emit=Z,this.select=J,this.root=Q,this.provide=X,this.subscribe=Y,this.unsubscribe=q}}var k9=new b9(G1,G1,G1);function j1(){return k9}function N4(I){return new b9(P0((J)=>{let Q=J.dispatch;return I(Q)}),k9.before_paint,k9.after_paint)}function $7(I){return B0(I,k9,(Z,J)=>{return new b9(B0(J.synchronous,Z.synchronous,R9),B0(J.before_paint,Z.before_paint,R9),B0(J.after_paint,Z.after_paint,R9))})}function MW(I,Z,J,Q,X,Y,q,K){let W=new RW(Z,J,Q,X,Y,q,K);return XK(I.synchronous,(G)=>{return G(W)})}function s1(){return null}function k5(I,Z){return I?.get(Z)}function L8(I,Z,J){return I?.get(Z)??J()}function c4(I,Z){return I&&I.has(Z)}function t0(I,Z,J){return I??=new Map,I.set(Z,J),I}function y9(I,Z){return I?.delete(Z),I}function AW(I,Z){if(typeof I==="number"&&typeof Z==="number")return I===Z||I!==I&&Z!==Z;return I===Z}function DW(I,Z){while(!0){let J=I,Q=Z;if(J instanceof y)if(Q instanceof y)return!0;else return!1;else if(Q instanceof y)return!1;else{let{head:X,tail:Y}=J,q=Q.head,K=Q.tail,W=AW(X,q);if(W)I=Y,Z=K;else return W}}}class R4 extends P{constructor(I,Z,J,Q){super();this.kind=I,this.key=Z,this.children=J,this.keyed_children=Q}}class M4 extends P{constructor(I,Z,J,Q,X,Y,q,K,W){super();this.kind=I,this.key=Z,this.namespace=J,this.tag=Q,this.attributes=X,this.children=Y,this.keyed_children=q,this.self_closing=K,this.void=W}}class p4 extends P{constructor(I,Z,J){super();this.kind=I,this.key=Z,this.content=J}}class s4 extends P{constructor(I,Z,J,Q,X,Y){super();this.kind=I,this.key=Z,this.namespace=J,this.tag=Q,this.attributes=X,this.inner_html=Y}}class c0 extends P{constructor(I,Z,J,Q){super();this.kind=I,this.key=Z,this.mapper=J,this.child=Q}}class b5 extends P{constructor(I,Z,J,Q){super();this.kind=I,this.key=Z,this.dependencies=J,this.view=Q}}var y5=0,$6=1,B8=2,LW=3,u6=4,gJ=5;function fJ(I,Z,J){return new R4(y5,I,Z,J)}function v7(I,Z,J,Q,X,Y,q,K){return new M4($6,I,Z,J,VW(Q),X,Y,q,K)}function c7(I,Z){if(Z==="")if(I==="area")return!0;else if(I==="base")return!0;else if(I==="br")return!0;else if(I==="col")return!0;else if(I==="embed")return!0;else if(I==="hr")return!0;else if(I==="img")return!0;else if(I==="input")return!0;else if(I==="link")return!0;else if(I==="meta")return!0;else if(I==="param")return!0;else if(I==="source")return!0;else if(I==="track")return!0;else if(I==="wbr")return!0;else return!1;else return!1}function uJ(I,Z){return new p4(B8,I,Z)}function BW(I,Z){if(I instanceof c0){let J=I.mapper;return new c0(u6,I.key,(Q)=>{return y0(Z)(J(Q))},y0(I.child))}else return new c0(u6,I.key,y0(Z),y0(I))}function PW(I,Z,J){return new b5(gJ,I,Z,J)}function x9(I,Z){if(Z instanceof R4)return new R4(Z.kind,I,Z.children,Z.keyed_children);else if(Z instanceof M4)return new M4(Z.kind,I,Z.namespace,Z.tag,Z.attributes,Z.children,Z.keyed_children,Z.self_closing,Z.void);else if(Z instanceof p4)return new p4(Z.kind,I,Z.content);else if(Z instanceof s4)return new s4(Z.kind,I,Z.namespace,Z.tag,Z.attributes,Z.inner_html);else if(Z instanceof c0){let J=Z.child;return new c0(Z.kind,I,Z.mapper,x9(I,J))}else{let J=Z.view;return new b5(Z.kind,I,Z.dependencies,()=>{return x9(I,J())})}}class SW extends P{}var kC=new SW;class _W extends P{}var bC=new _W;class TW extends P{}var yC=new TW;class EW extends P{}var xC=new EW;class hW extends P{}var nC=new hW;function e1(I,Z,J){return v7("","",I,Z,J,s1(),!1,c7(I,""))}function n9(I){return uJ("",I)}function x5(){return uJ("","")}function CW(I,Z){return PW("",I,Z)}function wW(I){return y0(I)}function kW(I,Z){return BW(I,Z)}function s(I){return n9(I)}function bW(I,Z){return e1("h1",I,Z)}function g9(I,Z){return e1("h2",I,Z)}function f9(I,Z){return e1("h3",I,Z)}function yW(I,Z){return e1("section",I,Z)}function X1(I,Z){return e1("div",I,Z)}function p7(I,Z){return e1("li",I,Z)}function n5(I,Z){return e1("pre",I,Z)}function s7(I,Z){return e1("ul",I,Z)}function P8(I,Z){return e1("code",I,Z)}function v1(I,Z){return e1("span",I,Z)}function U0(I,Z){return e1("button",I,Z)}function $J(I){return e1("input",I,G1)}function xW(I,Z){return e1("label",I,Z)}function u9(I,Z){return e1("details",I,Z)}function $9(I,Z){return e1("summary",I,Z)}class v9 extends P{constructor(I,Z,J,Q,X){super();this.index=I,this.path=Z,this.removed=J,this.changes=Q,this.children=X}}class nW extends P{constructor(I,Z){super();this.kind=I,this.content=Z}}class gW extends P{constructor(I,Z){super();this.kind=I,this.inner_html=Z}}class fW extends P{constructor(I,Z,J){super();this.kind=I,this.added=Z,this.removed=J}}class uW extends P{constructor(I,Z,J){super();this.kind=I,this.key=Z,this.before=J}}class $W extends P{constructor(I,Z,J){super();this.kind=I,this.index=Z,this.with=J}}class mW extends P{constructor(I,Z){super();this.kind=I,this.index=Z}}class vW extends P{constructor(I,Z,J){super();this.kind=I,this.children=Z,this.before=J}}var mJ=0,vJ=1,cJ=2,pJ=3,sJ=4,dJ=5,iJ=6;function v6(I,Z,J,Q){return new v9(I,G1,Z,J,Q)}function cW(I){return new nW(mJ,I)}function pW(I){return new gW(vJ,I)}function lJ(I,Z){return new fW(cJ,I,Z)}function sW(I,Z){return new uW(pJ,I,Z)}function dW(I){return new mW(sJ,I)}function O6(I,Z){return new $W(dJ,I,Z)}function rJ(I,Z){return new vW(iJ,I,Z)}function iW(I,Z){return new v9(Z,C(I.index,I.path),I.removed,I.changes,I.children)}class rW extends P{constructor(I,Z,J,Q,X,Y,q,K,W){super();this.kind=I,this.open_shadow_root=Z,this.will_adopt_styles=J,this.observed_attributes=Q,this.observed_properties=X,this.requested_contexts=Y,this.provided_contexts=q,this.vdom=K,this.memos=W}}class aW extends P{constructor(I,Z,J){super();this.kind=I,this.patch=Z,this.memos=J}}class tW extends P{constructor(I,Z,J){super();this.kind=I,this.name=Z,this.data=J}}class oW extends P{constructor(I,Z,J){super();this.kind=I,this.key=Z,this.value=J}}class eW extends P{constructor(I,Z){super();this.kind=I,this.key=Z}}class IG extends P{constructor(I,Z){super();this.kind=I,this.key=Z}}class ZG extends P{constructor(I,Z){super();this.kind=I,this.messages=Z}}var JG=(I)=>I instanceof ZG;class QG extends P{constructor(I,Z,J){super();this.kind=I,this.name=Z,this.value=J}}var XG=(I)=>I instanceof QG;class YG extends P{constructor(I,Z,J){super();this.kind=I,this.name=Z,this.value=J}}var qG=(I)=>I instanceof YG;class KG extends P{constructor(I,Z,J,Q){super();this.kind=I,this.path=Z,this.name=J,this.event=Q}}var WG=(I)=>I instanceof KG;class GG extends P{constructor(I,Z,J){super();this.kind=I,this.key=Z,this.value=J}}var UG=(I)=>I instanceof GG;var MN=0,AN=1,DN=2,LN=3,BN=4,PN=5;function zG(I,Z,J,Q,X,Y,q,K){return new rW(MN,I,Z,J,Q,X,Y,q,K)}function aJ(I,Z){return new aW(AN,I,Z)}function VG(I,Z){return new tW(DN,I,Z)}function jG(I,Z){return new oW(LN,I,Z)}function OG(I){return new eW(BN,I)}function FG(I){return new IG(PN,I)}class tJ extends P{}var SN=new tJ;class oJ extends P{constructor(I,Z){super();this.key=I,this.parent=Z}}class eJ extends P{constructor(I,Z){super();this.index=I,this.parent=Z}}class RG extends P{constructor(I){super();this.parent=I}}var p9="\r",c9="\t",IQ=`
`,s9=SN;function NG(I){if(I instanceof y)return"";else{let Z=I.tail;return jK(Z)}}function ZQ(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(X instanceof tJ)return NG(Y);else if(X instanceof oJ){let{key:q,parent:K}=X;I=Q,Z=K,J=C(c9,C(q,Y))}else if(X instanceof eJ){let{index:q,parent:K}=X,W=C(c9,C(D1(q),Y));I=Q,Z=K,J=W}else if(!Q)return NG(Y);else{let q=X.parent;if(Y instanceof y)I=Q,Z=q,J=Y;else{let K=Y.tail;I=Q,Z=q,J=C(p9,K)}}}}function _N(I){return ZQ(!0,I,G1)}function TN(I,Z){while(!0){let J=I,Q=Z;if(Q instanceof y)return!1;else{let{head:X,tail:Y}=Q,q=h7(J,X);if(q)return q;else I=J,Z=Y}}}function MG(I,Z){if(Z instanceof y)return!1;else return TN(_N(I),Z)}function AG(I){return A9(I,p9)}function n0(I,Z,J){if(J==="")return new eJ(Z,I);else return new oJ(J,I)}function d9(I){return new RG(I)}function JQ(I,Z){return ZQ(!1,I,C(IQ,C(Z,G1)))}function d7(I){return ZQ(!1,I,G1)}class F6 extends P{constructor(I,Z,J,Q,X){super();this.events=I,this.vdoms=Z,this.old_vdoms=J,this.dispatched_paths=Q,this.next_dispatched_paths=X}}class c6 extends P{constructor(I,Z){super();this.handlers=I,this.children=Z}}class l9 extends P{constructor(I,Z){super();this.mapper=I,this.events=Z}}class PG extends P{constructor(I,Z,J){super();this.handlers=I,this.children=Z,this.vdoms=J}}class YQ extends P{constructor(I,Z){super();this.path=I,this.handler=Z}}class QQ extends P{constructor(I){super();this.path=I}}function EN(I,Z){return(J)=>{return I(Z(J))}}function SG(){return new c6(s1(),s1())}function qQ(){return new F6(SG(),s1(),s1(),G1,G1)}function _G(I,Z,J,Q){return t0(I,JQ(Z,J),Q)}function LG(I,Z,J){return B0(J,I,(Q,X)=>{if(X instanceof S0){let{name:Y,handler:q}=X;return _G(Q,Z,Y,q)}else return Q})}function i9(I,Z,J,Q,X,Y){while(!0){let q=I,K=Z,W=J,G=Q,U=X,z=Y,j=U+1;if(z instanceof y)return new PG(q,K,W);else{let O=z.head;if(O instanceof R4){let H=z.tail,N=O.key,M=O.children,_=n0(G,U,N),T=i9(q,K,W,_,0,M),h=T.handlers,w=T.children,L=T.vdoms;I=h,Z=w,J=L,Q=G,X=j,Y=H}else if(O instanceof M4){let H=z.tail,N=O.key,M=O.attributes,_=O.children,T=n0(G,U,N),h=LG(q,T,M),w=i9(h,K,W,T,0,_),L=w.handlers,S=w.children,B=w.vdoms;I=L,Z=S,J=B,Q=G,X=j,Y=H}else if(O instanceof p4){let H=z.tail;I=q,Z=K,J=W,Q=G,X=j,Y=H}else if(O instanceof s4){let H=z.tail,N=O.key,M=O.attributes,_=n0(G,U,N);I=LG(q,_,M),Z=K,J=W,Q=G,X=j,Y=H}else if(O instanceof c0){let H=z.tail,N=O.key,M=O.mapper,_=O.child,T=n0(G,U,N),h=i9(s1(),s1(),W,d9(T),0,P0(_)),w=h.vdoms,L=new c6(h.handlers,h.children),S=new l9(M,L),B=t0(K,d7(T),S);I=q,Z=B,J=w,Q=G,X=j,Y=H}else{let H=z.tail,N=O.view,M=N(),_=t0(W,N,M),T=U,h=C(M,H);I=q,Z=K,J=_,Q=G,X=T,Y=h}}}}function KQ(I,Z,J,Q,X){let Y=I.vdoms,q=Z.handlers,K=Z.children,W=i9(q,K,Y,J,Q,X),G=W.handlers,U=W.children,z=W.vdoms;return[new F6(I.events,z,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths),new c6(G,U)]}function r9(I,Z,J,Q,X){let Y=P0(X);return KQ(I,Z,J,Q,Y)}function TG(I){let Z=qQ(),J=r9(Z,Z.events,s9,0,I),Q=J[0],X=J[1];return new F6(X,Q.vdoms,Q.old_vdoms,Q.dispatched_paths,Q.next_dispatched_paths)}function EG(I){return new F6(I.events,s1(),I.vdoms,I.next_dispatched_paths,G1)}function hG(I){return I.events}function CG(I,Z){return new F6(Z,I.vdoms,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function S8(I){return I.vdoms}function wG(I,Z,J){return L8(I.old_vdoms,Z,J)}function kG(I,Z,J){let Q=L8(I.old_vdoms,Z,J),X=t0(I.vdoms,J,Q);return new F6(I.events,X,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function bG(I,Z,J){let Q=t0(I.vdoms,Z,J);return new F6(I.events,Q,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function yG(I,Z,J){return L8(I.children,Z,()=>{return new l9(J,SG())}).events}function xG(I,Z,J,Q){let X=new l9(J,Q),Y=t0(I.children,Z,X);return new c6(I.handlers,Y)}function _8(I,Z,J,Q){let X=_G(I.handlers,Z,J,Q);return new c6(X,I.children)}function nG(I,Z,J){return y9(I,JQ(Z,J))}function a9(I,Z,J){let Q=nG(I.handlers,Z,J);return new c6(Q,I.children)}function BG(I,Z,J){return B0(J,I,(Q,X)=>{if(X instanceof S0){let Y=X.name;return nG(Q,Z,Y)}else return Q})}function XQ(I,Z,J,Q,X,Y){while(!0){let q=I,K=Z,W=J,G=Q,U=X,z=Y,j=U+1;if(z instanceof y)return new c6(q,K);else{let O=z.head;if(O instanceof R4){let H=z.tail,N=O.key,M=O.children,_=n0(G,U,N),T=XQ(q,K,W,_,0,M),h=T.handlers,w=T.children;I=h,Z=w,J=W,Q=G,X=j,Y=H}else if(O instanceof M4){let H=z.tail,N=O.key,M=O.attributes,_=O.children,T=n0(G,U,N),h=BG(q,T,M),w=XQ(h,K,W,T,0,_),L=w.handlers,S=w.children;I=L,Z=S,J=W,Q=G,X=j,Y=H}else if(O instanceof p4){let H=z.tail;I=q,Z=K,J=W,Q=G,X=j,Y=H}else if(O instanceof s4){let H=z.tail,N=O.key,M=O.attributes,_=n0(G,U,N);I=BG(q,_,M),Z=K,J=W,Q=G,X=j,Y=H}else if(O instanceof c0){let H=z.tail,N=O.key,M=n0(G,U,N),_=y9(K,d7(M));I=q,Z=_,J=W,Q=G,X=j,Y=H}else{let H=z.tail,N=O.view;if(c4(W,N)){let _=k5(W,N),T=C(_,H);I=q,Z=K,J=W,Q=G,X=U,Y=T}else I=q,Z=K,J=W,Q=G,X=j,Y=H}}}}function t9(I,Z,J,Q,X){return XQ(Z.handlers,Z.children,I.old_vdoms,J,Q,P0(X))}function H6(I,Z,J,Q,X,Y){let q=t9(I,Z,J,Q,X);return r9(I,q,J,Q,Y)}function hN(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(X instanceof y)return R8;else{let q=X.tail;if(q instanceof y){let K=X.head;if(c4(Q.handlers,K)){let G=k5(Q.handlers,K);return new R(_5(G,(U)=>{return new A8(U.prevent_default,U.stop_propagation,y0(Y)(U.message))}))}else return R8}else{let K=X.head,W=q;if(c4(Q.children,K)){let U=k5(Q.children,K),z=EN(Y,U.mapper);I=U.events,Z=W,J=z}else return R8}}}}function WQ(I,Z,J,Q){let X=AG(Z+IQ+J),Y=hN(I.events,X,y0);if(Y instanceof R){let q=Y[0],K=$4(Q,q);if(K instanceof R){let W=K[0];return new YQ(Z,W)}else return new QQ(Z)}else return new QQ(Z)}function GQ(I,Z){let J=C(Z.path,I.next_dispatched_paths),Q=new F6(I.events,I.vdoms,I.old_vdoms,I.dispatched_paths,J);if(Z instanceof YQ){let X=Z.handler;return[Q,new R(X)]}else return[Q,R8]}function gG(I,Z,J,Q){let X=WQ(I,Z,J,Q);return((Y)=>{return GQ(I,Y)})(X)}function o9(I,Z){return MG(Z,I.dispatched_paths)}class fG extends P{constructor(I){super();this.message=I}}var uG=(I)=>I instanceof fG;class $G extends P{constructor(I){super();this.callback=I}}var mG=(I)=>I instanceof $G;class vG extends P{constructor(I){super();this.callback=I}}var cG=(I)=>I instanceof vG;class II extends P{constructor(I){super();this.message=I}}var pG=(I)=>new II(I),i7=(I)=>I instanceof II;class UQ extends P{constructor(I,Z){super();this.name=I,this.data=Z}}var sG=(I,Z)=>new UQ(I,Z),l7=(I)=>I instanceof UQ;class zQ extends P{constructor(I,Z){super();this.key=I,this.value=Z}}var dG=(I,Z)=>new zQ(I,Z),iG=(I)=>I instanceof zQ;class VQ extends P{constructor(I,Z){super();this.key=I,this.decoder=Z}}var lG=(I,Z)=>new VQ(I,Z),rG=(I)=>I instanceof VQ;class jQ extends P{constructor(I){super();this.key=I}}var aG=(I)=>new jQ(I),tG=(I)=>I instanceof jQ;class OQ extends P{}var CN=new OQ;var r7=(I)=>I instanceof OQ;class FQ extends P{constructor(I,Z,J,Q,X){super();this.name=I,this.init=Z,this.update=J,this.view=Q,this.config=X}}class HQ extends P{constructor(I,Z,J,Q,X,Y,q,K,W,G,U,z,j,O){super();this.open_shadow_root=I,this.adopt_styles=Z,this.delegates_focus=J,this.attributes=Q,this.properties=X,this.contexts=Y,this.is_form_associated=q,this.on_form_autofill=K,this.on_form_reset=W,this.on_form_restore=G,this.on_form_disabled=U,this.on_connect=z,this.on_adopt=j,this.on_disconnect=O}}var eG=new HQ(!0,!0,!1,G1,G1,G1,!1,U1,U1,U1,U1,U1,U1,U1);var A4=(I,Z)=>{if(I===Z)return!0;if(I==null||Z==null)return!1;let J=typeof I;if(J!==typeof Z)return!1;if(J!=="object")return!1;if(I.constructor!==Z.constructor)return!1;if(Array.isArray(I))return wN(I,Z);return kN(I,Z)},wN=(I,Z)=>{let J=I.length;if(J!==Z.length)return!1;while(J--)if(!A4(I[J],Z[J]))return!1;return!0},kN=(I,Z)=>{let J=Object.keys(I),Q=J.length;if(Object.keys(Z).length!==Q)return!1;while(Q--){let X=J[Q];if(!Object.hasOwn(Z,X))return!1;if(!A4(I[X],Z[X]))return!1}return!0};class Z2 extends P{constructor(I,Z){super();this.patch=I,this.cache=Z}}class RQ extends P{constructor(I,Z,J){super();this.patch=I,this.cache=Z,this.events=J}}class J2 extends P{constructor(I,Z,J){super();this.added=I,this.removed=Z,this.events=J}}function I2(I,Z,J,Q,X,Y,q){while(!0){let K=I,W=Z,G=J,U=Q,z=X,j=Y,O=q;if(U instanceof y)if(z instanceof y)return new J2(j,O,G);else{let H=z.head;if(H instanceof S0){let N=H,M=z.tail,_=H.name,T=H.handler,h=_8(G,W,_,T),w=C(N,j);I=K,Z=W,J=h,Q=U,X=M,Y=w,q=O}else{let N=H,M=z.tail,_=C(N,j);I=K,Z=W,J=G,Q=U,X=M,Y=_,q=O}}else if(z instanceof y){let H=U.head;if(H instanceof S0){let N=H,M=U.tail,_=H.name,T=a9(G,W,_),h=C(N,O);I=K,Z=W,J=T,Q=M,X=z,Y=j,q=h}else{let N=H,M=U.tail,_=C(N,O);I=K,Z=W,J=G,Q=M,X=z,Y=j,q=_}}else{let{head:H,tail:N}=U,M=z.head,_=z.tail,T=h9(H,M);if(T instanceof m0)if(H instanceof S0){let h=H.name;I=K,Z=W,J=a9(G,W,h),Q=N,X=z,Y=j,q=C(H,O)}else I=K,Z=W,J=G,Q=N,X=z,Y=j,q=C(H,O);else if(T instanceof L0)if(H instanceof H4)if(M instanceof H4){let h,w=M.name;if(w==="value")h=K||H.value!==M.value;else if(w==="checked")h=K||H.value!==M.value;else if(w==="selected")h=K||H.value!==M.value;else h=H.value!==M.value;let L=h,S;if(L)S=C(M,j);else S=j;let B=S;I=K,Z=W,J=G,Q=N,X=_,Y=B,q=O}else if(M instanceof S0){let{name:h,handler:w}=M;I=K,Z=W,J=_8(G,W,h,w),Q=N,X=_,Y=C(M,j),q=C(H,O)}else I=K,Z=W,J=G,Q=N,X=_,Y=C(M,j),q=C(H,O);else if(H instanceof M8)if(M instanceof M8){let h,w=M.name;if(w==="scrollLeft")h=!0;else if(w==="scrollRight")h=!0;else if(w==="value")h=K||!A4(H.value,M.value);else if(w==="checked")h=K||!A4(H.value,M.value);else if(w==="selected")h=K||!A4(H.value,M.value);else h=!A4(H.value,M.value);let L=h,S;if(L)S=C(M,j);else S=j;let B=S;I=K,Z=W,J=G,Q=N,X=_,Y=B,q=O}else if(M instanceof S0){let{name:h,handler:w}=M;I=K,Z=W,J=_8(G,W,h,w),Q=N,X=_,Y=C(M,j),q=C(H,O)}else I=K,Z=W,J=G,Q=N,X=_,Y=C(M,j),q=C(H,O);else if(M instanceof S0){let{name:h,handler:w}=M,L=H.prevent_default.kind!==M.prevent_default.kind||H.stop_propagation.kind!==M.stop_propagation.kind||H.debounce!==M.debounce||H.throttle!==M.throttle,S;if(L)S=C(M,j);else S=j;let B=S;I=K,Z=W,J=_8(G,W,h,w),Q=N,X=_,Y=B,q=O}else{let h=H.name;I=K,Z=W,J=a9(G,W,h),Q=N,X=_,Y=C(M,j),q=C(H,O)}else if(M instanceof S0){let{name:h,handler:w}=M;I=K,Z=W,J=_8(G,W,h,w),Q=U,X=_,Y=C(M,j),q=O}else I=K,Z=W,J=G,Q=U,X=_,Y=C(M,j),q=O}}}function bN(I,Z,J,Q){if(J==="input"&&Z==="")return o9(I,Q);else if(J==="select"&&Z==="")return o9(I,Q);else if(J==="textarea"&&Z==="")return o9(I,Q);else return!1}function ZI(I,Z,J,Q,X,Y,q,K,W,G,U,z,j,O){while(!0){let H=I,N=Z,M=J,_=Q,T=X,h=Y,w=q,L=K,S=W,B=G,E=U,A=z,i=j,$=O;if(H instanceof y)if(M instanceof y){let c,K1=g5();if(B instanceof y)if(E instanceof y)c=v6(S,w,B,E);else if(!K1)if(E.tail instanceof y&&w===0){let q1=E.head;c=iW(q1,S)}else c=v6(S,w,B,E);else c=v6(S,w,B,E);else c=v6(S,w,B,E);return new RQ(c,i,$)}else{let c=KQ(i,$,A,L,M),K1=c[0],e=c[1],I1=rJ(M,L-h),q1=C(I1,B),W1=v6(S,w,q1,E);return new RQ(W1,K1,e)}else if(M instanceof y){let{head:c,tail:K1}=H;if(c.key===""||!c4(T,c.key)){let I1=t9(i,$,A,L,c);I=K1,Z=N,J=M,Q=_,X=T,Y=h,q=w+1,K=L,W=S,G=B,U=E,z=A,j=i,O=I1}else I=K1,Z=N,J=M,Q=_,X=T,Y=h,q=w,K=L,W=S,G=B,U=E,z=A,j=i,O=$}else{let c=H.head,K1=M.head;if(c.key!==K1.key){let e=H.tail,I1=M.tail,q1=c4(N,K1.key);if(c4(_,c.key))if(q1)if(c4(T,c.key))I=e,Z=N,J=M,Q=_,X=T,Y=h-1,q=w,K=L,W=S,G=B,U=E,z=A,j=i,O=$;else{let o=k5(N,K1.key),m=L-h,g=C(sW(K1.key,m),B),p=t0(T,K1.key,void 0);I=C(o,H),Z=N,J=M,Q=_,X=p,Y=h+1,q=w,K=L,W=S,G=g,U=E,z=A,j=i,O=$}else{let Z1=L-h,o=r9(i,$,A,L,K1),m=o[0],g=o[1],p=rJ(P0(K1),Z1),J1=C(p,B);I=H,Z=N,J=I1,Q=_,X=T,Y=h+1,q=w,K=L+1,W=S,G=J1,U=E,z=A,j=m,O=g}else if(q1){let Z1=L-h,o=C(dW(Z1),B),m=t9(i,$,A,L,c);I=e,Z=N,J=M,Q=_,X=T,Y=h-1,q=w,K=L,W=S,G=o,U=E,z=A,j=i,O=m}else{let Z1=O6(L-h,K1),o=H6(i,$,A,L,c,K1),m=o[0],g=o[1];I=e,Z=N,J=I1,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(Z1,B),U=E,z=A,j=m,O=g}}else{let e=H.head;if(e instanceof R4){let I1=M.head;if(I1 instanceof R4){let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=ZI(q1.children,q1.keyed_children,Z1.children,Z1.keyed_children,s1(),0,0,0,L,G1,G1,n0(A,L,Z1.key),i,$),g=m.patch,p=m.cache,J1=m.events,f1;if(g.changes instanceof y)if(g.children instanceof y)if(g.removed===0)f1=E;else f1=C(g,E);else f1=C(g,E);else f1=C(g,E);let _1=f1;I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=_1,z=A,j=p,O=J1}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}else if(e instanceof M4){let I1=M.head;if(I1 instanceof M4){let q1=e,W1=I1;if(q1.namespace===W1.namespace&&q1.tag===W1.tag){let Z1=H.tail,o=M.tail,m=n0(A,L,W1.key),g=bN(i,W1.namespace,W1.tag,m),p=I2(g,m,$,q1.attributes,W1.attributes,G1,G1),J1=p.added,f1=p.removed,z1=p.events,_1;if(J1 instanceof y&&f1 instanceof y)_1=G1;else _1=P0(lJ(J1,f1));let Z0=_1,Z6=ZI(q1.children,q1.keyed_children,W1.children,W1.keyed_children,s1(),0,0,0,L,Z0,G1,m,i,z1),X0=Z6.patch,k0=Z6.cache,W4=Z6.events,g4;if(X0.changes instanceof y)if(X0.children instanceof y)if(X0.removed===0)g4=E;else g4=C(X0,E);else g4=C(X0,E);else g4=C(X0,E);let Z9=g4;I=Z1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=Z9,z=A,j=k0,O=W4}else{let Z1=e,o=H.tail,m=I1,g=M.tail,p=O6(L-h,m),J1=H6(i,$,A,L,Z1,m),f1=J1[0],z1=J1[1];I=o,Z=N,J=g,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(p,B),U=E,z=A,j=f1,O=z1}}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}else if(e instanceof p4){let I1=M.head;if(I1 instanceof p4){let q1=e,W1=I1;if(q1.content===W1.content){let Z1=H.tail,o=M.tail;I=Z1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=E,z=A,j=i,O=$}else{let Z1=H.tail,o=I1,m=M.tail,g=v6(L,0,P0(cW(o.content)),G1);I=Z1,Z=N,J=m,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=C(g,E),z=A,j=i,O=$}}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}else if(e instanceof s4){let I1=M.head;if(I1 instanceof s4){let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=n0(A,L,Z1.key),g=I2(!1,m,$,q1.attributes,Z1.attributes,G1,G1),p=g.added,J1=g.removed,f1=g.events,z1;if(p instanceof y&&J1 instanceof y)z1=G1;else z1=P0(lJ(p,J1));let _1=z1,Z0;if(q1.inner_html===Z1.inner_html)Z0=_1;else Z0=C(pW(Z1.inner_html),_1);let X0=Z0,k0;if(X0 instanceof y)k0=E;else k0=C(v6(L,0,X0,G1),E);let W4=k0;I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=W4,z=A,j=i,O=f1}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}else if(e instanceof c0){let I1=M.head;if(I1 instanceof c0){let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=n0(A,L,Z1.key),g=d7(m),p=ZI(P0(q1.child),s1(),P0(Z1.child),s1(),s1(),0,0,0,L,G1,G1,d9(m),i,yG($,g,q1.mapper)),J1=p.patch,f1=p.cache,z1=p.events,_1=xG($,g,Z1.mapper,z1),Z0;if(J1.changes instanceof y)if(J1.children instanceof y)if(J1.removed===0)Z0=E;else Z0=C(J1,E);else Z0=C(J1,E);else Z0=C(J1,E);let X0=Z0;I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=X0,z=A,j=f1,O=_1}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}else{let I1=M.head;if(I1 instanceof b5){let q1=e,W1=H.tail,Z1=I1,o=M.tail;if(DW(q1.dependencies,Z1.dependencies)){let g=kG(i,q1.view,Z1.view);I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=B,U=E,z=A,j=g,O=$}else{let g=wG(i,q1.view,q1.view),p=Z1.view(),J1=bG(i,Z1.view,p);I=C(g,W1),Z=N,J=C(p,o),Q=_,X=T,Y=h,q=w,K=L,W=S,G=B,U=E,z=A,j=J1,O=$}}else{let q1=e,W1=H.tail,Z1=I1,o=M.tail,m=O6(L-h,Z1),g=H6(i,$,A,L,q1,Z1),p=g[0],J1=g[1];I=W1,Z=N,J=o,Q=_,X=T,Y=h,q=w,K=L+1,W=S,G=C(m,B),U=E,z=A,j=p,O=J1}}}}}}function a7(I,Z,J){let Q=EG(I),X=ZI(P0(Z),s1(),P0(J),s1(),s1(),0,0,0,0,G1,G1,s9,Q,hG(Q)),Y=X.patch,q=X.cache,K=X.events;return new Z2(Y,CG(q,K))}var Q2=(I)=>I.reduceRight((Z,J)=>K8(J,Z),G1),o0=(I,Z)=>{if(Array.isArray(I))for(let J=0;J<I.length;J++)Z(I[J]);else if(I)for(I;f4(I);I=f4(I))Z(W8(I))},MQ=(I,Z)=>{if(!f4(I))return Z;else if(!f4(Z))return I;else return Q0(I,Z)};var JI="http://www.w3.org/1999/xhtml",X2=1,Y2=3,AQ=8;var q2=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:xN,clearTimeout:DQ}=globalThis,nN=(I,Z)=>globalThis.document.createElementNS(I,Z),K2=(I)=>globalThis.document.createTextNode(I),W2=(I)=>globalThis.document.createComment(I),gN=()=>globalThis.document.createDocumentFragment(),p6=(I,Z,J)=>I.insertBefore(Z,J),G2=q2?(I,Z,J)=>I.moveBefore(Z,J):p6,U2=(I,Z)=>I.removeChild(Z),fN=(I,Z)=>I.getAttribute(Z),z2=(I,Z,J)=>I.setAttribute(Z,J),uN=(I,Z)=>I.removeAttribute(Z),$N=(I,Z,J,Q)=>I.addEventListener(Z,J,Q),V2=(I,Z,J)=>I.removeEventListener(Z,J),mN=(I,Z)=>I.innerHTML=Z,vN=(I,Z)=>I.data=Z,e0=Symbol("lustre");class F2{constructor(I,Z,J,Q){this.kind=I,this.key=Q,this.parent=Z,this.children=[],this.node=J,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===y5||this.kind===u6}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var I4=(I,Z,J,Q,X)=>{let Y=new F2(I,Z,J,X);return J[e0]=Y,Z?.children.splice(Q,0,Y),Y},cN=(I)=>{let Z="";for(let J=I[e0];J.parent;J=J.parent){let Q=J.parent&&J.parent.kind===u6?p9:c9;if(J.key)Z=`${Q}${J.key}${Z}`;else{let X=J.parent.children.indexOf(J);Z=`${Q}${X}${Z}`}}return Z.slice(1)};class BQ{#I=null;#q;#Q;#Z=!1;constructor(I,Z,J,{debug:Q=!1}={}){this.#I=I,this.#q=Z,this.#Q=J,this.#Z=Q}mount(I){I4($6,null,this.#I,0,null),this.#H(this.#I,null,this.#I[e0],0,I)}push(I,Z=null){this.#J=Z,this.#X.push({node:this.#I[e0],patch:I}),this.#K()}#J;#X=[];#K(){let I=this.#X;while(I.length){let{node:Z,patch:J}=I.pop(),{path:Q,changes:X,removed:Y,children:q}=J;o0(Q,(W)=>{Z=Z.children[W]});let{children:K}=Z;if(o0(X,(W)=>this.#Y(Z,W)),Y)this.#j(Z,K.length-Y,Y);o0(q,(W)=>{let G=K[W.index|0];this.#X.push({node:G,patch:W})})}}#Y(I,Z){switch(Z.kind){case mJ:this.#S(I,Z);break;case vJ:this.#D(I,Z);break;case cJ:this.#F(I,Z);break;case pJ:this.#z(I,Z);break;case sJ:this.#R(I,Z);break;case dJ:this.#W(I,Z);break;case iJ:this.#V(I,Z);break}}#V(I,{children:Z,before:J}){let Q=gN(),X=this.#U(I,J);this.#A(Q,null,I,J|0,Z),p6(I.parentNode,Q,X)}#W(I,{index:Z,with:J}){this.#j(I,Z|0,1);let Q=this.#U(I,Z);this.#H(I.parentNode,Q,I,Z|0,J)}#U(I,Z){Z=Z|0;let{children:J}=I,Q=J.length;if(Z<Q)return J[Z].node;if(I.endNode)return I.endNode;if(!I.isVirtual)return null;while(I.isVirtual&&I.children.length){if(I.endNode)return I.endNode.nextSibling;I=I.children[I.children.length-1]}return I.node.nextSibling}#z(I,{key:Z,before:J}){J=J|0;let{children:Q,parentNode:X}=I,Y=Q[J].node,q=Q[J];for(let K=J+1;K<Q.length;++K){let W=Q[K];if(Q[K]=q,q=W,W.key===Z){Q[J]=W;break}}this.#N(X,q,Y)}#G(I,Z,J){for(let Q=0;Q<Z.length;++Q)this.#N(I,Z[Q],J)}#N(I,Z,J){if(G2(I,Z.node,J),Z.isVirtual)this.#G(I,Z.children,J);if(Z.endNode)G2(I,Z.endNode,J)}#R(I,{index:Z}){this.#j(I,Z,1)}#j(I,Z,J){let{children:Q,parentNode:X}=I,Y=Q.splice(Z,J);for(let q=0;q<Y.length;++q){let K=Y[q],{node:W,endNode:G,isVirtual:U,children:z}=K;if(U2(X,W),G)U2(X,G);if(this.#O(K),U)Y.push(...z)}}#O(I){let{debouncers:Z,children:J}=I;for(let{timeout:Q}of Z.values())if(Q)DQ(Q);Z.clear(),o0(J,(Q)=>this.#O(Q))}#F({node:I,handlers:Z,throttles:J,debouncers:Q},{added:X,removed:Y}){o0(Y,({name:q})=>{if(Z.delete(q))V2(I,q,LQ),this.#M(J,q,0),this.#M(Q,q,0);else uN(I,q),O2[q]?.removed?.(I,q)}),o0(X,(q)=>this.#P(I,q))}#S({node:I},{content:Z}){vN(I,Z??"")}#D({node:I},{inner_html:Z}){mN(I,Z??"")}#A(I,Z,J,Q,X){o0(X,(Y)=>this.#H(I,Z,J,Q++,Y))}#H(I,Z,J,Q,X){switch(X.kind){case $6:{let Y=this.#L(J,Q,X);this.#A(Y,null,Y[e0],0,X.children),p6(I,Y,Z);break}case B8:{let Y=this.#_(J,Q,X);p6(I,Y,Z);break}case y5:{let q=this.#B("lustre:fragment",J,Q,X);if(p6(I,q,Z),this.#A(I,Z,q[e0],0,X.children),this.#Z)q[e0].endNode=W2(" /lustre:fragment "),p6(I,q[e0].endNode,Z);break}case LW:{let Y=this.#L(J,Q,X);this.#D({node:Y},X),p6(I,Y,Z);break}case u6:{let Y=this.#B("lustre:map",J,Q,X);p6(I,Y,Z),this.#H(I,Z,Y[e0],0,X.child);break}case gJ:{let Y=this.#J?.get(X.view)??X.view();this.#H(I,Z,J,Q,Y);break}}}#L(I,Z,{kind:J,key:Q,tag:X,namespace:Y,attributes:q}){let K=nN(Y||JI,X);if(I4(J,I,K,Z,Q),this.#Z&&Q)z2(K,"data-lustre-key",Q);return o0(q,(W)=>this.#P(K,W)),K}#_(I,Z,{kind:J,key:Q,content:X}){let Y=K2(X??"");return I4(J,I,Y,Z,Q),Y}#B(I,Z,J,{kind:Q,key:X}){let Y=this.#Z?W2(pN(I,X)):K2("");return I4(Q,Z,Y,J,X),Y}#P(I,Z){let{debouncers:J,handlers:Q,throttles:X}=I[e0],{kind:Y,name:q,value:K,prevent_default:W,debounce:G,throttle:U}=Z;switch(Y){case _J:{let z=K??"";if(q==="virtual:defaultValue"){I.defaultValue=z;return}else if(q==="virtual:defaultChecked"){I.defaultChecked=!0;return}else if(q==="virtual:defaultSelected"){I.defaultSelected=!0;return}if(z!==fN(I,q))z2(I,q,z);O2[q]?.added?.(I,z);break}case TJ:I[q]=K;break;case EJ:{if(Q.has(q))V2(I,q,LQ);let z=W.kind===hJ;$N(I,q,LQ,{passive:z}),this.#M(X,q,U),this.#M(J,q,G),Q.set(q,(j)=>this.#T(Z,j));break}}}#M(I,Z,J){let Q=I.get(Z);if(J>0)if(Q)Q.delay=J;else I.set(Z,{delay:J});else if(Q){let{timeout:X}=Q;if(X)DQ(X);I.delete(Z)}}#T(I,Z){let{currentTarget:J,type:Q}=Z,{debouncers:X,throttles:Y}=J[e0],q=cN(J),{prevent_default:K,stop_propagation:W,include:G}=I;if(K.kind===kJ)Z.preventDefault();if(W.kind===kJ)Z.stopPropagation();if(Q==="submit")Z.detail??={},Z.detail.formData=[...new FormData(Z.target,Z.submitter).entries()];let U=this.#q(Z,q,Q,G),z=Y.get(Q);if(z){let O=Date.now(),H=z.last||0;if(O>H+z.delay)z.last=O,z.lastEvent=Z,this.#Q(Z,U)}let j=X.get(Q);if(j)DQ(j.timeout),j.timeout=xN(()=>{if(Z===Y.get(Q)?.lastEvent)return;this.#Q(Z,U)},j.delay);if(!z&&!j)this.#Q(Z,U)}}var pN=(I,Z)=>{if(Z)return` ${I} key="${f7(Z)}" `;else return` ${I} `},LQ=(I)=>{let{currentTarget:Z,type:J}=I;Z[e0].handlers.get(J)(I)},j2=(I)=>{return{added(Z){Z[I]=!0},removed(Z){Z[I]=!1}}},sN=(I)=>{return{added(Z,J){Z[I]=J}}},O2={checked:j2("checked"),selected:j2("selected"),value:sN("value"),autofocus:{added(I){queueMicrotask(()=>{I.focus?.()})}},autoplay:{added(I){try{I.play?.()}catch(Z){console.error(Z)}}}};function dN(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(Q instanceof y)return[X,T1(Y)];else{let q=Q.tail,K=Q.head[0],W=Q.head[1],G=x9(K,W),U;if(K==="")U=X;else U=t0(X,K,G);let z=U,j=C(G,Y);I=q,Z=z,J=j}}}function PQ(I){return dN(I,s1(),G1)}function SQ(I,Z,J){let Q=PQ(J),X=Q[0],Y=Q[1];return v7("","",I,Z,Y,X,!1,c7(I,""))}function H2(I,Z,J,Q){let X=PQ(Q),Y=X[0],q=X[1];return v7("",I,Z,J,q,Y,!1,c7(Z,I))}function _Q(I){let Z=PQ(I),J=Z[0],Q=Z[1];return fJ("",Q,J)}function s6(I,Z){return SQ("div",I,Z)}var R2=(I)=>{let Z=I4($6,null,I,0,null),{children:J}=TQ(Z,I,I.firstChild);if(J.length>1){let X=I4($6,null,I,0,null);return Z.kind=y5,Z.node=globalThis.document.createTextNode(""),Z.parent=X,X.children.push(Z),I.insertBefore(Z.node,I.firstChild),_Q(T8(J))}if(J.length===1)return J[0][1];let Q=globalThis.document.createTextNode("");return I4(B8,Z,Q,0,null),I.insertBefore(Q,I.firstChild),x5()},M2=(I,Z,J,Q)=>{if(J.nodeType===AQ){let X=J.data.trim();if(X.startsWith("lustre:fragment"))return rN(I,Z,J,Q);if(X.startsWith("lustre:map"))return aN(I,Z,J,Q);if(X.startsWith("lustre:memo"))return tN(I,Z,J,Q);return null}if(J.nodeType===X2)return iN(I,J,Q);if(J.nodeType===Y2)return lN(I,J,Q);return null},iN=(I,Z,J)=>{let Q=Z.getAttribute("data-lustre-key")??"";if(Q)Z.removeAttribute("data-lustre-key");let X=I4($6,I,Z,J,Q),Y=Z.localName,q=Z.namespaceURI,K=!q||q===JI;if(K&&eN.includes(Y))IR(Y,Z);let W=oN(Z),{children:G}=TQ(X,Z,Z.firstChild),U=K?SQ(Y,W,T8(G)):H2(q,Y,W,T8(G));return t7(Q,U,Z.nextSibling)},TQ=(I,Z,J)=>{let Q=[];while(J&&(J.nodeType!==AQ||J.data.trim()!=="/lustre:fragment")){let X=M2(I,Z,J,Q.length);if(X)Q.push([X.key,X.vnode]),J=X.next;else J=J.nextSibling}return{children:Q,end:J}},lN=(I,Z,J)=>{return I4(B8,I,Z,J,null),t7("",n9(Z.data),Z.nextSibling)},rN=(I,Z,J,Q)=>{let X=EQ(J.data),Y=I4(y5,I,J,Q,X),{children:q,end:K}=TQ(Y,Z,J.nextSibling);Y.endNode=K;let W=_Q(T8(q));return t7(X,W,K?.nextSibling)},aN=(I,Z,J,Q)=>{let X=EQ(J.data),Y=I4(u6,I,J,Q,X),q=A2(Y,Z,J,0);if(!q)return null;let K=kW(q.vnode,(W)=>W);return t7(X,K,q.next)},tN=(I,Z,J,Q)=>{let X=EQ(J.data),Y=A2(I,Z,J,Q);if(!Y)return null;Z.removeChild(J);let q=CW(T8([wW({})]),()=>Y.vnode);return t7(X,q,Y.next)},A2=(I,Z,J,Q)=>{while(!0){if(J=J.nextSibling,!J)return null;let X=M2(I,Z,J,Q);if(X)return X}},t7=(I,Z,J)=>{return{key:I,vnode:Z,next:J}},oN=(I)=>{let Z=[];for(let J=0;J<I.attributes.length;J++){let Q=I.attributes[J];if(Q.name!=="xmlns")Z.push(i1(Q.localName,Q.value))}return T8(Z)},eN=["input","select","textarea"],IR=(I,Z)=>{let{value:J,checked:Q}=Z;if(I==="input"&&Z.type==="checkbox"&&!Q)return;if(I==="input"&&Z.type==="radio"&&!Q)return;if(Z.type!=="checkbox"&&Z.type!=="radio"&&!J)return;queueMicrotask(()=>{if(Z.value=J,Z.checked=Q,Z.dispatchEvent(new Event("input",{bubbles:!0})),Z.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==Z)Z.dispatchEvent(new Event("blur",{bubbles:!0}))})},EQ=(I)=>{let Z=I.match(/key="([^"]*)"/);if(!Z)return"";return ZR(Z[1])},ZR=(I)=>{return I.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},T8=(I)=>I.reduceRight((Z,J)=>K8(J,Z),G1);var g5=()=>!!globalThis.document;class QI{constructor(I,[Z,J],Q,X,Y){this.root=I,this.#I=Z,this.#q=Q,this.#Q=X,this.root.addEventListener("context-request",(W)=>{if(!(W.context&&W.callback))return;if(!this.#K.has(W.context))return;W.stopImmediatePropagation();let G=this.#K.get(W.context);if(W.subscribe){let U=()=>{G.subscribers=G.subscribers.filter((z)=>z!==W.callback)};G.subscribers.push([W.callback,U]),W.callback(G.value,U)}else W.callback(G.value)});let q=(W,G,U)=>WQ(this.#J,G,U,W),K=(W,G)=>{let[U,z]=GQ(this.#J,G);if(this.#J=U,O0(z)){let j=D0(z);if(j.stop_propagation)W.stopPropagation();if(j.prevent_default)W.preventDefault();this.dispatch(j.message,!1)}};this.#X=new BQ(this.root,q,K,Y),this.#Z=R2(this.root),this.#J=qQ(),this.#j(J),this.#F()}root=null;dispatch(I,Z=!1){if(this.#V)this.#W.push(I);else{let[J,Q]=this.#Q(this.#I,I);this.#I=J,this.#R(Z),this.#j(Q)}}emit(I,Z){(this.root.host??this.root).dispatchEvent(new L2(I,Z))}provide(I,Z){if(!this.#K.has(I))this.#K.set(I,{value:Z,subscribers:[]});else{let J=this.#K.get(I);if(A4(J.value,Z))return;J.value=Z;for(let Q=J.subscribers.length-1;Q>=0;Q--){let[X,Y]=J.subscribers[Q];if(!X){J.subscribers.splice(Q,1);continue}X(Z,Y)}}}subscribe(I,Z){if(!I)return;this.#Y.get(I)?.(),(this.root.host??this.root).dispatchEvent(new hQ(I,(Q,X)=>{let Y=this.#Y.get(I);if(Y!==X)Y?.();let q=$4(Q,Z);if(this.#Y.set(I,X),O0(q))this.dispatch(D0(q),!0)},!0))}unsubscribe(I){let Z=this.#Y.get(I);if(Z)Z(),this.#Y.delete(I)}unsubscribeAll(){for(let[I,Z]of this.#Y)Z?.();this.#Y.clear()}#I;#q;#Q;#Z;#J;#X;#K=new Map;#Y=new Map;#V=!1;#W=[];#U=G1;#z=G1;#G=null;#N={dispatch:(I)=>this.dispatch(I),emit:(I,Z)=>this.emit(I,Z),select:()=>{},root:()=>this.root,provide:(I,Z)=>this.provide(I,Z),subscribe:(I,Z)=>this.subscribe(I,Z),unsubscribe:(I)=>this.unsubscribe(I)};#R(I=!1){if(this.#G)return;if(I)this.#G="sync",queueMicrotask(()=>this.#F());else this.#G=window.requestAnimationFrame(()=>this.#F())}#j(I){this.#V=!0;let Z=!1;while(!0){if(o0(I.synchronous,(Q)=>Q(this.#N)),this.#U=MQ(this.#U,I.before_paint),this.#z=MQ(this.#z,I.after_paint),!this.#W.length)break;let J=this.#W.shift();[this.#I,I]=this.#Q(this.#I,J),Z=!0}return this.#V=!1,Z}#O(I){if(this.#j(I))this.#R(!0)}#F(){this.#G=null;let I=this.#q(this.#I),{patch:Z,cache:J}=a7(this.#J,this.#Z,I);if(this.#J=J,this.#Z=I,this.#X.push(Z,S8(J)),X6(this.#U)){let Q=D2(this.#U);this.#U=G1,queueMicrotask(()=>this.#O(Q))}if(X6(this.#z)){let Q=D2(this.#z);this.#z=G1,window.requestAnimationFrame(()=>this.#O(Q))}}}function D2(I){return{synchronous:I,after_paint:G1,before_paint:G1}}class hQ extends Event{constructor(I,Z,J){super("context-request",{bubbles:!0,composed:!0});this.context=I,this.callback=Z,this.subscribe=J}}class L2 extends CustomEvent{isLustreEvent=!0;constructor(I,Z){super(I,{detail:Z,bubbles:!0,composed:!0})}}class B2{#I;constructor(I,[Z,J],Q,X){this.#I=new QI(I,[Z,J],X,Q)}send(I){if(i7(I))this.dispatch(I.message,!1);else if(l7(I))this.emit(I.name,I.data);else if(r7(I));}dispatch(I){this.#I.dispatch(I)}emit(I,Z){this.#I.emit(I,Z)}}var P2=({init:I,update:Z,view:J},Q,X)=>{if(!g5())return o1(CQ());let Y=Q instanceof HTMLElement?Q:globalThis.document.querySelector(Q);if(!Y)return o1(S2(Q));return m1(new B2(Y,I(X),Z,J))};class XR{#I;#q;#Q;#Z;#J;#X;#K=G8();#Y=new Set;constructor(I,Z,J,Q,X,Y){let[q,K]=Z(Y);this.#I=q,this.#q=J,this.#Q=Q,this.#Z=X,this.#J=this.#Q(this.#I),this.#X=TG(this.#J),this.#G(K)}send(I){if(uG(I)){let{message:Z}=Z,J=this.#V(Z),Q=a7(this.#X,this.#J,J);this.#J=J,this.#X=Q.cache,this.broadcast(aJ(Q.patch,S8(Q.cache)))}else if(mG(I)){let{callback:Z}=I;if(this.#Y.add(Z),Z(zG(this.#Z.open_shadow_root,this.#Z.adopt_styles,B7(this.#Z.attributes),B7(this.#Z.properties),B7(this.#Z.contexts),this.#K,this.#J,S8(this.#X))),G9(this.#Z.on_connect))this.#W(U9(this.#Z.on_connect))}else if(cG(I)){let{callback:Z}=I;if(this.#Y.delete(Z),G9(this.#Z.on_disconnect))this.#W(U9(this.#Z.on_disconnect))}else if(i7(I)){let{message:Z}=Z,[J,Q]=this.#q(this.#I,Z),X=this.#Q(J),Y=a7(this.#X,this.#J,X);this.#G(Q),this.#I=J,this.#J=X,this.#X=Y.cache,this.broadcast(aJ(Y.patch,S8(Y.cache)))}else if(l7(I)){let{name:Z,data:J}=I;this.broadcast(VG(Z,J))}else if(iG(I)){let{key:Z,value:J}=I,Q=q6(this.#K,Z);if(O0(Q)&&A4(D0(Q),J))return;this.#K=P5(this.#K,Z,J),this.broadcast(jG(Z,J))}else if(rG(I)){let{key:Z,decoder:J}=I;this.broadcast(OG(Z)),this.#Z.contexts=P5(this.#Z.contexts,Z,J)}else if(tG(I)){let{key:Z}=I;this.broadcast(FG(Z)),this.#Z.contexts=zJ(this.#Z.contexts,Z)}else if(r7(I))this.#I=null,this.#q=null,this.#Q=null,this.#Z=null,this.#J=null,this.#X=null,this.#K=null,this.#Y.clear()}broadcast(I){for(let Z of this.#Y)Z(I)}#V(I){if(JG(I)){let{messages:Z}=I,J=this.#I,Q=j1();for(let X=Z;f4(X);X=f4(X)){let Y=this.#V(W8(X));if(O0(Y)){J=D0(Y)[0],Q=$7(Q2([Q,D0(Y)[1]]));break}}return this.#G(Q),this.#I=J,this.#Q(J)}else if(XG(I)){let{name:Z,value:J}=I,Q=this.#U(Z,J);if(!O0(Q))return this.#J;return this.#W(D0(Q))}else if(qG(I)){let{name:Z,value:J}=I,Q=this.#z(Z,J);if(!O0(Q))return this.#J;return this.#W(D0(Q))}else if(WG(I)){let{path:Z,name:J,event:Q}=q,[X,Y]=gG(this.#X,Z,J,Q);if(this.#X=X,!O0(Y))return this.#J;let{message:q}=D0(Y);return this.#W(q)}else if(UG(I)){let{key:Z,value:J}=I,Q=q6(this.#Z.contexts,Z);if(!O0(Q))return this.#J;if(Q=$4(J,D0(Q)),!O0(Q))return this.#J;return this.#W(D0(Q))}}#W(I){let[Z,J]=this.#q(this.#I,I);return this.#G(J),this.#I=Z,this.#Q(this.#I)}#U(I,Z){let J=q6(this.#Z.attributes,I);if(!O0(J))return J;return D0(J)(Z)}#z(I,Z){let J=q6(this.#Z.properties,I);if(!O0(J))return J;return D0(J)(Z)}#G(I){let Z=(W)=>this.send(pG(W)),J=(W,G)=>this.send(sG(W,G)),Q=()=>{return},X=()=>{return},Y=(W,G)=>this.send(dG(W,G)),q=(W,G)=>this.send(lG(W,G)),K=(W)=>this.send(aG(W));globalThis.queueMicrotask(()=>{MW(I,Z,J,Q,X,Y,q,K)})}}class _2 extends P{constructor(I){super();this.selector=I}}var S2=(I)=>new _2(I);class T2 extends P{}var E2=new T2,CQ=()=>E2;function h2(I,Z,J){return new FQ(U1,I,Z,J,eG)}function C2(I,Z,J){return sK(!g5(),new V1(E2),()=>{return P2(I,Z,J)})}var w2=new Map;function wQ(I,Z,J){clearTimeout(w2.get(I)),w2.set(I,setTimeout(J,Z))}function kQ(I){return confirm(I)}function bQ(I){alert(I)}function yQ(I){return I<=0?0:Math.floor(Math.random()*I)}function o7(I,Z){return bJ(I,_5(Z,(J)=>{return new A8(!1,!1,J)}),G1,CJ,CJ,0,0)}function k2(I,Z){return bJ(I,Z,G1,wJ,wJ,0,0)}function XI(I,Z,J){return new A8(Z,J,I)}function l1(I){return o7("click",k1(I))}function b2(I){return o7("input",H8(V(["target","value"]),C1,(Z)=>{return k1(I(Z))}))}function y2(I){return o7("change",H8(V(["target","value"]),C1,(Z)=>{return k1(I(Z))}))}var nQ=[],f2=[];(()=>{let I="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((Z)=>Z?parseInt(Z,36):1);for(let Z=0,J=0;Z<I.length;Z++)(Z%2?f2:nQ).push(J=J+I[Z])})();function WR(I){if(I<768)return!1;for(let Z=0,J=nQ.length;;){let Q=Z+J>>1;if(I<nQ[Q])J=Q;else if(I>=f2[Q])Z=Q+1;else return!0;if(Z==J)return!1}}function x2(I){return I>=127462&&I<=127487}var n2=8205;function u2(I,Z,J=!0,Q=!0){return(J?$2:GR)(I,Z,Q)}function $2(I,Z,J){if(Z==I.length)return Z;if(Z&&m2(I.charCodeAt(Z))&&v2(I.charCodeAt(Z-1)))Z--;let Q=xQ(I,Z);Z+=g2(Q);while(Z<I.length){let X=xQ(I,Z);if(Q==n2||X==n2||J&&WR(X))Z+=g2(X),Q=X;else if(x2(X)){let Y=0,q=Z-2;while(q>=0&&x2(xQ(I,q)))Y++,q-=2;if(Y%2==0)break;else Z+=2}else break}return Z}function GR(I,Z,J){while(Z>1){let Q=$2(I,Z-2,J);if(Q<Z)return Q;Z--}return 0}function xQ(I,Z){let J=I.charCodeAt(Z);if(!v2(J)||Z+1==I.length)return J;let Q=I.charCodeAt(Z+1);if(!m2(Q))return J;return(J-55296<<10)+(Q-56320)+65536}function m2(I){return I>=56320&&I<57344}function v2(I){return I>=55296&&I<56320}function g2(I){return I<65536?1:2}class M1{lineAt(I){if(I<0||I>this.length)throw RangeError(`Invalid position ${I} in document of length ${this.length}`);return this.lineInner(I,!1,1,0)}line(I){if(I<1||I>this.lines)throw RangeError(`Invalid line number ${I} in ${this.lines}-line document`);return this.lineInner(I,!0,1,0)}replace(I,Z,J){[I,Z]=w8(this,I,Z);let Q=[];if(this.decompose(0,I,Q,2),J.length)J.decompose(0,J.length,Q,3);return this.decompose(Z,this.length,Q,1),d4.from(Q,this.length-(Z-I)+J.length)}append(I){return this.replace(this.length,this.length,I)}slice(I,Z=this.length){[I,Z]=w8(this,I,Z);let J=[];return this.decompose(I,Z,J,0),d4.from(J,Z-I)}eq(I){if(I==this)return!0;if(I.length!=this.length||I.lines!=this.lines)return!1;let Z=this.scanIdentical(I,1),J=this.length-this.scanIdentical(I,-1),Q=new h8(this),X=new h8(I);for(let Y=Z,q=Z;;){if(Q.next(Y),X.next(Y),Y=0,Q.lineBreak!=X.lineBreak||Q.done!=X.done||Q.value!=X.value)return!1;if(q+=Q.value.length,Q.done||q>=J)return!0}}iter(I=1){return new h8(this,I)}iterRange(I,Z=this.length){return new iQ(this,I,Z)}iterLines(I,Z){let J;if(I==null)J=this.iter();else{if(Z==null)Z=this.lines+1;let Q=this.line(I).from;J=this.iterRange(Q,Math.max(Q,Z==this.lines+1?this.length:Z<=1?0:this.line(Z-1).to))}return new lQ(J)}toString(){return this.sliceString(0)}toJSON(){let I=[];return this.flatten(I),I}constructor(){}static of(I){if(I.length==0)throw RangeError("A document must have at least one line");if(I.length==1&&!I[0])return M1.empty;return I.length<=32?new r1(I):d4.from(r1.split(I,[]))}}class r1 extends M1{constructor(I,Z=UR(I)){super();this.text=I,this.length=Z}get lines(){return this.text.length}get children(){return null}lineInner(I,Z,J,Q){for(let X=0;;X++){let Y=this.text[X],q=Q+Y.length;if((Z?J:q)>=I)return new l2(Q,q,J,Y);Q=q+1,J++}}decompose(I,Z,J,Q){let X=I<=0&&Z>=this.length?this:new r1(c2(this.text,I,Z),Math.min(Z,this.length)-Math.max(0,I));if(Q&1){let Y=J.pop(),q=GI(X.text,Y.text.slice(),0,X.length);if(q.length<=32)J.push(new r1(q,Y.length+X.length));else{let K=q.length>>1;J.push(new r1(q.slice(0,K)),new r1(q.slice(K)))}}else J.push(X)}replace(I,Z,J){if(!(J instanceof r1))return super.replace(I,Z,J);[I,Z]=w8(this,I,Z);let Q=GI(this.text,GI(J.text,c2(this.text,0,I)),Z),X=this.length+J.length-(Z-I);if(Q.length<=32)return new r1(Q,X);return d4.from(r1.split(Q,[]),X)}sliceString(I,Z=this.length,J=`
`){[I,Z]=w8(this,I,Z);let Q="";for(let X=0,Y=0;X<=Z&&Y<this.text.length;Y++){let q=this.text[Y],K=X+q.length;if(X>I&&Y)Q+=J;if(I<K&&Z>X)Q+=q.slice(Math.max(0,I-X),Z-X);X=K+1}return Q}flatten(I){for(let Z of this.text)I.push(Z)}scanIdentical(){return 0}static split(I,Z){let J=[],Q=-1;for(let X of I)if(J.push(X),Q+=X.length+1,J.length==32)Z.push(new r1(J,Q)),J=[],Q=-1;if(Q>-1)Z.push(new r1(J,Q));return Z}}class d4 extends M1{constructor(I,Z){super();this.children=I,this.length=Z,this.lines=0;for(let J of I)this.lines+=J.lines}lineInner(I,Z,J,Q){for(let X=0;;X++){let Y=this.children[X],q=Q+Y.length,K=J+Y.lines-1;if((Z?K:q)>=I)return Y.lineInner(I,Z,J,Q);Q=q+1,J=K+1}}decompose(I,Z,J,Q){for(let X=0,Y=0;Y<=Z&&X<this.children.length;X++){let q=this.children[X],K=Y+q.length;if(I<=K&&Z>=Y){let W=Q&((Y<=I?1:0)|(K>=Z?2:0));if(Y>=I&&K<=Z&&!W)J.push(q);else q.decompose(I-Y,Z-Y,J,W)}Y=K+1}}replace(I,Z,J){if([I,Z]=w8(this,I,Z),J.lines<this.lines)for(let Q=0,X=0;Q<this.children.length;Q++){let Y=this.children[Q],q=X+Y.length;if(I>=X&&Z<=q){let K=Y.replace(I-X,Z-X,J),W=this.lines-Y.lines+K.lines;if(K.lines<W>>4&&K.lines>W>>6){let G=this.children.slice();return G[Q]=K,new d4(G,this.length-(Z-I)+J.length)}return super.replace(X,q,K)}X=q+1}return super.replace(I,Z,J)}sliceString(I,Z=this.length,J=`
`){[I,Z]=w8(this,I,Z);let Q="";for(let X=0,Y=0;X<this.children.length&&Y<=Z;X++){let q=this.children[X],K=Y+q.length;if(Y>I&&X)Q+=J;if(I<K&&Z>Y)Q+=q.sliceString(I-Y,Z-Y,J);Y=K+1}return Q}flatten(I){for(let Z of this.children)Z.flatten(I)}scanIdentical(I,Z){if(!(I instanceof d4))return 0;let J=0,[Q,X,Y,q]=Z>0?[0,0,this.children.length,I.children.length]:[this.children.length-1,I.children.length-1,-1,-1];for(;;Q+=Z,X+=Z){if(Q==Y||X==q)return J;let K=this.children[Q],W=I.children[X];if(K!=W)return J+K.scanIdentical(W,Z);J+=K.length+1}}static from(I,Z=I.reduce((J,Q)=>J+Q.length+1,-1)){let J=0;for(let j of I)J+=j.lines;if(J<32){let j=[];for(let O of I)O.flatten(j);return new r1(j,Z)}let Q=Math.max(32,J>>5),X=Q<<1,Y=Q>>1,q=[],K=0,W=-1,G=[];function U(j){let O;if(j.lines>X&&j instanceof d4)for(let H of j.children)U(H);else if(j.lines>Y&&(K>Y||!K))z(),q.push(j);else if(j instanceof r1&&K&&(O=G[G.length-1])instanceof r1&&j.lines+O.lines<=32)K+=j.lines,W+=j.length+1,G[G.length-1]=new r1(O.text.concat(j.text),O.length+1+j.length);else{if(K+j.lines>Q)z();K+=j.lines,W+=j.length+1,G.push(j)}}function z(){if(K==0)return;q.push(G.length==1?G[0]:d4.from(G,W)),W=-1,K=G.length=0}for(let j of I)U(j);return z(),q.length==1?q[0]:new d4(q,Z)}}M1.empty=new r1([""],0);function UR(I){let Z=-1;for(let J of I)Z+=J.length+1;return Z}function GI(I,Z,J=0,Q=1e9){for(let X=0,Y=0,q=!0;Y<I.length&&X<=Q;Y++){let K=I[Y],W=X+K.length;if(W>=J){if(W>Q)K=K.slice(0,Q-X);if(X<J)K=K.slice(J-X);if(q)Z[Z.length-1]+=K,q=!1;else Z.push(K)}X=W+1}return Z}function c2(I,Z,J){return GI(I,[""],Z,J)}class h8{constructor(I,Z=1){this.dir=Z,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[I],this.offsets=[Z>0?1:(I instanceof r1?I.text.length:I.children.length)<<1]}nextInner(I,Z){this.done=this.lineBreak=!1;for(;;){let J=this.nodes.length-1,Q=this.nodes[J],X=this.offsets[J],Y=X>>1,q=Q instanceof r1?Q.text.length:Q.children.length;if(Y==(Z>0?q:0)){if(J==0)return this.done=!0,this.value="",this;if(Z>0)this.offsets[J-1]++;this.nodes.pop(),this.offsets.pop()}else if((X&1)==(Z>0?0:1)){if(this.offsets[J]+=Z,I==0)return this.lineBreak=!0,this.value=`
`,this;I--}else if(Q instanceof r1){let K=Q.text[Y+(Z<0?-1:0)];if(this.offsets[J]+=Z,K.length>Math.max(0,I))return this.value=I==0?K:Z>0?K.slice(I):K.slice(0,K.length-I),this;I-=K.length}else{let K=Q.children[Y+(Z<0?-1:0)];if(I>K.length)I-=K.length,this.offsets[J]+=Z;else{if(Z<0)this.offsets[J]--;this.nodes.push(K),this.offsets.push(Z>0?1:(K instanceof r1?K.text.length:K.children.length)<<1)}}}}next(I=0){if(I<0)this.nextInner(-I,-this.dir),I=this.value.length;return this.nextInner(I,this.dir)}}class iQ{constructor(I,Z,J){this.value="",this.done=!1,this.cursor=new h8(I,Z>J?-1:1),this.pos=Z>J?I.length:0,this.from=Math.min(Z,J),this.to=Math.max(Z,J)}nextInner(I,Z){if(Z<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;I+=Math.max(0,Z<0?this.pos-this.to:this.from-this.pos);let J=Z<0?this.pos-this.from:this.to-this.pos;if(I>J)I=J;J-=I;let{value:Q}=this.cursor.next(I);return this.pos+=(Q.length+I)*Z,this.value=Q.length<=J?Q:Z<0?Q.slice(Q.length-J):Q.slice(0,J),this.done=!this.value,this}next(I=0){if(I<0)I=Math.max(I,this.from-this.pos);else if(I>0)I=Math.min(I,this.to-this.pos);return this.nextInner(I,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class lQ{constructor(I){this.inner=I,this.afterBreak=!0,this.value="",this.done=!1}next(I=0){let{done:Z,lineBreak:J,value:Q}=this.inner.next(I);if(Z&&this.afterBreak)this.value="",this.afterBreak=!1;else if(Z)this.done=!0,this.value="";else if(J)if(this.afterBreak)this.value="";else this.afterBreak=!0,this.next();else this.value=Q,this.afterBreak=!1;return this}get lineBreak(){return!1}}if(typeof Symbol<"u")M1.prototype[Symbol.iterator]=function(){return this.iter()},h8.prototype[Symbol.iterator]=iQ.prototype[Symbol.iterator]=lQ.prototype[Symbol.iterator]=function(){return this};class l2{constructor(I,Z,J,Q){this.from=I,this.to=Z,this.number=J,this.text=Q}get length(){return this.to-this.from}}function w8(I,Z,J){return Z=Math.max(0,Math.min(I.length,Z)),[Z,Math.max(Z,Math.min(I.length,J))]}function q0(I,Z,J=!0,Q=!0){return u2(I,Z,J,Q)}function zR(I){return I>=56320&&I<57344}function VR(I){return I>=55296&&I<56320}function r2(I,Z){let J=I.charCodeAt(Z);if(!VR(J)||Z+1==I.length)return J;let Q=I.charCodeAt(Z+1);if(!zR(Q))return J;return(J-55296<<10)+(Q-56320)+65536}function a2(I){return I<65536?1:2}var fQ=/\r\n?|\n/,_0=function(I){return I[I.Simple=0]="Simple",I[I.TrackDel=1]="TrackDel",I[I.TrackBefore=2]="TrackBefore",I[I.TrackAfter=3]="TrackAfter",I}(_0||(_0={}));class L4{constructor(I){this.sections=I}get length(){let I=0;for(let Z=0;Z<this.sections.length;Z+=2)I+=this.sections[Z];return I}get newLength(){let I=0;for(let Z=0;Z<this.sections.length;Z+=2){let J=this.sections[Z+1];I+=J<0?this.sections[Z]:J}return I}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(I){for(let Z=0,J=0,Q=0;Z<this.sections.length;){let X=this.sections[Z++],Y=this.sections[Z++];if(Y<0)I(J,Q,X),Q+=X;else Q+=Y;J+=X}}iterChangedRanges(I,Z=!1){uQ(this,I,Z)}get invertedDesc(){let I=[];for(let Z=0;Z<this.sections.length;){let J=this.sections[Z++],Q=this.sections[Z++];if(Q<0)I.push(J,Q);else I.push(Q,J)}return new L4(I)}composeDesc(I){return this.empty?I:I.empty?this:t2(this,I)}mapDesc(I,Z=!1){return I.empty?this:$Q(this,I,Z)}mapPos(I,Z=-1,J=_0.Simple){let Q=0,X=0;for(let Y=0;Y<this.sections.length;){let q=this.sections[Y++],K=this.sections[Y++],W=Q+q;if(K<0){if(W>I)return X+(I-Q);X+=q}else{if(J!=_0.Simple&&W>=I&&(J==_0.TrackDel&&Q<I&&W>I||J==_0.TrackBefore&&Q<I||J==_0.TrackAfter&&W>I))return null;if(W>I||W==I&&Z<0&&!q)return I==Q||Z<0?X:X+K;X+=K}Q=W}if(I>Q)throw RangeError(`Position ${I} is out of range for changeset of length ${Q}`);return X}touchesRange(I,Z=I){for(let J=0,Q=0;J<this.sections.length&&Q<=Z;){let X=this.sections[J++],Y=this.sections[J++],q=Q+X;if(Y>=0&&Q<=Z&&q>=I)return Q<I&&q>Z?"cover":!0;Q=q}return!1}toString(){let I="";for(let Z=0;Z<this.sections.length;){let J=this.sections[Z++],Q=this.sections[Z++];I+=(I?" ":"")+J+(Q>=0?":"+Q:"")}return I}toJSON(){return this.sections}static fromJSON(I){if(!Array.isArray(I)||I.length%2||I.some((Z)=>typeof Z!="number"))throw RangeError("Invalid JSON representation of ChangeDesc");return new L4(I)}static create(I){return new L4(I)}}class a1 extends L4{constructor(I,Z){super(I);this.inserted=Z}apply(I){if(this.length!=I.length)throw RangeError("Applying change set to a document with the wrong length");return uQ(this,(Z,J,Q,X,Y)=>I=I.replace(Q,Q+(J-Z),Y),!1),I}mapDesc(I,Z=!1){return $Q(this,I,Z,!0)}invert(I){let Z=this.sections.slice(),J=[];for(let Q=0,X=0;Q<Z.length;Q+=2){let Y=Z[Q],q=Z[Q+1];if(q>=0){Z[Q]=q,Z[Q+1]=Y;let K=Q>>1;while(J.length<K)J.push(M1.empty);J.push(Y?I.slice(X,X+Y):M1.empty)}X+=Y}return new a1(Z,J)}compose(I){return this.empty?I:I.empty?this:t2(this,I,!0)}map(I,Z=!1){return I.empty?this:$Q(this,I,Z,!0)}iterChanges(I,Z=!1){uQ(this,I,Z)}get desc(){return L4.create(this.sections)}filter(I){let Z=[],J=[],Q=[],X=new k8(this);I:for(let Y=0,q=0;;){let K=Y==I.length?1e9:I[Y++];while(q<K||q==K&&X.len==0){if(X.done)break I;let G=Math.min(X.len,K-q);N0(Q,G,-1);let U=X.ins==-1?-1:X.off==0?X.ins:0;if(N0(Z,G,U),U>0)i6(J,Z,X.text);X.forward(G),q+=G}let W=I[Y++];while(q<W){if(X.done)break I;let G=Math.min(X.len,W-q);N0(Z,G,-1),N0(Q,G,X.ins==-1?-1:X.off==0?X.ins:0),X.forward(G),q+=G}}return{changes:new a1(Z,J),filtered:L4.create(Q)}}toJSON(){let I=[];for(let Z=0;Z<this.sections.length;Z+=2){let J=this.sections[Z],Q=this.sections[Z+1];if(Q<0)I.push(J);else if(Q==0)I.push([J]);else I.push([J].concat(this.inserted[Z>>1].toJSON()))}return I}static of(I,Z,J){let Q=[],X=[],Y=0,q=null;function K(G=!1){if(!G&&!Q.length)return;if(Y<Z)N0(Q,Z-Y,-1);let U=new a1(Q,X);q=q?q.compose(U.map(q)):U,Q=[],X=[],Y=0}function W(G){if(Array.isArray(G))for(let U of G)W(U);else if(G instanceof a1){if(G.length!=Z)throw RangeError(`Mismatched change set length (got ${G.length}, expected ${Z})`);K(),q=q?q.compose(G.map(q)):G}else{let{from:U,to:z=U,insert:j}=G;if(U>z||U<0||z>Z)throw RangeError(`Invalid change range ${U} to ${z} (in doc of length ${Z})`);let O=!j?M1.empty:typeof j=="string"?M1.of(j.split(J||fQ)):j,H=O.length;if(U==z&&H==0)return;if(U<Y)K();if(U>Y)N0(Q,U-Y,-1);N0(Q,z-U,H),i6(X,Q,O),Y=z}}return W(I),K(!q),q}static empty(I){return new a1(I?[I,-1]:[],[])}static fromJSON(I){if(!Array.isArray(I))throw RangeError("Invalid JSON representation of ChangeSet");let Z=[],J=[];for(let Q=0;Q<I.length;Q++){let X=I[Q];if(typeof X=="number")Z.push(X,-1);else if(!Array.isArray(X)||typeof X[0]!="number"||X.some((Y,q)=>q&&typeof Y!="string"))throw RangeError("Invalid JSON representation of ChangeSet");else if(X.length==1)Z.push(X[0],0);else{while(J.length<Q)J.push(M1.empty);J[Q]=M1.of(X.slice(1)),Z.push(X[0],J[Q].length)}}return new a1(Z,J)}static createSet(I,Z){return new a1(I,Z)}}function N0(I,Z,J,Q=!1){if(Z==0&&J<=0)return;let X=I.length-2;if(X>=0&&J<=0&&J==I[X+1])I[X]+=Z;else if(X>=0&&Z==0&&I[X]==0)I[X+1]+=J;else if(Q)I[X]+=Z,I[X+1]+=J;else I.push(Z,J)}function i6(I,Z,J){if(J.length==0)return;let Q=Z.length-2>>1;if(Q<I.length)I[I.length-1]=I[I.length-1].append(J);else{while(I.length<Q)I.push(M1.empty);I.push(J)}}function uQ(I,Z,J){let Q=I.inserted;for(let X=0,Y=0,q=0;q<I.sections.length;){let K=I.sections[q++],W=I.sections[q++];if(W<0)X+=K,Y+=K;else{let G=X,U=Y,z=M1.empty;for(;;){if(G+=K,U+=W,W&&Q)z=z.append(Q[q-2>>1]);if(J||q==I.sections.length||I.sections[q+1]<0)break;K=I.sections[q++],W=I.sections[q++]}Z(X,G,Y,U,z),X=G,Y=U}}}function $Q(I,Z,J,Q=!1){let X=[],Y=Q?[]:null,q=new k8(I),K=new k8(Z);for(let W=-1;;)if(q.done&&K.len||K.done&&q.len)throw Error("Mismatched change set lengths");else if(q.ins==-1&&K.ins==-1){let G=Math.min(q.len,K.len);N0(X,G,-1),q.forward(G),K.forward(G)}else if(K.ins>=0&&(q.ins<0||W==q.i||q.off==0&&(K.len<q.len||K.len==q.len&&!J))){let G=K.len;N0(X,K.ins,-1);while(G){let U=Math.min(q.len,G);if(q.ins>=0&&W<q.i&&q.len<=U){if(N0(X,0,q.ins),Y)i6(Y,X,q.text);W=q.i}q.forward(U),G-=U}K.next()}else if(q.ins>=0){let G=0,U=q.len;while(U)if(K.ins==-1){let z=Math.min(U,K.len);G+=z,U-=z,K.forward(z)}else if(K.ins==0&&K.len<U)U-=K.len,K.next();else break;if(N0(X,G,W<q.i?q.ins:0),Y&&W<q.i)i6(Y,X,q.text);W=q.i,q.forward(q.len-U)}else if(q.done&&K.done)return Y?a1.createSet(X,Y):L4.create(X);else throw Error("Mismatched change set lengths")}function t2(I,Z,J=!1){let Q=[],X=J?[]:null,Y=new k8(I),q=new k8(Z);for(let K=!1;;)if(Y.done&&q.done)return X?a1.createSet(Q,X):L4.create(Q);else if(Y.ins==0)N0(Q,Y.len,0,K),Y.next();else if(q.len==0&&!q.done){if(N0(Q,0,q.ins,K),X)i6(X,Q,q.text);q.next()}else if(Y.done||q.done)throw Error("Mismatched change set lengths");else{let W=Math.min(Y.len2,q.len),G=Q.length;if(Y.ins==-1){let U=q.ins==-1?-1:q.off?0:q.ins;if(N0(Q,W,U,K),X&&U)i6(X,Q,q.text)}else if(q.ins==-1){if(N0(Q,Y.off?0:Y.len,W,K),X)i6(X,Q,Y.textBit(W))}else if(N0(Q,Y.off?0:Y.len,q.off?0:q.ins,K),X&&!q.off)i6(X,Q,q.text);K=(Y.ins>W||q.ins>=0&&q.len>W)&&(K||Q.length>G),Y.forward2(W),q.forward(W)}}class k8{constructor(I){this.set=I,this.i=0,this.next()}next(){let{sections:I}=this.set;if(this.i<I.length)this.len=I[this.i++],this.ins=I[this.i++];else this.len=0,this.ins=-2;this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:I}=this.set,Z=this.i-2>>1;return Z>=I.length?M1.empty:I[Z]}textBit(I){let{inserted:Z}=this.set,J=this.i-2>>1;return J>=Z.length&&!I?M1.empty:Z[J].slice(this.off,I==null?void 0:this.off+I)}forward(I){if(I==this.len)this.next();else this.len-=I,this.off+=I}forward2(I){if(this.ins==-1)this.forward(I);else if(I==this.ins)this.next();else this.ins-=I,this.off+=I}}class d6{constructor(I,Z,J,Q){this.from=I,this.to=Z,this.flags=J,this.goalColumn=Q}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let I=this.flags&7;return I==7?null:I}map(I,Z=-1){let J,Q;if(this.empty)J=Q=I.mapPos(this.from,Z);else J=I.mapPos(this.from,1),Q=I.mapPos(this.to,-1);return J==this.from&&Q==this.to?this:new d6(J,Q,this.flags,this.goalColumn)}extend(I,Z=I,J=0){if(I<=this.anchor&&Z>=this.anchor)return u.range(I,Z,void 0,void 0,J);let Q=Math.abs(I-this.anchor)>Math.abs(Z-this.anchor)?I:Z;return u.range(this.anchor,Q,void 0,void 0,J)}eq(I,Z=!1){return this.anchor==I.anchor&&this.head==I.head&&this.goalColumn==I.goalColumn&&(!Z||!this.empty||this.assoc==I.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(I){if(!I||typeof I.anchor!="number"||typeof I.head!="number")throw RangeError("Invalid JSON representation for SelectionRange");return u.range(I.anchor,I.head)}static create(I,Z,J,Q){return new d6(I,Z,J,Q)}}class u{constructor(I,Z){this.ranges=I,this.mainIndex=Z}map(I,Z=-1){if(I.empty)return this;return u.create(this.ranges.map((J)=>J.map(I,Z)),this.mainIndex)}eq(I,Z=!1){if(this.ranges.length!=I.ranges.length||this.mainIndex!=I.mainIndex)return!1;for(let J=0;J<this.ranges.length;J++)if(!this.ranges[J].eq(I.ranges[J],Z))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new u([this.main],0)}addRange(I,Z=!0){return u.create([I].concat(this.ranges),Z?0:this.mainIndex+1)}replaceRange(I,Z=this.mainIndex){let J=this.ranges.slice();return J[Z]=I,u.create(J,this.mainIndex)}toJSON(){return{ranges:this.ranges.map((I)=>I.toJSON()),main:this.mainIndex}}static fromJSON(I){if(!I||!Array.isArray(I.ranges)||typeof I.main!="number"||I.main>=I.ranges.length)throw RangeError("Invalid JSON representation for EditorSelection");return new u(I.ranges.map((Z)=>d6.fromJSON(Z)),I.main)}static single(I,Z=I){return new u([u.range(I,Z)],0)}static create(I,Z=0){if(I.length==0)throw RangeError("A selection needs at least one range");for(let J=0,Q=0;Q<I.length;Q++){let X=I[Q];if(X.empty?X.from<=J:X.from<J)return u.normalized(I.slice(),Z);J=X.to}return new u(I,Z)}static cursor(I,Z=0,J,Q){return d6.create(I,I,(Z==0?0:Z<0?8:16)|(J==null?7:Math.min(6,J)),Q)}static range(I,Z,J,Q,X){let Y=Q==null?7:Math.min(6,Q);if(!X&&I!=Z)X=Z<I?1:-1;if(X)Y|=X<0?8:16;return Z<I?d6.create(Z,I,Y|32,J):d6.create(I,Z,Y,J)}static undirectionalRange(I,Z){return d6.create(I,Z,64,void 0)}static normalized(I,Z=0){let J=I[Z];I.sort((Q,X)=>Q.from-X.from),Z=I.indexOf(J);for(let Q=1;Q<I.length;Q++){let X=I[Q],Y=I[Q-1];if(X.empty?X.from<=Y.to:X.from<Y.to){let q=Y.from,K=Math.max(X.to,Y.to);if(Q<=Z)Z--;I.splice(--Q,2,X.anchor>X.head?u.range(K,q):u.range(q,K))}}return new u(I,Z)}}function o2(I,Z){for(let J of I.ranges)if(J.to>Z)throw RangeError("Selection points outside of document")}var rQ=0;class t{constructor(I,Z,J,Q,X){this.combine=I,this.compareInput=Z,this.compare=J,this.isStatic=Q,this.id=rQ++,this.default=I([]),this.extensions=typeof X=="function"?X(this):X}get reader(){return this}static define(I={}){return new t(I.combine||((Z)=>Z),I.compareInput||((Z,J)=>Z===J),I.compare||(!I.combine?aQ:(Z,J)=>Z===J),!!I.static,I.enables)}of(I){return new I3([],this,0,I)}compute(I,Z){if(this.isStatic)throw Error("Can't compute a static facet");return new I3(I,this,1,Z)}computeN(I,Z){if(this.isStatic)throw Error("Can't compute a static facet");return new I3(I,this,2,Z)}from(I,Z){if(!Z)Z=(J)=>J;return this.compute([I],(J)=>Z(J.field(I)))}}function aQ(I,Z){return I==Z||I.length==Z.length&&I.every((J,Q)=>J===Z[Q])}class I3{constructor(I,Z,J,Q){this.dependencies=I,this.facet=Z,this.type=J,this.value=Q,this.id=rQ++}dynamicSlot(I){var Z;let J=this.value,Q=this.facet.compareInput,X=this.id,Y=I[X]>>1,q=this.type==2,K=!1,W=!1,G=[];for(let U of this.dependencies)if(U=="doc")K=!0;else if(U=="selection")W=!0;else if((((Z=I[U.id])!==null&&Z!==void 0?Z:1)&1)==0)G.push(I[U.id]);return{create(U){return U.values[Y]=J(U),1},update(U,z){if(K&&z.docChanged||W&&(z.docChanged||z.selection)||mQ(U,G)){let j=J(U);if(q?!p2(j,U.values[Y],Q):!Q(j,U.values[Y]))return U.values[Y]=j,1}return 0},reconfigure:(U,z)=>{let j,O=z.config.address[X];if(O!=null){let H=VI(z,O);if(this.dependencies.every((N)=>{return N instanceof t?z.facet(N)===U.facet(N):N instanceof R0?z.field(N,!1)==U.field(N,!1):!0})||(q?p2(j=J(U),H,Q):Q(j=J(U),H)))return U.values[Y]=H,0}else j=J(U);return U.values[Y]=j,1}}}get extension(){return this}}function p2(I,Z,J){if(I.length!=Z.length)return!1;for(let Q=0;Q<I.length;Q++)if(!J(I[Q],Z[Q]))return!1;return!0}function mQ(I,Z){let J=!1;for(let Q of Z)if(Z3(I,Q)&1)J=!0;return J}function jR(I,Z,J){let Q=J.map((W)=>I[W.id]),X=J.map((W)=>W.type),Y=Q.filter((W)=>!(W&1)),q=I[Z.id]>>1;function K(W){let G=[];for(let U=0;U<Q.length;U++){let z=VI(W,Q[U]);if(X[U]==2)for(let j of z)G.push(j);else G.push(z)}return Z.combine(G)}return{create(W){for(let G of Q)Z3(W,G);return W.values[q]=K(W),1},update(W,G){if(!mQ(W,Y))return 0;let U=K(W);if(Z.compare(U,W.values[q]))return 0;return W.values[q]=U,1},reconfigure(W,G){let U=mQ(W,Q),z=G.config.facets[Z.id],j=G.facet(Z);if(z&&!U&&aQ(J,z))return W.values[q]=j,0;let O=K(W);if(Z.compare(O,j))return W.values[q]=j,0;return W.values[q]=O,1}}}var qI=t.define({static:!0});class R0{constructor(I,Z,J,Q,X){this.id=I,this.createF=Z,this.updateF=J,this.compareF=Q,this.spec=X,this.provides=void 0}static define(I){let Z=new R0(rQ++,I.create,I.update,I.compare||((J,Q)=>J===Q),I);if(I.provide)Z.provides=I.provide(Z);return Z}create(I){let Z=I.facet(qI).find((J)=>J.field==this);return((Z===null||Z===void 0?void 0:Z.create)||this.createF)(I)}slot(I){let Z=I[this.id]>>1;return{create:(J)=>{return J.values[Z]=this.create(J),1},update:(J,Q)=>{let X=J.values[Z],Y=this.updateF(X,Q);if(this.compareF(X,Y))return 0;return J.values[Z]=Y,1},reconfigure:(J,Q)=>{let X=J.facet(qI),Y=Q.facet(qI),q;if((q=X.find((K)=>K.field==this))&&q!=Y.find((K)=>K.field==this))return J.values[Z]=q.create(J),1;if(Q.config.address[this.id]!=null)return J.values[Z]=Q.field(this),0;return J.values[Z]=this.create(J),1}}}init(I){return[this,qI.of({field:this,create:I})]}get extension(){return this}}var f5={lowest:4,low:3,default:2,high:1,highest:0};function e7(I){return(Z)=>new tQ(Z,I)}var M6={highest:e7(f5.highest),high:e7(f5.high),default:e7(f5.default),low:e7(f5.low),lowest:e7(f5.lowest)};class tQ{constructor(I,Z){this.inner=I,this.prec=Z}get extension(){return this}}class u5{of(I){return new UI(this,I)}reconfigure(I){return u5.reconfigure.of({compartment:this,extension:I})}get(I){return I.config.compartments.get(this)}}class UI{constructor(I,Z){this.compartment=I,this.inner=Z}get extension(){return this}}class zI{constructor(I,Z,J,Q,X,Y){this.base=I,this.compartments=Z,this.dynamicSlots=J,this.address=Q,this.staticValues=X,this.facets=Y,this.statusTemplate=[];while(this.statusTemplate.length<J.length)this.statusTemplate.push(0)}staticFacet(I){let Z=this.address[I.id];return Z==null?I.default:this.staticValues[Z>>1]}static resolve(I,Z,J){let Q=[],X=Object.create(null),Y=new Map;for(let z of OR(I,Z,Y))if(z instanceof R0)Q.push(z);else(X[z.facet.id]||(X[z.facet.id]=[])).push(z);let q=Object.create(null),K=[],W=[];for(let z of Q)q[z.id]=W.length<<1,W.push((j)=>z.slot(j));let G=J===null||J===void 0?void 0:J.config.facets;for(let z in X){let j=X[z],O=j[0].facet,H=G&&G[z]||[];if(j.every((N)=>N.type==0))if(q[O.id]=K.length<<1|1,aQ(H,j))K.push(J.facet(O));else{let N=O.combine(j.map((M)=>M.value));K.push(J&&O.compare(N,J.facet(O))?J.facet(O):N)}else{for(let N of j)if(N.type==0)q[N.id]=K.length<<1|1,K.push(N.value);else q[N.id]=W.length<<1,W.push((M)=>N.dynamicSlot(M));q[O.id]=W.length<<1,W.push((N)=>jR(N,O,j))}}let U=W.map((z)=>z(q));return new zI(I,Y,U,q,K,X)}}function OR(I,Z,J){let Q=[[],[],[],[],[]],X=new Map;function Y(q,K){let W=X.get(q);if(W!=null){if(W<=K)return;let G=Q[W].indexOf(q);if(G>-1)Q[W].splice(G,1);if(q instanceof UI)J.delete(q.compartment)}if(X.set(q,K),Array.isArray(q))for(let G of q)Y(G,K);else if(q instanceof UI){if(J.has(q.compartment))throw RangeError("Duplicate use of compartment in extensions");let G=Z.get(q.compartment)||q.inner;J.set(q.compartment,G),Y(G,K)}else if(q instanceof tQ)Y(q.inner,q.prec);else if(q instanceof R0){if(Q[K].push(q),q.provides)Y(q.provides,K)}else if(q instanceof I3){if(Q[K].push(q),q.facet.extensions)Y(q.facet.extensions,f5.default)}else{let G=q.extension;if(!G)throw Error(`Unrecognized extension value in extension set (${q}).`);if(G==q)throw Error(`Unrecognized extension value in extension set (${q}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);Y(G,K)}}return Y(I,f5.default),Q.reduce((q,K)=>q.concat(K))}function Z3(I,Z){if(Z&1)return 2;let J=Z>>1,Q=I.status[J];if(Q==4)throw Error("Cyclic dependency between fields and/or facets");if(Q&2)return Q;I.status[J]=4;let X=I.computeSlot(I,I.config.dynamicSlots[J]);return I.status[J]=2|X}function VI(I,Z){return Z&1?I.config.staticValues[Z>>1]:I.values[Z>>1]}var e2=t.define(),vQ=t.define({combine:(I)=>I.some((Z)=>Z),static:!0}),IU=t.define({combine:(I)=>I.length?I[0]:void 0,static:!0}),ZU=t.define(),JU=t.define(),QU=t.define(),XU=t.define({combine:(I)=>I.length?I[0]:!1});class B4{constructor(I,Z){this.type=I,this.value=Z}static define(){return new YU}}class YU{of(I){return new B4(this,I)}}class qU{constructor(I){this.map=I}of(I){return new B1(this,I)}}class B1{constructor(I,Z){this.type=I,this.value=Z}map(I){let Z=this.type.map(this.value,I);return Z===void 0?void 0:Z==this.value?this:new B1(this.type,Z)}is(I){return this.type==I}static define(I={}){return new qU(I.map||((Z)=>Z))}static mapEffects(I,Z){if(!I.length)return I;let J=[];for(let Q of I){let X=Q.map(Z);if(X)J.push(X)}return J}}B1.reconfigure=B1.define();B1.appendConfig=B1.define();class t1{constructor(I,Z,J,Q,X,Y){if(this.startState=I,this.changes=Z,this.selection=J,this.effects=Q,this.annotations=X,this.scrollIntoView=Y,this._doc=null,this._state=null,J)o2(J,Z.newLength);if(!X.some((q)=>q.type==t1.time))this.annotations=X.concat(t1.time.of(Date.now()))}static create(I,Z,J,Q,X,Y){return new t1(I,Z,J,Q,X,Y)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){if(!this._state)this.startState.applyTransaction(this);return this._state}annotation(I){for(let Z of this.annotations)if(Z.type==I)return Z.value;return}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(I){let Z=this.annotation(t1.userEvent);return!!(Z&&(Z==I||Z.length>I.length&&Z.slice(0,I.length)==I&&Z[I.length]=="."))}}t1.time=B4.define();t1.userEvent=B4.define();t1.addToHistory=B4.define();t1.remote=B4.define();function FR(I,Z){let J=[];for(let Q=0,X=0;;){let Y,q;if(Q<I.length&&(X==Z.length||Z[X]>=I[Q]))Y=I[Q++],q=I[Q++];else if(X<Z.length)Y=Z[X++],q=Z[X++];else return J;if(!J.length||J[J.length-1]<Y)J.push(Y,q);else if(J[J.length-1]<q)J[J.length-1]=q}}function KU(I,Z,J){var Q;let X,Y,q;if(J)X=Z.changes,Y=a1.empty(Z.changes.length),q=I.changes.compose(Z.changes);else X=Z.changes.map(I.changes),Y=I.changes.mapDesc(Z.changes,!0),q=I.changes.compose(X);return{changes:q,selection:Z.selection?Z.selection.map(Y):(Q=I.selection)===null||Q===void 0?void 0:Q.map(X),effects:B1.mapEffects(I.effects,X).concat(B1.mapEffects(Z.effects,Y)),annotations:I.annotations.length?I.annotations.concat(Z.annotations):Z.annotations,scrollIntoView:I.scrollIntoView||Z.scrollIntoView}}function cQ(I,Z,J){let Q=Z.selection,X=C8(Z.annotations);if(Z.userEvent)X=X.concat(t1.userEvent.of(Z.userEvent));return{changes:Z.changes instanceof a1?Z.changes:a1.of(Z.changes||[],J,I.facet(IU)),selection:Q&&(Q instanceof u?Q:u.single(Q.anchor,Q.head)),effects:C8(Z.effects),annotations:X,scrollIntoView:!!Z.scrollIntoView}}function WU(I,Z,J){let Q=cQ(I,Z.length?Z[0]:{},I.doc.length);if(Z.length&&Z[0].filter===!1)J=!1;for(let Y=1;Y<Z.length;Y++){if(Z[Y].filter===!1)J=!1;let q=!!Z[Y].sequential;Q=KU(Q,cQ(I,Z[Y],q?Q.changes.newLength:I.doc.length),q)}let X=t1.create(I,Q.changes,Q.selection,Q.effects,Q.annotations,Q.scrollIntoView);return NR(J?HR(X):X)}function HR(I){let Z=I.startState,J=!0;for(let X of Z.facet(ZU)){let Y=X(I);if(Y===!1){J=!1;break}if(Array.isArray(Y))J=J===!0?Y:FR(J,Y)}if(J!==!0){let X,Y;if(J===!1)Y=I.changes.invertedDesc,X=a1.empty(Z.doc.length);else{let q=I.changes.filter(J);X=q.changes,Y=q.filtered.mapDesc(q.changes).invertedDesc}I=t1.create(Z,X,I.selection&&I.selection.map(Y),B1.mapEffects(I.effects,Y),I.annotations,I.scrollIntoView)}let Q=Z.facet(JU);for(let X=Q.length-1;X>=0;X--){let Y=Q[X](I);if(Y instanceof t1)I=Y;else if(Array.isArray(Y)&&Y.length==1&&Y[0]instanceof t1)I=Y[0];else I=WU(Z,C8(Y),!1)}return I}function NR(I){let Z=I.startState,J=Z.facet(QU),Q=I;for(let X=J.length-1;X>=0;X--){let Y=J[X](I);if(Y&&Object.keys(Y).length)Q=KU(Q,cQ(Z,Y,I.changes.newLength),!0)}return Q==I?I:t1.create(Z,I.changes,I.selection,Q.effects,Q.annotations,Q.scrollIntoView)}var RR=[];function C8(I){return I==null?RR:Array.isArray(I)?I:[I]}var D4=function(I){return I[I.Word=0]="Word",I[I.Space=1]="Space",I[I.Other=2]="Other",I}(D4||(D4={})),MR=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,pQ;try{pQ=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch(I){}function AR(I){if(pQ)return pQ.test(I);for(let Z=0;Z<I.length;Z++){let J=I[Z];if(/\w/.test(J)||J>""&&(J.toUpperCase()!=J.toLowerCase()||MR.test(J)))return!0}return!1}function DR(I){return(Z)=>{if(!/\S/.test(Z))return D4.Space;if(AR(Z))return D4.Word;for(let J=0;J<I.length;J++)if(Z.indexOf(I[J])>-1)return D4.Word;return D4.Other}}class L1{constructor(I,Z,J,Q,X,Y){if(this.config=I,this.doc=Z,this.selection=J,this.values=Q,this.status=I.statusTemplate.slice(),this.computeSlot=X,Y)Y._state=this;for(let q=0;q<this.config.dynamicSlots.length;q++)Z3(this,q<<1);this.computeSlot=null}field(I,Z=!0){let J=this.config.address[I.id];if(J==null){if(Z)throw RangeError("Field is not present in this state");return}return Z3(this,J),VI(this,J)}update(...I){return WU(this,I,!0)}applyTransaction(I){let Z=this.config,{base:J,compartments:Q}=Z;for(let q of I.effects)if(q.is(u5.reconfigure)){if(Z)Q=new Map,Z.compartments.forEach((K,W)=>Q.set(W,K)),Z=null;Q.set(q.value.compartment,q.value.extension)}else if(q.is(B1.reconfigure))Z=null,J=q.value;else if(q.is(B1.appendConfig))Z=null,J=C8(J).concat(q.value);let X;if(!Z)Z=zI.resolve(J,Q,this),X=new L1(Z,this.doc,this.selection,Z.dynamicSlots.map(()=>null),(K,W)=>W.reconfigure(K,this),null).values;else X=I.startState.values.slice();let Y=I.startState.facet(vQ)?I.newSelection:I.newSelection.asSingle();new L1(Z,I.newDoc,Y,X,(q,K)=>K.update(q,I),I)}replaceSelection(I){if(typeof I=="string")I=this.toText(I);return this.changeByRange((Z)=>({changes:{from:Z.from,to:Z.to,insert:I},range:u.cursor(Z.from+I.length)}))}changeByRange(I){let Z=this.selection,J=I(Z.ranges[0]),Q=this.changes(J.changes),X=[J.range],Y=C8(J.effects);for(let q=1;q<Z.ranges.length;q++){let K=I(Z.ranges[q]),W=this.changes(K.changes),G=W.map(Q);for(let z=0;z<q;z++)X[z]=X[z].map(G);let U=Q.mapDesc(W,!0);X.push(K.range.map(U)),Q=Q.compose(G),Y=B1.mapEffects(Y,G).concat(B1.mapEffects(C8(K.effects),U))}return{changes:Q,selection:u.create(X,Z.mainIndex),effects:Y}}changes(I=[]){if(I instanceof a1)return I;return a1.of(I,this.doc.length,this.facet(L1.lineSeparator))}toText(I){return M1.of(I.split(this.facet(L1.lineSeparator)||fQ))}sliceDoc(I=0,Z=this.doc.length){return this.doc.sliceString(I,Z,this.lineBreak)}facet(I){let Z=this.config.address[I.id];if(Z==null)return I.default;return Z3(this,Z),VI(this,Z)}toJSON(I){let Z={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(I)for(let J in I){let Q=I[J];if(Q instanceof R0&&this.config.address[Q.id]!=null)Z[J]=Q.spec.toJSON(this.field(I[J]),this)}return Z}static fromJSON(I,Z={},J){if(!I||typeof I.doc!="string")throw RangeError("Invalid JSON representation for EditorState");let Q=[];if(J){for(let X in J)if(Object.prototype.hasOwnProperty.call(I,X)){let Y=J[X],q=I[X];Q.push(Y.init((K)=>Y.spec.fromJSON(q,K)))}}return L1.create({doc:I.doc,selection:u.fromJSON(I.selection),extensions:Z.extensions?Q.concat([Z.extensions]):Q})}static create(I={}){let Z=zI.resolve(I.extensions||[],new Map),J=I.doc instanceof M1?I.doc:M1.of((I.doc||"").split(Z.staticFacet(L1.lineSeparator)||fQ)),Q=!I.selection?u.single(0):I.selection instanceof u?I.selection:u.single(I.selection.anchor,I.selection.head);if(o2(Q,J.length),!Z.staticFacet(vQ))Q=Q.asSingle();return new L1(Z,J,Q,Z.dynamicSlots.map(()=>null),(X,Y)=>Y.create(X),null)}get tabSize(){return this.facet(L1.tabSize)}get lineBreak(){return this.facet(L1.lineSeparator)||`
`}get readOnly(){return this.facet(XU)}phrase(I,...Z){for(let J of this.facet(L1.phrases))if(Object.prototype.hasOwnProperty.call(J,I)){I=J[I];break}if(Z.length)I=I.replace(/\$(\$|\d*)/g,(J,Q)=>{if(Q=="$")return"$";let X=+(Q||1);return!X||X>Z.length?J:Z[X-1]});return I}languageDataAt(I,Z,J=-1){let Q=[];for(let X of this.facet(e2))for(let Y of X(this,Z,J))if(Object.prototype.hasOwnProperty.call(Y,I))Q.push(Y[I]);return Q}charCategorizer(I){let Z=this.languageDataAt("wordChars",I);return DR(Z.length?Z[0]:"")}wordAt(I){let{text:Z,from:J,length:Q}=this.doc.lineAt(I),X=this.charCategorizer(I),Y=I-J,q=I-J;while(Y>0){let K=q0(Z,Y,!1);if(X(Z.slice(K,Y))!=D4.Word)break;Y=K}while(q<Q){let K=q0(Z,q);if(X(Z.slice(q,K))!=D4.Word)break;q=K}return Y==q?null:u.range(Y+J,q+J)}}L1.allowMultipleSelections=vQ;L1.tabSize=t.define({combine:(I)=>I.length?I[0]:4});L1.lineSeparator=IU;L1.readOnly=XU;L1.phrases=t.define({compare(I,Z){let J=Object.keys(I),Q=Object.keys(Z);return J.length==Q.length&&J.every((X)=>I[X]==Z[X])}});L1.languageData=e2;L1.changeFilter=ZU;L1.transactionFilter=JU;L1.transactionExtender=QU;u5.reconfigure=B1.define();function A6(I,Z,J={}){let Q={};for(let X of I)for(let Y of Object.keys(X)){let q=X[Y],K=Q[Y];if(K===void 0)Q[Y]=q;else if(K===q||q===void 0);else if(Object.hasOwnProperty.call(J,Y))Q[Y]=J[Y](K,q);else throw Error("Config merge conflict for field "+Y)}for(let X in Z)if(Q[X]===void 0)Q[X]=Z[X];return Q}class N6{eq(I){return this==I}range(I,Z=I){return J3.create(I,Z,this)}}N6.prototype.startSide=N6.prototype.endSide=0;N6.prototype.point=!1;N6.prototype.mapMode=_0.TrackDel;function oQ(I,Z){return I==Z||I.constructor==Z.constructor&&I.eq(Z)}class J3{constructor(I,Z,J){this.from=I,this.to=Z,this.value=J}static create(I,Z,J){return new J3(I,Z,J)}}function sQ(I,Z){return I.from-Z.from||I.value.startSide-Z.value.startSide}class eQ{constructor(I,Z,J,Q){this.from=I,this.to=Z,this.value=J,this.maxPoint=Q}get length(){return this.to[this.to.length-1]}findIndex(I,Z,J,Q=0){let X=J?this.to:this.from;for(let Y=Q,q=X.length;;){if(Y==q)return Y;let K=Y+q>>1,W=X[K]-I||(J?this.value[K].endSide:this.value[K].startSide)-Z;if(K==Y)return W>=0?Y:q;if(W>=0)q=K;else Y=K+1}}between(I,Z,J,Q){for(let X=this.findIndex(Z,-1e9,!0),Y=this.findIndex(J,1e9,!1,X);X<Y;X++)if(Q(this.from[X]+I,this.to[X]+I,this.value[X])===!1)return!1}map(I,Z){let J=[],Q=[],X=[],Y=-1,q=-1;for(let K=0;K<this.value.length;K++){let W=this.value[K],G=this.from[K]+I,U=this.to[K]+I,z,j;if(G==U){let O=Z.mapPos(G,W.startSide,W.mapMode);if(O==null)continue;if(z=j=O,W.startSide!=W.endSide){if(j=Z.mapPos(G,W.endSide),j<z)continue}}else if(z=Z.mapPos(G,W.startSide),j=Z.mapPos(U,W.endSide),z>j||z==j&&W.startSide>0&&W.endSide<=0)continue;if((j-z||W.endSide-W.startSide)<0)continue;if(Y<0)Y=z;if(W.point)q=Math.max(q,j-z);J.push(W),Q.push(z-Y),X.push(j-Y)}return{mapped:J.length?new eQ(Q,X,J,q):null,pos:Y}}}class R1{constructor(I,Z,J,Q){this.chunkPos=I,this.chunk=Z,this.nextLayer=J,this.maxPoint=Q}static create(I,Z,J,Q){return new R1(I,Z,J,Q)}get length(){let I=this.chunk.length-1;return I<0?0:Math.max(this.chunkEnd(I),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let I=this.nextLayer.size;for(let Z of this.chunk)I+=Z.value.length;return I}chunkEnd(I){return this.chunkPos[I]+this.chunk[I].length}update(I){let{add:Z=[],sort:J=!1,filterFrom:Q=0,filterTo:X=this.length}=I,Y=I.filter;if(Z.length==0&&!Y)return this;if(J)Z=Z.slice().sort(sQ);if(this.isEmpty)return Z.length?R1.of(Z):this;let q=new IX(this,null,-1).goto(0),K=0,W=[],G=new R6;while(q.value||K<Z.length)if(K<Z.length&&(q.from-Z[K].from||q.startSide-Z[K].value.startSide)>=0){let U=Z[K++];if(!G.addInner(U.from,U.to,U.value))W.push(U)}else if(q.rangeIndex==1&&q.chunkIndex<this.chunk.length&&(K==Z.length||this.chunkEnd(q.chunkIndex)<Z[K].from)&&(!Y||Q>this.chunkEnd(q.chunkIndex)||X<this.chunkPos[q.chunkIndex])&&G.addChunk(this.chunkPos[q.chunkIndex],this.chunk[q.chunkIndex]))q.nextChunk();else{if(!Y||Q>q.to||X<q.from||Y(q.from,q.to,q.value)){if(!G.addInner(q.from,q.to,q.value))W.push(J3.create(q.from,q.to,q.value))}q.next()}return G.finishInner(this.nextLayer.isEmpty&&!W.length?R1.empty:this.nextLayer.update({add:W,filter:Y,filterFrom:Q,filterTo:X}))}map(I){if(I.empty||this.isEmpty)return this;let Z=[],J=[],Q=-1;for(let Y=0;Y<this.chunk.length;Y++){let q=this.chunkPos[Y],K=this.chunk[Y],W=I.touchesRange(q,q+K.length);if(W===!1)Q=Math.max(Q,K.maxPoint),Z.push(K),J.push(I.mapPos(q));else if(W===!0){let{mapped:G,pos:U}=K.map(q,I);if(G)Q=Math.max(Q,G.maxPoint),Z.push(G),J.push(U)}}let X=this.nextLayer.map(I);return Z.length==0?X:new R1(J,Z,X||R1.empty,Q)}between(I,Z,J){if(this.isEmpty)return;for(let Q=0;Q<this.chunk.length;Q++){let X=this.chunkPos[Q],Y=this.chunk[Q];if(Z>=X&&I<=X+Y.length&&Y.between(X,I-X,Z-X,J)===!1)return}this.nextLayer.between(I,Z,J)}iter(I=0){return Q3.from([this]).goto(I)}get isEmpty(){return this.nextLayer==this}static iter(I,Z=0){return Q3.from(I).goto(Z)}static compare(I,Z,J,Q,X=-1){let Y=I.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=X),q=Z.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=X),K=s2(Y,q,J),W=new E8(Y,K,X),G=new E8(q,K,X);if(J.iterGaps((U,z,j)=>d2(W,U,G,z,j,Q)),J.empty&&J.length==0)d2(W,0,G,0,0,Q)}static eq(I,Z,J=0,Q){if(Q==null)Q=999999999;let X=I.filter((G)=>!G.isEmpty&&Z.indexOf(G)<0),Y=Z.filter((G)=>!G.isEmpty&&I.indexOf(G)<0);if(X.length!=Y.length)return!1;if(!X.length)return!0;let q=s2(X,Y),K=new E8(X,q,0).goto(J),W=new E8(Y,q,0).goto(J);for(;;){if(K.to!=W.to||!dQ(K.active,W.active)||K.point&&(!W.point||!oQ(K.point,W.point)))return!1;if(K.to>Q)return!0;K.next(),W.next()}}static spans(I,Z,J,Q,X=-1){let Y=new E8(I,null,X).goto(Z),q=Z,K=Y.openStart;for(;;){let W=Math.min(Y.to,J);if(Y.point){let G=Y.activeForPoint(Y.to),U=Y.pointFrom<Z?G.length+1:Y.point.startSide<0?G.length:Math.min(G.length,K);Q.point(q,W,Y.point,G,U,Y.pointRank),K=Math.min(Y.openEnd(W),G.length)}else if(W>q)Q.span(q,W,Y.active,K),K=Y.openEnd(W);if(Y.to>J)return K+(Y.point&&Y.to>J?1:0);q=Y.to,Y.next()}}static of(I,Z=!1){let J=new R6;for(let Q of I instanceof J3?[I]:Z?LR(I):I)J.add(Q.from,Q.to,Q.value);return J.finish()}static join(I){if(!I.length)return R1.empty;let Z=I[I.length-1];for(let J=I.length-2;J>=0;J--)for(let Q=I[J];Q!=R1.empty;Q=Q.nextLayer)Z=new R1(Q.chunkPos,Q.chunk,Z,Math.max(Q.maxPoint,Z.maxPoint));return Z}}R1.empty=new R1([],[],null,-1);function LR(I){if(I.length>1)for(let Z=I[0],J=1;J<I.length;J++){let Q=I[J];if(sQ(Z,Q)>0)return I.slice().sort(sQ);Z=Q}return I}R1.empty.nextLayer=R1.empty;class R6{finishChunk(I){if(this.chunks.push(new eQ(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,I)this.from=[],this.to=[],this.value=[]}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(I,Z,J){if(!this.addInner(I,Z,J))(this.nextLayer||(this.nextLayer=new R6)).add(I,Z,J)}addInner(I,Z,J){let Q=I-this.lastTo||J.startSide-this.last.endSide;if(Q<=0&&(I-this.lastFrom||J.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");if(Q<0)return!1;if(this.from.length==250)this.finishChunk(!0);if(this.chunkStart<0)this.chunkStart=I;if(this.from.push(I-this.chunkStart),this.to.push(Z-this.chunkStart),this.last=J,this.lastFrom=I,this.lastTo=Z,this.value.push(J),J.point)this.maxPoint=Math.max(this.maxPoint,Z-I);return!0}addChunk(I,Z){if((I-this.lastTo||Z.value[0].startSide-this.last.endSide)<0)return!1;if(this.from.length)this.finishChunk(!0);this.setMaxPoint=Math.max(this.setMaxPoint,Z.maxPoint),this.chunks.push(Z),this.chunkPos.push(I);let J=Z.value.length-1;return this.last=Z.value[J],this.lastFrom=Z.from[J]+I,this.lastTo=Z.to[J]+I,!0}finish(){return this.finishInner(R1.empty)}finishInner(I){if(this.from.length)this.finishChunk(!1);if(this.chunks.length==0)return I;let Z=R1.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(I):I,this.setMaxPoint);return this.from=null,Z}}function s2(I,Z,J){let Q=new Map;for(let Y of I)for(let q=0;q<Y.chunk.length;q++)if(Y.chunk[q].maxPoint<=0)Q.set(Y.chunk[q],Y.chunkPos[q]);let X=new Set;for(let Y of Z)for(let q=0;q<Y.chunk.length;q++){let K=Q.get(Y.chunk[q]);if(K!=null&&(J?J.mapPos(K):K)==Y.chunkPos[q]&&!(J===null||J===void 0?void 0:J.touchesRange(K,K+Y.chunk[q].length)))X.add(Y.chunk[q])}return X}class IX{constructor(I,Z,J,Q=0){this.layer=I,this.skip=Z,this.minPoint=J,this.rank=Q}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(I,Z=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(I,Z,!1),this}gotoInner(I,Z,J){while(this.chunkIndex<this.layer.chunk.length){let Q=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(Q)||this.layer.chunkEnd(this.chunkIndex)<I||Q.maxPoint<this.minPoint))break;this.chunkIndex++,J=!1}if(this.chunkIndex<this.layer.chunk.length){let Q=this.layer.chunk[this.chunkIndex].findIndex(I-this.layer.chunkPos[this.chunkIndex],Z,!0);if(!J||this.rangeIndex<Q)this.setRangeIndex(Q)}this.next()}forward(I,Z){if((this.to-I||this.endSide-Z)<0)this.gotoInner(I,Z,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let I=this.layer.chunkPos[this.chunkIndex],Z=this.layer.chunk[this.chunkIndex],J=I+Z.from[this.rangeIndex];if(this.from=J,this.to=I+Z.to[this.rangeIndex],this.value=Z.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(I){if(I==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)while(this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]))this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=I}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(I){return this.from-I.from||this.startSide-I.startSide||this.rank-I.rank||this.to-I.to||this.endSide-I.endSide}}class Q3{constructor(I){this.heap=I}static from(I,Z=null,J=-1){let Q=[];for(let X=0;X<I.length;X++)for(let Y=I[X];!Y.isEmpty;Y=Y.nextLayer)if(Y.maxPoint>=J)Q.push(new IX(Y,Z,J,X));return Q.length==1?Q[0]:new Q3(Q)}get startSide(){return this.value?this.value.startSide:0}goto(I,Z=-1e9){for(let J of this.heap)J.goto(I,Z);for(let J=this.heap.length>>1;J>=0;J--)gQ(this.heap,J);return this.next(),this}forward(I,Z){for(let J of this.heap)J.forward(I,Z);for(let J=this.heap.length>>1;J>=0;J--)gQ(this.heap,J);if((this.to-I||this.value.endSide-Z)<0)this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let I=this.heap[0];if(this.from=I.from,this.to=I.to,this.value=I.value,this.rank=I.rank,I.value)I.next();gQ(this.heap,0)}}}function gQ(I,Z){for(let J=I[Z];;){let Q=(Z<<1)+1;if(Q>=I.length)break;let X=I[Q];if(Q+1<I.length&&X.compare(I[Q+1])>=0)X=I[Q+1],Q++;if(J.compare(X)<0)break;I[Q]=J,I[Z]=X,Z=Q}}class E8{constructor(I,Z,J){this.minPoint=J,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=Q3.from(I,Z,J)}goto(I,Z=-1e9){return this.cursor.goto(I,Z),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=I,this.endSide=Z,this.openStart=-1,this.next(),this}forward(I,Z){while(this.minActive>-1&&(this.activeTo[this.minActive]-I||this.active[this.minActive].endSide-Z)<0)this.removeActive(this.minActive);this.cursor.forward(I,Z)}removeActive(I){KI(this.active,I),KI(this.activeTo,I),KI(this.activeRank,I),this.minActive=i2(this.active,this.activeTo)}addActive(I){let Z=0,{value:J,to:Q,rank:X}=this.cursor;while(Z<this.activeRank.length&&(X-this.activeRank[Z]||Q-this.activeTo[Z])>0)Z++;if(WI(this.active,Z,J),WI(this.activeTo,Z,Q),WI(this.activeRank,Z,X),I)WI(I,Z,this.cursor.from);this.minActive=i2(this.active,this.activeTo)}next(){let I=this.to,Z=this.point;this.point=null;let J=this.openStart<0?[]:null;for(;;){let Q=this.minActive;if(Q>-1&&(this.activeTo[Q]-this.cursor.from||this.active[Q].endSide-this.cursor.startSide)<0){if(this.activeTo[Q]>I){this.to=this.activeTo[Q],this.endSide=this.active[Q].endSide;break}if(this.removeActive(Q),J)KI(J,Q)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>I){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let X=this.cursor.value;if(!X.point)this.addActive(J),this.cursor.next();else if(Z&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=X,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=X.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(J){this.openStart=0;for(let Q=J.length-1;Q>=0&&J[Q]<I;Q--)this.openStart++}}activeForPoint(I){if(!this.active.length)return this.active;let Z=[];for(let J=this.active.length-1;J>=0;J--){if(this.activeRank[J]<this.pointRank)break;if(this.activeTo[J]>I||this.activeTo[J]==I&&this.active[J].endSide>=this.point.endSide)Z.push(this.active[J])}return Z.reverse()}openEnd(I){let Z=0;for(let J=this.activeTo.length-1;J>=0&&this.activeTo[J]>I;J--)Z++;return Z}}function d2(I,Z,J,Q,X,Y){I.goto(Z),J.goto(Q);let q=Q+X,K=Q,W=Q-Z,G=!!Y.boundChange;for(let U=!1;;){let z=I.to+W-J.to,j=z||I.endSide-J.endSide,O=j<0?I.to+W:J.to,H=Math.min(O,q);if(I.point||J.point){if(!(I.point&&J.point&&oQ(I.point,J.point)&&dQ(I.activeForPoint(I.to),J.activeForPoint(J.to))))Y.comparePoint(K,H,I.point,J.point);U=!1}else{if(U)Y.boundChange(K);if(H>K&&!dQ(I.active,J.active))Y.compareRange(K,H,I.active,J.active);if(G&&H<q&&(z||I.openEnd(O)!=J.openEnd(O)))U=!0}if(O>q)break;if(K=O,j<=0)I.next();if(j>=0)J.next()}}function dQ(I,Z){if(I.length!=Z.length)return!1;for(let J=0;J<I.length;J++)if(I[J]!=Z[J]&&!oQ(I[J],Z[J]))return!1;return!0}function KI(I,Z){for(let J=Z,Q=I.length-1;J<Q;J++)I[J]=I[J+1];I.pop()}function WI(I,Z,J){for(let Q=I.length-1;Q>=Z;Q--)I[Q+1]=I[Q];I[Z]=J}function i2(I,Z){let J=-1,Q=1e9;for(let X=0;X<Z.length;X++)if((Z[X]-Q||I[X].endSide-I[J].endSide)<0)J=X,Q=Z[X];return J}function $5(I,Z,J=I.length){let Q=0;for(let X=0;X<J&&X<I.length;)if(I.charCodeAt(X)==9)Q+=Z-Q%Z,X++;else Q++,X=q0(I,X);return Q}function GU(I,Z,J,Q){for(let X=0,Y=0;;){if(Y>=Z)return X;if(X==I.length)break;Y+=I.charCodeAt(X)==9?J-Y%J:1,X=q0(I,X)}return Q===!0?-1:I.length}var UU=typeof Symbol>"u"?"__"+"ͼ":Symbol.for("ͼ"),ZX=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),zU=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class P4{constructor(I,Z){this.rules=[];let{finish:J}=Z||{};function Q(Y){return/^@/.test(Y)?[Y]:Y.split(/,\s*/)}function X(Y,q,K,W){let G=[],U=/^@(\w+)\b/.exec(Y[0]),z=U&&U[1]=="keyframes";if(U&&q==null)return K.push(Y[0]+";");for(let j in q){let O=q[j];if(/&/.test(j))X(j.split(/,\s*/).map((H)=>Y.map((N)=>H.replace(/&/,N))).reduce((H,N)=>H.concat(N)),O,K);else if(O&&typeof O=="object"){if(!U)throw RangeError("The value of a property ("+j+") should be a primitive value.");X(Q(j),O,G,z)}else if(O!=null)G.push(j.replace(/_.*/,"").replace(/[A-Z]/g,(H)=>"-"+H.toLowerCase())+": "+O+";")}if(G.length||z)K.push((J&&!U&&!W?Y.map(J):Y).join(", ")+" {"+G.join(" ")+"}")}for(let Y in I)X(Q(Y),I[Y],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let I=zU[UU]||1;return zU[UU]=I+1,"ͼ"+I.toString(36)}static mount(I,Z,J){let Q=I[ZX],X=J&&J.nonce;if(!Q)Q=new jU(I,X);else if(X)Q.setNonce(X);Q.mount(Array.isArray(Z)?Z:[Z],I)}}var VU=new Map;class jU{constructor(I,Z){let J=I.ownerDocument||I,Q=J.defaultView;if(!I.head&&I.adoptedStyleSheets&&Q.CSSStyleSheet){let X=VU.get(J);if(X)return I[ZX]=X;this.sheet=new Q.CSSStyleSheet,VU.set(J,this)}else if(this.styleTag=J.createElement("style"),Z)this.styleTag.setAttribute("nonce",Z);this.modules=[],I[ZX]=this}mount(I,Z){let J=this.sheet,Q=0,X=0;for(let Y=0;Y<I.length;Y++){let q=I[Y],K=this.modules.indexOf(q);if(K<X&&K>-1)this.modules.splice(K,1),X--,K=-1;if(K==-1){if(this.modules.splice(X++,0,q),J)for(let W=0;W<q.rules.length;W++)J.insertRule(q.rules[W],Q++)}else{while(X<K)Q+=this.modules[X++].rules.length;Q+=q.rules.length,X++}}if(J){if(Z.adoptedStyleSheets.indexOf(this.sheet)<0)Z.adoptedStyleSheets=[this.sheet,...Z.adoptedStyleSheets]}else{let Y="";for(let K=0;K<this.modules.length;K++)Y+=this.modules[K].getRules()+`
`;this.styleTag.textContent=Y;let q=Z.head||Z;if(this.styleTag.parentNode!=q)q.insertBefore(this.styleTag,q.firstChild)}}setNonce(I){if(this.styleTag&&this.styleTag.getAttribute("nonce")!=I)this.styleTag.setAttribute("nonce",I)}}var D6={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},b8={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},BR=typeof navigator<"u"&&/Mac/.test(navigator.platform),PR=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(c1=0;c1<10;c1++)D6[48+c1]=D6[96+c1]=String(c1);var c1;for(c1=1;c1<=24;c1++)D6[c1+111]="F"+c1;var c1;for(c1=65;c1<=90;c1++)D6[c1]=String.fromCharCode(c1+32),b8[c1]=String.fromCharCode(c1);var c1;for(X3 in D6)if(!b8.hasOwnProperty(X3))b8[X3]=D6[X3];var X3;function OU(I){var Z=BR&&I.metaKey&&I.shiftKey&&!I.ctrlKey&&!I.altKey||PR&&I.shiftKey&&I.key&&I.key.length==1||I.key=="Unidentified",J=!Z&&I.key||(I.shiftKey?b8:D6)[I.keyCode]||I.key||"Unidentified";if(J=="Esc")J="Escape";if(J=="Del")J="Delete";if(J=="Left")J="ArrowLeft";if(J=="Up")J="ArrowUp";if(J=="Right")J="ArrowRight";if(J=="Down")J="ArrowDown";return J}function p0(){var I=arguments[0];if(typeof I=="string")I=document.createElement(I);var Z=1,J=arguments[1];if(J&&typeof J=="object"&&J.nodeType==null&&!Array.isArray(J)){for(var Q in J)if(Object.prototype.hasOwnProperty.call(J,Q)){var X=J[Q];if(typeof X=="string")I.setAttribute(Q,X);else if(X!=null)I[Q]=X}Z++}for(;Z<arguments.length;Z++)FU(I,arguments[Z]);return I}function FU(I,Z){if(typeof Z=="string")I.appendChild(document.createTextNode(Z));else if(Z==null);else if(Z.nodeType!=null)I.appendChild(Z);else if(Array.isArray(Z))for(var J=0;J<Z.length;J++)FU(I,Z[J]);else throw RangeError("Unsupported child node: "+Z)}var T0=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},UX=typeof document<"u"?document:{documentElement:{style:{}}},zX=/Edge\/(\d+)/.exec(T0.userAgent),tU=/MSIE \d/.test(T0.userAgent),VX=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(T0.userAgent),uI=!!(tU||VX||zX),HU=!uI&&/gecko\/(\d+)/i.test(T0.userAgent),JX=!uI&&/Chrome\/(\d+)/.exec(T0.userAgent),NU="webkitFontSmoothing"in UX.documentElement.style,jX=!uI&&/Apple Computer/.test(T0.vendor),RU=jX&&(/Mobile\/\w+/.test(T0.userAgent)||T0.maxTouchPoints>2),r={mac:RU||/Mac/.test(T0.platform),windows:/Win/.test(T0.platform),linux:/Linux|X11/.test(T0.platform),ie:uI,ie_version:tU?UX.documentMode||6:VX?+VX[1]:zX?+zX[1]:0,gecko:HU,gecko_version:HU?+(/Firefox\/(\d+)/.exec(T0.userAgent)||[0,0])[1]:0,chrome:!!JX,chrome_version:JX?+JX[1]:0,ios:RU,android:/Android\b/.test(T0.userAgent),webkit:NU,webkit_version:NU?+(/\bAppleWebKit\/(\d+)/.exec(T0.userAgent)||[0,0])[1]:0,safari:jX,safari_version:jX?+(/\bVersion\/(\d+(\.\d+)?)/.exec(T0.userAgent)||[0,0])[1]:0,tabSize:UX.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function bX(I,Z){for(let J in I)if(J=="class"&&Z.class)Z.class+=" "+I.class;else if(J=="style"&&Z.style)Z.style+=";"+I.style;else Z[J]=I[J];return Z}var CI=Object.create(null);function yX(I,Z,J){if(I==Z)return!0;if(!I)I=CI;if(!Z)Z=CI;let Q=Object.keys(I),X=Object.keys(Z);if(Q.length-(J&&Q.indexOf(J)>-1?1:0)!=X.length-(J&&X.indexOf(J)>-1?1:0))return!1;for(let Y of Q)if(Y!=J&&(X.indexOf(Y)==-1||I[Y]!==Z[Y]))return!1;return!0}function SR(I,Z){for(let J=I.attributes.length-1;J>=0;J--){let Q=I.attributes[J].name;if(Z[Q]==null)I.removeAttribute(Q)}for(let J in Z){let Q=Z[J];if(J=="style")I.style.cssText=Q;else if(I.getAttribute(J)!=Q)I.setAttribute(J,Q)}}function MU(I,Z,J){let Q=!1;if(Z){for(let X in Z)if(!(J&&(X in J)))if(Q=!0,X=="style")I.style.cssText="";else I.removeAttribute(X)}if(J){for(let X in J)if(!(Z&&Z[X]==J[X]))if(Q=!0,X=="style")I.style.cssText=J[X];else I.setAttribute(X,J[X])}return Q}function _R(I){let Z=Object.create(null);for(let J=0;J<I.attributes.length;J++){let Q=I.attributes[J];Z[Q.name]=Q.value}return Z}class a6{eq(I){return!1}updateDOM(I,Z,J){return!1}compare(I){return this==I||this.constructor==I.constructor&&this.eq(I)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(I){return!0}coordsAt(I,Z,J){return null}get isHidden(){return!1}get editable(){return!1}destroy(I){}}var V0=function(I){return I[I.Text=0]="Text",I[I.WidgetBefore=1]="WidgetBefore",I[I.WidgetAfter=2]="WidgetAfter",I[I.WidgetRange=3]="WidgetRange",I}(V0||(V0={}));class P1 extends N6{constructor(I,Z,J,Q){super();this.startSide=I,this.endSide=Z,this.widget=J,this.spec=Q}get heightRelevant(){return!1}static mark(I){return new H3(I)}static widget(I){let Z=Math.max(-1e4,Math.min(1e4,I.side||0)),J=!!I.block;return Z+=J&&!I.inlineOrder?Z>0?300000000:-400000000:Z>0?1e8:-1e8,new p5(I,Z,Z,J,I.widget||null,!1)}static replace(I){let Z=!!I.block,J,Q;if(I.isBlockGap)J=-500000000,Q=400000000;else{let{start:X,end:Y}=oU(I,Z);J=(X?Z?-300000000:-1:500000000)-1,Q=(Y?Z?200000000:1:-600000000)+1}return new p5(I,J,Q,Z,I.widget||null,!0)}static line(I){return new N3(I)}static set(I,Z=!1){return R1.of(I,Z)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}P1.none=R1.empty;class H3 extends P1{constructor(I){let{start:Z,end:J}=oU(I);super(Z?-1:500000000,J?1:-600000000,null,I);this.tagName=I.tagName||"span",this.attrs=I.class&&I.attributes?bX(I.attributes,{class:I.class}):I.class?{class:I.class}:I.attributes||CI}eq(I){return this==I||I instanceof H3&&this.tagName==I.tagName&&yX(this.attrs,I.attrs)}range(I,Z=I){if(I>=Z)throw RangeError("Mark decorations may not be empty");return super.range(I,Z)}}H3.prototype.point=!1;class N3 extends P1{constructor(I){super(-200000000,-200000000,null,I)}eq(I){return I instanceof N3&&this.spec.class==I.spec.class&&yX(this.spec.attributes,I.spec.attributes)}range(I,Z=I){if(Z!=I)throw RangeError("Line decoration ranges must be zero-length");return super.range(I,Z)}}N3.prototype.mapMode=_0.TrackBefore;N3.prototype.point=!0;class p5 extends P1{constructor(I,Z,J,Q,X,Y){super(Z,J,X,I);this.block=Q,this.isReplace=Y,this.mapMode=!Q?_0.TrackDel:Z<=0?_0.TrackBefore:_0.TrackAfter}get type(){return this.startSide!=this.endSide?V0.WidgetRange:this.startSide<=0?V0.WidgetBefore:V0.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(I){return I instanceof p5&&TR(this.widget,I.widget)&&this.block==I.block&&this.startSide==I.startSide&&this.endSide==I.endSide}range(I,Z=I){if(this.isReplace&&(I>Z||I==Z&&this.startSide>0&&this.endSide<=0))throw RangeError("Invalid range for replacement decoration");if(!this.isReplace&&Z!=I)throw RangeError("Widget decorations can only have zero-length ranges");return super.range(I,Z)}}p5.prototype.point=!0;function oU(I,Z=!1){let{inclusiveStart:J,inclusiveEnd:Q}=I;if(J==null)J=I.inclusive;if(Q==null)Q=I.inclusive;return{start:J!==null&&J!==void 0?J:Z,end:Q!==null&&Q!==void 0?Q:Z}}function TR(I,Z){return I==Z||!!(I&&Z&&I.compare(Z))}function g8(I,Z,J,Q=0){let X=J.length-1;if(X>=0&&J[X]+Q>=I)J[X]=Math.max(J[X],Z);else J.push(I,Z)}class V3 extends N6{constructor(I,Z,J){super();this.tagName=I,this.attributes=Z,this.rank=J}eq(I){return I==this||I instanceof V3&&this.tagName==I.tagName&&yX(this.attributes,I.attributes)}static create(I){return new V3(I.tagName,I.attributes||CI,I.rank==null?50:Math.max(0,Math.min(I.rank,100)))}static set(I,Z=!1){return R1.of(I,Z)}}V3.prototype.startSide=V3.prototype.endSide=-1;function j3(I){let Z;if(I.nodeType==11)Z=I.getSelection?I:I.ownerDocument;else Z=I;return Z.getSelection()}function OX(I,Z){return Z?I==Z||I.contains(Z.nodeType!=1?Z.parentNode:Z):!1}function G3(I,Z){if(!Z.anchorNode)return!1;try{return OX(I,Z.anchorNode)}catch(J){return!1}}function LI(I){if(I.nodeType==3)return O3(I,0,I.nodeValue.length).getClientRects();else if(I.nodeType==1)return I.getClientRects();else return[]}function U3(I,Z,J,Q){return J?AU(I,Z,J,Q,-1)||AU(I,Z,J,Q,1):!1}function r6(I){for(var Z=0;;Z++)if(I=I.previousSibling,!I)return Z}function wI(I){return I.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(I.nodeName)}function AU(I,Z,J,Q,X){for(;;){if(I==J&&Z==Q)return!0;if(Z==(X<0?0:P6(I))){if(I.nodeName=="DIV")return!1;let Y=I.parentNode;if(!Y||Y.nodeType!=1)return!1;Z=r6(I)+(X<0?0:1),I=Y}else if(I.nodeType==1){if(I=I.childNodes[Z+(X<0?-1:0)],I.nodeType==1&&I.contentEditable=="false")return!1;Z=X<0?P6(I):0}else return!1}}function P6(I){return I.nodeType==3?I.nodeValue.length:I.childNodes.length}function kI(I,Z){let{left:J,right:Q}=I;if(J==Q)return I;let X=Z?J:Q;return{left:X,right:X,top:I.top,bottom:I.bottom}}function ER(I){let Z=I.visualViewport;if(Z)return{left:0,right:Z.width,top:0,bottom:Z.height};return{left:0,right:I.innerWidth,top:0,bottom:I.innerHeight}}function eU(I,Z){let J=Z.width/I.offsetWidth,Q=Z.height/I.offsetHeight;if(J>0.995&&J<1.005||!isFinite(J)||Math.abs(Z.width-I.offsetWidth)<1)J=1;if(Q>0.995&&Q<1.005||!isFinite(Q)||Math.abs(Z.height-I.offsetHeight)<1)Q=1;return{scaleX:J,scaleY:Q}}function hR(I,Z,J,Q,X,Y,q,K){let W=I.ownerDocument,G=W.defaultView||window;for(let U=I,z=!1;U&&!z;)if(U.nodeType==1){let j,O=U==W.body,H=1,N=1;if(O)j=ER(G);else{if(/^(fixed|sticky)$/.test(getComputedStyle(U).position))z=!0;if(U.scrollHeight<=U.clientHeight&&U.scrollWidth<=U.clientWidth){U=U.assignedSlot||U.parentNode;continue}let T=U.getBoundingClientRect();({scaleX:H,scaleY:N}=eU(U,T)),j={left:T.left,right:T.left+U.clientWidth*H,top:T.top,bottom:T.top+U.clientHeight*N}}let M=0,_=0;if(X=="nearest"){if(Z.top<j.top+q){if(_=Z.top-(j.top+q),J>0&&Z.bottom>j.bottom+_)_=Z.bottom-j.bottom+q}else if(Z.bottom>j.bottom-q){if(_=Z.bottom-j.bottom+q,J<0&&Z.top-_<j.top)_=Z.top-(j.top+q)}}else{let T=Z.bottom-Z.top,h=j.bottom-j.top;_=(X=="center"&&T<=h?Z.top+T/2-h/2:X=="start"||X=="center"&&J<0?Z.top-q:Z.bottom-h+q)-j.top}if(Q=="nearest"){if(Z.left<j.left+Y){if(M=Z.left-(j.left+Y),J>0&&Z.right>j.right+M)M=Z.right-j.right+Y}else if(Z.right>j.right-Y){if(M=Z.right-j.right+Y,J<0&&Z.left<j.left+M)M=Z.left-(j.left+Y)}}else M=(Q=="center"?Z.left+(Z.right-Z.left)/2-(j.right-j.left)/2:Q=="start"==K?Z.left-Y:Z.right-(j.right-j.left)+Y)-j.left;if(M||_)if(O)G.scrollBy(M,_);else{let T=0,h=0;if(_){let w=U.scrollTop;U.scrollTop+=_/N,h=(U.scrollTop-w)*N}if(M){let w=U.scrollLeft;U.scrollLeft+=M/H,T=(U.scrollLeft-w)*H}if(Z={left:Z.left-T,top:Z.top-h,right:Z.right-T,bottom:Z.bottom-h},T&&Math.abs(T-M)<1)Q="nearest";if(h&&Math.abs(h-_)<1)X="nearest"}if(O)break;if(Z.top<j.top||Z.bottom>j.bottom||Z.left<j.left||Z.right>j.right)Z={left:Math.max(Z.left,j.left),right:Math.min(Z.right,j.right),top:Math.max(Z.top,j.top),bottom:Math.min(Z.bottom,j.bottom)};U=U.assignedSlot||U.parentNode}else if(U.nodeType==11)U=U.host;else break}function Iz(I,Z=!0){let J=I.ownerDocument,Q=null,X=null;for(let Y=I.parentNode;Y;)if(Y==J.body||(!Z||Q)&&X)break;else if(Y.nodeType==1){if(!X&&Y.scrollHeight>Y.clientHeight)X=Y;if(Z&&!Q&&Y.scrollWidth>Y.clientWidth)Q=Y;Y=Y.assignedSlot||Y.parentNode}else if(Y.nodeType==11)Y=Y.host;else break;return{x:Q,y:X}}class Zz{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(I){return this.anchorNode==I.anchorNode&&this.anchorOffset==I.anchorOffset&&this.focusNode==I.focusNode&&this.focusOffset==I.focusOffset}setRange(I){let{anchorNode:Z,focusNode:J}=I;this.set(Z,Math.min(I.anchorOffset,Z?P6(Z):0),J,Math.min(I.focusOffset,J?P6(J):0))}set(I,Z,J,Q){this.anchorNode=I,this.anchorOffset=Z,this.focusNode=J,this.focusOffset=Q}}function Jz(I){let Z=[];for(let J=I;J;J=J.nodeType==11?J.host:J.parentNode)if(J.nodeType==1)Z.push({node:J,left:J.scrollLeft,top:J.scrollTop});return Z}function Qz(I,Z=!0){for(let{node:J,left:Q,top:X}of I){if(Z&&J.scrollTop!=X)J.scrollTop=X;if(J.scrollLeft!=Q)J.scrollLeft=Q}}var m5=null;if(r.safari&&r.safari_version>=26)m5=!1;function Xz(I){if(I.setActive)return I.setActive();if(m5)return I.focus(m5);let Z=Jz(I);if(I.focus(m5==null?{get preventScroll(){return m5={preventScroll:!0},!0}}:void 0),!m5)m5=!1,Qz(Z)}var DU;function O3(I,Z,J=Z){let Q=DU||(DU=document.createRange());return Q.setEnd(I,J),Q.setStart(I,Z),Q}function f8(I,Z,J,Q){let X={key:Z,code:Z,keyCode:J,which:J,cancelable:!0};if(Q)({altKey:X.altKey,ctrlKey:X.ctrlKey,shiftKey:X.shiftKey,metaKey:X.metaKey}=Q);let Y=new KeyboardEvent("keydown",X);Y.synthetic=!0,I.dispatchEvent(Y);let q=new KeyboardEvent("keyup",X);return q.synthetic=!0,I.dispatchEvent(q),Y.defaultPrevented||q.defaultPrevented}function CR(I){while(I){if(I&&(I.nodeType==9||I.nodeType==11&&I.host))return I;I=I.assignedSlot||I.parentNode}return null}function wR(I,Z){let{focusNode:J,focusOffset:Q}=Z;if(!J||Z.anchorNode!=J||Z.anchorOffset!=Q)return!1;Q=Math.min(Q,P6(J));for(;;)if(Q){if(J.nodeType!=1)return!1;let X=J.childNodes[Q-1];if(X.contentEditable=="false")Q--;else J=X,Q=P6(J)}else if(J==I)return!0;else Q=r6(J),J=J.parentNode}function Yz(I){if(I instanceof Window)return I.pageYOffset>Math.max(0,I.document.documentElement.scrollHeight-I.innerHeight-4);return I.scrollTop>Math.max(1,I.scrollHeight-I.clientHeight-4)}function qz(I,Z){for(let J=I,Q=Z;;)if(J.nodeType==3&&Q>0)return{node:J,offset:Q};else if(J.nodeType==1&&Q>0){if(J.contentEditable=="false")return null;J=J.childNodes[Q-1],Q=P6(J)}else if(J.parentNode&&!wI(J))Q=r6(J),J=J.parentNode;else return null}function Kz(I,Z){for(let J=I,Q=Z;;)if(J.nodeType==3&&Q<J.nodeValue.length)return{node:J,offset:Q};else if(J.nodeType==1&&Q<J.childNodes.length){if(J.contentEditable=="false")return null;J=J.childNodes[Q],Q=0}else if(J.parentNode&&!wI(J))Q=r6(J)+1,J=J.parentNode;else return null}class T4{constructor(I,Z,J=!0){this.node=I,this.offset=Z,this.precise=J}static before(I,Z){return new T4(I.parentNode,r6(I),Z)}static after(I,Z){return new T4(I.parentNode,r6(I)+1,Z)}}var w1=function(I){return I[I.LTR=0]="LTR",I[I.RTL=1]="RTL",I}(w1||(w1={})),s5=w1.LTR,xX=w1.RTL;function Wz(I){let Z=[];for(let J=0;J<I.length;J++)Z.push(1<<+I[J]);return Z}var kR=Wz("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),bR=Wz("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),FX=Object.create(null),i4=[];for(let I of["()","[]","{}"]){let Z=I.charCodeAt(0),J=I.charCodeAt(1);FX[Z]=J,FX[J]=-Z}function Gz(I){return I<=247?kR[I]:1424<=I&&I<=1524?2:1536<=I&&I<=1785?bR[I-1536]:1774<=I&&I<=2220?4:8192<=I&&I<=8204?256:64336<=I&&I<=65023?4:1}var yR=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class E4{get dir(){return this.level%2?xX:s5}constructor(I,Z,J){this.from=I,this.to=Z,this.level=J}side(I,Z){return this.dir==Z==I?this.to:this.from}forward(I,Z){return I==(this.dir==Z)}static find(I,Z,J,Q){let X=-1;for(let Y=0;Y<I.length;Y++){let q=I[Y];if(q.from<=Z&&q.to>=Z){if(q.level==J)return Y;if(X<0||(Q!=0?Q<0?q.from<Z:q.to>Z:I[X].level>q.level))X=Y}}if(X<0)throw RangeError("Index out of range");return X}}function Uz(I,Z){if(I.length!=Z.length)return!1;for(let J=0;J<I.length;J++){let Q=I[J],X=Z[J];if(Q.from!=X.from||Q.to!=X.to||Q.direction!=X.direction||!Uz(Q.inner,X.inner))return!1}return!0}var b1=[];function xR(I,Z,J,Q,X){for(let Y=0;Y<=Q.length;Y++){let q=Y?Q[Y-1].to:Z,K=Y<Q.length?Q[Y].from:J,W=Y?256:X;for(let G=q,U=W,z=W;G<K;G++){let j=Gz(I.charCodeAt(G));if(j==512)j=U;else if(j==8&&z==4)j=16;if(b1[G]=j==4?2:j,j&7)z=j;U=j}for(let G=q,U=W,z=W;G<K;G++){let j=b1[G];if(j==128)if(G<K-1&&U==b1[G+1]&&U&24)j=b1[G]=U;else b1[G]=256;else if(j==64){let O=G+1;while(O<K&&b1[O]==64)O++;let H=G&&U==8||O<J&&b1[O]==8?z==1?1:8:256;for(let N=G;N<O;N++)b1[N]=H;G=O-1}else if(j==8&&z==1)b1[G]=1;if(U=j,j&7)z=j}}}function nR(I,Z,J,Q,X){let Y=X==1?2:1;for(let q=0,K=0,W=0;q<=Q.length;q++){let G=q?Q[q-1].to:Z,U=q<Q.length?Q[q].from:J;for(let z=G,j,O,H;z<U;z++)if(O=FX[j=I.charCodeAt(z)])if(O<0){for(let N=K-3;N>=0;N-=3)if(i4[N+1]==-O){let M=i4[N+2],_=M&2?X:!(M&4)?0:M&1?Y:X;if(_)b1[z]=b1[i4[N]]=_;K=N;break}}else if(i4.length==189)break;else i4[K++]=z,i4[K++]=j,i4[K++]=W;else if((H=b1[z])==2||H==1){let N=H==X;W=N?0:1;for(let M=K-3;M>=0;M-=3){let _=i4[M+2];if(_&2)break;if(N)i4[M+2]|=2;else{if(_&4)break;i4[M+2]|=4}}}}}function gR(I,Z,J,Q){for(let X=0,Y=Q;X<=J.length;X++){let q=X?J[X-1].to:I,K=X<J.length?J[X].from:Z;for(let W=q;W<K;){let G=b1[W];if(G==256){let U=W+1;for(;;)if(U==K){if(X==J.length)break;U=J[X++].to,K=X<J.length?J[X].from:Z}else if(b1[U]==256)U++;else break;let z=Y==1,j=(U<Z?b1[U]:Q)==1,O=z==j?z?1:2:Q;for(let H=U,N=X,M=N?J[N-1].to:I;H>W;){if(H==M)H=J[--N].from,M=N?J[N-1].to:I;b1[--H]=O}W=U}else Y=G,W++}}}function HX(I,Z,J,Q,X,Y,q){let K=Q%2?2:1;if(Q%2==X%2)for(let W=Z,G=0;W<J;){let U=!0,z=!1;if(G==Y.length||W<Y[G].from){let N=b1[W];if(N!=K)U=!1,z=N==16}let j=!U&&K==1?[]:null,O=U?Q:Q+1,H=W;I:for(;;)if(G<Y.length&&H==Y[G].from){if(z)break I;let N=Y[G];if(!U)for(let M=N.to,_=G+1;;){if(M==J)break I;if(_<Y.length&&Y[_].from==M)M=Y[_++].to;else if(b1[M]==K)break I;else break}if(G++,j)j.push(N);else{if(N.from>W)q.push(new E4(W,N.from,O));let M=N.direction==s5!=!(O%2);NX(I,M?Q+1:Q,X,N.inner,N.from,N.to,q),W=N.to}H=N.to}else if(H==J||(U?b1[H]!=K:b1[H]==K))break;else H++;if(j)HX(I,W,H,Q+1,X,j,q);else if(W<H)q.push(new E4(W,H,O));W=H}else for(let W=J,G=Y.length;W>Z;){let U=!0,z=!1;if(!G||W>Y[G-1].to){let N=b1[W-1];if(N!=K)U=!1,z=N==16}let j=!U&&K==1?[]:null,O=U?Q:Q+1,H=W;I:for(;;)if(G&&H==Y[G-1].to){if(z)break I;let N=Y[--G];if(!U)for(let M=N.from,_=G;;){if(M==Z)break I;if(_&&Y[_-1].to==M)M=Y[--_].from;else if(b1[M-1]==K)break I;else break}if(j)j.push(N);else{if(N.to<W)q.push(new E4(N.to,W,O));let M=N.direction==s5!=!(O%2);NX(I,M?Q+1:Q,X,N.inner,N.from,N.to,q),W=N.from}H=N.from}else if(H==Z||(U?b1[H-1]!=K:b1[H-1]==K))break;else H--;if(j)HX(I,H,W,Q+1,X,j,q);else if(H<W)q.push(new E4(H,W,O));W=H}}function NX(I,Z,J,Q,X,Y,q){let K=Z%2?2:1;xR(I,X,Y,Q,K),nR(I,X,Y,Q,K),gR(X,Y,Q,K),HX(I,X,Y,Z,J,Q,q)}function fR(I,Z,J){if(!I)return[new E4(0,0,Z==xX?1:0)];if(Z==s5&&!J.length&&!yR.test(I))return zz(I.length);if(J.length)while(I.length>b1.length)b1[b1.length]=256;let Q=[],X=Z==s5?0:1;return NX(I,X,X,J,0,I.length,Q),Q}function zz(I){return[new E4(0,I,0)]}var Vz="";function uR(I,Z,J,Q,X){var Y;let q=Q.head-I.from,K=E4.find(Z,q,(Y=Q.bidiLevel)!==null&&Y!==void 0?Y:-1,Q.assoc),W=Z[K],G=W.side(X,J);if(q==G){let j=K+=X?1:-1;if(j<0||j>=Z.length)return null;W=Z[K=j],q=W.side(!X,J),G=W.side(X,J)}let U=q0(I.text,q,W.forward(X,J));if(U<W.from||U>W.to)U=G;Vz=I.text.slice(Math.min(q,U),Math.max(q,U));let z=K==(X?Z.length-1:0)?null:Z[K+(X?1:-1)];if(z&&U==G&&z.level+(X?0:1)<W.level)return u.cursor(z.side(!X,J)+I.from,z.forward(X,J)?1:-1,z.level);return u.cursor(U+I.from,W.forward(X,J)?-1:1,W.level)}function $R(I,Z,J){for(let Q=Z;Q<J;Q++){let X=Gz(I.charCodeAt(Q));if(X==1)return s5;if(X==2||X==4)return xX}return s5}var jz=t.define(),Oz=t.define(),Fz=t.define(),Hz=t.define(),RX=t.define(),Nz=t.define(),Rz=t.define(),nX=t.define(),gX=t.define(),Mz=t.define({combine:(I)=>I.some((Z)=>Z)}),Az=t.define({combine:(I)=>I.some((Z)=>Z)}),Dz=t.define();class u8{constructor(I,Z,J,Q,X,Y=!1){this.range=I,this.y=Z,this.x=J,this.yMargin=Q,this.xMargin=X,this.isSnapshot=Y}map(I){return I.empty?this:new u8(this.range.map(I),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(I){return this.range.to<=I.doc.length?this:new u8(u.cursor(I.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}var jI=B1.define({map:(I,Z)=>I.map(Z)}),Lz=B1.define();function d0(I,Z,J){let Q=I.facet(Hz);if(Q.length)Q[0](Z);else if(window.onerror&&window.onerror(String(Z),J,void 0,void 0,Z));else if(J)console.error(J+":",Z);else console.error(Z)}var L6=t.define({combine:(I)=>I.length?I[0]:!0}),mR=0,x8=t.define({combine(I){return I.filter((Z,J)=>{for(let Q=0;Q<J;Q++)if(I[Q].plugin==Z.plugin)return!1;return!0})}});class M0{constructor(I,Z,J,Q,X){this.id=I,this.create=Z,this.domEventHandlers=J,this.domEventObservers=Q,this.baseExtensions=X(this),this.extension=this.baseExtensions.concat(x8.of({plugin:this,arg:void 0}))}of(I){return this.baseExtensions.concat(x8.of({plugin:this,arg:I}))}static define(I,Z){let{eventHandlers:J,eventObservers:Q,provide:X,decorations:Y}=Z||{};return new M0(mR++,I,J,Q,(q)=>{let K=[];if(Y)K.push($I.of((W)=>{let G=W.plugin(q);return G?Y(G):P1.none}));if(X)K.push(X(q));return K})}static fromClass(I,Z){return M0.define((J,Q)=>new I(J,Q),Z)}}class BI{constructor(I){this.spec=I,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(I){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(I,this.spec.arg)}catch(Z){d0(I.state,Z,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let Z=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(Z)}catch(J){if(d0(Z.state,J,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(Q){}this.deactivate()}}return this}destroy(I){var Z;if((Z=this.value)===null||Z===void 0?void 0:Z.destroy)try{this.value.destroy()}catch(J){d0(I.state,J,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}var Bz=t.define(),fX=t.define(),$I=t.define(),Pz=t.define(),uX=t.define(),R3=t.define(),Sz=t.define();function LU(I,Z){let J=I.state.facet(Sz);if(!J.length)return J;let Q=J.map((Y)=>Y instanceof Function?Y(I):Y),X=[];return R1.spans(Q,Z.from,Z.to,{point(){},span(Y,q,K,W){let G=Y-Z.from,U=q-Z.from,z=X;for(let j=K.length-1;j>=0;j--,W--){let O=K[j].spec.bidiIsolate,H;if(O==null)O=$R(Z.text,G,U);if(W>0&&z.length&&(H=z[z.length-1]).to==G&&H.direction==O)H.to=U,z=H.inner;else{let N={from:G,to:U,direction:O,inner:[]};z.push(N),z=N.inner}}}}),X}var _z=t.define();function $X(I){let Z=0,J=0,Q=0,X=0;for(let Y of I.state.facet(_z)){let q=Y(I);if(q){if(q.left!=null)Z=Math.max(Z,q.left);if(q.right!=null)J=Math.max(J,q.right);if(q.top!=null)Q=Math.max(Q,q.top);if(q.bottom!=null)X=Math.max(X,q.bottom)}}return{left:Z,right:J,top:Q,bottom:X}}var Y3=t.define();class Z4{constructor(I,Z,J,Q){this.fromA=I,this.toA=Z,this.fromB=J,this.toB=Q}join(I){return new Z4(Math.min(this.fromA,I.fromA),Math.max(this.toA,I.toA),Math.min(this.fromB,I.fromB),Math.max(this.toB,I.toB))}addToSet(I){let Z=I.length,J=this;for(;Z>0;Z--){let Q=I[Z-1];if(Q.fromA>J.toA)continue;if(Q.toA<J.fromA)break;J=J.join(Q),I.splice(Z-1,1)}return I.splice(Z,0,J),I}static extendWithRanges(I,Z){if(Z.length==0)return I;let J=[];for(let Q=0,X=0,Y=0;;){let q=Q<I.length?I[Q].fromB:1e9,K=X<Z.length?Z[X]:1e9,W=Math.min(q,K);if(W==1e9)break;let G=W+Y,U=W,z=G;for(;;)if(X<Z.length&&Z[X]<=U){let j=Z[X+1];X+=2,U=Math.max(U,j);for(let O=Q;O<I.length&&I[O].fromB<=U;O++)Y=I[O].toA-I[O].toB;z=Math.max(z,j+Y)}else if(Q<I.length&&I[Q].fromB<=U){let j=I[Q++];U=Math.max(U,j.toB),z=Math.max(z,j.toA),Y=j.toA-j.toB}else break;J.push(new Z4(G,z,W,U))}return J}}class bI{constructor(I,Z,J){this.view=I,this.state=Z,this.transactions=J,this.flags=0,this.startState=I.state,this.changes=a1.empty(this.startState.doc.length);for(let X of J)this.changes=this.changes.compose(X.changes);let Q=[];this.changes.iterChangedRanges((X,Y,q,K)=>Q.push(new Z4(X,Y,q,K))),this.changedRanges=Q}static create(I,Z,J){return new bI(I,Z,J)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some((I)=>I.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}var vR=[];class p1{constructor(I,Z,J=0){this.dom=I,this.length=Z,this.flags=J,this.parent=null,I.cmTile=this}get breakAfter(){return this.flags&1}get children(){return vR}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(I){if(this.flags|=2,this.flags&4){this.flags&=-5;let Z=this.domAttrs;if(Z)SR(this.dom,Z)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(I){this.dom=I,I.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(I,Z=this.posAtStart){let J=Z;for(let Q of this.children){if(Q==I)return J;J+=Q.length+Q.breakAfter}throw RangeError("Invalid child in posBefore")}posAfter(I){return this.posBefore(I)+I.length}covers(I){return!0}coordsIn(I,Z,J){return null}domPosFor(I,Z){let J=r6(this.dom),Q=this.length?I>0:Z>0;return new T4(this.parent.dom,J+(Q?1:0),I==0||I==this.length)}markDirty(I){if(this.flags&=-3,I)this.flags|=4;if(this.parent&&this.parent.flags&2)this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let I=this;I;I=I.parent)if(I instanceof A3)return I;return null}static get(I){return I.cmTile}}class M3 extends p1{constructor(I){super(I,0);this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(I){this.children.push(I),I.parent=this}sync(I){if(this.flags&2)return;super.sync(I);let Z=this.dom,J=null,Q,X=(I===null||I===void 0?void 0:I.node)==Z?I:null,Y=0;for(let q of this.children){if(q.sync(I),Y+=q.length+q.breakAfter,Q=J?J.nextSibling:Z.firstChild,X&&Q!=q.dom)X.written=!0;if(q.dom.parentNode==Z)while(Q&&Q!=q.dom)Q=BU(Q);else Z.insertBefore(q.dom,Q);J=q.dom}if(Q=J?J.nextSibling:Z.firstChild,X&&Q)X.written=!0;while(Q)Q=BU(Q);this.length=Y}}function BU(I){let Z=I.nextSibling;return I.parentNode.removeChild(I),Z}class A3 extends M3{constructor(I,Z){super(Z);this.view=I}owns(I){for(;I;I=I.parent)if(I==this)return!0;return!1}isBlock(){return!0}nearest(I){for(;;){if(!I)return null;let Z=p1.get(I);if(Z&&this.owns(Z))return Z;I=I.parentNode}}blockTiles(I){for(let Z=[],J=this,Q=0,X=0;;)if(Q==J.children.length){if(!Z.length)return;if(J=J.parent,J.breakAfter)X++;Q=Z.pop()}else{let Y=J.children[Q++];if(Y instanceof B6)Z.push(Q),J=Y,Q=0;else{let q=X+Y.length,K=I(Y,X);if(K!==void 0)return K;X=q+Y.breakAfter}}}resolveBlock(I,Z){let J,Q=-1,X,Y=-1;if(this.blockTiles((q,K)=>{let W=K+q.length;if(I>=K&&I<=W){if(q.isWidget()&&Z>=-1&&Z<=1){if(q.flags&32)return!0;if(q.flags&16)J=void 0}if((K<I||I==W&&(Z<-1?q.length:q.covers(1)))&&(!J||!q.isWidget()&&J.isWidget()))J=q,Q=I-K;if((W>I||I==K&&(Z>1?q.length:q.covers(-1)))&&(!X||!q.isWidget()&&X.isWidget()))X=q,Y=I-K}}),!J&&!X)throw Error("No tile at position "+I);return J&&Z<0||!X?{tile:J,offset:Q}:{tile:X,offset:Y}}}class B6 extends M3{constructor(I,Z){super(I);this.wrapper=Z}isBlock(){return!0}covers(I){if(!this.children.length)return!1;return I<0?this.children[0].covers(-1):this.lastChild.covers(1)}get domAttrs(){return this.wrapper.attributes}static of(I,Z){let J=new B6(Z||document.createElement(I.tagName),I);if(!Z)J.flags|=4;return J}}class $8 extends M3{constructor(I,Z){super(I);this.attrs=Z}isLine(){return!0}static start(I,Z,J){let Q=new $8(Z||document.createElement("div"),I);if(!Z||!J)Q.flags|=4;return Q}get domAttrs(){return this.attrs}resolveInline(I,Z,J){let Q=null,X=-1,Y=null,q=-1;function K(G,U){for(let z=0,j=0;z<G.children.length&&j<=U;z++){let O=G.children[z],H=j+O.length;if(H>=U){if(O.isComposite())K(O,U-j);else if((!Y||Y.isHidden&&(Z>0&&!(Y.flags&32)||J&&pR(Y,O)))&&(H>U||O.flags&32&&Z<=1))Y=O,q=U-j;else if(j<U||O.flags&16&&!O.isHidden&&Z>=-1)Q=O,X=U-j}j=H}}K(this,I);let W=(Z<0?Q:Y)||Q||Y;return W?{tile:W,offset:W==Q?X:q}:null}coordsIn(I,Z,J){let Q=this.resolveInline(I,Z,!0);if(!Q)return cR(this);return Q.tile.coordsIn(Math.max(0,Q.offset),Z,J)}domIn(I,Z){let J=this.resolveInline(I,Z);if(J){let{tile:Q,offset:X}=J;if(this.dom.contains(Q.dom)){if(Q.isText())return new T4(Q.dom,Math.min(Q.dom.nodeValue.length,X));return Q.domPosFor(X,Q.flags&16?1:Q.flags&32?-1:Z)}let Y=J.tile.parent,q=!1;for(let K of Y.children){if(q)return new T4(K.dom,0);if(K==J.tile)q=!0}}return new T4(this.dom,0)}}function cR(I){let Z=I.dom.lastChild;if(!Z)return I.dom.getBoundingClientRect();let J=LI(Z);return J[J.length-1]||null}function pR(I,Z){let J=I.coordsIn(0,1),Q=Z.coordsIn(0,1);return J&&Q&&Q.top<J.bottom}class g0 extends M3{constructor(I,Z){super(I);this.mark=Z}get domAttrs(){return this.mark.attrs}static of(I,Z){let J=new g0(Z||document.createElement(I.tagName),I);if(!Z)J.flags|=4;return J}}class v5 extends p1{constructor(I,Z){super(I,Z.length);this.text=Z}sync(I){if(this.flags&2)return;if(super.sync(I),this.dom.nodeValue!=this.text){if(I&&I.node==this.dom)I.written=!0;this.dom.nodeValue=this.text}}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(I,Z,J){let Q=this.dom.nodeValue.length;if(I>Q)I=Q;let X=I,Y=I,q=0;if(I==0&&Z<0||I==Q&&Z>=0){if(!(r.chrome||r.gecko)){if(I)X--,q=1;else if(Y<Q)Y++,q=-1}}else if(Z<0)X--;else if(Y<Q)Y++;let K=O3(this.dom,X,Y).getClientRects();if(!K.length)return null;let W=K[(q?q<0:Z>=0)?0:K.length-1];if(r.safari&&!q&&W.width==0)W=Array.prototype.find.call(K,(G)=>G.width)||W;return J==null?W:kI(W,(q?q>0:Z<0)==J)}static of(I,Z){let J=new v5(Z||document.createTextNode(I),I);if(!Z)J.flags|=2;return J}}class d5 extends p1{constructor(I,Z,J,Q){super(I,Z,Q);this.widget=J}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(I){if(this.flags&48)return!1;return(this.flags&(I<0?64:128))>0}coordsIn(I,Z){return this.coordsInWidget(I,Z,!1)}coordsInWidget(I,Z,J){let Q=this.widget.coordsAt(this.dom,I,Z);if(Q)return Q;if(J)return kI(this.dom.getBoundingClientRect(),this.length?I==0:Z<=0);else{let X=this.dom.getClientRects(),Y=null;if(!X.length)return null;let q=this.flags&16?!0:this.flags&32?!1:I>0;for(let K=q?X.length-1:0;;K+=q?-1:1)if(Y=X[K],I>0?K==0:K==X.length-1||Y.top<Y.bottom)break;return kI(Y,!q)}}get overrideDOMText(){if(!this.length)return M1.empty;let{root:I}=this;if(!I)return M1.empty;let Z=this.posAtStart;return I.view.state.doc.slice(Z,Z+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(I,Z,J,Q,X){if(!X){if(X=I.toDOM(Z),!I.editable)X.contentEditable="false"}return new d5(X,J,I,Q)}}class F3 extends p1{constructor(I){let Z=document.createElement("img");Z.className="cm-widgetBuffer",Z.setAttribute("aria-hidden","true");super(Z,0,I)}get isHidden(){return!0}get overrideDOMText(){return M1.empty}coordsIn(I,Z,J){let Q=this.dom.getBoundingClientRect();return J==null?Q:kI(Q,Z>0==J)}}class Tz{constructor(I){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=I}advance(I,Z,J){let{tile:Q,index:X,beforeBreak:Y,parents:q}=this;while(I||Z>0)if(!Q.isComposite()){let K=Q.length;if(X<K&&I){let W=Math.min(I,K-X);if(J)J.skip(Q,X,X+W);I-=W,X+=W}if(X==K)Y=!!Q.breakAfter,{tile:Q,index:X}=q.pop(),X++;else if(!I)break}else if(Y){if(!I)break;if(J)J.break();I--,Y=!1}else if(X==Q.children.length){if(!I&&!q.length)break;if(J)J.leave(Q);Y=!!Q.breakAfter,{tile:Q,index:X}=q.pop(),X++}else{let K=Q.children[X],W=K.breakAfter;if((Z>0?K.length<=I:K.length<I)&&(!J||J.skip(K,0,K.length)!==!1||!K.isComposite))Y=!!W,X++,I-=K.length;else if(q.push({tile:Q,index:X}),Q=K,X=0,J&&K.isComposite())J.enter(K)}return this.tile=Q,this.index=X,this.beforeBreak=Y,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class Ez{constructor(I,Z,J,Q){this.from=I,this.to=Z,this.wrapper=J,this.rank=Q}}class hz{constructor(I,Z,J){this.cache=I,this.root=Z,this.blockWrappers=J,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(I,Z,J,Q){var X;this.flushBuffer();let Y=this.ensureMarks(Z,J),q=Y.lastChild;if(q&&q.isText()&&!(q.flags&8)&&q.length+I.length<512){this.cache.reused.set(q,2);let K=Y.children[Y.children.length-1]=new v5(q.dom,q.text+I);K.parent=Y}else Y.append(Q||v5.of(I,(X=this.cache.find(v5))===null||X===void 0?void 0:X.dom));this.pos+=I.length,this.afterWidget=null}addComposition(I,Z){let J=this.curLine;if(J.dom!=Z.line.dom)J.setDOM(this.cache.reused.has(Z.line)?QX(Z.line.dom):Z.line.dom),this.cache.reused.set(Z.line,2);let Q=J;for(let q=Z.marks.length-1;q>=0;q--){let K=Z.marks[q],W=Q.lastChild;if(W instanceof g0&&W.mark.eq(K.mark)){if(W.dom!=K.dom)W.setDOM(QX(K.dom));Q=W}else{if(this.cache.reused.get(K)){let U=p1.get(K.dom);if(U)U.setDOM(QX(K.dom))}let G=g0.of(K.mark,K.dom);Q.append(G),Q=G}this.cache.reused.set(K,2)}let X=p1.get(I.text);if(X)this.cache.reused.set(X,2);let Y=new v5(I.text,I.text.nodeValue);Y.flags|=8,this.pos=I.range.toB,Q.append(Y)}addInlineWidget(I,Z,J){let Q=this.afterWidget&&I.flags&48&&(this.afterWidget.flags&48)==(I.flags&48);if(!Q)this.flushBuffer();let X=this.ensureMarks(Z,J);if(!Q&&!(I.flags&16))X.append(this.getBuffer(1));X.append(I),this.pos+=I.length,this.afterWidget=I}addMark(I,Z,J){this.flushBuffer(),this.ensureMarks(Z,J).append(I),this.pos+=I.length,this.afterWidget=null}addBlockWidget(I){this.getBlockPos().append(I),this.pos+=I.length,this.lastBlock=I,this.endLine()}continueWidget(I){let Z=this.afterWidget||this.lastBlock;Z.length+=I,this.pos+=I}addLineStart(I,Z){var J;if(!I)I=bz;let Q=$8.start(I,Z||((J=this.cache.find($8))===null||J===void 0?void 0:J.dom),!!Z);this.getBlockPos().append(this.lastBlock=this.curLine=Q)}addLine(I){this.getBlockPos().append(I),this.pos+=I.length,this.lastBlock=I,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(I){if(!this.blockPosCovered())this.addLineStart(I)}ensureLine(I){if(!this.curLine)this.addLineStart(I)}ensureMarks(I,Z){var J;let Q=this.curLine;for(let X=I.length-1;X>=0;X--){let Y=I[X],q;if(Z>0&&(q=Q.lastChild)&&q instanceof g0&&q.mark.eq(Y))Q=q,Z--;else{let K=g0.of(Y,(J=this.cache.find(g0,(W)=>W.mark.eq(Y)))===null||J===void 0?void 0:J.dom);Q.append(K),Q=K,Z=0}}return Q}endLine(){if(this.curLine){this.flushBuffer();let I=this.curLine.lastChild;if(!I||!PU(this.curLine,!1)||I.dom.nodeName!="BR"&&I.isWidget()&&!(r.ios&&PU(this.curLine,!0)))this.curLine.append(this.cache.findWidget(XX,0,32)||new d5(XX.toDOM(),0,XX,32));this.curLine=this.afterWidget=null}}updateBlockWrappers(){if(this.wrapperPos>this.pos+1e4)this.blockWrappers.goto(this.pos),this.wrappers.length=0;for(let I=this.wrappers.length-1;I>=0;I--)if(this.wrappers[I].to<this.pos)this.wrappers.splice(I,1);for(let I=this.blockWrappers;I.value&&I.from<=this.pos;I.next())if(I.to>=this.pos){let Z=I.rank*102+I.value.rank,J=new Ez(I.from,I.to,I.value,Z),Q=this.wrappers.length;while(Q>0&&(this.wrappers[Q-1].rank-J.rank||this.wrappers[Q-1].to-J.to)<0)Q--;this.wrappers.splice(Q,0,J)}this.wrapperPos=this.pos}getBlockPos(){var I;this.updateBlockWrappers();let Z=this.root;for(let J of this.wrappers){let Q=Z.lastChild;if(J.from<this.pos&&Q instanceof B6&&Q.wrapper.eq(J.wrapper))Z=Q;else{let X=B6.of(J.wrapper,(I=this.cache.find(B6,(Y)=>Y.wrapper.eq(J.wrapper)))===null||I===void 0?void 0:I.dom);Z.append(X),Z=X}}return Z}blockPosCovered(){let I=this.lastBlock;return I!=null&&!I.breakAfter&&(!I.isWidget()||(I.flags&160)>0)}getBuffer(I){let Z=2|(I<0?16:32),J=this.cache.find(F3,void 0,1);if(J)J.flags=Z;return J||new F3(Z)}flushBuffer(){if(this.afterWidget&&!(this.afterWidget.flags&32))this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null}}class Cz{constructor(I){this.skipCount=0,this.text="",this.textOff=0,this.cursor=I.iter()}skip(I){if(this.textOff+I<=this.text.length)this.textOff+=I;else this.skipCount+=I-(this.text.length-this.textOff),this.text="",this.textOff=0}next(I){if(this.textOff==this.text.length){let{value:Q,lineBreak:X,done:Y}=this.cursor.next(this.skipCount);if(this.skipCount=0,Y)throw Error("Ran out of text content when drawing inline views");this.text=Q;let q=this.textOff=Math.min(I,Q.length);return X?null:Q.slice(0,q)}let Z=Math.min(this.text.length,this.textOff+I),J=this.text.slice(this.textOff,Z);return this.textOff=Z,J}}var yI=[d5,$8,v5,g0,F3,B6,A3];for(let I=0;I<yI.length;I++)yI[I].bucket=I;class wz{constructor(I){this.view=I,this.buckets=yI.map(()=>[]),this.index=yI.map(()=>0),this.reused=new Map}add(I){let Z=I.constructor.bucket,J=this.buckets[Z];if(J.length<6)J.push(I);else J[this.index[Z]=(this.index[Z]+1)%6]=I}find(I,Z,J=2){let Q=I.bucket,X=this.buckets[Q],Y=this.index[Q];for(let q=0;q<X.length;q++){let K=(q+Y)%X.length,W=X[K];if((!Z||Z(W))&&!this.reused.has(W)){if(X.splice(K,1),K<Y)this.index[Q]--;return this.reused.set(W,J),W}}return null}findWidget(I,Z,J){let Q=this.buckets[0];if(Q.length)for(let X=0,Y=0;;X++){if(X==Q.length){if(Y)return null;Y=1,X=0}let q=Q[X];if(!this.reused.has(q)&&(Y==0?q.widget.compare(I):q.widget.constructor==I.constructor&&I.updateDOM(q.dom,this.view,q.widget))){if(Q.splice(X,1),X<this.index[0])this.index[0]--;if(q.widget==I&&q.length==Z&&(q.flags&497)==J)return this.reused.set(q,1),q;else return this.reused.set(q,2),new d5(q.dom,Z,I,q.flags&-498|J)}}}reuse(I){return this.reused.set(I,1),I}maybeReuse(I,Z=2){if(this.reused.has(I))return;return this.reused.set(I,Z),I.dom}clear(){for(let I=0;I<this.buckets.length;I++)this.buckets[I].length=this.index[I]=0}}class kz{constructor(I,Z,J,Q,X){this.view=I,this.decorations=Q,this.disallowBlockEffectsFor=X,this.openWidget=!1,this.openMarks=0,this.cache=new wz(I),this.text=new Cz(I.state.doc),this.builder=new hz(this.cache,new A3(I,I.contentDOM),R1.iter(J)),this.cache.reused.set(Z,2),this.old=new Tz(Z),this.reuseWalker={skip:(Y,q,K)=>{if(this.cache.add(Y),Y.isComposite())return!1},enter:(Y)=>this.cache.add(Y),leave:()=>{},break:()=>{}}}run(I,Z){let J=Z&&this.getCompositionContext(Z.text);for(let Q=0,X=0,Y=0;;){let q=Y<I.length?I[Y++]:null,K=q?q.fromA:this.old.root.length;if(K>Q){let W=K-Q;this.preserve(W,!Y,!q),Q=K,X+=W}if(!q)break;if(Z&&q.fromA<=Z.range.fromA&&q.toA>=Z.range.toA)this.forward(q.fromA,Z.range.fromA,Z.range.fromA<Z.range.toA?1:-1),this.emit(X,Z.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(Z,J),this.text.skip(Z.range.toB-Z.range.fromB),this.forward(Z.range.fromA,q.toA),this.emit(Z.range.toB,q.toB);else this.forward(q.fromA,q.toA),this.emit(X,q.toB);X=q.toB,Q=q.toA}if(this.builder.curLine)this.builder.endLine();return this.builder.root}preserve(I,Z,J){let Q=iR(this.old),X=this.openMarks;this.old.advance(I,J?1:-1,{skip:(Y,q,K)=>{if(Y.isWidget())if(this.openWidget)this.builder.continueWidget(K-q);else{let W=K>0||q<Y.length?d5.of(Y.widget,this.view,K-q,Y.flags&496,this.cache.maybeReuse(Y)):this.cache.reuse(Y);if(W.flags&256)W.flags&=-2,this.builder.addBlockWidget(W);else this.builder.ensureLine(null),this.builder.addInlineWidget(W,Q,X),X=Q.length}else if(Y.isText()){if(this.builder.ensureLine(null),!q&&K==Y.length&&!this.cache.reused.has(Y))this.builder.addText(Y.text,Q,X,this.cache.reuse(Y));else this.cache.add(Y),this.builder.addText(Y.text.slice(q,K),Q,X);X=Q.length}else if(Y.isLine())Y.flags&=-2,this.cache.reused.set(Y,1),this.builder.addLine(Y);else if(Y instanceof F3)this.cache.add(Y);else if(Y instanceof g0)this.builder.ensureLine(null),this.builder.addMark(Y,Q,X),this.cache.reused.set(Y,1),X=Q.length;else return!1;this.openWidget=!1},enter:(Y)=>{if(Y.isLine())this.builder.addLineStart(Y.attrs,this.cache.maybeReuse(Y));else if(this.cache.add(Y),Y instanceof g0)Q.unshift(Y.mark);this.openWidget=!1},leave:(Y)=>{if(Y.isLine()){if(Q.length)Q.length=X=0}else if(Y instanceof g0)Q.shift(),X=Math.min(X,Q.length)},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(I)}emit(I,Z){let J=null,Q=this.builder,X=-1,Y=R1.spans(this.decorations,I,Z,{point:(q,K,W,G,U,z)=>{if(W instanceof p5){if(this.disallowBlockEffectsFor[z]){if(W.block)throw RangeError("Block decorations may not be specified via plugins");if(K>this.view.state.doc.lineAt(q).to)throw RangeError("Decorations that replace line breaks may not be specified via plugins")}if(X=G.length,U>G.length)Q.continueWidget(K-q);else{let j=W.widget||(W.block?i5.block:i5.inline),O=sR(W),H=this.cache.findWidget(j,K-q,O)||d5.of(j,this.view,K-q,O);if(W.block){if(W.startSide>0)Q.addLineStartIfNotCovered(J);Q.addBlockWidget(H)}else Q.ensureLine(J),Q.addInlineWidget(H,G,U)}J=null}else J=dR(J,W);if(K>q)this.text.skip(K-q)},span:(q,K,W,G)=>{for(let U=q;U<K;){let z=this.text.next(Math.min(512,K-U));if(z==null)Q.addLineStartIfNotCovered(J),Q.addBreak(),U++;else Q.ensureLine(J),Q.addText(z,W,U==q?G:W.length),U+=z.length;J=null}X=W.length}});if(X>-1)this.openWidget=Y>X;if(!this.openWidget)Q.addLineStartIfNotCovered(J);this.openMarks=Y}forward(I,Z,J=1){if(Z-I<=10)this.old.advance(Z-I,J,this.reuseWalker);else this.old.advance(5,-1,this.reuseWalker),this.old.advance(Z-I-10,-1),this.old.advance(5,J,this.reuseWalker)}getCompositionContext(I){let Z=[],J=null;for(let Q=I.parentNode;;Q=Q.parentNode){let X=p1.get(Q);if(Q==this.view.contentDOM)break;if(X instanceof g0)Z.push(X);else if(X===null||X===void 0?void 0:X.isLine())J=X;else if(X instanceof B6);else if(Q.nodeName=="DIV"&&!J&&Q!=this.view.contentDOM)J=new $8(Q,bz);else if(!J)Z.push(g0.of(new H3({tagName:Q.nodeName.toLowerCase(),attributes:_R(Q)}),Q))}return{line:J,marks:Z}}}function PU(I,Z){let J=(Q)=>{for(let X of Q.children)if((Z?X.isText():X.length)||J(X))return!0;return!1};return J(I)}function sR(I){let Z=I.isReplace?(I.startSide<0?64:0)|(I.endSide>0?128:0):I.startSide>0?32:16;if(I.block)Z|=256;return Z}var bz={class:"cm-line"};function dR(I,Z){let J=Z.spec.attributes,Q=Z.spec.class;if(!J&&!Q)return I;if(!I)I={class:"cm-line"};if(J)bX(J,I);if(Q)I.class+=" "+Q;return I}function iR(I){let Z=[];for(let J=I.parents.length;J>1;J--){let Q=J==I.parents.length?I.tile:I.parents[J].tile;if(Q instanceof g0)Z.push(Q.mark)}return Z}function QX(I){let Z=p1.get(I);if(Z)Z.setDOM(I.cloneNode());return I}class i5 extends a6{constructor(I){super();this.tag=I}eq(I){return I.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(I){return I.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}i5.inline=new i5("span");i5.block=new i5("div");var XX=new class extends a6{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class MX{constructor(I){this.view=I,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=P1.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new A3(I,I.contentDOM),this.updateInner([new Z4(0,0,0,I.state.doc.length)],null)}update(I){var Z;let J=I.changedRanges;if(this.minWidth>0&&J.length)if(!J.every(({fromA:G,toA:U})=>U<this.minWidthFrom||G>this.minWidthTo))this.minWidth=this.minWidthFrom=this.minWidthTo=0;else this.minWidthFrom=I.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=I.changes.mapPos(this.minWidthTo,1);this.updateEditContextFormatting(I);let Q=-1;if(this.view.inputState.composing>=0&&!this.view.observer.editContext){if((Z=this.domChanged)===null||Z===void 0?void 0:Z.newSel)Q=this.domChanged.newSel.head;else if(!ZM(I.changes,this.hasComposition)&&!I.selectionSet)Q=I.state.selection.main.head}let X=Q>-1?rR(this.view,I.changes,Q):null;if(this.domChanged=null,this.hasComposition){let{from:G,to:U}=this.hasComposition;J=new Z4(G,U,I.changes.mapPos(G,-1),I.changes.mapPos(U,1)).addToSet(J.slice())}if(this.hasComposition=X?{from:X.range.fromB,to:X.range.toB}:null,(r.ie||r.chrome)&&!X&&I&&I.state.doc.lines!=I.startState.doc.lines)this.forceSelection=!0;let Y=this.decorations,q=this.blockWrappers;this.updateDeco();let K=oR(Y,this.decorations,I.changes);if(K.length)J=Z4.extendWithRanges(J,K);let W=eR(q,this.blockWrappers,I.changes);if(W.length)J=Z4.extendWithRanges(J,W);if(X&&!J.some((G)=>G.fromA<=X.range.fromA&&G.toA>=X.range.toA))J=X.range.addToSet(J.slice());if(this.tile.flags&2&&J.length==0)return!1;else{if(this.updateInner(J,X),I.transactions.length)this.lastUpdate=Date.now();return!0}}updateInner(I,Z){this.view.viewState.mustMeasureContent=!0;let{observer:J}=this.view;J.ignore(()=>{if(Z||I.length){let Y=this.tile,q=new kz(this.view,Y,this.blockWrappers,this.decorations,this.dynamicDecorationMap);if(Z&&p1.get(Z.text))q.cache.reused.set(p1.get(Z.text),2);this.tile=q.run(I,Z),AX(Y,q.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let X=r.chrome||r.ios?{node:J.selectionRange.focusNode,written:!1}:void 0;if(this.tile.sync(X),X&&(X.written||J.selectionRange.focusNode!=X.node||!this.tile.dom.contains(X.node)))this.forceSelection=!0;this.tile.dom.style.height=""});let Q=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length){for(let X of this.tile.children)if(X.isWidget()&&X.widget instanceof PI)Q.push(X.dom)}J.updateGaps(Q)}updateEditContextFormatting(I){this.editContextFormatting=this.editContextFormatting.map(I.changes);for(let Z of I.transactions)for(let J of Z.effects)if(J.is(Lz))this.editContextFormatting=J.value}updateSelection(I=!1,Z=!1){if(I||!this.view.observer.selectionRange.focusNode)this.view.observer.readSelectionRange();let{dom:J}=this.tile,Q=this.view.root.activeElement,X=Q==J,Y=!X&&!(this.view.state.facet(L6)||J.tabIndex>-1)&&G3(J,this.view.observer.selectionRange)&&!(Q&&J.contains(Q));if(!(X||Z||Y))return;let q=this.forceSelection;this.forceSelection=!1;let K=this.view.state.selection.main,W,G;if(K.empty)G=W=this.inlineDOMNearPos(K.anchor,K.assoc||1);else G=this.inlineDOMNearPos(K.head,K.head==K.from?1:-1),W=this.inlineDOMNearPos(K.anchor,K.anchor==K.from?1:-1);if(r.gecko&&K.empty&&!this.hasComposition&&lR(W)){let z=document.createTextNode("");this.view.observer.ignore(()=>W.node.insertBefore(z,W.node.childNodes[W.offset]||null)),W=G=new T4(z,0),q=!0}let U=this.view.observer.selectionRange;if(q||!U.focusNode||(!U3(W.node,W.offset,U.anchorNode,U.anchorOffset)||!U3(G.node,G.offset,U.focusNode,U.focusOffset))&&!this.suppressWidgetCursorChange(U,K))this.view.observer.ignore(()=>{if(r.android&&r.chrome&&J.contains(U.focusNode)&&IM(U.focusNode,J))J.blur(),J.focus({preventScroll:!0});let z=j3(this.view.root);if(!z);else if(K.empty){if(r.gecko){let j=aR(W.node,W.offset);if(j&&j!=3){let O=(j==1?qz:Kz)(W.node,W.offset);if(O)W=new T4(O.node,O.offset)}}if(z.collapse(W.node,W.offset),K.bidiLevel!=null&&z.caretBidiLevel!==void 0)z.caretBidiLevel=K.bidiLevel}else if(z.extend){z.collapse(W.node,W.offset);try{z.extend(G.node,G.offset)}catch(j){}}else{let j=document.createRange();if(K.anchor>K.head)[W,G]=[G,W];j.setEnd(G.node,G.offset),j.setStart(W.node,W.offset),z.removeAllRanges(),z.addRange(j)}if(Y&&this.view.root.activeElement==J){if(J.blur(),Q)Q.focus()}}),this.view.observer.setSelectionRange(W,G);this.impreciseAnchor=W.precise?null:new T4(U.anchorNode,U.anchorOffset),this.impreciseHead=G.precise?null:new T4(U.focusNode,U.focusOffset)}suppressWidgetCursorChange(I,Z){return this.hasComposition&&Z.empty&&U3(I.focusNode,I.focusOffset,I.anchorNode,I.anchorOffset)&&this.posFromDOM(I.focusNode,I.focusOffset)==Z.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:I}=this,Z=I.state.selection.main,J=j3(I.root),{anchorNode:Q,anchorOffset:X}=I.observer.selectionRange;if(!J||!Z.empty||!Z.assoc||!J.modify)return;let Y=this.lineAt(Z.head,Z.assoc);if(!Y)return;let q=Y.posAtStart;if(Z.head==q||Z.head==q+Y.length)return;let K=this.coordsAt(Z.head,-1),W=this.coordsAt(Z.head,1);if(!K||!W||K.bottom>W.top)return;let G=this.domAtPos(Z.head+Z.assoc,Z.assoc);J.collapse(G.node,G.offset),J.modify("move",Z.assoc<0?"forward":"backward","lineboundary"),I.observer.readSelectionRange();let U=I.observer.selectionRange;if(I.docView.posFromDOM(U.anchorNode,U.anchorOffset)!=Z.from)J.collapse(Q,X)}posFromDOM(I,Z){let J=this.tile.nearest(I);if(!J)return this.tile.dom.compareDocumentPosition(I)&2?0:this.view.state.doc.length;let Q=J.posAtStart;if(J.isComposite()){let X;if(I==J.dom)X=J.dom.childNodes[Z];else{let Y=P6(I)==0?0:Z==0?-1:1;for(;;){let q=I.parentNode;if(q==J.dom)break;if(Y==0&&q.firstChild!=q.lastChild)if(I==q.firstChild)Y=-1;else Y=1;I=q}if(Y<0)X=I;else X=I.nextSibling}if(X==J.dom.firstChild)return Q;while(X&&!p1.get(X))X=X.nextSibling;if(!X)return Q+J.length;for(let Y=0,q=Q;;Y++){let K=J.children[Y];if(K.dom==X)return q;q+=K.length+K.breakAfter}}else if(J.isText())return I==J.dom?Q+Z:Q+(Z?J.length:0);else return Q}domAtPos(I,Z){let{tile:J,offset:Q}=this.tile.resolveBlock(I,Z);if(J.isWidget())return J.domPosFor(Q,Z);return J.domIn(Q,Z)}inlineDOMNearPos(I,Z){let J,Q=-1,X=!1,Y,q=-1,K=!1;if(this.tile.blockTiles((W,G)=>{if(W.isWidget()){if(W.flags&32&&G>=I)return!0;if(W.flags&16)X=!0}else{let U=G+W.length;if(G<=I)J=W,Q=I-G,X=U<I;if(U>=I&&!Y)Y=W,q=I-G,K=G>I;if(G>I&&Y)return!0}}),!J&&!Y)return this.domAtPos(I,Z);if(X&&Y)J=null;else if(K&&J)Y=null;return J&&Z<0||!Y?J.domIn(Q,Z):Y.domIn(q,Z)}coordsAt(I,Z,J){let{tile:Q,offset:X}=this.tile.resolveBlock(I,Z);if(Q.isWidget()){if(Q.widget instanceof PI)return null;return Q.coordsInWidget(X,Z,!0)}return Q.coordsIn(X,Z,J)}lineAt(I,Z){let{tile:J}=this.tile.resolveBlock(I,Z);return J.isLine()?J:null}coordsForChar(I){let{tile:Z,offset:J}=this.tile.resolveBlock(I,1);if(!Z.isLine())return null;function Q(X,Y){if(X.isComposite())for(let q of X.children){if(q.length>=Y){let K=Q(q,Y);if(K)return K}if(Y-=q.length,Y<0)break}else if(X.isText()&&Y<X.length){let q=q0(X.text,Y);if(q==Y)return null;let K=O3(X.dom,Y,q).getClientRects();for(let W=0;W<K.length;W++){let G=K[W];if(W==K.length-1||G.top<G.bottom&&G.left<G.right)return G}}return null}return Q(Z,J)}measureVisibleLineHeights(I){let Z=[],{from:J,to:Q}=I,X=this.view.contentDOM.clientWidth,Y=X>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,q=-1,K=this.view.textDirection==w1.LTR,W=0,G=(U,z,j)=>{for(let O=0;O<U.children.length;O++){if(z>Q)break;let H=U.children[O],N=z+H.length,M=H.dom.getBoundingClientRect(),{height:_}=M;if(j&&!O)W+=M.top-j.top;if(H instanceof B6){if(N>J)G(H,z,M)}else if(z>=J){if(W>0)Z.push(-W);if(Z.push(_+W),W=0,Y){let T=H.dom.lastChild,h=T?LI(T):[];if(h.length){let w=h[h.length-1],L=K?w.right-M.left:M.right-w.left;if(L>q)q=L,this.minWidth=X,this.minWidthFrom=z,this.minWidthTo=N}}}if(j&&O==U.children.length-1)W+=j.bottom-M.bottom;z=N+H.breakAfter}};return G(this.tile,0,null),Z}textDirectionAt(I){let{tile:Z}=this.tile.resolveBlock(I,1);return getComputedStyle(Z.dom).direction=="rtl"?w1.RTL:w1.LTR}measureTextSize(){let I=this.tile.blockTiles((Y)=>{if(Y.isLine()&&Y.children.length&&Y.length<=20){let q=0,K;for(let W of Y.children){if(!W.isText()||/[^ -~]/.test(W.text))return;let G=LI(W.dom);if(G.length!=1)return;q+=G[0].width,K=G[0].height}if(q)return{lineHeight:Y.dom.getBoundingClientRect().height,charWidth:q/Y.length,textHeight:K}}});if(I)return I;let Z=document.createElement("div"),J,Q,X;return Z.className="cm-line",Z.style.width="99999px",Z.style.position="absolute",Z.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(Z);let Y=LI(Z.firstChild)[0];J=Z.getBoundingClientRect().height,Q=Y&&Y.width?Y.width/27:7,X=Y&&Y.height?Y.height:J,Z.remove()}),{lineHeight:J,charWidth:Q,textHeight:X}}computeBlockGapDeco(){let I=[],Z=this.view.viewState;for(let J=0,Q=0;;Q++){let X=Q==Z.viewports.length?null:Z.viewports[Q],Y=X?X.from-1:this.view.state.doc.length;if(Y>J){let q=(Z.lineBlockAt(Y).bottom-Z.lineBlockAt(J).top)/this.view.scaleY;I.push(P1.replace({widget:new PI(q),block:!0,inclusive:!0,isBlockGap:!0}).range(J,Y))}if(!X)break;J=X.to+1}return P1.set(I)}updateDeco(){let I=1,Z=this.view.state.facet($I).map((X)=>{return(this.dynamicDecorationMap[I++]=typeof X=="function")?X(this.view):X}),J=!1,Q=this.view.state.facet(uX).map((X,Y)=>{let q=typeof X=="function";if(q)J=!0;return q?X(this.view):X});if(Q.length)this.dynamicDecorationMap[I++]=J,Z.push(R1.join(Q));this.decorations=[this.editContextFormatting,...Z,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];while(I<this.decorations.length)this.dynamicDecorationMap[I++]=!1;this.blockWrappers=this.view.state.facet(Pz).map((X)=>typeof X=="function"?X(this.view):X)}scrollIntoView(I){if(I.isSnapshot){let W=this.view.viewState.lineBlockAt(I.range.head);this.view.scrollDOM.scrollTop=W.top-I.yMargin,this.view.scrollDOM.scrollLeft=I.xMargin;return}for(let W of this.view.state.facet(Dz))try{if(W(this.view,I.range,I))return!0}catch(G){d0(this.view.state,G,"scroll handler")}let{range:Z}=I,J=this.coordsAt(Z.head,Z.assoc||(Z.head>Z.anchor?-1:1)),Q;if(!J)return;if(!Z.empty&&(Q=this.coordsAt(Z.anchor,Z.anchor>Z.head?-1:1)))J={left:Math.min(J.left,Q.left),top:Math.min(J.top,Q.top),right:Math.max(J.right,Q.right),bottom:Math.max(J.bottom,Q.bottom)};let X=$X(this.view),Y={left:J.left-X.left,top:J.top-X.top,right:J.right+X.right,bottom:J.bottom+X.bottom},{offsetWidth:q,offsetHeight:K}=this.view.scrollDOM;if(hR(this.view.scrollDOM,Y,Z.head<Z.anchor?-1:1,I.x,I.y,Math.max(Math.min(I.xMargin,q),-q),Math.max(Math.min(I.yMargin,K),-K),this.view.textDirection==w1.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(J.top>window.visualViewport.offsetTop+window.visualViewport.height||J.bottom<window.visualViewport.offsetTop)){let W=this.view.docView.lineAt(Z.head,1);if(W){let G=Jz(W.dom);W.dom.scrollIntoView({block:"nearest"}),Qz(G,!1)}}}lineHasWidget(I){let Z=(J)=>J.isWidget()||J.children.some(Z);return Z(this.tile.resolveBlock(I,1).tile)}destroy(){AX(this.tile)}}function AX(I,Z){let J=Z===null||Z===void 0?void 0:Z.get(I);if(J!=1){if(J==null)I.destroy();for(let Q of I.children)AX(Q,Z)}}function lR(I){return I.node.nodeType==1&&I.node.firstChild&&(I.offset==0||I.node.childNodes[I.offset-1].contentEditable=="false")&&(I.offset==I.node.childNodes.length||I.node.childNodes[I.offset].contentEditable=="false")}function yz(I,Z){let J=I.observer.selectionRange;if(!J.focusNode)return null;let Q=qz(J.focusNode,J.focusOffset),X=Kz(J.focusNode,J.focusOffset),Y=Q||X;if(X&&Q&&X.node!=Q.node){let K=p1.get(X.node);if(!K||K.isText()&&K.text!=X.node.nodeValue)Y=X;else if(I.docView.lastCompositionAfterCursor){let W=p1.get(Q.node);if(!(!W||W.isText()&&W.text!=Q.node.nodeValue))Y=X}}if(I.docView.lastCompositionAfterCursor=Y!=Q,!Y)return null;let q=Z-Y.offset;return{from:q,to:q+Y.node.nodeValue.length,node:Y.node}}function rR(I,Z,J){let Q=yz(I,J);if(!Q)return null;let{node:X,from:Y,to:q}=Q,K=X.nodeValue;if(/[\n\r]/.test(K))return null;if(I.state.doc.sliceString(Q.from,Q.to)!=K)return null;let W=Z.invertedDesc;return{range:new Z4(W.mapPos(Y),W.mapPos(q),Y,q),text:X}}function aR(I,Z){if(I.nodeType!=1)return 0;return(Z&&I.childNodes[Z-1].contentEditable=="false"?1:0)|(Z<I.childNodes.length&&I.childNodes[Z].contentEditable=="false"?2:0)}var tR=class{constructor(){this.changes=[]}compareRange(Z,J){g8(Z,J,this.changes)}comparePoint(Z,J){g8(Z,J,this.changes)}boundChange(Z){g8(Z,Z,this.changes)}};function oR(I,Z,J){let Q=new tR;return R1.compare(I,Z,J,Q),Q.changes}class xz{constructor(){this.changes=[]}compareRange(I,Z){g8(I,Z,this.changes)}comparePoint(){}boundChange(I){g8(I,I,this.changes)}}function eR(I,Z,J){let Q=new xz;return R1.compare(I,Z,J,Q),Q.changes}function IM(I,Z){for(let J=I;J&&J!=Z;J=J.assignedSlot||J.parentNode)if(J.nodeType==1&&J.contentEditable=="false")return!0;return!1}function ZM(I,Z){let J=!1;if(Z)I.iterChangedRanges((Q,X)=>{if(Q<Z.to&&X>Z.from)J=!0});return J}class PI extends a6{constructor(I){super();this.height=I}toDOM(){let I=document.createElement("div");return I.className="cm-gap",this.updateDOM(I),I}eq(I){return I.height==this.height}updateDOM(I){return I.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function JM(I,Z,J=1){let Q=I.charCategorizer(Z),X=I.doc.lineAt(Z),Y=Z-X.from;if(X.length==0)return u.cursor(Z);if(Y==0)J=1;else if(Y==X.length)J=-1;let q=Y,K=Y;if(J<0)q=q0(X.text,Y,!1);else K=q0(X.text,Y);let W=Q(X.text.slice(q,K));while(q>0){let G=q0(X.text,q,!1);if(Q(X.text.slice(G,q))!=W)break;q=G}while(K<X.length){let G=q0(X.text,K);if(Q(X.text.slice(K,G))!=W)break;K=G}return u.undirectionalRange(q+X.from,K+X.from)}function QM(I,Z,J,Q,X){let Y=Math.round((Q-Z.left)*I.defaultCharacterWidth);if(I.lineWrapping&&J.height>I.defaultLineHeight*1.5){let K=I.viewState.heightOracle.textHeight,W=Math.floor((X-J.top-(I.defaultLineHeight-K)*0.5)/K);Y+=W*I.viewState.heightOracle.lineLength}let q=I.state.sliceDoc(J.from,J.to);return J.from+GU(q,Y,I.state.tabSize)}function DX(I,Z,J){let Q=I.lineBlockAt(Z);if(Array.isArray(Q.type)){let X;for(let Y of Q.type){if(Y.from>Z)break;if(Y.to<Z)continue;if(Y.from<Z&&Y.to>Z)return Y;if(!X||Y.type==V0.Text&&(X.type!=Y.type||(J<0?Y.from<Z:Y.to>Z)))X=Y}return X||Q}return Q}function XM(I,Z,J,Q){let X=DX(I,Z.head,Z.assoc||-1),Y=!Q||X.type!=V0.Text||!(I.lineWrapping||X.widgetLineBreaks)?null:I.coordsAtPos(Z.assoc<0&&Z.head>X.from?Z.head-1:Z.head);if(Y){let q=I.dom.getBoundingClientRect(),K=I.textDirectionAt(X.from),W=I.posAtCoords({x:J==(K==w1.LTR)?q.right-1:q.left+1,y:(Y.top+Y.bottom)/2});if(W!=null)return u.cursor(W,J?-1:1)}return u.cursor(J?X.to:X.from,J?-1:1)}function SU(I,Z,J,Q){let X=I.state.doc.lineAt(Z.head),Y=I.bidiSpans(X),q=I.textDirectionAt(X.from);for(let K=Z,W=null;;){let G=uR(X,Y,q,K,J),U=Vz;if(!G){if(X.number==(J?I.state.doc.lines:1))return K;U=`
`,X=I.state.doc.line(X.number+(J?1:-1)),Y=I.bidiSpans(X),G=I.visualLineSide(X,!J)}if(!W){if(!Q)return G;W=Q(U)}else if(!W(U))return K;K=G}}function YM(I,Z,J){let Q=I.state.charCategorizer(Z),X=Q(J);return(Y)=>{let q=Q(Y);if(X==D4.Space)X=q;return X==q}}function qM(I,Z,J,Q){let X=Z.head,Y=J?1:-1;if(X==(J?I.state.doc.length:0))return u.cursor(X,Z.assoc);let q=Z.goalColumn,K,W=I.contentDOM.getBoundingClientRect(),G=I.coordsAtPos(X,Z.assoc||((Z.empty?J:Z.head==Z.from)?1:-1)),U=I.documentTop;if(G){if(q==null)q=G.left-W.left;K=Y<0?G.top:G.bottom}else{let H=I.viewState.lineBlockAt(X);if(q==null)q=Math.min(W.right-W.left,I.defaultCharacterWidth*(X-H.from));K=(Y<0?H.top:H.bottom)+U}let z=W.left+q,j=I.viewState.heightOracle.textHeight>>1,O=Q!==null&&Q!==void 0?Q:j;for(let H=0;;H+=j){let N=K+(O+H)*Y,M=LX(I,{x:z,y:N},!1,Y);if(J?N>W.bottom:N<W.top)return u.cursor(M.pos,M.assoc);let _=I.coordsAtPos(M.pos,M.assoc),T=_?(_.top+_.bottom)/2:0;if(!_||(J?T>K:T<K))return u.cursor(M.pos,M.assoc,void 0,q)}}function z3(I,Z,J){for(;;){let Q=0;for(let X of I)X.between(Z-1,Z+1,(Y,q,K)=>{if(Z>Y&&Z<q){let W=Q||J||(Z-Y<q-Z?-1:1);Z=W<0?Y:q,Q=W}});if(!Q)return Z}}function nz(I,Z){let J=null;for(let Q=0;Q<Z.ranges.length;Q++){let X=Z.ranges[Q],Y=null;if(X.empty){let q=z3(I,X.from,0);if(q!=X.from)Y=u.cursor(q,-1)}else{let q=z3(I,X.from,-1),K=z3(I,X.to,1);if(q!=X.from||K!=X.to)if(X.undirectional)Y=u.undirectionalRange(X.from,X.to);else Y=u.range(X.from==X.anchor?q:K,X.from==X.head?q:K)}if(Y){if(!J)J=Z.ranges.slice();J[Q]=Y}}return J?u.create(J,Z.mainIndex):Z}function YX(I,Z,J){let Q=z3(I.state.facet(R3).map((X)=>X(I)),J.from,Z.head>J.from?-1:1);return Q==J.from?J:u.cursor(Q,Q<J.from?1:-1)}class S4{constructor(I,Z){this.pos=I,this.assoc=Z}}function LX(I,Z,J,Q){let X=I.contentDOM.getBoundingClientRect(),Y=X.top+I.viewState.paddingTop,{x:q,y:K}=Z,W=K-Y,G;for(;;){if(W<0)return new S4(0,1);if(W>I.viewState.docHeight)return new S4(I.state.doc.length,-1);if(G=I.elementAtHeight(W),Q==null)break;if(G.type==V0.Text){if(Q<0?G.to<I.viewport.from:G.from>I.viewport.to)break;let j=I.docView.coordsAt(Q<0?G.from:G.to,Q>0?-1:1);if(j&&(Q<0?j.top<=W+Y:j.bottom>=W+Y))break}let z=I.viewState.heightOracle.textHeight/2;W=Q>0?G.bottom+z:G.top-z}if(I.viewport.from>=G.to||I.viewport.to<=G.from){if(J)return null;if(G.type==V0.Text){let z=QM(I,X,G,q,K);return new S4(z,z==G.from?1:-1)}}if(G.type!=V0.Text)return W<(G.top+G.bottom)/2?new S4(G.from,1):new S4(G.to,-1);let U=I.docView.lineAt(G.from,2);if(!U||U.length!=G.length)U=I.docView.lineAt(G.from,-2);return new gz(I,q,K,I.textDirectionAt(G.from)).scanTile(U,G.from)}class gz{constructor(I,Z,J,Q){this.view=I,this.x=Z,this.y=J,this.baseDir=Q,this.line=null,this.spans=null}bidiSpansAt(I){if(!this.line||this.line.from>I||this.line.to<I)this.line=this.view.state.doc.lineAt(I),this.spans=this.view.bidiSpans(this.line);return this}baseDirAt(I,Z){let{line:J,spans:Q}=this.bidiSpansAt(I);return Q[E4.find(Q,I-J.from,-1,Z)].level==this.baseDir}dirAt(I,Z){let{line:J,spans:Q}=this.bidiSpansAt(I);return Q[E4.find(Q,I-J.from,-1,Z)].dir}bidiIn(I,Z){let{spans:J,line:Q}=this.bidiSpansAt(I);return J.length>1||J.length&&(J[0].level!=this.baseDir||J[0].to+Q.from<Z)}scan(I,Z,J=!1){let Q=0,X=I.length-1,Y=new Set,q=this.bidiIn(I[0],I[X]),K,W,G=-1,U=1e9,z;I:while(Q<X){let O=X-Q,H=Q+X>>1;Z:if(Y.has(H)){for(let _=1;_<O;_++){let T=H+_;if(T>=X)T-=O;if(!Y.has(T)){H=T;break Z}}break I}Y.add(H);let N=Z(H),M=0;if(N)for(let _=0;_<N.length;_++){let T=N[_];if(T.width==0&&N.length>1)continue;if(T.bottom<this.y){if(!K||K.bottom<T.bottom)K=T;M=1}else if(T.top>this.y){if(!W||W.top>T.top)W=T;M=-1}else{let h=T.left>this.x?this.x-T.left:T.right<this.x?this.x-T.right:0,w=Math.abs(h);if(w<U)G=H,U=w,z=T;if(h)M=h<0==(this.baseDir==w1.LTR)?-1:1}}if(M==-1&&(!q||this.baseDirAt(I[H],1)))X=H;else if(M==1&&(!q||this.baseDirAt(I[H+1],-1)))Q=H+1}if(!z){if(!W&&!K)return{i:I[0],after:!1};let O=K&&(!W||this.y-K.bottom<W.top-this.y)?K:W;return this.y=(O.top+O.bottom)/2,this.scan(I,Z,!0)}if(U&&!J){let{top:O,bottom:H}=z;if(K&&K.bottom>(O+O+H)/3)return this.y=K.bottom-1,this.scan(I,Z,!0);if(W&&W.top<(O+H+H)/3)return this.y=W.top+1,this.scan(I,Z,!0)}let j=(q?this.dirAt(I[G],1):this.baseDir)==w1.LTR;return{i:G,after:this.x>(z.left+z.right)/2==j}}scanText(I,Z){let J=[];for(let X=0;X<I.length;X=q0(I.text,X))J.push(Z+X);J.push(Z+I.length);let Q=this.scan(J,(X)=>{let Y=J[X]-Z,q=J[X+1]-Z;return O3(I.dom,Y,q).getClientRects()});return Q.after?new S4(J[Q.i+1],-1):new S4(J[Q.i],1)}scanTile(I,Z){if(!I.length)return new S4(Z,1);if(I.children.length==1){let q=I.children[0];if(q.isText())return this.scanText(q,Z);else if(q.isComposite())return this.scanTile(q,Z)}let J=[Z];for(let q=0,K=Z;q<I.children.length;q++)J.push(K+=I.children[q].length);let Q=this.scan(J,(q)=>{let K=I.children[q];if(K.flags&48)return null;return(K.dom.nodeType==1?K.dom:O3(K.dom,0,K.length)).getClientRects()}),X=I.children[Q.i],Y=J[Q.i];if(X.isText())return this.scanText(X,Y);if(X.isComposite())return this.scanTile(X,Y);return Q.after?new S4(J[Q.i+1],-1):new S4(Y,1)}}var y8="￿";class fz{constructor(I,Z){this.points=I,this.view=Z,this.text="",this.lineSeparator=Z.state.facet(L1.lineSeparator)}append(I){this.text+=I}lineBreak(){this.text+=y8}readRange(I,Z){if(!I)return this;let J=I.parentNode;for(let Q=I;;){this.findPointBefore(J,Q);let X=this.text.length;this.readNode(Q);let Y=p1.get(Q),q=Q.nextSibling;if(q==Z){if((Y===null||Y===void 0?void 0:Y.breakAfter)&&!q&&J!=this.view.contentDOM)this.lineBreak();break}let K=p1.get(q);if((Y&&K?Y.breakAfter:(Y?Y.breakAfter:wI(Q))||wI(q)&&(Q.nodeName!="BR"||(Y===null||Y===void 0?void 0:Y.isWidget()))&&this.text.length>X)&&!WM(q,Z))this.lineBreak();Q=q}return this.findPointBefore(J,Z),this}readTextNode(I){let Z=I.nodeValue;for(let J of this.points)if(J.node==I)J.pos=this.text.length+Math.min(J.offset,Z.length);for(let J=0,Q=this.lineSeparator?null:/\r\n?|\n/g;;){let X=-1,Y=1,q;if(this.lineSeparator)X=Z.indexOf(this.lineSeparator,J),Y=this.lineSeparator.length;else if(q=Q.exec(Z))X=q.index,Y=q[0].length;if(this.append(Z.slice(J,X<0?Z.length:X)),X<0)break;if(this.lineBreak(),Y>1){for(let K of this.points)if(K.node==I&&K.pos>this.text.length)K.pos-=Y-1}J=X+Y}}readNode(I){let Z=p1.get(I),J=Z&&Z.overrideDOMText;if(J!=null){this.findPointInside(I,J.length);for(let Q=J.iter();!Q.next().done;)if(Q.lineBreak)this.lineBreak();else this.append(Q.value)}else if(I.nodeType==3)this.readTextNode(I);else if(I.nodeName=="BR"){if(I.nextSibling)this.lineBreak()}else if(I.nodeType==1)this.readRange(I.firstChild,null)}findPointBefore(I,Z){for(let J of this.points)if(J.node==I&&I.childNodes[J.offset]==Z)J.pos=this.text.length}findPointInside(I,Z){for(let J of this.points)if(I.nodeType==3?J.node==I:I.contains(J.node))J.pos=this.text.length+(KM(I,J.node,J.offset)?Z:0)}}function KM(I,Z,J){for(;;){if(!Z||J<P6(Z))return!1;if(Z==I)return!0;J=r6(Z)+1,Z=Z.parentNode}}function WM(I,Z){let J;for(;;I=I.nextSibling){if(I==Z||!I)break;let Q=p1.get(I);if(!(Q===null||Q===void 0?void 0:Q.isWidget()))return!1;if(Q)(J||(J=[])).push(Q)}if(J)for(let Q of J){let X=Q.overrideDOMText;if(X===null||X===void 0?void 0:X.length)return!1}return!0}class BX{constructor(I,Z){this.node=I,this.offset=Z,this.pos=-1}}class uz{constructor(I,Z,J,Q){this.typeOver=Q,this.bounds=null,this.text="",this.domChanged=Z>-1;let{impreciseHead:X,impreciseAnchor:Y}=I.docView,q=I.state.selection;if(I.state.readOnly&&Z>-1)this.newSel=null;else if(Z>-1&&(this.bounds=$z(I.docView.tile,Z,J,0))){let K=X||Y?[]:UM(I),W=new fz(K,I);W.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=W.text,this.newSel=zM(K,this.bounds.from)}else{let K=I.observer.selectionRange,W=X&&X.node==K.focusNode&&X.offset==K.focusOffset||!OX(I.contentDOM,K.focusNode)?q.main.head:I.docView.posFromDOM(K.focusNode,K.focusOffset),G=Y&&Y.node==K.anchorNode&&Y.offset==K.anchorOffset||!OX(I.contentDOM,K.anchorNode)?q.main.anchor:I.docView.posFromDOM(K.anchorNode,K.anchorOffset),U=I.viewport;if((r.ios||r.chrome)&&W!=G&&Math.min(W,G)<=q.main.from&&Math.max(W,G)>=q.main.to&&(U.from>0||U.to<I.state.doc.length)){let z=Math.min(W,G),j=Math.max(W,G),O=U.from-z,H=U.to-j;if((O==0||O==1||z==0)&&(H==0||H==-1||j==I.state.doc.length))W=0,G=I.state.doc.length}if(I.inputState.composing>-1&&q.ranges.length>1)this.newSel=q.replaceRange(u.range(G,W));else if(I.lineWrapping&&G==W&&!(q.main.empty&&q.main.head==W)&&I.inputState.lastTouchTime>Date.now()-100){let z=I.coordsAtPos(W,-1),j=0;if(z)j=I.inputState.lastTouchY<=z.bottom?-1:1;this.newSel=u.create([u.cursor(W,j)])}else this.newSel=u.single(G,W)}}}function $z(I,Z,J,Q){if(I.isComposite()){let X=-1,Y=-1,q=-1,K=-1;for(let W=0,G=Q,U=Q;W<I.children.length;W++){let z=I.children[W],j=G+z.length;if(G<Z&&j>J)return $z(z,Z,J,G);if(j>=Z&&X==-1)X=W,Y=G;if(G>J&&z.dom.parentNode==I.dom){q=W,K=U;break}U=j,G=j+z.breakAfter}return{from:Y,to:K<0?Q+I.length:K,startDOM:(X?I.children[X-1].dom.nextSibling:null)||I.dom.firstChild,endDOM:q<I.children.length&&q>=0?I.children[q].dom:null}}else if(I.isText())return{from:Q,to:Q+I.length,startDOM:I.dom,endDOM:I.dom.nextSibling};else return null}function mz(I,Z){let J,{newSel:Q}=Z,{state:X}=I,Y=X.selection.main,q=I.inputState.lastKeyTime>Date.now()-100?I.inputState.lastKeyCode:-1;if(Z.bounds){let{from:K,to:W}=Z.bounds,G=Y.from,U=null;if(q===8||r.android&&Z.text.length<W-K)G=Y.to,U="end";let z=X.doc.sliceString(K,W,y8),j,O;if(!Y.empty&&Y.from>=K&&Y.to<=W&&(Z.typeOver||z!=Z.text)&&z.slice(0,Y.from-K)==Z.text.slice(0,Y.from-K)&&z.slice(Y.to-K)==Z.text.slice(j=Z.text.length-(z.length-(Y.to-K))))J={from:Y.from,to:Y.to,insert:M1.of(Z.text.slice(Y.from-K,j).split(y8))};else if(O=vz(z,Z.text,G-K,U)){if(r.chrome&&q==13&&O.toB==O.from+2&&Z.text.slice(O.from,O.toB)==y8+y8)O.toB--;J={from:K+O.from,to:K+O.toA,insert:M1.of(Z.text.slice(O.from,O.toB).split(y8))}}}else if(Q&&(!I.hasFocus&&X.facet(L6)||xI(Q,Y)))Q=null;if(!J&&!Q)return!1;if((r.mac||r.android)&&J&&J.from==J.to&&J.from==Y.head-1&&/^\. ?$/.test(J.insert.toString())&&I.contentDOM.getAttribute("autocorrect")=="off"){if(Q&&J.insert.length==2)Q=u.single(Q.main.anchor-1,Q.main.head-1);J={from:J.from,to:J.to,insert:M1.of([J.insert.toString().replace("."," ")])}}else if(X.doc.lineAt(Y.from).to<Y.to&&I.docView.lineHasWidget(Y.to)&&I.inputState.insertingTextAt>Date.now()-50)J={from:Y.from,to:Y.to,insert:X.toText(I.inputState.insertingText)};else if(r.chrome&&J&&J.from==J.to&&J.from==Y.head&&J.insert.toString()==`
 `&&I.lineWrapping){if(Q)Q=u.single(Q.main.anchor-1,Q.main.head-1);J={from:Y.from,to:Y.to,insert:M1.of([" "])}}if(J)return mX(I,J,Q,q);else if(Q&&!xI(Q,Y)){let K=!1,W="select";if(I.inputState.lastSelectionTime>Date.now()-50){if(I.inputState.lastSelectionOrigin=="select")K=!0;if(W=I.inputState.lastSelectionOrigin,W=="select.pointer")Q=nz(X.facet(R3).map((G)=>G(I)),Q)}return I.dispatch({selection:Q,scrollIntoView:K,userEvent:W}),!0}else return!1}function mX(I,Z,J,Q=-1){if(r.ios&&I.inputState.flushIOSKey(Z))return!0;let X=I.state.selection.main;if(r.android&&(Z.to==X.to&&(Z.from==X.from||Z.from==X.from-1&&I.state.sliceDoc(Z.from,X.from)==" ")&&Z.insert.length==1&&Z.insert.lines==2&&f8(I.contentDOM,"Enter",13)||(Z.from==X.from-1&&Z.to==X.to&&Z.insert.length==0||Q==8&&Z.insert.length<Z.to-Z.from&&Z.to>X.head)&&f8(I.contentDOM,"Backspace",8)||Z.from==X.from&&Z.to==X.to+1&&Z.insert.length==0&&f8(I.contentDOM,"Delete",46)))return!0;let Y=Z.insert.toString();if(I.inputState.composing>=0)I.inputState.composing++;let q,K=()=>q||(q=GM(I,Z,J));if(!I.state.facet(Nz).some((W)=>W(I,Z.from,Z.to,Y,K)))I.dispatch(K());return!0}function GM(I,Z,J){let Q,X=I.state,Y=X.selection.main,q=-1;if(Z.from==Z.to&&Z.from<Y.from||Z.from>Y.to){let W=Z.from<Y.from?-1:1,G=W<0?Y.from:Y.to,U=z3(X.facet(R3).map((z)=>z(I)),G,W);if(Z.from==U)q=U}if(q>-1)Q={changes:Z,selection:u.cursor(Z.from+Z.insert.length,-1)};else if(Z.from>=Y.from&&Z.to<=Y.to&&Z.to-Z.from>=(Y.to-Y.from)/3&&(!J||J.main.empty&&J.main.from==Z.from+Z.insert.length)&&I.inputState.composing<0){let W=Y.from<Z.from?X.sliceDoc(Y.from,Z.from):"",G=Y.to>Z.to?X.sliceDoc(Z.to,Y.to):"";Q=X.replaceSelection(I.state.toText(W+Z.insert.sliceString(0,void 0,I.state.lineBreak)+G))}else{let W=X.changes(Z),G=J&&J.main.to<=W.newLength?J.main:void 0;if(X.selection.ranges.length>1&&(I.inputState.composing>=0||I.inputState.compositionPendingChange)&&Z.to<=Y.to+10&&Z.to>=Y.to-10){let U=I.state.sliceDoc(Z.from,Z.to),z,j=J&&yz(I,J.main.head);if(j){let H=Z.insert.length-(Z.to-Z.from);z={from:j.from,to:j.to-H}}else z=I.state.doc.lineAt(Y.head);let O=Y.to-Z.to;Q=X.changeByRange((H)=>{if(H.from==Y.from&&H.to==Y.to)return{changes:W,range:G||H.map(W)};let N=H.to-O,M=N-U.length;if(I.state.sliceDoc(M,N)!=U||N>=z.from&&M<=z.to)return{range:H};let _=X.changes({from:M,to:N,insert:Z.insert}),T=H.to-Y.to;return{changes:_,range:!G?H.map(_):u.range(Math.max(0,G.anchor+T),Math.max(0,G.head+T))}})}else Q={changes:W,selection:G&&X.selection.replaceRange(G)}}let K="input.type";if(I.composing||I.inputState.compositionPendingChange&&I.inputState.compositionEndedAt>Date.now()-50){if(I.inputState.compositionPendingChange=!1,K+=".compose",I.inputState.compositionFirstChange)K+=".start",I.inputState.compositionFirstChange=!1}return X.update(Q,{userEvent:K,scrollIntoView:!0})}function vz(I,Z,J,Q){let X=Math.min(I.length,Z.length),Y=0;while(Y<X&&I.charCodeAt(Y)==Z.charCodeAt(Y))Y++;if(Y==X&&I.length==Z.length)return null;let q=I.length,K=Z.length;while(q>0&&K>0&&I.charCodeAt(q-1)==Z.charCodeAt(K-1))q--,K--;if(Q=="end"){let W=Math.max(0,Y-Math.min(q,K));J-=q+W-Y}if(q<Y&&I.length<Z.length){let W=J<=Y&&J>=q?Y-J:0;Y-=W,K=Y+(K-q),q=Y}else if(K<Y){let W=J<=Y&&J>=K?Y-J:0;Y-=W,q=Y+(q-K),K=Y}return{from:Y,toA:q,toB:K}}function UM(I){let Z=[];if(I.root.activeElement!=I.contentDOM)return Z;let{anchorNode:J,anchorOffset:Q,focusNode:X,focusOffset:Y}=I.observer.selectionRange;if(J){if(Z.push(new BX(J,Q)),X!=J||Y!=Q)Z.push(new BX(X,Y))}return Z}function zM(I,Z){if(I.length==0)return null;let J=I[0].pos,Q=I.length==2?I[1].pos:J;return J>-1&&Q>-1?u.single(J+Z,Q+Z):null}function xI(I,Z){return Z.head==I.main.head&&Z.anchor==I.main.anchor}class cz{setSelectionOrigin(I){this.lastSelectionOrigin=I,this.lastSelectionTime=Date.now()}constructor(I){if(this.view=I,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=I.hasFocus,r.safari)I.contentDOM.addEventListener("input",()=>null);if(r.gecko)_M(I.contentDOM.ownerDocument)}handleEvent(I){if(!MM(this.view,I)||this.ignoreDuringComposition(I))return;if(I.type=="keydown"&&this.keydown(I))return;if(this.view.updateState!=0)Promise.resolve().then(()=>this.runHandlers(I.type,I));else this.runHandlers(I.type,I)}runHandlers(I,Z){let J=this.handlers[I];if(J){for(let Q of J.observers)Q(this.view,Z);for(let Q of J.handlers){if(Z.defaultPrevented)break;if(Q(this.view,Z)){Z.preventDefault();break}}}}ensureHandlers(I){let Z=jM(I),J=this.handlers,Q=this.view.contentDOM;for(let X in Z)if(X!="scroll"){let Y=!Z[X].handlers.length,q=J[X];if(q&&Y!=!q.handlers.length)Q.removeEventListener(X,this.handleEvent),q=null;if(!q)Q.addEventListener(X,this.handleEvent,{passive:Y})}for(let X in J)if(X!="scroll"&&!Z[X])Q.removeEventListener(X,this.handleEvent);this.handlers=Z}keydown(I){if(this.lastKeyCode=I.keyCode,this.lastKeyTime=Date.now(),I.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&I.keyCode!=27&&sz.indexOf(I.keyCode)<0)this.tabFocusMode=-1;if(r.android&&r.chrome&&!I.synthetic&&(I.keyCode==13||I.keyCode==8))return this.view.observer.delayAndroidKey(I.key,I.keyCode),!0;if(r.ios&&!I.synthetic&&!I.altKey&&!I.metaKey&&(pz.some((Z)=>Z.keyCode==I.keyCode)&&!I.ctrlKey||OM.indexOf(I.key)>-1&&I.ctrlKey)){let Z={ctrlKey:I.ctrlKey,altKey:I.altKey,metaKey:I.metaKey,shiftKey:I.shiftKey};if(Z.shiftKey&&r.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&VM(this.view.win))Z.shiftKey=!1;return this.pendingIOSKey={key:I.key,keyCode:I.keyCode,mods:Z},setTimeout(()=>this.flushIOSKey(),250),!0}if(I.keyCode!=229)this.view.observer.forceFlush();return!1}flushIOSKey(I){let Z=this.pendingIOSKey;if(!Z)return!1;if(Z.key=="Enter"&&I&&I.from<I.to&&/^\S+$/.test(I.insert.toString()))return!1;return this.pendingIOSKey=void 0,f8(this.view.contentDOM,Z.key,Z.keyCode,Z.mods)}ignoreDuringComposition(I){if(!/^key/.test(I.type)||I.synthetic)return!1;if(this.composing>0)return!0;if(r.safari&&!r.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100)return this.compositionPendingKey=!1,!0;return!1}startMouseSelection(I){if(this.mouseSelection)this.mouseSelection.destroy();this.mouseSelection=I}update(I){if(this.view.observer.update(I),this.mouseSelection)this.mouseSelection.update(I);if(this.draggedContent&&I.docChanged)this.draggedContent=this.draggedContent.map(I.changes);if(I.transactions.length)this.lastKeyCode=this.lastSelectionTime=0}destroy(){if(this.mouseSelection)this.mouseSelection.destroy()}}function VM(I){if(!I.visualViewport)return!1;return I.visualViewport.height*I.visualViewport.scale/I.document.documentElement.clientHeight<0.85}function _U(I,Z){return(J,Q)=>{try{return Z.call(I,Q,J)}catch(X){d0(J.state,X)}}}function jM(I){let Z=Object.create(null);function J(Q){return Z[Q]||(Z[Q]={observers:[],handlers:[]})}for(let Q of I){let X=Q.spec,Y=X&&X.plugin.domEventHandlers,q=X&&X.plugin.domEventObservers;if(Y)for(let K in Y){let W=Y[K];if(W)J(K).handlers.push(_U(Q.value,W))}if(q)for(let K in q){let W=q[K];if(W)J(K).observers.push(_U(Q.value,W))}}for(let Q in h4)J(Q).handlers.push(h4[Q]);for(let Q in h0)J(Q).observers.push(h0[Q]);return Z}var pz=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],OM="dthko",sz=[16,17,18,20,91,92,224,225],OI=6;function FI(I){return Math.max(0,I)*0.7+8}function FM(I,Z){return Math.max(Math.abs(I.clientX-Z.clientX),Math.abs(I.clientY-Z.clientY))}class dz{constructor(I,Z,J,Q){this.view=I,this.startEvent=Z,this.style=J,this.mustSelect=Q,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=Z,this.scrollParents=Iz(I.contentDOM),this.atoms=I.state.facet(R3).map((Y)=>Y(I));let X=I.contentDOM.ownerDocument;X.addEventListener("mousemove",this.move=this.move.bind(this)),X.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=Z.shiftKey,this.multiple=I.state.facet(L1.allowMultipleSelections)&&HM(I,Z),this.dragging=RM(I,Z)&&rz(Z)==1?null:!1}start(I){if(this.dragging===!1)this.select(I)}move(I){if(I.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&FM(this.startEvent,I)<10)return;this.select(this.lastEvent=I);let Z=0,J=0,Q=0,X=0,Y=this.view.win.innerWidth,q=this.view.win.innerHeight;if(this.scrollParents.x)({left:Q,right:Y}=this.scrollParents.x.getBoundingClientRect());if(this.scrollParents.y)({top:X,bottom:q}=this.scrollParents.y.getBoundingClientRect());let K=$X(this.view);if(I.clientX-K.left<=Q+OI)Z=-FI(Q-I.clientX);else if(I.clientX+K.right>=Y-OI)Z=FI(I.clientX-Y);if(I.clientY-K.top<=X+OI)J=-FI(X-I.clientY);else if(I.clientY+K.bottom>=q-OI)J=FI(I.clientY-q);this.setScrollSpeed(Z,J)}up(I){if(this.dragging==null)this.select(this.lastEvent);if(!this.dragging)I.preventDefault();this.destroy()}destroy(){this.setScrollSpeed(0,0);let I=this.view.contentDOM.ownerDocument;I.removeEventListener("mousemove",this.move),I.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(I,Z){if(this.scrollSpeed={x:I,y:Z},I||Z){if(this.scrolling<0)this.scrolling=setInterval(()=>this.scroll(),50)}else if(this.scrolling>-1)clearInterval(this.scrolling),this.scrolling=-1}scroll(){let{x:I,y:Z}=this.scrollSpeed;if(I&&this.scrollParents.x)this.scrollParents.x.scrollLeft+=I,I=0;if(Z&&this.scrollParents.y)this.scrollParents.y.scrollTop+=Z,Z=0;if(I||Z)this.view.win.scrollBy(I,Z);if(this.dragging===!1)this.select(this.lastEvent)}select(I){let{view:Z}=this,J=nz(this.atoms,this.style.get(I,this.extend,this.multiple));if(this.mustSelect||!J.eq(Z.state.selection,this.dragging===!1))this.view.dispatch({selection:J,userEvent:"select.pointer"});this.mustSelect=!1}update(I){if(I.transactions.some((Z)=>Z.isUserEvent("input.type")))this.destroy();else if(this.style.update(I))setTimeout(()=>this.select(this.lastEvent),20)}}function HM(I,Z){let J=I.state.facet(jz);return J.length?J[0](Z):r.mac?Z.metaKey:Z.ctrlKey}function NM(I,Z){let J=I.state.facet(Oz);return J.length?J[0](Z):r.mac?!Z.altKey:!Z.ctrlKey}function RM(I,Z){let{main:J}=I.state.selection;if(J.empty)return!1;let Q=j3(I.root);if(!Q||Q.rangeCount==0)return!0;let X=Q.getRangeAt(0).getClientRects();for(let Y=0;Y<X.length;Y++){let q=X[Y];if(q.left<=Z.clientX&&q.right>=Z.clientX&&q.top<=Z.clientY&&q.bottom>=Z.clientY)return!0}return!1}function MM(I,Z){if(!Z.bubbles)return!0;if(Z.defaultPrevented)return!1;for(let J=Z.target,Q;J!=I.contentDOM;J=J.parentNode)if(!J||J.nodeType==11||(Q=p1.get(J))&&Q.isWidget()&&!Q.isHidden&&Q.widget.ignoreEvent(Z))return!1;return!0}var h4=Object.create(null),h0=Object.create(null),iz=r.ie&&r.ie_version<15||r.ios&&r.webkit_version<604;function AM(I){let Z=I.dom.parentNode;if(!Z)return;let J=Z.appendChild(document.createElement("textarea"));J.style.cssText="position: fixed; left: -10000px; top: 10px",J.focus(),setTimeout(()=>{I.focus(),J.remove(),lz(I,J.value)},50)}function mI(I,Z,J){for(let Q of I.facet(Z))J=Q(J,I);return J}function lz(I,Z){Z=mI(I.state,nX,Z);let{state:J}=I,Q,X=1,Y=J.toText(Z),q=Y.lines==J.selection.ranges.length;if(PX!=null&&J.selection.ranges.every((W)=>W.empty)&&PX==Y.toString()){let W=-1;Q=J.changeByRange((G)=>{let U=J.doc.lineAt(G.from);if(U.from==W)return{range:G};W=U.from;let z=J.toText((q?Y.line(X++).text:Z)+J.lineBreak);return{changes:{from:U.from,insert:z},range:u.cursor(G.from+z.length)}})}else if(q)Q=J.changeByRange((W)=>{let G=Y.line(X++);return{changes:{from:W.from,to:W.to,insert:G.text},range:u.cursor(W.from+G.length)}});else Q=J.replaceSelection(Y);I.dispatch(Q,{userEvent:"input.paste",scrollIntoView:!0})}h0.scroll=(I)=>{let Z=I.inputState;if(Z.lastScrollTop=I.scrollDOM.scrollTop,Z.lastScrollLeft=I.scrollDOM.scrollLeft,r.ios&&!Z.touchActive)Z.lastIOSMomentumScroll=Date.now()};h0.wheel=h0.mousewheel=(I)=>{I.inputState.lastWheelEvent=Date.now()};h4.keydown=(I,Z)=>{if(I.inputState.setSelectionOrigin("select"),Z.keyCode==27&&I.inputState.tabFocusMode!=0)I.inputState.tabFocusMode=Date.now()+2000;return!1};h0.touchstart=(I,Z)=>{let J=I.inputState,Q=Z.targetTouches[0];if(J.touchActive=!0,J.lastTouchTime=Date.now(),Q)J.lastTouchX=Q.clientX,J.lastTouchY=Q.clientY;J.setSelectionOrigin("select.pointer")};h0.touchmove=(I)=>{I.inputState.setSelectionOrigin("select.pointer")};h0.touchend=(I,Z)=>{I.inputState.touchActive=!1};h4.mousedown=(I,Z)=>{if(I.observer.flush(),I.inputState.lastTouchTime>Date.now()-2000)return!1;let J=null;for(let Q of I.state.facet(Fz))if(J=Q(I,Z),J)break;if(!J&&Z.button==0)J=LM(I,Z);if(J){let Q=!I.hasFocus;if(I.inputState.startMouseSelection(new dz(I,Z,J,Q)),Q)I.observer.ignore(()=>{Xz(I.contentDOM);let Y=I.root.activeElement;if(Y&&!Y.contains(I.contentDOM))Y.blur()});let X=I.inputState.mouseSelection;if(X)return X.start(Z),X.dragging===!1}else I.inputState.setSelectionOrigin("select.pointer");return!1};function TU(I,Z,J,Q){if(Q==1)return u.cursor(Z,J);else if(Q==2)return JM(I.state,Z,J);else{let X=I.docView.lineAt(Z,J),Y=I.state.doc.lineAt(X?X.posAtEnd:Z),q=X?X.posAtStart:Y.from,K=X?X.posAtEnd:Y.to;if(K<I.state.doc.length&&K==Y.to)K++;return u.undirectionalRange(q,K)}}var DM=r.ie&&r.ie_version<=11,EU=null,hU=0,CU=0;function rz(I){if(!DM)return I.detail;let Z=EU,J=CU;return EU=I,CU=Date.now(),hU=!Z||J>Date.now()-400&&Math.abs(Z.clientX-I.clientX)<2&&Math.abs(Z.clientY-I.clientY)<2?(hU+1)%3:1}function LM(I,Z){let J=I.posAndSideAtCoords({x:Z.clientX,y:Z.clientY},!1),Q=rz(Z),X=I.state.selection;return{update(Y){if(Y.docChanged)J.pos=Y.changes.mapPos(J.pos),X=X.map(Y.changes)},get(Y,q,K){let W=I.posAndSideAtCoords({x:Y.clientX,y:Y.clientY},!1),G,U=TU(I,W.pos,W.assoc,Q);if(J.pos!=W.pos&&!q){let z=TU(I,J.pos,J.assoc,Q),j=Math.min(z.from,U.from),O=Math.max(z.to,U.to);U=j<U.from?u.range(j,O,U.assoc):u.range(O,j,U.assoc)}if(q)return X.replaceRange(X.main.extend(U.from,U.to,U.assoc));else if(K&&Q==1&&X.ranges.length>1&&(G=BM(X,W.pos)))return G;else if(K)return X.addRange(U);else return u.create([U])}}}function BM(I,Z){for(let J=0;J<I.ranges.length;J++){let{from:Q,to:X}=I.ranges[J];if(Q<=Z&&X>=Z)return u.create(I.ranges.slice(0,J).concat(I.ranges.slice(J+1)),I.mainIndex==J?0:I.mainIndex-(I.mainIndex>J?1:0))}return null}h4.dragstart=(I,Z)=>{let{selection:{main:J}}=I.state;if(Z.target.draggable){let X=I.docView.tile.nearest(Z.target);if(X&&X.isWidget()){let Y=X.posAtStart,q=Y+X.length;if(Y>=J.to||q<=J.from)J=u.undirectionalRange(Y,q)}}let{inputState:Q}=I;if(Q.mouseSelection)Q.mouseSelection.dragging=!0;if(Q.draggedContent=J,Z.dataTransfer)Z.dataTransfer.setData("Text",mI(I.state,gX,I.state.sliceDoc(J.from,J.to))),Z.dataTransfer.effectAllowed="copyMove";return!1};h4.dragend=(I)=>{return I.inputState.draggedContent=null,!1};function wU(I,Z,J,Q){if(J=mI(I.state,nX,J),!J)return;let X=I.posAtCoords({x:Z.clientX,y:Z.clientY},!1),{draggedContent:Y}=I.inputState,q=Q&&Y&&NM(I,Z)?{from:Y.from,to:Y.to}:null,K={from:X,insert:J},W=I.state.changes(q?[q,K]:K);I.focus(),I.dispatch({changes:W,selection:{anchor:W.mapPos(X,-1),head:W.mapPos(X,1)},userEvent:q?"move.drop":"input.drop"}),I.inputState.draggedContent=null}h4.drop=(I,Z)=>{if(!Z.dataTransfer)return!1;if(I.state.readOnly)return!0;let J=Z.dataTransfer.files;if(J&&J.length){let Q=Array(J.length),X=0,Y=()=>{if(++X==J.length)wU(I,Z,Q.filter((q)=>q!=null).join(I.state.lineBreak),!1)};for(let q=0;q<J.length;q++){let K=new FileReader;K.onerror=Y,K.onload=()=>{if(!/[\x00-\x08\x0e-\x1f]{2}/.test(K.result))Q[q]=K.result;Y()},K.readAsText(J[q])}return!0}else{let Q=Z.dataTransfer.getData("Text");if(Q)return wU(I,Z,Q,!0),!0}return!1};h4.paste=(I,Z)=>{if(I.state.readOnly)return!0;I.observer.flush();let J=iz?null:Z.clipboardData;if(J)return lz(I,J.getData("text/plain")||J.getData("text/uri-list")),!0;else return AM(I),!1};function PM(I,Z){let J=I.dom.parentNode;if(!J)return;let Q=J.appendChild(document.createElement("textarea"));Q.style.cssText="position: fixed; left: -10000px; top: 10px",Q.value=Z,Q.focus(),Q.selectionEnd=Z.length,Q.selectionStart=0,setTimeout(()=>{Q.remove(),I.focus()},50)}function SM(I){let Z=[],J=[],Q=!1;for(let X of I.selection.ranges)if(!X.empty)Z.push(I.sliceDoc(X.from,X.to)),J.push(X);if(!Z.length){let X=-1;for(let{from:Y}of I.selection.ranges){let q=I.doc.lineAt(Y);if(q.number>X)Z.push(q.text),J.push({from:q.from,to:Math.min(I.doc.length,q.to+1)});X=q.number}Q=!0}return{text:mI(I,gX,Z.join(I.lineBreak)),ranges:J,linewise:Q}}var PX=null;h4.copy=h4.cut=(I,Z)=>{if(!G3(I.contentDOM,I.observer.selectionRange))return!1;let{text:J,ranges:Q,linewise:X}=SM(I.state);if(!J&&!X)return!1;if(PX=X?J:null,Z.type=="cut"&&!I.state.readOnly)I.dispatch({changes:Q,scrollIntoView:!0,userEvent:"delete.cut"});let Y=iz?null:Z.clipboardData;if(Y)return Y.clearData(),Y.setData("text/plain",J),!0;else return PM(I,J),!1};var az=B4.define();function tz(I,Z){let J=[];for(let Q of I.facet(Rz)){let X=Q(I,Z);if(X)J.push(X)}return J.length?I.update({effects:J,annotations:az.of(!0)}):null}function oz(I){setTimeout(()=>{let Z=I.hasFocus;if(Z!=I.inputState.notifiedFocused){let J=tz(I.state,Z);if(J)I.dispatch(J);else I.update([])}},10)}h0.focus=(I)=>{if(I.inputState.lastFocusTime=Date.now(),!I.scrollDOM.scrollTop&&(I.inputState.lastScrollTop||I.inputState.lastScrollLeft))I.scrollDOM.scrollTop=I.inputState.lastScrollTop,I.scrollDOM.scrollLeft=I.inputState.lastScrollLeft;oz(I)};h0.blur=(I)=>{I.observer.clearSelectionRange(),oz(I)};h0.compositionstart=h0.compositionupdate=(I)=>{if(I.observer.editContext)return;if(I.inputState.compositionFirstChange==null)I.inputState.compositionFirstChange=!0;if(I.inputState.composing<0)I.inputState.composing=0};h0.compositionend=(I)=>{if(I.observer.editContext)return;if(I.inputState.composing=-1,I.inputState.compositionEndedAt=Date.now(),I.inputState.compositionPendingKey=!0,I.inputState.compositionPendingChange=I.observer.pendingRecords().length>0,I.inputState.compositionFirstChange=null,r.chrome&&r.android)I.observer.flushSoon();else if(I.inputState.compositionPendingChange)Promise.resolve().then(()=>I.observer.flush());else setTimeout(()=>{if(I.inputState.composing<0&&I.docView.hasComposition)I.update([])},50)};h0.contextmenu=(I)=>{I.inputState.lastContextMenu=Date.now()};h4.beforeinput=(I,Z)=>{var J,Q;if(Z.inputType=="insertText"||Z.inputType=="insertCompositionText")I.inputState.insertingText=Z.data,I.inputState.insertingTextAt=Date.now();if(Z.inputType=="insertReplacementText"&&I.observer.editContext){let Y=(J=Z.dataTransfer)===null||J===void 0?void 0:J.getData("text/plain"),q=Z.getTargetRanges();if(Y&&q.length){let K=q[0],W=I.posAtDOM(K.startContainer,K.startOffset),G=I.posAtDOM(K.endContainer,K.endOffset);return mX(I,{from:W,to:G,insert:I.state.toText(Y)},null),!0}}let X;if(r.chrome&&r.android&&(X=pz.find((Y)=>Y.inputType==Z.inputType))){if(I.observer.delayAndroidKey(X.key,X.keyCode),X.key=="Backspace"||X.key=="Delete"){let Y=((Q=window.visualViewport)===null||Q===void 0?void 0:Q.height)||0;setTimeout(()=>{var q;if((((q=window.visualViewport)===null||q===void 0?void 0:q.height)||0)>Y+10&&I.hasFocus)I.contentDOM.blur(),I.focus()},100)}}if(r.ios&&Z.inputType=="deleteContentForward")I.observer.flushSoon();if(r.safari&&Z.inputType=="insertText"&&I.inputState.composing>=0)setTimeout(()=>h0.compositionend(I,Z),20);return!1};var kU=new Set;function _M(I){if(!kU.has(I))kU.add(I),I.addEventListener("copy",()=>{}),I.addEventListener("cut",()=>{})}var bU=["pre-wrap","normal","pre-line","break-spaces"],m8=!1;function yU(){m8=!1}class ez{constructor(I){this.lineWrapping=I,this.doc=M1.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(I,Z){let J=this.doc.lineAt(Z).number-this.doc.lineAt(I).number+1;if(this.lineWrapping)J+=Math.max(0,Math.ceil((Z-I-J*this.lineLength*0.5)/this.lineLength));return this.lineHeight*J}heightForLine(I){if(!this.lineWrapping)return this.lineHeight;return(1+Math.max(0,Math.ceil((I-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight}setDoc(I){return this.doc=I,this}mustRefreshForWrapping(I){return bU.indexOf(I)>-1!=this.lineWrapping}mustRefreshForHeights(I){let Z=!1;for(let J=0;J<I.length;J++){let Q=I[J];if(Q<0)J++;else if(!this.heightSamples[Math.floor(Q*10)])Z=!0,this.heightSamples[Math.floor(Q*10)]=!0}return Z}refresh(I,Z,J,Q,X,Y){let q=bU.indexOf(I)>-1,K=Math.abs(Z-this.lineHeight)>0.3||this.lineWrapping!=q;if(this.lineWrapping=q,this.lineHeight=Z,this.charWidth=J,this.textHeight=Q,this.lineLength=X,K){this.heightSamples={};for(let W=0;W<Y.length;W++){let G=Y[W];if(G<0)W++;else this.heightSamples[Math.floor(G*10)]=!0}}return K}}class IV{constructor(I,Z){this.from=I,this.heights=Z,this.index=0}get more(){return this.index<this.heights.length}}class _4{constructor(I,Z,J,Q,X){this.from=I,this.length=Z,this.top=J,this.height=Q,this._content=X}get type(){return typeof this._content=="number"?V0.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof p5?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(I){let Z=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(I._content)?I._content:[I]);return new _4(this.from,this.length+I.length,this.top,this.height+I.height,Z)}}var n1=function(I){return I[I.ByPos=0]="ByPos",I[I.ByHeight=1]="ByHeight",I[I.ByPosNoHeight=2]="ByPosNoHeight",I}(n1||(n1={})),SI=0.001;class E0{constructor(I,Z,J=2){this.length=I,this.height=Z,this.flags=J}get outdated(){return(this.flags&2)>0}set outdated(I){this.flags=(I?2:0)|this.flags&-3}setHeight(I){if(this.height!=I){if(Math.abs(this.height-I)>SI)m8=!0;this.height=I}}replace(I,Z,J){return E0.of(J)}decomposeLeft(I,Z){Z.push(this)}decomposeRight(I,Z){Z.push(this)}applyChanges(I,Z,J,Q){let X=this,Y=J.doc;for(let q=Q.length-1;q>=0;q--){let{fromA:K,toA:W,fromB:G,toB:U}=Q[q],z=X.lineAt(K,n1.ByPosNoHeight,J.setDoc(Z),0,0),j=z.to>=W?z:X.lineAt(W,n1.ByPosNoHeight,J,0,0);U+=j.to-W,W=j.to;while(q>0&&z.from<=Q[q-1].toA)if(K=Q[q-1].fromA,G=Q[q-1].fromB,q--,K<z.from)z=X.lineAt(K,n1.ByPosNoHeight,J,0,0);G+=z.from-K,K=z.from;let O=cX.build(J.setDoc(Y),I,G,U);X=nI(X,X.replace(K,W,O))}return X.updateHeight(J,0)}static empty(){return new s0(0,0,0)}static of(I){if(I.length==1)return I[0];let Z=0,J=I.length,Q=0,X=0;for(;;)if(Z==J)if(Q>X*2){let q=I[Z-1];if(q.break)I.splice(--Z,1,q.left,null,q.right);else I.splice(--Z,1,q.left,q.right);J+=1+q.break,Q-=q.size}else if(X>Q*2){let q=I[J];if(q.break)I.splice(J,1,q.left,null,q.right);else I.splice(J,1,q.left,q.right);J+=2+q.break,X-=q.size}else break;else if(Q<X){let q=I[Z++];if(q)Q+=q.size}else{let q=I[--J];if(q)X+=q.size}let Y=0;if(I[Z-1]==null)Y=1,Z--;else if(I[Z]==null)Y=1,J++;return new ZV(E0.of(I.slice(0,Z)),Y,E0.of(I.slice(J)))}}function nI(I,Z){if(I==Z)return I;if(I.constructor!=Z.constructor)m8=!0;return Z}E0.prototype.size=1;var TM=P1.replace({});class vX extends E0{constructor(I,Z,J){super(I,Z);this.deco=J,this.spaceAbove=0}mainBlock(I,Z){return new _4(Z,this.length,I+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(I,Z,J,Q){return this.spaceAbove&&I<J+this.spaceAbove?new _4(Q,0,J,this.spaceAbove,TM):this.mainBlock(J,Q)}lineAt(I,Z,J,Q,X){let Y=this.mainBlock(Q,X);return this.spaceAbove?this.blockAt(0,J,Q,X).join(Y):Y}forEachLine(I,Z,J,Q,X,Y){if(I<=X+this.length&&Z>=X)Y(this.lineAt(0,n1.ByPos,J,Q,X))}setMeasuredHeight(I){let Z=I.heights[I.index++];if(Z<0)this.spaceAbove=-Z,Z=I.heights[I.index++];else this.spaceAbove=0;this.setHeight(Z)}updateHeight(I,Z=0,J=!1,Q){if(Q&&Q.from<=Z&&Q.more)this.setMeasuredHeight(Q);return this.outdated=!1,this}toString(){return`block(${this.length})`}}class s0 extends vX{constructor(I,Z,J){super(I,Z,null);this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=J}mainBlock(I,Z){return new _4(Z,this.length,I+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(I,Z,J){let Q=J[0];if(J.length==1&&(Q instanceof s0||Q instanceof z0&&Q.flags&4)&&Math.abs(this.length-Q.length)<10){if(Q instanceof z0)Q=new s0(Q.length,this.height,this.spaceAbove);else Q.height=this.height;if(!this.outdated)Q.outdated=!1;return Q}else return E0.of(J)}updateHeight(I,Z=0,J=!1,Q){if(Q&&Q.from<=Z&&Q.more)this.setMeasuredHeight(Q);else if(J||this.outdated)this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,I.heightForLine(this.length-this.collapsed))+this.breaks*I.lineHeight);return this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class z0 extends E0{constructor(I){super(I,0)}heightMetrics(I,Z){let J=I.doc.lineAt(Z).number,Q=I.doc.lineAt(Z+this.length).number,X=Q-J+1,Y,q=0;if(I.lineWrapping){let K=Math.min(this.height,I.lineHeight*X);if(Y=K/X,this.length>X+1)q=(this.height-K)/(this.length-X-1)}else Y=this.height/X;return{firstLine:J,lastLine:Q,perLine:Y,perChar:q}}blockAt(I,Z,J,Q){let{firstLine:X,lastLine:Y,perLine:q,perChar:K}=this.heightMetrics(Z,Q);if(Z.lineWrapping){let W=Q+(I<Z.lineHeight?0:Math.round(Math.max(0,Math.min(1,(I-J)/this.height))*this.length)),G=Z.doc.lineAt(W),U=q+G.length*K,z=Math.max(J,I-U/2);return new _4(G.from,G.length,z,U,0)}else{let W=Math.max(0,Math.min(Y-X,Math.floor((I-J)/q))),{from:G,length:U}=Z.doc.line(X+W);return new _4(G,U,J+q*W,q,0)}}lineAt(I,Z,J,Q,X){if(Z==n1.ByHeight)return this.blockAt(I,J,Q,X);if(Z==n1.ByPosNoHeight){let{from:j,to:O}=J.doc.lineAt(I);return new _4(j,O-j,0,0,0)}let{firstLine:Y,perLine:q,perChar:K}=this.heightMetrics(J,X),W=J.doc.lineAt(I),G=q+W.length*K,U=W.number-Y,z=Q+q*U+K*(W.from-X-U);return new _4(W.from,W.length,Math.max(Q,Math.min(z,Q+this.height-G)),G,0)}forEachLine(I,Z,J,Q,X,Y){I=Math.max(I,X),Z=Math.min(Z,X+this.length);let{firstLine:q,perLine:K,perChar:W}=this.heightMetrics(J,X);for(let G=I,U=Q;G<=Z;){let z=J.doc.lineAt(G);if(G==I){let O=z.number-q;U+=K*O+W*(I-X-O)}let j=K+W*z.length;Y(new _4(z.from,z.length,U,j,0)),U+=j,G=z.to+1}}replace(I,Z,J){let Q=this.length-Z;if(Q>0){let X=J[J.length-1];if(X instanceof z0)J[J.length-1]=new z0(X.length+Q);else J.push(null,new z0(Q-1))}if(I>0){let X=J[0];if(X instanceof z0)J[0]=new z0(I+X.length);else J.unshift(new z0(I-1),null)}return E0.of(J)}decomposeLeft(I,Z){Z.push(new z0(I-1),null)}decomposeRight(I,Z){Z.push(null,new z0(this.length-I-1))}updateHeight(I,Z=0,J=!1,Q){let X=Z+this.length;if(Q&&Q.from<=Z+this.length&&Q.more){let Y=[],q=Math.max(Z,Q.from),K=-1;if(Q.from>Z)Y.push(new z0(Q.from-Z-1).updateHeight(I,Z));while(q<=X&&Q.more){let G=I.doc.lineAt(q).length;if(Y.length)Y.push(null);let U=Q.heights[Q.index++],z=0;if(U<0)z=-U,U=Q.heights[Q.index++];if(K==-1)K=U;else if(Math.abs(U-K)>=SI)K=-2;let j=new s0(G,U,z);j.outdated=!1,Y.push(j),q+=G+1}if(q<=X)Y.push(null,new z0(X-q).updateHeight(I,q));let W=E0.of(Y);if(K<0||Math.abs(W.height-this.height)>=SI||Math.abs(K-this.heightMetrics(I,Z).perLine)>=SI)m8=!0;return nI(this,W)}else if(J||this.outdated)this.setHeight(I.heightForGap(Z,Z+this.length)),this.outdated=!1;return this}toString(){return`gap(${this.length})`}}class ZV extends E0{constructor(I,Z,J){super(I.length+Z+J.length,I.height+J.height,Z|(I.outdated||J.outdated?2:0));this.left=I,this.right=J,this.size=I.size+J.size}get break(){return this.flags&1}blockAt(I,Z,J,Q){let X=J+this.left.height;return I<X?this.left.blockAt(I,Z,J,Q):this.right.blockAt(I,Z,X,Q+this.left.length+this.break)}lineAt(I,Z,J,Q,X){let Y=Q+this.left.height,q=X+this.left.length+this.break,K=Z==n1.ByHeight?I<Y:I<q,W=K?this.left.lineAt(I,Z,J,Q,X):this.right.lineAt(I,Z,J,Y,q);if(this.break||(K?W.to<q:W.from>q))return W;let G=Z==n1.ByPosNoHeight?n1.ByPosNoHeight:n1.ByPos;if(K)return W.join(this.right.lineAt(q,G,J,Y,q));else return this.left.lineAt(q,G,J,Q,X).join(W)}forEachLine(I,Z,J,Q,X,Y){let q=Q+this.left.height,K=X+this.left.length+this.break;if(this.break){if(I<K)this.left.forEachLine(I,Z,J,Q,X,Y);if(Z>=K)this.right.forEachLine(I,Z,J,q,K,Y)}else{let W=this.lineAt(K,n1.ByPos,J,Q,X);if(I<W.from)this.left.forEachLine(I,W.from-1,J,Q,X,Y);if(W.to>=I&&W.from<=Z)Y(W);if(Z>W.to)this.right.forEachLine(W.to+1,Z,J,q,K,Y)}}replace(I,Z,J){let Q=this.left.length+this.break;if(Z<Q)return this.balanced(this.left.replace(I,Z,J),this.right);if(I>this.left.length)return this.balanced(this.left,this.right.replace(I-Q,Z-Q,J));let X=[];if(I>0)this.decomposeLeft(I,X);let Y=X.length;for(let q of J)X.push(q);if(I>0)xU(X,Y-1);if(Z<this.length){let q=X.length;this.decomposeRight(Z,X),xU(X,q)}return E0.of(X)}decomposeLeft(I,Z){let J=this.left.length;if(I<=J)return this.left.decomposeLeft(I,Z);if(Z.push(this.left),this.break){if(J++,I>=J)Z.push(null)}if(I>J)this.right.decomposeLeft(I-J,Z)}decomposeRight(I,Z){let J=this.left.length,Q=J+this.break;if(I>=Q)return this.right.decomposeRight(I-Q,Z);if(I<J)this.left.decomposeRight(I,Z);if(this.break&&I<Q)Z.push(null);Z.push(this.right)}balanced(I,Z){if(I.size>2*Z.size||Z.size>2*I.size)return E0.of(this.break?[I,null,Z]:[I,Z]);return this.left=nI(this.left,I),this.right=nI(this.right,Z),this.setHeight(I.height+Z.height),this.outdated=I.outdated||Z.outdated,this.size=I.size+Z.size,this.length=I.length+this.break+Z.length,this}updateHeight(I,Z=0,J=!1,Q){let{left:X,right:Y}=this,q=Z+X.length+this.break,K=null;if(Q&&Q.from<=Z+X.length&&Q.more)K=X=X.updateHeight(I,Z,J,Q);else X.updateHeight(I,Z,J);if(Q&&Q.from<=q+Y.length&&Q.more)K=Y=Y.updateHeight(I,q,J,Q);else Y.updateHeight(I,q,J);if(K)return this.balanced(X,Y);return this.height=this.left.height+this.right.height,this.outdated=!1,this}toString(){return this.left+(this.break?" ":"-")+this.right}}function xU(I,Z){let J,Q;if(I[Z]==null&&(J=I[Z-1])instanceof z0&&(Q=I[Z+1])instanceof z0)I.splice(Z-1,3,new z0(J.length+1+Q.length))}var EM=5;class cX{constructor(I,Z){this.pos=I,this.oracle=Z,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=I}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(I,Z){if(this.lineStart>-1){let J=Math.min(Z,this.lineEnd),Q=this.nodes[this.nodes.length-1];if(Q instanceof s0)Q.length+=J-this.pos;else if(J>this.pos||!this.isCovered)this.nodes.push(new s0(J-this.pos,-1,0));if(this.writtenTo=J,Z>J)this.nodes.push(null),this.writtenTo++,this.lineStart=-1}this.pos=Z}point(I,Z,J){if(I<Z||J.heightRelevant){let Q=J.widget?J.widget.estimatedHeight:0,X=J.widget?J.widget.lineBreaks:0;if(Q<0)Q=this.oracle.lineHeight;let Y=Z-I;if(J.block)this.addBlock(new vX(Y,Q,J));else if(Y||X||Q>=EM)this.addLineDeco(Q,X,Y)}else if(Z>I)this.span(I,Z);if(this.lineEnd>-1&&this.lineEnd<this.pos)this.lineEnd=this.oracle.doc.lineAt(this.pos).to}enterLine(){if(this.lineStart>-1)return;let{from:I,to:Z}=this.oracle.doc.lineAt(this.pos);if(this.lineStart=I,this.lineEnd=Z,this.writtenTo<I){if(this.writtenTo<I-1||this.nodes[this.nodes.length-1]==null)this.nodes.push(this.blankContent(this.writtenTo,I-1));this.nodes.push(null)}if(this.pos>I)this.nodes.push(new s0(this.pos-I,-1,0));this.writtenTo=this.pos}blankContent(I,Z){let J=new z0(Z-I);if(this.oracle.doc.lineAt(I).to==Z)J.flags|=4;return J}ensureLine(){this.enterLine();let I=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(I instanceof s0)return I;let Z=new s0(0,-1,0);return this.nodes.push(Z),Z}addBlock(I){this.enterLine();let Z=I.deco;if(Z&&Z.startSide>0&&!this.isCovered)this.ensureLine();if(this.nodes.push(I),this.writtenTo=this.pos=this.pos+I.length,Z&&Z.endSide>0)this.covering=I}addLineDeco(I,Z,J){let Q=this.ensureLine();Q.length+=J,Q.collapsed+=J,Q.widgetHeight=Math.max(Q.widgetHeight,I),Q.breaks+=Z,this.writtenTo=this.pos=this.pos+J}finish(I){let Z=this.nodes.length==0?null:this.nodes[this.nodes.length-1];if(this.lineStart>-1&&!(Z instanceof s0)&&!this.isCovered)this.nodes.push(new s0(0,-1,0));else if(this.writtenTo<this.pos||Z==null)this.nodes.push(this.blankContent(this.writtenTo,this.pos));let J=I;for(let Q of this.nodes){if(Q instanceof s0)Q.updateHeight(this.oracle,J);J+=Q?Q.length:1}return this.nodes}static build(I,Z,J,Q){let X=new cX(J,I);return R1.spans(Z,J,Q,X,0),X.finish(J)}}function hM(I,Z,J){let Q=new JV;return R1.compare(I,Z,J,Q,0),Q.changes}class JV{constructor(){this.changes=[]}compareRange(){}comparePoint(I,Z,J,Q){if(I<Z||J&&J.heightRelevant||Q&&Q.heightRelevant)g8(I,Z,this.changes,5)}}function CM(I,Z){let J=I.getBoundingClientRect(),Q=I.ownerDocument,X=Q.defaultView||window,Y=Math.max(0,J.left),q=Math.min(X.innerWidth,J.right),K=Math.max(0,J.top),W=Math.min(X.innerHeight,J.bottom);for(let G=I.parentNode;G&&G!=Q.body;)if(G.nodeType==1){let U=G,z=window.getComputedStyle(U);if((U.scrollHeight>U.clientHeight||U.scrollWidth>U.clientWidth)&&z.overflow!="visible"){let j=U.getBoundingClientRect();Y=Math.max(Y,j.left),q=Math.min(q,j.right),K=Math.max(K,j.top),W=Math.min(G==I.parentNode?X.innerHeight:W,j.bottom)}G=z.position=="absolute"||z.position=="fixed"?U.offsetParent:U.parentNode}else if(G.nodeType==11)G=G.host;else break;return{left:Y-J.left,right:Math.max(Y,q)-J.left,top:K-(J.top+Z),bottom:Math.max(K,W)-(J.top+Z)}}function wM(I){let Z=I.getBoundingClientRect(),J=I.ownerDocument.defaultView||window;return Z.left<J.innerWidth&&Z.right>0&&Z.top<J.innerHeight&&Z.bottom>0}function kM(I,Z){let J=I.getBoundingClientRect();return{left:0,right:J.right-J.left,top:Z,bottom:J.bottom-(J.top+Z)}}class _I{constructor(I,Z,J,Q){this.from=I,this.to=Z,this.size=J,this.displaySize=Q}static same(I,Z){if(I.length!=Z.length)return!1;for(let J=0;J<I.length;J++){let Q=I[J],X=Z[J];if(Q.from!=X.from||Q.to!=X.to||Q.size!=X.size)return!1}return!0}draw(I,Z){return P1.replace({widget:new QV(this.displaySize*(Z?I.scaleY:I.scaleX),Z)}).range(this.from,this.to)}}class QV extends a6{constructor(I,Z){super();this.size=I,this.vertical=Z}eq(I){return I.size==this.size&&I.vertical==this.vertical}toDOM(){let I=document.createElement("div");if(this.vertical)I.style.height=this.size+"px";else I.style.width=this.size+"px",I.style.height="2px",I.style.display="inline-block";return I}get estimatedHeight(){return this.vertical?this.size:-1}}class SX{constructor(I,Z){this.view=I,this.state=Z,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=nU,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=w1.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let J=Z.facet(fX).some((Q)=>typeof Q!="function"&&Q.class=="cm-lineWrapping");this.heightOracle=new ez(J),this.stateDeco=gU(Z),this.heightMap=E0.empty().applyChanges(this.stateDeco,M1.empty,this.heightOracle.setDoc(Z.doc),[new Z4(0,0,0,Z.doc.length)]);for(let Q=0;Q<2;Q++)if(this.viewport=this.getViewport(0,null),!this.updateForViewport())break;this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=P1.set(this.lineGaps.map((Q)=>Q.draw(this,!1))),this.scrollParent=I.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let I=[this.viewport],{main:Z}=this.state.selection;for(let J=0;J<=1;J++){let Q=J?Z.head:Z.anchor;if(!I.some(({from:X,to:Y})=>Q>=X&&Q<=Y)){let{from:X,to:Y}=this.lineBlockAt(Q);I.push(new q3(X,Y))}}return this.viewports=I.sort((J,Q)=>J.from-Q.from),this.updateScaler()}updateScaler(){let I=this.scaler;return this.scaler=this.heightMap.height<=7000000?nU:new pX(this.heightOracle,this.heightMap,this.viewports),I.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,(I)=>{this.viewportLines.push(K3(I,this.scaler))})}update(I,Z=null){this.state=I.state;let J=this.stateDeco;this.stateDeco=gU(this.state);let Q=I.changedRanges,X=Z4.extendWithRanges(Q,hM(J,this.stateDeco,I?I.changes:a1.empty(this.state.doc.length))),Y=this.heightMap.height,q=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);if(yU(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,I.startState.doc,this.heightOracle.setDoc(this.state.doc),X),this.heightMap.height!=Y||m8)I.flags|=2;if(q)this.scrollAnchorPos=I.changes.mapPos(q.from,-1),this.scrollAnchorHeight=q.top;else this.scrollAnchorPos=-1,this.scrollAnchorHeight=Y;let K=X.length?this.mapViewport(this.viewport,I.changes):this.viewport;if(Z&&(Z.range.head<K.from||Z.range.head>K.to)||!this.viewportIsAppropriate(K))K=this.getViewport(0,Z);let W=K.from!=this.viewport.from||K.to!=this.viewport.to;if(this.viewport=K,I.flags|=this.updateForViewport(),W||!I.changes.empty||I.flags&2)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,I.changes)));if(I.flags|=this.computeVisibleRanges(I.changes),Z)this.scrollTarget=Z;if(!this.mustEnforceCursorAssoc&&(I.selectionSet||I.focusChanged)&&I.view.lineWrapping&&I.state.selection.main.empty&&I.state.selection.main.assoc&&!I.state.facet(Az))this.mustEnforceCursorAssoc=!0}measure(){let{view:I}=this,Z=I.contentDOM,J=window.getComputedStyle(Z),Q=this.heightOracle,X=J.whiteSpace;this.defaultTextDirection=J.direction=="rtl"?w1.RTL:w1.LTR;let Y=this.heightOracle.mustRefreshForWrapping(X)||this.mustMeasureContent==="refresh",q=Z.getBoundingClientRect(),K=Y||this.mustMeasureContent||this.contentDOMHeight!=q.height;this.contentDOMHeight=q.height,this.mustMeasureContent=!1;let W=0,G=0;if(q.width&&q.height){let{scaleX:w,scaleY:L}=eU(Z,q);if(w>0.005&&Math.abs(this.scaleX-w)>0.005||L>0.005&&Math.abs(this.scaleY-L)>0.005)this.scaleX=w,this.scaleY=L,W|=16,Y=K=!0}let U=(parseInt(J.paddingTop)||0)*this.scaleY,z=(parseInt(J.paddingBottom)||0)*this.scaleY;if(this.paddingTop!=U||this.paddingBottom!=z)this.paddingTop=U,this.paddingBottom=z,W|=18;if(this.editorWidth!=I.scrollDOM.clientWidth){if(Q.lineWrapping)K=!0;this.editorWidth=I.scrollDOM.clientWidth,W|=16}let j=Iz(this.view.contentDOM,!1).y;if(j!=this.scrollParent)this.scrollParent=j,this.scrollAnchorHeight=-1,this.scrollOffset=0;let O=this.getScrollOffset();if(this.scrollOffset!=O)this.scrollAnchorHeight=-1,this.scrollOffset=O;this.scrolledToBottom=Yz(this.scrollParent||I.win);let H=(this.printing?kM:CM)(Z,this.paddingTop),N=H.top-this.pixelViewport.top,M=H.bottom-this.pixelViewport.bottom;this.pixelViewport=H;let _=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(_!=this.inView){if(this.inView=_,_)K=!0}if(!this.inView&&!this.scrollTarget&&!wM(I.dom))return 0;let T=q.width;if(this.contentDOMWidth!=T||this.editorHeight!=I.scrollDOM.clientHeight)this.contentDOMWidth=q.width,this.editorHeight=I.scrollDOM.clientHeight,W|=16;if(K){let w=I.docView.measureVisibleLineHeights(this.viewport);if(Q.mustRefreshForHeights(w))Y=!0;if(Y||Q.lineWrapping&&Math.abs(T-this.contentDOMWidth)>Q.charWidth){let{lineHeight:L,charWidth:S,textHeight:B}=I.docView.measureTextSize();if(Y=L>0&&Q.refresh(X,L,S,B,Math.max(5,T/S),w),Y)I.docView.minWidth=0,W|=16}if(N>0&&M>0)G=Math.max(N,M);else if(N<0&&M<0)G=Math.min(N,M);yU();for(let L of this.viewports){let S=L.from==this.viewport.from?w:I.docView.measureVisibleLineHeights(L);this.heightMap=(Y?E0.empty().applyChanges(this.stateDeco,M1.empty,this.heightOracle,[new Z4(0,0,0,I.state.doc.length)]):this.heightMap).updateHeight(Q,0,Y,new IV(L.from,S))}if(m8)W|=2}let h=!this.viewportIsAppropriate(this.viewport,G)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);if(h){if(W&2)W|=this.updateScaler();this.viewport=this.getViewport(G,this.scrollTarget),W|=this.updateForViewport()}if(W&2||h)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(Y?[]:this.lineGaps,I));if(W|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc)this.mustEnforceCursorAssoc=!1,I.docView.enforceCursorAssoc();return W}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(I,Z){let J=0.5-Math.max(-0.5,Math.min(0.5,I/1000/2)),Q=this.heightMap,X=this.heightOracle,{visibleTop:Y,visibleBottom:q}=this,K=new q3(Q.lineAt(Y-J*1000,n1.ByHeight,X,0,0).from,Q.lineAt(q+(1-J)*1000,n1.ByHeight,X,0,0).to);if(Z){let{head:W}=Z.range;if(W<K.from||W>K.to){let G=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),U=Q.lineAt(W,n1.ByPos,X,0,0),z;if(Z.y=="center")z=(U.top+U.bottom)/2-G/2;else if(Z.y=="start"||Z.y=="nearest"&&W<K.from)z=U.top;else z=U.bottom-G;K=new q3(Q.lineAt(z-500,n1.ByHeight,X,0,0).from,Q.lineAt(z+G+500,n1.ByHeight,X,0,0).to)}}return K}mapViewport(I,Z){let J=Z.mapPos(I.from,-1),Q=Z.mapPos(I.to,1);return new q3(this.heightMap.lineAt(J,n1.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(Q,n1.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:I,to:Z},J=0){if(!this.inView)return!0;let{top:Q}=this.heightMap.lineAt(I,n1.ByPos,this.heightOracle,0,0),{bottom:X}=this.heightMap.lineAt(Z,n1.ByPos,this.heightOracle,0,0),{visibleTop:Y,visibleBottom:q}=this;return(I==0||Q<=Y-Math.max(10,Math.min(-J,250)))&&(Z==this.state.doc.length||X>=q+Math.max(10,Math.min(J,250)))&&(Q>Y-2000&&X<q+2000)}mapLineGaps(I,Z){if(!I.length||Z.empty)return I;let J=[];for(let Q of I)if(!Z.touchesRange(Q.from,Q.to))J.push(new _I(Z.mapPos(Q.from),Z.mapPos(Q.to),Q.size,Q.displaySize));return J}ensureLineGaps(I,Z){let J=this.heightOracle.lineWrapping,Q=J?1e4:2000,X=Q>>1,Y=Q<<1;if(this.defaultTextDirection!=w1.LTR&&!J)return[];let q=[],K=(G,U,z,j)=>{if(U-G<X)return;let O=this.state.selection.main,H=[O.from];if(!O.empty)H.push(O.to);for(let M of H)if(M>G&&M<U){K(G,M-10,z,j),K(M+10,U,z,j);return}let N=yM(I,(M)=>M.from>=z.from&&M.to<=z.to&&Math.abs(M.from-G)<X&&Math.abs(M.to-U)<X&&!H.some((_)=>M.from<_&&M.to>_));if(!N){if(U<z.to&&Z&&J&&Z.visibleRanges.some((T)=>T.from<=U&&T.to>=U)){let T=Z.moveToLineBoundary(u.cursor(U),!1,!0).head;if(T>G)U=T}let M=this.gapSize(z,G,U,j),_=J||M<2000000?M:2000000;N=new _I(G,U,M,_)}q.push(N)},W=(G)=>{if(G.length<Y||G.type!=V0.Text)return;let U=bM(G.from,G.to,this.stateDeco);if(U.total<Y)return;let z=this.scrollTarget?this.scrollTarget.range.head:null,j,O;if(J){let H=Q/this.heightOracle.lineLength*this.heightOracle.lineHeight,N,M;if(z!=null){let _=NI(U,z),T=((this.visibleBottom-this.visibleTop)/2+H)/G.height;N=_-T,M=_+T}else N=(this.visibleTop-G.top-H)/G.height,M=(this.visibleBottom-G.top+H)/G.height;j=HI(U,N),O=HI(U,M)}else{let H=U.total*this.heightOracle.charWidth,N=Q*this.heightOracle.charWidth,M=0;if(H>2000000){for(let L of I)if(L.from>=G.from&&L.from<G.to&&L.size!=L.displaySize&&L.from*this.heightOracle.charWidth+M<this.pixelViewport.left)M=L.size-L.displaySize}let _=this.pixelViewport.left+M,T=this.pixelViewport.right+M,h,w;if(z!=null){let L=NI(U,z),S=((T-_)/2+N)/H;h=L-S,w=L+S}else h=(_-N)/H,w=(T+N)/H;j=HI(U,h),O=HI(U,w)}if(j>G.from)K(G.from,j,G,U);if(O<G.to)K(O,G.to,G,U)};for(let G of this.viewportLines)if(Array.isArray(G.type))G.type.forEach(W);else W(G);return q}gapSize(I,Z,J,Q){let X=NI(Q,J)-NI(Q,Z);if(this.heightOracle.lineWrapping)return I.height*X;else return Q.total*this.heightOracle.charWidth*X}updateLineGaps(I){if(!_I.same(I,this.lineGaps))this.lineGaps=I,this.lineGapDeco=P1.set(I.map((Z)=>Z.draw(this,this.heightOracle.lineWrapping)))}computeVisibleRanges(I){let Z=this.stateDeco;if(this.lineGaps.length)Z=Z.concat(this.lineGapDeco);let J=[];R1.spans(Z,this.viewport.from,this.viewport.to,{span(X,Y){J.push({from:X,to:Y})},point(){}},20);let Q=0;if(J.length!=this.visibleRanges.length)Q=12;else for(let X=0;X<J.length&&!(Q&8);X++){let Y=this.visibleRanges[X],q=J[X];if(Y.from!=q.from||Y.to!=q.to){if(Q|=4,!(I&&I.mapPos(Y.from,-1)==q.from&&I.mapPos(Y.to,1)==q.to))Q|=8}}return this.visibleRanges=J,Q}lineBlockAt(I){return I>=this.viewport.from&&I<=this.viewport.to&&this.viewportLines.find((Z)=>Z.from<=I&&Z.to>=I)||K3(this.heightMap.lineAt(I,n1.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(I){return I>=this.viewportLines[0].top&&I<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find((Z)=>Z.top<=I&&Z.bottom>=I)||K3(this.heightMap.lineAt(this.scaler.fromDOM(I),n1.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(I){let Z=this.lineBlockAtHeight(I+8);return Z.from>=this.viewport.from||this.viewportLines[0].top-I>200?Z:this.viewportLines[0]}elementAtHeight(I){return K3(this.heightMap.blockAt(this.scaler.fromDOM(I),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class q3{constructor(I,Z){this.from=I,this.to=Z}}function bM(I,Z,J){let Q=[],X=I,Y=0;if(R1.spans(J,I,Z,{span(){},point(q,K){if(q>X)Q.push({from:X,to:q}),Y+=q-X;X=K}},20),X<Z)Q.push({from:X,to:Z}),Y+=Z-X;return{total:Y,ranges:Q}}function HI({total:I,ranges:Z},J){if(J<=0)return Z[0].from;if(J>=1)return Z[Z.length-1].to;let Q=Math.floor(I*J);for(let X=0;;X++){let{from:Y,to:q}=Z[X],K=q-Y;if(Q<=K)return Y+Q;Q-=K}}function NI(I,Z){let J=0;for(let{from:Q,to:X}of I.ranges){if(Z<=X){J+=Z-Q;break}J+=X-Q}return J/I.total}function yM(I,Z){for(let J of I)if(Z(J))return J;return}var nU={toDOM(I){return I},fromDOM(I){return I},scale:1,eq(I){return I==this}};function gU(I){let Z=I.facet($I).filter((Q)=>typeof Q!="function"),J=I.facet(uX).filter((Q)=>typeof Q!="function");if(J.length)Z.push(R1.join(J));return Z}class pX{constructor(I,Z,J){let Q=0,X=0,Y=0;this.viewports=J.map(({from:q,to:K})=>{let W=Z.lineAt(q,n1.ByPos,I,0,0).top,G=Z.lineAt(K,n1.ByPos,I,0,0).bottom;return Q+=G-W,{from:q,to:K,top:W,bottom:G,domTop:0,domBottom:0}}),this.scale=(7000000-Q)/(Z.height-Q);for(let q of this.viewports)q.domTop=Y+(q.top-X)*this.scale,Y=q.domBottom=q.domTop+(q.bottom-q.top),X=q.bottom}toDOM(I){for(let Z=0,J=0,Q=0;;Z++){let X=Z<this.viewports.length?this.viewports[Z]:null;if(!X||I<X.top)return Q+(I-J)*this.scale;if(I<=X.bottom)return X.domTop+(I-X.top);J=X.bottom,Q=X.domBottom}}fromDOM(I){for(let Z=0,J=0,Q=0;;Z++){let X=Z<this.viewports.length?this.viewports[Z]:null;if(!X||I<X.domTop)return J+(I-Q)/this.scale;if(I<=X.domBottom)return X.top+(I-X.domTop);J=X.bottom,Q=X.domBottom}}eq(I){if(!(I instanceof pX))return!1;return this.scale==I.scale&&this.viewports.length==I.viewports.length&&this.viewports.every((Z,J)=>Z.from==I.viewports[J].from&&Z.to==I.viewports[J].to)}}function K3(I,Z){if(Z.scale==1)return I;let J=Z.toDOM(I.top),Q=Z.toDOM(I.bottom);return new _4(I.from,I.length,J,Q-J,Array.isArray(I._content)?I._content.map((X)=>K3(X,Z)):I._content)}var RI=t.define({combine:(I)=>I.join(" ")}),_X=t.define({combine:(I)=>I.indexOf(!0)>-1}),TX=P4.newName(),XV=P4.newName(),YV=P4.newName(),qV={"&light":"."+XV,"&dark":"."+YV};function EX(I,Z,J){return new P4(Z,{finish(Q){return/&/.test(Q)?Q.replace(/&\w*/,(X)=>{if(X=="&")return I;if(!J||!J[X])throw RangeError(`Unsupported selector: ${X}`);return J[X]}):I+" "+Q}})}var xM=EX("."+TX,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{userSelect:"none",position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},".cm-panels-top":{top:"0"},".cm-panels-bottom":{bottom:"0"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},qV),nM={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},qX=r.ie&&r.ie_version<=11;class KV{constructor(I){if(this.view=I,this.active=!1,this.editContext=null,this.selectionRange=new Zz,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=I.contentDOM,this.observer=new MutationObserver((Z)=>{for(let J of Z)this.queue.push(J);if((r.ie&&r.ie_version<=11||r.ios&&I.composing)&&Z.some((J)=>J.type=="childList"&&J.removedNodes.length||J.type=="characterData"&&J.oldValue.length>J.target.nodeValue.length))this.flushSoon();else this.flush()}),window.EditContext&&r.android&&I.constructor.EDIT_CONTEXT!==!1&&!(r.chrome&&r.chrome_version<126)){if(this.editContext=new WV(I),I.state.facet(L6))I.contentDOM.editContext=this.editContext.editContext}if(qX)this.onCharData=(Z)=>{this.queue.push({target:Z.target,type:"characterData",oldValue:Z.prevValue}),this.flushSoon()};if(this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia)this.printQuery=window.matchMedia("print");if(typeof ResizeObserver=="function")this.resizeScroll=new ResizeObserver(()=>{var Z;if(((Z=this.view.docView)===null||Z===void 0?void 0:Z.lastUpdate)<Date.now()-75)this.onResize()}),this.resizeScroll.observe(I.scrollDOM);if(this.addWindowListeners(this.win=I.win),this.start(),typeof IntersectionObserver=="function")this.intersection=new IntersectionObserver((Z)=>{if(this.parentCheck<0)this.parentCheck=setTimeout(this.listenForScroll.bind(this),1000);if(Z.length>0&&Z[Z.length-1].intersectionRatio>0!=this.intersecting){if(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView)this.onScrollChanged(document.createEvent("Event"))}},{threshold:[0,0.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver((Z)=>{if(Z.length>0&&Z[Z.length-1].intersectionRatio>0)this.onScrollChanged(document.createEvent("Event"))},{});this.listenForScroll(),this.readSelectionRange()}onScrollChanged(I){if(this.view.inputState.runHandlers("scroll",I),this.intersecting)this.view.measure()}onScroll(I){if(this.intersecting)this.flush(!1);if(this.editContext)this.view.requestMeasure(this.editContext.measureReq);this.onScrollChanged(I)}onResize(){if(this.resizeTimeout<0)this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50)}onPrint(I){if((I.type=="change"||!I.type)&&!I.matches)return;this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500)}updateGaps(I){if(this.gapIntersection&&(I.length!=this.gaps.length||this.gaps.some((Z,J)=>Z!=I[J]))){this.gapIntersection.disconnect();for(let Z of I)this.gapIntersection.observe(Z);this.gaps=I}}onSelectionChange(I){let Z=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:J}=this,Q=this.selectionRange;if(J.state.facet(L6)?J.root.activeElement!=this.dom:!G3(this.dom,Q))return;let X=Q.anchorNode&&J.docView.tile.nearest(Q.anchorNode);if(X&&X.isWidget()&&X.widget.ignoreEvent(I)){if(!Z)this.selectionChanged=!1;return}if((r.ie&&r.ie_version<=11||r.android&&r.chrome)&&!J.state.selection.main.empty&&Q.focusNode&&U3(Q.focusNode,Q.focusOffset,Q.anchorNode,Q.anchorOffset))this.flushSoon();else this.flush(!1)}readSelectionRange(){let{view:I}=this,Z=j3(I.root);if(!Z)return!1;let J=r.safari&&I.root.nodeType==11&&I.root.activeElement==this.dom&&gM(this.view,Z)||Z;if(!J||this.selectionRange.eq(J))return!1;let Q=G3(this.dom,J);if(Q&&!this.selectionChanged&&I.inputState.lastFocusTime>Date.now()-200&&I.inputState.lastTouchTime<Date.now()-300&&wR(this.dom,J))return this.view.inputState.lastFocusTime=0,I.docView.updateSelection(),!1;if(this.selectionRange.setRange(J),Q)this.selectionChanged=!0;return!0}setSelectionRange(I,Z){this.selectionRange.set(I.node,I.offset,Z.node,Z.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let I=0,Z=null;for(let J=this.dom;J;)if(J.nodeType==1){if(!Z&&I<this.scrollTargets.length&&this.scrollTargets[I]==J)I++;else if(!Z)Z=this.scrollTargets.slice(0,I);if(Z)Z.push(J);J=J.assignedSlot||J.parentNode}else if(J.nodeType==11)J=J.host;else break;if(I<this.scrollTargets.length&&!Z)Z=this.scrollTargets.slice(0,I);if(Z){for(let J of this.scrollTargets)J.removeEventListener("scroll",this.onScroll);for(let J of this.scrollTargets=Z)J.addEventListener("scroll",this.onScroll)}}ignore(I){if(!this.active)return I();try{return this.stop(),I()}finally{this.start(),this.clear()}}start(){if(this.active)return;if(this.observer.observe(this.dom,nM),qX)this.dom.addEventListener("DOMCharacterDataModified",this.onCharData);this.active=!0}stop(){if(!this.active)return;if(this.active=!1,this.observer.disconnect(),qX)this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(I,Z){var J;if(!this.delayedAndroidKey){let Q=()=>{let X=this.delayedAndroidKey;if(X){if(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=X.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&X.force)f8(this.dom,X.key,X.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(Q)}if(!this.delayedAndroidKey||I=="Enter")this.delayedAndroidKey={key:I,keyCode:Z,force:this.lastChange<Date.now()-50||!!((J=this.delayedAndroidKey)===null||J===void 0?void 0:J.force)}}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){if(this.delayedFlush<0)this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()})}forceFlush(){if(this.delayedFlush>=0)this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1;this.flush()}pendingRecords(){for(let I of this.observer.takeRecords())this.queue.push(I);return this.queue}processRecords(){let I=this.pendingRecords();if(I.length)this.queue=[];let Z=-1,J=-1,Q=!1;for(let X of I){let Y=this.readMutation(X);if(!Y)continue;if(Y.typeOver)Q=!0;if(Z==-1)({from:Z,to:J}=Y);else Z=Math.min(Y.from,Z),J=Math.max(Y.to,J)}return{from:Z,to:J,typeOver:Q}}readChange(){let{from:I,to:Z,typeOver:J}=this.processRecords(),Q=this.selectionChanged&&G3(this.dom,this.selectionRange);if(I<0&&!Q)return null;if(I>-1)this.lastChange=Date.now();this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let X=new uz(this.view,I,Z,J);return this.view.docView.domChanged={newSel:X.newSel?X.newSel.main:null},X}flush(I=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;if(I)this.readSelectionRange();let Z=this.readChange();if(!Z)return this.view.requestMeasure(),!1;let J=this.view.state,Q=mz(this.view,Z);if(this.view.state==J&&(Z.domChanged||Z.newSel&&!xI(this.view.state.selection,Z.newSel.main)))this.view.update([]);return Q}readMutation(I){let Z=this.view.docView.tile.nearest(I.target);if(!Z||Z.isWidget())return null;if(Z.markDirty(I.type=="attributes"),I.type=="childList"){let J=fU(Z,I.previousSibling||I.target.previousSibling,-1),Q=fU(Z,I.nextSibling||I.target.nextSibling,1);return{from:J?Z.posAfter(J):Z.posAtStart,to:Q?Z.posBefore(Q):Z.posAtEnd,typeOver:!1}}else if(I.type=="characterData")return{from:Z.posAtStart,to:Z.posAtEnd,typeOver:I.target.nodeValue==I.oldValue};else return null}setWindow(I){if(I!=this.win)this.removeWindowListeners(this.win),this.win=I,this.addWindowListeners(this.win)}addWindowListeners(I){if(I.addEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.addEventListener)this.printQuery.addEventListener("change",this.onPrint);else this.printQuery.addListener(this.onPrint);else I.addEventListener("beforeprint",this.onPrint);I.addEventListener("scroll",this.onScroll),I.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(I){if(I.removeEventListener("scroll",this.onScroll),I.removeEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.removeEventListener)this.printQuery.removeEventListener("change",this.onPrint);else this.printQuery.removeListener(this.onPrint);else I.removeEventListener("beforeprint",this.onPrint);I.document.removeEventListener("selectionchange",this.onSelectionChange)}update(I){if(this.editContext){if(this.editContext.update(I),I.startState.facet(L6)!=I.state.facet(L6))I.view.contentDOM.editContext=I.state.facet(L6)?this.editContext.editContext:null}}destroy(){var I,Z,J;this.stop(),(I=this.intersection)===null||I===void 0||I.disconnect(),(Z=this.gapIntersection)===null||Z===void 0||Z.disconnect(),(J=this.resizeScroll)===null||J===void 0||J.disconnect();for(let Q of this.scrollTargets)Q.removeEventListener("scroll",this.onScroll);if(this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext)this.view.contentDOM.editContext=null,this.editContext.destroy()}}function fU(I,Z,J){while(Z){let Q=p1.get(Z);if(Q&&Q.parent==I)return Q;let X=Z.parentNode;Z=X!=I.dom?X:J>0?Z.nextSibling:Z.previousSibling}return null}function uU(I,Z){let{startContainer:J,startOffset:Q,endContainer:X,endOffset:Y}=Z,q=I.docView.domAtPos(I.state.selection.main.anchor,1);if(U3(q.node,q.offset,X,Y))[J,Q,X,Y]=[X,Y,J,Q];return{anchorNode:J,anchorOffset:Q,focusNode:X,focusOffset:Y}}function gM(I,Z){if(Z.getComposedRanges){let X=Z.getComposedRanges(I.root)[0];if(X)return uU(I,X)}let J=null;function Q(X){X.preventDefault(),X.stopImmediatePropagation(),J=X.getTargetRanges()[0]}return I.contentDOM.addEventListener("beforeinput",Q,!0),I.dom.ownerDocument.execCommand("indent"),I.contentDOM.removeEventListener("beforeinput",Q,!0),J?uU(I,J):null}class WV{constructor(I){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(I.state);let Z=this.editContext=new window.EditContext({text:I.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,I.state.selection.main.anchor))),selectionEnd:this.toContextPos(I.state.selection.main.head)});this.handlers.textupdate=(J)=>{let Q=I.state.selection.main,{anchor:X,head:Y}=Q,q=this.toEditorPos(J.updateRangeStart),K=this.toEditorPos(J.updateRangeEnd);if(I.inputState.composing>=0&&!this.composing)this.composing={contextBase:J.updateRangeStart,editorBase:q,drifted:!1};let W=K-q>J.text.length;if(q==this.from&&X<this.from)q=X;else if(K==this.to&&X>this.to)K=X;let G=vz(I.state.sliceDoc(q,K),J.text,(W?Q.from:Q.to)-q,W?"end":null);if(!G){let z=u.single(this.toEditorPos(J.selectionStart),this.toEditorPos(J.selectionEnd));if(!xI(z,Q))I.dispatch({selection:z,userEvent:"select"});return}let U={from:G.from+q,to:G.toA+q,insert:M1.of(J.text.slice(G.from,G.toB).split(`
`))};if((r.mac||r.android)&&U.from==Y-1&&/^\. ?$/.test(J.text)&&I.contentDOM.getAttribute("autocorrect")=="off")U={from:q,to:K,insert:M1.of([J.text.replace("."," ")])};if(this.pendingContextChange=U,!I.state.readOnly){let z=this.to-this.from+(U.to-U.from+U.insert.length);mX(I,U,u.single(this.toEditorPos(J.selectionStart,z),this.toEditorPos(J.selectionEnd,z)))}if(this.pendingContextChange)this.revertPending(I.state),this.setSelection(I.state);if(U.from<U.to&&!U.insert.length&&I.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(Z.text.slice(Math.max(0,J.updateRangeStart-1),Math.min(Z.text.length,J.updateRangeStart+1))))this.handlers.compositionend(J)},this.handlers.characterboundsupdate=(J)=>{let Q=[],X=null;for(let Y=this.toEditorPos(J.rangeStart),q=this.toEditorPos(J.rangeEnd);Y<q;Y++){let K=I.coordsForChar(Y);X=K&&new DOMRect(K.left,K.top,K.right-K.left,K.bottom-K.top)||X||new DOMRect,Q.push(X)}Z.updateCharacterBounds(J.rangeStart,Q)},this.handlers.textformatupdate=(J)=>{let Q=[];for(let X of J.getTextFormats()){let{underlineStyle:Y,underlineThickness:q}=X;if(!/none/i.test(Y)&&!/none/i.test(q)){let K=this.toEditorPos(X.rangeStart),W=this.toEditorPos(X.rangeEnd);if(K<W){let G=`text-decoration: underline ${/^[a-z]/.test(Y)?Y+" ":Y=="Dashed"?"dashed ":Y=="Squiggle"?"wavy ":""}${/thin/i.test(q)?1:2}px`;Q.push(P1.mark({attributes:{style:G}}).range(K,W))}}}I.dispatch({effects:Lz.of(P1.set(Q))})},this.handlers.compositionstart=()=>{if(I.inputState.composing<0)I.inputState.composing=0,I.inputState.compositionFirstChange=!0},this.handlers.compositionend=()=>{if(I.inputState.composing=-1,I.inputState.compositionFirstChange=null,this.composing){let{drifted:J}=this.composing;if(this.composing=null,J)this.reset(I.state)}};for(let J in this.handlers)Z.addEventListener(J,this.handlers[J]);this.measureReq={read:(J)=>{let Q=j3(J.root);if(Q&&Q.rangeCount)this.editContext.updateSelectionBounds(Q.getRangeAt(0).getBoundingClientRect())}}}applyEdits(I){let Z=0,J=!1,Q=this.pendingContextChange;if(I.changes.iterChanges((X,Y,q,K,W)=>{if(J)return;let G=W.length-(Y-X);if(Q&&Y>=Q.to)if(Q.from==X&&Q.to==Y&&Q.insert.eq(W)){Q=this.pendingContextChange=null,Z+=G,this.to+=G;return}else Q=null,this.revertPending(I.state);if(X+=Z,Y+=Z,Y<=this.from)this.from+=G,this.to+=G;else if(X<this.to){if(X<this.from||Y>this.to||this.to-this.from+W.length>30000){J=!0;return}this.editContext.updateText(this.toContextPos(X),this.toContextPos(Y),W.toString()),this.to+=G}Z+=G}),Q&&!J)this.revertPending(I.state);return!J}update(I){let Z=this.pendingContextChange,J=I.startState.selection.main;if(this.composing&&(this.composing.drifted||!I.changes.touchesRange(J.from,J.to)&&I.transactions.some((Q)=>!Q.isUserEvent("input.type")&&Q.changes.touchesRange(this.from,this.to))))this.composing.drifted=!0,this.composing.editorBase=I.changes.mapPos(this.composing.editorBase);else if(!this.applyEdits(I)||!this.rangeIsValid(I.state))this.pendingContextChange=null,this.reset(I.state);else if(I.docChanged||I.selectionSet||Z)this.setSelection(I.state);if(I.geometryChanged||I.docChanged||I.selectionSet)I.view.requestMeasure(this.measureReq)}resetRange(I){let{head:Z}=I.selection.main;this.from=Math.max(0,Z-1e4),this.to=Math.min(I.doc.length,Z+1e4)}reset(I){this.resetRange(I),this.editContext.updateText(0,this.editContext.text.length,I.doc.sliceString(this.from,this.to)),this.setSelection(I)}revertPending(I){let Z=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(Z.from),this.toContextPos(Z.from+Z.insert.length),I.doc.sliceString(Z.from,Z.to))}setSelection(I){let{main:Z}=I.selection,J=this.toContextPos(Math.max(this.from,Math.min(this.to,Z.anchor))),Q=this.toContextPos(Z.head);if(this.editContext.selectionStart!=J||this.editContext.selectionEnd!=Q)this.editContext.updateSelection(J,Q)}rangeIsValid(I){let{head:Z}=I.selection.main;return!(this.from>0&&Z-this.from<500||this.to<I.doc.length&&this.to-Z<500||this.to-this.from>30000)}toEditorPos(I,Z=this.to-this.from){I=Math.min(I,Z);let J=this.composing;return J&&J.drifted?J.editorBase+(I-J.contextBase):I+this.from}toContextPos(I){let Z=this.composing;return Z&&Z.drifted?Z.contextBase+(I-Z.editorBase):I-this.from}destroy(){for(let I in this.handlers)this.editContext.removeEventListener(I,this.handlers[I])}}class Y1{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(I={}){var Z;if(this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),I.parent)I.parent.appendChild(this.dom);let{dispatch:J}=I;if(this.dispatchTransactions=I.dispatchTransactions||J&&((Q)=>Q.forEach((X)=>J(X,this)))||((Q)=>this.update(Q)),this.dispatch=this.dispatch.bind(this),this._root=I.root||CR(I.parent)||document,this.viewState=new SX(this,I.state||L1.create(I)),I.scrollTo&&I.scrollTo.is(jI))this.viewState.scrollTarget=I.scrollTo.value.clip(this.viewState.state);this.plugins=this.state.facet(x8).map((Q)=>new BI(Q));for(let Q of this.plugins)Q.update(this);if(this.observer=new KV(this),this.inputState=new cz(this),this.inputState.ensureHandlers(this.plugins),this.docView=new MX(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),(Z=document.fonts)===null||Z===void 0?void 0:Z.ready)document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...I){let Z=I.length==1&&I[0]instanceof t1?I:I.length==1&&Array.isArray(I[0])?I[0]:[this.state.update(...I)];this.dispatchTransactions(Z,this)}update(I){if(this.updateState!=0)throw Error("Calls to EditorView.update are not allowed while an update is in progress");let Z=!1,J=!1,Q,X=this.state;for(let z of I){if(z.startState!=X)throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");X=z.state}if(this.destroyed){this.viewState.state=X;return}let Y=this.hasFocus,q=0,K=null;if(I.some((z)=>z.annotation(az)))this.inputState.notifiedFocused=Y,q=1;else if(Y!=this.inputState.notifiedFocused){if(this.inputState.notifiedFocused=Y,K=tz(X,Y),!K)q=1}let W=this.observer.delayedAndroidKey,G=null;if(W){if(this.observer.clearDelayedAndroidKey(),G=this.observer.readChange(),G&&!this.state.doc.eq(X.doc)||!this.state.selection.eq(X.selection))G=null}else this.observer.clear();if(X.facet(L1.phrases)!=this.state.facet(L1.phrases))return this.setState(X);Q=bI.create(this,X,I),Q.flags|=q;let U=this.viewState.scrollTarget;try{this.updateState=2;for(let z of I){if(U)U=U.map(z.changes);if(z.scrollIntoView){let{main:j}=z.state.selection,{x:O,y:H}=this.state.facet(Y1.cursorScrollMargin);U=new u8(j.empty?j:u.cursor(j.head,j.head>j.anchor?-1:1),"nearest","nearest",H,O)}for(let j of z.effects)if(j.is(jI))U=j.value.clip(this.state)}if(this.viewState.update(Q,U),this.bidiCache=gI.update(this.bidiCache,Q.changes),!Q.empty)this.updatePlugins(Q),this.inputState.update(Q);if(Z=this.docView.update(Q),this.state.facet(Y3)!=this.styleModules)this.mountStyles();J=this.updateAttrs(),this.showAnnouncements(I),this.docView.updateSelection(Z,I.some((z)=>z.isUserEvent("select.pointer")))}finally{this.updateState=0}if(Q.startState.facet(RI)!=Q.state.facet(RI))this.viewState.mustMeasureContent=!0;if(Z||J||U||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)this.requestMeasure();if(Z)this.docViewUpdate();if(!Q.empty)for(let z of this.state.facet(RX))try{z(Q)}catch(j){d0(this.state,j,"update listener")}if(K||G)Promise.resolve().then(()=>{if(K&&this.state==K.startState)this.dispatch(K);if(G){if(!mz(this,G)&&W.force)f8(this.contentDOM,W.key,W.keyCode)}})}setState(I){if(this.updateState!=0)throw Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=I;return}this.updateState=2;let Z=this.hasFocus;try{for(let J of this.plugins)J.destroy(this);this.viewState=new SX(this,I),this.plugins=I.facet(x8).map((J)=>new BI(J)),this.pluginMap.clear();for(let J of this.plugins)J.update(this);this.docView.destroy(),this.docView=new MX(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}if(Z)this.focus();this.requestMeasure()}updatePlugins(I){let Z=I.startState.facet(x8),J=I.state.facet(x8);if(Z!=J){let Q=[];for(let X of J){let Y=Z.indexOf(X);if(Y<0)Q.push(new BI(X));else{let q=this.plugins[Y];q.mustUpdate=I,Q.push(q)}}for(let X of this.plugins)if(X.mustUpdate!=I)X.destroy(this);this.plugins=Q,this.pluginMap.clear()}else for(let Q of this.plugins)Q.mustUpdate=I;for(let Q=0;Q<this.plugins.length;Q++)this.plugins[Q].update(this);if(Z!=J)this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let I of this.plugins){let Z=I.value;if(Z&&Z.docViewUpdate)try{Z.docViewUpdate(this)}catch(J){d0(this.state,J,"doc view update listener")}}}measure(I=!0){if(this.destroyed)return;if(this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);if(this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}if(this.measureScheduled=0,I)this.observer.forceFlush();let Z=null,J=this.viewState.scrollParent,Q=this.viewState.getScrollOffset(),{scrollAnchorPos:X,scrollAnchorHeight:Y}=this.viewState;if(Math.abs(Q-this.viewState.scrollOffset)>1)Y=-1;this.viewState.scrollAnchorHeight=-1;try{for(let q=0;;q++){if(Y<0)if(Yz(J||this.win))X=-1,Y=this.viewState.heightMap.height;else{let j=this.viewState.scrollAnchorAt(Q);X=j.from,Y=j.top}this.updateState=1;let K=this.viewState.measure();if(!K&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(q>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let W=[];if(!(K&4))[this.measureRequests,W]=[W,this.measureRequests];let G=W.map((j)=>{try{return j.read(this)}catch(O){return d0(this.state,O),$U}}),U=bI.create(this,this.state,[]),z=!1;if(U.flags|=K,!Z)Z=U;else Z.flags|=K;if(this.updateState=2,!U.empty){if(this.updatePlugins(U),this.inputState.update(U),this.updateAttrs(),z=this.docView.update(U),z)this.docViewUpdate()}for(let j=0;j<W.length;j++)if(G[j]!=$U)try{let O=W[j];if(O.write)O.write(G[j],this)}catch(O){d0(this.state,O)}if(z)this.docView.updateSelection(!0);if(!U.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,Y=-1;continue}else{let O=((X<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(X).top)-Y)/this.scaleY;if((O>1||O<-1)&&!(r.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(J==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){if(Q=Q+O,J)J.scrollTop+=O;else this.win.scrollBy(0,O);Y=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(Z&&!Z.empty)for(let q of this.state.facet(RX))q(Z)}get themeClasses(){return TX+" "+(this.state.facet(_X)?YV:XV)+" "+this.state.facet(RI)}updateAttrs(){let I=mU(this,Bz,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),Z={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:!this.state.facet(L6)?"false":"true",class:"cm-content",style:`${r.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};if(this.state.readOnly)Z["aria-readonly"]="true";mU(this,fX,Z);let J=this.observer.ignore(()=>{let Q=MU(this.contentDOM,this.contentAttrs,Z),X=MU(this.dom,this.editorAttrs,I);return Q||X});return this.editorAttrs=I,this.contentAttrs=Z,J}showAnnouncements(I){let Z=!0;for(let J of I)for(let Q of J.effects)if(Q.is(Y1.announce)){if(Z)this.announceDOM.textContent="";Z=!1;let X=this.announceDOM.appendChild(document.createElement("div"));X.textContent=Q.value}}mountStyles(){this.styleModules=this.state.facet(Y3);let I=this.state.facet(Y1.cspNonce);P4.mount(this.root,this.styleModules.concat(xM).reverse(),I?{nonce:I}:void 0)}readMeasured(){if(this.updateState==2)throw Error("Reading the editor layout isn't allowed during an update");if(this.updateState==0&&this.measureScheduled>-1)this.measure(!1)}requestMeasure(I){if(this.measureScheduled<0)this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure());if(I){if(this.measureRequests.indexOf(I)>-1)return;if(I.key!=null){for(let Z=0;Z<this.measureRequests.length;Z++)if(this.measureRequests[Z].key===I.key){this.measureRequests[Z]=I;return}}this.measureRequests.push(I)}}plugin(I){let Z=this.pluginMap.get(I);if(Z===void 0||Z&&Z.plugin!=I)this.pluginMap.set(I,Z=this.plugins.find((J)=>J.plugin==I)||null);return Z&&Z.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(I){return this.readMeasured(),this.viewState.elementAtHeight(I)}lineBlockAtHeight(I){return this.readMeasured(),this.viewState.lineBlockAtHeight(I)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(I){return this.viewState.lineBlockAt(I)}get contentHeight(){return this.viewState.contentHeight}moveByChar(I,Z,J){return YX(this,I,SU(this,I,Z,J))}moveByGroup(I,Z){return YX(this,I,SU(this,I,Z,(J)=>YM(this,I.head,J)))}visualLineSide(I,Z){let J=this.bidiSpans(I),Q=this.textDirectionAt(I.from),X=J[Z?J.length-1:0];return u.cursor(X.side(Z,Q)+I.from,X.forward(!Z,Q)?1:-1)}moveToLineBoundary(I,Z,J=!0){return XM(this,I,Z,J)}moveVertically(I,Z,J){return YX(this,I,qM(this,I,Z,J))}domAtPos(I,Z=1){return this.docView.domAtPos(I,Z)}posAtDOM(I,Z=0){return this.docView.posFromDOM(I,Z)}posAtCoords(I,Z=!0){this.readMeasured();let J=LX(this,I,Z);return J&&J.pos}posAndSideAtCoords(I,Z=!0){return this.readMeasured(),LX(this,I,Z)}coordsAtPos(I,Z=1){this.readMeasured();let J=this.state.doc.lineAt(I),Q=this.bidiSpans(J),X=Q[E4.find(Q,I-J.from,-1,Z)];return this.docView.coordsAt(I,Z,X.dir==w1.RTL)}coordsForChar(I){return this.readMeasured(),this.docView.coordsForChar(I)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(I){if(!this.state.facet(Mz)||I<this.viewport.from||I>this.viewport.to)return this.textDirection;return this.readMeasured(),this.docView.textDirectionAt(I)}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(I){if(I.length>fM)return zz(I.length);let Z=this.textDirectionAt(I.from),J;for(let X of this.bidiCache)if(X.from==I.from&&X.dir==Z&&(X.fresh||Uz(X.isolates,J=LU(this,I))))return X.order;if(!J)J=LU(this,I);let Q=fR(I.text,Z,J);return this.bidiCache.push(new gI(I.from,I.to,Z,J,!0,Q)),Q}get hasFocus(){var I;return(this.dom.ownerDocument.hasFocus()||r.safari&&((I=this.inputState)===null||I===void 0?void 0:I.lastContextMenu)>Date.now()-30000)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{Xz(this.contentDOM),this.docView.updateSelection()})}setRoot(I){if(this._root!=I)this._root=I,this.observer.setWindow((I.nodeType==9?I:I.ownerDocument).defaultView||window),this.mountStyles()}destroy(){if(this.root.activeElement==this.contentDOM)this.contentDOM.blur();for(let I of this.plugins)I.destroy(this);if(this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);this.destroyed=!0}static scrollIntoView(I,Z={}){var J,Q,X,Y;return jI.of(new u8(typeof I=="number"?u.cursor(I):I,(J=Z.y)!==null&&J!==void 0?J:"nearest",(Q=Z.x)!==null&&Q!==void 0?Q:"nearest",(X=Z.yMargin)!==null&&X!==void 0?X:5,(Y=Z.xMargin)!==null&&Y!==void 0?Y:5))}scrollSnapshot(){let{scrollTop:I,scrollLeft:Z}=this.scrollDOM,J=this.viewState.scrollAnchorAt(I);return jI.of(new u8(u.cursor(J.from),"start","start",J.top-I,Z,!0))}setTabFocusMode(I){if(I==null)this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1;else if(typeof I=="boolean")this.inputState.tabFocusMode=I?0:-1;else if(this.inputState.tabFocusMode!=0)this.inputState.tabFocusMode=Date.now()+I}static domEventHandlers(I){return M0.define(()=>({}),{eventHandlers:I})}static domEventObservers(I){return M0.define(()=>({}),{eventObservers:I})}static theme(I,Z){let J=P4.newName(),Q=[RI.of(J),Y3.of(EX(`.${J}`,I))];if(Z&&Z.dark)Q.push(_X.of(!0));return Q}static baseTheme(I){return M6.lowest(Y3.of(EX("."+TX,I,qV)))}static findFromDOM(I){var Z;let J=I.querySelector(".cm-content"),Q=J&&p1.get(J)||p1.get(I);return((Z=Q===null||Q===void 0?void 0:Q.root)===null||Z===void 0?void 0:Z.view)||null}}Y1.styleModule=Y3;Y1.inputHandler=Nz;Y1.clipboardInputFilter=nX;Y1.clipboardOutputFilter=gX;Y1.scrollHandler=Dz;Y1.focusChangeEffect=Rz;Y1.perLineTextDirection=Mz;Y1.exceptionSink=Hz;Y1.updateListener=RX;Y1.editable=L6;Y1.mouseSelectionStyle=Fz;Y1.dragMovesSelection=Oz;Y1.clickAddsSelectionRange=jz;Y1.decorations=$I;Y1.blockWrappers=Pz;Y1.outerDecorations=uX;Y1.atomicRanges=R3;Y1.bidiIsolatedRanges=Sz;Y1.cursorScrollMargin=t.define({combine:(I)=>{let Z=5,J=5;for(let Q of I)if(typeof Q=="number")Z=J=Q;else({x:Z,y:J}=Q);return{x:Z,y:J}}});Y1.scrollMargins=_z;Y1.darkTheme=_X;Y1.cspNonce=t.define({combine:(I)=>I.length?I[0]:""});Y1.contentAttributes=fX;Y1.editorAttributes=Bz;Y1.lineWrapping=Y1.contentAttributes.of({class:"cm-lineWrapping"});Y1.announce=B1.define();var fM=4096,$U={};class gI{constructor(I,Z,J,Q,X,Y){this.from=I,this.to=Z,this.dir=J,this.isolates=Q,this.fresh=X,this.order=Y}static update(I,Z){if(Z.empty&&!I.some((X)=>X.fresh))return I;let J=[],Q=I.length?I[I.length-1].dir:w1.LTR;for(let X=Math.max(0,I.length-10);X<I.length;X++){let Y=I[X];if(Y.dir==Q&&!Z.touchesRange(Y.from,Y.to))J.push(new gI(Z.mapPos(Y.from,1),Z.mapPos(Y.to,-1),Y.dir,Y.isolates,!1,Y.order))}return J}}function mU(I,Z,J){for(let Q=I.state.facet(Z),X=Q.length-1;X>=0;X--){let Y=Q[X],q=typeof Y=="function"?Y(I):Y;if(q)bX(q,J)}return J}var uM=r.mac?"mac":r.windows?"win":r.linux?"linux":"key";function $M(I,Z){let J=I.split(/-(?!$)/),Q=J[J.length-1];if(Q=="Space")Q=" ";let X,Y,q,K;for(let W=0;W<J.length-1;++W){let G=J[W];if(/^(cmd|meta|m)$/i.test(G))K=!0;else if(/^a(lt)?$/i.test(G))X=!0;else if(/^(c|ctrl|control)$/i.test(G))Y=!0;else if(/^s(hift)?$/i.test(G))q=!0;else if(/^mod$/i.test(G))if(Z=="mac")K=!0;else Y=!0;else throw Error("Unrecognized modifier name: "+G)}if(X)Q="Alt-"+Q;if(Y)Q="Ctrl-"+Q;if(K)Q="Meta-"+Q;if(q)Q="Shift-"+Q;return Q}function MI(I,Z,J){if(Z.altKey)I="Alt-"+I;if(Z.ctrlKey)I="Ctrl-"+I;if(Z.metaKey)I="Meta-"+I;if(J!==!1&&Z.shiftKey)I="Shift-"+I;return I}var mM=M6.default(Y1.domEventHandlers({keydown(I,Z){return sM(vM(Z.state),I,Z,"editor")}})),vI=t.define({enables:mM}),vU=new WeakMap;function vM(I){let Z=I.facet(vI),J=vU.get(Z);if(!J)vU.set(Z,J=pM(Z.reduce((Q,X)=>Q.concat(X),[])));return J}var l6=null,cM=4000;function pM(I,Z=uM){let J=Object.create(null),Q=Object.create(null),X=(q,K)=>{let W=Q[q];if(W==null)Q[q]=K;else if(W!=K)throw Error("Key binding "+q+" is used both as a regular binding and as a multi-stroke prefix")},Y=(q,K,W,G,U)=>{var z,j;let O=J[q]||(J[q]=Object.create(null)),H=K.split(/ (?!$)/).map((_)=>$M(_,Z));for(let _=1;_<H.length;_++){let T=H.slice(0,_).join(" ");if(X(T,!0),!O[T])O[T]={preventDefault:!0,stopPropagation:!1,run:[(h)=>{let w=l6={view:h,prefix:T,scope:q};return setTimeout(()=>{if(l6==w)l6=null},cM),!0}]}}let N=H.join(" ");X(N,!1);let M=O[N]||(O[N]={preventDefault:!1,stopPropagation:!1,run:((j=(z=O._any)===null||z===void 0?void 0:z.run)===null||j===void 0?void 0:j.slice())||[]});if(W)M.run.push(W);if(G)M.preventDefault=!0;if(U)M.stopPropagation=!0};for(let q of I){let K=q.scope?q.scope.split(" "):["editor"];if(q.any)for(let G of K){let U=J[G]||(J[G]=Object.create(null));if(!U._any)U._any={preventDefault:!1,stopPropagation:!1,run:[]};let{any:z}=q;for(let j in U)U[j].run.push((O)=>z(O,hX))}let W=q[Z]||q.key;if(!W)continue;for(let G of K)if(Y(G,W,q.run,q.preventDefault,q.stopPropagation),q.shift)Y(G,"Shift-"+W,q.shift,q.preventDefault,q.stopPropagation)}return J}var hX=null;function sM(I,Z,J,Q){hX=Z;let X=OU(Z),Y=r2(X,0),q=a2(Y)==X.length&&X!=" ",K="",W=!1,G=!1,U=!1;if(l6&&l6.view==J&&l6.scope==Q){if(K=l6.prefix+" ",sz.indexOf(Z.keyCode)<0)G=!0,l6=null}let z=new Set,j=(M)=>{if(M){for(let _ of M.run)if(!z.has(_)){if(z.add(_),_(J)){if(M.stopPropagation)U=!0;return!0}}if(M.preventDefault){if(M.stopPropagation)U=!0;G=!0}}return!1},O=I[Q],H,N;if(O){if(j(O[K+MI(X,Z,!q)]))W=!0;else if(q&&(Z.altKey||Z.metaKey||Z.ctrlKey)&&!(r.windows&&Z.ctrlKey&&Z.altKey)&&!(r.mac&&Z.altKey&&!(Z.ctrlKey||Z.metaKey))&&(H=D6[Z.keyCode])&&H!=X){if(j(O[K+MI(H,Z,!0)]))W=!0;else if(Z.shiftKey&&(N=b8[Z.keyCode])!=X&&N!=H&&j(O[K+MI(N,Z,!1)]))W=!0}else if(q&&Z.shiftKey&&j(O[K+MI(X,Z,!0)]))W=!0;if(!W&&j(O._any))W=!0}if(G)W=!0;if(W&&U)Z.stopPropagation();return hX=null,W}class c5{constructor(I,Z,J,Q,X){this.className=I,this.left=Z,this.top=J,this.width=Q,this.height=X}draw(){let I=document.createElement("div");return I.className=this.className,this.adjust(I),I}update(I,Z){if(Z.className!=this.className)return!1;return this.adjust(I),!0}adjust(I){if(I.style.left=this.left+"px",I.style.top=this.top+"px",this.width!=null)I.style.width=this.width+"px";I.style.height=this.height+"px"}eq(I){return this.left==I.left&&this.top==I.top&&this.width==I.width&&this.height==I.height&&this.className==I.className}static forRange(I,Z,J){if(J.empty){let Q=I.coordsAtPos(J.head,J.assoc||1);if(!Q)return[];let X=GV(I);return[new c5(Z,Q.left-X.left,Q.top-X.top,null,Q.bottom-Q.top)]}else return dM(I,Z,J)}}function GV(I){let Z=I.scrollDOM.getBoundingClientRect();return{left:(I.textDirection==w1.LTR?Z.left:Z.right-I.scrollDOM.clientWidth*I.scaleX)-I.scrollDOM.scrollLeft*I.scaleX,top:Z.top-I.scrollDOM.scrollTop*I.scaleY}}function cU(I,Z,J,Q){let X=I.coordsAtPos(Z,J*2);if(!X)return Q;let Y=I.dom.getBoundingClientRect(),q=(X.top+X.bottom)/2,K=I.posAtCoords({x:Y.left+1,y:q}),W=I.posAtCoords({x:Y.right-1,y:q});if(K==null||W==null)return Q;return{from:Math.max(Q.from,Math.min(K,W)),to:Math.min(Q.to,Math.max(K,W))}}function dM(I,Z,J){if(J.to<=I.viewport.from||J.from>=I.viewport.to)return[];let Q=Math.max(J.from,I.viewport.from),X=Math.min(J.to,I.viewport.to),Y=I.textDirection==w1.LTR,q=I.contentDOM,K=q.getBoundingClientRect(),W=GV(I),G=q.querySelector(".cm-line"),U=G&&window.getComputedStyle(G),z=K.left+(U?parseInt(U.paddingLeft)+Math.min(0,parseInt(U.textIndent)):0),j=K.right-(U?parseInt(U.paddingRight):0),O=DX(I,Q,1),H=DX(I,X,-1),N=O.type==V0.Text?O:null,M=H.type==V0.Text?H:null;if(N&&(I.lineWrapping||O.widgetLineBreaks))N=cU(I,Q,1,N);if(M&&(I.lineWrapping||H.widgetLineBreaks))M=cU(I,X,-1,M);if(N&&M&&N.from==M.from&&N.to==M.to)return T(h(J.from,J.to,N));else{let L=N?h(J.from,null,N):w(O,!1),S=M?h(null,J.to,M):w(H,!0),B=[];if((N||O).to<(M||H).from-(N&&M?1:0)||O.widgetLineBreaks>1&&L.bottom+I.defaultLineHeight/2<S.top)B.push(_(z,L.bottom,j,S.top));else if(L.bottom<S.top&&I.elementAtHeight((L.bottom+S.top)/2).type==V0.Text)L.bottom=S.top=(L.bottom+S.top)/2;return T(L).concat(B).concat(T(S))}function _(L,S,B,E){return new c5(Z,L-W.left,S-W.top,Math.max(0,B-L),E-S)}function T({top:L,bottom:S,horizontal:B}){let E=[];for(let A=0;A<B.length;A+=2)E.push(_(B[A],L,B[A+1],S));return E}function h(L,S,B){let E=1e9,A=-1e9,i=[];function $(e,I1,q1,W1,Z1){let o=I.coordsAtPos(e,e==B.to?-2:2),m=I.coordsAtPos(q1,q1==B.from?2:-2);if(!o||!m)return;if(E=Math.min(o.top,m.top,E),A=Math.max(o.bottom,m.bottom,A),Z1==w1.LTR)i.push(Y&&I1?z:o.left,Y&&W1?j:m.right);else i.push(!Y&&W1?z:m.left,!Y&&I1?j:o.right)}let c=L!==null&&L!==void 0?L:B.from,K1=S!==null&&S!==void 0?S:B.to;for(let e of I.visibleRanges)if(e.to>c&&e.from<K1)for(let I1=Math.max(e.from,c),q1=Math.min(e.to,K1);;){let W1=I.state.doc.lineAt(I1);for(let Z1 of I.bidiSpans(W1)){let o=Z1.from+W1.from,m=Z1.to+W1.from;if(o>=q1)break;if(m>I1)$(Math.max(o,I1),L==null&&o<=c,Math.min(m,q1),S==null&&m>=K1,Z1.dir)}if(I1=W1.to+1,I1>=q1)break}if(i.length==0)$(c,L==null,K1,S==null,I.textDirection);return{top:E,bottom:A,horizontal:i}}function w(L,S){let B=K.top+(S?L.top:L.bottom);return{top:B,bottom:B,horizontal:[]}}}function iM(I,Z){return I.constructor==Z.constructor&&I.eq(Z)}class UV{constructor(I,Z){if(this.view=I,this.layer=Z,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=I.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),Z.above)this.dom.classList.add("cm-layer-above");if(Z.class)this.dom.classList.add(Z.class);if(this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(I.state),I.requestMeasure(this.measureReq),Z.mount)Z.mount(this.dom,I)}update(I){if(I.startState.facet(TI)!=I.state.facet(TI))this.setOrder(I.state);if(this.layer.update(I,this.dom)||I.geometryChanged)this.scale(),I.view.requestMeasure(this.measureReq)}docViewUpdate(I){if(this.layer.updateOnDocViewUpdate!==!1)I.requestMeasure(this.measureReq)}setOrder(I){let Z=0,J=I.facet(TI);while(Z<J.length&&J[Z]!=this.layer)Z++;this.dom.style.zIndex=String((this.layer.above?150:-1)-Z)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:I,scaleY:Z}=this.view;if(I!=this.scaleX||Z!=this.scaleY)this.scaleX=I,this.scaleY=Z,this.dom.style.transform=`scale(${1/I}, ${1/Z})`}draw(I){if(I.length!=this.drawn.length||I.some((Z,J)=>!iM(Z,this.drawn[J]))){let Z=this.dom.firstChild,J=0;for(let Q of I)if(Q.update&&Z&&Q.constructor&&this.drawn[J].constructor&&Q.update(Z,this.drawn[J]))Z=Z.nextSibling,J++;else this.dom.insertBefore(Q.draw(),Z);while(Z){let Q=Z.nextSibling;Z.remove(),Z=Q}if(this.drawn=I,r.webkit)this.dom.style.display=this.dom.firstChild?"":"none"}}destroy(){if(this.layer.destroy)this.layer.destroy(this.dom,this.view);this.dom.remove()}}var TI=t.define();function zV(I){return[M0.define((Z)=>new UV(Z,I)),TI.of(I)]}var v8=t.define({combine(I){return A6(I,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(Z,J)=>Math.min(Z,J),drawRangeCursor:(Z,J)=>Z||J})}});function VV(I={}){return[v8.of(I),lM,rM,tM,Az.of(!0)]}function jV(I){return I.startState.facet(v8)!=I.state.facet(v8)}var lM=zV({above:!0,markers(I){let{state:Z}=I,J=Z.facet(v8),Q=[];for(let X of Z.selection.ranges){let Y=X==Z.selection.main;if(X.empty||J.drawRangeCursor&&!(Y&&r.ios&&J.iosSelectionHandles)){let q=Y?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",K=X.empty?X:u.cursor(X.head,X.assoc);for(let W of c5.forRange(I,q,K))Q.push(W)}}return Q},update(I,Z){if(I.transactions.some((Q)=>Q.selection))Z.style.animationName=Z.style.animationName=="cm-blink"?"cm-blink2":"cm-blink";let J=jV(I);if(J)pU(I.state,Z);return I.docChanged||I.selectionSet||J},mount(I,Z){pU(Z.state,I)},class:"cm-cursorLayer"});function pU(I,Z){Z.style.animationDuration=I.facet(v8).cursorBlinkRate+"ms"}var rM=zV({above:!1,markers(I){let Z=[],{main:J,ranges:Q}=I.state.selection;for(let X of Q)if(!X.empty)for(let Y of c5.forRange(I,"cm-selectionBackground",X))Z.push(Y);if(r.ios&&!J.empty&&I.state.facet(v8).iosSelectionHandles){for(let X of c5.forRange(I,"cm-selectionHandle cm-selectionHandle-start",u.cursor(J.from,1)))Z.push(X);for(let X of c5.forRange(I,"cm-selectionHandle cm-selectionHandle-end",u.cursor(J.to,1)))Z.push(X)}return Z},update(I,Z){return I.docChanged||I.selectionSet||I.viewportChanged||jV(I)},class:"cm-selectionLayer"}),aM=r.gecko&&r.gecko_version==153?"#ffffff01":"transparent",tM=M6.highest(Y1.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${aM} !important`},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var jb=/x/.unicode!=null?"gu":"g";function OV(){return eM}var oM=P1.line({class:"cm-activeLine"}),eM=M0.fromClass(class{constructor(I){this.decorations=this.getDeco(I)}update(I){if(I.docChanged||I.selectionSet)this.decorations=this.getDeco(I.view)}getDeco(I){let Z=-1,J=[];for(let Q of I.state.selection.ranges){let X=I.lineBlockAt(Q.head);if(X.from>Z)J.push(oM.range(X.from)),Z=X.from}return P1.set(J)}},{decorations:(I)=>I.decorations});var AI="-10000px";class sX{constructor(I,Z,J,Q){this.facet=Z,this.createTooltipView=J,this.removeTooltipView=Q,this.input=I.state.facet(Z),this.tooltips=this.input.filter((Y)=>Y);let X=null;this.tooltipViews=this.tooltips.map((Y)=>X=J(Y,X))}update(I,Z){var J;let Q=I.state.facet(this.facet),X=Q.filter((K)=>K);if(Q===this.input){for(let K of this.tooltipViews)if(K.update)K.update(I);return!1}let Y=[],q=Z?[]:null;for(let K=0;K<X.length;K++){let W=X[K],G=-1;if(!W)continue;for(let U=0;U<this.tooltips.length;U++){let z=this.tooltips[U];if(z&&z.create==W.create)G=U}if(G<0){if(Y[K]=this.createTooltipView(W,K?Y[K-1]:null),q)q[K]=!!W.above}else{let U=Y[K]=this.tooltipViews[G];if(q)q[K]=Z[G];if(U.update)U.update(I)}}for(let K of this.tooltipViews)if(Y.indexOf(K)<0)this.removeTooltipView(K),(J=K.destroy)===null||J===void 0||J.call(K);if(Z)q.forEach((K,W)=>Z[W]=K),Z.length=q.length;return this.input=Q,this.tooltips=X,this.tooltipViews=Y,!0}}function IA(I){let Z=I.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:Z.clientHeight,right:Z.clientWidth}}var KX=t.define({combine:(I)=>{var Z,J,Q;return{position:r.ios?"absolute":((Z=I.find((X)=>X.position))===null||Z===void 0?void 0:Z.position)||"fixed",parent:((J=I.find((X)=>X.parent))===null||J===void 0?void 0:J.parent)||null,tooltipSpace:((Q=I.find((X)=>X.tooltipSpace))===null||Q===void 0?void 0:Q.tooltipSpace)||IA}}}),sU=new WeakMap,FV=M0.fromClass(class{constructor(I){this.view=I,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let Z=I.state.facet(KX);this.position=Z.position,this.parent=Z.parent,this.classes=I.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new sX(I,dX,(J,Q)=>this.createTooltip(J,Q),(J)=>{if(this.resizeObserver)this.resizeObserver.unobserve(J.dom);J.dom.remove()}),this.above=this.manager.tooltips.map((J)=>!!J.above),this.intersectionObserver=typeof IntersectionObserver=="function"?new IntersectionObserver((J)=>{if(Date.now()>this.lastTransaction-50&&J.length>0&&J[J.length-1].intersectionRatio<1)this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),I.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){if(this.parent)this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container);else this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let I of this.manager.tooltipViews)this.intersectionObserver.observe(I.dom)}}measureSoon(){if(this.measureTimeout<0)this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50)}update(I){if(I.transactions.length)this.lastTransaction=Date.now();let Z=this.manager.update(I,this.above);if(Z)this.observeIntersection();let J=Z||I.geometryChanged,Q=I.state.facet(KX);if(Q.position!=this.position&&!this.madeAbsolute){this.position=Q.position;for(let X of this.manager.tooltipViews)X.dom.style.position=this.position;J=!0}if(Q.parent!=this.parent){if(this.parent)this.container.remove();this.parent=Q.parent,this.createContainer();for(let X of this.manager.tooltipViews)this.container.appendChild(X.dom);J=!0}else if(this.parent&&this.view.themeClasses!=this.classes)this.classes=this.container.className=this.view.themeClasses;if(J)this.maybeMeasure()}createTooltip(I,Z){let J=I.create(this.view),Q=Z?Z.dom:null;if(J.dom.classList.add("cm-tooltip"),I.arrow&&!J.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let X=document.createElement("div");X.className="cm-tooltip-arrow",J.dom.appendChild(X)}if(J.dom.style.position=this.position,J.dom.style.top=AI,J.dom.style.left="0px",this.container.insertBefore(J.dom,Q),J.mount)J.mount(this.view);if(this.resizeObserver)this.resizeObserver.observe(J.dom);return J}destroy(){var I,Z,J;this.view.win.removeEventListener("resize",this.measureSoon);for(let Q of this.manager.tooltipViews)Q.dom.remove(),(I=Q.destroy)===null||I===void 0||I.call(Q);if(this.parent)this.container.remove();(Z=this.resizeObserver)===null||Z===void 0||Z.disconnect(),(J=this.intersectionObserver)===null||J===void 0||J.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let I=1,Z=1,J=!1;if(this.position=="fixed"&&this.manager.tooltipViews.length){let{dom:Y}=this.manager.tooltipViews[0];if(r.safari){let q=Y.getBoundingClientRect();J=Math.abs(q.top+1e4)>1||Math.abs(q.left)>1}else J=!!Y.offsetParent&&Y.offsetParent!=this.container.ownerDocument.body}if(J||this.position=="absolute")if(this.parent){let Y=this.parent.getBoundingClientRect();if(Y.width&&Y.height)I=Y.width/this.parent.offsetWidth,Z=Y.height/this.parent.offsetHeight}else({scaleX:I,scaleY:Z}=this.view.viewState);let Q=this.view.scrollDOM.getBoundingClientRect(),X=$X(this.view);return{visible:{left:Q.left+X.left,top:Q.top+X.top,right:Q.right-X.right,bottom:Q.bottom-X.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((Y,q)=>{let K=this.manager.tooltipViews[q];return K.getCoords?K.getCoords(Y.pos):this.view.coordsAtPos(Y.pos)}),size:this.manager.tooltipViews.map(({dom:Y})=>Y.getBoundingClientRect()),space:this.view.state.facet(KX).tooltipSpace(this.view),scaleX:I,scaleY:Z,makeAbsolute:J}}writeMeasure(I){var Z;if(I.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let K of this.manager.tooltipViews)K.dom.style.position="absolute"}let{visible:J,space:Q,scaleX:X,scaleY:Y}=I,q=[];for(let K=0;K<this.manager.tooltips.length;K++){let W=this.manager.tooltips[K],G=this.manager.tooltipViews[K],{dom:U}=G,z=I.pos[K],j=I.size[K];if(!z||W.clip!==!1&&(z.bottom<=Math.max(J.top,Q.top)||z.top>=Math.min(J.bottom,Q.bottom)||z.right<Math.max(J.left,Q.left)-0.1||z.left>Math.min(J.right,Q.right)+0.1)){U.style.top=AI;continue}let O=W.arrow?G.dom.querySelector(".cm-tooltip-arrow"):null,H=O?7:0,N=j.right-j.left,M=(Z=sU.get(G))!==null&&Z!==void 0?Z:j.bottom-j.top,_=G.offset||JA,T=this.view.textDirection==w1.LTR,h=j.width>Q.right-Q.left?T?Q.left:Q.right-j.width:T?Math.max(Q.left,Math.min(z.left-(O?14:0)+_.x,Q.right-N)):Math.min(Math.max(Q.left,z.left-N+(O?14:0)-_.x),Q.right-N),w=this.above[K];if(!W.strictSide&&(w?z.top-M-H-_.y<Q.top:z.bottom+M+H+_.y>Q.bottom)&&w==Q.bottom-z.bottom>z.top-Q.top)w=this.above[K]=!w;let L=(w?z.top-Q.top:Q.bottom-z.bottom)-H;if(L<M&&G.resize!==!1){if(L<this.view.defaultLineHeight){U.style.top=AI;continue}sU.set(G,M),U.style.height=(M=L)/Y+"px"}else if(U.style.height)U.style.height="";let S=w?z.top-M-H-_.y:z.bottom+H+_.y,B=h+N;if(G.overlap!==!0){for(let E of q)if(E.left<B&&E.right>h&&E.top<S+M&&E.bottom>S)S=w?E.top-M-2-H:E.bottom+H+2}if(this.position=="absolute")U.style.top=(S-I.parent.top)/Y+"px",dU(U,(h-I.parent.left)/X);else U.style.top=S/Y+"px",dU(U,h/X);if(O){let E=z.left+(T?_.x:-_.x)-(h+14-7);O.style.left=E/X+"px"}if(G.overlap!==!0)q.push({left:h,top:S,right:B,bottom:S+M});if(U.classList.toggle("cm-tooltip-above",w),U.classList.toggle("cm-tooltip-below",!w),G.positioned)G.positioned(I.space)}}maybeMeasure(){if(this.manager.tooltips.length){if(this.view.inView)this.view.requestMeasure(this.measureReq);if(this.inView!=this.view.inView){if(this.inView=this.view.inView,!this.inView)for(let I of this.manager.tooltipViews)I.dom.style.top=AI}}}},{eventObservers:{scroll(){this.maybeMeasure()}}});function dU(I,Z){let J=parseInt(I.style.left,10);if(isNaN(J)||Math.abs(Z-J)>1)I.style.left=Z+"px"}var ZA=Y1.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:"7px",width:"14px",position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent"},".cm-tooltip-above &":{bottom:"-7px","&:before":{borderTop:"7px solid #bbb"},"&:after":{borderTop:"7px solid #f5f5f5",bottom:"1px"}},".cm-tooltip-below &":{top:"-7px","&:before":{borderBottom:"7px solid #bbb"},"&:after":{borderBottom:"7px solid #f5f5f5",top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),JA={x:0,y:0},dX=t.define({enables:[FV,ZA]}),fI=t.define({combine:(I)=>I.reduce((Z,J)=>Z.concat(J),[])});class cI{static create(I){return new cI(I)}constructor(I){this.view=I,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new sX(I,fI,(Z,J)=>this.createHostedView(Z,J),(Z)=>Z.dom.remove())}createHostedView(I,Z){let J=I.create(this.view);if(J.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(J.dom,Z?Z.dom.nextSibling:this.dom.firstChild),this.mounted&&J.mount)J.mount(this.view);return J}mount(I){for(let Z of this.manager.tooltipViews)if(Z.mount)Z.mount(I);this.mounted=!0}positioned(I){for(let Z of this.manager.tooltipViews)if(Z.positioned)Z.positioned(I)}update(I){this.manager.update(I)}destroy(){var I;for(let Z of this.manager.tooltipViews)(I=Z.destroy)===null||I===void 0||I.call(Z)}passProp(I){let Z=void 0;for(let J of this.manager.tooltipViews){let Q=J[I];if(Q!==void 0){if(Z===void 0)Z=Q;else if(Z!==Q)return}}return Z}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}var QA=dX.compute([fI],(I)=>{let Z=I.facet(fI);if(Z.length===0)return null;return{pos:Math.min(...Z.map((J)=>J.pos)),end:Math.max(...Z.map((J)=>{var Q;return(Q=J.end)!==null&&Q!==void 0?Q:J.pos})),create:cI.create,above:Z[0].above,arrow:Z.some((J)=>J.arrow)}}),XA=t.define();class HV{constructor(I,Z,J,Q,X,Y){this.view=I,this.source=Z,this.field=J,this.locked=Q,this.setHover=X,this.hoverTime=Y,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:I.dom,time:0},this.checkHover=this.checkHover.bind(this),I.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),I.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(I){if(this.pending)this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20)}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let I=Date.now()-this.lastMove.time;if(I<this.hoverTime)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-I);else this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:I,lastMove:Z}=this,J=I.docView.tile.nearest(Z.target);if(!J)return;let Q,X=1;if(J.isWidget())Q=J.posAtStart;else{if(Q=I.posAtCoords(Z),Q==null)return;let Y=I.coordsAtPos(Q);if(!Y||Z.y<Y.top||Z.y>Y.bottom||Z.x<Y.left-I.defaultCharacterWidth||Z.x>Y.right+I.defaultCharacterWidth)return;let q=I.bidiSpans(I.state.doc.lineAt(Q)).find((W)=>W.from<=Q&&W.to>=Q),K=q&&q.dir==w1.RTL?-1:1;X=Z.x<Y.left?-K:K}this.activateHover(I,Q,X)}activateHover(I,Z,J,Q){let X=this.source(I,Z,J),Y=(q)=>{if(q&&!(Array.isArray(q)&&!q.length)){let K=Array.isArray(q)?q:[q];if(Q)this.locked.set(K,Q);I.dispatch({effects:this.setHover.of(K)})}};if(X&&"then"in X){let q=this.pending={pos:Z};X.then((K)=>{if(this.pending==q)this.pending=null,Y(K)},(K)=>d0(I.state,K,"hover tooltip"))}else Y(X)}get tooltip(){let I=this.view.plugin(FV),Z=I?I.manager.tooltips.findIndex((J)=>J.create==cI.create):-1;return Z>-1?I.manager.tooltipViews[Z]:null}mousemove(I){var Z,J;if(this.lastMove={x:I.clientX,y:I.clientY,target:I.target,time:Date.now()},this.hoverTimeout<0)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime);let{active:Q,tooltip:X}=this;if(Q.length&&!this.locked.has(Q)&&X&&!YA(X.dom,I)||this.pending){let{pos:Y}=Q[0]||this.pending,q=(J=(Z=Q[0])===null||Z===void 0?void 0:Z.end)!==null&&J!==void 0?J:Y;if(Y==q?this.view.posAtCoords(this.lastMove)!=Y:!qA(this.view,Y,q,I.clientX,I.clientY))this.view.dispatch({effects:this.setHover.of([])}),this.pending=null}}mouseleave(I){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:Z}=this;if(Z.length&&!this.locked.has(Z)){let{tooltip:J}=this;if(!(J&&J.dom.contains(I.relatedTarget)))this.view.dispatch({effects:this.setHover.of([])});else this.watchTooltipLeave(J.dom)}}watchTooltipLeave(I){let Z=(J)=>{I.removeEventListener("mouseleave",Z);let{active:Q}=this;if(Q.length&&!this.locked.has(Q)&&!this.view.dom.contains(J.relatedTarget))this.view.dispatch({effects:this.setHover.of([])})};I.addEventListener("mouseleave",Z)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}var DI=4;function YA(I,Z){let{left:J,right:Q,top:X,bottom:Y}=I.getBoundingClientRect(),q;if(q=I.querySelector(".cm-tooltip-arrow")){let K=q.getBoundingClientRect();X=Math.min(K.top,X),Y=Math.max(K.bottom,Y)}return Z.clientX>=J-DI&&Z.clientX<=Q+DI&&Z.clientY>=X-DI&&Z.clientY<=Y+DI}function qA(I,Z,J,Q,X,Y){let q=I.scrollDOM.getBoundingClientRect(),K=I.documentTop+I.documentPadding.top+I.contentHeight;if(q.left>Q||q.right<Q||q.top>X||Math.min(q.bottom,K)<X)return!1;let W=I.posAtCoords({x:Q,y:X},!1);return W>=Z&&W<=J}function NV(I,Z={}){let J=B1.define(),Q=new WeakMap,X=R0.define({create(){return[]},update(q,K){let W=Q.get(q);if(q.length){if(Z.hideOnChange&&(K.docChanged||K.selection))q=[];else if(W&&W(K))q=[];else if(Z.hideOn)q=q.filter((G)=>!Z.hideOn(K,G))}if(K.docChanged&&q.length){let G=[];for(let U of q){let z=K.changes.mapPos(U.pos,-1,_0.TrackDel);if(z!=null){let j=Object.assign(Object.create(null),U);if(j.pos=z,j.end!=null)j.end=K.changes.mapPos(j.end);G.push(j)}}q=G}for(let G of K.effects){if(G.is(J))q=G.value,W=void 0;if(G.is(KA)&&!G.value||G.value==X)q=[]}if(q.length&&W)Q.set(q,W);return q},provide:(q)=>fI.from(q)}),Y=M0.define((q)=>new HV(q,I,X,Q,J,Z.hoverTime||300));return{active:X,extension:[X,Y,XA.of(Y),QA]}}var KA=B1.define();var iU=t.define({combine(I){let Z,J;for(let Q of I)Z=Z||Q.topContainer,J=J||Q.bottomContainer;return{topContainer:Z,bottomContainer:J}}});var WA=M0.fromClass(class{constructor(I){this.input=I.state.facet(c8),this.specs=this.input.filter((J)=>J),this.panels=this.specs.map((J)=>J(I));let Z=I.state.facet(iU);this.top=new W3(I,!0,Z.topContainer),this.bottom=new W3(I,!1,Z.bottomContainer),this.top.sync(this.panels.filter((J)=>J.top)),this.bottom.sync(this.panels.filter((J)=>!J.top));for(let J of this.panels)if(J.dom.classList.add("cm-panel"),J.mount)J.mount()}update(I){let Z=I.state.facet(iU);if(this.top.container!=Z.topContainer)this.top.sync([]),this.top=new W3(I.view,!0,Z.topContainer);if(this.bottom.container!=Z.bottomContainer)this.bottom.sync([]),this.bottom=new W3(I.view,!1,Z.bottomContainer);this.top.syncClasses(),this.bottom.syncClasses();let J=I.state.facet(c8);if(J!=this.input){let Q=J.filter((W)=>W),X=[],Y=[],q=[],K=[];for(let W of Q){let G=this.specs.indexOf(W),U;if(G<0)U=W(I.view),K.push(U);else if(U=this.panels[G],U.update)U.update(I);X.push(U),(U.top?Y:q).push(U)}this.specs=Q,this.panels=X,this.top.sync(Y),this.bottom.sync(q);for(let W of K)if(W.dom.classList.add("cm-panel"),W.mount)W.mount()}else for(let Q of this.panels)if(Q.update)Q.update(I)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:(I)=>Y1.scrollMargins.of((Z)=>{let J=Z.plugin(I);return J&&{top:J.top.scrollMargin(),bottom:J.bottom.scrollMargin()}})});class W3{constructor(I,Z,J){this.view=I,this.top=Z,this.container=J,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(I){for(let Z of this.panels)if(Z.destroy&&I.indexOf(Z)<0)Z.destroy();this.panels=I,this.syncDOM()}syncDOM(){if(this.panels.length==0){if(this.dom)this.dom.remove(),this.dom=void 0;return}if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom";let Z=this.container||this.view.dom;Z.insertBefore(this.dom,this.top?Z.firstChild:null)}let I=this.dom.firstChild;for(let Z of this.panels)if(Z.dom.parentNode==this.dom){while(I!=Z.dom)I=lU(I);I=I.nextSibling}else this.dom.insertBefore(Z.dom,I);while(I)I=lU(I)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(!this.container||this.classes==this.view.themeClasses)return;for(let I of this.classes.split(" "))if(I)this.container.classList.remove(I);for(let I of(this.classes=this.view.themeClasses).split(" "))if(I)this.container.classList.add(I)}}function lU(I){let Z=I.nextSibling;return I.remove(),Z}var c8=t.define({enables:WA});class l4 extends N6{compare(I){return this==I||this.constructor==I.constructor&&this.eq(I)}eq(I){return!1}destroy(I){}}l4.prototype.elementClass="";l4.prototype.toDOM=void 0;l4.prototype.mapMode=_0.TrackBefore;l4.prototype.startSide=l4.prototype.endSide=-1;l4.prototype.point=!0;var WX=t.define(),GA=t.define();var EI=t.define();var CX=t.define({combine:(I)=>I.some((Z)=>Z)});function UA(I){let Z=[zA];if(I&&I.fixed===!1)Z.push(CX.of(!0));return Z}var zA=M0.fromClass(class{constructor(I){this.view=I,this.domAfter=null,this.prevViewport=I.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=I.state.facet(EI).map((Z)=>new kX(I,Z)),this.fixed=!I.state.facet(CX);for(let Z of this.gutters)if(Z.config.side=="after")this.getDOMAfter().appendChild(Z.dom);else this.dom.appendChild(Z.dom);if(this.fixed)this.dom.style.position="sticky";this.syncGutters(!1),I.scrollDOM.insertBefore(this.dom,I.contentDOM)}getDOMAfter(){if(!this.domAfter)this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter);return this.domAfter}update(I){if(this.updateGutters(I)){let Z=this.prevViewport,J=I.view.viewport,Q=Math.min(Z.to,J.to)-Math.max(Z.from,J.from);this.syncGutters(Q<(J.to-J.from)*0.8)}if(I.geometryChanged){let Z=this.view.contentHeight/this.view.scaleY+"px";if(this.dom.style.minHeight=Z,this.domAfter)this.domAfter.style.minHeight=Z}if(this.view.state.facet(CX)!=!this.fixed){if(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter)this.domAfter.style.position=this.fixed?"sticky":""}this.prevViewport=I.view.viewport}syncGutters(I){let Z=this.dom.nextSibling;if(I){if(this.dom.remove(),this.domAfter)this.domAfter.remove()}let J=R1.iter(this.view.state.facet(WX),this.view.viewport.from),Q=[],X=this.gutters.map((Y)=>new RV(Y,this.view.viewport,-this.view.documentPadding.top));for(let Y of this.view.viewportLineBlocks){if(Q.length)Q=[];if(Array.isArray(Y.type)){let q=!0;for(let K of Y.type)if(K.type==V0.Text&&q){wX(J,Q,K.from);for(let W of X)W.line(this.view,K,Q);q=!1}else if(K.widget)for(let W of X)W.widget(this.view,K)}else if(Y.type==V0.Text){wX(J,Q,Y.from);for(let q of X)q.line(this.view,Y,Q)}else if(Y.widget)for(let q of X)q.widget(this.view,Y)}for(let Y of X)Y.finish();if(I){if(this.view.scrollDOM.insertBefore(this.dom,Z),this.domAfter)this.view.scrollDOM.appendChild(this.domAfter)}}updateGutters(I){let Z=I.startState.facet(EI),J=I.state.facet(EI),Q=I.docChanged||I.heightChanged||I.viewportChanged||!R1.eq(I.startState.facet(WX),I.state.facet(WX),I.view.viewport.from,I.view.viewport.to);if(Z==J){for(let X of this.gutters)if(X.update(I))Q=!0}else{Q=!0;let X=[];for(let Y of J){let q=Z.indexOf(Y);if(q<0)X.push(new kX(this.view,Y));else this.gutters[q].update(I),X.push(this.gutters[q])}for(let Y of this.gutters)if(Y.dom.remove(),X.indexOf(Y)<0)Y.destroy();for(let Y of X)if(Y.config.side=="after")this.getDOMAfter().appendChild(Y.dom);else this.dom.appendChild(Y.dom);this.gutters=X}return Q}destroy(){for(let I of this.gutters)I.destroy();if(this.dom.remove(),this.domAfter)this.domAfter.remove()}},{provide:(I)=>Y1.scrollMargins.of((Z)=>{let J=Z.plugin(I);if(!J||J.gutters.length==0||!J.fixed)return null;let Q=J.dom.offsetWidth*Z.scaleX,X=J.domAfter?J.domAfter.offsetWidth*Z.scaleX:0;return Z.textDirection==w1.LTR?{left:Q,right:X}:{right:Q,left:X}})});function rU(I){return Array.isArray(I)?I:[I]}function wX(I,Z,J){while(I.value&&I.from<=J){if(I.from==J)Z.push(I.value);I.next()}}class RV{constructor(I,Z,J){this.gutter=I,this.height=J,this.i=0,this.cursor=R1.iter(I.markers,Z.from)}addElement(I,Z,J){let{gutter:Q}=this,X=(Z.top-this.height)/I.scaleY,Y=Z.height/I.scaleY;if(this.i==Q.elements.length){let q=new iX(I,Y,X,J);Q.elements.push(q),Q.dom.appendChild(q.dom)}else Q.elements[this.i].update(I,Y,X,J);this.height=Z.bottom,this.i++}line(I,Z,J){let Q=[];if(wX(this.cursor,Q,Z.from),J.length)Q=Q.concat(J);let X=this.gutter.config.lineMarker(I,Z,Q);if(X)Q.unshift(X);let Y=this.gutter;if(Q.length==0&&!Y.config.renderEmptyElements)return;this.addElement(I,Z,Q)}widget(I,Z){let J=this.gutter.config.widgetMarker(I,Z.widget,Z),Q=J?[J]:null;for(let X of I.state.facet(GA)){let Y=X(I,Z.widget,Z);if(Y)(Q||(Q=[])).push(Y)}if(Q)this.addElement(I,Z,Q)}finish(){let I=this.gutter;while(I.elements.length>this.i){let Z=I.elements.pop();I.dom.removeChild(Z.dom),Z.destroy()}}}class kX{constructor(I,Z){this.view=I,this.config=Z,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let J in Z.domEventHandlers)this.dom.addEventListener(J,(Q)=>{let X=Q.target,Y;if(X!=this.dom&&this.dom.contains(X)){while(X.parentNode!=this.dom)X=X.parentNode;let K=X.getBoundingClientRect();Y=(K.top+K.bottom)/2}else Y=Q.clientY;let q=I.lineBlockAtHeight(Y-I.documentTop);if(Z.domEventHandlers[J](I,q,Q))Q.preventDefault()});if(this.markers=rU(Z.markers(I)),Z.initialSpacer)this.spacer=new iX(I,0,0,[Z.initialSpacer(I)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none"}update(I){let Z=this.markers;if(this.markers=rU(this.config.markers(I.view)),this.spacer&&this.config.updateSpacer){let Q=this.config.updateSpacer(this.spacer.markers[0],I);if(Q!=this.spacer.markers[0])this.spacer.update(I.view,0,0,[Q])}let J=I.view.viewport;return!R1.eq(this.markers,Z,J.from,J.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(I):!1)}destroy(){for(let I of this.elements)I.destroy()}}class iX{constructor(I,Z,J,Q){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(I,Z,J,Q)}update(I,Z,J,Q){if(this.height!=Z)this.height=Z,this.dom.style.height=Z+"px";if(this.above!=J)this.dom.style.marginTop=(this.above=J)?J+"px":"";if(!VA(this.markers,Q))this.setMarkers(I,Q)}setMarkers(I,Z){let J="cm-gutterElement",Q=this.dom.firstChild;for(let X=0,Y=0;;){let q=Y,K=X<Z.length?Z[X++]:null,W=!1;if(K){let G=K.elementClass;if(G)J+=" "+G;for(let U=Y;U<this.markers.length;U++)if(this.markers[U].compare(K)){q=U,W=!0;break}}else q=this.markers.length;while(Y<q){let G=this.markers[Y++];if(G.toDOM){G.destroy(Q);let U=Q.nextSibling;Q.remove(),Q=U}}if(!K)break;if(K.toDOM)if(W)Q=Q.nextSibling;else this.dom.insertBefore(K.toDOM(I),Q);if(W)Y++}this.dom.className=J,this.markers=Z}destroy(){this.setMarkers(null,[])}}function VA(I,Z){if(I.length!=Z.length)return!1;for(let J=0;J<I.length;J++)if(!I[J].compare(Z[J]))return!1;return!0}var jA=t.define(),OA=t.define(),n8=t.define({combine(I){return A6(I,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(Z,J){let Q=Object.assign({},Z);for(let X in J){let Y=Q[X],q=J[X];Q[X]=Y?(K,W,G)=>Y(K,W,G)||q(K,W,G):q}return Q}})}});class hI extends l4{constructor(I){super();this.number=I}eq(I){return this.number==I.number}toDOM(){return document.createTextNode(this.number)}}function GX(I,Z){return I.state.facet(n8).formatNumber(Z,I.state)}var FA=EI.compute([n8],(I)=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(Z){return Z.state.facet(jA)},lineMarker(Z,J,Q){if(Q.some((X)=>X.toDOM))return null;return new hI(GX(Z,Z.state.doc.lineAt(J.from).number))},widgetMarker:(Z,J,Q)=>{for(let X of Z.state.facet(OA)){let Y=X(Z,J,Q);if(Y)return Y}return null},lineMarkerChange:(Z)=>Z.startState.facet(n8)!=Z.state.facet(n8),initialSpacer(Z){return new hI(GX(Z,aU(Z.state.doc.lines)))},updateSpacer(Z,J){let Q=GX(J.view,aU(J.view.state.doc.lines));return Q==Z.number?Z:new hI(Q)},domEventHandlers:I.facet(n8).domEventHandlers,side:"before"}));function MV(I={}){return[n8.of(I),UA(),FA]}function aU(I){let Z=9;while(Z<I)Z=Z*10+9;return Z}var HA=0;class sI{constructor(I,Z){this.from=I,this.to=Z}}class H1{constructor(I={}){this.id=HA++,this.perNode=!!I.perNode,this.deserialize=I.deserialize||(()=>{throw Error("This node type doesn't define a deserialize function")}),this.combine=I.combine||null}add(I){if(this.perNode)throw RangeError("Can't add per-node props to node types");if(typeof I!="function")I=C0.match(I);return(Z)=>{let J=I(Z);return J===void 0?null:[this,J]}}}H1.closedBy=new H1({deserialize:(I)=>I.split(" ")});H1.openedBy=new H1({deserialize:(I)=>I.split(" ")});H1.group=new H1({deserialize:(I)=>I.split(" ")});H1.isolate=new H1({deserialize:(I)=>{if(I&&I!="rtl"&&I!="ltr"&&I!="auto")throw RangeError("Invalid value for isolate: "+I);return I||"auto"}});H1.contextHash=new H1({perNode:!0});H1.lookAhead=new H1({perNode:!0});H1.mounted=new H1({perNode:!0});class p8{constructor(I,Z,J,Q=!1){this.tree=I,this.overlay=Z,this.parser=J,this.bracketed=Q}static get(I){return I&&I.props&&I.props[H1.mounted.id]}}var NA=Object.create(null);class C0{constructor(I,Z,J,Q=0){this.name=I,this.props=Z,this.id=J,this.flags=Q}static define(I){let Z=I.props&&I.props.length?Object.create(null):NA,J=(I.top?1:0)|(I.skipped?2:0)|(I.error?4:0)|(I.name==null?8:0),Q=new C0(I.name||"",Z,I.id,J);if(I.props)for(let X of I.props){if(!Array.isArray(X))X=X(Q);if(X){if(X[0].perNode)throw RangeError("Can't store a per-node prop on a node type");Z[X[0].id]=X[1]}}return Q}prop(I){return this.props[I.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(I){if(typeof I=="string"){if(this.name==I)return!0;let Z=this.prop(H1.group);return Z?Z.indexOf(I)>-1:!1}return this.id==I}static match(I){let Z=Object.create(null);for(let J in I)for(let Q of J.split(" "))Z[Q]=I[J];return(J)=>{for(let Q=J.prop(H1.group),X=-1;X<(Q?Q.length:0);X++){let Y=Z[X<0?J.name:Q[X]];if(Y)return Y}}}}C0.none=new C0("",Object.create(null),0,8);class lI{constructor(I){this.types=I;for(let Z=0;Z<I.length;Z++)if(I[Z].id!=Z)throw RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...I){let Z=[];for(let J of this.types){let Q=null;for(let X of I){let Y=X(J);if(Y){if(!Q)Q=Object.assign({},J.props);let q=Y[1],K=Y[0];if(K.combine&&K.id in Q)q=K.combine(Q[K.id],q);Q[K.id]=q}}Z.push(Q?new C0(J.name,Q,J.id,J.flags):J)}return new lI(Z)}}var pI=new WeakMap,AV=new WeakMap,d1;(function(I){I[I.ExcludeBuffers=1]="ExcludeBuffers",I[I.IncludeAnonymous=2]="IncludeAnonymous",I[I.IgnoreMounts=4]="IgnoreMounts",I[I.IgnoreOverlays=8]="IgnoreOverlays",I[I.EnterBracketed=16]="EnterBracketed"})(d1||(d1={}));class g1{constructor(I,Z,J,Q,X){if(this.type=I,this.children=Z,this.positions=J,this.length=Q,this.props=null,X&&X.length){this.props=Object.create(null);for(let[Y,q]of X)this.props[typeof Y=="number"?Y:Y.id]=q}}toString(){let I=p8.get(this);if(I&&!I.overlay)return I.tree.toString();let Z="";for(let J of this.children){let Q=J.toString();if(Q){if(Z)Z+=",";Z+=Q}}return!this.type.name?Z:(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(Z.length?"("+Z+")":"")}cursor(I=0){return new iI(this.topNode,I)}cursorAt(I,Z=0,J=0){let Q=pI.get(this)||this.topNode,X=new iI(Q);return X.moveTo(I,Z),pI.set(this,X._tree),X}get topNode(){return new J4(this,0,0,null)}resolve(I,Z=0){let J=D3(pI.get(this)||this.topNode,I,Z,!1);return pI.set(this,J),J}resolveInner(I,Z=0){let J=D3(AV.get(this)||this.topNode,I,Z,!0);return AV.set(this,J),J}resolveStack(I,Z=0){return RA(this,I,Z)}iterate(I){let{enter:Z,leave:J,from:Q=0,to:X=this.length}=I,Y=I.mode||0,q=(Y&d1.IncludeAnonymous)>0;for(let K=this.cursor(Y|d1.IncludeAnonymous);;){let W=!1;if(K.from<=X&&K.to>=Q&&(!q&&K.type.isAnonymous||Z(K)!==!1)){if(K.firstChild())continue;W=!0}for(;;){if(W&&J&&(q||!K.type.isAnonymous))J(K);if(K.nextSibling())break;if(!K.parent())return;W=!0}}}prop(I){return!I.perNode?this.type.prop(I):this.props?this.props[I.id]:void 0}get propValues(){let I=[];if(this.props)for(let Z in this.props)I.push([+Z,this.props[Z]]);return I}balance(I={}){return this.children.length<=8?this:oX(C0.none,this.children,this.positions,0,this.children.length,0,this.length,(Z,J,Q)=>new g1(this.type,Z,J,Q,this.propValues),I.makeTree||((Z,J,Q)=>new g1(C0.none,Z,J,Q)))}static build(I){return MA(I)}}g1.empty=new g1(C0.none,[],[],0);class rX{constructor(I,Z){this.buffer=I,this.index=Z}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new rX(this.buffer,this.index)}}class o6{constructor(I,Z,J){this.buffer=I,this.length=Z,this.set=J}get type(){return C0.none}toString(){let I=[];for(let Z=0;Z<this.buffer.length;)I.push(this.childString(Z)),Z=this.buffer[Z+3];return I.join(",")}childString(I){let Z=this.buffer[I],J=this.buffer[I+3],Q=this.set.types[Z],X=Q.name;if(/\W/.test(X)&&!Q.isError)X=JSON.stringify(X);if(I+=4,J==I)return X;let Y=[];while(I<J)Y.push(this.childString(I)),I=this.buffer[I+3];return X+"("+Y.join(",")+")"}findChild(I,Z,J,Q,X){let{buffer:Y}=this,q=-1;for(let K=I;K!=Z;K=Y[K+3])if(BV(X,Q,Y[K+1],Y[K+2])){if(q=K,J>0)break}return q}slice(I,Z,J){let Q=this.buffer,X=new Uint16Array(Z-I),Y=0;for(let q=I,K=0;q<Z;){X[K++]=Q[q++],X[K++]=Q[q++]-J;let W=X[K++]=Q[q++]-J;X[K++]=Q[q++]-I,Y=Math.max(Y,W)}return new o6(X,Y,this.set)}}function BV(I,Z,J,Q){switch(I){case-2:return J<Z;case-1:return Q>=Z&&J<Z;case 0:return J<Z&&Q>Z;case 1:return J<=Z&&Q>Z;case 2:return Q>Z;case 4:return!0}}function D3(I,Z,J,Q){var X;while(I.from==I.to||(J<1?I.from>=Z:I.from>Z)||(J>-1?I.to<=Z:I.to<Z)){let q=!Q&&I instanceof J4&&I.index<0?null:I.parent;if(!q)return I;I=q}let Y=Q?0:d1.IgnoreOverlays;if(Q){for(let q=I,K=q.parent;K;q=K,K=q.parent)if(q instanceof J4&&q.index<0&&((X=K.enter(Z,J,Y))===null||X===void 0?void 0:X.from)!=q.from)I=K}for(;;){let q=I.enter(Z,J,Y);if(!q)return I;I=q}}class aX{cursor(I=0){return new iI(this,I)}getChild(I,Z=null,J=null){let Q=DV(this,I,Z,J);return Q.length?Q[0]:null}getChildren(I,Z=null,J=null){return DV(this,I,Z,J)}resolve(I,Z=0){return D3(this,I,Z,!1)}resolveInner(I,Z=0){return D3(this,I,Z,!0)}matchContext(I){return lX(this.parent,I)}enterUnfinishedNodesBefore(I){let Z=this.childBefore(I),J=this;while(Z){let Q=Z.lastChild;if(!Q||Q.to!=Z.to)break;if(Q.type.isError&&Q.from==Q.to)J=Z,Z=Q.prevSibling;else Z=Q}return J}get node(){return this}get next(){return this.parent}}class J4 extends aX{constructor(I,Z,J,Q){super();this._tree=I,this.from=Z,this.index=J,this._parent=Q}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(I,Z,J,Q,X=0){for(let Y=this;;){for(let{children:q,positions:K}=Y._tree,W=Z>0?q.length:-1;I!=W;I+=Z){let G=q[I],U=K[I]+Y.from,z;if(!(X&d1.EnterBracketed&&G instanceof g1&&(z=p8.get(G))&&!z.overlay&&z.bracketed&&J>=U&&J<=U+G.length)&&!BV(Q,J,U,U+G.length))continue;if(G instanceof o6){if(X&d1.ExcludeBuffers)continue;let j=G.findChild(0,G.buffer.length,Z,J-U,Q);if(j>-1)return new t6(new PV(Y,G,I,U),null,j)}else if(X&d1.IncludeAnonymous||(!G.type.isAnonymous||tX(G))){let j;if(!(X&d1.IgnoreMounts)&&(j=p8.get(G))&&!j.overlay)return new J4(j.tree,U,I,Y);let O=new J4(G,U,I,Y);return X&d1.IncludeAnonymous||!O.type.isAnonymous?O:O.nextChild(Z<0?G.children.length-1:0,Z,J,Q,X)}}if(X&d1.IncludeAnonymous||!Y.type.isAnonymous)return null;if(Y.index>=0)I=Y.index+Z;else I=Z<0?-1:Y._parent._tree.children.length;if(Y=Y._parent,!Y)return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(I){return this.nextChild(0,1,I,2)}childBefore(I){return this.nextChild(this._tree.children.length-1,-1,I,-2)}prop(I){return this._tree.prop(I)}enter(I,Z,J=0){let Q;if(!(J&d1.IgnoreOverlays)&&(Q=p8.get(this._tree))&&Q.overlay){let X=I-this.from,Y=J&d1.EnterBracketed&&Q.bracketed;for(let{from:q,to:K}of Q.overlay)if((Z>0||Y?q<=X:q<X)&&(Z<0||Y?K>=X:K>X))return new J4(Q.tree,Q.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,I,Z,J)}nextSignificantParent(){let I=this;while(I.type.isAnonymous&&I._parent)I=I._parent;return I}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function DV(I,Z,J,Q){let X=I.cursor(),Y=[];if(!X.firstChild())return Y;if(J!=null){for(let q=!1;!q;)if(q=X.type.is(J),!X.nextSibling())return Y}for(;;){if(Q!=null&&X.type.is(Q))return Y;if(X.type.is(Z))Y.push(X.node);if(!X.nextSibling())return Q==null?Y:[]}}function lX(I,Z,J=Z.length-1){for(let Q=I;J>=0;Q=Q.parent){if(!Q)return!1;if(!Q.type.isAnonymous){if(Z[J]&&Z[J]!=Q.name)return!1;J--}}return!0}class PV{constructor(I,Z,J,Q){this.parent=I,this.buffer=Z,this.index=J,this.start=Q}}class t6 extends aX{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(I,Z,J){super();this.context=I,this._parent=Z,this.index=J,this.type=I.buffer.set.types[I.buffer.buffer[J]]}child(I,Z,J){let{buffer:Q}=this.context,X=Q.findChild(this.index+4,Q.buffer[this.index+3],I,Z-this.context.start,J);return X<0?null:new t6(this.context,this,X)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(I){return this.child(1,I,2)}childBefore(I){return this.child(-1,I,-2)}prop(I){return this.type.prop(I)}enter(I,Z,J=0){if(J&d1.ExcludeBuffers)return null;let{buffer:Q}=this.context,X=Q.findChild(this.index+4,Q.buffer[this.index+3],Z>0?1:-1,I-this.context.start,Z);return X<0?null:new t6(this.context,this,X)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(I){return this._parent?null:this.context.parent.nextChild(this.context.index+I,I,0,4)}get nextSibling(){let{buffer:I}=this.context,Z=I.buffer[this.index+3];if(Z<(this._parent?I.buffer[this._parent.index+3]:I.buffer.length))return new t6(this.context,this._parent,Z);return this.externalSibling(1)}get prevSibling(){let{buffer:I}=this.context,Z=this._parent?this._parent.index+4:0;if(this.index==Z)return this.externalSibling(-1);return new t6(this.context,this._parent,I.findChild(Z,this.index,-1,0,4))}get tree(){return null}toTree(){let I=[],Z=[],{buffer:J}=this.context,Q=this.index+4,X=J.buffer[this.index+3];if(X>Q){let Y=J.buffer[this.index+1];I.push(J.slice(Q,X,Y)),Z.push(0)}return new g1(this.type,I,Z,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function SV(I){if(!I.length)return null;let Z=0,J=I[0];for(let Y=1;Y<I.length;Y++){let q=I[Y];if(q.from>J.from||q.to<J.to)J=q,Z=Y}let Q=J instanceof J4&&J.index<0?null:J.parent,X=I.slice();if(Q)X[Z]=Q;else X.splice(Z,1);return new _V(X,J)}class _V{constructor(I,Z){this.heads=I,this.node=Z}get next(){return SV(this.heads)}}function RA(I,Z,J){let Q=I.resolveInner(Z,J),X=null;for(let Y=Q instanceof J4?Q:Q.context.parent;Y;Y=Y.parent)if(Y.index<0){let q=Y.parent;(X||(X=[Q])).push(q.resolve(Z,J)),Y=q}else{let q=p8.get(Y.tree);if(q&&q.overlay&&q.overlay[0].from<=Z&&q.overlay[q.overlay.length-1].to>=Z){let K=new J4(q.tree,q.overlay[0].from+Y.from,-1,Y);(X||(X=[Q])).push(D3(K,Z,J,!1))}}return X?SV(X):Q}class iI{get name(){return this.type.name}constructor(I,Z=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=Z&~d1.EnterBracketed,I instanceof J4)this.yieldNode(I);else{this._tree=I.context.parent,this.buffer=I.context;for(let J=I._parent;J;J=J._parent)this.stack.unshift(J.index);this.bufferNode=I,this.yieldBuf(I.index)}}yieldNode(I){if(!I)return!1;return this._tree=I,this.type=I.type,this.from=I.from,this.to=I.to,!0}yieldBuf(I,Z){this.index=I;let{start:J,buffer:Q}=this.buffer;return this.type=Z||Q.set.types[Q.buffer[I]],this.from=J+Q.buffer[I+1],this.to=J+Q.buffer[I+2],!0}yield(I){if(!I)return!1;if(I instanceof J4)return this.buffer=null,this.yieldNode(I);return this.buffer=I.context,this.yieldBuf(I.index,I.type)}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(I,Z,J){if(!this.buffer)return this.yield(this._tree.nextChild(I<0?this._tree._tree.children.length-1:0,I,Z,J,this.mode));let{buffer:Q}=this.buffer,X=Q.findChild(this.index+4,Q.buffer[this.index+3],I,Z-this.buffer.start,J);if(X<0)return!1;return this.stack.push(this.index),this.yieldBuf(X)}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(I){return this.enterChild(1,I,2)}childBefore(I){return this.enterChild(-1,I,-2)}enter(I,Z,J=this.mode){if(!this.buffer)return this.yield(this._tree.enter(I,Z,J));return J&d1.ExcludeBuffers?!1:this.enterChild(1,I,Z)}parent(){if(!this.buffer)return this.yieldNode(this.mode&d1.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let I=this.mode&d1.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(I)}sibling(I){if(!this.buffer)return!this._tree._parent?!1:this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+I,I,0,4,this.mode));let{buffer:Z}=this.buffer,J=this.stack.length-1;if(I<0){let Q=J<0?0:this.stack[J]+4;if(this.index!=Q)return this.yieldBuf(Z.findChild(Q,this.index,-1,0,4))}else{let Q=Z.buffer[this.index+3];if(Q<(J<0?Z.buffer.length:Z.buffer[this.stack[J]+3]))return this.yieldBuf(Q)}return J<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+I,I,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(I){let Z,J,{buffer:Q}=this;if(Q){if(I>0){if(this.index<Q.buffer.buffer.length)return!1}else for(let X=0;X<this.index;X++)if(Q.buffer.buffer[X+3]<this.index)return!1;({index:Z,parent:J}=Q)}else({index:Z,_parent:J}=this._tree);for(;J;{index:Z,_parent:J}=J)if(Z>-1)for(let X=Z+I,Y=I<0?-1:J._tree.children.length;X!=Y;X+=I){let q=J._tree.children[X];if(this.mode&d1.IncludeAnonymous||q instanceof o6||!q.type.isAnonymous||tX(q))return!1}return!0}move(I,Z){if(Z&&this.enterChild(I,0,4))return!0;for(;;){if(this.sibling(I))return!0;if(this.atLastNode(I)||!this.parent())return!1}}next(I=!0){return this.move(1,I)}prev(I=!0){return this.move(-1,I)}moveTo(I,Z=0){while(this.from==this.to||(Z<1?this.from>=I:this.from>I)||(Z>-1?this.to<=I:this.to<I))if(!this.parent())break;while(this.enterChild(1,I,Z));return this}get node(){if(!this.buffer)return this._tree;let I=this.bufferNode,Z=null,J=0;if(I&&I.context==this.buffer)I:for(let Q=this.index,X=this.stack.length;X>=0;){for(let Y=I;Y;Y=Y._parent)if(Y.index==Q){if(Q==this.index)return Y;Z=Y,J=X+1;break I}Q=this.stack[--X]}for(let Q=J;Q<this.stack.length;Q++)Z=new t6(this.buffer,Z,this.stack[Q]);return this.bufferNode=new t6(this.buffer,Z,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(I,Z){for(let J=0;;){let Q=!1;if(this.type.isAnonymous||I(this)!==!1){if(this.firstChild()){J++;continue}if(!this.type.isAnonymous)Q=!0}for(;;){if(Q&&Z)Z(this);if(Q=this.type.isAnonymous,!J)return;if(this.nextSibling())break;this.parent(),J--,Q=!0}}}matchContext(I){if(!this.buffer)return lX(this.node.parent,I);let{buffer:Z}=this.buffer,{types:J}=Z.set;for(let Q=I.length-1,X=this.stack.length-1;Q>=0;X--){if(X<0)return lX(this._tree,I,Q);let Y=J[Z.buffer[this.stack[X]]];if(!Y.isAnonymous){if(I[Q]&&I[Q]!=Y.name)return!1;Q--}}return!0}}function tX(I){return I.children.some((Z)=>Z instanceof o6||!Z.type.isAnonymous||tX(Z))}function MA(I){var Z;let{buffer:J,nodeSet:Q,maxBufferLength:X=1024,reused:Y=[],minRepeatType:q=Q.types.length}=I,K=Array.isArray(J)?new rX(J,J.length):J,W=Q.types,G=0,U=0;function z(L,S,B,E,A,i){let{id:$,start:c,end:K1,size:e}=K,I1=U,q1=G;if(e<0)if(K.next(),e==-1){let g=Y[$];B.push(g),E.push(c-L);return}else if(e==-3){G=$;return}else if(e==-4){U=$;return}else throw RangeError(`Unrecognized record size: ${e}`);let W1=W[$],Z1,o,m=c-L;if(K1-c<=X&&(o=M(K.pos-S,A))){let g=new Uint16Array(o.size-o.skip),p=K.pos-o.size,J1=g.length;while(K.pos>p)J1=_(o.start,g,J1);Z1=new o6(g,K1-o.start,Q),m=o.start-L}else{let g=K.pos-e;K.next();let p=[],J1=[],f1=$>=q?$:-1,z1=0,_1=K1;while(K.pos>g)if(f1>=0&&K.id==f1&&K.size>=0){if(K.end<=_1-X)H(p,J1,c,z1,K.end,_1,f1,I1,q1),z1=p.length,_1=K.end;K.next()}else if(i>2500)j(c,g,p,J1);else z(c,g,p,J1,f1,i+1);if(f1>=0&&z1>0&&z1<p.length)H(p,J1,c,z1,c,_1,f1,I1,q1);if(p.reverse(),J1.reverse(),f1>-1&&z1>0){let Z0=O(W1,q1);Z1=oX(W1,p,J1,0,p.length,0,K1-c,Z0,Z0)}else Z1=N(W1,p,J1,K1-c,I1-K1,q1)}B.push(Z1),E.push(m)}function j(L,S,B,E){let A=[],i=0,$=-1;while(K.pos>S){let{id:c,start:K1,end:e,size:I1}=K;if(I1>4)K.next();else if($>-1&&K1<$)break;else{if($<0)$=e-X;A.push(c,K1,e),i++,K.next()}}if(i){let c=new Uint16Array(i*4),K1=A[A.length-2];for(let e=A.length-3,I1=0;e>=0;e-=3)c[I1++]=A[e],c[I1++]=A[e+1]-K1,c[I1++]=A[e+2]-K1,c[I1++]=I1;B.push(new o6(c,A[2]-K1,Q)),E.push(K1-L)}}function O(L,S){return(B,E,A)=>{let i=0,$=B.length-1,c,K1;if($>=0&&(c=B[$])instanceof g1){if(!$&&c.type==L&&c.length==A)return c;if(K1=c.prop(H1.lookAhead))i=E[$]+c.length+K1}return N(L,B,E,A,i,S)}}function H(L,S,B,E,A,i,$,c,K1){let e=[],I1=[];while(L.length>E)e.push(L.pop()),I1.push(S.pop()+B-A);L.push(N(Q.types[$],e,I1,i-A,c-i,K1)),S.push(A-B)}function N(L,S,B,E,A,i,$){if(i){let c=[H1.contextHash,i];$=$?[c].concat($):[c]}if(A>25){let c=[H1.lookAhead,A];$=$?[c].concat($):[c]}return new g1(L,S,B,E,$)}function M(L,S){let B=K.fork(),E=0,A=0,i=0,$=B.end-X,c={size:0,start:0,skip:0};I:for(let K1=B.pos-L;B.pos>K1;){let e=B.size;if(B.id==S&&e>=0){c.size=E,c.start=A,c.skip=i,i+=4,E+=4,B.next();continue}let I1=B.pos-e;if(e<0||I1<K1||B.start<$)break;let q1=B.id>=q?4:0,W1=B.start;B.next();while(B.pos>I1){if(B.size<0)if(B.size==-3||B.size==-4)q1+=4;else break I;else if(B.id>=q)q1+=4;B.next()}A=W1,E+=e,i+=q1}if(S<0||E==L)c.size=E,c.start=A,c.skip=i;return c.size>4?c:void 0}function _(L,S,B){let{id:E,start:A,end:i,size:$}=K;if(K.next(),$>=0&&E<q){let c=B;if($>4){let K1=K.pos-($-4);while(K.pos>K1)B=_(L,S,B)}S[--B]=c,S[--B]=i-L,S[--B]=A-L,S[--B]=E}else if($==-3)G=E;else if($==-4)U=E;return B}let T=[],h=[];while(K.pos>0)z(I.start||0,I.bufferStart||0,T,h,-1,0);let w=(Z=I.length)!==null&&Z!==void 0?Z:T.length?h[0]+T[0].length:0;return new g1(W[I.topID],T.reverse(),h.reverse(),w)}var LV=new WeakMap;function dI(I,Z){if(!I.isAnonymous||Z instanceof o6||Z.type!=I)return 1;let J=LV.get(Z);if(J==null){J=1;for(let Q of Z.children){if(Q.type!=I||!(Q instanceof g1)){J=1;break}J+=dI(I,Q)}LV.set(Z,J)}return J}function oX(I,Z,J,Q,X,Y,q,K,W){let G=0;for(let H=Q;H<X;H++)G+=dI(I,Z[H]);let U=Math.ceil(G*1.5/8),z=[],j=[];function O(H,N,M,_,T){for(let h=M;h<_;){let w=h,L=N[h],S=dI(I,H[h]);h++;for(;h<_;h++){let B=dI(I,H[h]);if(S+B>=U)break;S+=B}if(h==w+1){if(S>U){let B=H[w];O(B.children,B.positions,0,B.children.length,N[w]+T);continue}z.push(H[w])}else{let B=N[h-1]+H[h-1].length-L;z.push(oX(I,H,N,w,h,L,B,null,W))}j.push(L+T-Y)}}return O(Z,J,Q,X,0),(K||W)(z,j,q)}class e6{constructor(I,Z,J,Q,X=!1,Y=!1){this.from=I,this.to=Z,this.tree=J,this.offset=Q,this.open=(X?1:0)|(Y?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(I,Z=[],J=!1){let Q=[new e6(0,I.length,I,0,!1,J)];for(let X of Z)if(X.to>I.length)Q.push(X);return Q}static applyChanges(I,Z,J=128){if(!Z.length)return I;let Q=[],X=1,Y=I.length?I[0]:null;for(let q=0,K=0,W=0;;q++){let G=q<Z.length?Z[q]:null,U=G?G.fromA:1e9;if(U-K>=J)while(Y&&Y.from<U){let z=Y;if(K>=z.from||U<=z.to||W){let j=Math.max(z.from,K)-W,O=Math.min(z.to,U)-W;z=j>=O?null:new e6(j,O,z.tree,z.offset+W,q>0,!!G)}if(z)Q.push(z);if(Y.to>U)break;Y=X<I.length?I[X++]:null}if(!G)break;K=G.toA,W=G.toA-G.toB}return Q}}class rI{startParse(I,Z,J){if(typeof I=="string")I=new TV(I);return J=!J?[new sI(0,I.length)]:J.length?J.map((Q)=>new sI(Q.from,Q.to)):[new sI(0,0)],this.createParse(I,Z||[],J)}parse(I,Z,J){let Q=this.startParse(I,Z,J);for(;;){let X=Q.advance();if(X)return X}}}class TV{constructor(I){this.string=I}get length(){return this.string.length}chunk(I){return this.string.slice(I)}get lineChunks(){return!1}read(I,Z){return this.string.slice(I,Z)}}var Ab=new H1({perNode:!0});var AA=0;class Q4{constructor(I,Z,J,Q){this.name=I,this.set=Z,this.base=J,this.modified=Q,this.id=AA++}toString(){let{name:I}=this;for(let Z of this.modified)if(Z.name)I=`${Z.name}(${I})`;return I}static define(I,Z){let J=typeof I=="string"?I:"?";if(I instanceof Q4)Z=I;if(Z===null||Z===void 0?void 0:Z.base)throw Error("Can not derive from a modified tag");let Q=new Q4(J,[],null,[]);if(Q.set.push(Q),Z)for(let X of Z.set)Q.set.push(X);return Q}static defineModifier(I){let Z=new eI(I);return(J)=>{if(J.modified.indexOf(Z)>-1)return J;return eI.get(J.base||J,J.modified.concat(Z).sort((Q,X)=>Q.id-X.id))}}}var DA=0;class eI{constructor(I){this.name=I,this.instances=[],this.id=DA++}static get(I,Z){if(!Z.length)return I;let J=Z[0].instances.find((q)=>q.base==I&&LA(Z,q.modified));if(J)return J;let Q=[],X=new Q4(I.name,Q,I,Z);for(let q of Z)q.instances.push(X);let Y=BA(Z);for(let q of I.set)if(!q.modified.length)for(let K of Y)Q.push(eI.get(q,K));return X}}function LA(I,Z){return I.length==Z.length&&I.every((J,Q)=>J==Z[Q])}function BA(I){let Z=[[]];for(let J=0;J<I.length;J++)for(let Q=0,X=Z.length;Q<X;Q++)Z.push(Z[Q].concat(I[J]));return Z.sort((J,Q)=>Q.length-J.length)}function CV(I){let Z=Object.create(null);for(let J in I){let Q=I[J];if(!Array.isArray(Q))Q=[Q];for(let X of J.split(" "))if(X){let Y=[],q=2,K=X;for(let z=0;;){if(K=="..."&&z>0&&z+3==X.length){q=1;break}let j=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(K);if(!j)throw RangeError("Invalid path: "+X);if(Y.push(j[0]=="*"?"":j[0][0]=='"'?JSON.parse(j[0]):j[0]),z+=j[0].length,z==X.length)break;let O=X[z++];if(z==X.length&&O=="!"){q=0;break}if(O!="/")throw RangeError("Invalid path: "+X);K=X.slice(z)}let W=Y.length-1,G=Y[W];if(!G)throw RangeError("Invalid path: "+X);let U=new s8(Q,q,W>0?Y.slice(0,W):null);Z[G]=U.sort(Z[G])}}return wV.add(Z)}var wV=new H1({combine(I,Z){let J,Q,X;while(I||Z){if(!I||Z&&I.depth>=Z.depth)X=Z,Z=Z.next;else X=I,I=I.next;if(J&&J.mode==X.mode&&!X.context&&!J.context)continue;let Y=new s8(X.tags,X.mode,X.context);if(J)J.next=Y;else Q=Y;J=Y}return Q}});class s8{constructor(I,Z,J,Q){this.tags=I,this.mode=Z,this.context=J,this.next=Q}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(I){if(!I||I.depth<this.depth)return this.next=I,this;return I.next=this.sort(I.next),I}get depth(){return this.context?this.context.length:0}}s8.empty=new s8([],2,null);function ZY(I,Z){let J=Object.create(null);for(let Y of I)if(!Array.isArray(Y.tag))J[Y.tag.id]=Y.class;else for(let q of Y.tag)J[q.id]=Y.class;let{scope:Q,all:X=null}=Z||{};return{style:(Y)=>{let q=X;for(let K of Y)for(let W of K.set){let G=J[W.id];if(G){q=q?q+" "+G:G;break}}return q},scope:Q}}function PA(I,Z){let J=null;for(let Q of I){let X=Q.style(Z);if(X)J=J?J+" "+X:X}return J}function kV(I,Z,J,Q=0,X=I.length){let Y=new bV(Q,Array.isArray(Z)?Z:[Z],J);Y.highlightRange(I.cursor(),Q,X,"",Y.highlighters),Y.flush(X)}class bV{constructor(I,Z,J){this.at=I,this.highlighters=Z,this.span=J,this.class=""}startSpan(I,Z){if(Z!=this.class){if(this.flush(I),I>this.at)this.at=I;this.class=Z}}flush(I){if(I>this.at&&this.class)this.span(this.at,I,this.class)}highlightRange(I,Z,J,Q,X){let{type:Y,from:q,to:K}=I;if(q>=J||K<=Z)return;if(Y.isTop)X=this.highlighters.filter((j)=>!j.scope||j.scope(Y));let W=Q,G=SA(I)||s8.empty,U=PA(X,G.tags);if(U){if(W)W+=" ";if(W+=U,G.mode==1)Q+=(Q?" ":"")+U}if(this.startSpan(Math.max(Z,q),W),G.opaque)return;let z=I.tree&&I.tree.prop(H1.mounted);if(z&&z.overlay){let j=I.node.enter(z.overlay[0].from+q,1),O=this.highlighters.filter((N)=>!N.scope||N.scope(z.tree.type)),H=I.firstChild();for(let N=0,M=q;;N++){let _=N<z.overlay.length?z.overlay[N]:null,T=_?_.from+q:K,h=Math.max(Z,M),w=Math.min(J,T);if(h<w&&H){while(I.from<w)if(this.highlightRange(I,h,w,Q,X),this.startSpan(Math.min(w,I.to),W),I.to>=T||!I.nextSibling())break}if(!_||T>J)break;if(M=_.to+q,M>Z)this.highlightRange(j.cursor(),Math.max(Z,_.from+q),Math.min(J,M),"",O),this.startSpan(Math.min(J,M),W)}if(H)I.parent()}else if(I.firstChild()){if(z)Q="";do{if(I.to<=Z)continue;if(I.from>=J)break;this.highlightRange(I,Z,J,Q,X),this.startSpan(Math.min(J,I.to),W)}while(I.nextSibling());I.parent()}}}function SA(I){let Z=I.type.prop(wV);while(Z&&Z.context&&!I.matchContext(Z.context))Z=Z.next;return Z||null}var d=Q4.define,aI=d(),I5=d(),EV=d(I5),hV=d(I5),Z5=d(),tI=d(Z5),eX=d(Z5),t4=d(),l5=d(t4),r4=d(),a4=d(),IY=d(),L3=d(IY),oI=d(),v={comment:aI,lineComment:d(aI),blockComment:d(aI),docComment:d(aI),name:I5,variableName:d(I5),typeName:EV,tagName:d(EV),propertyName:hV,attributeName:d(hV),className:d(I5),labelName:d(I5),namespace:d(I5),macroName:d(I5),literal:Z5,string:tI,docString:d(tI),character:d(tI),attributeValue:d(tI),number:eX,integer:d(eX),float:d(eX),bool:d(Z5),regexp:d(Z5),escape:d(Z5),color:d(Z5),url:d(Z5),keyword:r4,self:d(r4),null:d(r4),atom:d(r4),unit:d(r4),modifier:d(r4),operatorKeyword:d(r4),controlKeyword:d(r4),definitionKeyword:d(r4),moduleKeyword:d(r4),operator:a4,derefOperator:d(a4),arithmeticOperator:d(a4),logicOperator:d(a4),bitwiseOperator:d(a4),compareOperator:d(a4),updateOperator:d(a4),definitionOperator:d(a4),typeOperator:d(a4),controlOperator:d(a4),punctuation:IY,separator:d(IY),bracket:L3,angleBracket:d(L3),squareBracket:d(L3),paren:d(L3),brace:d(L3),content:t4,heading:l5,heading1:d(l5),heading2:d(l5),heading3:d(l5),heading4:d(l5),heading5:d(l5),heading6:d(l5),contentSeparator:d(t4),list:d(t4),quote:d(t4),emphasis:d(t4),strong:d(t4),link:d(t4),monospace:d(t4),strikethrough:d(t4),inserted:d(),deleted:d(),changed:d(),invalid:d(),meta:oI,documentMeta:d(oI),annotation:d(oI),processingInstruction:d(oI),definition:Q4.defineModifier("definition"),constant:Q4.defineModifier("constant"),function:Q4.defineModifier("function"),standard:Q4.defineModifier("standard"),local:Q4.defineModifier("local"),special:Q4.defineModifier("special")};for(let I in v){let Z=v[I];if(Z instanceof Q4)Z.name=I}var Bb=ZY([{tag:v.link,class:"tok-link"},{tag:v.heading,class:"tok-heading"},{tag:v.emphasis,class:"tok-emphasis"},{tag:v.strong,class:"tok-strong"},{tag:v.keyword,class:"tok-keyword"},{tag:v.atom,class:"tok-atom"},{tag:v.bool,class:"tok-bool"},{tag:v.url,class:"tok-url"},{tag:v.labelName,class:"tok-labelName"},{tag:v.inserted,class:"tok-inserted"},{tag:v.deleted,class:"tok-deleted"},{tag:v.literal,class:"tok-literal"},{tag:v.string,class:"tok-string"},{tag:v.number,class:"tok-number"},{tag:[v.regexp,v.escape,v.special(v.string)],class:"tok-string2"},{tag:v.variableName,class:"tok-variableName"},{tag:v.local(v.variableName),class:"tok-variableName tok-local"},{tag:v.definition(v.variableName),class:"tok-variableName tok-definition"},{tag:v.special(v.variableName),class:"tok-variableName2"},{tag:v.definition(v.propertyName),class:"tok-propertyName tok-definition"},{tag:v.typeName,class:"tok-typeName"},{tag:v.namespace,class:"tok-namespace"},{tag:v.className,class:"tok-className"},{tag:v.macroName,class:"tok-macroName"},{tag:v.propertyName,class:"tok-propertyName"},{tag:v.operator,class:"tok-operator"},{tag:v.comment,class:"tok-comment"},{tag:v.meta,class:"tok-meta"},{tag:v.invalid,class:"tok-invalid"},{tag:v.punctuation,class:"tok-punctuation"}]);var JY,d8=new H1;function TA(I){return t.define({combine:I?(Z)=>Z.concat(I):void 0})}var EA=new H1;class X4{constructor(I,Z,J=[],Q=""){if(this.data=I,this.name=Q,!L1.prototype.hasOwnProperty("tree"))Object.defineProperty(L1.prototype,"tree",{get(){return w4(this)}});this.parser=Z,this.extension=[r8.of(this),L1.languageData.of((X,Y,q)=>{let K=yV(X,Y,q),W=K.type.prop(d8);if(!W)return[];let G=X.facet(W),U=K.type.prop(EA);if(U){let z=K.resolve(Y-K.from,q);for(let j of U)if(j.test(z,X)){let O=X.facet(j.facet);return j.type=="replace"?O:O.concat(G)}}return G})].concat(J)}isActiveAt(I,Z,J=-1){return yV(I,Z,J).type.prop(d8)==this.data}findRegions(I){let Z=I.facet(r8);if((Z===null||Z===void 0?void 0:Z.data)==this.data)return[{from:0,to:I.doc.length}];if(!Z||!Z.allowsNesting)return[];let J=[],Q=(X,Y)=>{if(X.prop(d8)==this.data){J.push({from:Y,to:Y+X.length});return}let q=X.prop(H1.mounted);if(q){if(q.tree.prop(d8)==this.data){if(q.overlay)for(let K of q.overlay)J.push({from:K.from+Y,to:K.to+Y});else J.push({from:Y,to:Y+X.length});return}else if(q.overlay){let K=J.length;if(Q(q.tree,q.overlay[0].from+Y),J.length>K)return}}for(let K=0;K<X.children.length;K++){let W=X.children[K];if(W instanceof g1)Q(W,X.positions[K]+Y)}};return Q(w4(I),0),J}get allowsNesting(){return!0}}X4.setState=B1.define();function yV(I,Z,J){let Q=I.facet(r8),X=w4(I).topNode;if(!Q||Q.allowsNesting){for(let Y=X;Y;Y=Y.enter(Z,J,d1.ExcludeBuffers|d1.EnterBracketed))if(Y.type.isTop)X=Y}return X}function w4(I){let Z=I.field(X4.state,!1);return Z?Z.tree:g1.empty}class mV{constructor(I){this.doc=I,this.cursorPos=0,this.string="",this.cursor=I.iter()}get length(){return this.doc.length}syncTo(I){return this.string=this.cursor.next(I-this.cursorPos).value,this.cursorPos=I+this.string.length,this.cursorPos-this.string.length}chunk(I){return this.syncTo(I),this.string}get lineChunks(){return!0}read(I,Z){let J=this.cursorPos-this.string.length;if(I<J||Z>=this.cursorPos)return this.doc.sliceString(I,Z);else return this.string.slice(I-J,Z-J)}}var B3=null;class i8{constructor(I,Z,J=[],Q,X,Y,q,K){this.parser=I,this.state=Z,this.fragments=J,this.tree=Q,this.treeLen=X,this.viewport=Y,this.skipped=q,this.scheduleOn=K,this.parse=null,this.tempSkipped=[]}static create(I,Z,J){return new i8(I,Z,[],g1.empty,0,J,[],null)}startParse(){return this.parser.startParse(new mV(this.state.doc),this.fragments)}work(I,Z){if(Z!=null&&Z>=this.state.doc.length)Z=void 0;if(this.tree!=g1.empty&&this.isDone(Z!==null&&Z!==void 0?Z:this.state.doc.length))return this.takeTree(),!0;return this.withContext(()=>{var J;if(typeof I=="number"){let Q=Date.now()+I;I=()=>Date.now()>Q}if(!this.parse)this.parse=this.startParse();if(Z!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>Z)&&Z<this.state.doc.length)this.parse.stopAt(Z);for(;;){let Q=this.parse.advance();if(Q)if(this.fragments=this.withoutTempSkipped(e6.addTree(Q,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(J=this.parse.stoppedAt)!==null&&J!==void 0?J:this.state.doc.length,this.tree=Q,this.parse=null,this.treeLen<(Z!==null&&Z!==void 0?Z:this.state.doc.length))this.parse=this.startParse();else return!0;if(I())return!1}})}takeTree(){let I,Z;if(this.parse&&(I=this.parse.parsedPos)>=this.treeLen){if(this.parse.stoppedAt==null||this.parse.stoppedAt>I)this.parse.stopAt(I);this.withContext(()=>{while(!(Z=this.parse.advance()));}),this.treeLen=I,this.tree=Z,this.fragments=this.withoutTempSkipped(e6.addTree(this.tree,this.fragments,!0)),this.parse=null}}withContext(I){let Z=B3;B3=this;try{return I()}finally{B3=Z}}withoutTempSkipped(I){for(let Z;Z=this.tempSkipped.pop();)I=xV(I,Z.from,Z.to);return I}changes(I,Z){let{fragments:J,tree:Q,treeLen:X,viewport:Y,skipped:q}=this;if(this.takeTree(),!I.empty){let K=[];if(I.iterChangedRanges((W,G,U,z)=>K.push({fromA:W,toA:G,fromB:U,toB:z})),J=e6.applyChanges(J,K),Q=g1.empty,X=0,Y={from:I.mapPos(Y.from,-1),to:I.mapPos(Y.to,1)},this.skipped.length){q=[];for(let W of this.skipped){let G=I.mapPos(W.from,1),U=I.mapPos(W.to,-1);if(G<U)q.push({from:G,to:U})}}}return new i8(this.parser,Z,J,Q,X,Y,q,this.scheduleOn)}updateViewport(I){if(this.viewport.from==I.from&&this.viewport.to==I.to)return!1;this.viewport=I;let Z=this.skipped.length;for(let J=0;J<this.skipped.length;J++){let{from:Q,to:X}=this.skipped[J];if(Q<I.to&&X>I.from)this.fragments=xV(this.fragments,Q,X),this.skipped.splice(J--,1)}if(this.skipped.length>=Z)return!1;return this.reset(),!0}reset(){if(this.parse)this.takeTree(),this.parse=null}skipUntilInView(I,Z){this.skipped.push({from:I,to:Z})}static getSkippingParser(I){return new class extends rI{createParse(Z,J,Q){let X=Q[0].from,Y=Q[Q.length-1].to;return{parsedPos:X,advance(){let K=B3;if(K){for(let W of Q)K.tempSkipped.push(W);if(I)K.scheduleOn=K.scheduleOn?Promise.all([K.scheduleOn,I]):I}return this.parsedPos=Y,new g1(C0.none,[],[],Y-X)},stoppedAt:null,stopAt(){}}}}}isDone(I){I=Math.min(I,this.state.doc.length);let Z=this.fragments;return this.treeLen>=I&&Z.length&&Z[0].from==0&&Z[0].to>=I}static get(){return B3}}function xV(I,Z,J){return e6.applyChanges(I,[{fromA:Z,toA:J,fromB:Z,toB:J}])}class l8{constructor(I){this.context=I,this.tree=I.tree}apply(I){if(!I.docChanged&&this.tree==this.context.tree)return this;let Z=this.context.changes(I.changes,I.state),J=this.context.treeLen==I.startState.doc.length?void 0:Math.max(I.changes.mapPos(this.context.treeLen),Z.viewport.to);if(!Z.work(20,J))Z.takeTree();return new l8(Z)}static init(I){let Z=Math.min(3000,I.doc.length),J=i8.create(I.facet(r8).parser,I,{from:0,to:Z});if(!J.work(20,Z))J.takeTree();return new l8(J)}}X4.state=R0.define({create:l8.init,update(I,Z){for(let J of Z.effects)if(J.is(X4.setState))return J.value;if(Z.startState.facet(r8)!=Z.state.facet(r8))return l8.init(Z.state);return I.apply(Z)}});var vV=(I)=>{let Z=setTimeout(()=>I(),500);return()=>clearTimeout(Z)};if(typeof requestIdleCallback<"u")vV=(I)=>{let Z=-1,J=setTimeout(()=>{Z=requestIdleCallback(I,{timeout:400})},100);return()=>Z<0?clearTimeout(J):cancelIdleCallback(Z)};var QY=typeof navigator<"u"&&((JY=navigator.scheduling)===null||JY===void 0?void 0:JY.isInputPending)?()=>navigator.scheduling.isInputPending():null,hA=M0.fromClass(class{constructor(Z){this.view=Z,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(Z){let J=this.view.state.field(X4.state).context;if(J.updateViewport(Z.view.viewport)||this.view.viewport.to>J.treeLen)this.scheduleWork();if(Z.docChanged||Z.selectionSet){if(this.view.hasFocus)this.chunkBudget+=50;this.scheduleWork()}this.checkAsyncSchedule(J)}scheduleWork(){if(this.working)return;let{state:Z}=this.view,J=Z.field(X4.state);if(J.tree!=J.context.tree||!J.context.isDone(Z.doc.length))this.working=vV(this.work)}work(Z){this.working=null;let J=Date.now();if(this.chunkEnd<J&&(this.chunkEnd<0||this.view.hasFocus))this.chunkEnd=J+30000,this.chunkBudget=3000;if(this.chunkBudget<=0)return;let{state:Q,viewport:{to:X}}=this.view,Y=Q.field(X4.state);if(Y.tree==Y.context.tree&&Y.context.isDone(X+1e5))return;let q=Date.now()+Math.min(this.chunkBudget,100,Z&&!QY?Math.max(25,Z.timeRemaining()-5):1e9),K=Y.context.treeLen<X&&Q.doc.length>X+1000,W=Y.context.work(()=>{return QY&&QY()||Date.now()>q},X+(K?0:1e5));if(this.chunkBudget-=Date.now()-J,W||this.chunkBudget<=0)Y.context.takeTree(),this.view.dispatch({effects:X4.setState.of(new l8(Y.context))});if(this.chunkBudget>0&&!(W&&!K))this.scheduleWork();this.checkAsyncSchedule(Y.context)}checkAsyncSchedule(Z){if(Z.scheduleOn)this.workScheduled++,Z.scheduleOn.then(()=>this.scheduleWork()).catch((J)=>d0(this.view.state,J)).then(()=>this.workScheduled--),Z.scheduleOn=null}destroy(){if(this.working)this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),r8=t.define({combine(I){return I.length?I[0]:null},enables:(I)=>[X4.state,hA,Y1.contentAttributes.compute([I],(Z)=>{let J=Z.facet(I);return J&&J.name?{"data-language":J.name}:{}})]});var CA=t.define(),a8=t.define({combine:(I)=>{if(!I.length)return"  ";let Z=I[0];if(!Z||/\S/.test(Z)||Array.from(Z).some((J)=>J!=Z[0]))throw Error("Invalid indent unit: "+JSON.stringify(I[0]));return Z}});function J5(I){let Z=I.facet(a8);return Z.charCodeAt(0)==9?I.tabSize*Z.length:Z.length}function S3(I,Z){let J="",Q=I.tabSize,X=I.facet(a8)[0];if(X=="\t"){while(Z>=Q)J+="\t",Z-=Q;X=" "}for(let Y=0;Y<Z;Y++)J+=X;return J}function GY(I,Z){if(I instanceof L1)I=new t8(I);for(let Q of I.state.facet(CA)){let X=Q(I,Z);if(X!==void 0)return X}let J=w4(I.state);return J.length>=Z?wA(I,J,Z):null}class t8{constructor(I,Z={}){this.state=I,this.options=Z,this.unit=J5(I)}lineAt(I,Z=1){let J=this.state.doc.lineAt(I),{simulateBreak:Q,simulateDoubleBreak:X}=this.options;if(Q!=null&&Q>=J.from&&Q<=J.to)if(X&&Q==I)return{text:"",from:I};else if(Z<0?Q<I:Q<=I)return{text:J.text.slice(Q-J.from),from:Q};else return{text:J.text.slice(0,Q-J.from),from:J.from};return J}textAfterPos(I,Z=1){if(this.options.simulateDoubleBreak&&I==this.options.simulateBreak)return"";let{text:J,from:Q}=this.lineAt(I,Z);return J.slice(I-Q,Math.min(J.length,I+100-Q))}column(I,Z=1){let{text:J,from:Q}=this.lineAt(I,Z),X=this.countColumn(J,I-Q),Y=this.options.overrideIndentation?this.options.overrideIndentation(Q):-1;if(Y>-1)X+=Y-this.countColumn(J,J.search(/\S|$/));return X}countColumn(I,Z=I.length){return $5(I,this.state.tabSize,Z)}lineIndent(I,Z=1){let{text:J,from:Q}=this.lineAt(I,Z),X=this.options.overrideIndentation;if(X){let Y=X(Q);if(Y>-1)return Y}return this.countColumn(J,J.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}var cV=new H1;function wA(I,Z,J){let Q=Z.resolveStack(J),X=Z.resolveInner(J,-1).resolve(J,0).enterUnfinishedNodesBefore(J);if(X!=Q.node){let Y=[];for(let q=X;q&&!(q.from<Q.node.from||q.to>Q.node.to||q.from==Q.node.from&&q.type==Q.node.type);q=q.parent)Y.push(q);for(let q=Y.length-1;q>=0;q--)Q={node:Y[q],next:Q}}return pV(Q,I,J)}function pV(I,Z,J){for(let Q=I;Q;Q=Q.next){let X=bA(Q.node);if(X)return X(UY.create(Z,J,Q))}return 0}function kA(I){return I.pos==I.options.simulateBreak&&I.options.simulateDoubleBreak}function bA(I){let Z=I.type.prop(cV);if(Z)return Z;let J=I.firstChild,Q;if(J&&(Q=J.type.prop(H1.closedBy))){let X=I.lastChild,Y=X&&Q.indexOf(X.name)>-1;return(q)=>gA(q,!0,1,void 0,Y&&!kA(q)?X.from:void 0)}return I.parent==null?yA:null}function yA(){return 0}class UY extends t8{constructor(I,Z,J){super(I.state,I.options);this.base=I,this.pos=Z,this.context=J}get node(){return this.context.node}static create(I,Z,J){return new UY(I,Z,J)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(I){let Z=this.state.doc.lineAt(I.from);for(;;){let J=I.resolve(Z.from);while(J.parent&&J.parent.from==J.from)J=J.parent;if(xA(J,I))break;Z=this.state.doc.lineAt(J.from)}return this.lineIndent(Z.from)}continue(){return pV(this.context.next,this.base,this.pos)}}function xA(I,Z){for(let J=Z;J;J=J.parent)if(I==J)return!0;return!1}function nA(I){let Z=I.node,J=Z.childAfter(Z.from),Q=Z.lastChild;if(!J)return null;let X=I.options.simulateBreak,Y=I.state.doc.lineAt(J.from),q=X==null||X<=Y.from?Y.to:Math.min(Y.to,X);for(let K=J.to;;){let W=Z.childAfter(K);if(!W||W==Q)return null;if(!W.type.isSkipped){if(W.from>=q)return null;let G=/^ */.exec(Y.text.slice(J.to-Y.from))[0].length;return{from:J.from,to:J.to+G}}K=W.to}}function gA(I,Z,J,Q,X){let Y=I.textAfter,q=Y.match(/^\s*/)[0].length,K=Q&&Y.slice(q,q+Q.length)==Q||X==I.pos+q,W=Z?nA(I):null;if(W)return K?I.column(W.from):I.column(W.to);return I.baseIndent+(K?0:I.unit*J)}class o8{constructor(I,Z){this.specs=I;let J;function Q(q){let K=P4.newName();return(J||(J=Object.create(null)))["."+K]=q,K}let X=typeof Z.all=="string"?Z.all:Z.all?Q(Z.all):void 0,Y=Z.scope;this.scope=Y instanceof X4?(q)=>q.prop(d8)==Y.data:Y?(q)=>q==Y:void 0,this.style=ZY(I.map((q)=>({tag:q.tag,class:q.class||Q(Object.assign({},q,{tag:null}))})),{all:X}).style,this.module=J?new P4(J):null,this.themeType=Z.themeType}static define(I,Z){return new o8(I,Z||{})}}var qY=t.define(),sV=t.define({combine(I){return I.length?[I[0]]:null}});function XY(I){let Z=I.facet(qY);return Z.length?Z:I.facet(sV)}function dV(I,Z){let J=[fA],Q;if(I instanceof o8){if(I.module)J.push(Y1.styleModule.of(I.module));Q=I.themeType}if(Z===null||Z===void 0?void 0:Z.fallback)J.push(sV.of(I));else if(Q)J.push(qY.computeN([Y1.darkTheme],(X)=>{return X.facet(Y1.darkTheme)==(Q=="dark")?[I]:[]}));else J.push(qY.of(I));return J}class iV{constructor(I){this.markCache=Object.create(null),this.tree=w4(I.state),this.decorations=this.buildDeco(I,XY(I.state)),this.decoratedTo=I.viewport.to}update(I){let Z=w4(I.state),J=XY(I.state),Q=J!=XY(I.startState),{viewport:X}=I.view,Y=I.changes.mapPos(this.decoratedTo,1);if(Z.length<X.to&&!Q&&Z.type==this.tree.type&&Y>=X.to)this.decorations=this.decorations.map(I.changes),this.decoratedTo=Y;else if(Z!=this.tree||I.viewportChanged||Q)this.tree=Z,this.decorations=this.buildDeco(I.view,J),this.decoratedTo=X.to}buildDeco(I,Z){if(!Z||!this.tree.length)return P1.none;let J=new R6;for(let{from:Q,to:X}of I.visibleRanges)kV(this.tree,Z,(Y,q,K)=>{J.add(Y,q,this.markCache[K]||(this.markCache[K]=P1.mark({class:K})))},Q,X);return J.finish()}}var fA=M6.high(M0.fromClass(iV,{decorations:(I)=>I.decorations})),Cb=o8.define([{tag:v.meta,color:"#404740"},{tag:v.link,textDecoration:"underline"},{tag:v.heading,textDecoration:"underline",fontWeight:"bold"},{tag:v.emphasis,fontStyle:"italic"},{tag:v.strong,fontWeight:"bold"},{tag:v.strikethrough,textDecoration:"line-through"},{tag:v.keyword,color:"#708"},{tag:[v.atom,v.bool,v.url,v.contentSeparator,v.labelName],color:"#219"},{tag:[v.literal,v.inserted],color:"#164"},{tag:[v.string,v.deleted],color:"#a11"},{tag:[v.regexp,v.escape,v.special(v.string)],color:"#e40"},{tag:v.definition(v.variableName),color:"#00f"},{tag:v.local(v.variableName),color:"#30a"},{tag:[v.typeName,v.namespace],color:"#085"},{tag:v.className,color:"#167"},{tag:[v.special(v.variableName),v.macroName],color:"#256"},{tag:v.definition(v.propertyName),color:"#00c"},{tag:v.comment,color:"#940"},{tag:v.invalid,color:"#f00"}]),uA=Y1.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),lV=1e4,rV="()[]{}",aV=t.define({combine(I){return A6(I,{afterCursor:!0,brackets:rV,maxScanDistance:lV,renderMatch:vA})}}),$A=P1.mark({class:"cm-matchingBracket"}),mA=P1.mark({class:"cm-nonmatchingBracket"});function vA(I){let Z=[],J=I.matched?$A:mA;if(Z.push(J.range(I.start.from,I.start.to)),I.end)Z.push(J.range(I.end.from,I.end.to));return Z}function nV(I){let Z=[],J=I.facet(aV);for(let Q of I.selection.ranges){if(!Q.empty)continue;let X=C4(I,Q.head,-1,J)||Q.head>0&&C4(I,Q.head-1,1,J)||J.afterCursor&&(C4(I,Q.head,1,J)||Q.head<I.doc.length&&C4(I,Q.head+1,-1,J));if(X)Z=Z.concat(J.renderMatch(X,I))}return P1.set(Z,!0)}var cA=M0.fromClass(class{constructor(I){this.paused=!1,this.decorations=nV(I.state)}update(I){if(I.docChanged||I.selectionSet||this.paused)if(I.view.composing)this.decorations=this.decorations.map(I.changes),this.paused=!0;else this.decorations=nV(I.state),this.paused=!1}},{decorations:(I)=>I.decorations}),pA=[cA,uA];function tV(I={}){return[aV.of(I),pA]}var sA=new H1;function KY(I,Z,J){let Q=I.prop(Z<0?H1.openedBy:H1.closedBy);if(Q)return Q;if(I.name.length==1){let X=J.indexOf(I.name);if(X>-1&&X%2==(Z<0?1:0))return[J[X+Z]]}return null}function WY(I){let Z=I.type.prop(sA);return Z?Z(I.node):I}function C4(I,Z,J,Q={}){let X=Q.maxScanDistance||lV,Y=Q.brackets||rV,q=w4(I),K=q.resolveInner(Z,J);for(let W=K;W;W=W.parent){let G=KY(W.type,J,Y);if(G&&W.from<W.to){let U=WY(W);if(U&&(J>0?Z>=U.from&&Z<U.to:Z>U.from&&Z<=U.to))return dA(I,Z,J,W,U,G,Y)}}return iA(I,Z,J,q,K.type,X,Y)}function dA(I,Z,J,Q,X,Y,q){let K=Q.parent,W={from:X.from,to:X.to},G=0,U=K===null||K===void 0?void 0:K.cursor();if(U&&(J<0?U.childBefore(Q.from):U.childAfter(Q.to)))do if(J<0?U.to<=Q.from:U.from>=Q.to){if(G==0&&Y.indexOf(U.type.name)>-1&&U.from<U.to){let z=WY(U);return{start:W,end:z?{from:z.from,to:z.to}:void 0,matched:!0}}else if(KY(U.type,J,q))G++;else if(KY(U.type,-J,q)){if(G==0){let z=WY(U);return{start:W,end:z&&z.from<z.to?{from:z.from,to:z.to}:void 0,matched:!1}}G--}}while(J<0?U.prevSibling():U.nextSibling());return{start:W,matched:!1}}function iA(I,Z,J,Q,X,Y,q){if(J<0?!Z:Z==I.doc.length)return null;let K=J<0?I.sliceDoc(Z-1,Z):I.sliceDoc(Z,Z+1),W=q.indexOf(K);if(W<0||W%2==0!=J>0)return null;let G={from:J<0?Z-1:Z,to:J>0?Z+1:Z},U=I.doc.iterRange(Z,J>0?I.doc.length:0),z=0;for(let j=0;!U.next().done&&j<=Y;){let O=U.value;if(J<0)j+=O.length;let H=Z+j*J;for(let N=J>0?0:O.length-1,M=J>0?O.length:-1;N!=M;N+=J){let _=q.indexOf(O[N]);if(_<0||Q.resolveInner(H+N,1).type!=X)continue;if(_%2==0==J>0)z++;else if(z==1)return{start:G,end:{from:H+N,to:H+N+1},matched:_>>1==W>>1};else z--}if(J>0)j+=O.length}return U.done?{start:G,matched:!1}:null}function gV(I,Z,J,Q=0,X=0){if(Z==null){if(Z=I.search(/[^\s\u00a0]/),Z==-1)Z=I.length}let Y=X;for(let q=Q;q<Z;q++)if(I.charCodeAt(q)==9)Y+=J-Y%J;else Y++;return Y}class zY{constructor(I,Z,J,Q){this.string=I,this.tabSize=Z,this.indentUnit=J,this.overrideIndent=Q,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(I){let Z=this.string.charAt(this.pos),J;if(typeof I=="string")J=Z==I;else J=Z&&(I instanceof RegExp?I.test(Z):I(Z));if(J)return++this.pos,Z}eatWhile(I){let Z=this.pos;while(this.eat(I));return this.pos>Z}eatSpace(){let I=this.pos;while(/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;return this.pos>I}skipToEnd(){this.pos=this.string.length}skipTo(I){let Z=this.string.indexOf(I,this.pos);if(Z>-1)return this.pos=Z,!0}backUp(I){this.pos-=I}column(){if(this.lastColumnPos<this.start)this.lastColumnValue=gV(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start;return this.lastColumnValue}indentation(){var I;return(I=this.overrideIndent)!==null&&I!==void 0?I:gV(this.string,null,this.tabSize)}match(I,Z,J){if(typeof I=="string"){let Q=(Y)=>J?Y.toLowerCase():Y,X=this.string.substr(this.pos,I.length);if(Q(X)==Q(I)){if(Z!==!1)this.pos+=I.length;return!0}else return null}else{let Q=this.string.slice(this.pos).match(I);if(Q&&Q.index>0)return null;if(Q&&Z!==!1)this.pos+=Q[0].length;return Q}}current(){return this.string.slice(this.start,this.pos)}}function lA(I){return{name:I.name||"",token:I.token,blankLine:I.blankLine||(()=>{}),startState:I.startState||(()=>!0),copyState:I.copyState||rA,indent:I.indent||(()=>null),languageData:I.languageData||{},tokenTable:I.tokenTable||jY,mergeTokens:I.mergeTokens!==!1}}function rA(I){if(typeof I!="object")return I;let Z={};for(let J in I){let Q=I[J];Z[J]=Q instanceof Array?Q.slice():Q}return Z}var fV=new WeakMap;class r5 extends X4{constructor(I){let Z=TA(I.languageData),J=lA(I),Q,X=new class extends rI{createParse(Y,q,K){return new eV(Q,Y,q,K)}};super(Z,X,[],I.name);this.topNode=eA(Z,this),Q=this,this.streamParser=J,this.stateAfter=new H1({perNode:!0}),this.tokenTable=I.tokenTable?new OY(J.tokenTable):oA}static define(I){return new r5(I)}getIndent(I){let Z=void 0,{overrideIndentation:J}=I.options;if(J){if(Z=fV.get(I.state),Z!=null&&Z<I.pos-1e4)Z=void 0}let Q=VY(this,I.node.tree,I.node.from,I.node.from,Z!==null&&Z!==void 0?Z:I.pos),X,Y;if(Q)Y=Q.state,X=Q.pos+1;else Y=this.streamParser.startState(I.unit),X=I.node.from;if(I.pos-X>1e4)return null;while(X<I.pos){let K=I.state.doc.lineAt(X),W=Math.min(I.pos,K.to);if(K.length){let G=J?J(K.from):-1,U=new zY(K.text,I.state.tabSize,I.unit,G<0?void 0:G);while(U.pos<W-K.from)Ij(this.streamParser.token,U,Y)}else this.streamParser.blankLine(Y,I.unit);if(W==I.pos)break;X=K.to+1}let q=I.lineAt(I.pos);if(J&&Z==null)fV.set(I.state,q.from);return this.streamParser.indent(Y,/^\s*(.*)/.exec(q.text)[1],I)}get allowsNesting(){return!1}}function VY(I,Z,J,Q,X){let Y=J>=Q&&J+Z.length<=X&&Z.prop(I.stateAfter);if(Y)return{state:I.streamParser.copyState(Y),pos:J+Z.length};for(let q=Z.children.length-1;q>=0;q--){let K=Z.children[q],W=J+Z.positions[q],G=K instanceof g1&&W<X&&VY(I,K,W,Q,X);if(G)return G}return null}function oV(I,Z,J,Q,X){if(X&&J<=0&&Q>=Z.length)return Z;if(!X&&J==0&&Z.type==I.topNode)X=!0;for(let Y=Z.children.length-1;Y>=0;Y--){let q=Z.positions[Y],K=Z.children[Y],W;if(q<Q&&K instanceof g1){if(!(W=oV(I,K,J-q,Q-q,X)))break;return!X?W:new g1(Z.type,Z.children.slice(0,Y).concat(W),Z.positions.slice(0,Y+1),q+W.length)}}return null}function aA(I,Z,J,Q,X){for(let Y of Z){let q=Y.from+(Y.openStart?25:0),K=Y.to-(Y.openEnd?25:0),W=q<=J&&K>J&&VY(I,Y.tree,0-Y.offset,J,K),G;if(W&&W.pos<=Q&&(G=oV(I,Y.tree,J+Y.offset,W.pos+Y.offset,!1)))return{state:W.state,tree:G}}return{state:I.streamParser.startState(X?J5(X):4),tree:g1.empty}}class eV{constructor(I,Z,J,Q){this.lang=I,this.input=Z,this.fragments=J,this.ranges=Q,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=Q[Q.length-1].to;let X=i8.get(),Y=Q[0].from,{state:q,tree:K}=aA(I,J,Y,this.to,X===null||X===void 0?void 0:X.state);this.state=q,this.parsedPos=this.chunkStart=Y+K.length;for(let W=0;W<K.children.length;W++)this.chunks.push(K.children[W]),this.chunkPos.push(K.positions[W]);if(X&&this.parsedPos<X.viewport.from-1e5&&Q.some((W)=>W.from<=X.viewport.from&&W.to>=X.viewport.from))this.state=this.lang.streamParser.startState(J5(X.state)),X.skipUntilInView(this.parsedPos,X.viewport.from),this.parsedPos=X.viewport.from;this.moveRangeIndex()}advance(){let I=i8.get(),Z=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),J=Math.min(Z,this.chunkStart+512);if(I)J=Math.min(J,I.viewport.to);while(this.parsedPos<J)this.parseLine(I);if(this.chunkStart<this.parsedPos)this.finishChunk();if(this.parsedPos>=Z)return this.finish();if(I&&this.parsedPos>=I.viewport.to)return I.skipUntilInView(this.parsedPos,Z),this.finish();return null}stopAt(I){this.stoppedAt=I}lineAfter(I){let Z=this.input.chunk(I);if(!this.input.lineChunks){let J=Z.indexOf(`
`);if(J>-1)Z=Z.slice(0,J)}else if(Z==`
`)Z="";return I+Z.length<=this.to?Z:Z.slice(0,this.to-I)}nextLine(){let I=this.parsedPos,Z=this.lineAfter(I),J=I+Z.length;for(let Q=this.rangeIndex;;){let X=this.ranges[Q].to;if(X>=J)break;if(Z=Z.slice(0,X-(J-Z.length)),Q++,Q==this.ranges.length)break;let Y=this.ranges[Q].from,q=this.lineAfter(Y);Z+=q,J=Y+q.length}return{line:Z,end:J}}skipGapsTo(I,Z,J){for(;;){let Q=this.ranges[this.rangeIndex].to,X=I+Z;if(J>0?Q>X:Q>=X)break;let Y=this.ranges[++this.rangeIndex].from;Z+=Y-Q}return Z}moveRangeIndex(){while(this.ranges[this.rangeIndex].to<this.parsedPos)this.rangeIndex++}emitToken(I,Z,J,Q){let X=4;if(this.ranges.length>1){Q=this.skipGapsTo(Z,Q,1),Z+=Q;let q=this.chunk.length;Q=this.skipGapsTo(J,Q,-1),J+=Q,X+=this.chunk.length-q}let Y=this.chunk.length-4;if(this.lang.streamParser.mergeTokens&&X==4&&Y>=0&&this.chunk[Y]==I&&this.chunk[Y+2]==Z)this.chunk[Y+2]=J;else this.chunk.push(I,Z,J,X);return Q}parseLine(I){let{line:Z,end:J}=this.nextLine(),Q=0,{streamParser:X}=this.lang,Y=new zY(Z,I?I.state.tabSize:4,I?J5(I.state):2);if(Y.eol())X.blankLine(this.state,Y.indentUnit);else while(!Y.eol()){let q=Ij(X.token,Y,this.state);if(q)Q=this.emitToken(this.lang.tokenTable.resolve(q),this.parsedPos+Y.start,this.parsedPos+Y.pos,Q);if(Y.start>1e4)break}if(this.parsedPos=J,this.moveRangeIndex(),this.parsedPos<this.to)this.parsedPos++}finishChunk(){let I=g1.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:tA,topID:0,maxBufferLength:512,reused:this.chunkReused});I=new g1(I.type,I.children,I.positions,I.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(I),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new g1(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function Ij(I,Z,J){Z.start=Z.pos;for(let Q=0;Q<10;Q++){let X=I(Z,J);if(Z.pos>Z.start)return X}throw Error("Stream parser failed to advance stream.")}var jY=Object.create(null),P3=[C0.none],tA=new lI(P3),uV=[],$V=Object.create(null),Zj=Object.create(null);for(let[I,Z]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])Zj[I]=Jj(jY,Z);class OY{constructor(I){this.extra=I,this.table=Object.assign(Object.create(null),Zj)}resolve(I){return!I?0:this.table[I]||(this.table[I]=Jj(this.extra,I))}}var oA=new OY(jY);function YY(I,Z){if(uV.indexOf(I)>-1)return;uV.push(I),console.warn(Z)}function Jj(I,Z){let J=[];for(let K of Z.split(" ")){let W=[];for(let G of K.split(".")){let U=I[G]||v[G];if(!U)YY(G,`Unknown highlighting tag ${G}`);else if(typeof U=="function")if(!W.length)YY(G,`Modifier ${G} used at start of tag`);else W=W.map(U);else if(W.length)YY(G,`Tag ${G} used as modifier`);else W=Array.isArray(U)?U:[U]}for(let G of W)J.push(G)}if(!J.length)return 0;let Q=Z.replace(/ /g,"_"),X=Q+" "+J.map((K)=>K.id),Y=$V[X];if(Y)return Y.id;let q=$V[X]=C0.define({id:P3.length,name:Q,props:[CV({[Q]:J})]});return P3.push(q),q.id}function eA(I,Z){let J=C0.define({id:P3.length,name:"Document",props:[d8.add(()=>I),cV.add(()=>(Q)=>Z.getIndent(Q))],top:!0});return P3.push(J),J}var wb={rtl:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:w1.RTL}),ltr:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:w1.LTR}),auto:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var ID=(I)=>{let{state:Z}=I,J=Z.doc.lineAt(Z.selection.main.from),Q=MY(I.state,J.from);return Q.line?ZD(I):Q.block?QD(I):!1};function RY(I,Z){return({state:J,dispatch:Q})=>{if(J.readOnly)return!1;let X=I(Z,J);if(!X)return!1;return Q(J.update(X)),!0}}var ZD=RY(qD,0);var JD=RY(Wj,0);var QD=RY((I,Z)=>Wj(I,Z,YD(Z)),0);function MY(I,Z){let J=I.languageDataAt("commentTokens",Z,1);return J.length?J[0]:{}}var _3=50;function XD(I,{open:Z,close:J},Q,X){let Y=I.sliceDoc(Q-_3,Q),q=I.sliceDoc(X,X+_3),K=/\s*$/.exec(Y)[0].length,W=/^\s*/.exec(q)[0].length,G=Y.length-K;if(Y.slice(G-Z.length,G)==Z&&q.slice(W,W+J.length)==J)return{open:{pos:Q-K,margin:K&&1},close:{pos:X+W,margin:W&&1}};let U,z;if(X-Q<=2*_3)U=z=I.sliceDoc(Q,X);else U=I.sliceDoc(Q,Q+_3),z=I.sliceDoc(X-_3,X);let j=/^\s*/.exec(U)[0].length,O=/\s*$/.exec(z)[0].length,H=z.length-O-J.length;if(U.slice(j,j+Z.length)==Z&&z.slice(H,H+J.length)==J)return{open:{pos:Q+j+Z.length,margin:/\s/.test(U.charAt(j+Z.length))?1:0},close:{pos:X-O-J.length,margin:/\s/.test(z.charAt(H-1))?1:0}};return null}function YD(I){let Z=[];for(let J of I.selection.ranges){let Q=I.doc.lineAt(J.from),X=J.to<=Q.to?Q:I.doc.lineAt(J.to);if(X.from>Q.from&&X.from==J.to)X=J.to==Q.to+1?Q:I.doc.lineAt(J.to-1);let Y=Z.length-1;if(Y>=0&&Z[Y].to>Q.from)Z[Y].to=X.to;else Z.push({from:Q.from+/^\s*/.exec(Q.text)[0].length,to:X.to})}return Z}function Wj(I,Z,J=Z.selection.ranges){let Q=J.map((Y)=>MY(Z,Y.from).block);if(!Q.every((Y)=>Y))return null;let X=J.map((Y,q)=>XD(Z,Q[q],Y.from,Y.to));if(I!=2&&!X.every((Y)=>Y))return{changes:Z.changes(J.map((Y,q)=>{if(X[q])return[];return[{from:Y.from,insert:Q[q].open+" "},{from:Y.to,insert:" "+Q[q].close}]}))};else if(I!=1&&X.some((Y)=>Y)){let Y=[];for(let q=0,K;q<X.length;q++)if(K=X[q]){let W=Q[q],{open:G,close:U}=K;Y.push({from:G.pos-W.open.length,to:G.pos+G.margin},{from:U.pos-U.margin,to:U.pos+W.close.length})}return{changes:Y}}return null}function qD(I,Z,J=Z.selection.ranges){let Q=[],X=-1;I:for(let{from:Y,to:q}of J){let K=Q.length,W=1e9,G;for(let U=Y;U<=q;){let z=Z.doc.lineAt(U);if(G==null){if(G=MY(Z,z.from).line,!G)continue I}if(z.from>X&&(Y==q||q>z.from)){X=z.from;let j=/^\s*/.exec(z.text)[0].length,O=j==z.length,H=z.text.slice(j,j+G.length)==G?j:-1;if(j<z.text.length&&j<W)W=j;Q.push({line:z,comment:H,token:G,indent:j,empty:O,single:!1})}U=z.to+1}if(W<1e9){for(let U=K;U<Q.length;U++)if(Q[U].indent<Q[U].line.text.length)Q[U].indent=W}if(Q.length==K+1)Q[K].single=!0}if(I!=2&&Q.some((Y)=>Y.comment<0&&(!Y.empty||Y.single))){let Y=[];for(let{line:K,token:W,indent:G,empty:U,single:z}of Q)if(z||!U)Y.push({from:K.from+G,insert:W+" "});let q=Z.changes(Y);return{changes:q,selection:Z.selection.map(q,1)}}else if(I!=1&&Q.some((Y)=>Y.comment>=0)){let Y=[];for(let{line:q,comment:K,token:W}of Q)if(K>=0){let G=q.from+K,U=G+W.length;if(q.text[U-q.from]==" ")U++;Y.push({from:G,to:U})}return{changes:Y}}return null}var HY=B4.define(),KD=B4.define(),WD=t.define(),Gj=t.define({combine(I){return A6(I,{minDepth:100,newGroupDelay:500,joinToEvent:(Z,J)=>J},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(Z,J)=>(Q,X)=>Z(Q,X)||J(Q,X)})}}),Uj=R0.define({create(){return o4.empty},update(I,Z){let J=Z.state.facet(Gj),Q=Z.annotation(HY);if(Q){let W=f0.fromTransaction(Z,Q.selection),G=Q.side,U=G==0?I.undone:I.done;if(W)U=ZZ(U,U.length,J.minDepth,W);else U=jj(U,Z.startState.selection);return new o4(G==0?Q.rest:U,G==0?U:Q.rest)}let X=Z.annotation(KD);if(X=="full"||X=="before")I=I.isolate();if(Z.annotation(t1.addToHistory)===!1)return!Z.changes.empty?I.addMapping(Z.changes.desc):I;let Y=f0.fromTransaction(Z),q=Z.annotation(t1.time),K=Z.annotation(t1.userEvent);if(Y)I=I.addChanges(Y,q,K,J,Z);else if(Z.selection)I=I.addSelection(Z.startState.selection,q,K,J.newGroupDelay);if(X=="full"||X=="after")I=I.isolate();return I},toJSON(I){return{done:I.done.map((Z)=>Z.toJSON()),undone:I.undone.map((Z)=>Z.toJSON())}},fromJSON(I){return new o4(I.done.map(f0.fromJSON),I.undone.map(f0.fromJSON))}});function zj(I={}){return[Uj,Gj.of(I),Y1.domEventHandlers({beforeinput(Z,J){let Q=Z.inputType=="historyUndo"?YZ:Z.inputType=="historyRedo"?T3:null;if(!Q)return!1;return Z.preventDefault(),Q(J)}})]}function XZ(I,Z){return function({state:J,dispatch:Q}){if(!Z&&J.readOnly)return!1;let X=J.field(Uj,!1);if(!X)return!1;let Y=X.pop(I,J,Z);if(!Y)return!1;return Q(Y),!0}}var YZ=XZ(0,!1),T3=XZ(1,!1),GD=XZ(0,!0),UD=XZ(1,!0);class f0{constructor(I,Z,J,Q,X){this.changes=I,this.effects=Z,this.mapped=J,this.startSelection=Q,this.selectionsAfter=X}setSelAfter(I){return new f0(this.changes,this.effects,this.mapped,this.startSelection,I)}toJSON(){var I,Z,J;return{changes:(I=this.changes)===null||I===void 0?void 0:I.toJSON(),mapped:(Z=this.mapped)===null||Z===void 0?void 0:Z.toJSON(),startSelection:(J=this.startSelection)===null||J===void 0?void 0:J.toJSON(),selectionsAfter:this.selectionsAfter.map((Q)=>Q.toJSON())}}static fromJSON(I){return new f0(I.changes&&a1.fromJSON(I.changes),[],I.mapped&&L4.fromJSON(I.mapped),I.startSelection&&u.fromJSON(I.startSelection),I.selectionsAfter.map(u.fromJSON))}static fromTransaction(I,Z){let J=Y4;for(let Q of I.startState.facet(WD)){let X=Q(I);if(X.length)J=J.concat(X)}if(!J.length&&I.changes.empty)return null;return new f0(I.changes.invert(I.startState.doc),J,void 0,Z||I.startState.selection,Y4)}static selection(I){return new f0(void 0,Y4,void 0,void 0,I)}}function ZZ(I,Z,J,Q){let X=Z+1>J+20?Z-J-1:0,Y=I.slice(X,Z);return Y.push(Q),Y}function zD(I,Z){let J=[],Q=!1;return I.iterChangedRanges((X,Y)=>J.push(X,Y)),Z.iterChangedRanges((X,Y,q,K)=>{for(let W=0;W<J.length;){let G=J[W++],U=J[W++];if(K>=G&&q<=U)Q=!0}}),Q}function VD(I,Z){return I.ranges.length==Z.ranges.length&&I.ranges.filter((J,Q)=>J.empty!=Z.ranges[Q].empty).length===0}function Vj(I,Z){return!I.length?Z:!Z.length?I:I.concat(Z)}var Y4=[],jD=200;function jj(I,Z){if(!I.length)return[f0.selection([Z])];else{let J=I[I.length-1],Q=J.selectionsAfter.slice(Math.max(0,J.selectionsAfter.length-jD));if(Q.length&&Q[Q.length-1].eq(Z))return I;return Q.push(Z),ZZ(I,I.length-1,1e9,J.setSelAfter(Q))}}function OD(I){let Z=I[I.length-1],J=I.slice();return J[I.length-1]=Z.setSelAfter(Z.selectionsAfter.slice(0,Z.selectionsAfter.length-1)),J}function FY(I,Z){if(!I.length)return I;let J=I.length,Q=Y4;while(J){let X=FD(I[J-1],Z,Q);if(X.changes&&!X.changes.empty||X.effects.length){let Y=I.slice(0,J);return Y[J-1]=X,Y}else Z=X.mapped,J--,Q=X.selectionsAfter}return Q.length?[f0.selection(Q)]:Y4}function FD(I,Z,J){let Q=Vj(I.selectionsAfter.length?I.selectionsAfter.map((K)=>K.map(Z)):Y4,J);if(!I.changes)return f0.selection(Q);let X=I.changes.map(Z),Y=Z.mapDesc(I.changes,!0),q=I.mapped?I.mapped.composeDesc(Y):Y;return new f0(X,B1.mapEffects(I.effects,Z),q,I.startSelection.map(Y),Q)}var HD=/^(input\.type|delete)($|\.)/;class o4{constructor(I,Z,J=0,Q=void 0){this.done=I,this.undone=Z,this.prevTime=J,this.prevUserEvent=Q}isolate(){return this.prevTime?new o4(this.done,this.undone):this}addChanges(I,Z,J,Q,X){let Y=this.done,q=Y[Y.length-1];if(q&&q.changes&&!q.changes.empty&&I.changes&&(!J||HD.test(J))&&(!q.selectionsAfter.length&&Z-this.prevTime<Q.newGroupDelay&&Q.joinToEvent(X,zD(q.changes,I.changes))||J=="input.type.compose"))Y=ZZ(Y,Y.length-1,Q.minDepth,new f0(I.changes.compose(q.changes),Vj(B1.mapEffects(I.effects,q.changes),q.effects),q.mapped,q.startSelection,Y4));else Y=ZZ(Y,Y.length,Q.minDepth,I);return new o4(Y,Y4,Z,J)}addSelection(I,Z,J,Q){let X=this.done.length?this.done[this.done.length-1].selectionsAfter:Y4;if(X.length>0&&Z-this.prevTime<Q&&J==this.prevUserEvent&&J&&/^select($|\.)/.test(J)&&VD(X[X.length-1],I))return this;return new o4(jj(this.done,I),this.undone,Z,J)}addMapping(I){return new o4(FY(this.done,I),FY(this.undone,I),this.prevTime,this.prevUserEvent)}pop(I,Z,J){let Q=I==0?this.done:this.undone;if(Q.length==0)return null;let X=Q[Q.length-1],Y=X.selectionsAfter[0]||(X.startSelection?X.startSelection.map(X.changes.invertedDesc,1):Z.selection);if(J&&X.selectionsAfter.length)return Z.update({selection:X.selectionsAfter[X.selectionsAfter.length-1],annotations:HY.of({side:I,rest:OD(Q),selection:Y}),userEvent:I==0?"select.undo":"select.redo",scrollIntoView:!0});else if(!X.changes)return null;else{let q=Q.length==1?Y4:Q.slice(0,Q.length-1);if(X.mapped)q=FY(q,X.mapped);return Z.update({changes:X.changes,selection:X.startSelection,effects:X.effects,annotations:HY.of({side:I,rest:q,selection:Y}),filter:!1,userEvent:I==0?"undo":"redo",scrollIntoView:!0})}}}o4.empty=new o4(Y4,Y4);var Oj=[{key:"Mod-z",run:YZ,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:T3,preventDefault:!0},{linux:"Ctrl-Shift-z",run:T3,preventDefault:!0},{key:"Mod-u",run:GD,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:UD,preventDefault:!0}];function I7(I,Z){return u.create(I.ranges.map(Z),I.mainIndex)}function k4(I,Z){return I.update({selection:Z,scrollIntoView:!0,userEvent:"select"})}function b4({state:I,dispatch:Z},J){let Q=I7(I.selection,J);if(Q.eq(I.selection,!0))return!1;return Z(k4(I,Q)),!0}function qZ(I,Z){return u.cursor(Z?I.to:I.from)}function Fj(I,Z){return b4(I,(J)=>J.empty?I.moveByChar(J,Z):qZ(J,Z))}function A0(I){return I.textDirectionAt(I.state.selection.main.head)==w1.LTR}var KZ=(I)=>Fj(I,!A0(I)),WZ=(I)=>Fj(I,A0(I));function Hj(I,Z){return b4(I,(J)=>J.empty?I.moveByGroup(J,Z):qZ(J,Z))}var AY=(I)=>Hj(I,!A0(I)),DY=(I)=>Hj(I,A0(I));var $b=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function ND(I,Z,J){if(Z.type.prop(J))return!0;let Q=Z.to-Z.from;return Q&&(Q>2||/[^\s,.;:]/.test(I.sliceDoc(Z.from,Z.to)))||Z.firstChild}function GZ(I,Z,J){let Q=w4(I).resolveInner(Z.head),X=J?H1.closedBy:H1.openedBy;for(let W=Z.head;;){let G=J?Q.childAfter(W):Q.childBefore(W);if(!G)break;if(ND(I,G,X))Q=G;else W=J?G.to:G.from}let Y=Q.type.prop(X),q,K;if(Y&&(q=J?C4(I,Q.from,1):C4(I,Q.to,-1))&&q.matched)K=J?q.end.to:q.end.from;else K=J?Q.to:Q.from;return u.cursor(K,J?-1:1)}var RD=(I)=>b4(I,(Z)=>GZ(I.state,Z,!A0(I))),MD=(I)=>b4(I,(Z)=>GZ(I.state,Z,A0(I)));function Nj(I,Z){return b4(I,(J)=>{if(!J.empty)return qZ(J,Z);let Q=I.moveVertically(J,Z);return Q.head!=J.head?Q:I.moveToLineBoundary(J,Z)})}var UZ=(I)=>Nj(I,!1),zZ=(I)=>Nj(I,!0);function Rj(I){let Z=I.scrollDOM.clientHeight<I.scrollDOM.scrollHeight-2,J=0,Q=0,X;if(Z){for(let Y of I.state.facet(Y1.scrollMargins)){let q=Y(I);if(q===null||q===void 0?void 0:q.top)J=Math.max(q===null||q===void 0?void 0:q.top,J);if(q===null||q===void 0?void 0:q.bottom)Q=Math.max(q===null||q===void 0?void 0:q.bottom,Q)}X=I.scrollDOM.clientHeight-J-Q}else X=(I.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:J,marginBottom:Q,selfScroll:Z,height:Math.max(I.defaultLineHeight,X-5)}}function Mj(I,Z){let J=Rj(I),{state:Q}=I,X=I7(Q.selection,(q)=>{return q.empty?I.moveVertically(q,Z,J.height):qZ(q,Z)});if(X.eq(Q.selection))return!1;let Y;if(J.selfScroll){let q=I.coordsAtPos(Q.selection.main.head),K=I.scrollDOM.getBoundingClientRect(),W=K.top+J.marginTop,G=K.bottom-J.marginBottom;if(q&&q.top>W&&q.bottom<G)Y=Y1.scrollIntoView(X.main.head,{y:"start",yMargin:q.top-W})}return I.dispatch(k4(Q,X),{effects:Y}),!0}var E3=(I)=>Mj(I,!1),e8=(I)=>Mj(I,!0);function Q5(I,Z,J){let Q=I.lineBlockAt(Z.head),X=I.moveToLineBoundary(Z,J);if(X.head==Z.head&&X.head!=(J?Q.to:Q.from))X=I.moveToLineBoundary(Z,J,!1);if(!J&&X.head==Q.from&&Q.length){let Y=/^\s*/.exec(I.state.sliceDoc(Q.from,Math.min(Q.from+100,Q.to)))[0].length;if(Y&&Z.head!=Q.from+Y)X=u.cursor(Q.from+Y)}return X}var AD=(I)=>b4(I,(Z)=>Q5(I,Z,!0)),DD=(I)=>b4(I,(Z)=>Q5(I,Z,!1)),LD=(I)=>b4(I,(Z)=>Q5(I,Z,!A0(I))),BD=(I)=>b4(I,(Z)=>Q5(I,Z,A0(I))),LY=(I)=>b4(I,(Z)=>u.cursor(I.lineBlockAt(Z.head).from,1)),BY=(I)=>b4(I,(Z)=>u.cursor(I.lineBlockAt(Z.head).to,-1));function PD(I,Z,J){let Q=!1,X=I7(I.selection,(Y)=>{let q=C4(I,Y.head,-1)||C4(I,Y.head,1)||Y.head>0&&C4(I,Y.head-1,1)||Y.head<I.doc.length&&C4(I,Y.head+1,-1);if(!q||!q.end)return Y;Q=!0;let K=q.start.from==Y.head?q.end.to:q.end.from;return J?u.range(Y.anchor,K):u.cursor(K)});if(!Q)return!1;return Z(k4(I,X)),!0}var SD=({state:I,dispatch:Z})=>PD(I,Z,!1);function q4(I,Z,J){let Q=I7(I.state.selection,(X)=>{if(X.undirectional&&X.head>=X.anchor!=Z)X=u.range(X.head,X.anchor);let Y=J(X);return u.range(X.anchor,Y.head,Y.goalColumn,Y.bidiLevel||void 0,Y.assoc)});if(Q.eq(I.state.selection))return!1;return I.dispatch(k4(I.state,Q)),!0}function Aj(I,Z){return q4(I,Z,(J)=>I.moveByChar(J,Z))}var Dj=(I)=>Aj(I,!A0(I)),Lj=(I)=>Aj(I,A0(I));function Bj(I,Z){return q4(I,Z,(J)=>I.moveByGroup(J,Z))}var _D=(I)=>Bj(I,!A0(I)),TD=(I)=>Bj(I,A0(I));var ED=(I)=>{let Z=!A0(I);return q4(I,Z,(J)=>GZ(I.state,J,Z))},hD=(I)=>{let Z=A0(I);return q4(I,Z,(J)=>GZ(I.state,J,Z))};function Pj(I,Z){return q4(I,Z,(J)=>I.moveVertically(J,Z))}var Sj=(I)=>Pj(I,!1),_j=(I)=>Pj(I,!0);function Tj(I,Z){return q4(I,Z,(J)=>I.moveVertically(J,Z,Rj(I).height))}var Qj=(I)=>Tj(I,!1),Xj=(I)=>Tj(I,!0),CD=(I)=>q4(I,!0,(Z)=>Q5(I,Z,!0)),wD=(I)=>q4(I,!1,(Z)=>Q5(I,Z,!1)),kD=(I)=>{let Z=!A0(I);return q4(I,Z,(J)=>Q5(I,J,Z))},bD=(I)=>{let Z=A0(I);return q4(I,Z,(J)=>Q5(I,J,Z))},yD=(I)=>q4(I,!1,(Z)=>u.cursor(I.lineBlockAt(Z.head).from)),xD=(I)=>q4(I,!0,(Z)=>u.cursor(I.lineBlockAt(Z.head).to)),JZ=({state:I,dispatch:Z})=>{return Z(k4(I,{anchor:0})),!0},QZ=({state:I,dispatch:Z})=>{return Z(k4(I,{anchor:I.doc.length})),!0},Yj=({state:I,dispatch:Z})=>{return Z(k4(I,{anchor:I.selection.main.anchor,head:0})),!0},qj=({state:I,dispatch:Z})=>{return Z(k4(I,{anchor:I.selection.main.anchor,head:I.doc.length})),!0},nD=({state:I,dispatch:Z})=>{return Z(I.update({selection:{anchor:0,head:I.doc.length},userEvent:"select"})),!0},gD=({state:I,dispatch:Z})=>{let J=jZ(I).map(({from:Q,to:X})=>u.range(Q,Math.min(X+1,I.doc.length)));return Z(I.update({selection:u.create(J),userEvent:"select"})),!0},fD=({state:I,dispatch:Z})=>{let J=I7(I.selection,(Q)=>{let X=w4(I),Y=X.resolveStack(Q.from,1);if(Q.empty){let q=X.resolveStack(Q.from,-1);if(q.node.from>=Y.node.from&&q.node.to<=Y.node.to)Y=q}for(let q=Y;q;q=q.next){let{node:K}=q;if((K.from<Q.from&&K.to>=Q.to||K.to>Q.to&&K.from<=Q.from)&&q.next)return u.range(K.to,K.from)}return Q});if(J.eq(I.selection))return!1;return Z(k4(I,J)),!0};function Ej(I,Z){let{state:J}=I,Q=J.selection,X=J.selection.ranges.slice();for(let Y of J.selection.ranges){let q=J.doc.lineAt(Y.head);if(Z?q.to<I.state.doc.length:q.from>0)for(let K=Y;;){let W=I.moveVertically(K,Z);if(W.head<q.from||W.head>q.to){if(!X.some((G)=>G.head==W.head))X.push(W);break}else if(W.head==K.head)break;else K=W}}if(X.length==Q.ranges.length)return!1;return I.dispatch(k4(J,u.create(X,X.length-1))),!0}var uD=(I)=>Ej(I,!1),$D=(I)=>Ej(I,!0),mD=({state:I,dispatch:Z})=>{let J=I.selection,Q=null;if(J.ranges.length>1)Q=u.create([J.main]);else if(!J.main.empty)Q=u.create([u.cursor(J.main.head)]);if(!Q)return!1;return Z(k4(I,Q)),!0};function h3(I,Z){if(I.state.readOnly)return!1;let J="delete.selection",{state:Q}=I,X=Q.changeByRange((Y)=>{let{from:q,to:K}=Y;if(q==K){let W=Z(Y);if(W<q)J="delete.backward",W=IZ(I,W,!1);else if(W>q)J="delete.forward",W=IZ(I,W,!0);q=Math.min(q,W),K=Math.max(K,W)}else q=IZ(I,q,!1),K=IZ(I,K,!0);return q==K?{range:Y}:{changes:{from:q,to:K},range:u.cursor(q,q<Y.head?-1:1)}});if(X.changes.empty)return!1;return I.dispatch(Q.update(X,{scrollIntoView:!0,userEvent:J,effects:J=="delete.selection"?Y1.announce.of(Q.phrase("Selection deleted")):void 0})),!0}function IZ(I,Z,J){if(I instanceof Y1)for(let Q of I.state.facet(Y1.atomicRanges).map((X)=>X(I)))Q.between(Z,Z,(X,Y)=>{if(X<Z&&Y>Z)Z=J?Y:X});return Z}var hj=(I,Z,J)=>h3(I,(Q)=>{let X=Q.from,{state:Y}=I,q=Y.doc.lineAt(X),K,W;if(J&&!Z&&X>q.from&&X<q.from+200&&!/[^ \t]/.test(K=q.text.slice(0,X-q.from))){if(K[K.length-1]=="\t")return X-1;let G=$5(K,Y.tabSize),U=G%J5(Y)||J5(Y);for(let z=0;z<U&&K[K.length-1-z]==" ";z++)X--;W=X}else if(W=q0(q.text,X-q.from,Z,Z)+q.from,W==X&&q.number!=(Z?Y.doc.lines:1))W+=Z?1:-1;else if(!Z&&/[\ufe00-\ufe0f]/.test(q.text.slice(W-q.from,X-q.from)))W=q0(q.text,W-q.from,!1,!1)+q.from;return W}),NY=(I)=>hj(I,!1,!0);var VZ=(I)=>hj(I,!0,!1),Cj=(I,Z)=>h3(I,(J)=>{let Q=J.head,{state:X}=I,Y=X.doc.lineAt(Q),q=X.charCategorizer(Q);for(let K=null;;){if(Q==(Z?Y.to:Y.from)){if(Q==J.head&&Y.number!=(Z?X.doc.lines:1))Q+=Z?1:-1;break}let W=q0(Y.text,Q-Y.from,Z)+Y.from,G=Y.text.slice(Math.min(Q,W)-Y.from,Math.max(Q,W)-Y.from),U=q(G);if(K!=null&&U!=K)break;if(G!=" "||Q!=J.head)K=U;Q=W}return Q}),wj=(I)=>Cj(I,!1),PY=(I)=>Cj(I,!0);var vD=(I)=>h3(I,(Z)=>{let J=I.lineBlockAt(Z.head).to;return Z.head<J?J:Math.min(I.state.doc.length,Z.head+1)});var cD=(I)=>h3(I,(Z)=>{let J=I.moveToLineBoundary(Z,!1).head;return Z.head>J?J:Math.max(0,Z.head-1)}),pD=(I)=>h3(I,(Z)=>{let J=I.moveToLineBoundary(Z,!0).head;return Z.head<J?J:Math.min(I.state.doc.length,Z.head+1)});var sD=({state:I,dispatch:Z})=>{if(I.readOnly)return!1;let J=I.changeByRange((Q)=>{return{changes:{from:Q.from,to:Q.to,insert:M1.of(["",""])},range:u.cursor(Q.from)}});return Z(I.update(J,{scrollIntoView:!0,userEvent:"input"})),!0},dD=({state:I,dispatch:Z})=>{if(I.readOnly)return!1;let J=I.changeByRange((Q)=>{if(!Q.empty||Q.from==0||Q.from==I.doc.length)return{range:Q};let X=Q.from,Y=I.doc.lineAt(X),q=X==Y.from?X-1:q0(Y.text,X-Y.from,!1)+Y.from,K=X==Y.to?X+1:q0(Y.text,X-Y.from,!0)+Y.from;return{changes:{from:q,to:K,insert:I.doc.slice(X,K).append(I.doc.slice(q,X))},range:u.cursor(K)}});if(J.changes.empty)return!1;return Z(I.update(J,{scrollIntoView:!0,userEvent:"move.character"})),!0};function jZ(I){let Z=[],J=-1;for(let Q of I.selection.ranges){let X=I.doc.lineAt(Q.from),Y=I.doc.lineAt(Q.to);if(!Q.empty&&Q.to==Y.from)Y=I.doc.lineAt(Q.to-1);if(J>=X.number){let q=Z[Z.length-1];q.to=Y.to,q.ranges.push(Q)}else Z.push({from:X.from,to:Y.to,ranges:[Q]});J=Y.number+1}return Z}function kj(I,Z,J){if(I.readOnly)return!1;let Q=[],X=[];for(let Y of jZ(I)){if(J?Y.to==I.doc.length:Y.from==0)continue;let q=I.doc.lineAt(J?Y.to+1:Y.from-1),K=q.length+1;if(J){Q.push({from:Y.to,to:q.to},{from:Y.from,insert:q.text+I.lineBreak});for(let W of Y.ranges)X.push(u.range(Math.min(I.doc.length,W.anchor+K),Math.min(I.doc.length,W.head+K)))}else{Q.push({from:q.from,to:Y.from},{from:Y.to,insert:I.lineBreak+q.text});for(let W of Y.ranges)X.push(u.range(W.anchor-K,W.head-K))}}if(!Q.length)return!1;return Z(I.update({changes:Q,scrollIntoView:!0,selection:u.create(X,I.selection.mainIndex),userEvent:"move.line"})),!0}var iD=({state:I,dispatch:Z})=>kj(I,Z,!1),lD=({state:I,dispatch:Z})=>kj(I,Z,!0);function bj(I,Z,J){if(I.readOnly)return!1;let Q=[];for(let Y of jZ(I))if(J)Q.push({from:Y.from,insert:I.doc.slice(Y.from,Y.to)+I.lineBreak});else Q.push({from:Y.to,insert:I.lineBreak+I.doc.slice(Y.from,Y.to)});let X=I.changes(Q);return Z(I.update({changes:X,selection:I.selection.map(X,J?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}var rD=({state:I,dispatch:Z})=>bj(I,Z,!1),aD=({state:I,dispatch:Z})=>bj(I,Z,!0),tD=(I)=>{if(I.state.readOnly)return!1;let{state:Z}=I,J=Z.changes(jZ(Z).map(({from:X,to:Y})=>{if(X>0)X--;else if(Y<Z.doc.length)Y++;return{from:X,to:Y}})),Q=I7(Z.selection,(X)=>{let Y=void 0;if(I.lineWrapping){let q=I.lineBlockAt(X.head),K=I.coordsAtPos(X.head,X.assoc||1);if(K)Y=q.bottom+I.documentTop-K.bottom+I.defaultLineHeight/2}return I.moveVertically(X,!0,Y)}).map(J);return I.dispatch({changes:J,selection:Q,scrollIntoView:!0,userEvent:"delete.line"}),!0};function oD(I,Z){if(/\(\)|\[\]|\{\}/.test(I.sliceDoc(Z-1,Z+1)))return{from:Z,to:Z};let J=w4(I).resolveInner(Z),Q=J.childBefore(Z),X=J.childAfter(Z),Y;if(Q&&X&&Q.to<=Z&&X.from>=Z&&(Y=Q.type.prop(H1.closedBy))&&Y.indexOf(X.name)>-1&&I.doc.lineAt(Q.to).from==I.doc.lineAt(X.from).from&&!/\S/.test(I.sliceDoc(Q.to,X.from)))return{from:Q.to,to:X.from};return null}var Kj=yj(!1),eD=yj(!0);function yj(I){return({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{let{from:Y,to:q}=X,K=Z.doc.lineAt(Y),W=!I&&Y==q&&oD(Z,Y);if(I)Y=q=(q<=K.to?K:Z.doc.lineAt(q)).to;let G=new t8(Z,{simulateBreak:Y,simulateDoubleBreak:!!W}),U=GY(G,Y);if(U==null)U=$5(/^\s*/.exec(Z.doc.lineAt(Y).text)[0],Z.tabSize);while(q<K.to&&/\s/.test(K.text[q-K.from]))q++;if(W)({from:Y,to:q}=W);else if(Y>K.from&&Y<K.from+100&&!/\S/.test(K.text.slice(0,Y)))Y=K.from;let z=["",S3(Z,U)];if(W)z.push(S3(Z,G.lineIndent(K.from,-1)));return{changes:{from:Y,to:q,insert:M1.of(z)},range:u.cursor(Y+1+z[1].length)}});return J(Z.update(Q,{scrollIntoView:!0,userEvent:"input"})),!0}}function SY(I,Z){let J=-1;return I.changeByRange((Q)=>{let X=[];for(let q=Q.from;q<=Q.to;){let K=I.doc.lineAt(q);if(K.number>J&&(Q.empty||Q.to>K.from))Z(K,X,Q),J=K.number;q=K.to+1}let Y=I.changes(X);return{changes:X,range:u.range(Y.mapPos(Q.anchor,1),Y.mapPos(Q.head,1))}})}var IL=({state:I,dispatch:Z})=>{if(I.readOnly)return!1;let J=Object.create(null),Q=new t8(I,{overrideIndentation:(Y)=>{let q=J[Y];return q==null?-1:q}}),X=SY(I,(Y,q,K)=>{let W=GY(Q,Y.from);if(W==null)return;if(!/\S/.test(Y.text))W=0;let G=/^\s*/.exec(Y.text)[0],U=S3(I,W);if(G!=U||K.from<Y.from+G.length)J[Y.from]=W,q.push({from:Y.from,to:Y.from+G.length,insert:U})});if(!X.changes.empty)Z(I.update(X,{userEvent:"indent"}));return!0},xj=({state:I,dispatch:Z})=>{if(I.readOnly)return!1;return Z(I.update(SY(I,(J,Q)=>{Q.push({from:J.from,insert:I.facet(a8)})}),{userEvent:"input.indent"})),!0},nj=({state:I,dispatch:Z})=>{if(I.readOnly)return!1;return Z(I.update(SY(I,(J,Q)=>{let X=/^\s*/.exec(J.text)[0];if(!X)return;let Y=$5(X,I.tabSize),q=0,K=S3(I,Math.max(0,Y-J5(I)));while(q<X.length&&q<K.length&&X.charCodeAt(q)==K.charCodeAt(q))q++;Q.push({from:J.from+q,to:J.from+X.length,insert:K.slice(q)})}),{userEvent:"delete.dedent"})),!0},ZL=(I)=>{return I.setTabFocusMode(),!0};var JL=[{key:"Ctrl-b",run:KZ,shift:Dj,preventDefault:!0},{key:"Ctrl-f",run:WZ,shift:Lj},{key:"Ctrl-p",run:UZ,shift:Sj},{key:"Ctrl-n",run:zZ,shift:_j},{key:"Ctrl-a",run:LY,shift:yD},{key:"Ctrl-e",run:BY,shift:xD},{key:"Ctrl-d",run:VZ},{key:"Ctrl-h",run:NY},{key:"Ctrl-k",run:vD},{key:"Ctrl-Alt-h",run:wj},{key:"Ctrl-o",run:sD},{key:"Ctrl-t",run:dD},{key:"Ctrl-v",run:e8}],QL=[{key:"ArrowLeft",run:KZ,shift:Dj,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:AY,shift:_D,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:LD,shift:kD,preventDefault:!0},{key:"ArrowRight",run:WZ,shift:Lj,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:DY,shift:TD,preventDefault:!0},{mac:"Cmd-ArrowRight",run:BD,shift:bD,preventDefault:!0},{key:"ArrowUp",run:UZ,shift:Sj,preventDefault:!0},{mac:"Cmd-ArrowUp",run:JZ,shift:Yj},{mac:"Ctrl-ArrowUp",run:E3,shift:Qj},{key:"ArrowDown",run:zZ,shift:_j,preventDefault:!0},{mac:"Cmd-ArrowDown",run:QZ,shift:qj},{mac:"Ctrl-ArrowDown",run:e8,shift:Xj},{key:"PageUp",run:E3,shift:Qj},{key:"PageDown",run:e8,shift:Xj},{key:"Home",run:DD,shift:wD,preventDefault:!0},{key:"Mod-Home",run:JZ,shift:Yj},{key:"End",run:AD,shift:CD,preventDefault:!0},{key:"Mod-End",run:QZ,shift:qj},{key:"Enter",run:Kj,shift:Kj},{key:"Mod-a",run:nD},{key:"Backspace",run:NY,shift:NY,preventDefault:!0},{key:"Delete",run:VZ,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:wj,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:PY,preventDefault:!0},{mac:"Mod-Backspace",run:cD,preventDefault:!0},{mac:"Mod-Delete",run:pD,preventDefault:!0}].concat(JL.map((I)=>({mac:I.key,run:I.run,shift:I.shift}))),gj=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:RD,shift:ED},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:MD,shift:hD},{key:"Alt-ArrowUp",run:iD},{key:"Shift-Alt-ArrowUp",run:rD},{key:"Alt-ArrowDown",run:lD},{key:"Shift-Alt-ArrowDown",run:aD},{key:"Mod-Alt-ArrowUp",run:uD},{key:"Mod-Alt-ArrowDown",run:$D},{key:"Escape",run:mD},{key:"Mod-Enter",run:eD},{key:"Alt-l",mac:"Ctrl-l",run:gD},{key:"Mod-i",run:fD,preventDefault:!0},{key:"Mod-[",run:nj},{key:"Mod-]",run:xj},{key:"Mod-Alt-\\",run:IL},{key:"Shift-Mod-k",run:tD},{key:"Shift-Mod-\\",run:SD},{key:"Mod-/",run:ID},{key:"Alt-A",run:JD},{key:"Ctrl-m",mac:"Shift-Alt-m",run:ZL}].concat(QL),fj={key:"Tab",run:xj,shift:nj};class _Y{constructor(I,Z,J){this.from=I,this.to=Z,this.diagnostic=J}}class a5{constructor(I,Z,J){this.diagnostics=I,this.panel=Z,this.selected=J}static init(I,Z,J){let Q=J.facet(C3).markerFilter;if(Q)I=Q(I,J);let X=I.slice().sort((j,O)=>j.from-O.from||j.to-O.to),Y=new R6,q=[],K=0,W=J.doc.iter(),G=0,U=J.doc.length;for(let j=0;;){let O=j==X.length?null:X[j];if(!O&&!q.length)break;let H,N;if(q.length)H=K,N=q.reduce((T,h)=>Math.min(T,h.to),O&&O.from>H?O.from:1e8);else{if(H=O.from,H>U)break;N=O.to,q.push(O),j++}while(j<X.length){let T=X[j];if(T.from==H&&(T.to>T.from||T.to==H))q.push(T),j++,N=Math.min(T.to,N);else{N=Math.min(T.from,N);break}}N=Math.min(N,U);let M=!1;if(q.some((T)=>T.from==H&&(T.to==N||N==U))){if(M=H==N,!M&&N-H<10){let T=H-(G+W.value.length);if(T>0)W.next(T),G=H;for(let h=H;;){if(h>=N){M=!0;break}if(!W.lineBreak&&G+W.value.length>h)break;h=G+W.value.length,G+=W.value.length,W.next()}}}let _=VL(q);if(M)Y.add(H,H,P1.widget({widget:new dj(_),diagnostics:q.slice()}));else{let T=q.reduce((h,w)=>w.markClass?h+" "+w.markClass:h,"");Y.add(H,N,P1.mark({class:"cm-lintRange cm-lintRange-"+_+T,diagnostics:q.slice(),inclusiveEnd:q.some((h)=>h.to>N)}))}if(K=N,K==U)break;for(let T=0;T<q.length;T++)if(q[T].to<=K)q.splice(T--,1)}let z=Y.finish();return new a5(z,Z,Z7(z))}}function Z7(I,Z=null,J=0){let Q=null;return I.between(J,1e9,(X,Y,{spec:q})=>{if(Z&&q.diagnostics.indexOf(Z)<0)return;if(!Q)Q=new _Y(X,Y,Z||q.diagnostics[0]);else if(q.diagnostics.indexOf(Q.diagnostic)<0)return!1;else Q=new _Y(Q.from,Y,Q.diagnostic)}),Q}function XL(I,Z){let J=Z.pos,Q=Z.end||J,X=I.state.facet(C3).hideOn(I,J,Q);if(X!=null)return X;let Y=I.startState.doc.lineAt(Z.pos);return!!(I.effects.some((q)=>q.is(EY))||I.changes.touchesRange(Y.from,Math.max(Y.to,Q)))}function YL(I,Z){return I.field(y4,!1)?Z:Z.concat(B1.appendConfig.of(OL))}function mj(I,Z){return{effects:YL(I,[EY.of(Z)])}}var EY=B1.define(),vj=B1.define(),cj=B1.define(),y4=R0.define({create(){return new a5(P1.none,null,null)},update(I,Z){if(Z.docChanged&&I.diagnostics.size){let J=I.diagnostics.map(Z.changes),Q=null,X=I.panel;if(I.selected){let Y=Z.changes.mapPos(I.selected.from,1);Q=Z7(J,I.selected.diagnostic,Y)||Z7(J,null,Y)}if(!J.size&&X&&Z.state.facet(C3).autoPanel)X=null;I=new a5(J,X,Q)}for(let J of Z.effects)if(J.is(EY)){let Q=!Z.state.facet(C3).autoPanel?I.panel:J.value.length?FZ.open:null;I=a5.init(J.value,Q,Z.state)}else if(J.is(vj))I=new a5(I.diagnostics,J.value?FZ.open:null,I.selected);else if(J.is(cj))I=new a5(I.diagnostics,I.panel,J.value);return I},provide:(I)=>[c8.from(I,(Z)=>Z.panel),Y1.decorations.from(I,(Z)=>Z.diagnostics)]});var qL=P1.mark({class:"cm-lintRange cm-lintRange-active"});function KL(I,Z,J){let{diagnostics:Q}=I.state.field(y4),X,Y=-1,q=-1;Q.between(Z-(J<0?1:0),Z+(J>0?1:0),(W,G,{spec:U})=>{if(Z>=W&&Z<=G&&(W==G||(Z>W||J>0)&&(Z<G||J<0)))return X=U.diagnostics,Y=W,q=G,!1});let K=I.state.facet(C3).tooltipFilter;if(X&&K)X=K(X,I.state);if(!X)return null;return{pos:Y,end:q,above:!0,create(){return{dom:WL(I,X)}}}}function WL(I,Z){return p0("ul",{class:"cm-tooltip-lint"},Z.map((J)=>sj(I,J,!1)))}var uj=(I)=>{let Z=I.state.field(y4,!1);if(!Z||!Z.panel)return!1;return I.dispatch({effects:vj.of(!1)}),!0};var C3=t.define({combine(I){return{sources:I.map((Z)=>Z.source).filter((Z)=>Z!=null),...A6(I.map((Z)=>Z.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:$j,tooltipFilter:$j,needsRefresh:(Z,J)=>!Z?J:!J?Z:(Q)=>Z(Q)||J(Q),hideOn:(Z,J)=>!Z?J:!J?Z:(Q,X,Y)=>Z(Q,X,Y)||J(Q,X,Y),autoPanel:(Z,J)=>Z||J})}}});function $j(I,Z){return!I?Z:!Z?I:(J,Q)=>Z(I(J,Q),Q)}function pj(I){let Z=[];if(I)I:for(let{name:J}of I){for(let Q=0;Q<J.length;Q++){let X=J[Q];if(/[a-zA-Z]/.test(X)&&!Z.some((Y)=>Y.toLowerCase()==X.toLowerCase())){Z.push(X);continue I}}Z.push("")}return Z}function sj(I,Z,J){var Q;let X=J?pj(Z.actions):[];return p0("li",{class:"cm-diagnostic cm-diagnostic-"+Z.severity},p0("span",{class:"cm-diagnosticText"},Z.renderMessage?Z.renderMessage(I):Z.message),(Q=Z.actions)===null||Q===void 0?void 0:Q.map((Y,q)=>{let K=!1,W=(O)=>{if(O.preventDefault(),K)return;K=!0;let H=Z7(I.state.field(y4).diagnostics,Z);if(H)Y.apply(I,H.from,H.to)},{name:G}=Y,U=X[q]?G.indexOf(X[q]):-1,z=U<0?G:[G.slice(0,U),p0("u",G.slice(U,U+1)),G.slice(U+1)],j=Y.markClass?" "+Y.markClass:"";return p0("button",{type:"button",class:"cm-diagnosticAction"+j,onclick:W,onmousedown:W,"aria-label":` Action: ${G}${U<0?"":` (access key "${X[q]})"`}.`},z)}),Z.source&&p0("div",{class:"cm-diagnosticSource"},Z.source))}class dj extends a6{constructor(I){super();this.sev=I}eq(I){return I.sev==this.sev}toDOM(){return p0("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class TY{constructor(I,Z){this.diagnostic=Z,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=sj(I,Z,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class FZ{constructor(I){this.view=I,this.items=[];let Z=(Q)=>{if(Q.ctrlKey||Q.altKey||Q.metaKey)return;if(Q.keyCode==27)uj(this.view),this.view.focus();else if(Q.keyCode==38||Q.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(Q.keyCode==40||Q.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(Q.keyCode==36)this.moveSelection(0);else if(Q.keyCode==35)this.moveSelection(this.items.length-1);else if(Q.keyCode==13)this.view.focus();else if(Q.keyCode>=65&&Q.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:X}=this.items[this.selectedIndex],Y=pj(X.actions);for(let q=0;q<Y.length;q++)if(Y[q].toUpperCase().charCodeAt(0)==Q.keyCode){let K=Z7(this.view.state.field(y4).diagnostics,X);if(K)X.actions[q].apply(I,K.from,K.to)}}else return;Q.preventDefault()},J=(Q)=>{for(let X=0;X<this.items.length;X++)if(this.items[X].dom.contains(Q.target))this.moveSelection(X)};this.list=p0("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:Z,onclick:J}),this.dom=p0("div",{class:"cm-panel-lint"},this.list,p0("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>uj(this.view)},"×")),this.update()}get selectedIndex(){let I=this.view.state.field(y4).selected;if(!I)return-1;for(let Z=0;Z<this.items.length;Z++)if(this.items[Z].diagnostic==I.diagnostic)return Z;return-1}update(){let{diagnostics:I,selected:Z}=this.view.state.field(y4),J=0,Q=!1,X=null,Y=new Set;I.between(0,this.view.state.doc.length,(q,K,{spec:W})=>{for(let G of W.diagnostics){if(Y.has(G))continue;Y.add(G);let U=-1,z;for(let j=J;j<this.items.length;j++)if(this.items[j].diagnostic==G){U=j;break}if(U<0)z=new TY(this.view,G),this.items.splice(J,0,z),Q=!0;else if(z=this.items[U],U>J)this.items.splice(J,U-J),Q=!0;if(Z&&z.diagnostic==Z.diagnostic){if(!z.dom.hasAttribute("aria-selected"))z.dom.setAttribute("aria-selected","true"),X=z}else if(z.dom.hasAttribute("aria-selected"))z.dom.removeAttribute("aria-selected");J++}});while(J<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0))Q=!0,this.items.pop();if(this.items.length==0)this.items.push(new TY(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),Q=!0;if(X)this.list.setAttribute("aria-activedescendant",X.id),this.view.requestMeasure({key:this,read:()=>({sel:X.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:q,panel:K})=>{let W=K.height/this.list.offsetHeight;if(q.top<K.top)this.list.scrollTop-=(K.top-q.top)/W;else if(q.bottom>K.bottom)this.list.scrollTop+=(q.bottom-K.bottom)/W}});else if(this.selectedIndex<0)this.list.removeAttribute("aria-activedescendant");if(Q)this.sync()}sync(){let I=this.list.firstChild;function Z(){let J=I;I=J.nextSibling,J.remove()}for(let J of this.items)if(J.dom.parentNode==this.list){while(I!=J.dom)Z();I=J.dom.nextSibling}else this.list.insertBefore(J.dom,I);while(I)Z()}moveSelection(I){if(this.selectedIndex<0)return;let Z=this.view.state.field(y4),J=Z7(Z.diagnostics,this.items[I].diagnostic);if(!J)return;this.view.dispatch({selection:{anchor:J.from,head:J.to},scrollIntoView:!0,effects:cj.of(J)})}static open(I){return new FZ(I)}}function GL(I,Z='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${Z}>${encodeURIComponent(I)}</svg>')`}function OZ(I){return GL(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${I}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}var UL=Y1.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:0.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:OZ("#f11")},".cm-lintRange-warning":{backgroundImage:OZ("orange")},".cm-lintRange-info":{backgroundImage:OZ("#999")},".cm-lintRange-hint":{backgroundImage:OZ("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});function zL(I){return I=="error"?4:I=="warning"?3:I=="info"?2:1}function VL(I){let Z="hint",J=1;for(let Q of I){let X=zL(Q.severity);if(X>J)J=X,Z=Q.severity}return Z}var jL=NV(KL,{hideOn:XL}),OL=[y4,Y1.decorations.compute([y4],(I)=>{let{selected:Z,panel:J}=I.field(y4);return!Z||!J||Z.from==Z.to?P1.none:P1.set([qL.range(Z.from,Z.to)])}),jL,UL];function hY(I){return new RegExp("^(("+I.join(")|(")+"))\\b")}var FL=hY(["and","or","not","is"]),ij=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],lj=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function x4(I){return I.scopes[I.scopes.length-1]}function rj(I){var Z="error",J=I.delimiters||I.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,Q=[I.singleOperators,I.doubleOperators,I.doubleDelimiters,I.tripleDelimiters,I.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/];for(var X=0;X<Q.length;X++)if(!Q[X])Q.splice(X--,1);var Y=I.hangingIndent,q=ij,K=lj;if(I.extra_keywords!=null)q=q.concat(I.extra_keywords);if(I.extra_builtins!=null)K=K.concat(I.extra_builtins);var W=!(I.version&&Number(I.version)<3);if(W){var G=I.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;q=q.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),K=K.concat(["ascii","bytes","exec","print"]);var U=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var G=I.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;q=q.concat(["exec","print"]),K=K.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var U=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var z=hY(q),j=hY(K);function O(L,S){var B=L.sol()&&S.lastToken!="\\";if(B)S.indent=L.indentation();if(B&&x4(S).type=="py"){var E=x4(S).offset;if(L.eatSpace()){var A=L.indentation();if(A>E)_(L,S);else if(A<E&&h(L,S)&&L.peek()!="#")S.errorToken=!0;return null}else{var i=H(L,S);if(E>0&&h(L,S))i+=" "+Z;return i}}return H(L,S)}function H(L,S,B){if(L.eatSpace())return null;if(!B&&L.match(/^#.*/))return"comment";if(L.match(/^[0-9\.]/,!1)){var E=!1;if(L.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i))E=!0;if(L.match(/^[\d_]+\.\d*/))E=!0;if(L.match(/^\.\d+/))E=!0;if(E)return L.eat(/J/i),"number";var A=!1;if(L.match(/^0x[0-9a-f_]+/i))A=!0;if(L.match(/^0b[01_]+/i))A=!0;if(L.match(/^0o[0-7_]+/i))A=!0;if(L.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/))L.eat(/J/i),A=!0;if(L.match(/^0(?![\dx])/i))A=!0;if(A)return L.eat(/L/i),"number"}if(L.match(U)){var i=L.current().toLowerCase().indexOf("f")!==-1;if(!i)return S.tokenize=M(L.current(),S.tokenize),S.tokenize(L,S);else return S.tokenize=N(L.current(),S.tokenize),S.tokenize(L,S)}for(var $=0;$<Q.length;$++)if(L.match(Q[$]))return"operator";if(L.match(J))return"punctuation";if(S.lastToken=="."&&L.match(G))return"property";if(L.match(z)||L.match(FL))return"keyword";if(L.match(j))return"builtin";if(L.match(/^(self|cls)\b/))return"self";if(L.match(G)){if(S.lastToken=="def"||S.lastToken=="class")return"def";return"variable"}return L.next(),B?null:Z}function N(L,S){while("rubf".indexOf(L.charAt(0).toLowerCase())>=0)L=L.substr(1);var B=L.length==1,E="string";function A($){return function(c,K1){var e=H(c,K1,!0);if(e=="punctuation"){if(c.current()=="{")K1.tokenize=A($+1);else if(c.current()=="}")if($>1)K1.tokenize=A($-1);else K1.tokenize=i}return e}}function i($,c){while(!$.eol())if($.eatWhile(/[^'"\{\}\\]/),$.eat("\\")){if($.next(),B&&$.eol())return E}else if($.match(L))return c.tokenize=S,E;else if($.match("{{"))return E;else if($.match("{",!1))if(c.tokenize=A(0),$.current())return E;else return c.tokenize($,c);else if($.match("}}"))return E;else if($.match("}"))return Z;else $.eat(/['"]/);if(B)if(I.singleLineStringErrors)return Z;else c.tokenize=S;return E}return i.isString=!0,i}function M(L,S){while("rubf".indexOf(L.charAt(0).toLowerCase())>=0)L=L.substr(1);var B=L.length==1,E="string";function A(i,$){while(!i.eol())if(i.eatWhile(/[^'"\\]/),i.eat("\\")){if(i.next(),B&&i.eol())return E}else if(i.match(L))return $.tokenize=S,E;else i.eat(/['"]/);if(B)if(I.singleLineStringErrors)return Z;else $.tokenize=S;return E}return A.isString=!0,A}function _(L,S){while(x4(S).type!="py")S.scopes.pop();S.scopes.push({offset:x4(S).offset+L.indentUnit,type:"py",align:null})}function T(L,S,B){var E=L.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:L.column()+1;S.scopes.push({offset:S.indent+(Y||L.indentUnit),type:B,align:E})}function h(L,S){var B=L.indentation();while(S.scopes.length>1&&x4(S).offset>B){if(x4(S).type!="py")return!0;S.scopes.pop()}return x4(S).offset!=B}function w(L,S){if(L.sol())S.beginningOfLine=!0,S.dedent=!1;var B=S.tokenize(L,S),E=L.current();if(S.beginningOfLine&&E=="@")return L.match(G,!1)?"meta":W?"operator":Z;if(/\S/.test(E))S.beginningOfLine=!1;if((B=="variable"||B=="builtin")&&S.lastToken=="meta")B="meta";if(E=="pass"||E=="return")S.dedent=!0;if(E=="lambda")S.lambda=!0;if(E==":"&&!S.lambda&&x4(S).type=="py"&&L.match(/^\s*(?:#|$)/,!1))_(L,S);if(E.length==1&&!/string|comment/.test(B)){var A="[({".indexOf(E);if(A!=-1)T(L,S,"])}".slice(A,A+1));if(A="])}".indexOf(E),A!=-1)if(x4(S).type==E)S.indent=S.scopes.pop().offset-(Y||L.indentUnit);else return Z}if(S.dedent&&L.eol()&&x4(S).type=="py"&&S.scopes.length>1)S.scopes.pop();return B}return{name:"python",startState:function(){return{tokenize:O,scopes:[{offset:0,type:"py",align:null}],indent:0,lastToken:null,lambda:!1,dedent:0}},token:function(L,S){var B=S.errorToken;if(B)S.errorToken=!1;var E=w(L,S);if(E&&E!="comment")S.lastToken=E=="keyword"||E=="punctuation"?L.current():E;if(E=="punctuation")E=null;if(L.eol()&&S.lambda)S.lambda=!1;return B?Z:E},indent:function(L,S,B){if(L.tokenize!=O)return L.tokenize.isString?null:0;var E=x4(L),A=E.type==S.charAt(0)||E.type=="py"&&!L.dedent&&/^(else:|elif |except |finally:)/.test(S);if(E.align!=null)return E.align-(A?1:0);else return E.offset-(A?Y||B.unit:0)},languageData:{autocomplete:ij.concat(lj).concat(["exec","print"]),indentOnInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}}}var HL=function(I){return I.split(" ")},aj=rj({}),lb=rj({extra_keywords:HL("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")});function HZ(I){var{statementIndent:Z,jsonld:J}=I,Q=I.json||J,X=I.typescript,Y=I.wordCharacters||/[\w$\xa1-\uffff]/,q=function(){function F($0){return{type:$0,style:"keyword"}}var D=F("keyword a"),x=F("keyword b"),l=F("keyword c"),Q1=F("keyword d"),A1=F("operator"),h1={type:"atom",style:"atom"};return{if:F("if"),while:D,with:D,else:x,do:x,try:x,finally:x,return:Q1,break:Q1,continue:Q1,new:F("new"),delete:l,void:l,throw:l,debugger:F("debugger"),var:F("var"),const:F("var"),let:F("var"),function:F("function"),catch:F("catch"),for:F("for"),switch:F("switch"),case:F("case"),default:F("default"),in:A1,typeof:A1,instanceof:A1,true:h1,false:h1,null:h1,undefined:h1,NaN:h1,Infinity:h1,this:F("this"),class:F("class"),super:F("atom"),yield:l,export:F("export"),import:F("import"),extends:l,await:l}}(),K=/[+\-*&%=<>!?|~^@]/,W=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function G(F){var D=!1,x,l=!1;while((x=F.next())!=null){if(!D){if(x=="/"&&!l)return;if(x=="[")l=!0;else if(l&&x=="]")l=!1}D=!D&&x=="\\"}}var U,z;function j(F,D,x){return U=F,z=x,D}function O(F,D){var x=F.next();if(x=='"'||x=="'")return D.tokenize=H(x),D.tokenize(F,D);else if(x=="."&&F.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return j("number","number");else if(x=="."&&F.match(".."))return j("spread","meta");else if(/[\[\]{}\(\),;\:\.]/.test(x))return j(x);else if(x=="="&&F.eat(">"))return j("=>","operator");else if(x=="0"&&F.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return j("number","number");else if(/\d/.test(x))return F.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),j("number","number");else if(x=="/")if(F.eat("*"))return D.tokenize=N,N(F,D);else if(F.eat("/"))return F.skipToEnd(),j("comment","comment");else if(xF(F,D,1))return G(F),F.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),j("regexp","string.special");else return F.eat("="),j("operator","operator",F.current());else if(x=="`")return D.tokenize=M,M(F,D);else if(x=="#"&&F.peek()=="!")return F.skipToEnd(),j("meta","meta");else if(x=="#"&&F.eatWhile(Y))return j("variable","property");else if(x=="<"&&F.match("!--")||x=="-"&&F.match("->")&&!/\S/.test(F.string.slice(0,F.start)))return F.skipToEnd(),j("comment","comment");else if(K.test(x)){if(x!=">"||!D.lexical||D.lexical.type!=">"){if(F.eat("=")){if(x=="!"||x=="=")F.eat("=")}else if(/[<>*+\-|&?]/.test(x)){if(F.eat(x),x==">")F.eat(x)}}if(x=="?"&&F.eat("."))return j(".");return j("operator","operator",F.current())}else if(Y.test(x)){F.eatWhile(Y);var l=F.current();if(D.lastType!="."){if(q.propertyIsEnumerable(l)){var Q1=q[l];return j(Q1.type,Q1.style,l)}if(l=="async"&&F.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return j("async","keyword",l)}return j("variable","variable",l)}}function H(F){return function(D,x){var l=!1,Q1;if(J&&D.peek()=="@"&&D.match(W))return x.tokenize=O,j("jsonld-keyword","meta");while((Q1=D.next())!=null){if(Q1==F&&!l)break;l=!l&&Q1=="\\"}if(!l)x.tokenize=O;return j("string","string")}}function N(F,D){var x=!1,l;while(l=F.next()){if(l=="/"&&x){D.tokenize=O;break}x=l=="*"}return j("comment","comment")}function M(F,D){var x=!1,l;while((l=F.next())!=null){if(!x&&(l=="`"||l=="$"&&F.eat("{"))){D.tokenize=O;break}x=!x&&l=="\\"}return j("quasi","string.special",F.current())}var _="([{}])";function T(F,D){if(D.fatArrowAt)D.fatArrowAt=null;var x=F.string.indexOf("=>",F.start);if(x<0)return;if(X){var l=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(F.string.slice(F.start,x));if(l)x=l.index}var Q1=0,A1=!1;for(var h1=x-1;h1>=0;--h1){var $0=F.string.charAt(h1),l0=_.indexOf($0);if(l0>=0&&l0<3){if(!Q1){++h1;break}if(--Q1==0){if($0=="(")A1=!0;break}}else if(l0>=3&&l0<6)++Q1;else if(Y.test($0))A1=!0;else if(/["'\/`]/.test($0))for(;;--h1){if(h1==0)return;var N7=F.string.charAt(h1-1);if(N7==$0&&F.string.charAt(h1-2)!="\\"){h1--;break}}else if(A1&&!Q1){++h1;break}}if(A1&&!Q1)D.fatArrowAt=h1}var h={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function w(F,D,x,l,Q1,A1){if(this.indented=F,this.column=D,this.type=x,this.prev=Q1,this.info=A1,l!=null)this.align=l}function L(F,D){for(var x=F.localVars;x;x=x.next)if(x.name==D)return!0;for(var l=F.context;l;l=l.prev)for(var x=l.vars;x;x=x.next)if(x.name==D)return!0}function S(F,D,x,l,Q1){var A1=F.cc;if(B.state=F,B.stream=Q1,B.marked=null,B.cc=A1,B.style=D,!F.lexical.hasOwnProperty("align"))F.lexical.align=!0;while(!0){var h1=A1.length?A1.pop():Q?z1:J1;if(h1(x,l)){while(A1.length&&A1[A1.length-1].lex)A1.pop()();if(B.marked)return B.marked;if(x=="variable"&&L(F,l))return"variableName.local";return D}}}var B={state:null,column:null,marked:null,cc:null};function E(){for(var F=arguments.length-1;F>=0;F--)B.cc.push(arguments[F])}function A(){return E.apply(null,arguments),!0}function i(F,D){for(var x=D;x;x=x.next)if(x.name==F)return!0;return!1}function $(F){var D=B.state;if(B.marked="def",D.context){if(D.lexical.info=="var"&&D.context&&D.context.block){var x=c(F,D.context);if(x!=null){D.context=x;return}}else if(!i(F,D.localVars)){D.localVars=new I1(F,D.localVars);return}}if(I.globalVars&&!i(F,D.globalVars))D.globalVars=new I1(F,D.globalVars)}function c(F,D){if(!D)return null;else if(D.block){var x=c(F,D.prev);if(!x)return null;if(x==D.prev)return D;return new e(x,D.vars,!0)}else if(i(F,D.vars))return D;else return new e(D.prev,new I1(F,D.vars),!1)}function K1(F){return F=="public"||F=="private"||F=="protected"||F=="abstract"||F=="readonly"}function e(F,D,x){this.prev=F,this.vars=D,this.block=x}function I1(F,D){this.name=F,this.next=D}var q1=new I1("this",new I1("arguments",null));function W1(){B.state.context=new e(B.state.context,B.state.localVars,!1),B.state.localVars=q1}function Z1(){B.state.context=new e(B.state.context,B.state.localVars,!0),B.state.localVars=null}W1.lex=Z1.lex=!0;function o(){B.state.localVars=B.state.context.vars,B.state.context=B.state.context.prev}o.lex=!0;function m(F,D){var x=function(){var l=B.state,Q1=l.indented;if(l.lexical.type=="stat")Q1=l.lexical.indented;else for(var A1=l.lexical;A1&&A1.type==")"&&A1.align;A1=A1.prev)Q1=A1.indented;l.lexical=new w(Q1,B.stream.column(),F,null,l.lexical,D)};return x.lex=!0,x}function g(){var F=B.state;if(F.lexical.prev){if(F.lexical.type==")")F.indented=F.lexical.indented;F.lexical=F.lexical.prev}}g.lex=!0;function p(F){function D(x){if(x==F)return A();else if(F==";"||x=="}"||x==")"||x=="]")return E();else return A(D)}return D}function J1(F,D){if(F=="var")return A(m("vardef",D),aZ,p(";"),g);if(F=="keyword a")return A(m("form"),Z0,J1,g);if(F=="keyword b")return A(m("form"),J1,g);if(F=="keyword d")return B.stream.match(/^\s*$/,!1)?A():A(m("stat"),X0,p(";"),g);if(F=="debugger")return A(p(";"));if(F=="{")return A(m("}"),Z1,Q9,g,o);if(F==";")return A();if(F=="if"){if(B.state.lexical.info=="else"&&B.state.cc[B.state.cc.length-1]==g)B.state.cc.pop()();return A(m("form"),Z0,J1,g,Eq)}if(F=="function")return A(b6);if(F=="for")return A(m("form"),Z1,hq,J1,o,g);if(F=="class"||X&&D=="interface")return B.marked="keyword",A(m("form",F=="class"?F:D),wq,g);if(F=="variable")if(X&&D=="declare")return B.marked="keyword",A(J1);else if(X&&(D=="module"||D=="enum"||D=="type")&&B.stream.match(/^\s*\w/,!1))if(B.marked="keyword",D=="enum")return A(yq);else if(D=="type")return A(Cq,p("operator"),E1,p(";"));else return A(m("form"),G4,p("{"),m("}"),Q9,g,g);else if(X&&D=="namespace")return B.marked="keyword",A(m("form"),z1,J1,g);else if(X&&D=="abstract")return B.marked="keyword",A(J1);else return A(m("stat"),HF);if(F=="switch")return A(m("form"),Z0,p("{"),m("}","switch"),Z1,Q9,g,g,o);if(F=="case")return A(z1,p(":"));if(F=="default")return A(p(":"));if(F=="catch")return A(m("form"),W1,f1,J1,g,o);if(F=="export")return A(m("stat"),hF,g);if(F=="import")return A(m("stat"),CF,g);if(F=="async")return A(J1);if(D=="@")return A(z1,J1);return E(m("stat"),z1,p(";"),g)}function f1(F){if(F=="(")return A(N5,p(")"))}function z1(F,D){return Z6(F,D,!1)}function _1(F,D){return Z6(F,D,!0)}function Z0(F){if(F!="(")return E();return A(m(")"),X0,p(")"),g)}function Z6(F,D,x){if(B.state.fatArrowAt==B.stream.start){var l=x?dZ:Z9;if(F=="(")return A(W1,m(")"),W0(N5,")"),g,p("=>"),l,o);else if(F=="variable")return E(W1,G4,p("=>"),l,o)}var Q1=x?W4:k0;if(h.hasOwnProperty(F))return A(Q1);if(F=="function")return A(b6,Q1);if(F=="class"||X&&D=="interface")return B.marked="keyword",A(m("form"),EF,g);if(F=="keyword c"||F=="async")return A(x?_1:z1);if(F=="(")return A(m(")"),X0,p(")"),g,Q1);if(F=="operator"||F=="spread")return A(x?_1:z1);if(F=="[")return A(m("]"),kF,g,Q1);if(F=="{")return F7(J9,"}",null,Q1);if(F=="quasi")return E(g4,Q1);if(F=="new")return A(Sq(x));return A()}function X0(F){if(F.match(/[;\}\)\],]/))return E();return E(z1)}function k0(F,D){if(F==",")return A(X0);return W4(F,D,!1)}function W4(F,D,x){var l=x==!1?k0:W4,Q1=x==!1?z1:_1;if(F=="=>")return A(W1,x?dZ:Z9,o);if(F=="operator"){if(/\+\+|--/.test(D)||X&&D=="!")return A(l);if(X&&D=="<"&&B.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1))return A(m(">"),W0(E1,">"),g,l);if(D=="?")return A(z1,p(":"),Q1);return A(Q1)}if(F=="quasi")return E(g4,l);if(F==";")return;if(F=="(")return F7(_1,")","call",l);if(F==".")return A(NF,l);if(F=="[")return A(m("]"),X0,p("]"),g,l);if(X&&D=="as")return B.marked="keyword",A(E1,l);if(F=="regexp")return B.state.lastType=B.marked="operator",B.stream.backUp(B.stream.pos-B.stream.start-1),A(Q1)}function g4(F,D){if(F!="quasi")return E();if(D.slice(D.length-2)!="${")return A(g4);return A(X0,Pq)}function Pq(F){if(F=="}")return B.marked="string.special",B.state.tokenize=M,A(g4)}function Z9(F){return T(B.stream,B.state),E(F=="{"?J1:z1)}function dZ(F){return T(B.stream,B.state),E(F=="{"?J1:_1)}function Sq(F){return function(D){if(D==".")return A(F?FF:OF);else if(D=="variable"&&X)return A(BF,F?W4:k0);else return E(F?_1:z1)}}function OF(F,D){if(D=="target")return B.marked="keyword",A(k0)}function FF(F,D){if(D=="target")return B.marked="keyword",A(W4)}function HF(F){if(F==":")return A(g,J1);return E(k0,p(";"),g)}function NF(F){if(F=="variable")return B.marked="property",A()}function J9(F,D){if(F=="async")return B.marked="property",A(J9);else if(F=="variable"||B.style=="keyword"){if(B.marked="property",D=="get"||D=="set")return A(RF);var x;if(X&&B.state.fatArrowAt==B.stream.start&&(x=B.stream.match(/^\s*:\s*/,!1)))B.state.fatArrowAt=B.stream.pos+x[0].length;return A(H5)}else if(F=="number"||F=="string")return B.marked=J?"property":B.style+" property",A(H5);else if(F=="jsonld-keyword")return A(H5);else if(X&&K1(D))return B.marked="keyword",A(J9);else if(F=="[")return A(z1,X8,p("]"),H5);else if(F=="spread")return A(_1,H5);else if(D=="*")return B.marked="keyword",A(J9);else if(F==":")return E(H5)}function RF(F){if(F!="variable")return E(H5);return B.marked="property",A(b6)}function H5(F){if(F==":")return A(_1);if(F=="(")return E(b6)}function W0(F,D,x){function l(Q1,A1){if(x?x.indexOf(Q1)>-1:Q1==","){var h1=B.state.lexical;if(h1.info=="call")h1.pos=(h1.pos||0)+1;return A(function($0,l0){if($0==D||l0==D)return E();return E(F)},l)}if(Q1==D||A1==D)return A();if(x&&x.indexOf(";")>-1)return E(F);return A(p(D))}return function(Q1,A1){if(Q1==D||A1==D)return A();return E(F,l)}}function F7(F,D,x){for(var l=3;l<arguments.length;l++)B.cc.push(arguments[l]);return A(m(D,x),W0(F,D),g)}function Q9(F){if(F=="}")return A();return E(J1,Q9)}function X8(F,D){if(X){if(F==":")return A(E1);if(D=="?")return A(X8)}}function MF(F,D){if(X&&(F==":"||D=="in"))return A(E1)}function _q(F){if(X&&F==":")if(B.stream.match(/^\s*\w+\s+is\b/,!1))return A(z1,AF,E1);else return A(E1)}function AF(F,D){if(D=="is")return B.marked="keyword",A()}function E1(F,D){if(D=="keyof"||D=="typeof"||D=="infer"||D=="readonly")return B.marked="keyword",A(D=="typeof"?_1:E1);if(F=="variable"||D=="void")return B.marked="type",A(J6);if(D=="|"||D=="&")return A(E1);if(F=="string"||F=="number"||F=="atom")return A(J6);if(F=="[")return A(m("]"),W0(E1,"]",","),g,J6);if(F=="{")return A(m("}"),iZ,g,J6);if(F=="(")return A(W0(rZ,")"),DF,J6);if(F=="<")return A(W0(E1,">"),E1);if(F=="quasi")return E(lZ,J6)}function DF(F){if(F=="=>")return A(E1)}function iZ(F){if(F.match(/[\}\)\]]/))return A();if(F==","||F==";")return A(iZ);return E(H7,iZ)}function H7(F,D){if(F=="variable"||B.style=="keyword")return B.marked="property",A(H7);else if(D=="?"||F=="number"||F=="string")return A(H7);else if(F==":")return A(E1);else if(F=="[")return A(p("variable"),MF,p("]"),H7);else if(F=="(")return E(q8,H7);else if(!F.match(/[;\}\)\],]/))return A()}function lZ(F,D){if(F!="quasi")return E();if(D.slice(D.length-2)!="${")return A(lZ);return A(E1,LF)}function LF(F){if(F=="}")return B.marked="string.special",B.state.tokenize=M,A(lZ)}function rZ(F,D){if(F=="variable"&&B.stream.match(/^\s*[?:]/,!1)||D=="?")return A(rZ);if(F==":")return A(E1);if(F=="spread")return A(rZ);return E(E1)}function J6(F,D){if(D=="<")return A(m(">"),W0(E1,">"),g,J6);if(D=="|"||F=="."||D=="&")return A(E1);if(F=="[")return A(E1,p("]"),J6);if(D=="extends"||D=="implements")return B.marked="keyword",A(E1);if(D=="?")return A(E1,p(":"),E1)}function BF(F,D){if(D=="<")return A(m(">"),W0(E1,">"),g,J6)}function X9(){return E(E1,PF)}function PF(F,D){if(D=="=")return A(E1)}function aZ(F,D){if(D=="enum")return B.marked="keyword",A(yq);return E(G4,X8,k6,_F)}function G4(F,D){if(X&&K1(D))return B.marked="keyword",A(G4);if(F=="variable")return $(D),A();if(F=="spread")return A(G4);if(F=="[")return F7(SF,"]");if(F=="{")return F7(Tq,"}")}function Tq(F,D){if(F=="variable"&&!B.stream.match(/^\s*:/,!1))return $(D),A(k6);if(F=="variable")B.marked="property";if(F=="spread")return A(G4);if(F=="}")return E();if(F=="[")return A(z1,p("]"),p(":"),Tq);return A(p(":"),G4,k6)}function SF(){return E(G4,k6)}function k6(F,D){if(D=="=")return A(_1)}function _F(F){if(F==",")return A(aZ)}function Eq(F,D){if(F=="keyword b"&&D=="else")return A(m("form","else"),J1,g)}function hq(F,D){if(D=="await")return A(hq);if(F=="(")return A(m(")"),TF,g)}function TF(F){if(F=="var")return A(aZ,Y8);if(F=="variable")return A(Y8);return E(Y8)}function Y8(F,D){if(F==")")return A();if(F==";")return A(Y8);if(D=="in"||D=="of")return B.marked="keyword",A(z1,Y8);return E(z1,Y8)}function b6(F,D){if(D=="*")return B.marked="keyword",A(b6);if(F=="variable")return $(D),A(b6);if(F=="(")return A(W1,m(")"),W0(N5,")"),g,_q,J1,o);if(X&&D=="<")return A(m(">"),W0(X9,">"),g,b6)}function q8(F,D){if(D=="*")return B.marked="keyword",A(q8);if(F=="variable")return $(D),A(q8);if(F=="(")return A(W1,m(")"),W0(N5,")"),g,_q,o);if(X&&D=="<")return A(m(">"),W0(X9,">"),g,q8)}function Cq(F,D){if(F=="keyword"||F=="variable")return B.marked="type",A(Cq);else if(D=="<")return A(m(">"),W0(X9,">"),g)}function N5(F,D){if(D=="@")A(z1,N5);if(F=="spread")return A(N5);if(X&&K1(D))return B.marked="keyword",A(N5);if(X&&F=="this")return A(X8,k6);return E(G4,X8,k6)}function EF(F,D){if(F=="variable")return wq(F,D);return Y9(F,D)}function wq(F,D){if(F=="variable")return $(D),A(Y9)}function Y9(F,D){if(D=="<")return A(m(">"),W0(X9,">"),g,Y9);if(D=="extends"||D=="implements"||X&&F==","){if(D=="implements")B.marked="keyword";return A(X?E1:z1,Y9)}if(F=="{")return A(m("}"),Q6,g)}function Q6(F,D){if(F=="async"||F=="variable"&&(D=="static"||D=="get"||D=="set"||X&&K1(D))&&B.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1))return B.marked="keyword",A(Q6);if(F=="variable"||B.style=="keyword")return B.marked="property",A(q9,Q6);if(F=="number"||F=="string")return A(q9,Q6);if(F=="[")return A(z1,X8,p("]"),q9,Q6);if(D=="*")return B.marked="keyword",A(Q6);if(X&&F=="(")return E(q8,Q6);if(F==";"||F==",")return A(Q6);if(F=="}")return A();if(D=="@")return A(z1,Q6)}function q9(F,D){if(D=="!"||D=="?")return A(q9);if(F==":")return A(E1,k6);if(D=="=")return A(_1);var x=B.state.lexical.prev,l=x&&x.info=="interface";return E(l?q8:b6)}function hF(F,D){if(D=="*")return B.marked="keyword",A(tZ,p(";"));if(D=="default")return B.marked="keyword",A(z1,p(";"));if(F=="{")return A(W0(kq,"}"),tZ,p(";"));return E(J1)}function kq(F,D){if(D=="as")return B.marked="keyword",A(p("variable"));if(F=="variable")return E(_1,kq)}function CF(F){if(F=="string")return A();if(F=="(")return E(z1);if(F==".")return E(k0);return E(K9,bq,tZ)}function K9(F,D){if(F=="{")return F7(K9,"}");if(F=="variable")$(D);if(D=="*")B.marked="keyword";return A(wF)}function bq(F){if(F==",")return A(K9,bq)}function wF(F,D){if(D=="as")return B.marked="keyword",A(K9)}function tZ(F,D){if(D=="from")return B.marked="keyword",A(z1)}function kF(F){if(F=="]")return A();return E(W0(_1,"]"))}function yq(){return E(m("form"),G4,p("{"),m("}"),W0(bF,"}"),g,g)}function bF(){return E(G4,k6)}function yF(F,D){return F.lastType=="operator"||F.lastType==","||K.test(D.charAt(0))||/[,.]/.test(D.charAt(0))}function xF(F,D,x){return D.tokenize==O&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(D.lastType)||D.lastType=="quasi"&&/\{\s*$/.test(F.string.slice(0,F.pos-(x||0)))}return{name:I.name,startState:function(F){var D={tokenize:O,lastType:"sof",cc:[],lexical:new w(-F,0,"block",!1),localVars:I.localVars,context:I.localVars&&new e(null,null,!1),indented:0};if(I.globalVars&&typeof I.globalVars=="object")D.globalVars=I.globalVars;return D},token:function(F,D){if(F.sol()){if(!D.lexical.hasOwnProperty("align"))D.lexical.align=!1;D.indented=F.indentation(),T(F,D)}if(D.tokenize!=N&&F.eatSpace())return null;var x=D.tokenize(F,D);if(U=="comment")return x;return D.lastType=U=="operator"&&(z=="++"||z=="--")?"incdec":U,S(D,x,U,z,F)},indent:function(F,D,x){if(F.tokenize==N||F.tokenize==M)return null;if(F.tokenize!=O)return 0;var l=D&&D.charAt(0),Q1=F.lexical,A1;if(!/^\s*else\b/.test(D))for(var h1=F.cc.length-1;h1>=0;--h1){var $0=F.cc[h1];if($0==g)Q1=Q1.prev;else if($0!=Eq&&$0!=o)break}while((Q1.type=="stat"||Q1.type=="form")&&(l=="}"||(A1=F.cc[F.cc.length-1])&&(A1==k0||A1==W4)&&!/^[,\.=+\-*:?[\(]/.test(D)))Q1=Q1.prev;if(Z&&Q1.type==")"&&Q1.prev.type=="stat")Q1=Q1.prev;var l0=Q1.type,N7=l==l0;if(l0=="vardef")return Q1.indented+(F.lastType=="operator"||F.lastType==","?Q1.info.length+1:0);else if(l0=="form"&&l=="{")return Q1.indented;else if(l0=="form")return Q1.indented+x.unit;else if(l0=="stat")return Q1.indented+(yF(F,D)?Z||x.unit:0);else if(Q1.info=="switch"&&!N7&&I.doubleIndentSwitch!=!1)return Q1.indented+(/^(?:case|default)\b/.test(D)?x.unit:2*x.unit);else if(Q1.align)return Q1.column+(N7?0:1);else return Q1.indented+(N7?0:x.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:Q?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}var ab=HZ({name:"javascript"}),tb=HZ({name:"json",json:!0}),ob=HZ({name:"json",jsonld:!0}),tj=HZ({name:"typescript",typescript:!0});var RZ="";function NL(I){let{state:Z}=I,J=Z.doc.lineAt(Z.selection.main.head),Q=Z.selection.main.head,X=Q===J.to?Math.min(J.to+1,Z.doc.length):J.to;if(Q===X)return!1;return RZ=Z.sliceDoc(Q,X),I.dispatch({changes:{from:Q,to:X},userEvent:"delete"}),!0}function RL(I){if(!RZ)return!1;let{from:Z,to:J}=I.state.selection.main;return I.dispatch({changes:{from:Z,to:J,insert:RZ},selection:{anchor:Z+RZ.length},userEvent:"input"}),!0}var ML=vI.of([{key:"Ctrl-f",run:WZ},{key:"Ctrl-b",run:KZ},{key:"Ctrl-n",run:zZ},{key:"Ctrl-p",run:UZ},{key:"Ctrl-a",run:LY},{key:"Ctrl-e",run:BY},{key:"Alt-f",run:DY},{key:"Alt-b",run:AY},{key:"Ctrl-d",run:VZ},{key:"Alt-d",run:PY},{key:"Ctrl-k",run:NL},{key:"Ctrl-y",run:RL},{key:"Ctrl-v",run:e8},{key:"Alt-v",run:E3},{key:"Alt-Shift-,",run:JZ},{key:"Alt-Shift-.",run:QZ}]),X5=B1.define(),K0={count:"",operator:null,pending:""},J7=R0.define({create:()=>({mode:"normal",...K0}),update(I,Z){for(let J of Z.effects)if(J.is(X5))I={...I,...J.value};return I}}),t5={text:"",linewise:!1};function u0(I,Z){I.dispatch({effects:X5.of(Z)})}function S6(I,Z){return Z>=0&&Z<I.length?I.sliceString(Z,Z+1):""}function _6(I){if(!I||/\s/.test(I))return"space";return/[A-Za-z0-9_]/.test(I)?"word":"punct"}function AL(I,Z){let J=Z,Q=_6(S6(I,J));if(Q!=="space")while(J<I.length&&_6(S6(I,J))===Q)J++;while(J<I.length&&_6(S6(I,J))==="space")J++;return J}function DL(I,Z){let J=Z-1;while(J>=0&&_6(S6(I,J))==="space")J--;if(J<0)return 0;let Q=_6(S6(I,J));while(J>=0&&_6(S6(I,J))===Q)J--;return J+1}function LL(I,Z){let J=Z+1;while(J<I.length&&_6(S6(I,J))==="space")J++;if(J>=I.length)return Math.max(0,I.length-1);let Q=_6(S6(I,J));while(J+1<I.length&&_6(S6(I,J+1))===Q)J++;return J}function o5(I){return I.from+/^\s*/.exec(I.text)[0].length}function w3(I,Z,J,Q){let{doc:X,selection:Y}=I.state,q=Y.main.head,K=X.lineAt(q),W=J||1;switch(Z){case"h":return{pos:Math.max(K.from,q-W)};case"l":return{pos:Math.min(Q?K.to:Math.max(K.from,K.to-1),q+W)};case"j":case"k":{let G=Y.main;for(let U=0;U<W;U++)G=I.moveVertically(G,Z==="j");return{pos:G.head,linewise:!0}}case"w":{let G=q;for(let U=0;U<W;U++)G=AL(X,G);return{pos:G}}case"b":{let G=q;for(let U=0;U<W;U++)G=DL(X,G);return{pos:G}}case"e":{let G=q;for(let U=0;U<W;U++)G=LL(X,G);return{pos:G,inclusive:!0}}case"0":return{pos:K.from};case"^":return{pos:o5(K)};case"$":return{pos:Q?K.to:Math.max(K.from,K.to-1)};case"gg":case"G":{let G=J?Math.min(Math.max(J,1),X.lines):Z==="gg"?1:X.lines;return{pos:o5(X.line(G)),linewise:!0}}default:return null}}function i0(I,Z){let{doc:J}=I.state,Q=Math.max(0,Math.min(Z,J.length)),X=J.lineAt(Q);I.dispatch({selection:{anchor:Math.min(Q,Math.max(X.from,X.to-1))},scrollIntoView:!0})}function NZ(I,Z){let J=X5.of({mode:"insert",...K0});if(Z===void 0)I.dispatch({effects:J});else I.dispatch({selection:{anchor:Z},effects:J,scrollIntoView:!0})}function BL(I){let{head:Z}=I.state.selection.main,J=I.state.doc.lineAt(Z);I.dispatch({selection:{anchor:Z>J.from?Z-1:Z},effects:X5.of({mode:"normal",...K0})})}function PL(I,Z,J){let Q=I.lineAt(Z),X=I.line(Math.min(Q.number+Math.max(J,1)-1,I.lines)),Y=I.sliceString(Q.from,X.to)+`
`;if(X.to<I.length)return{from:Q.from,to:X.to+1,text:Y};return{from:Math.max(0,Q.from-1),to:X.to,text:Y}}function wY(I,Z,J,Q){let X=Math.min(J,Q),Y=Math.max(J,Q);if(t5={text:I.state.sliceDoc(X,Y),linewise:!1},Z==="y"){i0(I,X);return}if(Z==="d"){I.dispatch({changes:{from:X,to:Y},userEvent:"delete"}),i0(I,X);return}I.dispatch({changes:{from:X,to:Y},selection:{anchor:X},effects:X5.of({mode:"insert",...K0}),userEvent:"delete",scrollIntoView:!0})}function MZ(I,Z,J){let{doc:Q}=I.state,X=I.state.selection.main.head;if(Z==="c"){let K=Q.lineAt(X),W=Q.line(Math.min(K.number+Math.max(J,1)-1,Q.lines)),G=o5(K);t5={text:Q.sliceString(G,W.to)+`
`,linewise:!0},I.dispatch({changes:{from:G,to:W.to},selection:{anchor:G},effects:X5.of({mode:"insert",...K0}),userEvent:"delete",scrollIntoView:!0});return}let Y=PL(Q,X,J);if(t5={text:Y.text,linewise:!0},Z==="y"){i0(I,Q.lineAt(X).from);return}I.dispatch({changes:{from:Y.from,to:Y.to},userEvent:"delete"});let q=Math.min(Y.from,I.state.doc.length);i0(I,o5(I.state.doc.lineAt(q)))}function oj(I,Z,J){if(!t5.text)return;let{doc:Q}=I.state,X=I.state.selection.main.head,Y=t5.text.repeat(Math.max(J,1)),q=Q.lineAt(X);if(t5.linewise){let W=Y.endsWith(`
`)?Y.slice(0,-1):Y,G=Z?q.to:q.from,U=Z?`
`+W:W+`
`;I.dispatch({changes:{from:G,insert:U},userEvent:"input.paste"});let z=Z?q.to+1:q.from;i0(I,o5(I.state.doc.lineAt(z)));return}let K=Z?Math.min(X+1,q.to):X;I.dispatch({changes:{from:K,insert:Y},userEvent:"input.paste"}),i0(I,K+Y.length-1)}function ej(I,Z){let{doc:J}=I.state,Q=J.lineAt(I.state.selection.main.head),X=/^\s*/.exec(Q.text)[0],Y=Z?Q.to:Q.from,q=Z?`
`+X:X+`
`;I.dispatch({changes:{from:Y,insert:q},selection:{anchor:Y+q.length-(Z?0:1)},effects:X5.of({mode:"insert",...K0}),userEvent:"input",scrollIntoView:!0})}function SL(I,Z){let{doc:J}=I.state,Q=J.lineAt(I.state.selection.main.head),X=Q.to,Y=0;for(let K=Math.max(Z-1,1);K>0;K--){let W=J.lineAt(X).number+1;if(W>J.lines)break;X=J.line(W).to,Y++}if(!Y)return;let q=J.sliceString(Q.from,X).replace(/\n\s*/g," ");I.dispatch({changes:{from:Q.from,to:X,insert:q},userEvent:"input"}),i0(I,Q.from+Q.text.replace(/\s+$/,"").length)}function CY(I,Z,J){let{doc:Q}=I.state,X=I.state.selection.main.head,Y=Q.lineAt(X),q=Math.min(Y.to,X+Math.max(Z,1));if(q===X)return;if(t5={text:Q.sliceString(X,q),linewise:!1},J){I.dispatch({changes:{from:X,to:q},selection:{anchor:X},effects:X5.of({mode:"insert",...K0}),userEvent:"delete"});return}I.dispatch({changes:{from:X,to:q},userEvent:"delete"}),i0(I,X)}function IO(I,Z,J,Q){let X=I.state.selection.main.head,Y=w3(I,J,Q,!0);if(!Y){u0(I,K0);return}if(Y.linewise){let{doc:K}=I.state,W=K.lineAt(X).number,G=K.lineAt(Math.max(0,Math.min(Y.pos,K.length))).number,U=K.line(Math.min(W,G));if(i0(I,U.from),MZ(I,Z,Math.abs(G-W)+1),Z!=="c")u0(I,K0);return}let q=Y.inclusive?Y.pos+1:Y.pos;if(wY(I,Z,X,q),Z!=="c")u0(I,K0)}var _L=new Set(["Enter","Backspace","Delete","Tab"]);function TL(I,Z,J){let Q=Z.key,X=J.count?parseInt(J.count,10):0;if(Z.ctrlKey){if(Q==="r")return T3(I)||!0;if(Q==="d")return e8(I)||!0;if(Q==="u")return E3(I)||!0;if(Q==="[")return u0(I,K0),!0;return!1}if(Q==="Escape")return u0(I,K0),!0;if(_L.has(Q)){if(Q==="Enter"){let G=w3(I,"j",X,!1);if(G)i0(I,o5(I.state.doc.lineAt(G.pos)))}else if(Q==="Backspace"){let G=w3(I,"h",X,!1);if(G)i0(I,G.pos)}else if(Q==="Delete")CY(I,X||1,!1);return u0(I,K0),!0}if(Q.length!==1)return!1;if(/[1-9]/.test(Q)||Q==="0"&&J.count)return u0(I,{count:J.count+Q}),!0;if(J.pending==="g"){if(Q==="g")if(J.operator)IO(I,J.operator,"gg",X);else{let G=w3(I,"gg",X,!1);i0(I,G.pos),u0(I,K0)}else u0(I,K0);return!0}if(Q==="g")return u0(I,{pending:"g"}),!0;if(J.operator){if(Q===J.operator){if(MZ(I,J.operator,X||1),J.operator!=="c")u0(I,K0)}else IO(I,J.operator,Q,X);return!0}if(Q==="d"||Q==="c"||Q==="y")return u0(I,{operator:Q}),!0;let Y=w3(I,Q,X,!1);if(Y)return i0(I,Y.pos),u0(I,K0),!0;let{doc:q}=I.state,K=I.state.selection.main.head,W=q.lineAt(K);switch(Q){case"i":NZ(I,K);break;case"a":NZ(I,Math.min(K+1,W.to));break;case"I":NZ(I,o5(W));break;case"A":NZ(I,W.to);break;case"o":ej(I,!0);break;case"O":ej(I,!1);break;case"x":CY(I,X||1,!1);break;case"s":CY(I,X||1,!0);break;case"S":MZ(I,"c",X||1);break;case"D":wY(I,"d",K,W.to);break;case"C":wY(I,"c",K,W.to);break;case"Y":MZ(I,"y",X||1);break;case"p":oj(I,!0,X||1);break;case"P":oj(I,!1,X||1);break;case"J":SL(I,X||1);break;case"u":YZ(I);break;default:break}return u0(I,K0),!0}function EL(I,Z){let J=Z.state.field(J7,!1);if(!J)return!1;if(I.metaKey||I.altKey)return!1;if(I.key==="Shift"||I.key==="Control")return!1;if(I.key==="Alt"||I.key==="Meta")return!1;if(J.mode==="insert"){if(I.key==="Escape"||I.ctrlKey&&I.key==="[")return BL(Z),I.preventDefault(),!0;return!1}if(!TL(Z,I,J))return!1;return I.preventDefault(),I.stopPropagation(),!0}function hL(I){let Z=document.createElement("div");Z.className="cm-vim-panel";let J=(Q)=>{let X=Q.field(J7,!1);if(!X)return;let Y=X.count+(X.operator??"")+X.pending;Z.textContent=(X.mode==="insert"?"-- INSERT --":"-- NORMAL --")+(Y?"  "+Y:"")};return J(I.state),{dom:Z,bottom:!0,update:(Q)=>J(Q.state)}}var CL=[J7,Y1.domEventHandlers({keydown:EL}),Y1.inputHandler.of((I)=>{let Z=I.state.field(J7,!1);return!!Z&&Z.mode!=="insert"}),Y1.editorAttributes.compute([J7],(I)=>{let Z=I.field(J7,!1);return Z&&Z.mode!=="insert"?{class:"cm-vim-normal"}:{}}),c8.of(hL)],wL=new Set(["as","assert","auto","case","const","delegate","derive","echo","else","fn","if","implement","import","let","macro","opaque","panic","pub","test","todo","type","use"]),kL=r5.define({name:"gleam",token(I){if(I.eatSpace())return null;if(I.match("//"))return I.skipToEnd(),"comment";if(I.peek()==='"'){I.next();let J=!1;while(!I.eol()){let Q=I.next();if(J)J=!1;else if(Q==="\\")J=!0;else if(Q==='"')break}return"string"}if(/[0-9]/.test(I.peek()))return I.match(/^0[box][0-9a-fA-F_]+/)||I.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(I.match(/^[A-Z][A-Za-z0-9]*/))return"typeName";if(I.match(/^[a-z_][a-z0-9_]*/))return wL.has(I.current())?"keyword":"variableName";if(I.match("|>")||I.match("<>")||I.match("->")||I.match("<-")||I.match("..")||I.match("<=")||I.match(">=")||I.match("==")||I.match("!=")||I.match("&&")||I.match("||"))return"operator";let Z=I.next();if("+-*/%=<>!&|".includes(Z))return"operator";if("()[]{}#".includes(Z))return"bracket";return null},languageData:{commentTokens:{line:"//"},closeBrackets:{brackets:["(","[","{",'"']}}}),bL=new Set(["after","and","case","catch","cond","def","defdelegate","defexception","defguard","defimpl","defmacro","defmodule","defp","defprotocol","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","rescue","try","unless","unquote","use","when","with"]),yL=new Set(["true","false","nil"]),xL=r5.define({name:"elixir",token(I){if(I.eatSpace())return null;if(I.match("#"))return I.skipToEnd(),"comment";if(I.match('"""')||I.match("'''"))return I.skipToEnd(),"string";if(I.peek()==='"'||I.peek()==="'"){let J=I.next(),Q=!1;while(!I.eol()){let X=I.next();if(Q)Q=!1;else if(X==="\\")Q=!0;else if(X===J)break}return"string"}if(I.match(/^~[a-zA-Z]/)){let J=I.next(),Q={"(":")","[":"]","{":"}","<":">"}[J]??J;while(!I.eol()&&I.next()!==Q);return I.match(/^[a-z]*/),"string"}if(I.match(/^[@^][a-z_][A-Za-z0-9_]*/))return"variableName";if(I.match(/^:"[^"]*"/)||I.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/))return"atom";if(/[0-9]/.test(I.peek()))return I.match(/^0[box][0-9a-fA-F_]+/)||I.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(I.match(/^[A-Z][A-Za-z0-9_]*/))return"typeName";if(I.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)){let J=I.current();if(bL.has(J))return"keyword";if(yL.has(J))return"atom";return"variableName"}if(I.match("|>")||I.match("<>")||I.match("->")||I.match("<-")||I.match("=>")||I.match("..")||I.match("<=")||I.match(">=")||I.match("===")||I.match("==")||I.match("!=")||I.match("&&")||I.match("||"))return"operator";let Z=I.next();if("+-*/%=<>!&|".includes(Z))return"operator";if("()[]{}".includes(Z))return"bracket";return null},languageData:{commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{",'"']}}}),nL=o8.define([{tag:v.keyword,color:"#bb9af7"},{tag:v.string,color:"#9ece6a"},{tag:v.comment,color:"#565f89",fontStyle:"italic"},{tag:v.number,color:"#ff9e64"},{tag:v.typeName,color:"#2ac3de"},{tag:v.variableName,color:"#c0caf5"},{tag:v.operator,color:"#89ddff"},{tag:v.bracket,color:"#a9b1d6"}]),gL=Y1.theme({"&":{backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"var(--editor-font-size, 14px)",height:"100%"},".cm-content":{caretColor:"var(--accent)",fontFamily:"inherit",padding:"12px 0"},".cm-gutters":{backgroundColor:"var(--bg-secondary)",color:"var(--text-secondary)",border:"none",opacity:"0.7"},".cm-activeLine":{backgroundColor:"rgba(65, 72, 104, 0.3)"},".cm-activeLineGutter":{backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--bg-hover)"},".cm-cursor":{borderLeftColor:"var(--accent)"}},{dark:!0});function ZO(I){switch(I){case"vim":return M6.highest(CL);case"emacs":return M6.highest(ML);default:return[]}}function JO(I){switch(I){case"python":return r5.define(aj);case"typescript":return r5.define(tj);case"elixir":return xL;default:return kL}}class QO extends HTMLElement{static observedAttributes=["keymap","language"];#I=null;#q="";#Q=[];#Z=new u5;#J=new u5;set doc(I){if(this.#q=I??"",this.#I&&this.#I.state.doc.toString()!==this.#q)this.#I.dispatch({changes:{from:0,to:this.#I.state.doc.length,insert:this.#q}})}get doc(){return this.#I?this.#I.state.doc.toString():this.#q}set diagnostics(I){if(this.#Q=Array.isArray(I)?I:[],this.#I)this.#Y()}get#X(){return this.getAttribute("keymap")??"default"}get#K(){return this.getAttribute("language")??"gleam"}attributeChangedCallback(I,Z,J){if(!this.#I)return;switch(I){case"keymap":this.#I.dispatch({effects:this.#Z.reconfigure(ZO(this.#X))});break;case"language":this.#I.dispatch({effects:this.#J.reconfigure(JO(this.#K))});break}}connectedCallback(){if(this.#I)return;let I=Y1.updateListener.of((Z)=>{if(Z.docChanged)this.dispatchEvent(new CustomEvent("editor-change",{detail:{value:Z.state.doc.toString()},bubbles:!0}))});if(this.#I=new Y1({state:L1.create({doc:this.#q,extensions:[this.#Z.of(ZO(this.#X)),MV(),zj(),VV(),tV(),OV(),a8.of("  "),this.#J.of(JO(this.#K)),dV(nL),gL,vI.of([fj,...gj,...Oj]),I]}),parent:this}),this.#Q.length>0)this.#Y()}disconnectedCallback(){this.#I?.destroy(),this.#I=null}#Y(){let I=this.#I.state.doc,Z=this.#Q.flatMap((J)=>{if(!J||typeof J.line!=="number")return[];let Q=I.line(Math.min(Math.max(J.line,1),I.lines)),X=Math.min(Q.from+Math.max((J.column??1)-1,0),Q.to),q=Q.text.slice(X-Q.from).match(/^\S+/),K=Math.min(X+(q?q[0].length:1),I.length);return[{from:X,to:Math.max(K,Math.min(X+1,I.length)),severity:"error",message:String(J.message??"")}]});this.#I.dispatch(mj(this.#I.state,Z))}}function kY(){if(!customElements.get("gleam-editor"))customElements.define("gleam-editor",QO)}class k3 extends P{constructor(I,Z,J){super();this.line=I,this.column=Z,this.message=J}}function XO(I){return e1("gleam-editor",I,f)}function YO(I){return u7("doc",Y0(I))}function qO(I){return i1("keymap",I)}function KO(I){return i1("language",I)}function WO(I){return u7("diagnostics",U6(I,(Z)=>{return C5(V([["line",v4(Z.line)],["column",v4(Z.column)],["message",Y0(Z.message)]]))}))}function GO(I){return o7("editor-change",H8(V(["detail","value"]),C1,(Z)=>{return k1(I(Z))}))}class Q7 extends P{}var Y5=new Q7;class T6 extends P{}var b3=new T6;class AZ extends P{}var DZ=new AZ;class e4 extends P{constructor(I,Z,J){super();this.category=I,this.subcategory=Z,this.title=J}}class X7 extends P{}var fL=new X7;class LZ extends P{}var bY=new LZ;class Y7 extends P{}var zO=new Y7;class BZ extends P{constructor(I){super();this[0]=I}}class yY extends P{constructor(I,Z,J,Q){super();this.label=I,this.expected=Z,this.actual=J,this.passed=Q}}class xY extends P{constructor(I,Z,J,Q,X){super();this.phase=I,this.file=Z,this.line=J,this.column=Q,this.message=X}}class q5 extends P{constructor(I){super();this[0]=I}}class K5 extends P{constructor(I){super();this[0]=I}}class nY extends P{}var gY=new nY;class PZ extends P{}var q7=new PZ;class W5 extends P{constructor(I){super();this.id=I}}class G5 extends P{constructor(I,Z){super();this.outcome=I,this.stdout=Z}}class U5 extends P{}var SZ=new U5;class fY extends P{}var y3=new fY;class F1 extends P{constructor(I,Z,J,Q,X,Y,q,K,W,G,U,z,j,O,H,N,M,_,T){super();this.route=I,this.selected_category=Z,this.selected_subcategory=J,this.selected=Q,this.problem_index=X,this.iteration_count=Y,this.current_iteration=q,this.draft=K,this.revealed_solution=W,this.runtimes=G,this.run=U,this.drafts=z,this.attempts=j,this.search=O,this.next_run_id=H,this.editor_keymap=N,this.choice=M,this.graded=_,this.exam_answers=T}}class x3 extends P{constructor(I){super();this[0]=I}}class n3 extends P{constructor(I){super();this[0]=I}}class g3 extends P{constructor(I){super();this[0]=I}}class E6 extends P{constructor(I){super();this[0]=I}}class _Z extends P{}var VO=new _Z;class TZ extends P{}var jO=new TZ;class f3 extends P{constructor(I){super();this[0]=I}}class EZ extends P{}var OO=new EZ;class u3 extends P{}var FO=new u3;class $3 extends P{constructor(I){super();this[0]=I}}class K7 extends P{constructor(I){super();this[0]=I}}class hZ extends P{}var uY=new hZ;class m3 extends P{constructor(I){super();this[0]=I}}class v3 extends P{constructor(I){super();this[0]=I}}class W7 extends P{constructor(I){super();this[0]=I}}class CZ extends P{}var HO=new CZ;class c3 extends P{}var NO=new c3;class I8 extends P{constructor(I){super();this.language=I}}class z5 extends P{constructor(I,Z){super();this.language=I,this.message=Z}}class G7 extends P{constructor(I,Z,J){super();this.id=I,this.outcome=Z,this.stdout=J}}class p3 extends P{constructor(I){super();this.id=I}}class s3 extends P{constructor(I){super();this[0]=I}}class wZ extends P{}var RO=new wZ;class kZ extends P{}var MO=new kZ;class bZ extends P{constructor(I){super();this[0]=I}}class $Y extends P{}var AO=new $Y;class DO extends P{constructor(I,Z,J){super();this.section=I,this.correct=Z,this.total=J}}var yZ=70;function V5(){return new F1(Y5,U1,U1,f,0,3,1,"",U1,f,q7,f,f,"",1,"default",U1,!1,f)}function U7(I,Z){return ZK(I,(J)=>{if(S1(J[0],Z))return new R(J[1]);else return new V1(void 0)})}function d3(I,Z){let J=U7(I.runtimes,Z);if(J instanceof R)return J[0];else return fL}function n4(I,Z,J){return C([Z,J],J0(I,(Q)=>{return!S1(Q[0],Z)}))}function K4(I){let Z=I.selected,J=H9(Z,I.problem_index);return F9(J)}function e5(I,Z){if(Z===0)return Z;else return y6(I*100,Z)}function LO(I,Z){let Q=N1(Z,(Y)=>{let q=J0(I,(K)=>{return K[0].subcategory===Y});return new DO(Y,z8(q,(K)=>{return K[1]}),G0(q))}),X=J0(Q,(Y)=>{return Y.total>0});return M9(X,(Y,q)=>{let K=CK(e5(Y.correct,Y.total),e5(q.correct,q.total));if(K instanceof L0)return VK(Y.section,q.section);else return K})}class xZ extends P{}var nZ=new xZ;class gZ extends P{}var fZ=new gZ;class uZ extends P{}var BO=new uZ;class $Z extends P{}var PO=new $Z;class SO extends P{}var _O=new SO;class k extends P{constructor(I,Z,J){super();this.signature=I,this.starter=Z,this.harness=J}}class J8 extends P{constructor(I,Z,J){super();this.label=I,this.note=Z,this.code=J}}class mY extends P{constructor(I,Z,J,Q){super();this.choices=I,this.correct=Z,this.explanation=J,this.page=Q}}class h6 extends P{constructor(I,Z,J,Q,X,Y,q){super();this.title=I,this.prompt=Z,this.approach=J,this.solutions=Q,this.language=X,this.check=Y,this.quiz=q}}class j0 extends P{constructor(I,Z){super();this.name=I,this.problems=Z}}class C6 extends P{constructor(I,Z){super();this.name=I,this.subcategories=Z}}function TO(I){if(I instanceof xZ)return"Python";else if(I instanceof gZ)return"Gleam";else if(I instanceof uZ)return"TypeScript";else if(I instanceof $Z)return"Elixir";else return"Concept"}function i3(I){if(I instanceof xZ)return"python";else if(I instanceof gZ)return"gleam";else if(I instanceof uZ)return"typescript";else if(I instanceof $Z)return"elixir";else return"concept"}function z7(I){if(I==="Contains Duplicate")return"A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n).";else if(I==="Valid Anagram")return"A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative.";else if(I==="Two Sum")return"A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n²).";else if(I==="Group Anagrams")return"A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups.";else if(I==="Top K Frequent Elements")return"Count, then select. Build a value-to-frequency map first; then pick the k largest counts — sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n.";else if(I==="Encode and Decode Strings")return"A framing problem rather than a string problem. Any encoding is legal so long as decode undoes it, so the only real question is how the decoder knows where each string ends. Length-prefixing answers it outright — read a number, take that many characters — and needs no assumption about what the strings contain. A separator works too, but only with escaping. Either way the encoding has to tell an empty list apart from a list holding one empty string.";else if(I==="Product of Array Except Self")return"A prefix/suffix problem. The answer at position i is (product of everything before i) × (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise — no division needed.";else if(I==="Valid Sudoku")return"Three constraints, checked together. A digit is illegal if it repeats within its row, its column, or its 3×3 box, so either carry one set of (value, unit) signatures and test all three as you walk, or gather the 27 units and check each for a repeat. Only filled cells matter: the board does not have to be solvable, only consistent.";else if(I==="Longest Consecutive Sequence")return"A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk.";else if(I==="Valid Palindrome")return"Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse — same complexity, pick whichever reads better in your language.";else if(I==="Two Sum II - Input Array Is Sorted")return"A two-pointer convergence problem — the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory.";else if(I==="3Sum")return"Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip.";else if(I==="Container With Most Water")return"Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help — always move the shorter one inwards and track the best area seen.";else if(I==="Trapping Rain Water")return"Ask what sits above one position, not how the pools are shaped. The water at index i is min(tallest to the left, tallest to the right) minus height[i]. Computing both running maxima and summing is the direct reading; the two-pointer version gets there in one pass by always advancing the shorter side, where the near maximum alone already fixes the water level.";else if(I==="Best Time to Buy and Sell Stock")return"A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables.";else if(I==="Longest Substring Without Repeating Characters")return"A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen.";else if(I==="Longest Repeating Character Replacement")return"A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window.";else if(I==="Permutation in String")return"A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies — slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps.";else if(I==="Minimum Window Substring")return'A sliding window that grows until it is valid and shrinks while it stays valid. The whole trick is making "valid" a single integer test rather than a map comparison: count how many needed characters are still missing, decrement only when a character that was genuinely still needed arrives, and the window is valid exactly when that count hits zero. Then pull the left edge in as far as it will go before growing again.';else if(I==="Sliding Window Maximum")return"The maximum is not something you can maintain by adding and removing — dropping the current maximum leaves you with no idea what the next one is. Two ways out: keep a queue of the indices that could still win, values decreasing, so the front is always the answer; or pre-compute running maxima within blocks of k, since every window straddles at most one block boundary. Both are O(n).";else if(I==="Valid Parentheses")return"A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack.";else if(I==="Min Stack")return"Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1).";else if(I==="Daily Temperatures")return"A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry — the popped days just found their warmer day — then pushes itself.";else if(I==="Evaluate Reverse Polish Notation")return"Postfix notation exists so that a stack can evaluate it without any parsing. Push numbers; on an operator, pop two, apply, push the result. Two things to get right: the value popped first is the *right* operand, and the division truncates towards zero rather than flooring, which matters as soon as a negative appears.";else if(I==="Generate Parentheses")return'Build only what is valid rather than filtering afterwards. Backtracking with two counters gets there — an opener is legal while any are left, a closer only while more are outstanding than openers — and so does composition: every balanced string is "(" A ")" B for one split, so enumerating splits enumerates the answers. The count is the nth Catalan number.';else if(I==="Car Fleet")return"Order by position, then think about time. A car catches the one ahead exactly when it would arrive no later, and a fleet moves at the speed of its slowest member, so walking from the front and carrying the arrival time of the fleet ahead is enough: anything slower to arrive starts a new fleet. Compare times cross-multiplied to stay in integers.";else if(I==="Largest Rectangle in Histogram")return"Every rectangle is some bar taken as far left and right as it will go, so the question is where each bar stops fitting. A monotonic stack answers both boundaries in one pass: a shorter bar arriving closes off every taller entry — that is its right edge — and the position the closed entries reached back to becomes the new bar's left edge.";else if(I==="Binary Search")return"The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step.";else if(I==="Search a 2D Matrix")return"The rows are sorted and do not overlap, so the whole matrix is one sorted sequence wearing a grid costume — halve to the row a value could be in, then halve within it, or index the grid as if it were flat. The staircase walk from the top-right is the other answer: every step rules out a whole row or a whole column, and it does not need the non-overlap.";else if(I==="Koko Eating Bananas")return'Binary search on the answer rather than on the input. The speeds run from 1 to the largest pile, and "can she finish in h hours at this speed?" is monotone — true for a speed means true for every faster one — so the smallest speed that works is a boundary you can halve towards. The check itself is a sum of ceil(pile / speed), because piles are never combined within an hour.';else if(I==="Time Based Key-Value Store")return`A map from key to that key's history, and a binary search inside it. Timestamps only ever increase, so appending keeps each history sorted without any sorting; the lookup is then "the newest entry at or before this time", which is the standard predecessor search — keep the candidate and keep looking on the newer side for a better one.`;else if(I==="Median of Two Sorted Arrays")return"The O(log) answer does not look for the median at all: it looks for a cut through both arrays with exactly half the elements to its left, which is correct when both left-hand values are no bigger than both right-hand values. That condition is monotone in where you cut the shorter array, so halve on the cut position. Merging until the middle is the O(m + n) version, and worth writing first.";else if(I==="Find Minimum in Rotated Sorted Array")return"Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point — and the minimum — hides in the unsorted half.";else if(I==="Search in Rotated Sorted Array")return"Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it — recurse into that half or the other.";else if(I==="Insert Interval")return"The input is already sorted, and that is the whole gift: the list falls into everything that finishes before the new interval starts, everything that touches it, and everything after. Only the middle run collapses — into a single interval spanning the lot — so one pass does it with no sorting at all.";else if(I==="Merge Intervals")return"Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that one. A single pass then either extends the interval in hand or begins a new one. The other framing is to keep only the edges, +1 and −1, and cut wherever the running count returns to zero.";else if(I==="Non-overlapping Intervals")return"Removing the fewest is keeping the most, which is the classic activity-selection greedy: sort by *end* time and keep every interval that starts after the last one kept. The exchange argument is that finishing earliest leaves the most room for everything after, so it can never be worse. Sorting by start is the natural wrong answer — it keeps whichever came first, which may be a very long one.";else if(I==="Meeting Rooms")return"Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier began earlier still, so it would have clashed with that one first. The check is then adjacent pairs. Worth having the overlap condition itself by heart — two intervals overlap when each starts before the other ends.";else if(I==="Meeting Rooms II")return"Rooms needed is the most meetings ever running at once, so the meetings themselves stop mattering and only their edges do: +1 at a start, −1 at an end, and the answer is the high-water mark of the running count. Note the tie-break — a room freed exactly as another meeting starts can be reused, so closes come before opens, the opposite of what merging wants.";else if(I==="Minimum Interval to Include Each Query")return"Both good answers give up on answering queries in the order they arrive. Sort them by time, let intervals in as they start, keep the live ones in a heap by length and discard whatever has already ended — or go the other way and take intervals shortest first, so the first one to cover a query is already its final answer and that query never needs looking at again.";else if(I==="Pattern matching on lists")return"In Gleam a list is either [] or [head, ..tail] — every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail.";else if(I==="Tail recursion with accumulators")return"The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop — no stack growth.";else if(I==="fold is the loop")return"Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values.";else if(I==="Frequency maps with dict.upsert")return"dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside.";else if(I==="Result chains with use")return"use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results.";else if(I==="Option ergonomics")return"Chains of option.map / option.unwrap / option.from_result express “use it if present, fall back if not” without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value.";else if(I==="String prefix patterns and graphemes")return'Gleam can pattern-match string prefixes directly: "# " <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions.';else if(I==="Pipelines")return"The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline.";else if(I==="Records: labelled args and update syntax")return"Records are immutable: construction uses labelled arguments, and “modifying” one is Record(..old, field: new) — a copy with some fields swapped. Updates return the new record; nothing changes in place.";else if(I==="gleam/set for membership and dedupe")return"Membership questions want a set, not a list — contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new.";else if(I==="Counter for frequency maps")return"collections.Counter is the counting idiom: feed it any iterable and it's a dict of value → count, with missing keys reading as 0 and most_common(k) giving the top k — no manual dict bookkeeping.";else if(I==="defaultdict for grouping")return"collections.defaultdict removes the “is the key there yet?” dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership.";else if(I==="deque for O(1) popleft")return"Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm — breadth-first search above all — wants a deque: append to the right, popleft from the left.";else if(I==="heapq for min/max heaps")return"heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap — negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection.";else if(I==="Enumerate, zip, and unpacking")return"enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly — between them, almost no loop needs range(len(...)).";else if(I==="Slicing and reversal")return"Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate — every slice is a new sequence.";else if(I==="Sorting with a key")return"sort/sorted take a key function that maps each element to what it should be compared by — len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list.";else if(I==="Building strings efficiently")return"Strings are immutable, so building one with += in a loop re-copies everything each time — O(n²). Collect the pieces in a list and ''.join(parts) once at the end for O(n).";else return""}class b extends P{constructor(I,Z){super();this.solutions=I,this.check=Z}}function uL(){return new b(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`import gleam/set

pub fn contains_duplicate(nums: List(Int)) -> Bool {
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
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`import gleam/int
import gleam/list

pub fn contains_duplicate(nums: List(Int)) -> Bool {
  nums
  |> list.sort(int.compare)
  |> has_adjacent_pair
}

fn has_adjacent_pair(sorted: List(Int)) -> Bool {
  case sorted {
    [a, b, ..] if a == b -> True
    [_, ..rest] -> has_adjacent_pair(rest)
    [] -> False
  }
}`]]),new k("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "contains_duplicate([1, 2, 3, 1])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([1, 2, 3, 1])),
    ),
    #(
      "contains_duplicate([1, 2, 3, 4])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([1, 2, 3, 4])),
    ),
    #(
      "contains_duplicate([])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([])),
    ),
    #(
      "contains_duplicate([7, 7])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([7, 7])),
    ),
  ]
}`))}function $L(){return new b(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  counts(s) == counts(t)
}

fn counts(word: String) -> dict.Dict(String, Int) {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`import gleam/list
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  sorted(s) == sorted(t)
}

/// Two words are anagrams exactly when their sorted letters match — no counts,
/// no dictionary, at the cost of O(n log n) instead of O(n).
fn sorted(word: String) -> List(String) {
  word
  |> string.to_graphemes
  |> list.sort(string.compare)
}`]]),new k("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_anagram(\\"anagram\\", \\"nagaram\\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("anagram", "nagaram")),
    ),
    #(
      "is_anagram(\\"rat\\", \\"car\\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("rat", "car")),
    ),
    #(
      "is_anagram(\\"\\", \\"\\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("", "")),
    ),
    #(
      "is_anagram(\\"a\\", \\"ab\\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("a", "ab")),
    ),
  ]
}`))}function mL(){return new b(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`import gleam/dict

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`import gleam/list

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  outer(nums, target, 0)
}

fn outer(nums: List(Int), target: Int, i: Int) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case inner(rest, target - n, i + 1) {
        Ok(j) -> Ok(#(i, j))
        Error(Nil) -> outer(rest, target, i + 1)
      }
  }
}

fn inner(nums: List(Int), needed: Int, j: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, offset) {
    case found, n == needed {
      Error(Nil), True -> Ok(j + offset)
      _, _ -> found
    }
  })
}`],["Solution 3 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  // Sorting loses the original positions, so carry them along.
  let sorted =
    nums
    |> list.index_map(fn(n, i) { #(n, i) })
    |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  converge(sorted, list.reverse(sorted), list.length(sorted), target)
}

/// Walk one pointer in from each end: too small means the low end must rise,
/// too large means the high end must fall.
fn converge(
  from_left: List(#(Int, Int)),
  from_right: List(#(Int, Int)),
  remaining: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case remaining < 2 {
    True -> Error(Nil)
    False ->
      case from_left, from_right {
        [#(low, i), ..left_rest], [#(high, j), ..right_rest] ->
          case int.compare(low + high, target) {
            order.Eq -> Ok(#(int.min(i, j), int.max(i, j)))
            order.Lt -> converge(left_rest, from_right, remaining - 1, target)
            order.Gt -> converge(from_left, right_rest, remaining - 1, target)
          }
        _, _ -> Error(Nil)
      }
  }
}`]]),new k("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "two_sum([2, 7, 11, 15], 9)",
      string.inspect(Ok(#(0, 1))),
      string.inspect(solution.two_sum([2, 7, 11, 15], 9)),
    ),
    #(
      "two_sum([3, 2, 4], 6)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum([3, 2, 4], 6)),
    ),
    #(
      "two_sum([3, 3], 6)",
      string.inspect(Ok(#(0, 1))),
      string.inspect(solution.two_sum([3, 3], 6)),
    ),
    #(
      "two_sum([1, 2], 7)",
      string.inspect(Error(Nil)),
      string.inspect(solution.two_sum([1, 2], 7)),
    ),
  ]
}`))}function vL(){return new b(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
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
}`],["Solution 2 · Count key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

A letter tally is anagram-invariant too, and costs O(len) to build rather than O(len log len).`,`import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    dict.upsert(acc, signature(s), fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}

/// An "a1c2t1" tally rather than a sorted copy of the word. Same grouping, but
/// the cost is proportional to the alphabet used instead of the word length.
fn signature(word: String) -> String {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
  |> list.map(fn(entry) { entry.0 <> int.to_string(entry.1) })
  |> string.concat
}`]]),new k("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Groups may come back in any order, and so may their members.
fn normalise(groups: List(List(String))) -> List(String) {
  groups
  |> list.map(fn(group) {
    group |> list.sort(string.compare) |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "group_anagrams([\\"eat\\", \\"tea\\", \\"tan\\", \\"ate\\", \\"nat\\", \\"bat\\"])",
      string.inspect(["ate,eat,tea", "bat", "nat,tan"]),
      string.inspect(
        normalise(solution.group_anagrams([
          "eat", "tea", "tan", "ate", "nat", "bat",
        ])),
      ),
    ),
    #(
      "group_anagrams([])",
      string.inspect([]),
      string.inspect(normalise(solution.group_anagrams([]))),
    ),
    #(
      "group_anagrams([\\"a\\"])",
      string.inspect(["a"]),
      string.inspect(normalise(solution.group_anagrams(["a"]))),
    ),
  ]
}`))}function cL(){return new b(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`import gleam/dict
import gleam/int
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  nums
  |> list.fold(dict.new(), fn(acc, n) {
    dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { int.compare(b.1, a.1) })
  |> list.take(k)
  |> list.map(fn(pair) { pair.0 })
}`],["Solution 2 · Bucket sort","A count can never exceed the input length, so one bucket per frequency covers every possibility. Reading the buckets downwards gives the answer in O(n) and replaces the comparison sort entirely.",`import gleam/dict
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  let counts =
    list.fold(nums, dict.new(), fn(acc, n) {
      dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
    })

  // A count can never exceed the input length, so one bucket per possible
  // frequency covers everything. Reading the buckets from the top down gives
  // the answer without ever comparison-sorting the counts.
  let buckets =
    dict.fold(counts, dict.new(), fn(acc, n, count) {
      dict.upsert(acc, count, fn(members) {
        case members {
          option.Some(existing) -> [n, ..existing]
          option.None -> [n]
        }
      })
    })

  countdown(list.length(nums), [])
  |> list.flat_map(fn(frequency) {
    case dict.get(buckets, frequency) {
      Ok(members) -> list.reverse(members)
      Error(Nil) -> []
    }
  })
  |> list.take(k)
}

/// [highest, highest - 1, ..., 1] — the bucket indices, read most frequent
/// first.
fn countdown(highest: Int, acc: List(Int)) -> List(Int) {
  case highest < 1 {
    True -> list.reverse(acc)
    False -> countdown(highest - 1, [highest, ..acc])
  }
}`]]),new k("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "top_k_frequent([1, 1, 1, 2, 2, 3], 2)",
      string.inspect([1, 2]),
      string.inspect(solution.top_k_frequent([1, 1, 1, 2, 2, 3], 2)),
    ),
    #(
      "top_k_frequent([1], 1)",
      string.inspect([1]),
      string.inspect(solution.top_k_frequent([1], 1)),
    ),
    #(
      "top_k_frequent([5, 5, 4, 4, 4, 3], 1)",
      string.inspect([4]),
      string.inspect(solution.top_k_frequent([5, 5, 4, 4, 4, 3], 1)),
    ),
  ]
}`))}function pL(){return new b(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`import gleam/list

pub fn product_except_self(nums: List(Int)) -> List(Int) {
  let n = list.length(nums)
  let prefixes = [
    1,
    ..list.take(list.scan(nums, 1, fn(acc, x) { acc * x }), n - 1)
  ]
  let suffixes =
    list.reverse(nums)
    |> list.scan(1, fn(acc, x) { acc * x })
    |> list.take(n - 1)
    |> fn(scanned) { [1, ..scanned] }
    |> list.reverse
  list.map2(prefixes, suffixes, fn(prefix, suffix) { prefix * suffix })
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`import gleam/list

pub fn product_except_self(nums: List(Int)) -> List(Int) {
  list.index_map(nums, fn(_, i) {
    list.index_fold(nums, 1, fn(product, n, j) {
      case i == j {
        True -> product
        False -> product * n
      }
    })
  })
}`]]),new k("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "product_except_self([1, 2, 3, 4])",
      string.inspect([24, 12, 8, 6]),
      string.inspect(solution.product_except_self([1, 2, 3, 4])),
    ),
    #(
      "product_except_self([-1, 1, 0, -3, 3])",
      string.inspect([0, 0, 9, 0, 0]),
      string.inspect(solution.product_except_self([-1, 1, 0, -3, 3])),
    ),
    #(
      "product_except_self([2, 3])",
      string.inspect([3, 2]),
      string.inspect(solution.product_except_self([2, 3])),
    ),
  ]
}`))}function sL(){return new b(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`import gleam/int
import gleam/list
import gleam/set

pub fn longest_consecutive(nums: List(Int)) -> Int {
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
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`import gleam/int
import gleam/list

pub fn longest_consecutive(nums: List(Int)) -> Int {
  case list.sort(nums, int.compare) {
    [] -> 0
    [first, ..rest] -> scan(rest, first, 1, 1)
  }
}

fn scan(nums: List(Int), previous: Int, run: Int, best: Int) -> Int {
  case nums {
    [] -> best
    [n, ..rest] ->
      case n - previous {
        // Duplicates neither extend nor break a run.
        0 -> scan(rest, previous, run, best)
        1 -> scan(rest, n, run + 1, int.max(best, run + 1))
        _ -> scan(rest, n, 1, best)
      }
  }
}`]]),new k("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "longest_consecutive([100, 4, 200, 1, 3, 2])",
      string.inspect(4),
      string.inspect(solution.longest_consecutive([100, 4, 200, 1, 3, 2])),
    ),
    #(
      "longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])",
      string.inspect(9),
      string.inspect(
        solution.longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]),
      ),
    ),
    #(
      "longest_consecutive([])",
      string.inspect(0),
      string.inspect(solution.longest_consecutive([])),
    ),
  ]
}`))}function dL(){return new b(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`import gleam/list
import gleam/string

pub fn is_palindrome(s: String) -> Bool {
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
}`],["Solution 2 · Two pointers","Compare inwards from both ends, skipping anything that is not alphanumeric as you go. No second string is built.",`import gleam/list
import gleam/string

pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  converge(cleaned, list.reverse(cleaned), list.length(cleaned) / 2)
}

/// Walks the sequence and its reverse together — the closest a linked list
/// gets to converging index pointers.
fn converge(
  from_front: List(String),
  from_back: List(String),
  remaining: Int,
) -> Bool {
  case remaining <= 0 {
    True -> True
    False ->
      case from_front, from_back {
        [a, ..front], [b, ..back] ->
          a == b && converge(front, back, remaining - 1)
        _, _ -> True
      }
  }
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
}`]]),new k("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_palindrome(\\"A man, a plan, a canal: Panama\\")",
      string.inspect(True),
      string.inspect(solution.is_palindrome("A man, a plan, a canal: Panama")),
    ),
    #(
      "is_palindrome(\\"race a car\\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("race a car")),
    ),
    #(
      "is_palindrome(\\" \\")",
      string.inspect(True),
      string.inspect(solution.is_palindrome(" ")),
    ),
    #(
      "is_palindrome(\\"0P\\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("0P")),
    ),
  ]
}`))}function iL(){return new b(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum_sorted(
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
}`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  walk(numbers, 1, target)
}

fn walk(numbers: List(Int), index: Int, target: Int) -> Result(#(Int, Int), Nil) {
  case numbers {
    [] -> Error(Nil)
    [n, ..rest] ->
      case binary_search(rest, target - n, index + 1) {
        Ok(partner) -> Ok(#(index, partner))
        Error(Nil) -> walk(rest, index + 1, target)
      }
  }
}

/// Positions are 1-based, and the tail starts at \`offset\`.
fn binary_search(
  numbers: List(Int),
  wanted: Int,
  offset: Int,
) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(numbers) / 2
      let #(left, right) = list.split(numbers, half)
      case right {
        [mid, ..after] ->
          case int.compare(wanted, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> binary_search(left, wanted, offset)
            order.Gt -> binary_search(after, wanted, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`]]),new k(`pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil)`,`pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "two_sum_sorted([2, 7, 11, 15], 9)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([2, 7, 11, 15], 9)),
    ),
    #(
      "two_sum_sorted([2, 3, 4], 6)",
      string.inspect(Ok(#(1, 3))),
      string.inspect(solution.two_sum_sorted([2, 3, 4], 6)),
    ),
    #(
      "two_sum_sorted([-1, 0], -1)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([-1, 0], -1)),
    ),
    #(
      "two_sum_sorted([1, 2, 3], 100)",
      string.inspect(Error(Nil)),
      string.inspect(solution.two_sum_sorted([1, 2, 3], 100)),
    ),
  ]
}`))}function lL(){return new b(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`import gleam/int
import gleam/list
import gleam/order
import gleam/set

pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
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
      outer(
        rest,
        inner(first, rest, list.reverse(rest), list.length(rest), acc),
      )
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`import gleam/int
import gleam/list

pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  list.sort(nums, int.compare)
  |> triples([])
  |> list.reverse
  |> list.unique
}

fn triples(
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [a, ..rest] -> triples(rest, with_first(a, rest, acc))
  }
}

fn with_first(
  a: Int,
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [b, ..rest] ->
      with_first(
        a,
        rest,
        list.fold(rest, acc, fn(found, c) {
          case a + b + c == 0 {
            True -> [#(a, b, c), ..found]
            False -> found
          }
        }),
      )
  }
}`]]),new k("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Triples come back in set order, which is not meaningful.
fn normalise(triples: List(#(Int, Int, Int))) -> List(String) {
  triples |> list.map(string.inspect) |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "three_sum([-1, 0, 1, 2, -1, -4])",
      string.inspect(["#(-1, -1, 2)", "#(-1, 0, 1)"]),
      string.inspect(normalise(solution.three_sum([-1, 0, 1, 2, -1, -4]))),
    ),
    #(
      "three_sum([0, 1, 1])",
      string.inspect([]),
      string.inspect(normalise(solution.three_sum([0, 1, 1]))),
    ),
    #(
      "three_sum([0, 0, 0])",
      string.inspect(["#(0, 0, 0)"]),
      string.inspect(normalise(solution.three_sum([0, 0, 0]))),
    ),
  ]
}`))}function rL(){return new b(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(height, i) { #(i, height) })
  list.fold(indexed, 0, fn(best, left) {
    list.fold(indexed, best, fn(best, right) {
      case right.0 > left.0 {
        True -> int.max(best, int.min(left.1, right.1) * { right.0 - left.0 })
        False -> best
      }
    })
  })
}`]]),new k("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])",
      string.inspect(49),
      string.inspect(solution.max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])),
    ),
    #(
      "max_area([1, 1])",
      string.inspect(1),
      string.inspect(solution.max_area([1, 1])),
    ),
    #(
      "max_area([])",
      string.inspect(0),
      string.inspect(solution.max_area([])),
    ),
  ]
}`))}function aL(){return new b(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [buy, ..later] -> int.max(best_sale(buy, later), max_profit(later))
  }
}

fn best_sale(buy: Int, later: List(Int)) -> Int {
  list.fold(later, 0, fn(best, sell) { int.max(best, sell - buy) })
}`]]),new k("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_profit([7, 1, 5, 3, 6, 4])",
      string.inspect(5),
      string.inspect(solution.max_profit([7, 1, 5, 3, 6, 4])),
    ),
    #(
      "max_profit([7, 6, 4, 3, 1])",
      string.inspect(0),
      string.inspect(solution.max_profit([7, 6, 4, 3, 1])),
    ),
    #(
      "max_profit([])",
      string.inspect(0),
      string.inspect(solution.max_profit([])),
    ),
  ]
}`))}function tL(){return new b(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`import gleam/dict
import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
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
}`],["Solution 2 · Shrinking window","The window itself is the bookkeeping: on a repeat, drop everything up to and including the earlier copy. No last-seen map at all, at the cost of scanning the window on each repeat.",`import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
  string.to_graphemes(s)
  |> list.fold(#([], 0), fn(acc, g) {
    let #(window, best) = acc
    let window = case list.contains(window, g) {
      True -> drop_through(window, g)
      False -> window
    }
    let window = list.append(window, [g])
    #(window, int.max(best, list.length(window)))
  })
  |> fn(state) { state.1 }
}

fn drop_through(window: List(String), g: String) -> List(String) {
  case window {
    [] -> []
    [first, ..rest] ->
      case first == g {
        True -> rest
        False -> drop_through(rest, g)
      }
  }
}`]]),new k("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "length_of_longest_substring(\\"abcabcbb\\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("abcabcbb")),
    ),
    #(
      "length_of_longest_substring(\\"bbbbb\\")",
      string.inspect(1),
      string.inspect(solution.length_of_longest_substring("bbbbb")),
    ),
    #(
      "length_of_longest_substring(\\"pwwkew\\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("pwwkew")),
    ),
    #(
      "length_of_longest_substring(\\"\\")",
      string.inspect(0),
      string.inspect(solution.length_of_longest_substring("")),
    ),
  ]
}`))}function oL(){return new b(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
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
  let max_count =
    dict.fold(counts, 0, fn(top, _, count) { int.max(top, count) })
  case size - max_count > k, window {
    True, [oldest, ..rest] ->
      shrink(
        dict.upsert(counts, oldest, fn(n) { option.unwrap(n, 1) - 1 }),
        rest,
        k,
      )
    _, _ -> #(counts, window)
  }
}`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`import gleam/int
import gleam/list
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
  let graphemes = string.to_graphemes(s)
  graphemes
  |> list.unique
  |> list.fold(0, fn(best, target) {
    int.max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k))
  })
}

/// \`from_left\` is the window's left edge, \`upcoming\` its right; \`others\` counts
/// the characters inside it that are not \`target\` and would need replacing.
fn sweep(
  from_left: List(String),
  upcoming: List(String),
  size: Int,
  others: Int,
  best: Int,
  target: String,
  k: Int,
) -> Int {
  case upcoming {
    [] -> best
    [g, ..rest] -> {
      let others = case g == target {
        True -> others
        False -> others + 1
      }
      let #(from_left, size, others) =
        shrink(from_left, size + 1, others, target, k)
      sweep(from_left, rest, size, others, int.max(best, size), target, k)
    }
  }
}

fn shrink(
  from_left: List(String),
  size: Int,
  others: Int,
  target: String,
  k: Int,
) -> #(List(String), Int, Int) {
  case others > k, from_left {
    True, [oldest, ..rest] ->
      shrink(
        rest,
        size - 1,
        case oldest == target {
          True -> others
          False -> others - 1
        },
        target,
        k,
      )
    _, _ -> #(from_left, size, others)
  }
}`]]),new k("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "character_replacement(\\"ABAB\\", 2)",
      string.inspect(4),
      string.inspect(solution.character_replacement("ABAB", 2)),
    ),
    #(
      "character_replacement(\\"AABABBA\\", 1)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AABABBA", 1)),
    ),
    #(
      "character_replacement(\\"AAAA\\", 0)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AAAA", 0)),
    ),
  ]
}`))}function eL(){return new b(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
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
}`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`import gleam/list
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle =
    string.to_graphemes(s1)
    |> list.sort(string.compare)
  case needle {
    [] -> True
    _ -> windows(string.to_graphemes(s2), list.length(needle), needle)
  }
}

fn windows(haystack: List(String), size: Int, needle: List(String)) -> Bool {
  case list.length(haystack) < size {
    True -> False
    False ->
      case list.sort(list.take(haystack, size), string.compare) == needle {
        True -> True
        False -> windows(list.drop(haystack, 1), size, needle)
      }
  }
}`]]),new k("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "check_inclusion(\\"ab\\", \\"eidbaooo\\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("ab", "eidbaooo")),
    ),
    #(
      "check_inclusion(\\"ab\\", \\"eidboaoo\\")",
      string.inspect(False),
      string.inspect(solution.check_inclusion("ab", "eidboaoo")),
    ),
    #(
      "check_inclusion(\\"adc\\", \\"dcda\\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("adc", "dcda")),
    ),
  ]
}`))}function IB(){return new b(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`import gleam/string

pub fn is_valid(s: String) -> Bool {
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
}`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`import gleam/string

pub fn is_valid(s: String) -> Bool {
  reduce(s) == ""
}

fn reduce(s: String) -> String {
  let smaller =
    s
    |> string.replace("()", "")
    |> string.replace("[]", "")
    |> string.replace("{}", "")
  case smaller == s {
    True -> s
    False -> reduce(smaller)
  }
}`]]),new k("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid(\\"()[]{}\\")",
      string.inspect(True),
      string.inspect(solution.is_valid("()[]{}")),
    ),
    #(
      "is_valid(\\"(]\\")",
      string.inspect(False),
      string.inspect(solution.is_valid("(]")),
    ),
    #(
      "is_valid(\\"([)]\\")",
      string.inspect(False),
      string.inspect(solution.is_valid("([)]")),
    ),
    #(
      "is_valid(\\"{[]}\\")",
      string.inspect(True),
      string.inspect(solution.is_valid("{[]}")),
    ),
    #("is_valid(\\"(\\")", string.inspect(False), string.inspect(solution.is_valid("("))),
  ]
}`))}function ZB(){return new b(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`import gleam/int

pub type MinStack {
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
}`],["Solution 2 · Two stacks","Values in one stack, running minimums in a parallel one. The two concerns stay separate, which is what makes adding a max stack a copy-paste.",`import gleam/int

/// Values in one stack, the running minimum in a parallel one. Same O(1)
/// get_min as pairing each value with its minimum, but the two concerns stay
/// separate — which is easier to extend to a max stack, a sum stack, and so on.
pub type MinStack {
  MinStack(values: List(Int), minimums: List(Int))
}

pub fn new() -> MinStack {
  MinStack([], [])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let minimums = case stack.minimums {
    [current, ..] -> [int.min(value, current), ..stack.minimums]
    [] -> [value]
  }
  MinStack([value, ..stack.values], minimums)
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.values, stack.minimums {
    [_, ..values], [_, ..minimums] -> MinStack(values, minimums)
    _, _ -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.values {
    [value, ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.minimums {
    [minimum, ..] -> Ok(minimum)
    [] -> Error(Nil)
  }
}`]]),new k(`pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack

pub fn push(stack: MinStack, value: Int) -> MinStack

pub fn pop(stack: MinStack) -> MinStack

pub fn top(stack: MinStack) -> Result(Int, Nil)

pub fn get_min(stack: MinStack) -> Result(Int, Nil)`,`pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  todo
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  todo
}

pub fn pop(stack: MinStack) -> MinStack {
  todo
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  todo
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let stack =
    solution.new()
    |> solution.push(-2)
    |> solution.push(0)
    |> solution.push(-3)
  let popped = solution.pop(stack)

  [
    #(
      "get_min() after push -2, 0, -3",
      string.inspect(Ok(-3)),
      string.inspect(solution.get_min(stack)),
    ),
    #("top() after pop()", string.inspect(Ok(0)), string.inspect(solution.top(popped))),
    #(
      "get_min() after pop()",
      string.inspect(Ok(-2)),
      string.inspect(solution.get_min(popped)),
    ),
    #(
      "top() on an empty stack",
      string.inspect(Error(Nil)),
      string.inspect(solution.top(solution.new())),
    ),
  ]
}`))}function JB(){return new b(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`import gleam/dict
import gleam/list

pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`import gleam/list

pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  list.index_map(temps, fn(temp, i) {
    days_until_warmer(list.drop(temps, i + 1), temp, 1)
  })
}

fn days_until_warmer(later: List(Int), temp: Int, days: Int) -> Int {
  case later {
    [] -> 0
    [next, ..rest] ->
      case next > temp {
        True -> days
        False -> days_until_warmer(rest, temp, days + 1)
      }
  }
}`]]),new k("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])",
      string.inspect([1, 1, 4, 2, 1, 1, 0, 0]),
      string.inspect(
        solution.daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]),
      ),
    ),
    #(
      "daily_temperatures([30, 40, 50, 60])",
      string.inspect([1, 1, 1, 0]),
      string.inspect(solution.daily_temperatures([30, 40, 50, 60])),
    ),
    #(
      "daily_temperatures([30, 30, 30])",
      string.inspect([0, 0, 0]),
      string.inspect(solution.daily_temperatures([30, 30, 30])),
    ),
  ]
}`))}function QB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`import gleam/int
import gleam/list
import gleam/order

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`],["Solution 2 · First match scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A plain indexed scan. O(n), so it fails the stated requirement — but it is what the halving has to beat, and it shows exactly what the sortedness buys.`,`import gleam/list

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}`]]),new k("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search([-1, 0, 3, 5, 9, 12], 9)",
      string.inspect(Ok(4)),
      string.inspect(solution.search([-1, 0, 3, 5, 9, 12], 9)),
    ),
    #(
      "search([-1, 0, 3, 5, 9, 12], 2)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search([-1, 0, 3, 5, 9, 12], 2)),
    ),
    #("search([5], 5)", string.inspect(Ok(0)), string.inspect(solution.search([5], 5))),
    #(
      "search([], 1)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search(no_ints, 1)),
    ),
  ]
}`))}function XB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`import gleam/int
import gleam/list
import gleam/result

pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(scan(rest, first, first))
  }
}

fn scan(nums: List(Int), previous: Int, head: Int) -> Int {
  case nums {
    [] -> head
    [n, ..rest] ->
      case n < previous {
        True -> n
        False -> scan(rest, n, head)
      }
  }
}`]]),new k("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_min([3, 4, 5, 1, 2])",
      string.inspect(Ok(1)),
      string.inspect(solution.find_min([3, 4, 5, 1, 2])),
    ),
    #(
      "find_min([4, 5, 6, 7, 0, 1, 2])",
      string.inspect(Ok(0)),
      string.inspect(solution.find_min([4, 5, 6, 7, 0, 1, 2])),
    ),
    #(
      "find_min([11, 13, 15, 17])",
      string.inspect(Ok(11)),
      string.inspect(solution.find_min([11, 13, 15, 17])),
    ),
    #("find_min([2, 1])", string.inspect(Ok(1)), string.inspect(solution.find_min([2, 1]))),
  ]
}`))}function YB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`import gleam/list
import gleam/result

pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`import gleam/int
import gleam/list
import gleam/order

pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  let pivot = rotation_point(nums)
  let #(left, right) = list.split(nums, pivot)
  case binary_search(left, target, 0) {
    Ok(index) -> Ok(index)
    Error(Nil) -> binary_search(right, target, pivot)
  }
}

/// Index of the smallest element — 0 when the array was never rotated.
fn rotation_point(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    [first, ..rest] -> walk(rest, first, 1)
  }
}

fn walk(nums: List(Int), previous: Int, index: Int) -> Int {
  case nums {
    [] -> 0
    [n, ..rest] ->
      case n < previous {
        True -> index
        False -> walk(rest, n, index + 1)
      }
  }
}

fn binary_search(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> binary_search(left, target, offset)
            order.Gt -> binary_search(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`]]),new k("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 0)",
      string.inspect(Ok(4)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 0)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 3)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 3)),
    ),
    #(
      "search_rotated([1], 1)",
      string.inspect(Ok(0)),
      string.inspect(solution.search_rotated([1], 1)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 6)",
      string.inspect(Ok(2)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 6)),
    ),
  ]
}`))}function qB(){return new b(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`import gleam/int
import gleam/list
import gleam/string

pub fn encode(strs: List(String)) -> String {
  strs
  |> list.map(fn(s) { int.to_string(string.length(s)) <> "#" <> s })
  |> string.concat
}

pub fn decode(s: String) -> List(String) {
  read(s, [])
}

fn read(rest: String, acc: List(String)) -> List(String) {
  case string.split_once(rest, "#") {
    Error(Nil) -> list.reverse(acc)
    Ok(#(digits, tail)) ->
      case int.parse(digits) {
        Error(Nil) -> list.reverse(acc)
        Ok(length) ->
          read(string.drop_start(tail, length), [
            string.slice(tail, 0, length),
            ..acc
          ])
      }
  }
}`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`import gleam/list
import gleam/string

const separator = "|"

const escape = "\\\\"

pub fn encode(strs: List(String)) -> String {
  strs
  |> list.map(fn(s) {
    separator
    <> s
    |> string.replace(escape, escape <> escape)
    |> string.replace(separator, escape <> separator)
  })
  |> string.concat
}

pub fn decode(s: String) -> List(String) {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  case string.to_graphemes(s) {
    [] -> []
    [first, ..rest] if first == separator -> unescape(rest, "", [])
    _ -> []
  }
}

fn unescape(
  graphemes: List(String),
  current: String,
  acc: List(String),
) -> List(String) {
  case graphemes {
    [] -> list.reverse([current, ..acc])
    [first, escaped, ..rest] if first == escape ->
      unescape(rest, current <> escaped, acc)
    [first, ..rest] if first == separator -> unescape(rest, "", [current, ..acc])
    [g, ..rest] -> unescape(rest, current <> g, acc)
  }
}`]]),new k(`pub fn encode(strs: List(String)) -> String

pub fn decode(s: String) -> List(String)`,`pub fn encode(strs: List(String)) -> String {
  todo
}

pub fn decode(s: String) -> List(String) {
  todo
}`,`import gleam/string
import solution

/// Only the round trip is specified: any encoding is fine as long as decode
/// undoes it, so every case runs both directions.
fn round_trip(strs: List(String)) -> List(String) {
  solution.decode(solution.encode(strs))
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "decode(encode([\\"neet\\", \\"code\\", \\"love\\", \\"you\\"]))",
      string.inspect(["neet", "code", "love", "you"]),
      string.inspect(round_trip(["neet", "code", "love", "you"])),
    ),
    #("decode(encode([]))", string.inspect([]), string.inspect(round_trip([]))),
    #(
      "decode(encode([\\"\\", \\"\\"]))",
      string.inspect(["", ""]),
      string.inspect(round_trip(["", ""])),
    ),
    #(
      "decode(encode([\\"3#x\\", \\"a|b\\"]))",
      string.inspect(["3#x", "a|b"]),
      string.inspect(round_trip(["3#x", "a|b"])),
    ),
    #(
      "decode(encode([\\"\\\\\\\\\\", \\"|\\", \\"#\\"]))",
      string.inspect(["\\\\", "|", "#"]),
      string.inspect(round_trip(["\\\\", "|", "#"])),
    ),
  ]
}`))}function KB(){return new b(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`import gleam/int
import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> filled_cells
  |> walk(set.new())
}

fn filled_cells(board: List(List(String))) -> List(#(Int, Int, String)) {
  board
  |> list.index_map(fn(row, r) {
    row
    |> list.index_map(fn(value, c) { #(r, c, value) })
    |> list.filter(fn(cell) { cell.2 != "." })
  })
  |> list.flatten
}

fn walk(cells: List(#(Int, Int, String)), seen: set.Set(String)) -> Bool {
  case cells {
    [] -> True
    [#(r, c, value), ..rest] -> {
      let keys = [
        value <> " row " <> int.to_string(r),
        value <> " col " <> int.to_string(c),
        value <> " box " <> int.to_string(r / 3 * 3 + c / 3),
      ]
      case list.any(keys, set.contains(seen, _)) {
        True -> False
        False -> walk(rest, list.fold(keys, seen, set.insert))
      }
    }
  }
}`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> units
  |> list.all(no_duplicates)
}

fn units(board: List(List(String))) -> List(List(String)) {
  list.flatten([board, list.transpose(board), boxes(board)])
}

fn boxes(board: List(List(String))) -> List(List(String)) {
  board
  |> list.sized_chunk(3)
  |> list.flat_map(fn(band) {
    band
    |> list.map(list.sized_chunk(_, 3))
    |> list.transpose
    |> list.map(list.flatten)
  })
}

fn no_duplicates(unit: List(String)) -> Bool {
  let filled = list.filter(unit, fn(value) { value != "." })
  list.length(filled) == set.size(set.from_list(filled))
}`]]),new k("pub fn is_valid_sudoku(board: List(List(String))) -> Bool",`pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Nine row strings rather than a 9x9 literal: the board stays readable, and a
/// single changed cell is what each invalid case is.
const rows = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79",
]

fn board() -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

fn with_cell(r: Int, c: Int, value: String) -> List(List(String)) {
  board()
  |> list.index_map(fn(row, i) {
    case i == r {
      False -> row
      True ->
        list.index_map(row, fn(cell, j) {
          case j == c {
            True -> value
            False -> cell
          }
        })
    }
  })
}

fn empty() -> List(List(String)) {
  list.repeat(list.repeat(".", 9), 9)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid_sudoku(valid board)",
      string.inspect(True),
      string.inspect(solution.is_valid_sudoku(board())),
    ),
    #(
      "is_valid_sudoku(5 twice in row 0)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(0, 2, "5"))),
    ),
    #(
      "is_valid_sudoku(5 twice in column 0, different boxes)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(3, 0, "5"))),
    ),
    #(
      "is_valid_sudoku(3 twice in the top-left box only)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(2, 0, "3"))),
    ),
    #(
      "is_valid_sudoku(empty board)",
      string.inspect(True),
      string.inspect(solution.is_valid_sudoku(empty())),
    ),
  ]
}`))}function WB(){return new b(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`import gleam/int
import gleam/list

pub fn trap(height: List(Int)) -> Int {
  walk(height, list.reverse(height), list.length(height) - 1, 0, 0, 0)
}

/// The two pointers are the list read from the front and the list read from the
/// back; \`remaining\` stands in for "left < right", since neither end knows
/// where the other has got to.
fn walk(
  front: List(Int),
  back: List(Int),
  remaining: Int,
  left_max: Int,
  right_max: Int,
  total: Int,
) -> Int {
  case remaining <= 0, front, back {
    False, [l, ..front_rest], [r, ..back_rest] ->
      case l < r {
        True -> {
          let left_max = int.max(left_max, l)
          walk(
            front_rest,
            back,
            remaining - 1,
            left_max,
            right_max,
            total + left_max - l,
          )
        }
        False -> {
          let right_max = int.max(right_max, r)
          walk(
            front,
            back_rest,
            remaining - 1,
            left_max,
            right_max,
            total + right_max - r,
          )
        }
      }
    _, _, _ -> total
  }
}`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`import gleam/int
import gleam/list

pub fn trap(height: List(Int)) -> Int {
  let left = running_max(height)
  let right =
    height
    |> list.reverse
    |> running_max
    |> list.reverse

  list.zip(list.zip(left, right), height)
  |> list.map(fn(cell) {
    let #(#(l, r), h) = cell
    int.min(l, r) - h
  })
  |> int.sum
}

fn running_max(values: List(Int)) -> List(Int) {
  list.scan(values, 0, int.max)
}`]]),new k("pub fn trap(height: List(Int)) -> Int",`pub fn trap(height: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])",
      string.inspect(6),
      string.inspect(solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])),
    ),
    #(
      "trap([4, 2, 0, 3, 2, 5])",
      string.inspect(9),
      string.inspect(solution.trap([4, 2, 0, 3, 2, 5])),
    ),
    #("trap([])", string.inspect(0), string.inspect(solution.trap([]))),
    #("trap([3])", string.inspect(0), string.inspect(solution.trap([3]))),
    #(
      "trap([2, 0, 2])",
      string.inspect(2),
      string.inspect(solution.trap([2, 0, 2])),
    ),
    #(
      "trap([5, 4, 3, 2, 1])",
      string.inspect(0),
      string.inspect(solution.trap([5, 4, 3, 2, 1])),
    ),
  ]
}`))}function GB(){return new b(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let graphemes = string.to_graphemes(s)
      let need =
        list.fold(string.to_graphemes(t), dict.new(), fn(counts, c) {
          dict.insert(counts, c, count(counts, c) + 1)
        })
      let #(start, length) =
        scan(graphemes, 0, graphemes, 0, need, string.length(t), #(0, 0))
      string.slice(s, start, length)
    }
  }
}

/// The window is the gap between two views of the same list: \`right\` is what
/// has not been taken in yet, \`left\` is everything from the window's start
/// onwards. Advancing either end is one list head, and the indices are carried
/// alongside because the answer is a slice.
fn scan(
  right: List(String),
  right_index: Int,
  left: List(String),
  left_index: Int,
  counts: Dict(String, Int),
  missing: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case missing == 0 {
    True ->
      case left {
        [] -> best
        [c, ..left_rest] -> {
          let length = right_index - left_index
          let best = case best.1 == 0 || length < best.1 {
            True -> #(left_index, length)
            False -> best
          }
          let raised = count(counts, c) + 1
          scan(
            right,
            right_index,
            left_rest,
            left_index + 1,
            dict.insert(counts, c, raised),
            case raised > 0 {
              True -> missing + 1
              False -> missing
            },
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [c, ..right_rest] -> {
          let current = count(counts, c)
          scan(
            right_rest,
            right_index + 1,
            left,
            left_index,
            dict.insert(counts, c, current - 1),
            case current > 0 {
              True -> missing - 1
              False -> missing
            },
            best,
          )
        }
      }
  }
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let need = tally(string.to_graphemes(t))
      // Only the positions that could possibly matter. For a long haystack and
      // a short needle this is a far shorter walk than the whole string.
      let positions =
        string.to_graphemes(s)
        |> list.index_map(fn(c, i) { #(i, c) })
        |> list.filter(fn(entry) { dict.has_key(need, entry.1) })

      case
        scan(positions, positions, need, dict.new(), 0, dict.size(need), -1, #(
          0,
          0,
        ))
      {
        #(_, 0) -> ""
        #(start, length) -> string.slice(s, start, length)
      }
    }
  }
}

/// Counts how many of the needle's distinct characters are fully covered,
/// rather than how many characters are still missing. Same window, different
/// bookkeeping: \`satisfied\` only moves when a count crosses its requirement.
fn scan(
  right: List(#(Int, String)),
  left: List(#(Int, String)),
  need: Dict(String, Int),
  window: Dict(String, Int),
  satisfied: Int,
  distinct: Int,
  last_index: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case satisfied == distinct {
    True ->
      case left {
        [] -> best
        [#(start, c), ..left_rest] -> {
          let length = last_index - start + 1
          let best = case best.1 == 0 || length < best.1 {
            True -> #(start, length)
            False -> best
          }
          let lowered = count(window, c) - 1
          scan(
            right,
            left_rest,
            need,
            dict.insert(window, c, lowered),
            case lowered < count(need, c) {
              True -> satisfied - 1
              False -> satisfied
            },
            distinct,
            last_index,
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [#(index, c), ..right_rest] -> {
          let raised = count(window, c) + 1
          scan(
            right_rest,
            left,
            need,
            dict.insert(window, c, raised),
            case raised == count(need, c) {
              True -> satisfied + 1
              False -> satisfied
            },
            distinct,
            index,
            best,
          )
        }
      }
  }
}

fn tally(graphemes: List(String)) -> Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(counts, c) {
    dict.insert(counts, c, count(counts, c) + 1)
  })
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}`]]),new k("pub fn min_window(s: String, t: String) -> String",`pub fn min_window(s: String, t: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_window(\\"ADOBECODEBANC\\", \\"ABC\\")",
      string.inspect("BANC"),
      string.inspect(solution.min_window("ADOBECODEBANC", "ABC")),
    ),
    #(
      "min_window(\\"a\\", \\"a\\")",
      string.inspect("a"),
      string.inspect(solution.min_window("a", "a")),
    ),
    #(
      "min_window(\\"a\\", \\"aa\\")",
      string.inspect(""),
      string.inspect(solution.min_window("a", "aa")),
    ),
    #(
      "min_window(\\"\\", \\"a\\")",
      string.inspect(""),
      string.inspect(solution.min_window("", "a")),
    ),
    #(
      "min_window(\\"ab\\", \\"\\")",
      string.inspect(""),
      string.inspect(solution.min_window("ab", "")),
    ),
    #(
      "min_window(\\"aaflslflsldkalskaaa\\", \\"aaa\\")",
      string.inspect("aaa"),
      string.inspect(solution.min_window("aaflslflsldkalskaaa", "aaa")),
    ),
  ]
}`))}function UB(){return new b(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> {
      let blocks = list.sized_chunk(nums, k)
      let left = list.flat_map(blocks, running_max)
      let right =
        list.flat_map(blocks, fn(block) {
          block
          |> list.reverse
          |> running_max
          |> list.reverse
        })

      // Every window of width k straddles at most one block boundary, so it is
      // covered by a suffix of one block and a prefix of the next.
      list.zip(right, list.drop(left, k - 1))
      |> list.map(fn(pair) { int.max(pair.0, pair.1) })
    }
  }
}

/// Seeded with the first element rather than zero: the values can be negative.
fn running_max(values: List(Int)) -> List(Int) {
  case values {
    [] -> []
    [first, ..rest] -> [first, ..list.scan(rest, first, int.max)]
  }
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> windows(nums, k, [])
  }
}

/// Every window, maximised, by walking the list one start at a time. There is
/// no random access to slice with, so the tail is re-taken each step \\u{2014} which is
/// the O(n\\u{b7}k) the other variants exist to avoid.
fn windows(nums: List(Int), k: Int, acc: List(Int)) -> List(Int) {
  let window = list.take(nums, k)
  case list.length(window) < k, nums {
    True, _ -> list.reverse(acc)
    False, [] -> list.reverse(acc)
    False, [_, ..rest] ->
      case list.reduce(window, int.max) {
        Ok(best) -> windows(rest, k, [best, ..acc])
        Error(Nil) -> list.reverse(acc)
      }
  }
}`]]),new k("pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int)",`pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)",
      string.inspect([3, 3, 5, 5, 6, 7]),
      string.inspect(solution.max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)),
    ),
    #(
      "max_sliding_window([1], 1)",
      string.inspect([1]),
      string.inspect(solution.max_sliding_window([1], 1)),
    ),
    #(
      "max_sliding_window([], 3)",
      string.inspect([]),
      string.inspect(solution.max_sliding_window([], 3)),
    ),
    #(
      "max_sliding_window([9, 8, 7, 6], 2)",
      string.inspect([9, 8, 7]),
      string.inspect(solution.max_sliding_window([9, 8, 7, 6], 2)),
    ),
    #(
      "max_sliding_window([1, -1], 1)",
      string.inspect([1, -1]),
      string.inspect(solution.max_sliding_window([1, -1], 1)),
    ),
    #(
      "max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)",
      string.inspect([7, 7, 7, 7, 7]),
      string.inspect(solution.max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)),
    ),
  ]
}`))}function zB(){return new b(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`import gleam/int
import gleam/list

pub fn eval_rpn(tokens: List(String)) -> Int {
  case list.fold(tokens, [], step) {
    [answer, ..] -> answer
    [] -> 0
  }
}

/// Gleam's integer division already truncates towards zero, which is what the
/// problem asks for and what most languages' \`//\` does not do for negatives.
fn step(stack: List(Int), token: String) -> List(Int) {
  case token, stack {
    "+", [b, a, ..rest] -> [a + b, ..rest]
    "-", [b, a, ..rest] -> [a - b, ..rest]
    "*", [b, a, ..rest] -> [a * b, ..rest]
    "/", [b, a, ..rest] -> [a / b, ..rest]
    _, _ ->
      case int.parse(token) {
        Ok(n) -> [n, ..stack]
        Error(Nil) -> stack
      }
  }
}`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`import gleam/int
import gleam/list
import gleam/result

pub fn eval_rpn(tokens: List(String)) -> Int {
  let #(value, _) = take(list.reverse(tokens))
  value
}

/// Read right to left: the last token is the outermost operator, and each
/// operator takes its right operand first because that is what sits nearer the
/// end. Returns the value and whatever is left to read.
fn take(rest: List(String)) -> #(Int, List(String)) {
  case rest {
    [] -> #(0, [])
    [token, ..tail] ->
      case token {
        "+" | "-" | "*" | "/" -> {
          let #(right, tail) = take(tail)
          let #(left, tail) = take(tail)
          #(apply(token, left, right), tail)
        }
        _ -> #(result.unwrap(int.parse(token), 0), tail)
      }
  }
}

fn apply(operator: String, left: Int, right: Int) -> Int {
  case operator {
    "+" -> left + right
    "-" -> left - right
    "*" -> left * right
    _ -> left / right
  }
}`]]),new k("pub fn eval_rpn(tokens: List(String)) -> Int",`pub fn eval_rpn(tokens: List(String)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "eval_rpn([\\"2\\", \\"1\\", \\"+\\", \\"3\\", \\"*\\"])",
      string.inspect(9),
      string.inspect(solution.eval_rpn(["2", "1", "+", "3", "*"])),
    ),
    #(
      "eval_rpn([\\"4\\", \\"13\\", \\"5\\", \\"/\\", \\"+\\"])",
      string.inspect(6),
      string.inspect(solution.eval_rpn(["4", "13", "5", "/", "+"])),
    ),
    #(
      "eval_rpn([\\"-3\\", \\"2\\", \\"/\\"])",
      string.inspect(-1),
      string.inspect(solution.eval_rpn(["-3", "2", "/"])),
    ),
    #(
      "eval_rpn([\\"5\\"])",
      string.inspect(5),
      string.inspect(solution.eval_rpn(["5"])),
    ),
    #(
      "eval_rpn(the long one)",
      string.inspect(22),
      string.inspect(
        solution.eval_rpn([
          "10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+",
        ]),
      ),
    ),
  ]
}`))}function VB(){return new b(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  list.reverse(build(n, n, "", []))
}

/// Two counters, one rule each: an opener is legal while any are left, and a
/// closer is legal only while more are outstanding than openers. Every string
/// reached with both counters at zero is valid by construction, so nothing is
/// ever generated and then thrown away.
fn build(
  open: Int,
  close: Int,
  current: String,
  acc: List(String),
) -> List(String) {
  case open, close {
    0, 0 -> [current, ..acc]
    _, _ -> {
      let acc = case open > 0 {
        True -> build(open - 1, close, current <> "(", acc)
        False -> acc
      }
      case close > open {
        True -> build(open, close - 1, current <> ")", acc)
        False -> acc
      }
    }
  }
}`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  compose(n)
}

/// Every non-empty balanced string is "(" <> A <> ")" <> B for exactly one
/// split: A is whatever the first bracket encloses, B is whatever follows it.
/// Enumerating the splits enumerates the strings, with no validity rule to
/// check at all \\u{2014} the shape of the recursion is the rule.
fn compose(n: Int) -> List(String) {
  case n <= 0 {
    True -> [""]
    False ->
      indices(n)
      |> list.flat_map(fn(inner_pairs) {
        let inner = compose(inner_pairs)
        let rest = compose(n - 1 - inner_pairs)
        list.flat_map(inner, fn(a) {
          list.map(rest, fn(b) { "(" <> a <> ")" <> b })
        })
      })
  }
}

fn indices(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}`]]),new k("pub fn generate_parenthesis(n: Int) -> List(String)",`pub fn generate_parenthesis(n: Int) -> List(String) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Any order is acceptable, so every case compares sorted.
fn sorted(n: Int) -> List(String) {
  list.sort(solution.generate_parenthesis(n), string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "generate_parenthesis(1)",
      string.inspect(["()"]),
      string.inspect(sorted(1)),
    ),
    #(
      "generate_parenthesis(2)",
      string.inspect(["(())", "()()"]),
      string.inspect(sorted(2)),
    ),
    #(
      "generate_parenthesis(3)",
      string.inspect(["((()))", "(()())", "(())()", "()(())", "()()()"]),
      string.inspect(sorted(3)),
    ),
    #(
      "generate_parenthesis(4) count",
      string.inspect(14),
      string.inspect(list.length(sorted(4))),
    ),
  ]
}`))}function jB(){return new b(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`import gleam/int
import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  list.zip(position, speed)
  |> list.sort(fn(a, b) { int.compare(b.0, a.0) })
  |> list.fold(#(0, 0, 1), fn(state, car) {
    let #(fleets, lead_distance, lead_speed) = state
    let distance = target - car.0
    // distance/speed > lead_distance/lead_speed, cross-multiplied so the
    // arrival times never have to become fractions.
    case distance * lead_speed > lead_distance * car.1 {
      True -> #(fleets + 1, distance, car.1)
      False -> #(fleets, lead_distance, lead_speed)
    }
  })
  |> fn(state) { state.0 }
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  let cars = list.zip(position, speed)
  list.count(cars, fn(car) { leads(car, cars, target) })
}

/// A car leads a fleet exactly when it arrives strictly later than every car
/// ahead of it; anything else means it catches one of them and merges. No
/// sorting, no running state \\u{2014} O(n\\u{b2}), and the definition rather than a
/// consequence of it.
fn leads(car: #(Int, Int), cars: List(#(Int, Int)), target: Int) -> Bool {
  cars
  |> list.filter(fn(other) { other.0 > car.0 })
  |> list.all(fn(other) {
    { target - car.0 } * other.1 > { target - other.0 } * car.1
  })
}`]]),new k("pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int",`pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])",
      string.inspect(3),
      string.inspect(solution.car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])),
    ),
    #(
      "car_fleet(10, [3], [3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [3], [3])),
    ),
    #(
      "car_fleet(100, [0, 2, 4], [4, 2, 1])",
      string.inspect(1),
      string.inspect(solution.car_fleet(100, [0, 2, 4], [4, 2, 1])),
    ),
    #(
      "car_fleet(10, [6, 8], [3, 2])",
      string.inspect(2),
      string.inspect(solution.car_fleet(10, [6, 8], [3, 2])),
    ),
    #(
      "car_fleet(10, [], [])",
      string.inspect(0),
      string.inspect(solution.car_fleet(10, [], [])),
    ),
    #(
      "car_fleet(10, [0, 4, 2], [2, 1, 3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [0, 4, 2], [2, 1, 3])),
    ),
  ]
}`))}function OB(){return new b(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let n = list.length(heights)
  let #(stack, best) =
    heights
    |> list.index_map(fn(h, i) { #(i, h) })
    |> list.fold(#([], 0), fn(state, cell) {
      let #(stack, best) = state
      let #(i, h) = cell
      // Anything taller than the new bar can never extend past it, so its
      // rectangle is finished here. Whatever it reached back to becomes this
      // bar's own starting point.
      let #(stack, best, start) = close_taller(stack, h, i, best, i)
      #([#(start, h), ..stack], best)
    })

  // Whatever survives was never cut off, so it runs to the far end.
  list.fold(stack, best, fn(best, entry) {
    int.max(best, entry.1 * { n - entry.0 })
  })
}

fn close_taller(
  stack: List(#(Int, Int)),
  height: Int,
  index: Int,
  best: Int,
  start: Int,
) -> #(List(#(Int, Int)), Int, Int) {
  case stack {
    [#(from, tall), ..rest] if tall > height ->
      close_taller(
        rest,
        height,
        index,
        int.max(best, tall * { index - from }),
        from,
      )
    _ -> #(stack, best, start)
  }
}`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(h, i) { #(i, h) })

  list.fold(indexed, 0, fn(best, cell) {
    let #(i, h) = cell
    // How far this bar's own height can spread in each direction. O(n\\u{b2}), and
    // the definition of the answer: every rectangle is some bar taken as far
    // as it will go.
    let left =
      indexed
      |> list.take(i)
      |> list.reverse
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    let right =
      indexed
      |> list.drop(i + 1)
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    int.max(best, h * { left + right + 1 })
  })
}`]]),new k("pub fn largest_rectangle_area(heights: List(Int)) -> Int",`pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "largest_rectangle_area([2, 1, 5, 6, 2, 3])",
      string.inspect(10),
      string.inspect(solution.largest_rectangle_area([2, 1, 5, 6, 2, 3])),
    ),
    #(
      "largest_rectangle_area([2, 4])",
      string.inspect(4),
      string.inspect(solution.largest_rectangle_area([2, 4])),
    ),
    #(
      "largest_rectangle_area([])",
      string.inspect(0),
      string.inspect(solution.largest_rectangle_area([])),
    ),
    #(
      "largest_rectangle_area([1, 1, 1])",
      string.inspect(3),
      string.inspect(solution.largest_rectangle_area([1, 1, 1])),
    ),
    #(
      "largest_rectangle_area([5])",
      string.inspect(5),
      string.inspect(solution.largest_rectangle_area([5])),
    ),
    #(
      "largest_rectangle_area([4, 2, 0, 3, 2, 5])",
      string.inspect(6),
      string.inspect(solution.largest_rectangle_area([4, 2, 0, 3, 2, 5])),
    ),
  ]
}`))}function FB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  case find_row(matrix, target) {
    Ok(row) -> contains(row, target)
    Error(Nil) -> False
  }
}

/// The rows are sorted and do not overlap, so the row a value could live in is
/// itself found by halving: compare the target against a row's ends.
fn find_row(rows: List(List(Int)), target: Int) -> Result(List(Int), Nil) {
  case rows {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(rows) / 2
      let #(before, rest) = list.split(rows, half)
      case rest {
        [] -> Error(Nil)
        [row, ..after] ->
          case list.last(row), list.first(row) {
            Ok(last), _ if last < target -> find_row(after, target)
            _, Ok(first) if first > target -> find_row(before, target)
            Ok(_), Ok(_) -> Ok(row)
            _, _ -> Error(Nil)
          }
      }
    }
  }
}

fn contains(row: List(Int), target: Int) -> Bool {
  case row {
    [] -> False
    _ -> {
      let half = list.length(row) / 2
      let #(before, rest) = list.split(row, half)
      case rest {
        [] -> False
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> True
            order.Lt -> contains(before, target)
            order.Gt -> contains(after, target)
          }
      }
    }
  }
}`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  let width = case matrix {
    [row, ..] -> list.length(row)
    [] -> 0
  }
  walk(matrix, width, target)
}

/// From the top-right corner every step is forced: too big and the whole column
/// is too big, so drop it; too small and the whole row is too small, so drop
/// that. O(m + n), and it never uses the fact that rows do not overlap \\u{2014} it
/// works on any matrix sorted along both axes.
fn walk(rows: List(List(Int)), column: Int, target: Int) -> Bool {
  case rows, column <= 0 {
    [], _ -> False
    _, True -> False
    [row, ..below], False ->
      case row |> list.drop(column - 1) |> list.first {
        Error(Nil) -> False
        Ok(value) ->
          case int.compare(value, target) {
            order.Eq -> True
            order.Gt -> walk(rows, column - 1, target)
            order.Lt -> walk(below, column, target)
          }
      }
  }
}`]]),new k("pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool",`pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  todo
}`,`import gleam/string
import solution

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_matrix(matrix, 3)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 3)),
    ),
    #(
      "search_matrix(matrix, 13)",
      string.inspect(False),
      string.inspect(solution.search_matrix(matrix, 13)),
    ),
    #(
      "search_matrix(matrix, 60)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 60)),
    ),
    #(
      "search_matrix([[1]], 1)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1]], 1)),
    ),
    #(
      "search_matrix([], 1)",
      string.inspect(False),
      string.inspect(solution.search_matrix([], 1)),
    ),
    #(
      "search_matrix([[1], [3], [5]], 5)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1], [3], [5]], 5)),
    ),
  ]
}`))}function HB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  search(piles, h, 1, list.fold(piles, 1, int.max))
}

/// The search space is the answer, not the input. Feasibility is monotone \\u{2014}
/// if a speed finishes in time then so does every faster one \\u{2014} which is
/// exactly the property halving needs.
fn search(piles: List(Int), h: Int, low: Int, high: Int) -> Int {
  case low >= high {
    True -> low
    False -> {
      let mid = { low + high } / 2
      case hours(piles, mid) <= h {
        True -> search(piles, h, low, mid)
        False -> search(piles, h, mid + 1, high)
      }
    }
  }
}

/// A pile never shares an hour with another, so each costs ceil(pile / speed).
fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  climb(piles, h, 1, list.fold(piles, 1, int.max))
}

fn climb(piles: List(Int), h: Int, speed: Int, highest: Int) -> Int {
  case speed >= highest || hours(piles, speed) <= h {
    True -> speed
    False -> climb(piles, h, speed + 1, highest)
  }
}

fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}`]]),new k("pub fn min_eating_speed(piles: List(Int), h: Int) -> Int",`pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_eating_speed([3, 6, 7, 11], 8)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([3, 6, 7, 11], 8)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 5)",
      string.inspect(30),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 5)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 6)",
      string.inspect(23),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 6)),
    ),
    #(
      "min_eating_speed([1], 1)",
      string.inspect(1),
      string.inspect(solution.min_eating_speed([1], 1)),
    ),
    #(
      "min_eating_speed([4, 4, 4, 4], 4)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([4, 4, 4, 4], 4)),
    ),
    #(
      "min_eating_speed([1, 1, 1, 10], 4)",
      string.inspect(10),
      string.inspect(solution.min_eating_speed([1, 1, 1, 10], 4)),
    ),
  ]
}`))}function NB(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

/// Timestamps only ever increase, so prepending keeps each key's history sorted
/// newest first for free.
pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  let history = case dict.get(store.entries, key) {
    Ok(history) -> history
    Error(Nil) -> []
  }
  TimeMap(dict.insert(store.entries, key, [#(timestamp, value), ..history]))
}

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Ok(history) -> newest_at_most(history, timestamp)
    Error(Nil) -> ""
  }
}

/// The history is sorted, so the newest entry at or before a timestamp is a
/// halving question, not a walk. Everything before the split point is newer.
fn newest_at_most(history: List(#(Int, String)), timestamp: Int) -> String {
  case history {
    [] -> ""
    _ -> {
      let half = list.length(history) / 2
      let #(newer, rest) = list.split(history, half)
      case rest {
        [] -> ""
        [#(stamp, value), ..older] ->
          case stamp <= timestamp {
            True ->
              case newest_at_most(newer, timestamp) {
                "" -> value
                found -> found
              }
            False -> newest_at_most(older, timestamp)
          }
      }
    }
  }
}`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  let history = case dict.get(store.entries, key) {
    Ok(history) -> history
    Error(Nil) -> []
  }
  TimeMap(dict.insert(store.entries, key, [#(timestamp, value), ..history]))
}

/// Newest first, so the first entry old enough is the answer. O(n) per lookup
/// against the halving version's O(log n), but there is no split arithmetic to
/// get wrong, and for a key with a handful of versions it wins on constants.
pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Error(Nil) -> ""
    Ok(history) ->
      case list.find(history, fn(entry) { entry.0 <= timestamp }) {
        Ok(#(_, value)) -> value
        Error(Nil) -> ""
      }
  }
}`]]),new k(`pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String`,`pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  todo
}

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  todo
}

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let store =
    solution.new()
    |> solution.set("foo", "bar", 1)

  let later = solution.set(store, "foo", "bar2", 4)

  [
    #(
      "get(\\"foo\\", 1) after set at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 1)),
    ),
    #(
      "get(\\"foo\\", 3) with only the value at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 3)),
    ),
    #(
      "get(\\"foo\\", 4) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 4)),
    ),
    #(
      "get(\\"foo\\", 5) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 5)),
    ),
    #(
      "get(\\"foo\\", 3) still sees the older value",
      string.inspect("bar"),
      string.inspect(solution.get(later, "foo", 3)),
    ),
    #(
      "get(\\"foo\\", 0) before anything was set",
      string.inspect(""),
      string.inspect(solution.get(later, "foo", 0)),
    ),
    #(
      "get(\\"missing\\", 1)",
      string.inspect(""),
      string.inspect(solution.get(later, "missing", 1)),
    ),
  ]
}`))}function RB(){return new b(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let total = list.length(nums1) + list.length(nums2)
  case total {
    0 -> 0.0
    _ -> {
      let #(previous, current) = advance(nums1, nums2, total / 2 + 1, 0, 0)
      case total % 2 {
        1 -> int.to_float(current)
        _ -> int.to_float(previous + current) /. 2.0
      }
    }
  }
}

/// Merge, but stop at the middle and keep only the last two values seen: the
/// merged list is never built, so this is O(m + n) time and no extra space.
fn advance(
  a: List(Int),
  b: List(Int),
  steps: Int,
  previous: Int,
  current: Int,
) -> #(Int, Int) {
  case steps <= 0 {
    True -> #(previous, current)
    False ->
      case a, b {
        [x, ..rest], [y, ..] if x <= y -> advance(rest, b, steps - 1, current, x)
        [x, ..rest], [] -> advance(rest, b, steps - 1, current, x)
        _, [y, ..rest] -> advance(a, rest, steps - 1, current, y)
        [], [] -> #(previous, current)
      }
  }
}`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let merged =
    nums1
    |> list.append(nums2)
    |> list.sort(int.compare)
  let total = list.length(merged)

  case total, at(merged, total / 2), at(merged, { total - 1 } / 2) {
    0, _, _ -> 0.0
    _, upper, lower -> int.to_float(lower + upper) /. 2.0
  }
}

fn at(values: List(Int), index: Int) -> Int {
  case values |> list.drop(index) |> list.first {
    Ok(value) -> value
    Error(Nil) -> 0
  }
}`]]),new k("pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float",`pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_median_sorted_arrays([1, 3], [2])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([1, 3], [2])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [3, 4])",
      string.inspect(2.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [3, 4])),
    ),
    #(
      "find_median_sorted_arrays([], [1])",
      string.inspect(1.0),
      string.inspect(solution.find_median_sorted_arrays([], [1])),
    ),
    #(
      "find_median_sorted_arrays([2], [])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([2], [])),
    ),
    #(
      "find_median_sorted_arrays([], [])",
      string.inspect(0.0),
      string.inspect(solution.find_median_sorted_arrays([], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [])",
      string.inspect(1.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6])",
      string.inspect(4.0),
      string.inspect(
        solution.find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6]),
      ),
    ),
  ]
}`))}function MB(){return new b(V([["Solution 1","The input is already sorted, which turns the problem into a three-way split: everything that finishes before the new interval starts passes through untouched, everything that touches it collapses into one, and everything after it passes through too. One pass, no sorting.",`import gleam/int
import gleam/list

pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int)) {
  // The input is already sorted, so the list falls into three runs: everything
  // that finishes before the new one starts, everything that touches it, and
  // everything that starts after it ends.
  let #(before, rest) =
    list.split_while(intervals, fn(i) { i.1 < new_interval.0 })
  let #(overlapping, after) =
    list.split_while(rest, fn(i) { i.0 <= new_interval.1 })

  let merged =
    list.fold(overlapping, new_interval, fn(acc, i) {
      #(int.min(acc.0, i.0), int.max(acc.1, i.1))
    })

  list.flatten([before, [merged], after])
}`],["Solution 2 · Merge after append","Drop the new interval on the end and run the general merge. It throws away the sortedness — O(n log n) rather than O(n) — but it is a solution you already have rather than a three-way split to get right, and that trade is often the correct one under time pressure.",`import gleam/int
import gleam/list

pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int)) {
  // Drop the new interval on the end and run the general merge. Throws away the
  // fact that the input was sorted \\u{2014} O(n log n) rather than O(n) \\u{2014} but it
  // reuses a solution you already have rather than inventing a three-way split.
  [new_interval, ..intervals]
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.fold([], fn(acc, interval) {
    case acc {
      [#(start, end), ..rest] if interval.0 <= end -> [
        #(start, int.max(end, interval.1)),
        ..rest
      ]
      _ -> [interval, ..acc]
    }
  })
  |> list.reverse
}`]]),new k(`pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int))`,`pub fn insert(
  intervals: List(#(Int, Int)),
  new_interval: #(Int, Int),
) -> List(#(Int, Int)) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "insert([#(1, 3), #(6, 9)], #(2, 5))",
      string.inspect([#(1, 5), #(6, 9)]),
      string.inspect(solution.insert([#(1, 3), #(6, 9)], #(2, 5))),
    ),
    #(
      "insert([#(1, 2), #(3, 5), #(6, 7), #(8, 10), #(12, 16)], #(4, 8))",
      string.inspect([#(1, 2), #(3, 10), #(12, 16)]),
      string.inspect(
        solution.insert([#(1, 2), #(3, 5), #(6, 7), #(8, 10), #(12, 16)], #(
          4,
          8,
        )),
      ),
    ),
    #(
      "insert([], #(5, 7))",
      string.inspect([#(5, 7)]),
      string.inspect(solution.insert([], #(5, 7))),
    ),
    #(
      "insert([#(1, 5)], #(2, 3))",
      string.inspect([#(1, 5)]),
      string.inspect(solution.insert([#(1, 5)], #(2, 3))),
    ),
    #(
      "insert([#(1, 5)], #(6, 8))",
      string.inspect([#(1, 5), #(6, 8)]),
      string.inspect(solution.insert([#(1, 5)], #(6, 8))),
    ),
    #(
      "insert([#(3, 5)], #(1, 2))",
      string.inspect([#(1, 2), #(3, 5)]),
      string.inspect(solution.insert([#(3, 5)], #(1, 2))),
    ),
  ]
}`))}function AB(){return new b(V([["Solution 1","Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that. So a single pass either extends the interval in hand or begins a new one.",`import gleam/int
import gleam/list

pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int)) {
  // Sorted by start, an interval can only ever overlap the one being built, so
  // a single fold is enough: extend it, or begin a new one.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.fold([], fn(acc, interval) {
    case acc {
      [#(start, end), ..rest] if interval.0 <= end -> [
        #(start, int.max(end, interval.1)),
        ..rest
      ]
      _ -> [interval, ..acc]
    }
  })
  |> list.reverse
}`],["Solution 2 · Sweep counts","Forget the intervals and keep only their edges: +1 where one opens, −1 where one closes. A merged interval runs from the edge that lifts the running count off zero to the edge that drops it back. Ordering opens before closes at the same coordinate is what makes touching intervals join.",`import gleam/int
import gleam/list
import gleam/order

pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int)) {
  // Forget the intervals and keep only their edges: +1 where one opens, -1
  // where one closes. A merged interval runs from the edge that lifts the
  // running count off zero to the edge that drops it back.
  intervals
  |> list.flat_map(fn(i) { [#(i.0, 1), #(i.1, -1)] })
  |> list.sort(fn(a, b) {
    // Opens before closes at the same coordinate, so touching intervals join.
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(b.1, a.1)
      other -> other
    }
  })
  |> list.fold(#([], 0, 0), fn(state, edge) {
    let #(done, depth, start) = state
    let depth_after = depth + edge.1
    case depth, depth_after {
      0, _ -> #(done, depth_after, edge.0)
      _, 0 -> #([#(start, edge.0), ..done], 0, start)
      _, _ -> #(done, depth_after, start)
    }
  })
  |> fn(state) { list.reverse(state.0) }
}`]]),new k("pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int))",`pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int)) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "merge([#(1, 3), #(2, 6), #(8, 10), #(15, 18)])",
      string.inspect([#(1, 6), #(8, 10), #(15, 18)]),
      string.inspect(solution.merge([#(1, 3), #(2, 6), #(8, 10), #(15, 18)])),
    ),
    #(
      "merge([#(1, 4), #(4, 5)])",
      string.inspect([#(1, 5)]),
      string.inspect(solution.merge([#(1, 4), #(4, 5)])),
    ),
    #("merge([])", string.inspect([]), string.inspect(solution.merge([]))),
    #(
      "merge([#(1, 4), #(0, 4)])",
      string.inspect([#(0, 4)]),
      string.inspect(solution.merge([#(1, 4), #(0, 4)])),
    ),
    #(
      "merge([#(1, 4), #(2, 3)])",
      string.inspect([#(1, 4)]),
      string.inspect(solution.merge([#(1, 4), #(2, 3)])),
    ),
  ]
}`))}function DB(){return new b(V([["Solution 1","Greedy on the end time. Among intervals competing for the same space, keeping the one that finishes earliest leaves the most room for whatever comes next and can never be worse — which is the exchange argument that makes the greedy correct, and the reason sorting by start is the classic wrong first answer.",`import gleam/int
import gleam/list

pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int {
  // Greedy on the end: among any set of intervals competing for the same space,
  // keeping the one that finishes earliest leaves the most room for whatever
  // comes next, and can never be worse.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.1, b.1) })
  |> list.fold(#(0, -2_147_483_648), fn(state, interval) {
    let #(removed, last_end) = state
    case interval.0 >= last_end {
      True -> #(removed, interval.1)
      False -> #(removed + 1, last_end)
    }
  })
  |> fn(state) { state.0 }
}`],["Solution 2 · By start","Sorted by start instead. On an overlap one of the two has to go, and dropping whichever ends later is always at least as good — so the greedy choice is made at the moment of the clash rather than baked into the sort order. Same answer, and it needs the running end to be lowered rather than replaced.",`import gleam/int
import gleam/list

pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int {
  // Sorted by start instead: on an overlap you must drop one of the two, and
  // dropping whichever ends later is always at least as good. Same greedy
  // argument, made at the moment of the clash rather than in the sort order.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.fold(#(0, -2_147_483_648), fn(state, interval) {
    let #(removed, last_end) = state
    case interval.0 >= last_end {
      True -> #(removed, interval.1)
      False -> #(removed + 1, int.min(last_end, interval.1))
    }
  })
  |> fn(state) { state.0 }
}`]]),new k("pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int",`pub fn erase_overlap_intervals(intervals: List(#(Int, Int))) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "erase_overlap_intervals([#(1, 2), #(2, 3), #(3, 4), #(1, 3)])",
      string.inspect(1),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 2),
          #(2, 3),
          #(3, 4),
          #(1, 3),
        ]),
      ),
    ),
    #(
      "erase_overlap_intervals([#(1, 2), #(1, 2), #(1, 2)])",
      string.inspect(2),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 2),
          #(1, 2),
          #(1, 2),
        ]),
      ),
    ),
    #(
      "erase_overlap_intervals([#(1, 2), #(2, 3)])",
      string.inspect(0),
      string.inspect(solution.erase_overlap_intervals([#(1, 2), #(2, 3)])),
    ),
    #(
      "erase_overlap_intervals([])",
      string.inspect(0),
      string.inspect(solution.erase_overlap_intervals([])),
    ),
    #(
      "erase_overlap_intervals([#(1, 100), #(11, 22), #(1, 11), #(2, 12)])",
      string.inspect(2),
      string.inspect(
        solution.erase_overlap_intervals([
          #(1, 100),
          #(11, 22),
          #(1, 11),
          #(2, 12),
        ]),
      ),
    ),
  ]
}`))}function LB(){return new b(V([["Solution 1","Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier started earlier still, so it would have clashed with that one first. The whole check is then adjacent pairs.",`import gleam/int
import gleam/list

pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool {
  // Sorted by start, the only meeting a given one can clash with is the one
  // immediately before it \\u{2014} anything earlier started earlier still and would
  // have clashed with that one first.
  intervals
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.window_by_2
  |> list.all(fn(pair) { pair.0.1 <= pair.1.0 })
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair, checked. Worth writing once for the overlap test itself: two intervals overlap when each starts before the other ends, which is far easier to get right than trying to enumerate the ways they miss.`,`import gleam/list

pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool {
  // Every pair, checked. Two intervals overlap when each starts before the
  // other ends \\u{2014} the condition worth being able to write from memory, since
  // it is easier to get right than its negation.
  list.combination_pairs(intervals)
  |> list.all(fn(pair) {
    let #(a, b) = pair
    !{ a.0 < b.1 && b.0 < a.1 }
  })
}`]]),new k("pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool",`pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_attend_meetings([#(0, 30), #(5, 10), #(15, 20)])",
      string.inspect(False),
      string.inspect(
        solution.can_attend_meetings([
          #(0, 30),
          #(5, 10),
          #(15, 20),
        ]),
      ),
    ),
    #(
      "can_attend_meetings([#(7, 10), #(2, 4)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(7, 10), #(2, 4)])),
    ),
    #(
      "can_attend_meetings([])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([])),
    ),
    #(
      "can_attend_meetings([#(1, 5)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(1, 5)])),
    ),
    #(
      "can_attend_meetings([#(1, 5), #(5, 10)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(1, 5), #(5, 10)])),
    ),
    #(
      "can_attend_meetings([#(5, 10), #(1, 6)])",
      string.inspect(False),
      string.inspect(solution.can_attend_meetings([#(5, 10), #(1, 6)])),
    ),
  ]
}`))}function BB(){return new b(V([["Solution 1","Rooms needed is the most meetings ever running at once, so the meetings stop mattering and only their edges do: +1 at a start, −1 at an end, and the answer is how high the running count gets. Closes come before opens at the same time here — a room freed at that moment can be reused — which is the opposite of what merging intervals wants.",`import gleam/int
import gleam/list
import gleam/order

pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int {
  // Rooms needed is the most meetings ever running at once, so the meetings
  // themselves stop mattering \\u{2014} only their edges do. Walk the edges in time
  // order and watch how high the count gets.
  intervals
  |> list.flat_map(fn(i) { [#(i.0, 1), #(i.1, -1)] })
  |> list.sort(fn(a, b) {
    // A room freed at the same moment another meeting starts can be reused, so
    // closes come before opens here \\u{2014} the opposite of merging intervals.
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(a.1, b.1)
      other -> other
    }
  })
  |> list.fold(#(0, 0), fn(state, edge) {
    let depth = state.0 + edge.1
    #(depth, int.max(state.1, depth))
  })
  |> fn(state) { state.1 }
}`],["Solution 2 · Count at each start",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

The busiest moment is always the start of some meeting, so only n moments are worth testing at all. Count how many meetings cover each and take the largest: no sort, no edge bookkeeping, and it makes clear what the sweep is measuring.`,`import gleam/list

pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int {
  // The busiest moment is always the start of some meeting, so there are only
  // n moments worth testing. Count how many meetings cover each one and take
  // the largest \\u{2014} O(n\\u{b2}), and it needs no sort and no edge bookkeeping.
  list.fold(intervals, 0, fn(best, meeting) {
    let running =
      list.count(intervals, fn(other) {
        other.0 <= meeting.0 && meeting.0 < other.1
      })
    case running > best {
      True -> running
      False -> best
    }
  })
}`]]),new k("pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int",`pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_meeting_rooms([#(0, 30), #(5, 10), #(15, 20)])",
      string.inspect(2),
      string.inspect(
        solution.min_meeting_rooms([
          #(0, 30),
          #(5, 10),
          #(15, 20),
        ]),
      ),
    ),
    #(
      "min_meeting_rooms([#(7, 10), #(2, 4)])",
      string.inspect(1),
      string.inspect(solution.min_meeting_rooms([#(7, 10), #(2, 4)])),
    ),
    #(
      "min_meeting_rooms([])",
      string.inspect(0),
      string.inspect(solution.min_meeting_rooms([])),
    ),
    #(
      "min_meeting_rooms([#(1, 5), #(5, 10)])",
      string.inspect(1),
      string.inspect(solution.min_meeting_rooms([#(1, 5), #(5, 10)])),
    ),
    #(
      "min_meeting_rooms(six overlapping meetings)",
      string.inspect(4),
      string.inspect(
        solution.min_meeting_rooms([
          #(1, 10),
          #(2, 7),
          #(3, 19),
          #(8, 12),
          #(10, 20),
          #(11, 30),
        ]),
      ),
    ),
  ]
}`))}function PB(){return new b(V([["Solution 1",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each query, the smallest interval containing it. O(q·n), and the definition — worth having before the clever version, because it is what you check the clever version against.`,`import gleam/int
import gleam/list

pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int) {
  list.map(queries, fn(query) {
    intervals
    |> list.filter(fn(i) { i.0 <= query && query <= i.1 })
    |> list.map(fn(i) { i.1 - i.0 + 1 })
    |> list.reduce(int.min)
    |> fn(smallest) {
      case smallest {
        Ok(length) -> length
        Error(Nil) -> -1
      }
    }
  })
}`],["Solution 2 · Offline by length","Answer each query once and never revisit it. Taking the intervals shortest first means the first interval to cover a query is already its answer, so a query leaves the pool the moment it is settled and the pool only shrinks. Reordering the work so each answer is final is the technique here, and it generalises well beyond this problem.",`import gleam/int
import gleam/list

pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int) {
  // Answer each query once, and never revisit it. Taking the intervals shortest
  // first means the first interval to cover a query is already its answer, so
  // every query leaves the pool the moment it is settled and the pool only ever
  // shrinks.
  let numbered = list.index_map(queries, fn(query, index) { #(index, query) })

  let #(answered, unanswered) =
    intervals
    |> list.sort(fn(a, b) { int.compare(a.1 - a.0, b.1 - b.0) })
    |> list.fold(#([], numbered), fn(state, interval) {
      let #(answered, waiting) = state
      let #(covered, still_waiting) =
        list.partition(waiting, fn(entry) {
          interval.0 <= entry.1 && entry.1 <= interval.1
        })
      let length = interval.1 - interval.0 + 1
      #(
        list.append(
          answered,
          list.map(covered, fn(entry) { #(entry.0, length) }),
        ),
        still_waiting,
      )
    })

  let settled =
    list.append(answered, list.map(unanswered, fn(entry) { #(entry.0, -1) }))

  settled
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.map(fn(entry) { entry.1 })
}`]]),new k(`pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int)`,`pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_interval([#(1, 4), #(2, 4), #(3, 6), #(4, 4)], [2, 3, 4, 5])",
      string.inspect([3, 3, 1, 4]),
      string.inspect(
        solution.min_interval([#(1, 4), #(2, 4), #(3, 6), #(4, 4)], [2, 3, 4, 5]),
      ),
    ),
    #(
      "min_interval([#(2, 3), #(2, 5), #(1, 8), #(20, 25)], [2, 19, 5, 22])",
      string.inspect([2, -1, 4, 6]),
      string.inspect(
        solution.min_interval([#(2, 3), #(2, 5), #(1, 8), #(20, 25)], [
          2,
          19,
          5,
          22,
        ]),
      ),
    ),
    #(
      "min_interval([], [1, 2])",
      string.inspect([-1, -1]),
      string.inspect(solution.min_interval([], [1, 2])),
    ),
    #(
      "min_interval([#(1, 10)], [])",
      string.inspect([]),
      string.inspect(solution.min_interval([#(1, 10)], [])),
    ),
    #(
      "min_interval([#(1, 3)], [0, 4])",
      string.inspect([-1, -1]),
      string.inspect(solution.min_interval([#(1, 3)], [0, 4])),
    ),
  ]
}`))}function cY(){return new b(V([["Solution 1","",`pub fn length(items: List(a)) -> Int {
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
}`],["Solution 2 · Stdlib","The same two answers straight from the standard library. Writing the recursion by hand is how you learn the shape; reaching for these is what you actually do afterwards.",`import gleam/list

pub fn length(items: List(a)) -> Int {
  list.length(items)
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  list.last(items)
}`]]),new k(`pub fn length(items: List(a)) -> Int

pub fn last(items: List(a)) -> Result(a, Nil)`,`pub fn length(items: List(a)) -> Int {
  todo
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #("length([1, 2, 3])", string.inspect(3), string.inspect(solution.length([1, 2, 3]))),
    #("length([])", string.inspect(0), string.inspect(solution.length(no_ints))),
    #("last([1, 2, 3])", string.inspect(Ok(3)), string.inspect(solution.last([1, 2, 3]))),
    #(
      "last([])",
      string.inspect(Error(Nil)),
      string.inspect(solution.last(no_ints)),
    ),
  ]
}`))}function pY(){return new b(V([["Solution 1","",`pub fn reverse(items: List(a)) -> List(a) {
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
}`],["Solution 2 · Fold","A fold *is* a tail-recursive loop with a name: the accumulator is the second argument, the step function is the body. Once you see that, most hand-written `*_loop` helpers turn into one line.",`import gleam/list

pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}`]]),new k(`pub fn reverse(items: List(a)) -> List(a)

pub fn sum(numbers: List(Int)) -> Int`,`pub fn reverse(items: List(a)) -> List(a) {
  todo
}

pub fn sum(numbers: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse([1, 2, 3])",
      string.inspect([3, 2, 1]),
      string.inspect(solution.reverse([1, 2, 3])),
    ),
    #(
      "reverse([])",
      string.inspect(no_ints),
      string.inspect(solution.reverse(no_ints)),
    ),
    #("sum([1, 2, 3])", string.inspect(6), string.inspect(solution.sum([1, 2, 3]))),
    #("sum([])", string.inspect(0), string.inspect(solution.sum([]))),
  ]
}`))}function sY(){return new b(V([["Solution 1","",`import gleam/int
import gleam/list

pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
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
}`],["Solution 2 · Explicit recursion","What each fold expands to. Useful to write once so the folded version stops looking like magic — and to notice that `count_if` here is not tail recursive, while the fold always is.",`import gleam/int
import gleam/list

pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(max_loop(rest, first))
  }
}

fn max_loop(numbers: List(Int), best: Int) -> Int {
  case numbers {
    [] -> best
    [n, ..rest] -> max_loop(rest, int.max(best, n))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  case items {
    [] -> 0
    [first, ..rest] ->
      case predicate(first) {
        True -> 1 + count_if(rest, predicate)
        False -> count_if(rest, predicate)
      }
  }
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  running_loop(numbers, 0, [])
}

fn running_loop(numbers: List(Int), total: Int, acc: List(Int)) -> List(Int) {
  case numbers {
    [] -> list.reverse(acc)
    [n, ..rest] -> running_loop(rest, total + n, [total + n, ..acc])
  }
}`]]),new k(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int

pub fn running_total(numbers: List(Int)) -> List(Int)`,`pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  todo
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  todo
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #("max([3, 1, 2])", string.inspect(Ok(3)), string.inspect(solution.max([3, 1, 2]))),
    #("max([])", string.inspect(Error(Nil)), string.inspect(solution.max(no_ints))),
    #(
      "count_if([1, 2, 3, 4], is_even)",
      string.inspect(2),
      string.inspect(solution.count_if([1, 2, 3, 4], fn(n) { n % 2 == 0 })),
    ),
    #(
      "running_total([1, 2, 3])",
      string.inspect([1, 3, 6]),
      string.inspect(solution.running_total([1, 2, 3])),
    ),
  ]
}`))}function dY(){return new b(V([["Solution 1","",`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.fold(dict.new(), fn(counts, word) {
    dict.upsert(counts, word, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`],["Solution 2 · Sorted runs","Group by sorting instead of by lookup: once the words are in order, equal ones are adjacent, so counting is a single pass that never searches for anything. The dictionary is built at the end, from finished pairs.",`import gleam/dict
import gleam/list
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.sort(string.compare)
  |> runs([])
  |> dict.from_list
}

fn runs(
  words: List(String),
  acc: List(#(String, Int)),
) -> List(#(String, Int)) {
  case words, acc {
    [], _ -> acc
    [word, ..rest], [#(current, count), ..tail] if word == current ->
      runs(rest, [#(current, count + 1), ..tail])
    [word, ..rest], _ -> runs(rest, [#(word, 1), ..acc])
  }
}`]]),new k("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  todo
}`,`import gleam/dict
import gleam/list
import gleam/string
import solution

/// Dicts have no meaningful order, so compare a sorted association list.
fn normalise(counts: dict.Dict(String, Int)) -> List(#(String, Int)) {
  counts
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "word_frequencies(\\"the cat and the hat\\")",
      string.inspect([#("and", 1), #("cat", 1), #("hat", 1), #("the", 2)]),
      string.inspect(normalise(solution.word_frequencies("the cat and the hat"))),
    ),
    #(
      "word_frequencies(\\"\\")",
      string.inspect([]),
      string.inspect(normalise(solution.word_frequencies(""))),
    ),
    #(
      "word_frequencies(\\"Go go GO\\")",
      string.inspect([#("go", 3)]),
      string.inspect(normalise(solution.word_frequencies("Go go GO"))),
    ),
  ]
}`))}function iY(){return new b(V([["Solution 1","",`import gleam/int
import gleam/result

pub type Config {
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
}`],["Solution 2 · Nested case","What `use <- result.try` desugars to. Same behaviour, one level of nesting per fallible step — which is exactly the staircase `use` exists to flatten.",`import gleam/int

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  case int.parse(port) {
    Error(Nil) -> Error(Nil)
    Ok(port) ->
      case int.parse(timeout) {
        Error(Nil) -> Error(Nil)
        Ok(timeout) ->
          case host {
            "" -> Error(Nil)
            _ -> Ok(Config(host, port, timeout))
          }
      }
  }
}`]]),new k(`pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil)`,`pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  todo
}`,`import gleam/result
import gleam/string
import solution

/// Compared field-by-field rather than by inspecting the record, so the check does
/// not depend on how the constructor renders. The annotation is required: Gleam
/// cannot infer a record type from field access alone.
fn fields(
  parsed: Result(solution.Config, Nil),
) -> Result(#(String, Int, Int), Nil) {
  result.map(parsed, fn(config) {
    #(config.host, config.port, config.timeout)
  })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "parse_config(\\"localhost\\", \\"8080\\", \\"30\\")",
      string.inspect(Ok(#("localhost", 8080, 30))),
      string.inspect(fields(solution.parse_config("localhost", "8080", "30"))),
    ),
    #(
      "parse_config(\\"localhost\\", \\"oops\\", \\"30\\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("localhost", "oops", "30"))),
    ),
    #(
      "parse_config(\\"\\", \\"8080\\", \\"30\\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("", "8080", "30"))),
    ),
  ]
}`))}function lY(){return new b(V([["Solution 1","",`import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`],["Solution 2 · Case on result","Skipping Option entirely: `dict.get` already returns a Result, so one `case` covers both branches. Converting to Option earns its keep when the value is passed on, not when it is consumed immediately like this.",`import gleam/dict

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}`]]),new k("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
  todo
}`,`import gleam/dict
import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "port_description(dict with port 9000",
      string.inspect("port: 9000 (configured)"),
      string.inspect(
        solution.port_description(dict.from_list([#("port", "9000")])),
      ),
    ),
    #(
      "port_description(empty dict)",
      string.inspect("port: 8080 (default)"),
      string.inspect(solution.port_description(dict.new())),
    ),
  ]
}`))}function rY(){return new b(V([["Solution 1","",`import gleam/list
import gleam/string

pub fn strip_comment(line: String) -> String {
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
}`],["Solution 2 · Prefix functions","The same work with functions rather than string patterns. Patterns bind the remainder for free, which is why they win for prefixes; these read better when the test and the surgery are separate ideas.",`import gleam/list
import gleam/string

pub fn strip_comment(line: String) -> String {
  case string.starts_with(line, "#") {
    True -> line |> string.drop_start(1) |> string.trim_start
    False -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.map(fn(word) { string.slice(word, 0, 1) })
  |> string.concat
  |> string.uppercase
}`]]),new k(`pub fn strip_comment(line: String) -> String

pub fn initials(name: String) -> String`,`pub fn strip_comment(line: String) -> String {
  todo
}

pub fn initials(name: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "strip_comment(\\"# hello\\")",
      string.inspect("hello"),
      string.inspect(solution.strip_comment("# hello")),
    ),
    #(
      "strip_comment(\\"code\\")",
      string.inspect("code"),
      string.inspect(solution.strip_comment("code")),
    ),
    #(
      "initials(\\"ada lovelace\\")",
      string.inspect("AL"),
      string.inspect(solution.initials("ada lovelace")),
    ),
    #(
      "initials(\\"grace brewster murray hopper\\")",
      string.inspect("GBMH"),
      string.inspect(solution.initials("grace brewster murray hopper")),
    ),
  ]
}`))}function aY(){return new b(V([["Solution 1","",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`],["Solution 2 · Nested calls","The same steps without the pipe, and therefore inside out: to read the order of operations you start at `title` in the middle and work outwards. Identical output — the pipe only changes which end you read from.",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}`]]),new k("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "slug(\\"  Hello   Brave World \\")",
      string.inspect("hello-brave-world"),
      string.inspect(solution.slug("  Hello   Brave World ")),
    ),
    #("slug(\\"Gleam\\")", string.inspect("gleam"), string.inspect(solution.slug("Gleam"))),
    #("slug(\\"\\")", string.inspect(""), string.inspect(solution.slug(""))),
  ]
}`))}function tY(){return new b(V([["Solution 1","",`pub type Player {
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
}`],["Solution 2 · Explicit fields","",`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

/// Every field spelled out instead of \`..player\`. More to type, and it stops
/// compiling the moment a field is added — which is occasionally exactly what
/// you want, and usually not.
pub fn add_points(player: Player, points: Int) -> Player {
  Player(name: player.name, score: player.score + points, level: player.level)
}

pub fn level_up(player: Player) -> Player {
  Player(name: player.name, score: 0, level: player.level + 1)
}`]]),new k(`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player

pub fn add_points(player: Player, points: Int) -> Player

pub fn level_up(player: Player) -> Player`,`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  todo
}

pub fn add_points(player: Player, points: Int) -> Player {
  todo
}

pub fn level_up(player: Player) -> Player {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let player = solution.new_player("lucy") |> solution.add_points(10)
  let levelled = solution.level_up(player)

  [
    #(
      "new_player(\\"lucy\\") fields",
      string.inspect(#("lucy", 0, 1)),
      string.inspect({
        let fresh = solution.new_player("lucy")
        #(fresh.name, fresh.score, fresh.level)
      }),
    ),
    #(
      "add_points(player, 10) score",
      string.inspect(10),
      string.inspect(player.score),
    ),
    #(
      "level_up(player) level and score",
      string.inspect(#(2, 0)),
      string.inspect(#(levelled.level, levelled.score)),
    ),
    #("level_up keeps the name", string.inspect("lucy"), string.inspect(levelled.name)),
  ]
}`))}function oY(){return new b(V([["Solution 1","",`import gleam/list
import gleam/set

pub fn dedupe(items: List(a)) -> List(a) {
  let #(kept, _) =
    list.fold(items, #([], set.new()), fn(acc, item) {
      let #(kept, seen) = acc
      case set.contains(seen, item) {
        True -> #(kept, seen)
        False -> #([item, ..kept], set.insert(seen, item))
      }
    })
  list.reverse(kept)
}`],["Solution 2 · List contains","No set: keep what has been accepted and ask that list directly. O(n^2) instead of O(n), but it needs nothing of the element type — and for a handful of items it is the shorter, plainer code.",`import gleam/list

pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}`]]),new k("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "dedupe([1, 2, 1, 3, 2])",
      string.inspect([1, 2, 3]),
      string.inspect(solution.dedupe([1, 2, 1, 3, 2])),
    ),
    #(
      "dedupe([]) ",
      string.inspect(no_ints),
      string.inspect(solution.dedupe(no_ints)),
    ),
    #(
      "dedupe([\\"b\\", \\"a\\", \\"b\\"])",
      string.inspect(["b", "a"]),
      string.inspect(solution.dedupe(["b", "a", "b"])),
    ),
  ]
}`))}function EO(I){if(I==="nc01_contains_duplicate")return new R(uL());else if(I==="nc02_valid_anagram")return new R($L());else if(I==="nc03_two_sum")return new R(mL());else if(I==="nc04_group_anagrams")return new R(vL());else if(I==="nc05_top_k_frequent")return new R(cL());else if(I==="nc06_product_except_self")return new R(pL());else if(I==="nc07_longest_consecutive")return new R(sL());else if(I==="nc08_valid_palindrome")return new R(dL());else if(I==="nc09_two_sum_sorted")return new R(iL());else if(I==="nc10_three_sum")return new R(lL());else if(I==="nc11_container_water")return new R(rL());else if(I==="nc12_best_time_stock")return new R(aL());else if(I==="nc13_longest_substring")return new R(tL());else if(I==="nc14_character_replacement")return new R(oL());else if(I==="nc15_permutation_in_string")return new R(eL());else if(I==="nc16_valid_parentheses")return new R(IB());else if(I==="nc17_min_stack")return new R(ZB());else if(I==="nc18_daily_temperatures")return new R(JB());else if(I==="nc19_binary_search")return new R(QB());else if(I==="nc20_find_min_rotated")return new R(XB());else if(I==="nc21_search_rotated")return new R(YB());else if(I==="nc22_encode_decode")return new R(qB());else if(I==="nc23_valid_sudoku")return new R(KB());else if(I==="nc24_trapping_rain_water")return new R(WB());else if(I==="nc25_min_window_substring")return new R(GB());else if(I==="nc26_sliding_window_maximum")return new R(UB());else if(I==="nc27_eval_rpn")return new R(zB());else if(I==="nc28_generate_parentheses")return new R(VB());else if(I==="nc29_car_fleet")return new R(jB());else if(I==="nc30_largest_rectangle")return new R(OB());else if(I==="nc31_search_2d_matrix")return new R(FB());else if(I==="nc32_koko_bananas")return new R(HB());else if(I==="nc33_time_map")return new R(NB());else if(I==="nc34_median_two_sorted")return new R(RB());else if(I==="nc35_insert_interval")return new R(MB());else if(I==="nc36_merge_intervals")return new R(AB());else if(I==="nc37_non_overlapping")return new R(DB());else if(I==="nc38_meeting_rooms")return new R(LB());else if(I==="nc39_meeting_rooms_ii")return new R(BB());else if(I==="nc40_min_interval")return new R(PB());else if(I==="tip01_list_patterns")return new R(cY());else if(I==="tip02_tail_recursion")return new R(pY());else if(I==="tip03_fold")return new R(sY());else if(I==="tip04_frequency_maps")return new R(dY());else if(I==="tip05_result_chains")return new R(iY());else if(I==="tip06_option")return new R(lY());else if(I==="tip07_string_patterns")return new R(rY());else if(I==="tip08_pipelines")return new R(aY());else if(I==="tip09_records")return new R(tY());else if(I==="tip10_set_dedupe")return new R(oY());else return new V1(void 0)}function I6(I,Z,J){return new h6(I,Z,z7(I),N1(J.solutions,(Q)=>{return new J8(Q[0],Q[1],Q[2])}),fZ,new a(J.check),U1)}function hO(){return new C6("Gleam Tips",V([new j0("Idioms",V([I6("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",cY()),I6("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",pY()),I6("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",sY()),I6("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",dY()),I6("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",iY()),I6("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',lY()),I6("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',rY()),I6("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",aY()),I6("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",tY()),I6("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",oY())]))]))}class O1 extends P{constructor(I,Z,J){super();this.title=I,this.prompt=Z,this.stem=J}}class Q8 extends P{constructor(I,Z){super();this.subcategory=I,this.drills=Z}}var j5="NeetCode 150";function _B(){return V([new Q8("Arrays & Hashing",V([new O1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.","nc01_contains_duplicate"),new O1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.","nc02_valid_anagram"),new O1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.","nc03_two_sum"),new O1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.","nc04_group_anagrams"),new O1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.","nc05_top_k_frequent"),new O1("Encode and Decode Strings","Design an algorithm to encode a list of strings to a single string, and another to decode that string back to the original list. The strings may contain any characters.","nc22_encode_decode"),new O1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.","nc06_product_except_self"),new O1("Valid Sudoku",'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated: each row, each column and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are written ".".',"nc23_valid_sudoku"),new O1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.","nc07_longest_consecutive")])),new Q8("Two Pointers",V([new O1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.","nc08_valid_palindrome"),new O1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.","nc09_two_sum_sorted"),new O1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.","nc10_three_sum"),new O1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.","nc11_container_water"),new O1("Trapping Rain Water","Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.","nc24_trapping_rain_water")])),new Q8("Sliding Window",V([new O1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.","nc12_best_time_stock"),new O1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.","nc13_longest_substring"),new O1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.","nc14_character_replacement"),new O1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.","nc15_permutation_in_string"),new O1("Minimum Window Substring","Given two strings s and t, return the minimum window substring of s that contains every character of t, including duplicates. If there is no such substring, return the empty string.","nc25_min_window_substring"),new O1("Sliding Window Maximum","You are given an array of integers nums and a window of size k sliding from the very left to the very right, one position at a time. Return the maximum in the window at each position.","nc26_sliding_window_maximum")])),new Q8("Intervals",V([new O1("Insert Interval","You are given a list of non-overlapping intervals sorted by start, and one new interval. Insert it so the list stays sorted and non-overlapping, merging where necessary.","nc35_insert_interval"),new O1("Merge Intervals","Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals.","nc36_merge_intervals"),new O1("Non-overlapping Intervals","Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping. Intervals that only touch at a point do not overlap.","nc37_non_overlapping"),new O1("Meeting Rooms","Given an array of meeting time intervals, determine whether a person could attend all of them. A meeting ending exactly as another begins is fine.","nc38_meeting_rooms"),new O1("Meeting Rooms II","Given an array of meeting time intervals, return the minimum number of rooms required to hold them all. A room freed exactly as another meeting begins can be reused.","nc39_meeting_rooms_ii"),new O1("Minimum Interval to Include Each Query","You are given intervals and an array of queries. For each query, return the length of the smallest interval containing it, or -1 if no interval does. An interval's length is end minus start plus one.","nc40_min_interval")])),new Q8("Stack",V([new O1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.","nc16_valid_parentheses"),new O1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.","nc17_min_stack"),new O1("Evaluate Reverse Polish Notation","You are given an array of strings tokens representing an arithmetic expression in Reverse Polish Notation. Evaluate it and return an integer. Division between two integers truncates towards zero.","nc27_eval_rpn"),new O1("Generate Parentheses","Given n pairs of parentheses, generate all combinations of well-formed parentheses. The answer may be returned in any order.","nc28_generate_parentheses"),new O1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.","nc18_daily_temperatures"),new O1("Car Fleet","Cars head to the same destination at target. Car i starts at position[i] with speed[i], and a faster car catching a slower one joins it, moving at the slower speed. Return the number of fleets that arrive.","nc29_car_fleet"),new O1("Largest Rectangle in Histogram","Given an array of integers heights representing a histogram's bar heights, where each bar has width 1, return the area of the largest rectangle in the histogram.","nc30_largest_rectangle")])),new Q8("Binary Search",V([new O1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.","nc19_binary_search"),new O1("Search a 2D Matrix","You are given an m x n integer matrix where each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the row before. Return true if target is in the matrix.","nc31_search_2d_matrix"),new O1("Koko Eating Bananas","Koko has piles of bananas and h hours before the guards return. At a speed of k bananas per hour she eats k from one pile, and if the pile is smaller she eats it and stops for that hour. Return the smallest k that lets her finish in time.","nc32_koko_bananas"),new O1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.","nc20_find_min_rotated"),new O1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.","nc21_search_rotated"),new O1("Time Based Key-Value Store","Design a key-value store that keeps multiple values per key, each stamped with a time. set(key, value, timestamp) stores a value; get(key, timestamp) returns the value set at the largest time no later than timestamp, or the empty string if there is none.","nc33_time_map"),new O1("Median of Two Sorted Arrays","Given two sorted arrays nums1 and nums2, return the median of the two arrays combined.","nc34_median_two_sorted")]))])}function TB(I,Z,J){return H0(J(I.stem),(Q)=>{let X=Q[0],Y=Q[1];return new h6(I.title,I.prompt,z7(I.title),N1(X,(q)=>{return new J8(q[0],q[1],q[2])}),Z,Y,U1)})}function O5(I,Z,J){return new C6(I,(()=>{let Q=_B();return j8(Q,(X)=>{let Y=j8(X.drills,(q)=>{return TB(q,Z,J)});if(Y instanceof y)return new V1(void 0);else{let q=Y;return new R(new j0(X.subcategory,q))}})})())}function EB(){return V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`defmodule Solution do
  def contains_duplicate?(nums) do
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`defmodule Solution do
  def contains_duplicate?(nums) do
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end`]])}function hB(){return V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`defmodule Solution do
  def anagram?(s, t) do
    frequencies(s) == frequencies(t)
  end

  defp frequencies(word) do
    word |> String.graphemes() |> Enum.frequencies()
  end
end`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`defmodule Solution do
  def anagram?(s, t) do
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end`]])}function CB(){return V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`defmodule Solution do
  def two_sum(nums, target) do
    find_pair(Enum.with_index(nums), target, %{})
  end

  defp find_pair([], _target, _seen), do: nil

  defp find_pair([{n, i} | rest], target, seen) do
    # Every earlier number is in \`seen\`, so the complement is one lookup away.
    case Map.fetch(seen, target - n) do
      {:ok, j} -> {j, i}
      :error -> find_pair(rest, target, Map.put(seen, n, i))
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`defmodule Solution do
  def two_sum(nums, target) do
    indexed = Enum.with_index(nums)

    # A comprehension over every ordered pair, stopping at the first hit.
    Enum.find_value(indexed, fn {a, i} ->
      Enum.find_value(indexed, fn {b, j} ->
        if j > i and a + b == target, do: {i, j}
      end)
    end)
  end
end`]])}function wB(){return V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.sort() end)
    |> Map.values()
  end
end`],["Solution 2 · Count key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

A letter tally is anagram-invariant too, and costs O(len) to build rather than O(len log len).`,`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.frequencies() end)
    |> Map.values()
  end
end`]])}function kB(){return V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`defmodule Solution do
  def top_k_frequent(nums, k) do
    nums
    |> Enum.frequencies()
    |> Enum.sort_by(fn {_num, count} -> count end, :desc)
    |> Enum.take(k)
    |> Enum.map(fn {num, _count} -> num end)
  end
end`],["Solution 2 · Bucket sort","A count can never exceed the input length, so one bucket per frequency covers every possibility. Reading the buckets downwards gives the answer in O(n) and replaces the comparison sort entirely.",`defmodule Solution do
  def top_k_frequent(nums, k) do
    buckets =
      nums
      |> Enum.frequencies()
      |> Enum.group_by(fn {_num, count} -> count end, fn {num, _count} -> num end)

    length(nums)..1//-1
    |> Enum.flat_map(fn count -> Map.get(buckets, count, []) end)
    |> Enum.take(k)
  end
end`]])}function bB(){return V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`defmodule Solution do
  def product_except_self(nums) do
    prefixes = nums |> Enum.scan(1, &(&1 * &2)) |> then(&[1 | Enum.drop(&1, -1)])

    suffixes =
      nums
      |> Enum.reverse()
      |> Enum.scan(1, &(&1 * &2))
      |> then(&[1 | Enum.drop(&1, -1)])
      |> Enum.reverse()

    Enum.zip_with(prefixes, suffixes, &(&1 * &2))
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`defmodule Solution do
  def product_except_self(nums) do
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end`]])}function yB(){return V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`defmodule Solution do
  def longest_consecutive(nums) do
    all = MapSet.new(nums)

    all
    |> Enum.reject(fn n -> MapSet.member?(all, n - 1) end)
    |> Enum.map(fn start -> run_length(all, start, 0) end)
    |> Enum.max(fn -> 0 end)
  end

  # Only runs counted from their first element, so each run is walked once.
  defp run_length(all, n, count) do
    if MapSet.member?(all, n), do: run_length(all, n + 1, count + 1), else: count
  end
end`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`defmodule Solution do
  def longest_consecutive(nums) do
    case Enum.sort(nums) do
      [] ->
        0

      [first | rest] ->
        {_previous, _run, best} =
          Enum.reduce(rest, {first, 1, 1}, fn n, {previous, run, best} ->
            case n - previous do
              0 -> {previous, run, best}
              1 -> {n, run + 1, max(best, run + 1)}
              _ -> {n, 1, best}
            end
          end)

        best
    end
  end
end`]])}function xB(){return V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`defmodule Solution do
  def palindrome?(s) do
    cleaned = clean(s)
    cleaned == Enum.reverse(cleaned)
  end

  defp clean(s) do
    s
    |> String.downcase()
    |> String.graphemes()
    |> Enum.filter(&(&1 =~ ~r/^[a-z0-9]$/))
  end
end`],["Solution 2 · Two pointers","Compare inwards from both ends, skipping anything that is not alphanumeric as you go. No second string is built.",`defmodule Solution do
  def palindrome?(s) do
    cleaned =
      s
      |> String.downcase()
      |> String.replace(~r/[^a-z0-9]/, "")
      |> String.graphemes()

    converge(cleaned, Enum.reverse(cleaned), div(length(cleaned), 2))
  end

  defp converge(_forward, _backward, 0), do: true

  defp converge([a | forward], [b | backward], remaining) do
    a == b and converge(forward, backward, remaining - 1)
  end
end`]])}function nB(){return V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    converge(numbers, Enum.reverse(numbers), 1, length(numbers), target)
  end

  defp converge(_left, _right, low, high, _target) when low >= high, do: nil

  defp converge([a | left], [b | right], low, high, target) do
    case a + b do
      ^target -> {low, high}
      sum when sum < target -> converge(left, [b | right], low + 1, high, target)
      _ -> converge([a | left], right, low, high - 1, target)
    end
  end
end`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    tuple = List.to_tuple(numbers)

    Enum.find_value(0..(tuple_size(tuple) - 1)//1, fn i ->
      case search(tuple, target - elem(tuple, i), i + 1, tuple_size(tuple) - 1) do
        nil -> nil
        j -> {i + 1, j + 1}
      end
    end)
  end

  defp search(_tuple, _wanted, low, high) when low > high, do: nil

  defp search(tuple, wanted, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^wanted -> mid
      value when value < wanted -> search(tuple, wanted, mid + 1, high)
      _ -> search(tuple, wanted, low, mid - 1)
    end
  end
end`]])}function gB(){return V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`defmodule Solution do
  def three_sum(nums) do
    sorted = Enum.sort(nums)

    sorted
    |> Enum.with_index()
    |> Enum.flat_map(fn {a, i} ->
      rest = Enum.drop(sorted, i + 1)
      Enum.map(pairs_summing_to(rest, Enum.reverse(rest), length(rest), -a), fn {b, c} ->
        {a, b, c}
      end)
    end)
    |> Enum.uniq()
  end

  defp pairs_summing_to(_left, _right, remaining, _target) when remaining < 2, do: []

  defp pairs_summing_to([a | left], [b | right], remaining, target) do
    case a + b do
      ^target ->
        [{a, b} | pairs_summing_to(left, [b | right], remaining - 1, target)]

      sum when sum < target ->
        pairs_summing_to(left, [b | right], remaining - 1, target)

      _ ->
        pairs_summing_to([a | left], right, remaining - 1, target)
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`defmodule Solution do
  def three_sum(nums) do
    indexed = nums |> Enum.sort() |> Enum.with_index()

    triples =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          {c, k} <- indexed,
          i < j and j < k,
          a + b + c == 0,
          do: {a, b, c}

    Enum.uniq(triples)
  end
end`]])}function fB(){return V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`defmodule Solution do
  def max_area(heights) do
    converge(heights, Enum.reverse(heights), length(heights) - 1, 0)
  end

  defp converge(_left, _right, width, best) when width <= 0, do: best

  defp converge([a | left], [b | right], width, best) do
    # Moving the taller line in can never help: the shorter one caps the area.
    best = max(best, min(a, b) * width)

    if a < b do
      converge(left, [b | right], width - 1, best)
    else
      converge([a | left], right, width - 1, best)
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`defmodule Solution do
  def max_area(heights) do
    indexed = Enum.with_index(heights)

    areas =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          j > i,
          do: min(a, b) * (j - i)

    Enum.max([0 | areas])
  end
end`]])}function uB(){return V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`defmodule Solution do
  def max_profit(prices) do
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`defmodule Solution do
  def max_profit(prices) do
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end`]])}function $B(){return V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`defmodule Solution do
  def length_of_longest_substring(s) do
    {_last_seen, _start, best} =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.reduce({%{}, 0, 0}, fn {g, i}, {last_seen, start, best} ->
        # A repeat inside the window moves the window past the earlier copy.
        start =
          case Map.fetch(last_seen, g) do
            {:ok, j} when j >= start -> j + 1
            _ -> start
          end

        {Map.put(last_seen, g, i), start, max(best, i - start + 1)}
      end)

    best
  end
end`],["Solution 2 · Shrinking window","The window itself is the bookkeeping: on a repeat, drop everything up to and including the earlier copy. No last-seen map at all, at the cost of scanning the window on each repeat.",`defmodule Solution do
  def length_of_longest_substring(s) do
    {_window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({[], 0}, fn g, {window, best} ->
        window = if g in window, do: drop_through(window, g), else: window
        window = window ++ [g]
        {window, max(best, length(window))}
      end)

    best
  end

  defp drop_through([g | rest], g), do: rest
  defp drop_through([_other | rest], g), do: drop_through(rest, g)
  defp drop_through([], _g), do: []
end`]])}function mB(){return V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`defmodule Solution do
  def character_replacement(s, k) do
    {_counts, _window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({%{}, [], 0}, fn g, {counts, window, best} ->
        counts = Map.update(counts, g, 1, &(&1 + 1))
        {counts, window} = shrink(counts, window ++ [g], k)
        {counts, window, max(best, length(window))}
      end)

    best
  end

  # The window is legal while everything that is not the commonest character
  # fits inside the k replacements.
  defp shrink(counts, window, k) do
    commonest = counts |> Map.values() |> Enum.max(fn -> 0 end)

    if length(window) - commonest > k do
      [oldest | rest] = window
      shrink(Map.update!(counts, oldest, &(&1 - 1)), rest, k)
    else
      {counts, window}
    end
  end
end`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`defmodule Solution do
  @alphabet String.graphemes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def character_replacement(s, k) do
    graphemes = String.graphemes(s)
    Enum.reduce(@alphabet, 0, fn target, best -> max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k)) end)
  end

  defp sweep(_left, [], _size, _others, best, _target, _k), do: best

  defp sweep(left, [g | rest], size, others, best, target, k) do
    others = if g == target, do: others, else: others + 1
    {left, size, others} = shrink(left, size + 1, others, target, k)
    sweep(left, rest, size, others, max(best, size), target, k)
  end

  defp shrink([oldest | rest], size, others, target, k) when others > k do
    others = if oldest == target, do: others, else: others - 1
    shrink(rest, size - 1, others, target, k)
  end

  defp shrink(left, size, others, _target, _k), do: {left, size, others}
end`]])}function vB(){return V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`defmodule Solution do
  def inclusion?(s1, s2) do
    need = s1 |> String.graphemes() |> Enum.frequencies()
    size = String.length(s1)
    graphemes = String.graphemes(s2)

    if size > length(graphemes) do
      false
    else
      slide(graphemes, Enum.drop(graphemes, size),
            graphemes |> Enum.take(size) |> Enum.frequencies(), need)
    end
  end

  defp slide(_oldest, _upcoming, window, need) when window == need, do: true
  defp slide(_oldest, [], _window, _need), do: false

  defp slide([out | oldest], [into | upcoming], window, need) do
    window =
      window
      |> Map.update!(out, &(&1 - 1))
      |> then(fn counts -> if counts[out] == 0, do: Map.delete(counts, out), else: counts end)
      |> Map.update(into, 1, &(&1 + 1))

    slide(oldest, upcoming, window, need)
  end
end`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`defmodule Solution do
  def inclusion?(s1, s2) do
    needle = s1 |> String.graphemes() |> Enum.sort()
    size = length(needle)
    graphemes = String.graphemes(s2)

    cond do
      size == 0 -> true
      size > length(graphemes) -> false
      true -> graphemes |> Enum.chunk_every(size, 1, :discard) |> Enum.any?(&(Enum.sort(&1) == needle))
    end
  end
end`]])}function cB(){return V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`defmodule Solution do
  @closers %{"(" => ")", "[" => "]", "{" => "}"}

  def valid?(s) do
    s |> String.graphemes() |> check([])
  end

  defp check([], stack), do: stack == []

  defp check([g | rest], stack) do
    case {Map.fetch(@closers, g), stack} do
      {{:ok, closer}, _} -> check(rest, [closer | stack])
      {:error, [^g | tail]} -> check(rest, tail)
      _ -> false
    end
  end
end`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`defmodule Solution do
  def valid?(s) do
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end`]])}function pB(){return V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`defmodule Solution do
  # Immutable, so the "stack" is a value that each operation returns a new
  # version of. Each entry carries the minimum of everything at or below it.
  def new, do: []

  def push(stack, value) do
    smallest =
      case stack do
        [{_value, current} | _] -> min(value, current)
        [] -> value
      end

    [{value, smallest} | stack]
  end

  def pop([_top | rest]), do: rest
  def pop([]), do: []

  def top([{value, _min} | _]), do: value
  def top([]), do: nil

  def get_min([{_value, minimum} | _]), do: minimum
  def get_min([]), do: nil
end`],["Solution 2 · Two stacks","Values in one stack, running minimums in a parallel one. The two concerns stay separate, which is what makes adding a max stack a copy-paste.",`defmodule Solution do
  # Values in one list, running minimums in a parallel one. The two concerns
  # stay separate, which is what makes adding a max stack a copy-paste.
  def new, do: {[], []}

  def push({values, minimums}, value) do
    smallest =
      case minimums do
        [current | _] -> min(value, current)
        [] -> value
      end

    {[value | values], [smallest | minimums]}
  end

  def pop({[_v | values], [_m | minimums]}), do: {values, minimums}
  def pop(empty), do: empty

  def top({[value | _], _minimums}), do: value
  def top({[], _minimums}), do: nil

  def get_min({_values, [minimum | _]}), do: minimum
  def get_min({_values, []}), do: nil
end`]])}function sB(){return V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`defmodule Solution do
  def daily_temperatures(temps) do
    {answers, _stack} =
      temps
      |> Enum.with_index()
      |> Enum.reduce({%{}, []}, fn {temp, i}, {answers, stack} ->
        {answers, stack} = resolve(answers, stack, temp, i)
        {answers, [{i, temp} | stack]}
      end)

    Enum.map(0..(length(temps) - 1)//1, fn i -> Map.get(answers, i, 0) end)
  end

  defp resolve(answers, [{j, colder} | rest], temp, i) when colder < temp do
    resolve(Map.put(answers, j, i - j), rest, temp, i)
  end

  defp resolve(answers, stack, _temp, _i), do: {answers, stack}
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`defmodule Solution do
  def daily_temperatures(temps) do
    temps
    |> Enum.with_index()
    |> Enum.map(fn {temp, i} ->
      case Enum.find_index(Enum.drop(temps, i + 1), &(&1 > temp)) do
        nil -> 0
        offset -> offset + 1
      end
    end)
  end
end`]])}function dB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`defmodule Solution do
  def search(nums, target) do
    halve(List.to_tuple(nums), target, 0, length(nums) - 1)
  end

  defp halve(_tuple, _target, low, high) when low > high, do: nil

  defp halve(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> halve(tuple, target, mid + 1, high)
      _ -> halve(tuple, target, low, mid - 1)
    end
  end
end`],["Solution 2 · First match scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A plain indexed scan. O(n), so it fails the stated requirement — but it is what the halving has to beat, and it shows exactly what the sortedness buys.`,`defmodule Solution do
  def search(nums, target) do
    Enum.find_index(nums, &(&1 == target))
  end
end`]])}function iB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`defmodule Solution do
  def find_min([]), do: nil

  def find_min(nums) do
    tuple = List.to_tuple(nums)
    narrow(tuple, 0, tuple_size(tuple) - 1)
  end

  defp narrow(tuple, low, high) when low >= high, do: elem(tuple, low)

  defp narrow(tuple, low, high) do
    mid = div(low + high, 2)

    # Anything past a value larger than the last element is still on the high
    # side of the rotation.
    if elem(tuple, mid) > elem(tuple, high) do
      narrow(tuple, mid + 1, high)
    else
      narrow(tuple, low, mid)
    end
  end
end`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`defmodule Solution do
  def find_min([]), do: nil

  def find_min([head | rest]) do
    # O(n), but it makes the shape obvious: a rotated sorted list drops exactly
    # once, and that drop is the minimum. No drop means it was never rotated.
    scan(rest, head, head)
  end

  defp scan([], _previous, head), do: head

  defp scan([n | rest], previous, head) do
    if n < previous, do: n, else: scan(rest, n, head)
  end
end`]])}function lB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`defmodule Solution do
  def search_rotated(nums, target) do
    halve(List.to_tuple(nums), target, 0, length(nums) - 1)
  end

  defp halve(_tuple, _target, low, high) when low > high, do: nil

  defp halve(tuple, target, low, high) do
    mid = div(low + high, 2)
    value = elem(tuple, mid)

    cond do
      value == target ->
        mid

      elem(tuple, low) <= value ->
        # Left half is sorted, so the target's membership in it is a range test.
        if elem(tuple, low) <= target and target < value,
          do: halve(tuple, target, low, mid - 1),
          else: halve(tuple, target, mid + 1, high)

      true ->
        if value < target and target <= elem(tuple, high),
          do: halve(tuple, target, mid + 1, high),
          else: halve(tuple, target, low, mid - 1)
    end
  end
end`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`defmodule Solution do
  def search_rotated(nums, target) do
    tuple = List.to_tuple(nums)
    pivot = rotation_point(nums)
    size = tuple_size(tuple)

    case search(tuple, target, 0, pivot - 1) do
      nil -> search(tuple, target, pivot, size - 1)
      index -> index
    end
  end

  defp rotation_point([]), do: 0

  defp rotation_point([head | rest]) do
    rest
    |> Enum.with_index(1)
    |> Enum.reduce_while({head, 0}, fn {n, i}, {previous, _pivot} ->
      if n < previous, do: {:halt, {n, i}}, else: {:cont, {n, 0}}
    end)
    |> elem(1)
  end

  defp search(_tuple, _target, low, high) when low > high, do: nil

  defp search(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> search(tuple, target, mid + 1, high)
      _ -> search(tuple, target, low, mid - 1)
    end
  end
end`]])}function rB(){return V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
defmodule Solution do
  def encode(strs) do
    Enum.map_join(strs, fn s -> "#{String.length(s)}##{s}" end)
  end

  def decode(s), do: read(s, [])

  defp read("", acc), do: Enum.reverse(acc)

  defp read(rest, acc) do
    [digits, tail] = String.split(rest, "#", parts: 2)
    length = String.to_integer(digits)
    read(String.slice(tail, length..-1//1), [String.slice(tail, 0, length) | acc])
  end
end`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
defmodule Solution do
  @separator "|"
  @escape "\\\\"

  def encode(strs) do
    Enum.map_join(strs, fn s ->
      @separator <>
        (s
         |> String.replace(@escape, @escape <> @escape)
         |> String.replace(@separator, @escape <> @separator))
    end)
  end

  # The leading separator is what tells [] and [""] apart: one encodes to the
  # empty string, the other to a lone separator.
  def decode(""), do: []

  def decode(@separator <> rest), do: unescape(String.graphemes(rest), "", [])

  def decode(_), do: []

  defp unescape([], current, acc), do: Enum.reverse([current | acc])

  defp unescape([@escape, escaped | rest], current, acc),
    do: unescape(rest, current <> escaped, acc)

  defp unescape([@separator | rest], current, acc),
    do: unescape(rest, "", [current | acc])

  defp unescape([g | rest], current, acc), do: unescape(rest, current <> g, acc)
end`]])}function aB(){return V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`defmodule Solution do
  def valid_sudoku?(board) do
    board
    |> filled_cells()
    |> Enum.reduce_while(MapSet.new(), fn {r, c, value}, seen ->
      keys = [
        "#{value} row #{r}",
        "#{value} col #{c}",
        "#{value} box #{div(r, 3) * 3 + div(c, 3)}"
      ]

      if Enum.any?(keys, &MapSet.member?(seen, &1)) do
        {:halt, false}
      else
        {:cont, Enum.into(keys, seen)}
      end
    end)
    |> then(fn result -> result != false end)
  end

  defp filled_cells(board) do
    board
    |> Enum.with_index()
    |> Enum.flat_map(fn {row, r} ->
      row
      |> Enum.with_index()
      |> Enum.reject(fn {value, _c} -> value == "." end)
      |> Enum.map(fn {value, c} -> {r, c, value} end)
    end)
  end
end`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`defmodule Solution do
  def valid_sudoku?(board), do: Enum.all?(units(board), &no_duplicates?/1)

  defp units(board), do: board ++ transpose(board) ++ boxes(board)

  defp transpose(rows), do: Enum.zip_with(rows, & &1)

  defp boxes(board) do
    board
    |> Enum.chunk_every(3)
    |> Enum.flat_map(fn band ->
      band
      |> Enum.map(&Enum.chunk_every(&1, 3))
      |> transpose()
      |> Enum.map(&List.flatten/1)
    end)
  end

  defp no_duplicates?(unit) do
    filled = Enum.reject(unit, &(&1 == "."))
    length(filled) == MapSet.size(MapSet.new(filled))
  end
end`]])}function tB(){return V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`defmodule Solution do
  def trap(height) do
    walk(height, Enum.reverse(height), length(height) - 1, 0, 0, 0)
  end

  # The two pointers are the list read from the front and the list read from the
  # back; \`remaining\` stands in for "left < right", since neither end knows
  # where the other has got to.
  defp walk(_front, _back, remaining, _left_max, _right_max, total)
       when remaining <= 0,
       do: total

  defp walk([l | front_rest] = front, [r | back_rest] = back, remaining, left_max, right_max, total) do
    if l < r do
      left_max = max(left_max, l)
      walk(front_rest, back, remaining - 1, left_max, right_max, total + left_max - l)
    else
      right_max = max(right_max, r)
      walk(front, back_rest, remaining - 1, left_max, right_max, total + right_max - r)
    end
  end
end`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`defmodule Solution do
  def trap(height) do
    left = running_max(height)
    right = height |> Enum.reverse() |> running_max() |> Enum.reverse()

    [left, right, height]
    |> Enum.zip_with(fn [l, r, h] -> min(l, r) - h end)
    |> Enum.sum()
  end

  defp running_max(values), do: Enum.scan(values, 0, &max/2)
end`]])}function oB(){return V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    graphemes = String.graphemes(s)
    need = Enum.frequencies(String.graphemes(t))

    case scan(graphemes, 0, graphemes, 0, need, String.length(t), {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # The window is the gap between two views of the same list: \`right\` is what
  # has not been taken in yet, \`left\` is everything from the window's start
  # onwards. Advancing either end is one list head.
  #
  # This clause matches only while nothing is missing, so the window is valid:
  # record it, then give a character back from the left.
  defp scan(right, right_index, [c | left_rest], left_index, counts, 0, best) do
    length = right_index - left_index

    best =
      if elem(best, 1) == 0 or length < elem(best, 1),
        do: {left_index, length},
        else: best

    raised = Map.get(counts, c, 0) + 1

    scan(
      right,
      right_index,
      left_rest,
      left_index + 1,
      Map.put(counts, c, raised),
      if(raised > 0, do: 1, else: 0),
      best
    )
  end

  defp scan([], _right_index, _left, _left_index, _counts, _missing, best), do: best

  defp scan([c | right_rest], right_index, left, left_index, counts, missing, best) do
    current = Map.get(counts, c, 0)

    scan(
      right_rest,
      right_index + 1,
      left,
      left_index,
      Map.put(counts, c, current - 1),
      if(current > 0, do: missing - 1, else: missing),
      best
    )
  end
end`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    need = Enum.frequencies(String.graphemes(t))

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.filter(fn {c, _i} -> Map.has_key?(need, c) end)
      |> Enum.map(fn {c, i} -> {i, c} end)

    case scan(positions, positions, need, %{}, 0, map_size(need), -1, {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # Counts how many of the needle's distinct characters are fully covered,
  # rather than how many characters are still missing. Same window, different
  # bookkeeping: \`satisfied\` only moves when a count crosses its requirement.
  defp scan(right, left, need, window, satisfied, distinct, last_index, best)

  defp scan(right, [{start, c} | left_rest], need, window, satisfied, distinct, last_index, best)
       when satisfied == distinct do
    length = last_index - start + 1

    best =
      if elem(best, 1) == 0 or length < elem(best, 1), do: {start, length}, else: best

    lowered = Map.get(window, c, 0) - 1

    scan(
      right,
      left_rest,
      need,
      Map.put(window, c, lowered),
      if(lowered < Map.get(need, c, 0), do: satisfied - 1, else: satisfied),
      distinct,
      last_index,
      best
    )
  end

  defp scan([], _left, _need, _window, _satisfied, _distinct, _last_index, best), do: best

  defp scan([{index, c} | right_rest], left, need, window, satisfied, distinct, _last, best) do
    raised = Map.get(window, c, 0) + 1

    scan(
      right_rest,
      left,
      need,
      Map.put(window, c, raised),
      if(raised == Map.get(need, c, 0), do: satisfied + 1, else: satisfied),
      distinct,
      index,
      best
    )
  end
end`]])}function eB(){return V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    blocks = Enum.chunk_every(nums, k)
    left = Enum.flat_map(blocks, &running_max/1)

    right =
      Enum.flat_map(blocks, fn block ->
        block |> Enum.reverse() |> running_max() |> Enum.reverse()
      end)

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    [right, Enum.drop(left, k - 1)]
    |> Enum.zip_with(fn [r, l] -> max(r, l) end)
  end

  # Seeded with the first element rather than zero: the values can be negative.
  defp running_max([]), do: []
  defp running_max([first | rest]), do: [first | Enum.scan(rest, first, &max/2)]
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    nums
    |> Enum.chunk_every(k, 1, :discard)
    |> Enum.map(&Enum.max/1)
  end
end`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    values = List.to_tuple(nums)

    {_window, out} =
      nums
      |> Enum.with_index()
      |> Enum.reduce({:queue.new(), []}, fn {num, i}, {window, out} ->
        window =
          window
          |> drop_smaller(num, values)
          |> then(&:queue.in(i, &1))
          |> drop_expired(i - k)

        {window, if(i >= k - 1, do: [elem(values, front(window)) | out], else: out)}
      end)

    Enum.reverse(out)
  end

  # Erlang's :queue rather than a list: this needs both ends, and a list only
  # gives one of them cheaply.
  defp drop_smaller(window, num, values) do
    case :queue.out_r(window) do
      {{:value, index}, rest} ->
        if elem(values, index) <= num, do: drop_smaller(rest, num, values), else: window

      {:empty, _} ->
        window
    end
  end

  defp drop_expired(window, limit) do
    case :queue.peek(window) do
      {:value, index} when index <= limit -> :queue.drop(window)
      _ -> window
    end
  end

  defp front(window) do
    {:value, index} = :queue.peek(window)
    index
  end
end`]])}function IP(){return V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`defmodule Solution do
  def eval_rpn(tokens) do
    case Enum.reduce(tokens, [], &step/2) do
      [answer | _] -> answer
      [] -> 0
    end
  end

  # Erlang's div already truncates towards zero, which is what the problem asks
  # for and what a flooring division does not do for negatives.
  defp step("+", [b, a | rest]), do: [a + b | rest]
  defp step("-", [b, a | rest]), do: [a - b | rest]
  defp step("*", [b, a | rest]), do: [a * b | rest]
  defp step("/", [b, a | rest]), do: [div(a, b) | rest]
  defp step(token, stack), do: [String.to_integer(token) | stack]
end`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`defmodule Solution do
  def eval_rpn(tokens) do
    {value, _rest} = take(Enum.reverse(tokens))
    value
  end

  # Read right to left: the last token is the outermost operator, and each
  # operator takes its right operand first because that is what sits nearer the
  # end. Returns the value and whatever is left to read.
  defp take([token | tail]) when token in ["+", "-", "*", "/"] do
    {right, tail} = take(tail)
    {left, tail} = take(tail)
    {apply_operator(token, left, right), tail}
  end

  defp take([token | tail]), do: {String.to_integer(token), tail}

  defp take([]), do: {0, []}

  defp apply_operator("+", a, b), do: a + b
  defp apply_operator("-", a, b), do: a - b
  defp apply_operator("*", a, b), do: a * b
  defp apply_operator("/", a, b), do: div(a, b)
end`]])}function ZP(){return V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`defmodule Solution do
  def generate_parenthesis(n), do: Enum.reverse(build(n, n, "", []))

  # Two counters, one rule each: an opener is legal while any are left, and a
  # closer is legal only while more are outstanding than openers. Everything
  # reached with both at zero is valid by construction.
  defp build(0, 0, current, acc), do: [current | acc]

  defp build(open, close, current, acc) do
    acc = if open > 0, do: build(open - 1, close, current <> "(", acc), else: acc
    if close > open, do: build(open, close - 1, current <> ")", acc), else: acc
  end
end`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`defmodule Solution do
  def generate_parenthesis(n), do: compose(n)

  # Every non-empty balanced string is "(" <> a <> ")" <> b for exactly one
  # split: a is whatever the first bracket encloses, b is whatever follows it.
  # Enumerating the splits enumerates the strings, with no validity rule to
  # check at all.
  defp compose(n) when n <= 0, do: [""]

  defp compose(n) do
    for inner <- 0..(n - 1),
        a <- compose(inner),
        b <- compose(n - 1 - inner),
        do: "(" <> a <> ")" <> b
  end
end`]])}function JP(){return V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`defmodule Solution do
  def car_fleet(target, position, speed) do
    {fleets, _lead_distance, _lead_speed} =
      position
      |> Enum.zip(speed)
      |> Enum.sort_by(fn {pos, _spd} -> pos end, :desc)
      |> Enum.reduce({0, 0, 1}, fn {pos, spd}, {fleets, lead_distance, lead_speed} ->
        distance = target - pos

        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd do
          {fleets + 1, distance, spd}
        else
          {fleets, lead_distance, lead_speed}
        end
      end)

    fleets
  end
end`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`defmodule Solution do
  def car_fleet(target, position, speed) do
    cars = Enum.zip(position, speed)
    Enum.count(cars, &leads?(&1, cars, target))
  end

  # A car leads a fleet exactly when it arrives strictly later than every car
  # ahead of it; anything else means it catches one of them and merges. No
  # sorting, no running state -- O(n^2), and the definition rather than a
  # consequence of it.
  defp leads?({pos, spd}, cars, target) do
    cars
    |> Enum.filter(fn {other_pos, _} -> other_pos > pos end)
    |> Enum.all?(fn {other_pos, other_speed} ->
      (target - pos) * other_speed > (target - other_pos) * spd
    end)
  end
end`]])}function QP(){return V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`defmodule Solution do
  def largest_rectangle_area(heights) do
    n = length(heights)

    {stack, best} =
      heights
      |> Enum.with_index()
      |> Enum.reduce({[], 0}, fn {h, i}, {stack, best} ->
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        {stack, best, start} = close_taller(stack, h, i, best, i)
        {[{start, h} | stack], best}
      end)

    # Whatever survives was never cut off, so it runs to the far end.
    Enum.reduce(stack, best, fn {from, tall}, best -> max(best, tall * (n - from)) end)
  end

  defp close_taller([{from, tall} | rest], height, index, best, _start) when tall > height do
    close_taller(rest, height, index, max(best, tall * (index - from)), from)
  end

  defp close_taller(stack, _height, _index, best, start), do: {stack, best, start}
end`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`defmodule Solution do
  def largest_rectangle_area(heights) do
    indexed = Enum.with_index(heights)

    Enum.reduce(indexed, 0, fn {h, i}, best ->
      # How far this bar's own height can spread in each direction. O(n^2), and
      # the definition of the answer: every rectangle is some bar taken as far
      # as it will go.
      left =
        indexed
        |> Enum.take(i)
        |> Enum.reverse()
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      right =
        indexed
        |> Enum.drop(i + 1)
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      max(best, h * (left + right + 1))
    end)
  end
end`]])}function XP(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`defmodule Solution do
  def search_matrix(matrix, target) do
    case find_row(List.to_tuple(matrix), target, 0, length(matrix) - 1) do
      nil -> false
      row -> contains?(List.to_tuple(row), target, 0, length(row) - 1)
    end
  end

  # The rows are sorted and do not overlap, so the row a value could live in is
  # itself found by halving: compare the target against a row's ends.
  defp find_row(_rows, _target, low, high) when low > high, do: nil

  defp find_row(rows, target, low, high) do
    mid = div(low + high, 2)
    row = elem(rows, mid)

    cond do
      List.last(row) < target -> find_row(rows, target, mid + 1, high)
      hd(row) > target -> find_row(rows, target, low, mid - 1)
      true -> row
    end
  end

  defp contains?(_row, _target, low, high) when low > high, do: false

  defp contains?(row, target, low, high) do
    mid = div(low + high, 2)

    cond do
      elem(row, mid) == target -> true
      elem(row, mid) < target -> contains?(row, target, mid + 1, high)
      true -> contains?(row, target, low, mid - 1)
    end
  end
end`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`defmodule Solution do
  def search_matrix([], _target), do: false
  def search_matrix([[] | _], _target), do: false

  def search_matrix(matrix, target) do
    width = length(hd(matrix))
    walk(matrix, width, target)
  end

  # From the top-right corner every step is forced: too big and the whole column
  # is too big, so drop it; too small and the whole row is too small, so drop
  # that. O(m + n), and it never uses the fact that rows do not overlap -- it
  # works on any matrix sorted along both axes.
  defp walk([], _column, _target), do: false
  defp walk(_rows, column, _target) when column <= 0, do: false

  defp walk([row | below] = rows, column, target) do
    value = Enum.at(row, column - 1)

    cond do
      value == target -> true
      value > target -> walk(rows, column - 1, target)
      true -> walk(below, column, target)
    end
  end
end`]])}function YP(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`defmodule Solution do
  def min_eating_speed(piles, h), do: search(piles, h, 1, Enum.max(piles))

  # The search space is the answer, not the input. Feasibility is monotone -- if
  # a speed finishes in time then so does every faster one -- which is exactly
  # the property halving needs.
  defp search(_piles, _h, low, high) when low >= high, do: low

  defp search(piles, h, low, high) do
    mid = div(low + high, 2)

    if hours(piles, mid) <= h,
      do: search(piles, h, low, mid),
      else: search(piles, h, mid + 1, high)
  end

  # A pile never shares an hour with another, so each costs ceil(pile / speed).
  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`defmodule Solution do
  def min_eating_speed(piles, h), do: climb(piles, h, 1, Enum.max(piles))

  defp climb(piles, h, speed, highest) do
    if speed >= highest or hours(piles, speed) <= h,
      do: speed,
      else: climb(piles, h, speed + 1, highest)
  end

  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end`]])}function qP(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`defmodule Solution do
  # Immutable, so the store is a value that set returns a new version of.
  def new, do: %{}

  # Timestamps only ever increase, so prepending keeps each key's history sorted
  # newest first for free.
  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  def get(store, key, timestamp) do
    case Map.get(store, key) do
      nil -> ""
      history -> newest_at_most(List.to_tuple(history), timestamp, 0, length(history) - 1)
    end
  end

  # The history is sorted newest first, so the newest entry at or before a
  # timestamp is a halving question, not a walk.
  defp newest_at_most(_history, _timestamp, low, high) when low > high, do: ""

  defp newest_at_most(history, timestamp, low, high) do
    mid = div(low + high, 2)
    {stamp, value} = elem(history, mid)

    if stamp <= timestamp do
      case newest_at_most(history, timestamp, low, mid - 1) do
        "" -> value
        newer -> newer
      end
    else
      newest_at_most(history, timestamp, mid + 1, high)
    end
  end
end`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`defmodule Solution do
  def new, do: %{}

  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  # Newest first, so the first entry old enough is the answer. O(n) per lookup
  # against the halving version's O(log n), but there is no split arithmetic to
  # get wrong.
  def get(store, key, timestamp) do
    store
    |> Map.get(key, [])
    |> Enum.find_value("", fn {stamp, value} -> if stamp <= timestamp, do: value end)
  end
end`]])}function KP(){return V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    total = length(nums1) + length(nums2)
    {previous, current} = advance(nums1, nums2, div(total, 2) + 1, 0, 0)

    if rem(total, 2) == 1, do: current / 1, else: (previous + current) / 2
  end

  # Merge, but stop at the middle and keep only the last two values seen: the
  # merged list is never built, so this is O(m + n) time and no extra space.
  defp advance(_a, _b, steps, previous, current) when steps <= 0, do: {previous, current}
  defp advance([], [], _steps, previous, current), do: {previous, current}

  defp advance([x | rest], [y | _] = b, steps, _previous, current) when x <= y,
    do: advance(rest, b, steps - 1, current, x)

  defp advance([x | rest], [], steps, _previous, current),
    do: advance(rest, [], steps - 1, current, x)

  defp advance(a, [y | rest], steps, _previous, current),
    do: advance(a, rest, steps - 1, current, y)
end`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    merged = Enum.sort(nums1 ++ nums2)
    total = length(merged)

    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    (Enum.at(merged, div(total, 2)) + Enum.at(merged, div(total - 1, 2))) / 2
  end
end`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    # Always halve the shorter side, so the search is O(log min(m, n)).
    {a, b} =
      if length(nums1) > length(nums2), do: {nums2, nums1}, else: {nums1, nums2}

    m = length(a)
    total = m + length(b)
    search(List.to_tuple(a), List.to_tuple(b), m, length(b), total, div(total + 1, 2), 0, m)
  end

  defp search(a, b, m, n, total, half, low, high) do
    cut1 = div(low + high, 2)
    cut2 = half - cut1

    left1 = if cut1 > 0, do: elem(a, cut1 - 1), else: :negative
    right1 = if cut1 < m, do: elem(a, cut1), else: :positive
    left2 = if cut2 > 0, do: elem(b, cut2 - 1), else: :negative
    right2 = if cut2 < n, do: elem(b, cut2), else: :positive

    # A correct cut is one where everything left of it is <= everything right of
    # it, across both arrays.
    cond do
      le(left1, right2) and le(left2, right1) ->
        if rem(total, 2) == 1 do
          bigger(left1, left2) / 1
        else
          (bigger(left1, left2) + smaller(right1, right2)) / 2
        end

      not le(left1, right2) ->
        search(a, b, m, n, total, half, low, cut1 - 1)

      true ->
        search(a, b, m, n, total, half, cut1 + 1, high)
    end
  end

  # :negative and :positive stand in for the infinities at the array edges.
  defp le(:negative, _), do: true
  defp le(_, :positive), do: true
  defp le(:positive, _), do: false
  defp le(_, :negative), do: false
  defp le(x, y), do: x <= y

  defp bigger(:negative, y), do: y
  defp bigger(x, :negative), do: x
  defp bigger(x, y), do: max(x, y)

  defp smaller(:positive, y), do: y
  defp smaller(x, :positive), do: x
  defp smaller(x, y), do: min(x, y)
end`]])}function WP(){return V([["Solution 1","The input is already sorted, which turns the problem into a three-way split: everything that finishes before the new interval starts passes through untouched, everything that touches it collapses into one, and everything after it passes through too. One pass, no sorting.",`defmodule Solution do
  def insert(intervals, {start, finish}) do
    # The input is already sorted, so the list falls into three runs: everything
    # that finishes before the new one starts, everything that touches it, and
    # everything that starts after it ends.
    {before, rest} = Enum.split_while(intervals, fn {_s, e} -> e < start end)
    {overlapping, later} = Enum.split_while(rest, fn {s, _e} -> s <= finish end)

    merged =
      Enum.reduce(overlapping, {start, finish}, fn {s, e}, {acc_s, acc_e} ->
        {min(acc_s, s), max(acc_e, e)}
      end)

    before ++ [merged] ++ later
  end
end`],["Solution 2 · Merge after append","Drop the new interval on the end and run the general merge. It throws away the sortedness — O(n log n) rather than O(n) — but it is a solution you already have rather than a three-way split to get right, and that trade is often the correct one under time pressure.",`defmodule Solution do
  # Drop the new interval on the end and run the general merge. Throws away the
  # fact that the input was sorted -- O(n log n) rather than O(n) -- but it
  # reuses a solution you already have rather than a three-way split.
  def insert(intervals, new_interval) do
    [new_interval | intervals]
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.reduce([], fn
      {s, e}, [{start, finish} | rest] when s <= finish -> [{start, max(finish, e)} | rest]
      interval, acc -> [interval | acc]
    end)
    |> Enum.reverse()
  end
end`]])}function GP(){return V([["Solution 1","Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that. So a single pass either extends the interval in hand or begins a new one.",`defmodule Solution do
  # Sorted by start, an interval can only ever overlap the one being built, so a
  # single reduce is enough: extend it, or begin a new one.
  def merge(intervals) do
    intervals
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.reduce([], fn
      {s, e}, [{start, finish} | rest] when s <= finish -> [{start, max(finish, e)} | rest]
      interval, acc -> [interval | acc]
    end)
    |> Enum.reverse()
  end
end`],["Solution 2 · Sweep counts","Forget the intervals and keep only their edges: +1 where one opens, −1 where one closes. A merged interval runs from the edge that lifts the running count off zero to the edge that drops it back. Ordering opens before closes at the same coordinate is what makes touching intervals join.",`defmodule Solution do
  # Forget the intervals and keep only their edges: +1 where one opens, -1 where
  # one closes. A merged interval runs from the edge that lifts the running
  # count off zero to the edge that drops it back.
  def merge(intervals) do
    {done, _depth, _start} =
      intervals
      |> Enum.flat_map(fn {s, e} -> [{s, 1}, {e, -1}] end)
      # Opens before closes at the same coordinate, so touching intervals join.
      |> Enum.sort_by(fn {position, delta} -> {position, -delta} end)
      |> Enum.reduce({[], 0, 0}, fn {position, delta}, {done, depth, start} ->
        start = if depth == 0, do: position, else: start

        case depth + delta do
          0 -> {[{start, position} | done], 0, start}
          deeper -> {done, deeper, start}
        end
      end)

    Enum.reverse(done)
  end
end`]])}function UP(){return V([["Solution 1","Greedy on the end time. Among intervals competing for the same space, keeping the one that finishes earliest leaves the most room for whatever comes next and can never be worse — which is the exchange argument that makes the greedy correct, and the reason sorting by start is the classic wrong first answer.",`defmodule Solution do
  # Greedy on the end: among any set of intervals competing for the same space,
  # keeping the one that finishes earliest leaves the most room for whatever
  # comes next, and can never be worse.
  def erase_overlap_intervals(intervals) do
    {removed, _last_end} =
      intervals
      |> Enum.sort_by(fn {_s, e} -> e end)
      |> Enum.reduce({0, :none}, fn {s, e}, {removed, last_end} ->
        if last_end == :none or s >= last_end,
          do: {removed, e},
          else: {removed + 1, last_end}
      end)

    removed
  end
end`],["Solution 2 · By start","Sorted by start instead. On an overlap one of the two has to go, and dropping whichever ends later is always at least as good — so the greedy choice is made at the moment of the clash rather than baked into the sort order. Same answer, and it needs the running end to be lowered rather than replaced.",`defmodule Solution do
  # Sorted by start instead: on an overlap you must drop one of the two, and
  # dropping whichever ends later is always at least as good. Same greedy
  # argument, made at the moment of the clash rather than in the sort order.
  def erase_overlap_intervals(intervals) do
    {removed, _last_end} =
      intervals
      |> Enum.sort_by(fn {s, _e} -> s end)
      |> Enum.reduce({0, :none}, fn {s, e}, {removed, last_end} ->
        cond do
          last_end == :none -> {removed, e}
          s >= last_end -> {removed, e}
          true -> {removed + 1, min(last_end, e)}
        end
      end)

    removed
  end
end`]])}function zP(){return V([["Solution 1","Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier started earlier still, so it would have clashed with that one first. The whole check is then adjacent pairs.",`defmodule Solution do
  # Sorted by start, the only meeting a given one can clash with is the one
  # immediately before it -- anything earlier started earlier still and would
  # have clashed with that one first.
  def can_attend_meetings?(intervals) do
    intervals
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(fn [{_s1, e1}, {s2, _e2}] -> e1 <= s2 end)
  end
end`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair, checked. Worth writing once for the overlap test itself: two intervals overlap when each starts before the other ends, which is far easier to get right than trying to enumerate the ways they miss.`,`defmodule Solution do
  # Every pair, checked. Two intervals overlap when each starts before the other
  # ends -- the condition worth being able to write from memory, since it is
  # easier to get right than its negation.
  def can_attend_meetings?(intervals) do
    pairs =
      for {a, i} <- Enum.with_index(intervals),
          {b, j} <- Enum.with_index(intervals),
          i < j,
          do: {a, b}

    Enum.all?(pairs, fn {{s1, e1}, {s2, e2}} -> not (s1 < e2 and s2 < e1) end)
  end
end`]])}function VP(){return V([["Solution 1","Rooms needed is the most meetings ever running at once, so the meetings stop mattering and only their edges do: +1 at a start, −1 at an end, and the answer is how high the running count gets. Closes come before opens at the same time here — a room freed at that moment can be reused — which is the opposite of what merging intervals wants.",`defmodule Solution do
  # Rooms needed is the most meetings ever running at once, so the meetings
  # themselves stop mattering -- only their edges do. Walk the edges in time
  # order and watch how high the count gets.
  def min_meeting_rooms(intervals) do
    {_depth, best} =
      intervals
      |> Enum.flat_map(fn {s, e} -> [{s, 1}, {e, -1}] end)
      # A room freed at the same moment another meeting starts can be reused, so
      # closes come before opens here -- the opposite of merging intervals.
      |> Enum.sort()
      |> Enum.reduce({0, 0}, fn {_position, delta}, {depth, best} ->
        depth = depth + delta
        {depth, max(best, depth)}
      end)

    best
  end
end`],["Solution 2 · Count at each start",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

The busiest moment is always the start of some meeting, so only n moments are worth testing at all. Count how many meetings cover each and take the largest: no sort, no edge bookkeeping, and it makes clear what the sweep is measuring.`,`defmodule Solution do
  # The busiest moment is always the start of some meeting, so there are only n
  # moments worth testing. Count how many meetings cover each one and take the
  # largest -- O(n^2), and it needs no sort and no edge bookkeeping.
  def min_meeting_rooms(intervals) do
    Enum.reduce(intervals, 0, fn {start, _end}, best ->
      running = Enum.count(intervals, fn {s, e} -> s <= start and start < e end)
      max(best, running)
    end)
  end
end`]])}function jP(){return V([["Solution 1",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each query, the smallest interval containing it. O(q·n), and the definition — worth having before the clever version, because it is what you check the clever version against.`,`defmodule Solution do
  def min_interval(intervals, queries) do
    Enum.map(queries, fn query ->
      intervals
      |> Enum.filter(fn {s, e} -> s <= query and query <= e end)
      |> Enum.map(fn {s, e} -> e - s + 1 end)
      |> case do
        [] -> -1
        lengths -> Enum.min(lengths)
      end
    end)
  end
end`],["Solution 2 · Offline by length","Answer each query once and never revisit it. Taking the intervals shortest first means the first interval to cover a query is already its answer, so a query leaves the pool the moment it is settled and the pool only shrinks. Reordering the work so each answer is final is the technique here, and it generalises well beyond this problem.",`defmodule Solution do
  # Answer each query once, and never revisit it. Taking the intervals shortest
  # first means the first interval to cover a query is already its answer, so
  # every query leaves the pool the moment it is settled and the pool only ever
  # shrinks.
  def min_interval(intervals, queries) do
    numbered = Enum.with_index(queries)

    {answered, unanswered} =
      intervals
      |> Enum.sort_by(fn {s, e} -> e - s end)
      |> Enum.reduce({%{}, numbered}, fn {s, e}, {answers, waiting} ->
        {covered, still_waiting} =
          Enum.split_with(waiting, fn {query, _index} -> s <= query and query <= e end)

        answers =
          Enum.reduce(covered, answers, fn {_query, index}, acc ->
            Map.put(acc, index, e - s + 1)
          end)

        {answers, still_waiting}
      end)

    answers =
      Enum.reduce(unanswered, answered, fn {_query, index}, acc ->
        Map.put(acc, index, -1)
      end)

    Enum.map(0..(length(queries) - 1)//1, &Map.fetch!(answers, &1))
  end
end`]])}function CO(I){if(I==="nc01_contains_duplicate")return new R(EB());else if(I==="nc02_valid_anagram")return new R(hB());else if(I==="nc03_two_sum")return new R(CB());else if(I==="nc04_group_anagrams")return new R(wB());else if(I==="nc05_top_k_frequent")return new R(kB());else if(I==="nc06_product_except_self")return new R(bB());else if(I==="nc07_longest_consecutive")return new R(yB());else if(I==="nc08_valid_palindrome")return new R(xB());else if(I==="nc09_two_sum_sorted")return new R(nB());else if(I==="nc10_three_sum")return new R(gB());else if(I==="nc11_container_water")return new R(fB());else if(I==="nc12_best_time_stock")return new R(uB());else if(I==="nc13_longest_substring")return new R($B());else if(I==="nc14_character_replacement")return new R(mB());else if(I==="nc15_permutation_in_string")return new R(vB());else if(I==="nc16_valid_parentheses")return new R(cB());else if(I==="nc17_min_stack")return new R(pB());else if(I==="nc18_daily_temperatures")return new R(sB());else if(I==="nc19_binary_search")return new R(dB());else if(I==="nc20_find_min_rotated")return new R(iB());else if(I==="nc21_search_rotated")return new R(lB());else if(I==="nc22_encode_decode")return new R(rB());else if(I==="nc23_valid_sudoku")return new R(aB());else if(I==="nc24_trapping_rain_water")return new R(tB());else if(I==="nc25_min_window_substring")return new R(oB());else if(I==="nc26_sliding_window_maximum")return new R(eB());else if(I==="nc27_eval_rpn")return new R(IP());else if(I==="nc28_generate_parentheses")return new R(ZP());else if(I==="nc29_car_fleet")return new R(JP());else if(I==="nc30_largest_rectangle")return new R(QP());else if(I==="nc31_search_2d_matrix")return new R(XP());else if(I==="nc32_koko_bananas")return new R(YP());else if(I==="nc33_time_map")return new R(qP());else if(I==="nc34_median_two_sorted")return new R(KP());else if(I==="nc35_insert_interval")return new R(WP());else if(I==="nc36_merge_intervals")return new R(GP());else if(I==="nc37_non_overlapping")return new R(UP());else if(I==="nc38_meeting_rooms")return new R(zP());else if(I==="nc39_meeting_rooms_ii")return new R(VP());else if(I==="nc40_min_interval")return new R(jP());else return new V1(void 0)}function wO(){return O5(j5+" (Elixir)",PO,(I)=>{return H0(CO(I),(Z)=>{return[Z,U1]})})}function kO(){return O5(j5+" (Gleam)",fZ,(I)=>{return H0(EO(I),(Z)=>{return[Z.solutions,new a(Z.check)]})})}function NP(){return new b(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`def containsDuplicate(nums):
    ordered = sorted(nums)
    for i in range(1, len(ordered)):
        if ordered[i] == ordered[i - 1]:
            return True
    return False`]]),new k("def containsDuplicate(nums):",`def containsDuplicate(nums):
    pass`,`try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))`))}function RP(){return new b(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`def isAnagram(s, t):
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

    return True`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`def isAnagram(s, t):
    return sorted(s) == sorted(t)`]]),new k("def isAnagram(s, t):",`def isAnagram(s, t):
    pass`,`try:
    (isAnagram)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isAnagram('anagram', 'nagaram')", True, isAnagram("anagram", "nagaram"))
__case__("isAnagram('rat', 'car')", False, isAnagram("rat", "car"))
__case__("isAnagram('', '')", True, isAnagram("", ""))
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))`))}function MP(){return new b(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`],["Solution 3 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`def twoSum(nums, target):
    ordered = sorted((num, i) for i, num in enumerate(nums))
    left, right = 0, len(ordered) - 1

    while left < right:
        total = ordered[left][0] + ordered[right][0]
        if total == target:
            return sorted([ordered[left][1], ordered[right][1]])
        if total < target:
            left += 1
        else:
            right -= 1

    return []`]]),new k("def twoSum(nums, target):",`def twoSum(nums, target):
    pass`,`try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [0, 1], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([3, 2, 4], 6)", [1, 2], twoSum([3, 2, 4], 6))
__case__("twoSum([3, 3], 6)", [0, 1], twoSum([3, 3], 6))
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))`))}function AP(){return new b(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`],["Solution 2 · Sorted key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

The sorted word itself is the key. Shorter than tallying letters, and it works for any alphabet rather than just a-z.`,`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups["".join(sorted(s))].append(s)
    return list(groups.values())`]]),new k("def groupAnagrams(strs):",`def groupAnagrams(strs):
    pass`,`try:
    (groupAnagrams)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__normalised__ = sorted(sorted(group) for group in groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
__case__("groupAnagrams(['eat','tea','tan','ate','nat','bat'])", [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]], __normalised__)
__case__("groupAnagrams([])", [], sorted(groupAnagrams([])))
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))`))}function DP(){return new b(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`from collections import Counter

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
    return result`],["Solution 2 · Heapq","A heap of size k keeps only the candidates that can still win: O(n + k log n), and the win is largest when k is much smaller than n.",`import heapq
from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)`],["Solution 3 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Straight sort by frequency: O(n log n) rather than the bucket version's O(n), but it is the version you can write without thinking.`,`def topKFrequent(nums, k):
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]`]]),new k("def topKFrequent(nums, k):",`def topKFrequent(nums, k):
    pass`,`try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))`))}function LP(){return new b(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`def productExceptSelf(nums):
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

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`def productExceptSelf(nums):
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result`]]),new k("def productExceptSelf(nums):",`def productExceptSelf(nums):
    pass`,`try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))`))}function BP(){return new b(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`def longestConsecutive(nums):
    if not nums:
        return 0

    ordered = sorted(nums)
    longest = 1
    run = 1

    for i in range(1, len(ordered)):
        step = ordered[i] - ordered[i - 1]
        if step == 0:
            continue  # duplicates neither extend nor break a run
        if step == 1:
            run += 1
            longest = max(longest, run)
        else:
            run = 1

    return longest`]]),new k("def longestConsecutive(nums):",`def longestConsecutive(nums):
    pass`,`try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))`))}function PP(){return new b(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`def isPalindrome(s):
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

    return True`],["Solution 2 · Cleaned reverse","Strip, then compare against the reverse. Allocates a second string instead of converging two pointers, but it is one line of intent.",`def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`]]),new k("def isPalindrome(s):",`def isPalindrome(s):
    pass`,`try:
    (isPalindrome)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isPalindrome('A man, a plan, a canal: Panama')", True, isPalindrome("A man, a plan, a canal: Panama"))
__case__("isPalindrome('race a car')", False, isPalindrome("race a car"))
__case__("isPalindrome(' ')", True, isPalindrome(" "))
__case__("isPalindrome('0P')", False, isPalindrome("0P"))`))}function SP(){return new b(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`def twoSum(numbers, target):
    for i, number in enumerate(numbers):
        wanted = target - number
        lo, hi = i + 1, len(numbers) - 1
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if numbers[mid] == wanted:
                return [i + 1, mid + 1]
            if numbers[mid] < wanted:
                lo = mid + 1
            else:
                hi = mid - 1
    return []`]]),new k("def twoSum(numbers, target):",`def twoSum(numbers, target):
    pass`,`try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [1, 2], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([2, 3, 4], 6)", [1, 3], twoSum([2, 3, 4], 6))
__case__("twoSum([-1, 0], -1)", [1, 2], twoSum([-1, 0], -1))
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))`))}function _P(){return new b(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`def threeSum(nums):
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

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`def threeSum(nums):
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            for k in range(j + 1, len(ordered)):
                triple = [ordered[i], ordered[j], ordered[k]]
                if sum(triple) == 0 and triple not in result:
                    result.append(triple)

    return result`]]),new k("def threeSum(nums):",`def threeSum(nums):
    pass`,`try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))`))}function TP(){return new b(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`def maxArea(height):
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best`]]),new k("def maxArea(height):",`def maxArea(height):
    pass`,`try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))`))}function EP(){return new b(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`def maxProfit(prices):
    profit = 0
    for buy in range(len(prices)):
        for sell in range(buy + 1, len(prices)):
            profit = max(profit, prices[sell] - prices[buy])
    return profit`]]),new k("def maxProfit(prices):",`def maxProfit(prices):
    pass`,`try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))`))}function hP(){return new b(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`],["Solution 2 · Index scan","No set and no map: ask the string itself whether this character already appeared inside the current window, and if so restart just past it.",`def lengthOfLongestSubstring(s):
    longest = 0
    start = 0

    for right, char in enumerate(s):
        found = s.find(char, start, right)
        if found != -1:
            start = found + 1
        longest = max(longest, right - start + 1)

    return longest`]]),new k("def lengthOfLongestSubstring(s):",`def lengthOfLongestSubstring(s):
    pass`,`try:
    (lengthOfLongestSubstring)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("lengthOfLongestSubstring('abcabcbb')", 3, lengthOfLongestSubstring("abcabcbb"))
__case__("lengthOfLongestSubstring('bbbbb')", 1, lengthOfLongestSubstring("bbbbb"))
__case__("lengthOfLongestSubstring('pwwkew')", 3, lengthOfLongestSubstring("pwwkew"))
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))`))}function CP(){return new b(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`def characterReplacement(s, k):
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

    return longest`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
    longest = 0

    for target in ALPHABET:
        left = 0
        others = 0
        for right, char in enumerate(s):
            if char != target:
                others += 1
            while others > k:
                if s[left] != target:
                    others -= 1
                left += 1
            longest = max(longest, right - left + 1)

    return longest`]]),new k("def characterReplacement(s, k):",`def characterReplacement(s, k):
    pass`,`try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))`))}function wP(){return new b(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`from collections import Counter

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

    return False`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    needle = sorted(s1)
    size = len(s1)

    for start in range(len(s2) - size + 1):
        if sorted(s2[start:start + size]) == needle:
            return True

    return False`]]),new k("def checkInclusion(s1, s2):",`def checkInclusion(s1, s2):
    pass`,`try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))`))}function kP(){return new b(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`def isValid(s):
    previous = None
    while previous != s:
        previous = s
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return s == ""`]]),new k("def isValid(s):",`def isValid(s):
    pass`,`try:
    (isValid)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isValid('()[]{}')", True, isValid("()[]{}"))
__case__("isValid('(]')", False, isValid("(]"))
__case__("isValid('([)]')", False, isValid("([)]"))
__case__("isValid('{[]}')", True, isValid("{[]}"))
__case__("isValid('(')", False, isValid("("))`))}function bP(){return new b(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`class MinStack:
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
        return self.mins[-1]`],["Solution 2 · Pair stack","Each entry carries the minimum of everything at or below it, so getMin is a peek. One structure instead of two, at the cost of a second number per value.",`class MinStack:
    # Each entry carries the minimum of everything at or below it, so getMin is
    # a peek. One list instead of two, at the cost of storing a second int per
    # value.

    def __init__(self):
        self.entries = []

    def push(self, val):
        current_min = val if not self.entries else min(val, self.entries[-1][1])
        self.entries.append((val, current_min))

    def pop(self):
        self.entries.pop()

    def top(self):
        return self.entries[-1][0]

    def getMin(self):
        return self.entries[-1][1]`]]),new k(`class MinStack:
    def __init__(self):
    def push(self, val):
    def pop(self):
    def top(self):
    def getMin(self):`,`class MinStack:
    def __init__(self):
        pass
    def push(self, val):
        pass
    def pop(self):
        pass
    def top(self):
        pass
    def getMin(self):
        pass`,`try:
    (MinStack)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__stack__ = MinStack()
__stack__.push(-2)
__stack__.push(0)
__stack__.push(-3)
__case__("getMin() after push -2, 0, -3", -3, __stack__.getMin())
__stack__.pop()
__case__("top() after pop()", 0, __stack__.top())
__case__("getMin() after pop()", -2, __stack__.getMin())`))}function yP(){return new b(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`def dailyTemperatures(temperatures):
    result = []
    for i, temp in enumerate(temperatures):
        days = 0
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temp:
                days = j - i
                break
        result.append(days)
    return result`]]),new k("def dailyTemperatures(temperatures):",`def dailyTemperatures(temperatures):
    pass`,`try:
    (dailyTemperatures)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
__case__("dailyTemperatures([30, 40, 50, 60])", [1, 1, 1, 0], dailyTemperatures([30, 40, 50, 60]))
__case__("dailyTemperatures([30, 30, 30])", [0, 0, 0], dailyTemperatures([30, 30, 30]))`))}function xP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`],["Solution 2 · Recursive",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The same halving as recursion. The bounds are arguments rather than mutated locals, which makes each step's invariant easier to see.`,`def search(nums, target):
    return halve(nums, target, 0, len(nums) - 1)

def halve(nums, target, lo, hi):
    if lo > hi:
        return -1

    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return halve(nums, target, mid + 1, hi)
    return halve(nums, target, lo, mid - 1)`]]),new k("def search(nums, target):",`def search(nums, target):
    pass`,`try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([-1, 0, 3, 5, 9, 12], 9)", 4, search([-1, 0, 3, 5, 9, 12], 9))
__case__("search([-1, 0, 3, 5, 9, 12], 2)", -1, search([-1, 0, 3, 5, 9, 12], 2))
__case__("search([5], 5)", 0, search([5], 5))
__case__("search([], 1)", -1, search([], 1))`))}function nP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`def findMin(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return nums[i]
    return nums[0]`]]),new k("def findMin(nums):",`def findMin(nums):
    pass`,`try:
    (findMin)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMin([3, 4, 5, 1, 2])", 1, findMin([3, 4, 5, 1, 2]))
__case__("findMin([4, 5, 6, 7, 0, 1, 2])", 0, findMin([4, 5, 6, 7, 0, 1, 2]))
__case__("findMin([11, 13, 15, 17])", 11, findMin([11, 13, 15, 17]))
__case__("findMin([2, 1])", 1, findMin([2, 1]))`))}function gP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`def search(nums, target):
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

    return -1`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`def search(nums, target):
    pivot = rotationPoint(nums)
    found = binarySearch(nums, target, 0, pivot - 1)
    if found != -1:
        return found
    return binarySearch(nums, target, pivot, len(nums) - 1)

def rotationPoint(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return i
    return 0

def binarySearch(nums, target, lo, hi):
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`]]),new k("def search(nums, target):",`def search(nums, target):
    pass`,`try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([4, 5, 6, 7, 0, 1, 2], 0)", 4, search([4, 5, 6, 7, 0, 1, 2], 0))
__case__("search([4, 5, 6, 7, 0, 1, 2], 3)", -1, search([4, 5, 6, 7, 0, 1, 2], 3))
__case__("search([1], 1)", 0, search([1], 1))
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))`))}function fP(){return new b(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
def encode(strs):
    return "".join("%d#%s" % (len(s), s) for s in strs)


def decode(s):
    out = []
    i = 0
    while i < len(s):
        hash_at = s.index("#", i)
        length = int(s[i:hash_at])
        start = hash_at + 1
        out.append(s[start:start + length])
        i = start + length
    return out`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
SEPARATOR = "|"
ESCAPE = "\\\\"


def encode(strs):
    return "".join(
        SEPARATOR + s.replace(ESCAPE, ESCAPE * 2).replace(SEPARATOR, ESCAPE + SEPARATOR)
        for s in strs
    )


def decode(s):
    # The leading separator is what tells [] and [""] apart: one encodes to the
    # empty string, the other to a lone separator.
    if not s:
        return []
    out = []
    current = []
    i = 1
    while i < len(s):
        if s[i] == ESCAPE:
            current.append(s[i + 1])
            i += 2
        elif s[i] == SEPARATOR:
            out.append("".join(current))
            current = []
            i += 1
        else:
            current.append(s[i])
            i += 1
    out.append("".join(current))
    return out`]]),new k(`def encode(strs):

def decode(s):`,`def encode(strs):
    pass

def decode(s):
    pass`,`
try:
    (encode, decode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __round_trip__(strs):
    return decode(encode(strs))

__case__("decode(encode(['neet', 'code', 'love', 'you']))", ["neet", "code", "love", "you"], __round_trip__(["neet", "code", "love", "you"]))
__case__("decode(encode([]))", [], __round_trip__([]))
__case__("decode(encode(['', '']))", ["", ""], __round_trip__(["", ""]))
__case__("decode(encode(['3#x', 'a|b']))", ["3#x", "a|b"], __round_trip__(["3#x", "a|b"]))
__case__("decode(encode(['\\\\\\\\', '|', '#']))", ["\\\\", "|", "#"], __round_trip__(["\\\\", "|", "#"]))`))}function uP(){return new b(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`def isValidSudoku(board):
    seen = set()
    for r, row in enumerate(board):
        for c, value in enumerate(row):
            if value == ".":
                continue
            keys = (
                (value, "row", r),
                (value, "col", c),
                (value, "box", r // 3, c // 3),
            )
            if any(key in seen for key in keys):
                return False
            seen.update(keys)
    return True`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`def isValidSudoku(board):
    return all(noDuplicates(unit) for unit in units(board))


def units(board):
    rows = [list(row) for row in board]
    columns = [list(column) for column in zip(*board)]
    boxes = [
        [board[r][c] for r in range(br, br + 3) for c in range(bc, bc + 3)]
        for br in range(0, 9, 3)
        for bc in range(0, 9, 3)
    ]
    return rows + columns + boxes


def noDuplicates(unit):
    filled = [value for value in unit if value != "."]
    return len(filled) == len(set(filled))`]]),new k("def isValidSudoku(board):",`def isValidSudoku(board):
    pass`,`try:
    (isValidSudoku)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Nine row strings rather than a 9x9 literal: the board stays readable, and a
# single changed cell is what each invalid case is.
__rows__ = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]

def __board__():
    return [list(row) for row in __rows__]

def __with_cell__(r, c, value):
    board = __board__()
    board[r][c] = value
    return board

__case__("isValidSudoku(valid board)", True, isValidSudoku(__board__()))
__case__("isValidSudoku(5 twice in row 0)", False, isValidSudoku(__with_cell__(0, 2, "5")))
__case__("isValidSudoku(5 twice in column 0, different boxes)", False, isValidSudoku(__with_cell__(3, 0, "5")))
__case__("isValidSudoku(3 twice in the top-left box only)", False, isValidSudoku(__with_cell__(2, 0, "3")))
__case__("isValidSudoku(empty board)", True, isValidSudoku([["."] * 9 for _ in range(9)]))`))}function $P(){return new b(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = total = 0

    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            total += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            total += right_max - height[right]
            right -= 1

    return total`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`def trap(height):
    left = []
    best = 0
    for h in height:
        best = max(best, h)
        left.append(best)

    right = [0] * len(height)
    best = 0
    for i in range(len(height) - 1, -1, -1):
        best = max(best, height[i])
        right[i] = best

    return sum(min(left[i], right[i]) - height[i] for i in range(len(height)))`]]),new k("def trap(height):",`def trap(height):
    pass`,`try:
    (trap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", 6, trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
__case__("trap([4, 2, 0, 3, 2, 5])", 9, trap([4, 2, 0, 3, 2, 5]))
__case__("trap([])", 0, trap([]))
__case__("trap([3])", 0, trap([3]))
__case__("trap([2, 0, 2])", 2, trap([2, 0, 2]))
__case__("trap([5, 4, 3, 2, 1])", 0, trap([5, 4, 3, 2, 1]))`))}function mP(){return new b(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    missing = len(t)
    left = 0
    best_start, best_length = 0, 0

    for right, c in enumerate(s):
        if need.get(c, 0) > 0:
            missing -= 1
        need[c] = need.get(c, 0) - 1

        while missing == 0:
            if best_length == 0 or right - left + 1 < best_length:
                best_start, best_length = left, right - left + 1
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1

    return s[best_start:best_start + best_length]`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions = [(i, c) for i, c in enumerate(s) if c in need]

    window = {}
    satisfied = 0
    left = 0
    best_start, best_length = 0, 0

    for right, (index, c) in enumerate(positions):
        window[c] = window.get(c, 0) + 1
        if window[c] == need[c]:
            satisfied += 1

        while satisfied == len(need):
            start = positions[left][0]
            length = index - start + 1
            if best_length == 0 or length < best_length:
                best_start, best_length = start, length
            leaving = positions[left][1]
            window[leaving] -= 1
            if window[leaving] < need[leaving]:
                satisfied -= 1
            left += 1

    return s[best_start:best_start + best_length]`]]),new k("def minWindow(s, t):",`def minWindow(s, t):
    pass`,`try:
    (minWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minWindow('ADOBECODEBANC', 'ABC')", "BANC", minWindow("ADOBECODEBANC", "ABC"))
__case__("minWindow('a', 'a')", "a", minWindow("a", "a"))
__case__("minWindow('a', 'aa')", "", minWindow("a", "aa"))
__case__("minWindow('', 'a')", "", minWindow("", "a"))
__case__("minWindow('ab', '')", "", minWindow("ab", ""))
__case__("minWindow('aaflslflsldkalskaaa', 'aaa')", "aaa", minWindow("aaflslflsldkalskaaa", "aaa"))`))}function vP(){return new b(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []

    n = len(nums)
    left = [0] * n
    right = [0] * n

    for i in range(n):
        left[i] = nums[i] if i % k == 0 else max(left[i - 1], nums[i])
    for i in range(n - 1, -1, -1):
        right[i] = nums[i] if i == n - 1 or (i + 1) % k == 0 else max(right[i + 1], nums[i])

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    return [max(right[i], left[i + k - 1]) for i in range(n - k + 1)]`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`from collections import deque


def maxSlidingWindow(nums, k):
    if k <= 0:
        return []

    window = deque()
    out = []

    for i, num in enumerate(nums):
        while window and nums[window[-1]] <= num:
            window.pop()
        window.append(i)
        if window[0] <= i - k:
            window.popleft()
        if i >= k - 1:
            out.append(nums[window[0]])

    return out`]]),new k("def maxSlidingWindow(nums, k):",`def maxSlidingWindow(nums, k):
    pass`,`try:
    (maxSlidingWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", [3, 3, 5, 5, 6, 7], maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
__case__("maxSlidingWindow([1], 1)", [1], maxSlidingWindow([1], 1))
__case__("maxSlidingWindow([], 3)", [], maxSlidingWindow([], 3))
__case__("maxSlidingWindow([9, 8, 7, 6], 2)", [9, 8, 7], maxSlidingWindow([9, 8, 7, 6], 2))
__case__("maxSlidingWindow([1, -1], 1)", [1, -1], maxSlidingWindow([1, -1], 1))
__case__("maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", [7, 7, 7, 7, 7], maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))`))}function cP(){return new b(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`OPERATORS = "+-*/"


def evalRPN(tokens):
    stack = []
    for token in tokens:
        if token in OPERATORS and len(stack) >= 2:
            b = stack.pop()
            a = stack.pop()
            stack.append(apply(token, a, b))
        else:
            stack.append(int(token))
    return stack[-1] if stack else 0


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    # // floors, so -3 // 2 is -2; the problem wants truncation towards zero.
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`OPERATORS = "+-*/"


def evalRPN(tokens):
    value, _ = take(tokens, len(tokens) - 1)
    return value


# Read right to left: the last token is the outermost operator, and each
# operator takes its right operand first because that is what sits nearer the
# end. Returns the value and the index still to be read.
def take(tokens, i):
    token = tokens[i]
    if token not in OPERATORS:
        return int(token), i - 1
    right, i = take(tokens, i - 1)
    left, i = take(tokens, i)
    return apply(token, left, right), i


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient`]]),new k(`def evalRPN(tokens):

def apply(operator, a, b):`,`def evalRPN(tokens):
    pass

def apply(operator, a, b):
    pass`,`try:
    (evalRPN)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("evalRPN(['2', '1', '+', '3', '*'])", 9, evalRPN(["2", "1", "+", "3", "*"]))
__case__("evalRPN(['4', '13', '5', '/', '+'])", 6, evalRPN(["4", "13", "5", "/", "+"]))
__case__("evalRPN(['-3', '2', '/'])", -1, evalRPN(["-3", "2", "/"]))
__case__("evalRPN(['5'])", 5, evalRPN(["5"]))
__case__("evalRPN(the long one)", 22, evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))`))}function pP(){return new b(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`def generateParenthesis(n):
    out = []

    # Two counters, one rule each: an opener is legal while any are left, and a
    # closer is legal only while more are outstanding than openers. Everything
    # reached with both at zero is valid by construction.
    def build(open_left, close_left, current):
        if open_left == 0 and close_left == 0:
            out.append("".join(current))
            return
        if open_left > 0:
            current.append("(")
            build(open_left - 1, close_left, current)
            current.pop()
        if close_left > open_left:
            current.append(")")
            build(open_left, close_left - 1, current)
            current.pop()

    build(n, n, [])
    return out`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`def generateParenthesis(n):
    return compose(n)


# Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
# is whatever the first bracket encloses, B is whatever follows it. Enumerating
# the splits enumerates the strings, with no validity rule to check at all.
def compose(n):
    if n <= 0:
        return [""]
    return [
        "(" + a + ")" + b
        for inner in range(n)
        for a in compose(inner)
        for b in compose(n - 1 - inner)
    ]`]]),new k("def generateParenthesis(n):",`def generateParenthesis(n):
    pass`,`try:
    (generateParenthesis)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Any order is acceptable, so every case compares sorted.
def __sorted__(n):
    return sorted(generateParenthesis(n))

__case__("generateParenthesis(1)", ["()"], __sorted__(1))
__case__("generateParenthesis(2)", ["(())", "()()"], __sorted__(2))
__case__("generateParenthesis(3)", ["((()))", "(()())", "(())()", "()(())", "()()()"], __sorted__(3))
__case__("generateParenthesis(4) count", 14, len(__sorted__(4)))`))}function sP(){return new b(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)

    fleets = 0
    lead_distance, lead_speed = 0, 1

    for pos, spd in cars:
        distance = target - pos
        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd:
            fleets += 1
            lead_distance, lead_speed = distance, spd

    return fleets`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`def carFleet(target, position, speed):
    cars = list(zip(position, speed))
    return sum(1 for car in cars if leads(car, cars, target))


# A car leads a fleet exactly when it arrives strictly later than every car
# ahead of it; anything else means it catches one of them and merges. No
# sorting, no running state -- O(n^2), and the definition rather than a
# consequence of it.
def leads(car, cars, target):
    pos, spd = car
    return all(
        (target - pos) * other_speed > (target - other_pos) * spd
        for other_pos, other_speed in cars
        if other_pos > pos
    )`]]),new k("def carFleet(target, position, speed):",`def carFleet(target, position, speed):
    pass`,`try:
    (carFleet)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", 3, carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
__case__("carFleet(10, [3], [3])", 1, carFleet(10, [3], [3]))
__case__("carFleet(100, [0, 2, 4], [4, 2, 1])", 1, carFleet(100, [0, 2, 4], [4, 2, 1]))
__case__("carFleet(10, [6, 8], [3, 2])", 2, carFleet(10, [6, 8], [3, 2]))
__case__("carFleet(10, [], [])", 0, carFleet(10, [], []))
__case__("carFleet(10, [0, 4, 2], [2, 1, 3])", 1, carFleet(10, [0, 4, 2], [2, 1, 3]))`))}function dP(){return new b(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`def largestRectangleArea(heights):
    stack = []
    best = 0

    for i, h in enumerate(heights):
        start = i
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        while stack and stack[-1][1] > h:
            from_index, tall = stack.pop()
            best = max(best, tall * (i - from_index))
            start = from_index
        stack.append((start, h))

    # Whatever survives was never cut off, so it runs to the far end.
    for from_index, tall in stack:
        best = max(best, tall * (len(heights) - from_index))

    return best`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`def largestRectangleArea(heights):
    best = 0

    for i, h in enumerate(heights):
        # How far this bar's own height can spread in each direction. O(n^2),
        # and the definition of the answer: every rectangle is some bar taken
        # as far as it will go.
        left = i
        while left > 0 and heights[left - 1] >= h:
            left -= 1
        right = i
        while right + 1 < len(heights) and heights[right + 1] >= h:
            right += 1
        best = max(best, h * (right - left + 1))

    return best`]]),new k("def largestRectangleArea(heights):",`def largestRectangleArea(heights):
    pass`,`try:
    (largestRectangleArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("largestRectangleArea([2, 1, 5, 6, 2, 3])", 10, largestRectangleArea([2, 1, 5, 6, 2, 3]))
__case__("largestRectangleArea([2, 4])", 4, largestRectangleArea([2, 4]))
__case__("largestRectangleArea([])", 0, largestRectangleArea([]))
__case__("largestRectangleArea([1, 1, 1])", 3, largestRectangleArea([1, 1, 1]))
__case__("largestRectangleArea([5])", 5, largestRectangleArea([5]))
__case__("largestRectangleArea([4, 2, 0, 3, 2, 5])", 6, largestRectangleArea([4, 2, 0, 3, 2, 5]))`))}function iP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`def searchMatrix(matrix, target):
    # The rows are sorted and do not overlap, so the row a value could live in
    # is itself found by halving: compare the target against a row's ends.
    low, high = 0, len(matrix) - 1
    while low <= high:
        mid = (low + high) // 2
        if matrix[mid][-1] < target:
            low = mid + 1
        elif matrix[mid][0] > target:
            high = mid - 1
        else:
            return contains(matrix[mid], target)
    return False


def contains(row, target):
    low, high = 0, len(row) - 1
    while low <= high:
        mid = (low + high) // 2
        if row[mid] == target:
            return True
        if row[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return False`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    # From the top-right corner every step is forced: too big and the whole
    # column is too big, so drop it; too small and the whole row is too small,
    # so drop that. O(m + n), and it never uses the fact that rows do not
    # overlap -- it works on any matrix sorted along both axes.
    row, column = 0, len(matrix[0]) - 1
    while row < len(matrix) and column >= 0:
        value = matrix[row][column]
        if value == target:
            return True
        if value > target:
            column -= 1
        else:
            row += 1
    return False`]]),new k(`def searchMatrix(matrix, target):

def contains(row, target):`,`def searchMatrix(matrix, target):
    pass

def contains(row, target):
    pass`,`try:
    (searchMatrix)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__matrix__ = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

__case__("searchMatrix(matrix, 3)", True, searchMatrix(__matrix__, 3))
__case__("searchMatrix(matrix, 13)", False, searchMatrix(__matrix__, 13))
__case__("searchMatrix(matrix, 60)", True, searchMatrix(__matrix__, 60))
__case__("searchMatrix([[1]], 1)", True, searchMatrix([[1]], 1))
__case__("searchMatrix([], 1)", False, searchMatrix([], 1))
__case__("searchMatrix([[1], [3], [5]], 5)", True, searchMatrix([[1], [3], [5]], 5))`))}function lP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`def minEatingSpeed(piles, h):
    # The search space is the answer, not the input. Feasibility is monotone --
    # if a speed finishes in time then so does every faster one -- which is
    # exactly the property halving needs.
    low, high = 1, max(piles)
    while low < high:
        mid = (low + high) // 2
        if hours(piles, mid) <= h:
            high = mid
        else:
            low = mid + 1
    return low


# A pile never shares an hour with another, so each costs ceil(pile / speed).
def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`def minEatingSpeed(piles, h):
    highest = max(piles)
    speed = 1
    while speed < highest and hours(piles, speed) > h:
        speed += 1
    return speed


def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)`]]),new k(`def minEatingSpeed(piles, h):

def hours(piles, speed):`,`def minEatingSpeed(piles, h):
    pass

def hours(piles, speed):
    pass`,`try:
    (minEatingSpeed)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minEatingSpeed([3, 6, 7, 11], 8)", 4, minEatingSpeed([3, 6, 7, 11], 8))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 5)", 30, minEatingSpeed([30, 11, 23, 4, 20], 5))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 6)", 23, minEatingSpeed([30, 11, 23, 4, 20], 6))
__case__("minEatingSpeed([1], 1)", 1, minEatingSpeed([1], 1))
__case__("minEatingSpeed([4, 4, 4, 4], 4)", 4, minEatingSpeed([4, 4, 4, 4], 4))
__case__("minEatingSpeed([1, 1, 1, 10], 4)", 10, minEatingSpeed([1, 1, 1, 10], 4))`))}function rP(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        # Timestamps only ever increase, so appending keeps each key's history
        # sorted for free.
        self.store.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        # The history is sorted, so the newest entry at or before a timestamp is
        # a halving question, not a walk.
        history = self.store.get(key, [])
        low, high = 0, len(history) - 1
        best = ""
        while low <= high:
            mid = (low + high) // 2
            if history[mid][0] <= timestamp:
                best = history[mid][1]
                low = mid + 1
            else:
                high = mid - 1
        return best`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).insert(0, (timestamp, value))

    def get(self, key, timestamp):
        # Newest first, so the first entry old enough is the answer. O(n) per
        # lookup against the halving version's O(log n), but there is no split
        # arithmetic to get wrong.
        for stamp, value in self.store.get(key, []):
            if stamp <= timestamp:
                return value
        return ""`]]),new k(`class TimeMap:
    def __init__(self):
    def set(self, key, value, timestamp):
    def get(self, key, timestamp):`,`class TimeMap:
    def __init__(self):
        pass
    def set(self, key, value, timestamp):
        pass
    def get(self, key, timestamp):
        pass`,`try:
    (TimeMap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__store__ = TimeMap()
__store__.set("foo", "bar", 1)

__case__("get('foo', 1) after set at 1", "bar", __store__.get("foo", 1))
__case__("get('foo', 3) with only the value at 1", "bar", __store__.get("foo", 3))

__store__.set("foo", "bar2", 4)

__case__("get('foo', 4) after set at 4", "bar2", __store__.get("foo", 4))
__case__("get('foo', 5) after set at 4", "bar2", __store__.get("foo", 5))
__case__("get('foo', 3) still sees the older value", "bar", __store__.get("foo", 3))
__case__("get('foo', 0) before anything was set", "", __store__.get("foo", 0))
__case__("get('missing', 1)", "", __store__.get("missing", 1))`))}function aP(){return new b(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`def findMedianSortedArrays(nums1, nums2):
    total = len(nums1) + len(nums2)
    if total == 0:
        return 0.0

    # Merge, but stop at the middle and keep only the last two values seen: the
    # merged array is never built, so this is O(m + n) time and no extra space.
    i = j = 0
    previous = current = 0
    for _ in range(total // 2 + 1):
        previous = current
        if i < len(nums1) and (j >= len(nums2) or nums1[i] <= nums2[j]):
            current = nums1[i]
            i += 1
        else:
            current = nums2[j]
            j += 1

    if total % 2 == 1:
        return float(current)
    return (previous + current) / 2`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`def findMedianSortedArrays(nums1, nums2):
    merged = sorted(nums1 + nums2)
    if not merged:
        return 0.0
    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    return (merged[len(merged) // 2] + merged[(len(merged) - 1) // 2]) / 2`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`def findMedianSortedArrays(nums1, nums2):
    # Always halve the shorter side, so the search is O(log min(m, n)).
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    total = m + n
    if total == 0:
        return 0.0
    half = (total + 1) // 2

    low, high = 0, m
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = half - cut1

        left1 = nums1[cut1 - 1] if cut1 > 0 else float("-inf")
        right1 = nums1[cut1] if cut1 < m else float("inf")
        left2 = nums2[cut2 - 1] if cut2 > 0 else float("-inf")
        right2 = nums2[cut2] if cut2 < n else float("inf")

        # A correct cut is one where everything left of it is <= everything
        # right of it, across both arrays.
        if left1 <= right2 and left2 <= right1:
            if total % 2 == 1:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        if left1 > right2:
            high = cut1 - 1
        else:
            low = cut1 + 1

    return 0.0`]]),new k("def findMedianSortedArrays(nums1, nums2):",`def findMedianSortedArrays(nums1, nums2):
    pass`,`try:
    (findMedianSortedArrays)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMedianSortedArrays([1, 3], [2])", 2.0, findMedianSortedArrays([1, 3], [2]))
__case__("findMedianSortedArrays([1, 2], [3, 4])", 2.5, findMedianSortedArrays([1, 2], [3, 4]))
__case__("findMedianSortedArrays([], [1])", 1.0, findMedianSortedArrays([], [1]))
__case__("findMedianSortedArrays([2], [])", 2.0, findMedianSortedArrays([2], []))
__case__("findMedianSortedArrays([], [])", 0.0, findMedianSortedArrays([], []))
__case__("findMedianSortedArrays([1, 2], [])", 1.5, findMedianSortedArrays([1, 2], []))
__case__("findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", 4.0, findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))`))}function tP(){return new b(V([["Solution 1","The input is already sorted, which turns the problem into a three-way split: everything that finishes before the new interval starts passes through untouched, everything that touches it collapses into one, and everything after it passes through too. One pass, no sorting.",`def insert(intervals, newInterval):
    start, end = newInterval
    out = []
    i = 0

    # The input is already sorted, so the list falls into three runs: everything
    # that finishes before the new one starts, everything that touches it, and
    # everything that starts after it ends.
    while i < len(intervals) and intervals[i][1] < start:
        out.append(intervals[i])
        i += 1

    while i < len(intervals) and intervals[i][0] <= end:
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1

    out.append([start, end])
    return out + intervals[i:]`],["Solution 2 · Merge after append","Drop the new interval on the end and run the general merge. It throws away the sortedness — O(n log n) rather than O(n) — but it is a solution you already have rather than a three-way split to get right, and that trade is often the correct one under time pressure.",`def insert(intervals, newInterval):
    # Drop the new interval on the end and run the general merge. Throws away
    # the fact that the input was sorted -- O(n log n) rather than O(n) -- but
    # it reuses a solution you already have rather than a three-way split.
    out = []
    for start, end in sorted(intervals + [newInterval]):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out`]]),new k("def insert(intervals, newInterval):",`def insert(intervals, newInterval):
    pass`,`try:
    (insert)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("insert([[1, 3], [6, 9]], [2, 5])", [[1, 5], [6, 9]], insert([[1, 3], [6, 9]], [2, 5]))
__case__("insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])", [[1, 2], [3, 10], [12, 16]], insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))
__case__("insert([], [5, 7])", [[5, 7]], insert([], [5, 7]))
__case__("insert([[1, 5]], [2, 3])", [[1, 5]], insert([[1, 5]], [2, 3]))
__case__("insert([[1, 5]], [6, 8])", [[1, 5], [6, 8]], insert([[1, 5]], [6, 8]))
__case__("insert([[3, 5]], [1, 2])", [[1, 2], [3, 5]], insert([[3, 5]], [1, 2]))`))}function oP(){return new b(V([["Solution 1","Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that. So a single pass either extends the interval in hand or begins a new one.",`def merge(intervals):
    # Sorted by start, an interval can only ever overlap the one being built, so
    # a single pass is enough: extend it, or begin a new one.
    out = []
    for start, end in sorted(intervals):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out`],["Solution 2 · Sweep counts","Forget the intervals and keep only their edges: +1 where one opens, −1 where one closes. A merged interval runs from the edge that lifts the running count off zero to the edge that drops it back. Ordering opens before closes at the same coordinate is what makes touching intervals join.",`def merge(intervals):
    # Forget the intervals and keep only their edges: +1 where one opens, -1
    # where one closes. A merged interval runs from the edge that lifts the
    # running count off zero to the edge that drops it back.
    #
    # Sorting -delta ascending puts opens before closes at the same coordinate,
    # so touching intervals join.
    edges = []
    for start, end in intervals:
        edges.append((start, 1))
        edges.append((end, -1))
    edges.sort(key=lambda edge: (edge[0], -edge[1]))

    out = []
    depth = 0
    start = 0
    for position, delta in edges:
        if depth == 0:
            start = position
        depth += delta
        if depth == 0:
            out.append([start, position])
    return out`]]),new k("def merge(intervals):",`def merge(intervals):
    pass`,`try:
    (merge)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("merge([[1, 3], [2, 6], [8, 10], [15, 18]])", [[1, 6], [8, 10], [15, 18]], merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
__case__("merge([[1, 4], [4, 5]])", [[1, 5]], merge([[1, 4], [4, 5]]))
__case__("merge([])", [], merge([]))
__case__("merge([[1, 4], [0, 4]])", [[0, 4]], merge([[1, 4], [0, 4]]))
__case__("merge([[1, 4], [2, 3]])", [[1, 4]], merge([[1, 4], [2, 3]]))`))}function eP(){return new b(V([["Solution 1","Greedy on the end time. Among intervals competing for the same space, keeping the one that finishes earliest leaves the most room for whatever comes next and can never be worse — which is the exchange argument that makes the greedy correct, and the reason sorting by start is the classic wrong first answer.",`def eraseOverlapIntervals(intervals):
    # Greedy on the end: among any set of intervals competing for the same
    # space, keeping the one that finishes earliest leaves the most room for
    # whatever comes next, and can never be worse.
    removed = 0
    last_end = float("-inf")

    for start, end in sorted(intervals, key=lambda interval: interval[1]):
        if start >= last_end:
            last_end = end
        else:
            removed += 1

    return removed`],["Solution 2 · By start","Sorted by start instead. On an overlap one of the two has to go, and dropping whichever ends later is always at least as good — so the greedy choice is made at the moment of the clash rather than baked into the sort order. Same answer, and it needs the running end to be lowered rather than replaced.",`def eraseOverlapIntervals(intervals):
    # Sorted by start instead: on an overlap you must drop one of the two, and
    # dropping whichever ends later is always at least as good. Same greedy
    # argument, made at the moment of the clash rather than in the sort order.
    removed = 0
    last_end = float("-inf")

    for start, end in sorted(intervals):
        if start >= last_end:
            last_end = end
        else:
            removed += 1
            last_end = min(last_end, end)

    return removed`]]),new k("def eraseOverlapIntervals(intervals):",`def eraseOverlapIntervals(intervals):
    pass`,`try:
    (eraseOverlapIntervals)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])", 1, eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))
__case__("eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])", 2, eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
__case__("eraseOverlapIntervals([[1, 2], [2, 3]])", 0, eraseOverlapIntervals([[1, 2], [2, 3]]))
__case__("eraseOverlapIntervals([])", 0, eraseOverlapIntervals([]))
__case__("eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]])", 2, eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]))`))}function IS(){return new b(V([["Solution 1","Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier started earlier still, so it would have clashed with that one first. The whole check is then adjacent pairs.",`def canAttendMeetings(intervals):
    # Sorted by start, the only meeting a given one can clash with is the one
    # immediately before it -- anything earlier started earlier still and would
    # have clashed with that one first.
    ordered = sorted(intervals)
    return all(ordered[i - 1][1] <= ordered[i][0] for i in range(1, len(ordered)))`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair, checked. Worth writing once for the overlap test itself: two intervals overlap when each starts before the other ends, which is far easier to get right than trying to enumerate the ways they miss.`,`def canAttendMeetings(intervals):
    # Every pair, checked. Two intervals overlap when each starts before the
    # other ends -- the condition worth being able to write from memory, since
    # it is easier to get right than its negation.
    for i in range(len(intervals)):
        for j in range(i + 1, len(intervals)):
            a, b = intervals[i], intervals[j]
            if a[0] < b[1] and b[0] < a[1]:
                return False
    return True`]]),new k("def canAttendMeetings(intervals):",`def canAttendMeetings(intervals):
    pass`,`try:
    (canAttendMeetings)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canAttendMeetings([[0, 30], [5, 10], [15, 20]])", False, canAttendMeetings([[0, 30], [5, 10], [15, 20]]))
__case__("canAttendMeetings([[7, 10], [2, 4]])", True, canAttendMeetings([[7, 10], [2, 4]]))
__case__("canAttendMeetings([])", True, canAttendMeetings([]))
__case__("canAttendMeetings([[1, 5]])", True, canAttendMeetings([[1, 5]]))
__case__("canAttendMeetings([[1, 5], [5, 10]])", True, canAttendMeetings([[1, 5], [5, 10]]))
__case__("canAttendMeetings([[5, 10], [1, 6]])", False, canAttendMeetings([[5, 10], [1, 6]]))`))}function ZS(){return new b(V([["Solution 1","Rooms needed is the most meetings ever running at once, so the meetings stop mattering and only their edges do: +1 at a start, −1 at an end, and the answer is how high the running count gets. Closes come before opens at the same time here — a room freed at that moment can be reused — which is the opposite of what merging intervals wants.",`def minMeetingRooms(intervals):
    # Rooms needed is the most meetings ever running at once, so the meetings
    # themselves stop mattering -- only their edges do. Walk the edges in time
    # order and watch how high the count gets.
    edges = []
    for start, end in intervals:
        edges.append((start, 1))
        edges.append((end, -1))

    # A room freed at the same moment another meeting starts can be reused, so
    # closes come before opens here -- the opposite of merging intervals.
    edges.sort()

    depth = 0
    best = 0
    for _position, delta in edges:
        depth += delta
        best = max(best, depth)
    return best`],["Solution 2 · Count at each start",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

The busiest moment is always the start of some meeting, so only n moments are worth testing at all. Count how many meetings cover each and take the largest: no sort, no edge bookkeeping, and it makes clear what the sweep is measuring.`,`def minMeetingRooms(intervals):
    # The busiest moment is always the start of some meeting, so there are only
    # n moments worth testing. Count how many meetings cover each one and take
    # the largest -- O(n^2), and it needs no sort and no edge bookkeeping.
    best = 0
    for start, _end in intervals:
        running = sum(1 for s, e in intervals if s <= start < e)
        best = max(best, running)
    return best`]]),new k("def minMeetingRooms(intervals):",`def minMeetingRooms(intervals):
    pass`,`try:
    (minMeetingRooms)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minMeetingRooms([[0, 30], [5, 10], [15, 20]])", 2, minMeetingRooms([[0, 30], [5, 10], [15, 20]]))
__case__("minMeetingRooms([[7, 10], [2, 4]])", 1, minMeetingRooms([[7, 10], [2, 4]]))
__case__("minMeetingRooms([])", 0, minMeetingRooms([]))
__case__("minMeetingRooms([[1, 5], [5, 10]])", 1, minMeetingRooms([[1, 5], [5, 10]]))
__case__("minMeetingRooms(six overlapping meetings)", 4, minMeetingRooms([[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]))`))}function JS(){return new b(V([["Solution 1",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each query, the smallest interval containing it. O(q·n), and the definition — worth having before the clever version, because it is what you check the clever version against.`,`def minInterval(intervals, queries):
    out = []
    for query in queries:
        lengths = [end - start + 1 for start, end in intervals if start <= query <= end]
        out.append(min(lengths) if lengths else -1)
    return out`],["Solution 2 · Min heap","The O((n + q) log n) answer. Walk the queries in time order, letting in every interval that has started by now, and keep the live ones in a heap ordered by length. The shortest on top is the answer once anything already ended has been discarded — and an interval ends only once, so that discarding is amortised free.",`import heapq


def minInterval(intervals, queries):
    # The O((n + q) log n) answer. Walk the queries in time order, letting in
    # every interval that has started by now, and keep the live ones in a heap
    # by length. The shortest one on top is the answer once anything that has
    # already ended is discarded -- and an interval only ever ends once, so the
    # discarding is amortised free.
    ordered = sorted(intervals)
    answers = {}
    heap = []
    i = 0

    for query in sorted(queries):
        while i < len(ordered) and ordered[i][0] <= query:
            start, end = ordered[i]
            heapq.heappush(heap, (end - start + 1, end))
            i += 1
        while heap and heap[0][1] < query:
            heapq.heappop(heap)
        answers[query] = heap[0][0] if heap else -1

    return [answers[query] for query in queries]`],["Solution 3 · Offline by length","Answer each query once and never revisit it. Taking the intervals shortest first means the first interval to cover a query is already its answer, so a query leaves the pool the moment it is settled and the pool only shrinks. Reordering the work so each answer is final is the technique here, and it generalises well beyond this problem.",`def minInterval(intervals, queries):
    # Answer each query once, and never revisit it. Taking the intervals
    # shortest first means the first interval to cover a query is already its
    # answer, so every query leaves the pool the moment it is settled and the
    # pool only ever shrinks.
    answers = [-1] * len(queries)
    waiting = list(enumerate(queries))

    for start, end in sorted(intervals, key=lambda i: i[1] - i[0]):
        still_waiting = []
        for index, query in waiting:
            if start <= query <= end:
                answers[index] = end - start + 1
            else:
                still_waiting.append((index, query))
        waiting = still_waiting

    return answers`]]),new k("def minInterval(intervals, queries):",`def minInterval(intervals, queries):
    pass`,`try:
    (minInterval)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])", [3, 3, 1, 4], minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]))
__case__("minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])", [2, -1, 4, 6], minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]))
__case__("minInterval([], [1, 2])", [-1, -1], minInterval([], [1, 2]))
__case__("minInterval([[1, 10]], [])", [], minInterval([[1, 10]], []))
__case__("minInterval([[1, 3]], [0, 4])", [-1, -1], minInterval([[1, 3]], [0, 4]))`))}function eY(){return new b(V([["Solution 1","",`from collections import Counter

def topTwo(nums):
    return Counter(nums).most_common(2)

def countOf(nums, value):
    return Counter(nums)[value]`],["Solution 2 · Plain dict","What Counter does underneath: a dict of counts, then a sort. Worth writing once so most_common stops being a black box.",`def topTwo(nums):
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return ordered[:2]

def countOf(nums, value):
    return sum(1 for num in nums if num == value)`]]),new k(`def topTwo(nums):

def countOf(nums, value):`,`def topTwo(nums):
    pass

def countOf(nums, value):
    pass`,`try:
    (topTwo, countOf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topTwo([1, 1, 1, 2, 2, 3])", [(1, 3), (2, 2)], topTwo([1, 1, 1, 2, 2, 3]))
__case__("countOf([1, 1, 2], 1)", 2, countOf([1, 1, 2], 1))
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))`))}function Iq(){return new b(V([["Solution 1","",`from collections import defaultdict

def groupByLength(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)`],["Solution 2 · Setdefault","setdefault does the same job as defaultdict without changing the type of the dictionary — handy when the result is returned or serialised, since there is no default factory left attached to it.",`def groupByLength(words):
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups`]]),new k("def groupByLength(words):",`def groupByLength(words):
    pass`,`try:
    (groupByLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("groupByLength(['a', 'bc', 'de', 'f'])", {1: ["a", "f"], 2: ["bc", "de"]}, groupByLength(["a", "bc", "de", "f"]))
__case__("groupByLength([])", {}, groupByLength([]))`))}function Zq(){return new b(V([["Solution 1","",`from collections import deque

def bfsOrder(graph, start):
    queue = deque([start])
    seen = {start}
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return order`],["Solution 2 · List queue","A list plus a read cursor. The cursor is the point: list.pop(0) is O(n), so a plain list only stays a good queue if you never shift it.",`def bfsOrder(graph, start):
    queue = [start]
    head = 0
    seen = {start}
    order = []

    while head < len(queue):
        node = queue[head]
        head += 1
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return order`]]),new k("def bfsOrder(graph, start):",`def bfsOrder(graph, start):
    pass`,`try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))`))}function Jq(){return new b(V([["Solution 1","",`import heapq

def kSmallest(nums, k):
    heap = list(nums)
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(min(k, len(heap)))]

def kLargest(nums, k):
    heap = [-n for n in nums]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(min(k, len(heap)))]`],["Solution 2 · Sorting","Sorting is O(n log n) against the heap's O(n + k log n). For small k the heap wins; for k near n they are the same, and this is far shorter.",`def kSmallest(nums, k):
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]`]]),new k(`def kSmallest(nums, k):

def kLargest(nums, k):`,`def kSmallest(nums, k):
    pass

def kLargest(nums, k):
    pass`,`try:
    (kSmallest, kLargest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("kSmallest([5, 1, 4, 2], 2)", [1, 2], kSmallest([5, 1, 4, 2], 2))
__case__("kLargest([5, 1, 4, 2], 2)", [5, 4], kLargest([5, 1, 4, 2], 2))
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))`))}function Qq(){return new b(V([["Solution 1","",`def firstIndexOf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1

def dotProduct(a, b):
    return sum(x * y for x, y in zip(a, b))`],["Solution 2 · Index loop","Indexing by hand. It works, and it is exactly what enumerate and zip save you from: the off-by-one risk and the second subscript in dotProduct.",`def firstIndexOf(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

def dotProduct(a, b):
    total = 0
    for i in range(min(len(a), len(b))):
        total += a[i] * b[i]
    return total`]]),new k(`def firstIndexOf(nums, target):

def dotProduct(a, b):`,`def firstIndexOf(nums, target):
    pass

def dotProduct(a, b):
    pass`,`try:
    (firstIndexOf, dotProduct)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("firstIndexOf([9, 8, 7], 8)", 1, firstIndexOf([9, 8, 7], 8))
__case__("firstIndexOf([9, 8, 7], 5)", -1, firstIndexOf([9, 8, 7], 5))
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))`))}function Xq(){return new b(V([["Solution 1","",`def reversedString(s):
    return s[::-1]

def everySecond(s):
    return s[::2]

def lastN(s, n):
    return s[-n:] if n > 0 else ""

def trimEnds(s):
    return s[1:-1]`],["Solution 2 · Explicit loops","Every slice spelled out as a loop. The slices are better in real code; writing them this way once makes the step and the negative bounds obvious.",`def reversedString(s):
    out = ""
    for char in s:
        out = char + out
    return out

def everySecond(s):
    out = ""
    for i in range(0, len(s), 2):
        out += s[i]
    return out

def lastN(s, n):
    if n <= 0:
        return ""
    return "".join(s[i] for i in range(max(len(s) - n, 0), len(s)))

def trimEnds(s):
    return "".join(s[i] for i in range(1, len(s) - 1))`]]),new k(`def reversedString(s):

def everySecond(s):

def lastN(s, n):

def trimEnds(s):`,`def reversedString(s):
    pass

def everySecond(s):
    pass

def lastN(s, n):
    pass

def trimEnds(s):
    pass`,`try:
    (reversedString, everySecond, lastN, trimEnds)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("reversedString('gleam')", "maelg", reversedString("gleam"))
__case__("everySecond('abcdef')", "ace", everySecond("abcdef"))
__case__("lastN('drill', 3)", "ill", lastN("drill", 3))
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))`))}function Yq(){return new b(V([["Solution 1","",`def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))`],["Solution 2 · Decorate sort undecorate","Decorate, sort, undecorate: attach the sort key to each item, sort the pairs, then strip it. `key=` is this pattern built into sorted().",`def sortByLength(words):
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]`]]),new k(`def sortByLength(words):

def sortPairs(pairs):`,`def sortByLength(words):
    pass

def sortPairs(pairs):
    pass`,`try:
    (sortByLength, sortPairs)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("sortByLength(['ccc', 'a', 'bb'])", ["a", "bb", "ccc"], sortByLength(["ccc", "a", "bb"]))
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))`))}function qq(){return new b(V([["Solution 1","",`def joinUpper(chars):
    parts = []
    for c in chars:
        parts.append(c.upper())
    return "".join(parts)`],["Solution 2 · Concatenation","The version join exists to replace. Each `+=` builds a whole new string, so this is quadratic in the output length — fine for two characters, painful for a megabyte.",`def joinUpper(chars):
    out = ""
    for c in chars:
        out += c.upper()
    return out`]]),new k("def joinUpper(chars):",`def joinUpper(chars):
    pass`,`try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))`))}function bO(I){if(I==="nc01_contains_duplicate")return new R(NP());else if(I==="nc02_valid_anagram")return new R(RP());else if(I==="nc03_two_sum")return new R(MP());else if(I==="nc04_group_anagrams")return new R(AP());else if(I==="nc05_top_k_frequent")return new R(DP());else if(I==="nc06_product_except_self")return new R(LP());else if(I==="nc07_longest_consecutive")return new R(BP());else if(I==="nc08_valid_palindrome")return new R(PP());else if(I==="nc09_two_sum_sorted")return new R(SP());else if(I==="nc10_three_sum")return new R(_P());else if(I==="nc11_container_water")return new R(TP());else if(I==="nc12_best_time_stock")return new R(EP());else if(I==="nc13_longest_substring")return new R(hP());else if(I==="nc14_character_replacement")return new R(CP());else if(I==="nc15_permutation_in_string")return new R(wP());else if(I==="nc16_valid_parentheses")return new R(kP());else if(I==="nc17_min_stack")return new R(bP());else if(I==="nc18_daily_temperatures")return new R(yP());else if(I==="nc19_binary_search")return new R(xP());else if(I==="nc20_find_min_rotated")return new R(nP());else if(I==="nc21_search_rotated")return new R(gP());else if(I==="nc22_encode_decode")return new R(fP());else if(I==="nc23_valid_sudoku")return new R(uP());else if(I==="nc24_trapping_rain_water")return new R($P());else if(I==="nc25_min_window_substring")return new R(mP());else if(I==="nc26_sliding_window_maximum")return new R(vP());else if(I==="nc27_eval_rpn")return new R(cP());else if(I==="nc28_generate_parentheses")return new R(pP());else if(I==="nc29_car_fleet")return new R(sP());else if(I==="nc30_largest_rectangle")return new R(dP());else if(I==="nc31_search_2d_matrix")return new R(iP());else if(I==="nc32_koko_bananas")return new R(lP());else if(I==="nc33_time_map")return new R(rP());else if(I==="nc34_median_two_sorted")return new R(aP());else if(I==="nc35_insert_interval")return new R(tP());else if(I==="nc36_merge_intervals")return new R(oP());else if(I==="nc37_non_overlapping")return new R(eP());else if(I==="nc38_meeting_rooms")return new R(IS());else if(I==="nc39_meeting_rooms_ii")return new R(ZS());else if(I==="nc40_min_interval")return new R(JS());else if(I==="tip01_counter")return new R(eY());else if(I==="tip02_defaultdict")return new R(Iq());else if(I==="tip03_deque")return new R(Zq());else if(I==="tip04_heapq")return new R(Jq());else if(I==="tip05_enumerate_zip")return new R(Qq());else if(I==="tip06_slicing")return new R(Xq());else if(I==="tip07_sort_key")return new R(Yq());else if(I==="tip08_join")return new R(qq());else return new V1(void 0)}function xO(){return O5(j5,nZ,(I)=>{return H0(bO(I),(Z)=>{return[Z.solutions,new a(Z.check)]})})}function XS(){return new b(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`export function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`export function containsDuplicate(nums: number[]): boolean {
  const ordered = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] === ordered[i - 1]) return true;
  }
  return false;
}`]]),new k("export function containsDuplicate(nums: number[]): boolean",`export function containsDuplicate(nums: number[]): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.containsDuplicate !== "function") throw new Error("__signature_mismatch__");
  return [
    ["containsDuplicate([1, 2, 3, 1])", show(true), show(solution.containsDuplicate([1, 2, 3, 1]))],
    ["containsDuplicate([1, 2, 3, 4])", show(false), show(solution.containsDuplicate([1, 2, 3, 4]))],
    ["containsDuplicate([])", show(false), show(solution.containsDuplicate([]))],
  ];
}`))}function YS(){return new b(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();
  for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

  for (const char of t) {
    const remaining = counts.get(char);
    if (remaining === undefined || remaining === 0) return false;
    counts.set(char, remaining - 1);
  }

  return true;
}`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`export function isAnagram(s: string, t: string): boolean {
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}`]]),new k("export function isAnagram(s: string, t: string): boolean",`export function isAnagram(s: string, t: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isAnagram !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isAnagram('anagram', 'nagaram')", show(true), show(solution.isAnagram("anagram", "nagaram"))],
    ["isAnagram('rat', 'car')", show(false), show(solution.isAnagram("rat", "car"))],
    ["isAnagram('', '')", show(true), show(solution.isAnagram("", ""))],
    ["isAnagram('a', 'ab')", show(false), show(solution.isAnagram("a", "ab"))],
  ];
}`))}function qS(){return new b(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`],["Solution 2 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`export function twoSum(nums: number[], target: number): number[] {
  const ordered = nums
    .map((num, index) => [num, index] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  let left = 0;
  let right = ordered.length - 1;
  while (left < right) {
    const total = ordered[left][0] + ordered[right][0];
    if (total === target) {
      return [ordered[left][1], ordered[right][1]].sort((a, b) => a - b);
    }
    if (total < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`]]),new k("export function twoSum(nums: number[], target: number): number[]",`export function twoSum(nums: number[], target: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.twoSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["twoSum([2, 7, 11, 15], 9)", show([0, 1]), show(solution.twoSum([2, 7, 11, 15], 9))],
    ["twoSum([3, 2, 4], 6)", show([1, 2]), show(solution.twoSum([3, 2, 4], 6))],
    ["twoSum([3, 3], 6)", show([0, 1]), show(solution.twoSum([3, 3], 6))],
    ["twoSum([1, 2], 7)", show([]), show(solution.twoSum([1, 2], 7))],
  ];
}`))}function KS(){return new b(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const s of strs) {
    // A 26-slot tally is an anagram-invariant key that costs O(len) rather
    // than O(len log len) to build.
    const tally = new Array(26).fill(0);
    for (const char of s) tally[char.charCodeAt(0) - 97]++;
    const key = tally.join(",");

    const group = groups.get(key);
    if (group) {
      group.push(s);
    } else {
      groups.set(key, [s]);
    }
  }

  return [...groups.values()];
}`],["Solution 2 · Sorted key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

The sorted word itself is the key. Shorter than tallying letters, and it works for any alphabet rather than just a-z.`,`export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const s of strs) {
    const key = [...s].sort().join("");
    const group = groups.get(key);
    if (group) {
      group.push(s);
    } else {
      groups.set(key, [s]);
    }
  }

  return [...groups.values()];
}`]]),new k("export function groupAnagrams(strs: string[]): string[][]",`export function groupAnagrams(strs: string[]): string[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

/** Groups may come back in any order, and so may their members. */
const normalise = (groups: string[][]) =>
  groups.map((group) => [...group].sort()).sort((a, b) => (a[0] < b[0] ? -1 : 1));

export function run(): [string, string, string][] {
  if (typeof solution.groupAnagrams !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "groupAnagrams(['eat','tea','tan','ate','nat','bat'])",
      show([["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]),
      show(normalise(solution.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))),
    ],
    ["groupAnagrams([])", show([]), show(normalise(solution.groupAnagrams([])))],
    ["groupAnagrams(['a'])", show([["a"]]), show(normalise(solution.groupAnagrams(["a"])))],
  ];
}`))}function WS(){return new b(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  // A count can never exceed the input length, so one bucket per frequency
  // covers everything and the answer falls out of a single downward walk.
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, frequency] of counts) buckets[frequency].push(num);

  const result: number[] = [];
  for (let frequency = buckets.length - 1; frequency > 0; frequency--) {
    for (const num of buckets[frequency]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Straight sort by frequency: O(n log n) rather than the bucket version's O(n), but it is the version you can write without thinking.`,`export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`]]),new k("export function topKFrequent(nums: number[], k: number): number[]",`export function topKFrequent(nums: number[], k: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.topKFrequent !== "function") throw new Error("__signature_mismatch__");
  return [
    ["topKFrequent([1, 1, 1, 2, 2, 3], 2)", show([1, 2]), show(solution.topKFrequent([1, 1, 1, 2, 2, 3], 2))],
    ["topKFrequent([1], 1)", show([1]), show(solution.topKFrequent([1], 1))],
    ["topKFrequent([5, 5, 4, 4, 4, 3], 1)", show([4]), show(solution.topKFrequent([5, 5, 4, 4, 4, 3], 1))],
  ];
}`))}function GS(){return new b(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`export function productExceptSelf(nums: number[]): number[] {
  const result = new Array(nums.length).fill(1);

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`export function productExceptSelf(nums: number[]): number[] {
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}`]]),new k("export function productExceptSelf(nums: number[]): number[]",`export function productExceptSelf(nums: number[]): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.productExceptSelf !== "function") throw new Error("__signature_mismatch__");
  return [
    ["productExceptSelf([1, 2, 3, 4])", show([24, 12, 8, 6]), show(solution.productExceptSelf([1, 2, 3, 4]))],
    ["productExceptSelf([-1, 1, 0, -3, 3])", show([0, 0, 9, 0, 0]), show(solution.productExceptSelf([-1, 1, 0, -3, 3]))],
    ["productExceptSelf([2, 3])", show([3, 2]), show(solution.productExceptSelf([2, 3]))],
  ];
}`))}function US(){return new b(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`export function longestConsecutive(nums: number[]): number {
  const all = new Set(nums);
  let longest = 0;

  for (const num of all) {
    // Only count from the start of a run, so each run is walked once.
    if (all.has(num - 1)) continue;
    let length = 1;
    while (all.has(num + length)) length++;
    longest = Math.max(longest, length);
  }

  return longest;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`export function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const ordered = [...nums].sort((a, b) => a - b);
  let longest = 1;
  let run = 1;

  for (let i = 1; i < ordered.length; i++) {
    const step = ordered[i] - ordered[i - 1];
    if (step === 0) continue; // duplicates neither extend nor break a run
    if (step === 1) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  return longest;
}`]]),new k("export function longestConsecutive(nums: number[]): number",`export function longestConsecutive(nums: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.longestConsecutive !== "function") throw new Error("__signature_mismatch__");
  return [
    ["longestConsecutive([100, 4, 200, 1, 3, 2])", show(4), show(solution.longestConsecutive([100, 4, 200, 1, 3, 2]))],
    ["longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", show(9), show(solution.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))],
    ["longestConsecutive([])", show(0), show(solution.longestConsecutive([]))],
  ];
}`))}function zS(){return new b(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`],["Solution 2 · Cleaned reverse","Strip, then compare against the reverse. Allocates a second string instead of converging two pointers, but it is one line of intent.",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}`]]),new k("export function isPalindrome(s: string): boolean",`export function isPalindrome(s: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isPalindrome !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isPalindrome('A man, a plan, a canal: Panama')", show(true), show(solution.isPalindrome("A man, a plan, a canal: Panama"))],
    ["isPalindrome('race a car')", show(false), show(solution.isPalindrome("race a car"))],
    ["isPalindrome(' ')", show(true), show(solution.isPalindrome(" "))],
    ["isPalindrome('0P')", show(false), show(solution.isPalindrome("0P"))],
  ];
}`))}function VS(){return new b(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`export function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`export function twoSum(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const wanted = target - numbers[i];
    let lo = i + 1;
    let hi = numbers.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (numbers[mid] === wanted) return [i + 1, mid + 1];
      if (numbers[mid] < wanted) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return [];
}`]]),new k("export function twoSum(numbers: number[], target: number): number[]",`export function twoSum(numbers: number[], target: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.twoSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["twoSum([2, 7, 11, 15], 9)", show([1, 2]), show(solution.twoSum([2, 7, 11, 15], 9))],
    ["twoSum([2, 3, 4], 6)", show([1, 3]), show(solution.twoSum([2, 3, 4], 6))],
    ["twoSum([-1, 0], -1)", show([1, 2]), show(solution.twoSum([-1, 0], -1))],
    ["twoSum([1, 2, 3], 100)", show([]), show(solution.twoSum([1, 2, 3], 100))],
  ];
}`))}function jS(){return new b(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`export function threeSum(nums: number[]): number[][] {
  const ordered = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < ordered.length; i++) {
    if (i > 0 && ordered[i] === ordered[i - 1]) continue;

    let left = i + 1;
    let right = ordered.length - 1;
    while (left < right) {
      const total = ordered[i] + ordered[left] + ordered[right];
      if (total < 0) {
        left++;
      } else if (total > 0) {
        right--;
      } else {
        result.push([ordered[i], ordered[left], ordered[right]]);
        left++;
        while (left < right && ordered[left] === ordered[left - 1]) left++;
      }
    }
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`export function threeSum(nums: number[]): number[][] {
  const ordered = [...nums].sort((a, b) => a - b);
  const seen = new Set<string>();
  const result: number[][] = [];

  for (let i = 0; i < ordered.length; i++) {
    for (let j = i + 1; j < ordered.length; j++) {
      for (let k = j + 1; k < ordered.length; k++) {
        if (ordered[i] + ordered[j] + ordered[k] !== 0) continue;
        const triple = [ordered[i], ordered[j], ordered[k]];
        const key = triple.join(",");
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(triple);
      }
    }
  }

  return result;
}`]]),new k("export function threeSum(nums: number[]): number[][]",`export function threeSum(nums: number[]): number[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

/** Triples are compared as a set: only their contents are meaningful. */
const normalise = (triples: number[][]) => triples.map((t) => show(t)).sort();

export function run(): [string, string, string][] {
  if (typeof solution.threeSum !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "threeSum([-1, 0, 1, 2, -1, -4])",
      show(["[-1,-1,2]", "[-1,0,1]"]),
      show(normalise(solution.threeSum([-1, 0, 1, 2, -1, -4]))),
    ],
    ["threeSum([0, 1, 1])", show([]), show(normalise(solution.threeSum([0, 1, 1])))],
    ["threeSum([0, 0, 0])", show(["[0,0,0]"]), show(normalise(solution.threeSum([0, 0, 0])))],
  ];
}`))}function OS(){return new b(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    // Moving the taller line in can never help: the shorter one caps the area.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`export function maxArea(height: number[]): number {
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}`]]),new k("export function maxArea(height: number[]): number",`export function maxArea(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}`))}function FS(){return new b(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`export function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let profit = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    profit = Math.max(profit, price - lowest);
  }
  return profit;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`export function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      profit = Math.max(profit, prices[sell] - prices[buy]);
    }
  }
  return profit;
}`]]),new k("export function maxProfit(prices: number[]): number",`export function maxProfit(prices: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxProfit !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxProfit([7, 1, 5, 3, 6, 4])", show(5), show(solution.maxProfit([7, 1, 5, 3, 6, 4]))],
    ["maxProfit([7, 6, 4, 3, 1])", show(0), show(solution.maxProfit([7, 6, 4, 3, 1]))],
    ["maxProfit([])", show(0), show(solution.maxProfit([]))],
  ];
}`))}function HS(){return new b(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`export function lengthOfLongestSubstring(s: string): number {
  const window = new Set<string>();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }
    window.add(s[right]);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}`],["Solution 2 · Index scan","No set and no map: ask the string itself whether this character already appeared inside the current window, and if so restart just past it.",`export function lengthOfLongestSubstring(s: string): number {
  let longest = 0;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const found = s.slice(start, right).indexOf(s[right]);
    if (found !== -1) start = start + found + 1;
    longest = Math.max(longest, right - start + 1);
  }

  return longest;
}`]]),new k("export function lengthOfLongestSubstring(s: string): number",`export function lengthOfLongestSubstring(s: string): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.lengthOfLongestSubstring !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lengthOfLongestSubstring('abcabcbb')", show(3), show(solution.lengthOfLongestSubstring("abcabcbb"))],
    ["lengthOfLongestSubstring('bbbbb')", show(1), show(solution.lengthOfLongestSubstring("bbbbb"))],
    ["lengthOfLongestSubstring('pwwkew')", show(3), show(solution.lengthOfLongestSubstring("pwwkew"))],
    ["lengthOfLongestSubstring('')", show(0), show(solution.lengthOfLongestSubstring(""))],
  ];
}`))}function NS(){return new b(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`export function characterReplacement(s: string, k: number): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxCount = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    const count = (counts.get(s[right]) ?? 0) + 1;
    counts.set(s[right], count);
    maxCount = Math.max(maxCount, count);

    while (right - left + 1 - maxCount > k) {
      counts.set(s[left], (counts.get(s[left]) ?? 1) - 1);
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function characterReplacement(s: string, k: number): number {
  let longest = 0;

  for (const target of ALPHABET) {
    let left = 0;
    let others = 0;
    for (let right = 0; right < s.length; right++) {
      if (s[right] !== target) others++;
      while (others > k) {
        if (s[left] !== target) others--;
        left++;
      }
      longest = Math.max(longest, right - left + 1);
    }
  }

  return longest;
}`]]),new k("export function characterReplacement(s: string, k: number): number",`export function characterReplacement(s: string, k: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.characterReplacement !== "function") throw new Error("__signature_mismatch__");
  return [
    ["characterReplacement('ABAB', 2)", show(4), show(solution.characterReplacement("ABAB", 2))],
    ["characterReplacement('AABABBA', 1)", show(4), show(solution.characterReplacement("AABABBA", 1))],
    ["characterReplacement('AAAA', 0)", show(4), show(solution.characterReplacement("AAAA", 0))],
  ];
}`))}function RS(){return new b(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  // Fixed 26-slot tallies, compared slot by slot as the window slides.
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const slot = (char: string) => char.charCodeAt(0) - 97;

  for (let i = 0; i < s1.length; i++) {
    need[slot(s1[i])]++;
    window[slot(s2[i])]++;
  }

  const matches = () => need.every((count, i) => count === window[i]);
  if (matches()) return true;

  for (let i = s1.length; i < s2.length; i++) {
    window[slot(s2[i])]++;
    window[slot(s2[i - s1.length])]--;
    if (matches()) return true;
  }

  return false;
}`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const needle = [...s1].sort().join("");
  for (let start = 0; start + s1.length <= s2.length; start++) {
    if ([...s2.slice(start, start + s1.length)].sort().join("") === needle) {
      return true;
    }
  }

  return false;
}`]]),new k("export function checkInclusion(s1: string, s2: string): boolean",`export function checkInclusion(s1: string, s2: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.checkInclusion !== "function") throw new Error("__signature_mismatch__");
  return [
    ["checkInclusion('ab', 'eidbaooo')", show(true), show(solution.checkInclusion("ab", "eidbaooo"))],
    ["checkInclusion('ab', 'eidboaoo')", show(false), show(solution.checkInclusion("ab", "eidboaoo"))],
    ["checkInclusion('adc', 'dcda')", show(true), show(solution.checkInclusion("adc", "dcda"))],
  ];
}`))}function MS(){return new b(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`export function isValid(s: string): boolean {
  const closerFor: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  for (const char of s) {
    if (closerFor[char]) {
      stack.push(closerFor[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`export function isValid(s: string): boolean {
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}`]]),new k("export function isValid(s: string): boolean",`export function isValid(s: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isValid !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValid('()[]{}')", show(true), show(solution.isValid("()[]{}"))],
    ["isValid('(]')", show(false), show(solution.isValid("(]"))],
    ["isValid('([)]')", show(false), show(solution.isValid("([)]"))],
    ["isValid('{[]}')", show(true), show(solution.isValid("{[]}"))],
    ["isValid('(')", show(false), show(solution.isValid("("))],
  ];
}`))}function AS(){return new b(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`export class MinStack {
  private values: number[] = [];
  private minimums: number[] = [];

  push(val: number): void {
    this.values.push(val);
    const smallest = this.minimums.length === 0
      ? val
      : Math.min(val, this.minimums[this.minimums.length - 1]);
    this.minimums.push(smallest);
  }

  pop(): void {
    this.values.pop();
    this.minimums.pop();
  }

  top(): number {
    return this.values[this.values.length - 1];
  }

  getMin(): number {
    return this.minimums[this.minimums.length - 1];
  }
}`],["Solution 2 · Pair stack","Each entry carries the minimum of everything at or below it, so getMin is a peek. One structure instead of two, at the cost of a second number per value.",`export class MinStack {
  private entries: [number, number][] = [];

  push(val: number): void {
    const smallest = this.entries.length === 0
      ? val
      : Math.min(val, this.entries[this.entries.length - 1][1]);
    this.entries.push([val, smallest]);
  }

  pop(): void {
    this.entries.pop();
  }

  top(): number {
    return this.entries[this.entries.length - 1][0];
  }

  getMin(): number {
    return this.entries[this.entries.length - 1][1];
  }
}`]]),new k(`export class MinStack
  push(val: number): void
  pop(): void
  top(): number
  getMin(): number`,`export class MinStack {
  push(val: number): void {
    // todo
  }
  pop(): void {
    // todo
  }
  top(): number {
    // todo
  }
  getMin(): number {
    // todo
  }
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.MinStack !== "function") throw new Error("__signature_mismatch__");
  const stack = new solution.MinStack();
  stack.push(-2);
  stack.push(0);
  stack.push(-3);
  const minAfterPushes = stack.getMin();
  stack.pop();
  return [
    ["getMin() after push -2, 0, -3", show(-3), show(minAfterPushes)],
    ["top() after pop()", show(0), show(stack.top())],
    ["getMin() after pop()", show(-2), show(stack.getMin())],
  ];
}`))}function DS(){return new b(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`export function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // indices, temperatures decreasing

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const earlier = stack.pop()!;
      result[earlier] = i - earlier;
    }
    stack.push(i);
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`export function dailyTemperatures(temperatures: number[]): number[] {
  return temperatures.map((temp, i) => {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temp) return j - i;
    }
    return 0;
  });
}`]]),new k("export function dailyTemperatures(temperatures: number[]): number[]",`export function dailyTemperatures(temperatures: number[]): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.dailyTemperatures !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])",
      show([1, 1, 4, 2, 1, 1, 0, 0]),
      show(solution.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])),
    ],
    ["dailyTemperatures([30, 40, 50, 60])", show([1, 1, 1, 0]), show(solution.dailyTemperatures([30, 40, 50, 60]))],
    ["dailyTemperatures([30, 30, 30])", show([0, 0, 0]), show(solution.dailyTemperatures([30, 30, 30]))],
  ];
}`))}function LS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`],["Solution 2 · Recursive",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The same halving as recursion. The bounds are arguments rather than mutated locals, which makes each step's invariant easier to see.`,`export function search(nums: number[], target: number): number {
  return halve(nums, target, 0, nums.length - 1);
}

function halve(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return halve(nums, target, mid + 1, hi);
  return halve(nums, target, lo, mid - 1);
}`]]),new k("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([-1, 0, 3, 5, 9, 12], 9)", show(4), show(solution.search([-1, 0, 3, 5, 9, 12], 9))],
    ["search([-1, 0, 3, 5, 9, 12], 2)", show(-1), show(solution.search([-1, 0, 3, 5, 9, 12], 2))],
    ["search([5], 5)", show(0), show(solution.search([5], 5))],
    ["search([], 1)", show(-1), show(solution.search([], 1))],
  ];
}`))}function BS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`export function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = (left + right) >> 1;
    // Anything past a value larger than the last element is still on the high
    // side of the rotation.
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`export function findMin(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return nums[i];
  }
  return nums[0];
}`]]),new k("export function findMin(nums: number[]): number",`export function findMin(nums: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMin !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMin([3, 4, 5, 1, 2])", show(1), show(solution.findMin([3, 4, 5, 1, 2]))],
    ["findMin([4, 5, 6, 7, 0, 1, 2])", show(0), show(solution.findMin([4, 5, 6, 7, 0, 1, 2]))],
    ["findMin([11, 13, 15, 17])", show(11), show(solution.findMin([11, 13, 15, 17]))],
    ["findMin([2, 1])", show(1), show(solution.findMin([2, 1]))],
  ];
}`))}function PS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // Left half is sorted.
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted.
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`export function search(nums: number[], target: number): number {
  const pivot = rotationPoint(nums);
  const found = binarySearch(nums, target, 0, pivot - 1);
  if (found !== -1) return found;
  return binarySearch(nums, target, pivot, nums.length - 1);
}

function rotationPoint(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return i;
  }
  return 0;
}

function binarySearch(nums: number[], target: number, lo: number, hi: number): number {
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}`]]),new k("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([4, 5, 6, 7, 0, 1, 2], 0)", show(4), show(solution.search([4, 5, 6, 7, 0, 1, 2], 0))],
    ["search([4, 5, 6, 7, 0, 1, 2], 3)", show(-1), show(solution.search([4, 5, 6, 7, 0, 1, 2], 3))],
    ["search([1], 1)", show(0), show(solution.search([1], 1))],
    ["search([4, 5, 6, 7, 0, 1, 2], 6)", show(2), show(solution.search([4, 5, 6, 7, 0, 1, 2], 6))],
  ];
}`))}function SS(){return new b(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
export function encode(strs: string[]): string {
  return strs.map((s) => \`\${s.length}#\${s}\`).join("");
}

export function decode(s: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const hashAt = s.indexOf("#", i);
    const length = Number(s.slice(i, hashAt));
    const start = hashAt + 1;
    out.push(s.slice(start, start + length));
    i = start + length;
  }
  return out;
}`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
const SEPARATOR = "|";
const ESCAPE = "\\\\";

export function encode(strs: string[]): string {
  return strs
    .map(
      (s) =>
        SEPARATOR +
        s.split(ESCAPE).join(ESCAPE + ESCAPE).split(SEPARATOR).join(ESCAPE + SEPARATOR),
    )
    .join("");
}

export function decode(s: string): string[] {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  if (s === "") return [];
  const out: string[] = [];
  let current = "";
  let i = 1;
  while (i < s.length) {
    if (s[i] === ESCAPE) {
      current += s[i + 1];
      i += 2;
    } else if (s[i] === SEPARATOR) {
      out.push(current);
      current = "";
      i += 1;
    } else {
      current += s[i];
      i += 1;
    }
  }
  out.push(current);
  return out;
}`]]),new k(`export function encode(strs: string[]): string

export function decode(s: string): string[]`,`export function encode(strs: string[]): string {
  // todo
}

export function decode(s: string): string[] {
  // todo
}`,`
import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Only the round trip is specified: any encoding is fine as long as decode
// undoes it, so every case runs both directions.
const roundTrip = (strs: string[]) => solution.decode(solution.encode(strs));

export function run(): [string, string, string][] {
  if (typeof solution.encode !== "function" || typeof solution.decode !== "function") {
    throw new Error("__signature_mismatch__");
  }
  return [
    ["decode(encode(['neet', 'code', 'love', 'you']))", show(["neet", "code", "love", "you"]), show(roundTrip(["neet", "code", "love", "you"]))],
    ["decode(encode([]))", show([]), show(roundTrip([]))],
    ["decode(encode(['', '']))", show(["", ""]), show(roundTrip(["", ""]))],
    ["decode(encode(['3#x', 'a|b']))", show(["3#x", "a|b"]), show(roundTrip(["3#x", "a|b"]))],
    ["decode(encode(['\\\\\\\\', '|', '#']))", show(["\\\\", "|", "#"]), show(roundTrip(["\\\\", "|", "#"]))],
  ];
}`))}function _S(){return new b(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`export function isValidSudoku(board: string[][]): boolean {
  const seen = new Set<string>();
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const value = board[r][c];
      if (value === ".") continue;
      const keys = [
        \`\${value} row \${r}\`,
        \`\${value} col \${c}\`,
        \`\${value} box \${Math.floor(r / 3) * 3 + Math.floor(c / 3)}\`,
      ];
      if (keys.some((key) => seen.has(key))) return false;
      for (const key of keys) seen.add(key);
    }
  }
  return true;
}`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`export function isValidSudoku(board: string[][]): boolean {
  return units(board).every(noDuplicates);
}

function units(board: string[][]): string[][] {
  const columns = board[0].map((_, c) => board.map((row) => row[c]));
  const boxes: string[][] = [];
  for (let br = 0; br < 9; br += 3) {
    for (let bc = 0; bc < 9; bc += 3) {
      const box: string[] = [];
      for (let r = br; r < br + 3; r++) {
        for (let c = bc; c < bc + 3; c++) box.push(board[r][c]);
      }
      boxes.push(box);
    }
  }
  return [...board, ...columns, ...boxes];
}

function noDuplicates(unit: string[]): boolean {
  const filled = unit.filter((value) => value !== ".");
  return filled.length === new Set(filled).size;
}`]]),new k("export function isValidSudoku(board: string[][]): boolean",`export function isValidSudoku(board: string[][]): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Nine row strings rather than a 9x9 literal: the board stays readable, and a
// single changed cell is what each invalid case is.
const ROWS = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79",
];

const board = () => ROWS.map((row) => row.split(""));

const withCell = (r: number, c: number, value: string) => {
  const grid = board();
  grid[r][c] = value;
  return grid;
};

export function run(): [string, string, string][] {
  if (typeof solution.isValidSudoku !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValidSudoku(valid board)", show(true), show(solution.isValidSudoku(board()))],
    ["isValidSudoku(5 twice in row 0)", show(false), show(solution.isValidSudoku(withCell(0, 2, "5")))],
    ["isValidSudoku(5 twice in column 0, different boxes)", show(false), show(solution.isValidSudoku(withCell(3, 0, "5")))],
    ["isValidSudoku(3 twice in the top-left box only)", show(false), show(solution.isValidSudoku(withCell(2, 0, "3")))],
    ["isValidSudoku(empty board)", show(true), show(solution.isValidSudoku(Array.from({ length: 9 }, () => Array(9).fill("."))))],
  ];
}`))}function TS(){return new b(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`export function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      total += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      total += rightMax - height[right];
      right--;
    }
  }

  return total;
}`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`export function trap(height: number[]): number {
  const left: number[] = [];
  let best = 0;
  for (const h of height) {
    best = Math.max(best, h);
    left.push(best);
  }

  const right = new Array<number>(height.length);
  best = 0;
  for (let i = height.length - 1; i >= 0; i--) {
    best = Math.max(best, height[i]);
    right[i] = best;
  }

  return height.reduce((total, h, i) => total + Math.min(left[i], right[i]) - h, 0);
}`]]),new k("export function trap(height: number[]): number",`export function trap(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.trap !== "function") throw new Error("__signature_mismatch__");
  return [
    ["trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", show(6), show(solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))],
    ["trap([4, 2, 0, 3, 2, 5])", show(9), show(solution.trap([4, 2, 0, 3, 2, 5]))],
    ["trap([])", show(0), show(solution.trap([]))],
    ["trap([3])", show(0), show(solution.trap([3]))],
    ["trap([2, 0, 2])", show(2), show(solution.trap([2, 0, 2]))],
    ["trap([5, 4, 3, 2, 1])", show(0), show(solution.trap([5, 4, 3, 2, 1]))],
  ];
}`))}function ES(){return new b(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if ((need.get(c) ?? 0) > 0) missing--;
    need.set(c, (need.get(c) ?? 0) - 1);

    while (missing === 0) {
      if (bestLength === 0 || right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      const leaving = s[left];
      need.set(leaving, (need.get(leaving) ?? 0) + 1);
      if ((need.get(leaving) ?? 0) > 0) missing++;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  // Only the positions that could possibly matter. For a long haystack and a
  // short needle this is a far shorter walk than the whole string.
  const positions: [number, string][] = [];
  for (let i = 0; i < s.length; i++) {
    if (need.has(s[i])) positions.push([i, s[i]]);
  }

  const window = new Map<string, number>();
  let satisfied = 0;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (const [index, c] of positions) {
    window.set(c, (window.get(c) ?? 0) + 1);
    if (window.get(c) === need.get(c)) satisfied++;

    while (satisfied === need.size) {
      const [start, leaving] = positions[left];
      const length = index - start + 1;
      if (bestLength === 0 || length < bestLength) {
        bestStart = start;
        bestLength = length;
      }
      window.set(leaving, (window.get(leaving) ?? 0) - 1);
      if ((window.get(leaving) ?? 0) < (need.get(leaving) ?? 0)) satisfied--;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}`]]),new k("export function minWindow(s: string, t: string): string",`export function minWindow(s: string, t: string): string {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minWindow('ADOBECODEBANC', 'ABC')", show("BANC"), show(solution.minWindow("ADOBECODEBANC", "ABC"))],
    ["minWindow('a', 'a')", show("a"), show(solution.minWindow("a", "a"))],
    ["minWindow('a', 'aa')", show(""), show(solution.minWindow("a", "aa"))],
    ["minWindow('', 'a')", show(""), show(solution.minWindow("", "a"))],
    ["minWindow('ab', '')", show(""), show(solution.minWindow("ab", ""))],
    ["minWindow('aaflslflsldkalskaaa', 'aaa')", show("aaa"), show(solution.minWindow("aaflslflsldkalskaaa", "aaa"))],
  ];
}`))}function hS(){return new b(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];

  const n = nums.length;
  const left = new Array<number>(n);
  const right = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    left[i] = i % k === 0 ? nums[i] : Math.max(left[i - 1], nums[i]);
  }
  for (let i = n - 1; i >= 0; i--) {
    right[i] = i === n - 1 || (i + 1) % k === 0 ? nums[i] : Math.max(right[i + 1], nums[i]);
  }

  // Every window of width k straddles at most one block boundary, so it is
  // covered by a suffix of one block and a prefix of the next.
  const out: number[] = [];
  for (let i = 0; i + k <= n; i++) out.push(Math.max(right[i], left[i + k - 1]));
  return out;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];
  const out: number[] = [];
  for (let i = 0; i + k <= nums.length; i++) out.push(Math.max(...nums.slice(i, i + k)));
  return out;
}`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0) return [];

  // Indices, their values decreasing. \`head\` rather than shift(), which would
  // make every expiry O(n) and quietly undo the point of the deque.
  const window: number[] = [];
  let head = 0;
  const out: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (window.length > head && nums[window[window.length - 1]] <= nums[i]) window.pop();
    window.push(i);
    if (window[head] <= i - k) head++;
    if (i >= k - 1) out.push(nums[window[head]]);
  }

  return out;
}`]]),new k("export function maxSlidingWindow(nums: number[], k: number): number[]",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxSlidingWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", show([3, 3, 5, 5, 6, 7]), show(solution.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))],
    ["maxSlidingWindow([1], 1)", show([1]), show(solution.maxSlidingWindow([1], 1))],
    ["maxSlidingWindow([], 3)", show([]), show(solution.maxSlidingWindow([], 3))],
    ["maxSlidingWindow([9, 8, 7, 6], 2)", show([9, 8, 7]), show(solution.maxSlidingWindow([9, 8, 7, 6], 2))],
    ["maxSlidingWindow([1, -1], 1)", show([1, -1]), show(solution.maxSlidingWindow([1, -1], 1))],
    ["maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", show([7, 7, 7, 7, 7]), show(solution.maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))],
  ];
}`))}function CS(){return new b(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (OPERATORS.has(token) && stack.length >= 2) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(apply(token, a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.length ? stack[stack.length - 1] : 0;
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  // trunc, not floor: the problem wants -3 / 2 to be -1.
  return Math.trunc(a / b);
}`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  return take(tokens, tokens.length - 1)[0];
}

// Read right to left: the last token is the outermost operator, and each
// operator takes its right operand first because that is what sits nearer the
// end. Returns the value and the index still to be read.
function take(tokens: string[], i: number): [number, number] {
  const token = tokens[i];
  if (!OPERATORS.has(token)) return [Number(token), i - 1];
  const [right, afterRight] = take(tokens, i - 1);
  const [left, afterLeft] = take(tokens, afterRight);
  return [apply(token, left, right), afterLeft];
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  return Math.trunc(a / b);
}`]]),new k("export function evalRPN(tokens: string[]): number",`export function evalRPN(tokens: string[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.evalRPN !== "function") throw new Error("__signature_mismatch__");
  return [
    ["evalRPN(['2', '1', '+', '3', '*'])", show(9), show(solution.evalRPN(["2", "1", "+", "3", "*"]))],
    ["evalRPN(['4', '13', '5', '/', '+'])", show(6), show(solution.evalRPN(["4", "13", "5", "/", "+"]))],
    ["evalRPN(['-3', '2', '/'])", show(-1), show(solution.evalRPN(["-3", "2", "/"]))],
    ["evalRPN(['5'])", show(5), show(solution.evalRPN(["5"]))],
    ["evalRPN(the long one)", show(22), show(solution.evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))],
  ];
}`))}function wS(){return new b(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`export function generateParenthesis(n: number): string[] {
  const out: string[] = [];

  // Two counters, one rule each: an opener is legal while any are left, and a
  // closer is legal only while more are outstanding than openers. Everything
  // reached with both at zero is valid by construction.
  const build = (openLeft: number, closeLeft: number, current: string) => {
    if (openLeft === 0 && closeLeft === 0) {
      out.push(current);
      return;
    }
    if (openLeft > 0) build(openLeft - 1, closeLeft, current + "(");
    if (closeLeft > openLeft) build(openLeft, closeLeft - 1, current + ")");
  };

  build(n, n, "");
  return out;
}`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`export function generateParenthesis(n: number): string[] {
  return compose(n);
}

// Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
// is whatever the first bracket encloses, B is whatever follows it. Enumerating
// the splits enumerates the strings, with no validity rule to check at all.
function compose(n: number): string[] {
  if (n <= 0) return [""];
  const out: string[] = [];
  for (let inner = 0; inner < n; inner++) {
    for (const a of compose(inner)) {
      for (const b of compose(n - 1 - inner)) out.push(\`(\${a})\${b}\`);
    }
  }
  return out;
}`]]),new k("export function generateParenthesis(n: number): string[]",`export function generateParenthesis(n: number): string[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Any order is acceptable, so every case compares sorted.
const sorted = (n: number) => [...solution.generateParenthesis(n)].sort();

export function run(): [string, string, string][] {
  if (typeof solution.generateParenthesis !== "function") throw new Error("__signature_mismatch__");
  return [
    ["generateParenthesis(1)", show(["()"]), show(sorted(1))],
    ["generateParenthesis(2)", show(["(())", "()()"]), show(sorted(2))],
    ["generateParenthesis(3)", show(["((()))", "(()())", "(())()", "()(())", "()()()"]), show(sorted(3))],
    ["generateParenthesis(4) count", show(14), show(sorted(4).length)],
  ];
}`))}function kS(){return new b(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  cars.sort((a, b) => b[0] - a[0]);

  let fleets = 0;
  let leadDistance = 0;
  let leadSpeed = 1;

  for (const [pos, spd] of cars) {
    const distance = target - pos;
    // distance/spd > leadDistance/leadSpeed, cross-multiplied so the arrival
    // times never have to become fractions.
    if (distance * leadSpeed > leadDistance * spd) {
      fleets++;
      leadDistance = distance;
      leadSpeed = spd;
    }
  }

  return fleets;
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  return cars.filter((car) => leads(car, cars, target)).length;
}

// A car leads a fleet exactly when it arrives strictly later than every car
// ahead of it; anything else means it catches one of them and merges. No
// sorting, no running state -- O(n^2), and the definition rather than a
// consequence of it.
function leads(car: [number, number], cars: [number, number][], target: number): boolean {
  const [pos, spd] = car;
  return cars
    .filter(([otherPos]) => otherPos > pos)
    .every(([otherPos, otherSpeed]) => (target - pos) * otherSpeed > (target - otherPos) * spd);
}`]]),new k("export function carFleet(target: number, position: number[], speed: number[]): number",`export function carFleet(target: number, position: number[], speed: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.carFleet !== "function") throw new Error("__signature_mismatch__");
  return [
    ["carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", show(3), show(solution.carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))],
    ["carFleet(10, [3], [3])", show(1), show(solution.carFleet(10, [3], [3]))],
    ["carFleet(100, [0, 2, 4], [4, 2, 1])", show(1), show(solution.carFleet(100, [0, 2, 4], [4, 2, 1]))],
    ["carFleet(10, [6, 8], [3, 2])", show(2), show(solution.carFleet(10, [6, 8], [3, 2]))],
    ["carFleet(10, [], [])", show(0), show(solution.carFleet(10, [], []))],
    ["carFleet(10, [0, 4, 2], [2, 1, 3])", show(1), show(solution.carFleet(10, [0, 4, 2], [2, 1, 3]))],
  ];
}`))}function bS(){return new b(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`export function largestRectangleArea(heights: number[]): number {
  const stack: [number, number][] = [];
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    // Anything taller than the new bar can never extend past it, so its
    // rectangle is finished here. Whatever it reached back to becomes this
    // bar's own starting point.
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [from, tall] = stack.pop()!;
      best = Math.max(best, tall * (i - from));
      start = from;
    }
    stack.push([start, heights[i]]);
  }

  // Whatever survives was never cut off, so it runs to the far end.
  for (const [from, tall] of stack) {
    best = Math.max(best, tall * (heights.length - from));
  }

  return best;
}`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`export function largestRectangleArea(heights: number[]): number {
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    // How far this bar's own height can spread in each direction. O(n^2), and
    // the definition of the answer: every rectangle is some bar taken as far as
    // it will go.
    let left = i;
    while (left > 0 && heights[left - 1] >= heights[i]) left--;
    let right = i;
    while (right + 1 < heights.length && heights[right + 1] >= heights[i]) right++;
    best = Math.max(best, heights[i] * (right - left + 1));
  }

  return best;
}`]]),new k("export function largestRectangleArea(heights: number[]): number",`export function largestRectangleArea(heights: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.largestRectangleArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["largestRectangleArea([2, 1, 5, 6, 2, 3])", show(10), show(solution.largestRectangleArea([2, 1, 5, 6, 2, 3]))],
    ["largestRectangleArea([2, 4])", show(4), show(solution.largestRectangleArea([2, 4]))],
    ["largestRectangleArea([])", show(0), show(solution.largestRectangleArea([]))],
    ["largestRectangleArea([1, 1, 1])", show(3), show(solution.largestRectangleArea([1, 1, 1]))],
    ["largestRectangleArea([5])", show(5), show(solution.largestRectangleArea([5]))],
    ["largestRectangleArea([4, 2, 0, 3, 2, 5])", show(6), show(solution.largestRectangleArea([4, 2, 0, 3, 2, 5]))],
  ];
}`))}function yS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`export function searchMatrix(matrix: number[][], target: number): boolean {
  // The rows are sorted and do not overlap, so the row a value could live in is
  // itself found by halving: compare the target against a row's ends.
  let low = 0;
  let high = matrix.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const row = matrix[mid];
    if (row[row.length - 1] < target) low = mid + 1;
    else if (row[0] > target) high = mid - 1;
    else return contains(row, target);
  }
  return false;
}

function contains(row: number[], target: number): boolean {
  let low = 0;
  let high = row.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (row[mid] === target) return true;
    if (row[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`export function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  // From the top-right corner every step is forced: too big and the whole
  // column is too big, so drop it; too small and the whole row is too small, so
  // drop that. O(m + n), and it never uses the fact that rows do not overlap --
  // it works on any matrix sorted along both axes.
  let row = 0;
  let column = matrix[0].length - 1;
  while (row < matrix.length && column >= 0) {
    const value = matrix[row][column];
    if (value === target) return true;
    if (value > target) column--;
    else row++;
  }
  return false;
}`]]),new k("export function searchMatrix(matrix: number[][], target: number): boolean",`export function searchMatrix(matrix: number[][], target: number): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const MATRIX = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];

export function run(): [string, string, string][] {
  if (typeof solution.searchMatrix !== "function") throw new Error("__signature_mismatch__");
  return [
    ["searchMatrix(matrix, 3)", show(true), show(solution.searchMatrix(MATRIX, 3))],
    ["searchMatrix(matrix, 13)", show(false), show(solution.searchMatrix(MATRIX, 13))],
    ["searchMatrix(matrix, 60)", show(true), show(solution.searchMatrix(MATRIX, 60))],
    ["searchMatrix([[1]], 1)", show(true), show(solution.searchMatrix([[1]], 1))],
    ["searchMatrix([], 1)", show(false), show(solution.searchMatrix([], 1))],
    ["searchMatrix([[1], [3], [5]], 5)", show(true), show(solution.searchMatrix([[1], [3], [5]], 5))],
  ];
}`))}function xS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`export function minEatingSpeed(piles: number[], h: number): number {
  // The search space is the answer, not the input. Feasibility is monotone --
  // if a speed finishes in time then so does every faster one -- which is
  // exactly the property halving needs.
  let low = 1;
  let high = Math.max(...piles);
  while (low < high) {
    const mid = (low + high) >> 1;
    if (hours(piles, mid) <= h) high = mid;
    else low = mid + 1;
  }
  return low;
}

// A pile never shares an hour with another, so each costs ceil(pile / speed).
function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`export function minEatingSpeed(piles: number[], h: number): number {
  const highest = Math.max(...piles);
  let speed = 1;
  while (speed < highest && hours(piles, speed) > h) speed++;
  return speed;
}

function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}`]]),new k("export function minEatingSpeed(piles: number[], h: number): number",`export function minEatingSpeed(piles: number[], h: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minEatingSpeed !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minEatingSpeed([3, 6, 7, 11], 8)", show(4), show(solution.minEatingSpeed([3, 6, 7, 11], 8))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 5)", show(30), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 5))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 6)", show(23), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 6))],
    ["minEatingSpeed([1], 1)", show(1), show(solution.minEatingSpeed([1], 1))],
    ["minEatingSpeed([4, 4, 4, 4], 4)", show(4), show(solution.minEatingSpeed([4, 4, 4, 4], 4))],
    ["minEatingSpeed([1, 1, 1, 10], 4)", show(10), show(solution.minEatingSpeed([1, 1, 1, 10], 4))],
  ];
}`))}function nS(){return new b(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    // Timestamps only ever increase, so appending keeps each key's history
    // sorted for free.
    const history = this.store.get(key);
    if (history) history.push([timestamp, value]);
    else this.store.set(key, [[timestamp, value]]);
  }

  get(key: string, timestamp: number): string {
    // The history is sorted, so the newest entry at or before a timestamp is a
    // halving question, not a walk.
    const history = this.store.get(key) ?? [];
    let low = 0;
    let high = history.length - 1;
    let best = "";
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (history[mid][0] <= timestamp) {
        best = history[mid][1];
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return best;
  }
}`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    this.store.set(key, [[timestamp, value], ...(this.store.get(key) ?? [])]);
  }

  get(key: string, timestamp: number): string {
    // Newest first, so the first entry old enough is the answer. O(n) per
    // lookup against the halving version's O(log n), but there is no split
    // arithmetic to get wrong.
    for (const [stamp, value] of this.store.get(key) ?? []) {
      if (stamp <= timestamp) return value;
    }
    return "";
  }
}`]]),new k(`export class TimeMap
  set(key: string, value: string, timestamp: number): void
  get(key: string, timestamp: number): string`,`export class TimeMap {
  set(key: string, value: string, timestamp: number): void {
    // todo
  }
  get(key: string, timestamp: number): string {
    // todo
  }
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.TimeMap !== "function") throw new Error("__signature_mismatch__");

  const store = new solution.TimeMap();
  store.set("foo", "bar", 1);

  const cases: [string, string, string][] = [
    ["get('foo', 1) after set at 1", show("bar"), show(store.get("foo", 1))],
    ["get('foo', 3) with only the value at 1", show("bar"), show(store.get("foo", 3))],
  ];

  store.set("foo", "bar2", 4);

  cases.push(["get('foo', 4) after set at 4", show("bar2"), show(store.get("foo", 4))]);
  cases.push(["get('foo', 5) after set at 4", show("bar2"), show(store.get("foo", 5))]);
  cases.push(["get('foo', 3) still sees the older value", show("bar"), show(store.get("foo", 3))]);
  cases.push(["get('foo', 0) before anything was set", show(""), show(store.get("foo", 0))]);
  cases.push(["get('missing', 1)", show(""), show(store.get("missing", 1))]);

  return cases;
}`))}function gS(){return new b(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  if (total === 0) return 0;

  // Merge, but stop at the middle and keep only the last two values seen: the
  // merged array is never built, so this is O(m + n) time and no extra space.
  let i = 0;
  let j = 0;
  let previous = 0;
  let current = 0;
  for (let step = 0; step <= Math.floor(total / 2); step++) {
    previous = current;
    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  return total % 2 === 1 ? current : (previous + current) / 2;
}`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  if (merged.length === 0) return 0;
  // One expression for both parities: for an odd length the two indices are the
  // same element, so the average of it with itself is itself.
  return (merged[Math.floor(merged.length / 2)] + merged[Math.floor((merged.length - 1) / 2)]) / 2;
}`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Always halve the shorter side, so the search is O(log min(m, n)).
  let a = nums1;
  let b = nums2;
  if (a.length > b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;
  const total = m + n;
  if (total === 0) return 0;
  const half = Math.floor((total + 1) / 2);

  let low = 0;
  let high = m;
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = half - cut1;

    const left1 = cut1 > 0 ? a[cut1 - 1] : -Infinity;
    const right1 = cut1 < m ? a[cut1] : Infinity;
    const left2 = cut2 > 0 ? b[cut2 - 1] : -Infinity;
    const right2 = cut2 < n ? b[cut2] : Infinity;

    // A correct cut is one where everything left of it is <= everything right
    // of it, across both arrays.
    if (left1 <= right2 && left2 <= right1) {
      if (total % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }
    if (left1 > right2) high = cut1 - 1;
    else low = cut1 + 1;
  }

  return 0;
}`]]),new k("export function findMedianSortedArrays(nums1: number[], nums2: number[]): number",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMedianSortedArrays !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMedianSortedArrays([1, 3], [2])", show(2), show(solution.findMedianSortedArrays([1, 3], [2]))],
    ["findMedianSortedArrays([1, 2], [3, 4])", show(2.5), show(solution.findMedianSortedArrays([1, 2], [3, 4]))],
    ["findMedianSortedArrays([], [1])", show(1), show(solution.findMedianSortedArrays([], [1]))],
    ["findMedianSortedArrays([2], [])", show(2), show(solution.findMedianSortedArrays([2], []))],
    ["findMedianSortedArrays([], [])", show(0), show(solution.findMedianSortedArrays([], []))],
    ["findMedianSortedArrays([1, 2], [])", show(1.5), show(solution.findMedianSortedArrays([1, 2], []))],
    ["findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", show(4), show(solution.findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))],
  ];
}`))}function fS(){return new b(V([["Solution 1","The input is already sorted, which turns the problem into a three-way split: everything that finishes before the new interval starts passes through untouched, everything that touches it collapses into one, and everything after it passes through too. One pass, no sorting.",`export function insert(intervals: number[][], newInterval: number[]): number[][] {
  let [start, end] = newInterval;
  const out: number[][] = [];
  let i = 0;

  // The input is already sorted, so the list falls into three runs: everything
  // that finishes before the new one starts, everything that touches it, and
  // everything that starts after it ends.
  while (i < intervals.length && intervals[i][1] < start) out.push(intervals[i++]);

  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }

  out.push([start, end]);
  return out.concat(intervals.slice(i));
}`],["Solution 2 · Merge after append","Drop the new interval on the end and run the general merge. It throws away the sortedness — O(n log n) rather than O(n) — but it is a solution you already have rather than a three-way split to get right, and that trade is often the correct one under time pressure.",`export function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Drop the new interval on the end and run the general merge. Throws away the
  // fact that the input was sorted -- O(n log n) rather than O(n) -- but it
  // reuses a solution you already have rather than a three-way split.
  const sorted = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  const out: number[][] = [];
  for (const [start, end] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}`]]),new k("export function insert(intervals: number[][], newInterval: number[]): number[][]",`export function insert(intervals: number[][], newInterval: number[]): number[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.insert !== "function") throw new Error("__signature_mismatch__");
  return [
    ["insert([[1, 3], [6, 9]], [2, 5])", show([[1, 5], [6, 9]]), show(solution.insert([[1, 3], [6, 9]], [2, 5]))],
    ["insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])", show([[1, 2], [3, 10], [12, 16]]), show(solution.insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))],
    ["insert([], [5, 7])", show([[5, 7]]), show(solution.insert([], [5, 7]))],
    ["insert([[1, 5]], [2, 3])", show([[1, 5]]), show(solution.insert([[1, 5]], [2, 3]))],
    ["insert([[1, 5]], [6, 8])", show([[1, 5], [6, 8]]), show(solution.insert([[1, 5]], [6, 8]))],
    ["insert([[3, 5]], [1, 2])", show([[1, 2], [3, 5]]), show(solution.insert([[3, 5]], [1, 2]))],
  ];
}`))}function uS(){return new b(V([["Solution 1","Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that. So a single pass either extends the interval in hand or begins a new one.",`export function merge(intervals: number[][]): number[][] {
  // Sorted by start, an interval can only ever overlap the one being built, so
  // a single pass is enough: extend it, or begin a new one.
  const out: number[][] = [];
  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}`],["Solution 2 · Sweep counts","Forget the intervals and keep only their edges: +1 where one opens, −1 where one closes. A merged interval runs from the edge that lifts the running count off zero to the edge that drops it back. Ordering opens before closes at the same coordinate is what makes touching intervals join.",`export function merge(intervals: number[][]): number[][] {
  // Forget the intervals and keep only their edges: +1 where one opens, -1
  // where one closes. A merged interval runs from the edge that lifts the
  // running count off zero to the edge that drops it back.
  const edges: [number, number][] = [];
  for (const [start, end] of intervals) {
    edges.push([start, 1]);
    edges.push([end, -1]);
  }
  // Opens before closes at the same coordinate, so touching intervals join.
  edges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  const out: number[][] = [];
  let depth = 0;
  let start = 0;
  for (const [position, delta] of edges) {
    if (depth === 0) start = position;
    depth += delta;
    if (depth === 0) out.push([start, position]);
  }
  return out;
}`]]),new k("export function merge(intervals: number[][]): number[][]",`export function merge(intervals: number[][]): number[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.merge !== "function") throw new Error("__signature_mismatch__");
  return [
    ["merge([[1, 3], [2, 6], [8, 10], [15, 18]])", show([[1, 6], [8, 10], [15, 18]]), show(solution.merge([[1, 3], [2, 6], [8, 10], [15, 18]]))],
    ["merge([[1, 4], [4, 5]])", show([[1, 5]]), show(solution.merge([[1, 4], [4, 5]]))],
    ["merge([])", show([]), show(solution.merge([]))],
    ["merge([[1, 4], [0, 4]])", show([[0, 4]]), show(solution.merge([[1, 4], [0, 4]]))],
    ["merge([[1, 4], [2, 3]])", show([[1, 4]]), show(solution.merge([[1, 4], [2, 3]]))],
  ];
}`))}function $S(){return new b(V([["Solution 1","Greedy on the end time. Among intervals competing for the same space, keeping the one that finishes earliest leaves the most room for whatever comes next and can never be worse — which is the exchange argument that makes the greedy correct, and the reason sorting by start is the classic wrong first answer.",`export function eraseOverlapIntervals(intervals: number[][]): number {
  // Greedy on the end: among any set of intervals competing for the same space,
  // keeping the one that finishes earliest leaves the most room for whatever
  // comes next, and can never be worse.
  let removed = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of [...intervals].sort((a, b) => a[1] - b[1])) {
    if (start >= lastEnd) lastEnd = end;
    else removed++;
  }

  return removed;
}`],["Solution 2 · By start","Sorted by start instead. On an overlap one of the two has to go, and dropping whichever ends later is always at least as good — so the greedy choice is made at the moment of the clash rather than baked into the sort order. Same answer, and it needs the running end to be lowered rather than replaced.",`export function eraseOverlapIntervals(intervals: number[][]): number {
  // Sorted by start instead: on an overlap you must drop one of the two, and
  // dropping whichever ends later is always at least as good. Same greedy
  // argument, made at the moment of the clash rather than in the sort order.
  let removed = 0;
  let lastEnd = Infinity;
  let first = true;

  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    if (first || start >= lastEnd) {
      lastEnd = end;
      first = false;
    } else {
      removed++;
      lastEnd = Math.min(lastEnd, end);
    }
  }

  return removed;
}`]]),new k("export function eraseOverlapIntervals(intervals: number[][]): number",`export function eraseOverlapIntervals(intervals: number[][]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.eraseOverlapIntervals !== "function") throw new Error("__signature_mismatch__");
  return [
    ["eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])", show(1), show(solution.eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))],
    ["eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])", show(2), show(solution.eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))],
    ["eraseOverlapIntervals([[1, 2], [2, 3]])", show(0), show(solution.eraseOverlapIntervals([[1, 2], [2, 3]]))],
    ["eraseOverlapIntervals([])", show(0), show(solution.eraseOverlapIntervals([]))],
    ["eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]])", show(2), show(solution.eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]))],
  ];
}`))}function mS(){return new b(V([["Solution 1","Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier started earlier still, so it would have clashed with that one first. The whole check is then adjacent pairs.",`export function canAttendMeetings(intervals: number[][]): boolean {
  // Sorted by start, the only meeting a given one can clash with is the one
  // immediately before it -- anything earlier started earlier still and would
  // have clashed with that one first.
  const ordered = [...intervals].sort((a, b) => a[0] - b[0]);
  return ordered.every((meeting, i) => i === 0 || ordered[i - 1][1] <= meeting[0]);
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair, checked. Worth writing once for the overlap test itself: two intervals overlap when each starts before the other ends, which is far easier to get right than trying to enumerate the ways they miss.`,`export function canAttendMeetings(intervals: number[][]): boolean {
  // Every pair, checked. Two intervals overlap when each starts before the
  // other ends -- the condition worth being able to write from memory, since it
  // is easier to get right than its negation.
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      const a = intervals[i];
      const b = intervals[j];
      if (a[0] < b[1] && b[0] < a[1]) return false;
    }
  }
  return true;
}`]]),new k("export function canAttendMeetings(intervals: number[][]): boolean",`export function canAttendMeetings(intervals: number[][]): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canAttendMeetings !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canAttendMeetings([[0, 30], [5, 10], [15, 20]])", show(false), show(solution.canAttendMeetings([[0, 30], [5, 10], [15, 20]]))],
    ["canAttendMeetings([[7, 10], [2, 4]])", show(true), show(solution.canAttendMeetings([[7, 10], [2, 4]]))],
    ["canAttendMeetings([])", show(true), show(solution.canAttendMeetings([]))],
    ["canAttendMeetings([[1, 5]])", show(true), show(solution.canAttendMeetings([[1, 5]]))],
    ["canAttendMeetings([[1, 5], [5, 10]])", show(true), show(solution.canAttendMeetings([[1, 5], [5, 10]]))],
    ["canAttendMeetings([[5, 10], [1, 6]])", show(false), show(solution.canAttendMeetings([[5, 10], [1, 6]]))],
  ];
}`))}function vS(){return new b(V([["Solution 1","Rooms needed is the most meetings ever running at once, so the meetings stop mattering and only their edges do: +1 at a start, −1 at an end, and the answer is how high the running count gets. Closes come before opens at the same time here — a room freed at that moment can be reused — which is the opposite of what merging intervals wants.",`export function minMeetingRooms(intervals: number[][]): number {
  // Rooms needed is the most meetings ever running at once, so the meetings
  // themselves stop mattering -- only their edges do. Walk the edges in time
  // order and watch how high the count gets.
  const edges: [number, number][] = [];
  for (const [start, end] of intervals) {
    edges.push([start, 1]);
    edges.push([end, -1]);
  }
  // A room freed at the same moment another meeting starts can be reused, so
  // closes come before opens here -- the opposite of merging intervals.
  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let depth = 0;
  let best = 0;
  for (const [, delta] of edges) {
    depth += delta;
    best = Math.max(best, depth);
  }
  return best;
}`],["Solution 2 · Count at each start",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

The busiest moment is always the start of some meeting, so only n moments are worth testing at all. Count how many meetings cover each and take the largest: no sort, no edge bookkeeping, and it makes clear what the sweep is measuring.`,`export function minMeetingRooms(intervals: number[][]): number {
  // The busiest moment is always the start of some meeting, so there are only n
  // moments worth testing. Count how many meetings cover each one and take the
  // largest -- O(n^2), and it needs no sort and no edge bookkeeping.
  let best = 0;
  for (const [start] of intervals) {
    const running = intervals.filter(([s, e]) => s <= start && start < e).length;
    best = Math.max(best, running);
  }
  return best;
}`]]),new k("export function minMeetingRooms(intervals: number[][]): number",`export function minMeetingRooms(intervals: number[][]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minMeetingRooms !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minMeetingRooms([[0, 30], [5, 10], [15, 20]])", show(2), show(solution.minMeetingRooms([[0, 30], [5, 10], [15, 20]]))],
    ["minMeetingRooms([[7, 10], [2, 4]])", show(1), show(solution.minMeetingRooms([[7, 10], [2, 4]]))],
    ["minMeetingRooms([])", show(0), show(solution.minMeetingRooms([]))],
    ["minMeetingRooms([[1, 5], [5, 10]])", show(1), show(solution.minMeetingRooms([[1, 5], [5, 10]]))],
    ["minMeetingRooms(six overlapping meetings)", show(4), show(solution.minMeetingRooms([[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]))],
  ];
}`))}function cS(){return new b(V([["Solution 1",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each query, the smallest interval containing it. O(q·n), and the definition — worth having before the clever version, because it is what you check the clever version against.`,`export function minInterval(intervals: number[][], queries: number[]): number[] {
  return queries.map((query) => {
    const lengths = intervals
      .filter(([start, end]) => start <= query && query <= end)
      .map(([start, end]) => end - start + 1);
    return lengths.length ? Math.min(...lengths) : -1;
  });
}`],["Solution 2 · Offline by length","Answer each query once and never revisit it. Taking the intervals shortest first means the first interval to cover a query is already its answer, so a query leaves the pool the moment it is settled and the pool only shrinks. Reordering the work so each answer is final is the technique here, and it generalises well beyond this problem.",`export function minInterval(intervals: number[][], queries: number[]): number[] {
  // Answer each query once, and never revisit it. Taking the intervals shortest
  // first means the first interval to cover a query is already its answer, so
  // every query leaves the pool the moment it is settled and the pool only ever
  // shrinks.
  const answers = new Array<number>(queries.length).fill(-1);
  let waiting = queries.map((query, index) => [index, query] as [number, number]);

  const byLength = [...intervals].sort((a, b) => a[1] - a[0] - (b[1] - b[0]));

  for (const [start, end] of byLength) {
    const stillWaiting: [number, number][] = [];
    for (const [index, query] of waiting) {
      if (start <= query && query <= end) answers[index] = end - start + 1;
      else stillWaiting.push([index, query]);
    }
    waiting = stillWaiting;
  }

  return answers;
}`]]),new k("export function minInterval(intervals: number[][], queries: number[]): number[]",`export function minInterval(intervals: number[][], queries: number[]): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minInterval !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])", show([3, 3, 1, 4]), show(solution.minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]))],
    ["minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])", show([2, -1, 4, 6]), show(solution.minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]))],
    ["minInterval([], [1, 2])", show([-1, -1]), show(solution.minInterval([], [1, 2]))],
    ["minInterval([[1, 10]], [])", show([]), show(solution.minInterval([[1, 10]], []))],
    ["minInterval([[1, 3]], [0, 4])", show([-1, -1]), show(solution.minInterval([[1, 3]], [0, 4]))],
  ];
}`))}function nO(I){if(I==="nc01_contains_duplicate")return new R(XS());else if(I==="nc02_valid_anagram")return new R(YS());else if(I==="nc03_two_sum")return new R(qS());else if(I==="nc04_group_anagrams")return new R(KS());else if(I==="nc05_top_k_frequent")return new R(WS());else if(I==="nc06_product_except_self")return new R(GS());else if(I==="nc07_longest_consecutive")return new R(US());else if(I==="nc08_valid_palindrome")return new R(zS());else if(I==="nc09_two_sum_sorted")return new R(VS());else if(I==="nc10_three_sum")return new R(jS());else if(I==="nc11_container_water")return new R(OS());else if(I==="nc12_best_time_stock")return new R(FS());else if(I==="nc13_longest_substring")return new R(HS());else if(I==="nc14_character_replacement")return new R(NS());else if(I==="nc15_permutation_in_string")return new R(RS());else if(I==="nc16_valid_parentheses")return new R(MS());else if(I==="nc17_min_stack")return new R(AS());else if(I==="nc18_daily_temperatures")return new R(DS());else if(I==="nc19_binary_search")return new R(LS());else if(I==="nc20_find_min_rotated")return new R(BS());else if(I==="nc21_search_rotated")return new R(PS());else if(I==="nc22_encode_decode")return new R(SS());else if(I==="nc23_valid_sudoku")return new R(_S());else if(I==="nc24_trapping_rain_water")return new R(TS());else if(I==="nc25_min_window_substring")return new R(ES());else if(I==="nc26_sliding_window_maximum")return new R(hS());else if(I==="nc27_eval_rpn")return new R(CS());else if(I==="nc28_generate_parentheses")return new R(wS());else if(I==="nc29_car_fleet")return new R(kS());else if(I==="nc30_largest_rectangle")return new R(bS());else if(I==="nc31_search_2d_matrix")return new R(yS());else if(I==="nc32_koko_bananas")return new R(xS());else if(I==="nc33_time_map")return new R(nS());else if(I==="nc34_median_two_sorted")return new R(gS());else if(I==="nc35_insert_interval")return new R(fS());else if(I==="nc36_merge_intervals")return new R(uS());else if(I==="nc37_non_overlapping")return new R($S());else if(I==="nc38_meeting_rooms")return new R(mS());else if(I==="nc39_meeting_rooms_ii")return new R(vS());else if(I==="nc40_min_interval")return new R(cS());else return new V1(void 0)}function gO(){return O5(j5+" (TypeScript)",BO,(I)=>{return H0(nO(I),(Z)=>{return[Z.solutions,new a(Z.check)]})})}function F5(I,Z,J){return new h6(I,Z,z7(I),N1(J.solutions,(Q)=>{return new J8(Q[0],Q[1],Q[2])}),nZ,new a(J.check),U1)}function fO(){return new C6("Python Tips",V([new j0("Idioms",V([F5("Counter for frequency maps","Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",eY()),F5("defaultdict for grouping","Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",Iq()),F5("deque for O(1) popleft","Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",Zq()),F5("heapq for min/max heaps","Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",Jq()),F5("Enumerate, zip, and unpacking","Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",Qq()),F5("Slicing and reversal","Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",Xq()),F5("Sorting with a key","Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",Yq()),F5("Building strings efficiently","Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",qq())]))]))}var V7="System Design";function iS(){return f}function lS(){return f}function rS(){return f}function aS(){return f}function tS(){return f}function I0(I,Z,J,Q,X,Y){return new h6(I,Z,"",f,_O,U1,new a(new mY(J,Q,X,Y)))}function oS(){return V([I0("Partitioning, sharding and replication","You have used all three words in one sentence and the interviewer asks you to be precise. Which statement is right?",V(["Replication and sharding both divide a data set into subsets; partitioning is the term for copying those subsets to other nodes","Replication makes copies of data on different nodes; partitioning and sharding both divide a data set into subsets, but sharding implies those subsets are distributed across multiple nodes and partitioning does not","Sharding makes copies of data across nodes; partitioning divides a data set into subsets on one node; replication is the general term for both","Partitioning is a physical layout on disk; sharding is the logical division above it; replication is orthogonal to both"]),1,"Replication makes copies of data - replicas - stored on different nodes. Partitioning and sharding both divide a data set into subsets; sharding implies the subsets are distributed across multiple nodes, partitioning does not.","p111"),I0("Where three-megabyte objects belong","Your service stores user-uploaded objects averaging 3 MB, read far more often than written, streamed to clients on request. Database or filesystem, and on what grounds?",V(["Database, as a BLOB column, so the object stays transactionally consistent with its metadata row","Either - below about 10 MB the choice makes no measurable difference to read latency","Database, sharded by object ID, so reads spread evenly across the cluster","Filesystem - objects larger than 1 MB belong there; database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow"]),3,"The 2006 Microsoft rule of thumb: objects smaller than 256 KB are best stored in a database; objects larger than 1 MB are best on the filesystem. Between 256 KB and 1 MB, the read:write ratio and the rate of overwrite decide. Also: database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow.","p111"),I0("Read replicas for a write-heavy load","Your single-leader database is saturating on writes. A teammate proposes adding four read replicas. Does that solve the problem?",V(["No - single-leader replication scales reads, not writes, and the entire database must still fit on the single leader host","Yes - once provisioned, replicas can accept writes and forward them to the leader asynchronously","Yes, provided the replicas are synchronous, which lets the leader acknowledge writes without waiting for disk","Yes - adding a second tier of replicas below the first spreads write load across both tiers"]),0,"Single-leader replication scales reads, not writes. Its limits: the entire database must fit on a single host, and followers are eventually consistent because write replication takes time.","p112-115"),I0("Sizing a quorum","You have 7 nodes and want quorum reads and writes that guarantee consistency. Which pair of quorum sizes does the rule give you?",V(["Read 3, write 3","Read 2, write 5","Read 4, write 4","Read 3, write 4"]),2,"A quorum is the minimum number of nodes that must agree for consensus. With n nodes, read and write quorums of n/2 + 1 guarantee consistency - here 7/2 + 1 = 4 for both. Every other pair listed sums to 7 or fewer, so a read quorum and a write quorum can miss each other entirely.","p117"),I0("Last write wins by timestamp","Two leaders in different data centers accept conflicting updates to the same row. A teammate proposes resolving it with last-write-wins on a timestamp column. Why does that not work?",V(["It works, but only when both leaders sit in the same data center and share a clock signal","Clocks on different nodes cannot be perfectly synchronized - even periodically synced servers differ by milliseconds or more, so writes made inside that window cannot be ordered","Timestamps require a coordination service to issue them, which reintroduces the single leader you were trying to avoid","Timestamps are not monotonic while NTP is slewing, but the drift is bounded, so the scheme is safe at one-second granularity"]),1,"Clocks on different nodes cannot be perfectly synchronized, and sharing one clock fails because each node receives its signal at a different time - clock skew. Even periodically synced servers differ by milliseconds or more, so queries made within that window cannot be ordered.","p116"),I0("Tuning quorums for a read-heavy load","A 5-node cluster serves ten reads for every write, and you need consistency rather than eventual consistency. How do you set the quorums, and what does it cost?",V(["Low write quorum, high read quorum - fast reads, paid for with slower writes","Read and write quorums both set to 5, so every operation sees every node","Read and write quorums both set to 1, accepting eventual consistency for speed on both sides","Low read quorum, high write quorum - fast reads, paid for with slower writes"]),3,"If you want consistency you must choose: a low write quorum and high read quorum gives fast writes; the reverse - a low read quorum and high write quorum - gives fast reads. Otherwise only eventual consistency is possible, and UPDATE and DELETE cannot be consistent.","p117"),I0("Seeing your own increment","A user taps like and must immediately see the count include their own tap. Other users continuing to see the old count for a few seconds is fine. Name the guarantee, and the general lesson.",V(["Read-after-write consistency - and the lesson is to look for ways to relax consistency, minimizing the amount of data that must be consistent for all users","Linearizability - and the lesson is that any user-visible counter must be linearizable or users will report it as a bug","Monotonic reads - and the lesson is that a client must be pinned to one replica for the duration of a session","Strong eventual consistency - and the lesson is that conflict-free replicated data types remove the need to choose"]),0,"Read-after-write consistency: a user who increments a counter and then reads it sees their own increment, while other users may still be served the pre-increment value. The general lesson: look for ways to relax consistency, and minimize the amount of data that must be consistent for all users.","p117"),I0("The JOIN that got slower after sharding","After sharding two large tables, a JOIN between them became dramatically slower. What is happening, and what is the suggested remedy?",V(["Replication lag means followers hold different snapshots of each table; directing the JOIN at the leader restores speed","The query planner lost its statistics at shard time; a covering index on each shard restores the original plan","Each shard of one table must compare its rows against every row of the other across the network - unless the JOIN is on the shard key, so you may constrain JOINs to those columns","The shard key was hashed rather than ranged, so matching rows are scattered; switching to range sharding colocates them"]),2,"Sharding imposes two limits on an RDBMS. JOINs get far slower - each shard of one table must compare its rows against every row of the other across the network, unless the JOIN is on the shard key, so you may constrain JOINs to those columns. And aggregation splits between database and application.","p120"),I0("The aggregate that survived sharding worst","Your reporting queries run sum, count, mean and median over a sharded table. Which one becomes disproportionately harder and slower, and why?",V(["Mean - it needs the full row set in one place before a divisor can be computed","Median - sum and mean are easy because each node returns partial results, but median and percentile are much harder and slower","Sum - each node's partial must be locked across shards to avoid double counting","Count - it requires a distinct pass over every shard before the totals can be added"]),1,"Aggregation splits between database and application: sum and mean are easy (each node returns partials), median and percentile are much harder and slower.","p120"),I0("Replication lag across thirty followers","Your leader replicates to thirty followers and the tail of them is falling steadily behind. What is the explanation, and the remedy?",V(["A leader's throughput caps the number of followers it can serve, so multi-level replication adds tiers to scale reads further - at the cost of further-delayed consistency","Followers compete with clients for the leader's read capacity, so moving client reads onto the followers lets the leader catch up","The write quorum has been set too high, so each write waits on too many acknowledgements before the next can start","Eventual consistency means replication lag is unbounded by design, so the only remedy is to make reads tolerate any staleness"]),0,"A leader's throughput caps the number of followers, so multi-level replication adds tiers to scale reads further, at the cost of further-delayed consistency.","p112-115")])}function eS(){return V([I0("Buying a bigger host","Your service is saturating its single host. Finance has approved a mainframe-class replacement with four times the cores and eight times the RAM, and a migration window is agreed. Setting the invoice aside, what is the strongest argument against making this your scaling strategy?",V(["You lose the ability to do gradual rollouts, because there is no second host to shift a fraction of traffic onto","It trades higher latency for lower cost, because one host cannot be placed close to every region of users","Past a point, monetary cost rises faster than the hardware's performance; current technology imposes hard limits on processing power, RAM and storage per host; and the swap may require downtime unless the service's state lives elsewhere","A single host cannot implement the bulkhead pattern, so one saturated endpoint will starve all the others"]),2,"Three disadvantages of vertical scaling. Past a point, monetary cost rises faster than the hardware's performance - a multi-processor mainframe costs more than the same number of commodity single-processor machines. Current technology imposes hard limits on processing power, RAM and storage per host. And it may require downtime, unless you provision a new host, which is only possible if the service's state lives elsewhere.","p88"),I0("Choosing the load balancer layer","You need the load balancer to reject requests missing an authorization header with a 401, terminate TLS, and forward events by key range based on a field in the request body. Which balancer do you specify, and why?",V(["Level 7 - it works at the application layer, so it can route on packet contents, authenticate, and terminate TLS","Level 4 - it works at the transport layer, which is faster and sufficient for header inspection","Level 4 with TLS passthrough, delegating authentication to an API gateway behind it","Either - the layers differ only in throughput, not in what they can inspect"]),0,"A level 4 balancer works at the transport layer (TCP), makes routing decisions from address information in the first few packets of the stream, and can only forward. A level 7 balancer works at the application layer (HTTP), so it can route on packet contents, authenticate (returning 401 when a header is absent), and terminate TLS.","p89-90"),I0("Reading an availability SLA","A contract permits roughly five minutes of unplanned downtime per year. Which availability target are you being asked to hit?",V(["99.99% - 52.6 minutes per year, 8.64 seconds per day","99.9% - 8.77 hours per year, 1.44 minutes per day","99.95% - 4.38 hours per year, 43 seconds per day","99.999% - 5.26 minutes per year, 864 milliseconds per day"]),3,"99.9% is 8.77 hours per year (1.44 minutes per day). 99.99% is 52.6 minutes per year (8.64 seconds per day). 99.999% is 5.26 minutes per year (864 milliseconds per day).","p91"),I0("The circuit breaker that hid the limit","Your team wraps every downstream call in a circuit breaker. A load test that previously overwhelmed the payment service now passes cleanly, so you ship. Real customer traffic then causes an outage in that same service. What went wrong?",V(["The breaker's failure counter reset between test runs, so the threshold was never actually reached","The breaker makes the system harder to test - it opened under the test load and masked the downstream limit the test existed to find","The breaker's probe requests counted against the payment service's rate limit and exhausted it","Retries without jitter arrived in unison and caused a retry storm against the recovering service"]),1,"A circuit breaker counts failures in a recent interval and stops calling downstream past a threshold, later probing with a limited number of requests. Its hidden cost: the breaker makes the system harder to test - a load test that should have overwhelmed downstream now passes, and real customer load causes the outage.","p93-94"),I0("What per-endpoint thread pools cost","You adopt the bulkhead pattern, giving each endpoint its own thread pool so an exhausted pool cannot starve the others. What have you given up in exchange?",V(["Requests can no longer be traced across services, because each pool logs under its own identifier","You can no longer terminate TLS at the load balancer, since pools are selected after decryption","Thread pools force synchronous I/O, so a long downstream call blocks a whole pool","Pools cannot support each other during a spike - an idle pool's capacity is unavailable to a saturated one"]),3,"Divide the system into isolated pools so a fault in one cannot affect the whole. Per-endpoint thread pools mean an exhausted pool does not starve other endpoints. Host pools per requestor stop a crash-inducing request from taking down every host, and stop one noisy requestor consuming all capacity. The tradeoff: pools cannot support each other during a spike.","p95-96"),I0("Which consistency are you talking about",'You have said "consistency" four times and the interviewer stops you: which consistency do you mean? What is the distinction they are fishing for?',V(["ACID consistency means synchronous replication; CAP consistency means asynchronous replication with a bounded lag","CAP consistency is read-after-write for the writing client; ACID consistency is the durability guarantee that survives a crash","ACID consistency is about data relationships - foreign keys, uniqueness, the invariants a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time and begin serving a change at the same time","ACID consistency applies within a single node; CAP consistency applies across the cluster, but both mean reads never return stale data"]),2,"ACID consistency is about data relationships - foreign keys, uniqueness, and the invariants that a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time, and when data changes all nodes start serving the change at the same time. Emphasize the distinction out loud in the interview.","p98"),I0("Accepting writes during a partition","A hard requirement: the store must keep accepting writes during a network partition between data centers. Stale reads for a few seconds are acceptable. Which of these do you pick, and what rules the others out?",V(["Redis - being in-memory, it is unaffected by partitions between data centers","Cassandra - an ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did","MongoDB - it favors availability, and its replica sets elect a new primary on either side of the partition","HBase - its write-ahead log lets it accept writes and reconcile them once the partition heals"]),1,"Databases favoring linearizability: HBase, MongoDB, Redis. Databases favoring availability: Cassandra, CouchDB, Dynamo, Hadoop, Riak. An ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did.","p98"),I0("Propagating state across a small cluster","Eight hosts need to share a small amount of mutable state. You want low latency, simple operations and independent scaling of the state store, and you accept that nothing will validate the shape of what gets written. Which technique fits?",V(["A full mesh, where every host broadcasts state changes to every other host","A coordination service such as ZooKeeper, using Paxos, Raft or Zab","A gossip protocol with random leader selection","A distributed cache such as Redis - simple, low latency and independently scalable, at the cost of no schema validation, so bad data goes undetected until it is read, and no encryption"]),3,"Full mesh - every host broadcasts to every other; simplest, but message count grows quadratically, so small clusters only. Coordination service - Paxos, Raft, Zab; ZooKeeper gives access control, in-memory speed, horizontal scaling and ordered reads, but is complex and must guarantee exactly one leader or you get split brain. Distributed cache - Redis; simple, low latency, independently scalable, but no schema validation, so bad data goes undetected until read, and no encryption. Gossip protocol and random leader selection trade consistency and accuracy for lower cost.","p99-103"),I0("Approximating a distinct count","A dashboard needs the number of unique visitors over a huge event stream. An exact COUNT DISTINCT is too expensive, and a few percent of error is fine. Which algorithm?",V(["HyperLogLog, which estimates cardinality - it is what Presto uses for this","Count-min sketch, which is the standard structure for estimating distinct values in a stream","A bloom filter, testing each visitor for membership and counting the misses","A quorum read across the aggregation tier, summing each node's local count"]),0,"HyperLogLog for cardinality - COUNT DISTINCT, as used in Presto. Count-min sketch for estimating the frequency of events in a data stream. Estimation algorithms trade accuracy for lower complexity.","p103-104"),I0("What PACELC adds to CAP","The interviewer asks whether CAP is the whole story. What does PACELC add to it?",V(["It adds durability as a fourth property, alongside consistency, availability and partition tolerance","It formalizes eventual consistency as a fourth choice available during a partition","Else - during normal operation with no partition, you must still choose between latency and consistency","Else - during normal operation, you must still choose between availability and partition tolerance"]),2,"PACELC is an extension of CAP: when a network Partition occurs you must choose between Availability and Consistency; Else, during normal operation, you must choose between Latency and Consistency. The book flags it as further reading rather than covering it in depth.","p107")])}function I_(){return f}function Z_(){return f}function uO(){return new C6("System Design",(()=>{let I=V([new j0("Interview flow & requirements",Z_()),new j0("Observability & search",I_()),new j0("Non-functional requirements",eS()),new j0("Storage, replication & sharding",oS()),new j0("ETL, denormalization & caching",tS()),new j0("Events & distributed transactions",aS()),new j0("Services & API paradigms",rS()),new j0("Case studies",lS()),new j0("Terminology",iS())]);return J0(I,(Z)=>{return!(Z.problems instanceof y)})})())}var Kq;function mO(I){if(Kq===void 0)Kq=I();return Kq}function J_(){return V([xO(),kO(),gO(),wO(),fO(),hO(),uO()])}function j7(){return mO(J_)}function r3(I,Z){let J=F8(j7(),(Q)=>{return Q.name===I});if(J instanceof R){let Q=J[0],X=F8(Q.subcategories,(Y)=>{return Y.name===Z});if(X instanceof R)return X[0].problems;else return f}else return f}function a3(I){let Z=F8(j7(),(J)=>{return J.name===I});if(Z instanceof R){let J=Z[0];return N1(J.subcategories,(Q)=>{return Q.name})}else return f}function vZ(){let I=a3(V7);return N1(I,(Z)=>{return[Z,(()=>{let J=r3(V7,Z);return N1(J,(Q)=>{return new e4(V7,Z,Q.title)})})()]})}function cO(){return N1(j7(),(I)=>{return I.name})}function vO(I,Z,J){let Q=F8(I,Z);if(Q instanceof R){let X=Q[0];return J(X)}else return Q}function w6(I,Z,J){return vO(j7(),(Q)=>{return Q.name===I},(Q)=>{return vO(Q.subcategories,(X)=>{return X.name===Z},(X)=>{return F8(X.problems,(Y)=>{return Y.title===J})})})}var o3=new Map;function Wq(I,Z,J,Q,X){if(o3.has(I))return;let Y=new Worker(Z,J?{type:"module"}:void 0);Y.onmessage=(q)=>Q(JSON.stringify(q.data)),Y.onerror=(q)=>X(String(q.message??"The runtime failed to load.")),o3.set(I,Y)}function pO(I,Z,J,Q,X){o3.get(I)?.terminate(),o3.delete(I),Wq(I,Z,J,Q,X)}function sO(I,Z,J,Q){o3.get(I)?.postMessage({type:"run",id:Z,solution:J,harness:Q})}function dO(I,Z){setTimeout(Z,I)}var Q_="1.18.1",X_="3.14.3",Y_=8000;function lO(I){if(I==="python")return["/python-worker.js?v="+X_,!1];else if(I==="typescript")return["/ts-worker.js",!0];else return["/gleam-worker.js?v="+Q_,!0]}function Gq(I,Z,J){return m4(I,U1,B9(Z),J)}function q_(I){return x1("phase",C1,(Z)=>{return Gq("file",C1,(J)=>{return Gq("line",a0,(Q)=>{return Gq("column",a0,(X)=>{return x1("message",C1,(Y)=>{return I(new K5(new xY(Z,J,Q,X,Y)))})})})})})}function iO(I){return m4("stdout","",C1,I)}function K_(I){let Z=x1("label",C1,(J)=>{return x1("expected",C1,(Q)=>{return x1("actual",C1,(X)=>{return x1("passed",w7,(Y)=>{return k1(new yY(J,Q,X,Y))})})})});return x1("cases",G6(Z),(J)=>{return I(new q5(J))})}function W_(I){return x1("type",C1,(Z)=>{if(Z==="ready")return k1(new I8(I));else if(Z==="result")return x1("id",a0,(J)=>{return iO((Q)=>{return K_((X)=>{return k1(new G7(J,X,Q))})})});else if(Z==="error")return x1("id",a0,(J)=>{return iO((Q)=>{return q_((X)=>{return k1(new G7(J,X,Q))})})});else return b7(new I8(I),"Msg")})}function rO(I,Z){let J=h5(Z,W_(I));if(J instanceof R)return J[0];else return new z5(I,"The runtime sent an unreadable message.")}function aO(I){return N4((Z)=>{let J=lO(I),Q=J[0],X=J[1];return Wq(I,Q,X,(Y)=>{return Z(rO(I,Y))},(Y)=>{return Z(new z5(I,Y))})})}function tO(I){return N4((Z)=>{let J=lO(I),Q=J[0],X=J[1];return pO(I,Q,X,(Y)=>{return Z(rO(I,Y))},(Y)=>{return Z(new z5(I,Y))})})}function oO(I,Z,J,Q){return N4((X)=>{return sO(I,Z,J,Q),dO(Y_,()=>{return X(new p3(Z))})})}function cZ(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return m1(globalThis.localStorage);else return o1(null)}catch{return o1(null)}}function O7(I,Z){return U_(I.getItem(Z))}function Uq(I,Z,J){try{return I.setItem(Z,J),m1(null)}catch{return o1(null)}}function U_(I){if(I!==null)return m1(I);else return o1(null)}var V_="algoDrillState",j_="algoDrillState.v2",O_="algoDrillState.v3",IF="algoDrillState.v4";function sZ(I){let Z=(Y)=>{if(w6(Y.category,Y.subcategory,Y.title)instanceof R)return!0;else return!1},J=J0(I.selected,Z),Q=new F1(I.route,I.selected_category,I.selected_subcategory,J,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,J0(I.drafts,(Y)=>{return Z(Y[0])}),J0(I.attempts,(Y)=>{return Z(Y[0])}),I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,J0(I.exam_answers,(Y)=>{return Z(Y[0])}));if(Q.route instanceof T6&&Q.problem_index>=G0(J))return new F1(Y5,Q.selected_category,Q.selected_subcategory,Q.selected,0,Q.iteration_count,1,Q.draft,Q.revealed_solution,Q.runtimes,Q.run,Q.drafts,Q.attempts,Q.search,Q.next_run_id,Q.editor_keymap,Q.choice,Q.graded,Q.exam_answers);else if(Q.route instanceof AZ&&Q.exam_answers instanceof y)return new F1(Y5,Q.selected_category,Q.selected_subcategory,Q.selected,Q.problem_index,Q.iteration_count,Q.current_iteration,Q.draft,Q.revealed_solution,Q.runtimes,Q.run,Q.drafts,Q.attempts,Q.search,Q.next_run_id,Q.editor_keymap,Q.choice,Q.graded,Q.exam_answers);else return Q}function F_(I,Z){if(I==="currentView")return x1("currentProblemIndex",a0,Z);else return x1("problemIndex",a0,Z)}function ZF(){return x1("category",C1,(I)=>{return x1("subcategory",C1,(Z)=>{return x1("title",C1,(J)=>{return k1(new e4(I,Z,J))})})})}function eO(I,Z){return m4(I,U1,B9(C1),Z)}function H_(){return k7(C1,(I)=>{if(I==="drill")return k1(b3);else if(I==="report")return k1(DZ);else return k1(Y5)})}function Vq(I,Z,J){return x1(I,H_(),(Q)=>{return eO("selectedCategory",(X)=>{return eO("selectedSubcategory",(Y)=>{return x1(Z,G6(ZF()),(q)=>{return F_(I,(K)=>{return x1("iterationCount",a0,(W)=>{return x1("currentIteration",a0,(G)=>{return J((()=>{let U=V5();return new F1(Q,X,Y,q,K,W,G,U.draft,U.revealed_solution,U.runtimes,U.run,U.drafts,U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers)})())})})})})})})})}function N_(){return Vq("currentView","selectedProblems",(I)=>{return k1(I)})}function R_(I){let Z=O7(I,V_);if(Z instanceof R){let J=Z[0],Q=h5(J,N_()),X=H0(Q,sZ);return n7(X,V5())}else return V5()}function M_(){return Vq("route","selected",(I)=>{return k1(I)})}function A_(I){let Z=O7(I,j_);if(Z instanceof R){let J=Z[0],Q=h5(J,M_()),X=H0(Q,sZ);return n7(X,V5())}else return R_(I)}function D_(){return k7(C1,(I)=>{if(I==="passed")return k1(SZ);else return k1(y3)})}function zq(I,Z){return k7(ZF(),(J)=>{return x1(I,Z,(Q)=>{return k1([J,Q])})})}function JF(){return Vq("route","selected",(I)=>{return m4("drafts",f,G6(zq("draft",C1)),(Z)=>{return m4("attempts",f,G6(zq("result",D_())),(J)=>{return m4("search","",C1,(Q)=>{return m4("editorKeymap","default",C1,(X)=>{return k1(new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,Z,J,Q,I.next_run_id,X,I.choice,I.graded,I.exam_answers))})})})})})}function L_(I){let Z=O7(I,O_);if(Z instanceof R){let J=Z[0],Q=h5(J,JF()),X=H0(Q,sZ);return n7(X,V5())}else return A_(I)}function B_(){return k7(JF(),(I)=>{return m4("examAnswers",f,G6(zq("correct",w7)),(Z)=>{return k1(new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,Z))})})}function QF(){let I=cZ();if(I instanceof R){let Z=I[0],J=O7(Z,IF);if(J instanceof R){let Q=J[0],X=h5(Q,B_()),Y=H0(X,sZ);return n7(Y,V5())}else return L_(Z)}else return V5()}function pZ(I,Z){return C5(C(["category",Y0(I.category)],C(["subcategory",Y0(I.subcategory)],C(["title",Y0(I.title)],Z))))}function P_(I){return pZ(I,f)}function S_(I){let Z=C5(V([["route",Y0((()=>{let J=I.route;if(J instanceof Q7)return"menu";else if(J instanceof T6)return"drill";else return"report"})())],["selectedCategory",PJ(I.selected_category,Y0)],["selectedSubcategory",PJ(I.selected_subcategory,Y0)],["selected",U6(I.selected,P_)],["problemIndex",v4(I.problem_index)],["iterationCount",v4(I.iteration_count)],["currentIteration",v4(I.current_iteration)],["drafts",U6(I.drafts,(J)=>{return pZ(J[0],V([["draft",Y0(J[1])]]))})],["attempts",U6(I.attempts,(J)=>{return pZ(J[0],V([["result",Y0((()=>{if(J[1]instanceof U5)return"passed";else return"failed"})())]]))})],["examAnswers",U6(I.exam_answers,(J)=>{return pZ(J[0],V([["correct",g7(J[1])]]))})],["search",Y0(I.search)],["editorKeymap",Y0(I.editor_keymap)]]));return ZW(Z)}function XF(I){return N4((Z)=>{let J=cZ();if(J instanceof R){let Q=J[0],X=Uq(Q,IF,S_(I));return}else return})}function T_(I,Z){let J=I.revealed_solution;if(J instanceof a){let Q=J[0],X=Z.solutions,Y=H9(X,Q);return F9(Y)}else return new V1(void 0)}function Fq(I){let Z=L9(I);if(Z==="")return f;else{let J=Z;return V([u9(V([n("results-details")]),V([$9(f,V([s("Output")])),n5(V([n("results-stdout")]),V([s(J)]))]))])}}function E_(I,Z,J){let Q,X=I.file;if(X instanceof a){let K=X[0];Q=h7(K,"check")}else Q=!1;let Y=Q,q=Z.check;if(Y&&q instanceof a){let K=q[0];return X1(V([n("results")]),C(X1(V([n("results-summary fail")]),V([s("Your solution doesn't match the required signature.")])),C(n5(V([n("signature")]),V([P8(f,V([s(K.signature)]))])),C(u9(V([n("results-details")]),V([$9(f,V([s("Details")])),n5(V([n("results-message")]),V([s(I.message)]))])),Fq(J)))))}else return X1(V([n("results")]),C(X1(V([n("results-summary fail")]),V([s((()=>{if(I.phase==="compile")return"Your code doesn't compile.";else return"Your code crashed while running."})())])),C(n5(V([n("results-message")]),V([s(I.message)])),Fq(J))))}function h_(I,Z){let J=G0(I),Q=z8(I,(U)=>{return U.passed}),X=Q===J&&J>0,Y=X1(V([v0(V([["results-summary",!0],["pass",X],["fail",!X]]))]),V([s((()=>{if(X)return"✓ ";else return"✗ "})()+D1(Q)+"/"+D1(J)+" passed")])),q,W=J0(I,(U)=>{return!U.passed});q=N1(W,(U)=>{return X1(V([n("case fail")]),V([X1(V([n("case-label")]),V([s("✗ "+U.label)])),X1(V([n("case-diff")]),V([X1(f,V([v1(V([n("case-diff-tag")]),V([s("expected ")])),P8(f,V([s(U.expected)]))])),X1(f,V([v1(V([n("case-diff-tag")]),V([s("got ")])),P8(f,V([s(U.actual)]))]))]))]))});let G=q;return X1(V([n("results")]),C(Y,Q0(Fq(Z),G)))}function C_(I,Z){let J,Q=I.run;if(Q instanceof PZ)J=f;else if(Q instanceof W5)J=V([X1(V([n("results")]),V([X1(V([n("results-summary")]),V([s("Compiling and running…")]))]))]);else{let W=Q.outcome;if(W instanceof q5){let G=Q.stdout,U=W[0];J=V([h_(U,G)])}else if(W instanceof K5){let G=Q.stdout,U=W[0];J=V([E_(U,Z,G)])}else J=V([X1(V([n("results")]),V([X1(V([n("results-summary fail")]),V([s("Your solution didn't finish — likely an infinite loop. The runtime was restarted.")]))]))])}let X=J,Y,q=T_(I,Z);if(q instanceof R){let W=q[0];Y=V([X1(V([n("answer-content")]),O8(V([V([X1(V([n("answer-label")]),V([s(W.label)]))]),(()=>{let G=W.note;if(G==="")return f;else{let U=G;return V([X1(V([n("answer-note")]),V([s(U)]))])}})(),V([n5(f,V([P8(f,V([s(W.code)]))]))])])))])}else Y=f;return Q0(X,Y)}function w_(I,Z){return S7(Z.solutions,(J,Q)=>{return U0(V([v0(V([["btn-secondary",!0],["solution-button",!0],["revealed",S1(I.revealed_solution,new a(Q))]])),l1(new K7(Q))]),V([s(J.label)]))})}function e3(I,Z){return U0(V([n("btn-primary run-button"),f6(Z),l1(NO)]),V([s(I)]))}function k_(I,Z){let J;if(Z.check instanceof a)J=V([(()=>{let Y=d3(I,i3(Z.language));if(I.run instanceof W5)return e3("Running…",!0);else if(Y instanceof X7)return e3("Loading runtime…",!0);else if(Y instanceof LZ)return e3("Loading runtime…",!0);else if(Y instanceof Y7)return e3("▶ Run tests",!1);else return e3("Runtime unavailable",!0)})()]);else J=V([v1(V([n("run-unavailable")]),V([s("Checking isn't available for this drill — compare with a solution.")]))]);let X=J;return X1(V([n("run-bar")]),O8(V([X,w_(I,Z),V([U0(V([n("btn-primary next-button"),l1(uY)]),V([s("Next")]))])])))}function jq(I){let J=A9(I,`
`),Q=N9(J,3);return D9(Q,`
`)}function b_(I){let Z=I.run;if(Z instanceof G5){let J=Z.outcome;if(J instanceof K5){let Q=J[0],X=Q.file,Y=Q.line,q=Q.column;if(X instanceof a&&Y instanceof a&&q instanceof a){let K=X[0];if(K==="solution.gleam"){let W=Y[0],G=q[0];return V([new k3(W,G,jq(Q.message))])}else if(K==="solution.py"){let W=Y[0],G=q[0];return V([new k3(W,G,jq(Q.message))])}else if(K==="solution.ts"){let W=Y[0],G=q[0];return V([new k3(W,G,jq(Q.message))])}else return f}else return f}else return f}else return f}function y_(I,Z){if(I.graded){let Q=S1(I.choice,new a(Z.correct));return V([X1(V([n("results")]),V([X1(V([v0(V([["results-summary",!0],["pass",Q],["fail",!Q]]))]),V([s((()=>{if(Q)return"✓ Correct";else return"✗ Not quite"})())])),X1(V([n("quiz-explanation")]),V([s(Z.explanation)])),X1(V([n("quiz-page")]),V([s("Book reference: "+Z.page)]))]))])}else return f}function x_(I){if(I===0)return"A";else if(I===1)return"B";else if(I===2)return"C";else if(I===3)return"D";else return D1(I+1)}function n_(I,Z){let J=X1(V([n("quiz-choices")]),S7(Z.choices,(X,Y)=>{let q=S1(I.choice,new a(Y)),K=Y===Z.correct;return U0(V([v0(V([["quiz-choice",!0],["picked",q],["correct",I.graded&&K],["wrong",I.graded&&q&&!K]])),f6(I.graded),l1(new s3(Y))]),V([v1(V([n("quiz-marker")]),V([s(x_(Y))])),v1(V([n("quiz-choice-text")]),V([s(X)]))]))})),Q=X1(V([n("run-bar")]),(()=>{if(I.graded)return V([U0(V([n("btn-primary next-button"),l1(uY)]),V([s("Next")]))]);else return V([U0(V([n("btn-primary"),f6(I.choice instanceof U4),l1(RO)]),V([s("Submit answer")]))])})());return C(J,C(Q,y_(I,Z)))}function g_(I){let Z=I.run;if(Z instanceof G5){let J=Z.outcome;if(J instanceof q5){let Q=J[0];return s7(V([n("case-list")]),N1(Q,(X)=>{return p7(V([v0(V([["case",!0],["pass",X.passed],["fail",!X.passed]]))]),V([v1(V([n("case-icon")]),V([s((()=>{if(X.passed)return"✓";else return"✗"})())])),s(" "+X.label)]))}))}else return X1(V([n("pane-empty")]),V([s("Run the tests to see the cases.")]))}else return X1(V([n("pane-empty")]),V([s("Run the tests to see the cases.")]))}function Oq(I,Z){return yW(V([n("panel")]),C(f9(V([n("panel-title")]),V([s(I)])),Z))}function f_(I,Z,J){let Q=Oq("Prompt",V([X1(V([n("problem-category")]),V([s(Z.category+" › "+Z.subcategory+" · "+TO(J.language))])),X1(V([n("problem-prompt")]),V([s(J.prompt)]))])),X,Y=J.approach;if(Y==="")X=f;else{let U=Y;X=V([u9(V([n("panel approach")]),V([$9(V([n("panel-title")]),V([s("Approach")])),X1(V([n("approach-text")]),V([s(U)]))]))])}let q=X,K,W=J.check;if(W instanceof a){let U=W[0];K=V([Oq("Signature",V([n5(V([n("signature")]),V([P8(f,V([s(U.signature)]))]))])),Oq("Tests",V([g_(I)]))])}else K=f;return C(Q,Q0(q,K))}function u_(I){return X1(V([n("keymap-picker")]),N1(V([["default","Std"],["vim","Vim"],["emacs","Emacs"]]),(Z)=>{return U0(V([v0(V([["keymap-option",!0],["active",I.editor_keymap===Z[0]]])),i1("title",Z[1]+" keybindings"),l1(new v3(Z[0]))]),V([s(Z[1])]))}))}function $_(I,Z,J){let Q=G0(I.selected),X;if(J.quiz instanceof a)X="Question "+D1(I.problem_index+1)+"/"+D1(Q);else X="Pass "+D1(I.current_iteration)+"/"+D1(I.iteration_count)+" · Problem "+D1(I.problem_index+1)+"/"+D1(Q);let q=X,K=Q*I.iteration_count,W=(I.current_iteration-1)*Q+I.problem_index,G;if(K===0)G=K;else G=y6(W*100,K);let U=G,z=Z.category+"|"+Z.subcategory+"|"+Z.title+"|"+D1(I.current_iteration);return X1(V([n("drill-container")]),V([X1(V([n("drill-header")]),V([U0(V([n("btn-secondary"),l1(FO)]),V([s("← Exit")])),g9(V([n("drill-title")]),V([s(J.title)])),(()=>{if(J.quiz instanceof a)return x5();else return u_(I)})(),X1(V([n("progress-text"),C9("--progress",D1(U)+"%")]),V([s(q)]))])),X1(V([n("drill-grid")]),V([X1(V([n("drill-side")]),f_(I,Z,J)),X1(V([n("drill-main")]),(()=>{let j=J.quiz;if(j instanceof a){let O=j[0];return n_(I,O)}else return C(s6(V([n("editor-frame")]),V([[z,XO(V([YO(I.draft),KO(i3(J.language)),qO(I.editor_keymap),GO((O)=>{return new W7(O)}),WO(b_(I))]))]])),C(k_(I,J),C_(I,J)))})())]))]))}function YF(I){return x7(K4(I),(Z)=>{return x7(w6(Z.category,Z.subcategory,Z.title),(J)=>{return new R($_(I,Z,J))})})}var qF="src/algodrill/view/menu.gleam";function v_(){let I=vZ();return B0(I,0,(Z,J)=>{return Z+G0(J[1])})}function c_(I){let Z=I.selected;if(Z instanceof y)return x5();else{let J=Z;return s6(V([n("chips")]),N1(J,(Q)=>{return[Q.category+"|"+Q.subcategory+"|"+Q.title,v1(V([n("chip")]),V([s(Q.title+" "),U0(V([n("chip-remove"),i1("aria-label","Remove "+Q.title),l1(new E6(Q))]),V([s("×")]))]))]}))}}function KF(I,Z){let J=U7(I.attempts,Z);if(J instanceof R){let Q=J[0],X;if(Q instanceof U5)X=["badge badge-passed","✓"];else X=["badge badge-failed","✗"];let Y=X,q=Y[0],K=Y[1];return v1(V([n(q)]),V([s(K)]))}else return x5()}function Hq(I){return k2("keydown",x1("key",C1,(Z)=>{if(Z==="Enter")return k1(XI(I,!0,!1));else if(Z===" ")return k1(XI(I,!0,!1));else return b7(XI(I,!1,!1),"key")}))}function p_(I,Z){let J=E7(Z),Q,X=j7();Q=_7(X,(q)=>{let K=q.subcategories;return _7(K,(W)=>{let G=W.problems;return j8(G,(U)=>{if(FJ(E7(U.title),J))return new R([new e4(q.name,W.name,U.title),U]);else return new V1(void 0)})})});let Y=Q;if(Y instanceof y)return X1(V([n("search-results")]),V([X1(V([n("pane-empty")]),V([s("No problems match “"+Z+"”")]))]));else return s6(V([n("search-results")]),N1(Y,(q)=>{let K=q[0];return[K.category+"|"+K.subcategory+"|"+K.title,(()=>{let W=V8(I.selected,K);return X1(V([v0(V([["search-hit",!0],["selected",W]])),w9(0),l1(new E6(K)),Hq(new E6(K))]),V([v1(V([n("search-hit-title")]),V([s(K.title)])),KF(I,K),v1(V([n("search-hit-context")]),V([s(K.category+" › "+K.subcategory)]))]))})()]}))}function s_(I,Z){return X1(V([v0(V([["pane-item",!0],["selected",V8(I.selected,Z)]])),w9(0),l1(new E6(Z)),Hq(new E6(Z))]),V([s(Z.title),KF(I,Z)]))}function Nq(I,Z){return X1(V([n("pane")]),V([f9(f,V([s(I)])),Z]))}function d_(I,Z){return Nq("Problems",(()=>{if(Z instanceof y)return X1(V([n("pane-list")]),V([X1(V([n("pane-empty")]),V([s("Pick a subcategory first")]))]));else{let J=I.selected_category,Q;if(J instanceof a)Q=J[0];else throw R5("let_assert",qF,"algodrill/view/menu",288,"problem_pane","Pattern match failed, no pattern matched the value.",{value:J,start:8541,end:8583,pattern_start:8552,pattern_end:8561});let X=I.selected_subcategory,Y;if(X instanceof a)Y=X[0];else throw R5("let_assert",qF,"algodrill/view/menu",289,"problem_pane","Pattern match failed, no pattern matched the value.",{value:X,start:8590,end:8635,pattern_start:8601,pattern_end:8610});return s6(V([n("pane-list")]),N1(Z,(q)=>{let K=new e4(Q,Y,q.title);return[q.title,s_(I,K)]}))}})())}function WF(I,Z,J){return X1(V([v0(V([["pane-item",!0],["current",Z]])),w9(0),l1(J),Hq(J)]),V([s(I)]))}function i_(I){let Z,J=I.selected_category;if(J instanceof a){let X=J[0];Z=a3(X)}else Z=f;let Q=Z;return Nq("Subcategory",(()=>{if(Q instanceof y)return X1(V([n("pane-list")]),V([X1(V([n("pane-empty")]),V([s("Pick a category first")]))]));else return s6(V([n("pane-list")]),N1(Q,(X)=>{return[X,WF(X,S1(I.selected_subcategory,new a(X)),new n3(X))]}))})())}function l_(I){return Nq("Category",s6(V([n("pane-list")]),N1(cO(),(Z)=>{return[Z,WF(Z,S1(I.selected_category,new a(Z)),new x3(Z))]})))}function r_(I){let Z,J=V(["Categories"]),Q=Q0(J,QJ(V([I.selected_category])));Z=Q0(Q,QJ(V([I.selected_subcategory])));let X=Z,Y=G0(X)-1;return X1(V([n("breadcrumbs")]),(()=>{let K=S7(X,(W,G)=>{if(G===Y)return V([v1(V([n("breadcrumb")]),V([s(W)]))]);else return V([v1(V([n("breadcrumb clickable"),l1(new g3(G))]),V([s(W)])),s(" "),v1(V([n("breadcrumb")]),V([s("/")])),s(" ")])});return O8(K)})())}function Rq(I){let Z,J=I.selected_category,Q=I.selected_subcategory;if(J instanceof a&&Q instanceof a){let Y=J[0],q=Q[0];Z=r3(Y,q)}else Z=f;let X=Z;return X1(V([n("menu-container")]),C(X1(V([n("menu-top")]),V([bW(V([n("menu-title")]),V([s("Algo Drill")])),$J(V([yJ("search"),n("search"),NW("Search problems…"),xJ(I.search),b2((Y)=>{return new m3(Y)})]))])),(()=>{let Y,q=L9(I.search);if(q==="")Y=V([r_(I),X1(V([n("panes-container")]),V([l_(I),i_(I),d_(I,X)]))]);else Y=V([p_(I,q)]);return Q0(Y,V([c_(I),X1(V([n("iteration-control")]),V([xW(V([OW("iterations")]),V([s("Repetitions per problem")])),$J(V([yJ("number"),D8("iterations"),HW("1"),FW("20"),xJ(D1(I.iteration_count)),y2((W)=>{return new f3(W)})])),v1(V([n("progress-text")]),V([s(D1(G0(I.selected))+" selected")]))])),X1(V([n("menu-actions")]),V([U0(V([D8("startDrill"),n("btn-primary"),f6(I.selected instanceof y),l1(OO)]),V([s("Start drill")])),U0(V([D8("selectAll"),n("btn-secondary"),f6(X instanceof y),l1(VO)]),V([s("Select all in subcategory")])),U0(V([D8("clearSelection"),n("btn-secondary"),l1(jO)]),V([s("Clear selection")])),U0(V([D8("startExam"),n("btn-secondary"),f6(v_()===0),l1(MO)]),V([s("System design exam")]))]))]))})()))}function Mq(I,Z){return X1(V([n("panel")]),C(X1(V([n("panel-title")]),V([s(I)])),Z))}function t_(I){if(I instanceof y)return V([Mq("Where to study",V([X1(V([n("pane-empty")]),V([s("Nothing under "+D1(yZ)+"%. Widen the pool or raise the bar.")]))]))]);else return V([Mq("Where to study",V([s7(V([n("report-advice")]),N1(I,(Z)=>{return p7(f,V([s(Z.section+" — "+D1(e5(Z.correct,Z.total))+"%")]))}))]))])}function o_(I){let Z=e5(I.correct,I.total),J=Z<yZ;return p7(V([v0(V([["report-section",!0],["weak",J]]))]),V([v1(V([n("report-section-name")]),V([s(I.section)])),v1(V([n("report-bar"),C9("--score",D1(Z)+"%")]),f),v1(V([n("report-section-score")]),V([s(D1(I.correct)+"/"+D1(I.total))])),v1(V([n("report-section-percent")]),V([s(D1(Z)+"%")]))]))}function GF(I){let Z=LO(I.exam_answers,a3(V7)),J=G0(I.exam_answers),Q=z8(I.exam_answers,(Y)=>{return Y[1]}),X=J0(Z,(Y)=>{return e5(Y.correct,Y.total)<yZ});return X1(V([n("report-container")]),V([X1(V([n("drill-header")]),V([U0(V([n("btn-secondary"),l1(AO)]),V([s("← Menu")])),g9(V([n("drill-title")]),V([s("Exam result")]))])),X1(V([n("report-body")]),C(X1(V([n("report-total")]),V([v1(V([n("report-total-score")]),V([s(D1(Q)+"/"+D1(J))])),v1(V([n("report-total-percent")]),V([s(D1(e5(Q,J))+"%")]))])),C(Mq("By section — weakest first",V([s7(V([n("report-sections")]),N1(Z,o_))])),t_(X))))]))}var IT="src/algodrill.gleam",ZT=40;function JT(I){let Z=I.route;if(Z instanceof Q7)return Rq(I);else if(Z instanceof T6){let J=YF(I);if(J instanceof R)return J[0];else return Rq(I)}else return GF(I)}function QT(I){if(I instanceof u3)return!1;else if(I instanceof $3)if(!I[0])return!1;else return!0;else if(I instanceof K7)return!1;else if(I instanceof W7)return!1;else if(I instanceof c3)return!1;else if(I instanceof I8)return!1;else if(I instanceof z5)return!1;else return!0}function Lq(I){let Z=K4(I);if(Z instanceof R){let J=Z[0],Q=w6(J.category,J.subcategory,J.title);if(Q instanceof R){let X=Q[0];return new R(i3(X.language))}else return Q}else return Z}function Aq(I,Z,J){let Q=U7(I,Z);if(J)return n4(I,Z,SZ);else if(Q instanceof R)if(Q[0]instanceof U5)return I;else return n4(I,Z,y3);else return n4(I,Z,y3)}function VF(I){let Z=K4(I);if(Z instanceof R){let J=Z[0],Q=w6(J.category,J.subcategory,J.title);if(Q instanceof R){let Y=Q[0].check;if(Y instanceof a){let q=Y[0];return new R(q)}else return new V1(void 0)}else return Q}else return Z}function XT(){return N4((I)=>{return wQ("draft-save",400,()=>{return I(HO)})})}function Bq(I){let Z=I[0],J=I[1],Q=Z.route instanceof T6&&!S1(VF(Z),new V1(void 0)),X=Lq(Z);if(Q&&X instanceof R){let Y=X[0];if(d3(Z,Y)instanceof X7)return[new F1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,n4(Z.runtimes,Y,bY),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),$7(V([J,aO(Y)]))];else return I}else return I}function I9(I){let Z=w6(I.category,I.subcategory,I.title);if(Z instanceof R){let Q=Z[0].check;if(Q instanceof a)return Q[0].starter;else return""}else return""}function Dq(I){return new F1(Y5,I.selected_category,I.selected_subcategory,I.selected,0,I.iteration_count,1,"",U1,I.runtimes,q7,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,U1,!1,I.exam_answers)}function UF(I){let Z=K4(I);if(Z instanceof R){let J=Z[0],Q=w6(J.category,J.subcategory,J.title);if(Q instanceof R){let Y=Q[0].quiz;if(Y instanceof a){let q=Y[0];return new R(q)}else return new V1(void 0)}else return Q}else return Z}function YT(I,Z,J){while(!0){let Q=I,X=Z,Y=J;if(X<=0)return Y;else{let K=QK(Q,yQ(X)),W=K[0],G=K[1];if(G instanceof y)return Q0(Y,Q);else{let{head:U,tail:z}=G;I=Q0(W,z),Z=X-1,J=C(U,Y)}}}}function zF(I){return YT(I,G0(I),f)}function qT(){let I=vZ(),Z,J=G0(I);if(J===0)Z=J;else Z=_9(1,y6(ZT,J));let Q=Z,Y=_7(I,(q)=>{return N9(zF(q[1]),Q)});return zF(Y)}function KT(I,Z){if(V8(I,Z))return J0(I,(Q)=>{return!S1(Q,Z)});else return Q0(I,V([Z]))}function WT(I,Z){if(Z instanceof x3){let J=Z[0];return[new F1(I.route,new a(J),U1,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof n3){let J=Z[0];return[new F1(I.route,I.selected_category,new a(J),I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof g3)if(Z[0]===0)return[new F1(I.route,U1,U1,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()];else return[new F1(I.route,I.selected_category,U1,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()];else if(Z instanceof E6){let J=Z[0];return[new F1(I.route,I.selected_category,I.selected_subcategory,KT(I.selected,J),I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof _Z){let{selected_category:J,selected_subcategory:Q}=I;if(J instanceof a&&Q instanceof a){let X=J[0],Y=Q[0],q,K=r3(X,Y),W=N1(K,(U)=>{return new e4(X,Y,U.title)});q=J0(W,(U)=>{return!V8(I.selected,U)});let G=q;return[new F1(I.route,I.selected_category,I.selected_subcategory,Q0(I.selected,G),I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else return[I,j1()]}else if(Z instanceof TZ)return[new F1(I.route,I.selected_category,I.selected_subcategory,f,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()];else if(Z instanceof f3){let J=Z[0],Q,X=RJ(J);if(X instanceof R){let q=X[0];if(q>0)Q=q;else Q=1}else Q=1;let Y=Q;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,Y,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof EZ){let J=I.selected;if(J instanceof y)return[I,j1()];else{let Q=J.head;return Bq([new F1(b3,I.selected_category,I.selected_subcategory,I.selected,0,I.iteration_count,1,I9(Q),U1,I.runtimes,q7,n4(I.drafts,Q,I9(Q)),I.attempts,I.search,I.next_run_id,I.editor_keymap,U1,!1,f),j1()])}}else if(Z instanceof u3)return[I,N4((J)=>{return J(new $3(kQ((()=>{if(UF(I)instanceof R)return"Exit the exam? You will not get a score for it.";else return"Exit the drill? Your typed code will be lost."})())))})];else if(Z instanceof $3)if(Z[0])return[Dq(I),j1()];else return[I,j1()];else if(Z instanceof K7){let J=Z[0],Q,X=I.revealed_solution;if(X instanceof a)if(X[0]===J)Q=U1;else Q=new a(J);else Q=new a(J);let Y=Q;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,Y,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof hZ){let J;if(I.problem_index+1<G0(I.selected))J=[I.problem_index+1,I.current_iteration];else J=[0,I.current_iteration+1];let X=J,Y=X[0],q=X[1],K=q>I.iteration_count,W=I.exam_answers;if(K)if(W instanceof y)return[Dq(I),N4((G)=>{return bQ("Drill complete.")})];else return[(()=>{let G=Dq(I);return new F1(DZ,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.revealed_solution,G.runtimes,G.run,G.drafts,G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers)})(),j1()];else{let G=new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,Y,I.iteration_count,q,I.draft,U1,I.runtimes,q7,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,U1,!1,I.exam_answers),U,z=K4(G);if(z instanceof R){let O=z[0];U=new F1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,I9(O),G.revealed_solution,G.runtimes,G.run,n4(G.drafts,O,I9(O)),G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers)}else U=new F1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,"",G.revealed_solution,G.runtimes,G.run,G.drafts,G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers);return Bq([U,j1()])}}else if(Z instanceof m3){let J=Z[0];return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,J,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof v3){let J=Z[0];return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,J,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof W7){let J=Z[0],Q,X=K4(I);if(X instanceof R){let q=X[0];Q=n4(I.drafts,q,J)}else Q=I.drafts;let Y=Q;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,J,I.revealed_solution,I.runtimes,I.run,Y,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),XT()]}else if(Z instanceof CZ)return[I,j1()];else if(Z instanceof c3){let J=Lq(I),Q=VF(I);if(J instanceof R&&Q instanceof R){let X=J[0],Y=Q[0];if(d3(I,X)instanceof Y7){let K=I.next_run_id;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,new W5(K),I.drafts,I.attempts,I.search,K+1,I.editor_keymap,I.choice,I.graded,I.exam_answers),oO(X,K,I.draft,Y.harness)]}else return[I,j1()]}else return[I,j1()]}else if(Z instanceof I8){let J=Z.language;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,n4(I.runtimes,J,zO),I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof z5){let{language:J,message:Q}=Z;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,n4(I.runtimes,J,new BZ(Q)),I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else if(Z instanceof G7){let{id:J,outcome:Q,stdout:X}=Z,Y=I.run;if(Y instanceof W5)if(Y.id===J){let K;if(Q instanceof q5){let j=Q[0];K=!(j instanceof y)&&JK(j,(O)=>{return O.passed})}else if(Q instanceof K5)K=!1;else K=!1;let W=K,G,U=K4(I);if(U instanceof R){let j=U[0];G=Aq(I.attempts,j,W)}else G=I.attempts;let z=G;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,new G5(Q,X),I.drafts,z,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else return[I,j1()];else return[I,j1()]}else if(Z instanceof p3){let J=Z.id,Q=I.run;if(Q instanceof W5)if(Q.id===J){let Y,q=K4(I);if(q instanceof R){let G=q[0];Y=Aq(I.attempts,G,!1)}else Y=I.attempts;let K=Y,W=Lq(I);if(W instanceof R){let G=W[0];return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,n4(I.runtimes,G,bY),new G5(gY,""),I.drafts,K,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),tO(G)]}else return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,new G5(gY,""),I.drafts,K,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}else return[I,j1()];else return[I,j1()]}else if(Z instanceof s3){let J=Z[0];if(I.graded)return[I,j1()];else return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,new a(J),I.graded,I.exam_answers),j1()]}else if(Z instanceof wZ){let{graded:J,choice:Q}=I,X=UF(I),Y=K4(I);if(!J&&Q instanceof a&&X instanceof R&&Y instanceof R){let q=Q[0],K=X[0],W=Y[0],G=q===K.correct;return[new F1(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,Aq(I.attempts,W,G),I.search,I.next_run_id,I.editor_keymap,I.choice,!0,C([W,G],I.exam_answers)),j1()]}else return[I,j1()]}else if(Z instanceof kZ)return[I,N4((J)=>{return J(new bZ(qT()))})];else if(Z instanceof bZ){let J=Z[0];if(J instanceof y)return[I,j1()];else return[new F1(b3,I.selected_category,I.selected_subcategory,J,0,1,1,"",U1,I.runtimes,q7,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,U1,!1,f),j1()]}else return[new F1(Y5,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers),j1()]}function GT(I,Z){let J=WT(I,Z),Q=J[0],X=J[1];if(QT(Z))return[Q,$7(V([XF(Q),X]))];else return[Q,X]}function UT(I,Z){let J=U7(I.drafts,Z);if(J instanceof R)return J[0];else return I9(Z)}function zT(I){let Z=QF(),J,Q=Z.route,X=K4(Z);if(X instanceof R&&Q instanceof T6){let q=X[0];J=new F1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,UT(Z,q),Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers)}else J=Z;return Bq([J,j1()])}function jF(){kY();let I=h2(zT,GT,JT),Z=C2(I,"#app",void 0);if(!(Z instanceof R))throw R5("let_assert",IT,"algodrill",32,"main","Pattern match failed, no pattern matched the value.",{value:Z,start:1219,end:1268,pattern_start:1230,pattern_end:1235});return}jF();
