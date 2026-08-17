class P{withFields(Z){let J=Object.keys(this).map((Q)=>(Q in Z)?Z[Q]:this[Q]);return new this.constructor(...J)}}class iQ{static fromArray(Z,J){return j(Z,J)}[Symbol.iterator](){return new HW(this)}toArray(){return[...this]}atLeastLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return J!==void 0}hasLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return Z===-1&&J instanceof x}countLength(){let Z=this,J=0;while(Z)Z=Z.tail,J++;return J-1}}function _(Z,J){return new D4(Z,J)}function j(Z,J){let Q=J||$;for(let X=Z.length-1;X>=0;--X)Q=new D4(Z[X],Q);return Q}class HW{#Z;constructor(Z){this.#Z=Z}next(){if(this.#Z instanceof x)return{done:!0};else{let{head:Z,tail:J}=this.#Z;return this.#Z=J,{value:Z,done:!1}}}}class x extends iQ{}var $=new x,OW=()=>$,rQ=(Z)=>Z instanceof x;class D4 extends iQ{constructor(Z,J){super();this.head=Z,this.tail=J}}var W7=(Z,J)=>new D4(Z,J),G8=(Z)=>Z instanceof D4,q7=(Z)=>Z.head,c6=(Z)=>Z.tail;class M4{bitSize;byteSize;bitOffset;rawBuffer;constructor(Z,J,Q){if(!(Z instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=J??Z.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=Q??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(Z.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=Z}byteAt(Z){if(Z<0||Z>=this.byteSize)return;return R4(this.rawBuffer,this.bitOffset,Z)}equals(Z){if(this.bitSize!==Z.bitSize)return!1;let J=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&Z.bitOffset===0){for(let X=0;X<J;X++)if(this.rawBuffer[X]!==Z.rawBuffer[X])return!1;let Q=this.bitSize%8;if(Q){let X=8-Q;if(this.rawBuffer[J]>>X!==Z.rawBuffer[J]>>X)return!1}}else{for(let X=0;X<J;X++){let Y=R4(this.rawBuffer,this.bitOffset,X),K=R4(Z.rawBuffer,Z.bitOffset,X);if(Y!==K)return!1}let Q=this.bitSize%8;if(Q){let X=R4(this.rawBuffer,this.bitOffset,J),Y=R4(Z.rawBuffer,Z.bitOffset,J),K=8-Q;if(X>>K!==Y>>K)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function R4(Z,J,Q){if(J===0)return Z[Q]??0;else{let X=Z[Q]<<J&255,Y=Z[Q+1]>>8-J;return X|Y}}class aQ{constructor(Z){this.value=Z}}class GZ extends P{static isResult(Z){return Z instanceof GZ}}class u extends GZ{constructor(Z){super();this[0]=Z}isOk(){return!0}}var m1=(Z)=>new u(Z),N0=(Z)=>Z instanceof u,L0=(Z)=>Z[0];class P1 extends GZ{constructor(Z){super();this[0]=Z}isOk(){return!1}}var Q0=(Z)=>new P1(Z),FW=(Z)=>Z instanceof P1;function T1(Z,J){let Q=[Z,J];while(Q.length){let X=Q.pop(),Y=Q.pop();if(X===Y)continue;if(!jW(X)||!jW(Y))return!1;if(!z2(X,Y)||Y2(X,Y)||K2(X,Y)||W2(X,Y)||q2(X,Y)||G2(X,Y)||U2(X,Y))return!1;let W=Object.getPrototypeOf(X);if(W!==null&&typeof W.equals==="function")try{if(X.equals(Y))continue;else return!1}catch{}let[q,G]=X2(X),U=q(X),z=q(Y);if(U.length!==z.length)return!1;for(let I of U)Q.push(G(X,I),G(Y,I))}return!0}function X2(Z){if(Z instanceof Map)return[(J)=>J.keys(),(J,Q)=>J.get(Q)];else{let J=Z instanceof globalThis.Error?["message"]:[];return[(Q)=>[...J,...Object.keys(Q)],(Q,X)=>Q[X]]}}function Y2(Z,J){return Z instanceof Date&&(Z>J||Z<J)}function K2(Z,J){return!(Z instanceof M4)&&Z.buffer instanceof ArrayBuffer&&Z.BYTES_PER_ELEMENT&&!(Z.byteLength===J.byteLength&&Z.every((Q,X)=>Q===J[X]))}function W2(Z,J){return Array.isArray(Z)&&Z.length!==J.length}function q2(Z,J){return Z instanceof Map&&Z.size!==J.size}function G2(Z,J){return Z instanceof Set&&(Z.size!=J.size||[...Z].some((Q)=>!J.has(Q)))}function U2(Z,J){return Z instanceof RegExp&&(Z.source!==J.source||Z.flags!==J.flags)}function jW(Z){return typeof Z==="object"&&Z!==null}function z2(Z,J){if(typeof Z!=="object"&&typeof J!=="object"&&(!Z||!J))return!1;if([Promise,WeakSet,WeakMap,Function].some((X)=>Z instanceof X))return!1;return Z.constructor===J.constructor}function f8(Z,J){return Math.trunc(oQ(Z,J))}function oQ(Z,J){if(J===0)return 0;else return Z/J}function D9(Z,J,Q,X,Y,K,W){let q=new globalThis.Error(K);q.gleam_error=Z,q.file=J,q.module=Q,q.line=X,q.function=Y,q.fn=Y;for(let G in W)q[G]=W[G];return q}class n0 extends P{}var M9=new n0,NW=()=>M9;class P0 extends P{}var A9=new P0,RW=()=>A9;class tQ extends P{}var B9=new tQ,DW=()=>B9;class a extends P{constructor(Z){super();this[0]=Z}}var UZ=(Z)=>Z instanceof a,zZ=(Z)=>Z[0];class F6 extends P{}var z1=new F6;function I2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=_(Y,X)}}}function V2(Z){return I2(Z,$)}function j2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return V2(X);else{let Y=Q.head;if(Y instanceof a){let K=Q.tail,W=Y[0];Z=K,J=_(W,X)}else Z=Q.tail,J=X}}}function eQ(Z){return j2(Z,$)}var MW=new WeakMap,ZX=new DataView(new ArrayBuffer(8)),JX=0;function QX(Z){let J=MW.get(Z);if(J!==void 0)return J;let Q=JX++;if(JX===2147483647)JX=0;return MW.set(Z,Q),Q}function XX(Z,J){return Z^J+2654435769+(Z<<6)+(Z>>2)|0}function YX(Z){let J=0,Q=Z.length;for(let X=0;X<Q;X++)J=Math.imul(31,J)+Z.charCodeAt(X)|0;return J}function LW(Z){ZX.setFloat64(0,Z);let J=ZX.getInt32(0),Q=ZX.getInt32(4);return Math.imul(73244475,J>>16^J)^Q}function H2(Z){return YX(Z.toString())}function O2(Z){let J=Object.getPrototypeOf(Z);if(J!==null&&typeof J.hashCode==="function")try{let X=Z.hashCode(Z);if(typeof X==="number")return X}catch{}if(Z instanceof Promise||Z instanceof WeakSet||Z instanceof WeakMap)return QX(Z);if(Z instanceof Date)return LW(Z.getTime());let Q=0;if(Z instanceof ArrayBuffer)Z=new Uint8Array(Z);if(Array.isArray(Z)||Z instanceof Uint8Array)for(let X=0;X<Z.length;X++)Q=Math.imul(31,Q)+N6(Z[X])|0;else if(Z instanceof Set)Z.forEach((X)=>{Q=Q+N6(X)|0});else if(Z instanceof Map)Z.forEach((X,Y)=>{Q=Q+XX(N6(X),N6(Y))|0});else{let X=Object.keys(Z);for(let Y=0;Y<X.length;Y++){let K=X[Y],W=Z[K];Q=Q+XX(N6(W),YX(K))|0}}return Q}function N6(Z){if(Z===null)return 1108378658;if(Z===void 0)return 1108378659;if(Z===!0)return 1108378657;if(Z===!1)return 1108378656;switch(typeof Z){case"number":return LW(Z);case"string":return YX(Z);case"bigint":return H2(Z);case"object":return O2(Z);case"symbol":return QX(Z);case"function":return QX(Z);default:return 0}}class U8{constructor(Z,J){this.size=Z,this.root=J}}var A4=5,F2=(1<<A4)-1,VZ=Symbol();class P9{constructor(Z,J,Q,X){this.datamap=J,this.nodemap=Q,this.data=X,this.generation=Z}equals(Z){if(this===Z)return!0;if(!(Z instanceof P9))return!1;if(this.datamap!==Z.datamap||this.nodemap!==Z.nodemap)return!1;let J=this.data,Q=Z.data;if(J.length!==Q.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#Z(Q);let X=J.length-B4(this.nodemap);for(let Y=0;Y<X;Y+=2)if(!T1(J[Y],Q[Y])||!T1(J[Y+1],Q[Y+1]))return!1;for(let Y=X;Y<J.length;++Y)if(!J[Y].equals(Q[Y]))return!1;return!0}#Z(Z){let J=this.data;Z:for(let Q=0;Q<J.length;Q+=2){for(let X=0;X<Z.length;X+=2)if(T1(J[Q],Z[X])){if(!T1(J[Q+1],Z[X+1]))return!1;continue Z}return!1}return!0}hashCode(){let Z=this.data,J=Z.length-B4(this.nodemap),Q=0;for(let X=0;X<J;X+=2)Q=Q+XX(N6(Z[X+1]),N6(Z[X]))|0;for(let X=J;X<Z.length;++X)Q=Q+Z[X].hashCode()|0;return Q}}var PW=R2(0),TW=new U8(0,PW),N2=Q0(void 0);function R2(Z){return new P9(Z,0,0,[])}function SW(Z,J){if(Z.generation===J)return Z;let Q=Z.data.slice(0);return new P9(J,Z.datamap,Z.nodemap,Q)}function jZ(Z,J,Q,X){if(Z.data[Q]===X)return Z;return Z=SW(Z,J),Z.data[Q]=X,Z}function AW(Z,J,Q,X,Y,K){let W=Z.data,q=W.length,G=Array(q+2),U=0,z=0;while(U<X)G[z++]=W[U++];G[z++]=Y,G[z++]=K;while(U<q)G[z++]=W[U++];return new P9(J,Z.datamap|Q,Z.nodemap,G)}function BW(Z,J,Q,X){Z=SW(Z,J);let Y=Z.data,K=Y.length;for(let W=X,q=X+2;q<K;++q,++W)Y[W]=Y[q];return Y.pop(),Y.pop(),Z.datamap^=Q,Z}function G7(){return TW}function z8(Z,J){let Q=D2(Z.root,J,N6(J));return Q!==VZ?m1(Q):N2}function D2(Z,J,Q){for(let Y=0;Y<32;Y+=A4){let K=Z.data,W=WX(Q,Y);if(Z.nodemap&W)Z=K[K.length-1-L9(Z.nodemap,W)];else if(Z.datamap&W){let q=Math.imul(L9(Z.datamap,W),2);return T1(J,K[q])?K[q+1]:VZ}else return VZ}let X=Z.data;for(let Y=0;Y<X.length;Y+=2)if(T1(J,X[Y]))return X[Y+1];return VZ}function KX(Z){return{generation:CW(Z),root:Z.root,size:Z.size,dict:Z}}function EW(Z){if(Z.root===Z.dict.root)return Z.dict;return new U8(Z.size,Z.root)}function CW(Z){let J=Z.root;if(J.generation<Number.MAX_SAFE_INTEGER)return J.generation+1;let Q=[J];while(Q.length){let X=Q.pop();X.generation=0;let Y=X.data.length-B4(X.nodemap);for(let K=Y;K<X.data.length;++K)Q.push(X.data[K])}return 1}var IZ=KX(TW);function T9(Z,J,Q){IZ.generation=CW(Z),IZ.size=Z.size;let X=N6(J),Y=HZ(IZ,Z.root,J,Q,X,0);if(Y===Z.root)return Z;return new U8(IZ.size,Y)}function HZ(Z,J,Q,X,Y,K){let W=J.data,q=Z.generation;if(K>32){for(let k=0;k<W.length;k+=2)if(T1(Q,W[k]))return jZ(J,q,k+1,X);return Z.size+=1,AW(J,q,0,W.length,Q,X)}let G=WX(Y,K);if(J.nodemap&G){let k=W.length-1-L9(J.nodemap,G),A=W[k];return A=HZ(Z,A,Q,X,Y,K+A4),jZ(J,q,k,A)}let U=Math.imul(L9(J.datamap,G),2);if((J.datamap&G)===0)return Z.size+=1,AW(J,q,G,U,Q,X);if(T1(Q,W[U]))return jZ(J,q,U+1,X);let z=K+A4,I=PW;I=HZ(Z,I,Q,X,Y,z);let V=W[U],H=W[U+1],F=N6(V);I=HZ(Z,I,V,H,F,z),Z.size-=1;let N=W.length,R=N-1-L9(J.nodemap,G),T=Array(N-1),S=0,C=0;while(S<U)T[C++]=W[S++];S+=2;while(S<=R)T[C++]=W[S++];T[C++]=I;while(S<N)T[C++]=W[S++];return new P9(q,J.datamap^G,J.nodemap|G,T)}function _W(Z,J){let Q=N6(Z);return J.root=kW(J,J.root,Z,Q,0),J}function kW(Z,J,Q,X,Y){let K=J.data,W=Z.generation;if(Y>32){for(let U=0;U<K.length;U+=2)if(T1(Q,K[U]))return Z.size-=1,BW(J,W,0,U);return J}let q=WX(X,Y),G=Math.imul(L9(J.datamap,q),2);if((J.nodemap&q)!==0){let U=K.length-1-L9(J.nodemap,q),z=K[U];if(z=kW(Z,z,Q,X,Y+A4),z.nodemap!==0||z.data.length>2)return jZ(J,W,U,z);let I=K.length,V=Array(I+1),H=0,F=0;while(H<G)V[F++]=K[H++];V[F++]=z.data[0],V[F++]=z.data[1];while(H<U)V[F++]=K[H++];H++;while(H<I)V[F++]=K[H++];return new P9(W,J.datamap|q,J.nodemap^q,V)}if((J.datamap&q)===0||!T1(Q,K[G]))return J;return Z.size-=1,BW(J,W,q,G)}function S9(Z,J,Q){let X=[Z.root];while(X.length){let Y=X.pop(),K=Y.data,W=K.length-B4(Y.nodemap);for(let q=0;q<W;q+=2)J=Q(J,K[q],K[q+1]);for(let q=W;q<K.length;++q)X.push(K[q])}return J}function B4(Z){return Z-=Z>>>1&1431655765,Z=(Z&858993459)+(Z>>>2&858993459),Math.imul(Z+(Z>>>4)&252645135,16843009)>>>24}function L9(Z,J){return B4(Z&J-1)}function WX(Z,J){return 1<<(Z>>>J&F2)}function L4(Z){return S9(Z,$,(J,Q,X)=>{return _(Q,J)})}function qX(Z,J){let Q=KX(Z),X=((Y)=>{return _W(J,Y)})(Q);return EW(X)}class u8 extends P{}var d6=new u8;class wW extends P{}var P4=new wW;function A2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else Z=Q.tail,J=X+1}}function j0(Z){return A2(Z,0)}function B2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return K;else{let{head:W,tail:q}=X;if(Y(W))Z=q,J=Y,Q=K+1;else Z=q,J=Y,Q=K}}}function z7(Z,J){return B2(Z,J,0)}function U7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=_(Y,X)}}}function E1(Z){return U7(Z,$)}function I7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return!1;else{let Y=Q.head;if(T1(Y,X))return!0;else Z=Q.tail,J=X}}}function OZ(Z){if(Z instanceof x)return new P1(void 0);else{let J=Z.head;return new u(J)}}function L2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return E1(K);else{let{head:W,tail:q}=X,G;if(Y(W))G=_(W,K);else G=K;let z=G;Z=q,J=Y,Q=z}}}function W0(Z,J){return L2(Z,J,$)}function P2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return E1(K);else{let{head:W,tail:q}=X,G,U=Y(W);if(U instanceof u){let I=U[0];G=_(I,K)}else G=K;let z=G;Z=q,J=Y,Q=z}}}function GX(Z,J){return P2(Z,J,$)}function T2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return E1(K);else{let W=X.head;Z=X.tail,J=Y,Q=_(Y(W),K)}}}function I1(Z,J){return T2(Z,J,$)}function S2(Z,J,Q,X){while(!0){let Y=Z,K=J,W=Q,q=X;if(Y instanceof x)return E1(q);else{let{head:G,tail:U}=Y,z=_(K(G,W),q);Z=U,J=K,Q=W+1,X=z}}}function T4(Z,J){return S2(Z,J,0,$)}function FZ(Z,J){while(!0){let Q=Z,X=J;if(X<=0)return Q;else if(Q instanceof x)return Q;else Z=Q.tail,J=X-1}}function E2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return E1(K);else if(X instanceof x)return E1(K);else{let q=X.head;Z=X.tail,J=Y-1,Q=_(q,K)}}}function NZ(Z,J){return E2(Z,J,$)}function C2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=_(Y,X)}}}function G0(Z,J){return C2(E1(Z),J)}function RZ(Z,J){return _(J,Z)}function _2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return E1(X);else{let Y=Q.head;Z=Q.tail,J=U7(Y,X)}}}function S4(Z){return _2(Z,$)}function E4(Z,J){return S4(I1(Z,J))}function T0(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return Y;else{let W=X.head;Z=X.tail,J=K(Y,W),Q=K}}}function V7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return new P1(void 0);else{let{head:Y,tail:K}=Q;if(X(Y))return new u(Y);else Z=K,J=X}}}function bW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return new P1(void 0);else{let{head:Y,tail:K}=Q,W=X(Y);if(W instanceof u)return W;else Z=K,J=X}}}function yW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return!0;else{let{head:Y,tail:K}=Q,W=X(Y);if(W)Z=K,J=X;else return W}}}function k2(Z,J,Q,X){while(!0){let Y=Z,K=J,W=Q,q=X;if(Y instanceof x)return U7(K,q);else if(K instanceof x)return U7(Y,q);else{let{head:G,tail:U}=Y,z=K.head,I=K.tail,V=W(G,z);if(V instanceof n0)Z=Y,J=I,Q=W,X=_(z,q);else if(V instanceof P0)Z=U,J=K,Q=W,X=_(G,q);else Z=U,J=K,Q=W,X=_(G,q)}}}function x2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return E1(K);else{let W=X.tail;if(W instanceof x){let q=X.head;return E1(_(E1(q),K))}else{let q=X.head,G=W.head,U=W.tail,z=k2(q,G,Y,$);Z=U,J=Y,Q=_(z,K)}}}}function w2(Z,J,Q,X){while(!0){let Y=Z,K=J,W=Q,q=X;if(Y instanceof x)return U7(K,q);else if(K instanceof x)return U7(Y,q);else{let{head:G,tail:U}=Y,z=K.head,I=K.tail,V=W(G,z);if(V instanceof n0)Z=U,J=K,Q=W,X=_(G,q);else if(V instanceof P0)Z=Y,J=I,Q=W,X=_(z,q);else Z=Y,J=I,Q=W,X=_(z,q)}}}function b2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return E1(K);else{let W=X.tail;if(W instanceof x){let q=X.head;return E1(_(E1(q),K))}else{let q=X.head,G=W.head,U=W.tail,z=w2(q,G,Y,$);Z=U,J=Y,Q=_(z,K)}}}}function y2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return X;else if(Y instanceof u8)if(X.tail instanceof x)return X.head;else Z=b2(X,K,$),J=P4,Q=K;else if(X.tail instanceof x){let q=X.head;return E1(q)}else Z=x2(X,K,$),J=d6,Q=K}}function $2(Z,J,Q,X,Y,K){while(!0){let W=Z,q=J,G=Q,U=X,z=Y,I=K,V=_(z,G);if(W instanceof x)if(U instanceof u8)return _(E1(V),I);else return _(V,I);else{let{head:H,tail:F}=W,N=q(z,H);if(U instanceof u8)if(N instanceof n0)Z=F,J=q,Q=V,X=U,Y=H,K=I;else if(N instanceof P0)Z=F,J=q,Q=V,X=U,Y=H,K=I;else{let R;if(U instanceof u8)R=_(E1(V),I);else R=_(V,I);let T=R;if(F instanceof x)return _(j([H]),T);else{let{head:S,tail:C}=F,k,A=q(H,S);if(A instanceof n0)k=d6;else if(A instanceof P0)k=d6;else k=P4;let L=k;Z=C,J=q,Q=j([H]),X=L,Y=S,K=T}}else if(N instanceof n0){let R;if(U instanceof u8)R=_(E1(V),I);else R=_(V,I);let T=R;if(F instanceof x)return _(j([H]),T);else{let{head:S,tail:C}=F,k,A=q(H,S);if(A instanceof n0)k=d6;else if(A instanceof P0)k=d6;else k=P4;let L=k;Z=C,J=q,Q=j([H]),X=L,Y=S,K=T}}else if(N instanceof P0){let R;if(U instanceof u8)R=_(E1(V),I);else R=_(V,I);let T=R;if(F instanceof x)return _(j([H]),T);else{let{head:S,tail:C}=F,k,A=q(H,S);if(A instanceof n0)k=d6;else if(A instanceof P0)k=d6;else k=P4;let L=k;Z=C,J=q,Q=j([H]),X=L,Y=S,K=T}}else Z=F,J=q,Q=V,X=U,Y=H,K=I}}}function DZ(Z,J){if(Z instanceof x)return Z;else{let Q=Z.tail;if(Q instanceof x)return Z;else{let X=Z.head,Y=Q.head,K=Q.tail,W,q=J(X,Y);if(q instanceof n0)W=d6;else if(q instanceof P0)W=d6;else W=P4;let G=W,U=$2(K,J,j([X]),G,Y,$);return y2(U,d6,J)}}}function h2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return[E1(K),X];else if(X instanceof x)return[E1(K),$];else{let q=X.head;Z=X.tail,J=Y-1,Q=_(q,K)}}}function $W(Z,J){return h2(Z,J,$)}function hW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return;else{let{head:Y,tail:K}=Q;X(Y),Z=K,J=X}}}class uW extends P{}var ZS=new uW;class pW extends P{}var WS=new pW;class cW extends P{}var qS=new cW;function dW(Z,J){if(Z===J)return A9;else if(sW(Z,J))return M9;else return B9}function MZ(Z,J){if(J==="")return zX(Z);else{let X=v1(Z),Y=IX(X,J);return I1(Y,v1)}}function p2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=X+Y}}}function nW(Z){return p2(Z,"")}function c2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return K;else{let W=X.head;Z=X.tail,J=Y,Q=K+Y+W}}}function AZ(Z,J){if(Z instanceof x)return"";else{let{head:Q,tail:X}=Z;return c2(X,J,Q)}}function lW(Z){let Q=iW(Z);return rW(Q)}class v8 extends P{constructor(Z,J,Q){super();this.expected=Z,this.found=J,this.path=Q}}var eW=(Z,J,Q)=>new v8(Z,J,Q);class h0 extends P{constructor(Z){super();this.function=Z}}var s2=new h0(i2),J6=new h0(r2);var w1=new h0(a2),w4=new h0(ZR);function n6(Z,J){let Q=J.function(Z),X=Q[0],Y=Q[1];if(Y instanceof x)return new u(X);else return new P1(Y)}function jX(Z,J,Q){let X=Q(Z);if(X instanceof u)return[X[0],$];else return[X[0],j([new v8(J,V8(Z),$)])]}function i2(Z){return jX(Z,"Float",Xq)}function E9(Z,J){return new h0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1];return[J(Y),K]})}function r2(Z){return jX(Z,"Int",Yq)}function a2(Z){return jX(Z,"String",Kq)}function o2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(K instanceof x)return Y;else{let{head:W,tail:q}=K,G=W.function(X),U=G;if(G[1]instanceof x)return U;else Z=X,J=Y,Q=q}}}function Zq(Z,J){return new h0((Q)=>{let X=Z.function(Q),Y=X;if(X[1]instanceof x)return Y;else return o2(Q,Y,J)})}function t2(Z){let J=Zq(w1,j([(()=>{return E9(J6,M1)})(),(()=>{return E9(s2,LZ)})()])),Q=n6(Z,J);if(Q instanceof u)return Q[0];else return"<"+V8(Z)+">"}function x4(Z,J){let Q=I1(J,(Y)=>{let W=v1(Y);return t2(W)}),X=I1(Z[1],(Y)=>{return new v8(Y.expected,Y.found,G0(Q,Y.path))});return[Z[0],X]}function j8(Z){return new h0((J)=>{return Qq(J,Z.function,(Q,X)=>{return x4(Q,j([X]))},0,$)})}function e2(Z,J,Q,X,Y){while(!0){let K=Z,W=J,q=Q,G=X,U=Y;if(K instanceof x){let I=q(G);return x4(I,E1(W))}else{let{head:z,tail:I}=K,V=HX(G,z);if(V instanceof u){let H=V[0];if(H instanceof a){let F=H[0];Z=I,J=_(z,W),Q=q,X=F,Y=U}else return U(G,_(z,W))}else{let H=V[0],R=[q(G)[0],j([new v8(H,V8(G),$)])];return x4(R,E1(W))}}}}function j7(Z,J,Q){return new h0((X)=>{let Y=e2(Z,$,J.function,X,(z,I)=>{let F=[J.function(z)[0],j([new v8("Field","Nothing",$)])];return x4(F,E1(I))}),K=Y[0],W=Y[1],q=Q(K).function(X),G=q[0],U=q[1];return[G,G0(W,U)]})}function b1(Z){return new h0((J)=>{return[Z,$]})}function Jq(Z,J){return j([new v8(Z,V8(J),$)])}function $1(Z,J,Q){return j7(j([Z]),J,Q)}function H8(Z,J,Q,X){return new h0((Y)=>{let K,W,q=HX(Y,Z);if(q instanceof u){let N=q[0];if(N instanceof a){let R=N[0];W=Q.function(R)}else W=[J,$]}else{let N=q[0];W=[J,j([new v8(N,V8(Y),$)])]}K=x4(W,j([Z]));let U=K,z=U[0],I=U[1],V=X(z).function(Y),H=V[0],F=V[1];return[H,G0(I,F)]})}function ZR(Z){if(T1(v1(!0),Z))return[!0,$];else if(T1(v1(!1),Z))return[!1,$];else return[!1,Jq("Bool",Z)]}function BZ(Z){return new h0((J)=>{if(Wq(J))return[z1,$];else{let X=Z.function(J),Y=X[0],K=X[1];return[new a(Y),K]}})}function b4(Z,J){return new h0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1],q=J(Y).function(Q),G=q,U=q[0];if(K instanceof x)return G;else return[U,K]})}function y4(Z,J){return new h0((Q)=>{return[Z,Jq(J,Q)]})}var QR=void 0;function v1(Z){return Z}function OX(Z){if(/^[-+]?(\d+)$/.test(Z))return m1(parseInt(Z));else return Q0(QR)}function M1(Z){return Z.toString()}function zX(Z){let J=XR(Z);if(J)return $4(Array.from(J).map((Q)=>Q.segment));else return $4(Z.match(/./gsu))}var qq=void 0;function XR(Z){if(globalThis.Intl&&Intl.Segmenter)return qq||=new Intl.Segmenter,qq.segment(Z)[Symbol.iterator]()}function _4(Z){return Z.toLowerCase()}function sW(Z,J){return Z<J}function IX(Z,J){return $4(Z.split(J))}function VX(Z,J){return Z.indexOf(J)>=0}function k4(Z,J){return Z.startsWith(J)}var Gq=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),YR=new RegExp(`^[${Gq}]*`),KR=new RegExp(`[${Gq}]*$`);function iW(Z){return Z.replace(YR,"")}function rW(Z){return Z.replace(KR,"")}function V8(Z){if(typeof Z==="string")return"String";else if(typeof Z==="boolean")return"Bool";else if(qR(Z))return"Result";else if(PZ(Z))return"List";else if(Z instanceof M4)return"BitArray";else if(Z instanceof U8)return"Dict";else if(Number.isInteger(Z))return"Int";else if(Array.isArray(Z))return"Array";else if(typeof Z==="number")return"Float";else if(Z===null)return"Nil";else if(Z===void 0)return"Nil";else{let J=typeof Z;return J.charAt(0).toUpperCase()+J.slice(1)}}var{MAX_SAFE_INTEGER:JE,MIN_SAFE_INTEGER:QE}=Number;function LZ(Z){let J=Z.toString().replace("+","");if(J.indexOf(".")>=0)return J;else{let Q=J.indexOf("e");if(Q>=0)return J.slice(0,Q)+".0"+J.slice(Q);else return J+".0"}}class WR{#Z=new Set;inspect(Z){let J=typeof Z;if(Z===!0)return"True";if(Z===!1)return"False";if(Z===null)return"//js(null)";if(Z===void 0)return"Nil";if(J==="string")return this.#Y(Z);if(J==="bigint"||Number.isInteger(Z))return Z.toString();if(J==="number")return LZ(Z);if(Z instanceof aQ)return this.#q(Z);if(Z instanceof M4)return this.#K(Z);if(Z instanceof RegExp)return`//js(${Z})`;if(Z instanceof Date)return`//js(Date("${Z.toISOString()}"))`;if(Z instanceof globalThis.Error)return`//js(${Z.toString()})`;if(Z instanceof Function){let X=[];for(let Y of Array(Z.length).keys())X.push(String.fromCharCode(Y+97));return`//fn(${X.join(", ")}) { ... }`}if(this.#Z.size===this.#Z.add(Z).size)return"//js(circular reference)";let Q;if(Array.isArray(Z))Q=`#(${Z.map((X)=>this.inspect(X)).join(", ")})`;else if(PZ(Z))Q=this.#Q(Z);else if(Z instanceof P)Q=this.#J(Z);else if(Z instanceof U8)Q=this.#X(Z);else if(Z instanceof Set)return`//js(Set(${[...Z].map((X)=>this.inspect(X)).join(", ")}))`;else Q=this.#W(Z);return this.#Z.delete(Z),Q}#W(Z){let J=Object.getPrototypeOf(Z)?.constructor?.name||"Object",Q=[];for(let K of Object.keys(Z))Q.push(`${this.inspect(K)}: ${this.inspect(Z[K])}`);let X=Q.length?" "+Q.join(", ")+" ":"";return`//js(${J==="Object"?"":J+" "}{${X}})`}#X(Z){let J="dict.from_list([",Q=!0;return J=S9(Z,J,(X,Y,K)=>{if(!Q)X=X+", ";return Q=!1,X+"#("+this.inspect(Y)+", "+this.inspect(K)+")"}),J+"])"}#J(Z){let J=Object.keys(Z).map((Q)=>{let X=this.inspect(Z[Q]);return isNaN(parseInt(Q))?`${Q}: ${X}`:X}).join(", ");return J?`${Z.constructor.name}(${J})`:Z.constructor.name}#Q(Z){if(rQ(Z))return"[]";let J='charlist.from_string("',Q="[",X=Z;while(G8(X)){let Y=X.head;if(X=X.tail,Q!=="[")Q+=", ";if(Q+=this.inspect(Y),J)if(Number.isInteger(Y)&&Y>=32&&Y<=126)J+=String.fromCharCode(Y);else J=null}if(J)return J+'")';else return Q+"]"}#Y(Z){let J='"';for(let Q=0;Q<Z.length;Q++){let X=Z[Q];switch(X){case`
`:J+="\\n";break;case"\r":J+="\\r";break;case"\t":J+="\\t";break;case"\f":J+="\\f";break;case"\\":J+="\\\\";break;case'"':J+="\\\"";break;default:if(X<" "||X>"~"&&X<" ")J+="\\u{"+X.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else J+=X}}return J+='"',J}#q(Z){return`//utfcodepoint(${String.fromCodePoint(Z.value)})`}#K(Z){if(Z.bitSize===0)return"<<>>";let J="<<";for(let Q=0;Q<Z.byteSize-1;Q++)J+=Z.byteAt(Q).toString(),J+=", ";if(Z.byteSize*8===Z.bitSize)J+=Z.byteAt(Z.byteSize-1).toString();else{let Q=Z.bitSize%8;J+=Z.byteAt(Z.byteSize-1)>>8-Q,J+=`:size(${Q})`}return J+=">>",J}}function HX(Z,J){if(Z instanceof U8){let X=z8(Z,J);return m1(X.isOk()?new a(X[0]):new F6)}if(Z instanceof WeakMap||Z instanceof Map){let X={},Y=Z.get(J,X);if(Y===X)return m1(new F6);return m1(new a(Y))}let Q=Number.isInteger(J);if(Q&&J>=0&&J<8&&PZ(Z)){let X=0;for(let Y of Z){if(X===J)return m1(new a(Y));X++}return Q0("Indexable")}if(Q&&Array.isArray(Z)||Z&&typeof Z==="object"||Z&&Object.getPrototypeOf(Z)===Object.prototype){if(J in Z)return m1(new a(Z[J]));return m1(new F6)}return Q0(Q?"Indexable":"Dict")}function Qq(Z,J,Q,X,Y){if(!(PZ(Z)||Array.isArray(Z))){let W=eW("List",V8(Z),Y);return[Y,$4([W])]}let K=[];for(let W of Z){let q=J(W),[G,U]=q;if(G8(U)){let[z,I]=Q(q,X.toString());return[Y,I]}K.push(G),X++}return[$4(K),Y]}function Xq(Z){if(typeof Z==="number")return m1(Z);return Q0(0)}function Yq(Z){if(Number.isInteger(Z))return m1(Z);return Q0(0)}function Kq(Z){if(typeof Z==="string")return m1(Z);return Q0("")}function Wq(Z){return Z===null||Z===void 0}function $4(Z){let J=OW(),Q=Z.length;while(Q--)J=W7(Z[Q],J);return J}function PZ(Z){return rQ(Z)||G8(Z)}function qR(Z){return N0(Z)||FW(Z)}function TZ(Z,J){if(Z>J)return Z;else return J}function Uq(Z,J){if(Z===J)return A9;else if(Z<J)return M9;else return B9}class zq extends P{}var GR=new zq;class NX extends P{}var _E=new NX;class Iq extends P{}var kE=new Iq;class Vq extends P{}var xE=new Vq;class jq extends P{}var wE=new jq;class Hq extends P{}var bE=new Hq;function H7(Z,J){if(Z instanceof u){let Q=Z[0];return new u(J(Q))}else return Z}function Oq(Z,J){if(Z instanceof u)return Z;else{let Q=Z[0];return new P1(J(Q))}}function h4(Z,J){if(Z instanceof u){let Q=Z[0];return J(Q)}else return Z}function f4(Z,J){if(Z instanceof u)return Z[0];else return J}class RX extends P{}var uE=new RX;class DX extends P{}var vE=new DX;class Fq extends P{}var mE=new Fq;class Nq extends P{}var tE=new Nq;class Rq extends P{}var QC=new Rq;class Dq extends P{}var VR=new Dq;class Mq extends P{}var XC=new Mq;class Aq extends P{}var jR=new Aq;class Lq extends P{}var GC=new Lq;function Pq(Z,J,Q){if(Z)return J;else return Q()}function f0(Z){return Z}function MX(Z){return JSON.stringify(Z)}function Sq(Z){return Object.fromEntries(Z)}function _9(Z){return Z}function Eq(Z){let J=[];while(G8(Z))J.push(q7(Z)),Z=c6(Z);return J}function Cq(){return null}function _q(Z){try{let J=JSON.parse(Z);return m1(J)}catch(J){return Q0(FR(J,Z))}}function FR(Z,J){if(NR(Z))return kq();return RR(Z,J)}function NR(Z){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(Z.message)}function RR(Z,J){let Q=[DR,MR,BR,AR];for(let X of Q){let Y=X(Z,J);if(Y)return Y}return F7("")}function DR(Z){let Q=/unexpected token '(.)', ".+" is not valid JSON/i.exec(Z.message);if(!Q)return null;let X=EZ(Q[1]);return F7(X)}function MR(Z){let Q=/unexpected token (.) in JSON at position (\d+)/i.exec(Z.message);if(!Q)return null;let X=EZ(Q[1]);return F7(X)}function AR(Z,J){let X=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(Z.message);if(!X)return null;let Y=Number(X[2]),K=Number(X[3]),W=LR(Y,K,J),q=EZ(J[W]);return F7(q)}function BR(Z){let Q=/unexpected (identifier|token) "(.)"/i.exec(Z.message);if(!Q)return null;let X=EZ(Q[2]);return F7(X)}function EZ(Z){return"0x"+Z.charCodeAt(0).toString(16).toUpperCase()}function LR(Z,J,Q){if(Z===1)return J-1;let X=1,Y=0;return Q.split("").find((K,W)=>{if(K===`
`)X+=1;if(X===Z)return Y=W+J,!0;return!1}),Y}class xq extends P{}var PR=new xq,kq=()=>PR;class wq extends P{constructor(Z){super();this[0]=Z}}var F7=(Z)=>new wq(Z);class bq extends P{constructor(Z){super();this[0]=Z}}function TR(Z,J){return h4(_q(Z),(Q)=>{let X=n6(Q,J);return Oq(X,(Y)=>{return new bq(Y)})})}function k9(Z,J){return TR(Z,J)}function yq(Z){return MX(Z)}function U0(Z){return _9(Z)}function g4(Z){return _9(Z)}function l6(Z){return _9(Z)}function SR(){return Cq()}function AX(Z,J){if(Z instanceof a){let Q=Z[0];return J(Q)}else return SR()}function x9(Z){return Sq(Z)}function ER(Z){return Eq(Z)}function O8(Z,J){let X=I1(Z,J);return ER(X)}function u4(Z){return Z.replaceAll(/[><&"']/g,(J)=>{switch(J){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return J}})}var U1=$,N7=new P1(void 0);function S0(Z){return _(Z,U1)}var CR=DW(),_R=NW(),kR=RW();function CZ(Z,J){if(Z.name===J.name)return kR;else if(Z.name<J.name)return _R;else return CR}class A6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class R7 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class E0 extends P{constructor(Z,J,Q,X,Y,K,W,q){super();this.kind=Z,this.name=J,this.handler=Q,this.include=X,this.prevent_default=Y,this.stop_propagation=K,this.debounce=W,this.throttle=q}}class D7 extends P{constructor(Z,J,Q){super();this.prevent_default=Z,this.stop_propagation=J,this.message=Q}}class mq extends P{constructor(Z){super();this.kind=Z}}class pq extends P{constructor(Z){super();this.kind=Z}}var LX=0,PX=1,TX=2,SX=0,EX=new mq(SX),yR=1,CX=new pq(yR),_X=2;function cq(Z,J){return new A6(LX,Z,J)}function dq(Z,J){return new R7(PX,Z,J)}function kX(Z,J,Q,X,Y,K,W){return new E0(TX,Z,J,Q,X,Y,K,W)}function $R(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;if(Y instanceof A6){let K=Y.name;if(K==="")Z=Q.tail,J=X;else if(K==="class"){let W=Y.value;if(W==="")Z=Q.tail,J=X;else{let q=Q.tail;if(q instanceof x){let G=Y;Z=q,J=_(G,X)}else{let G=q.head;if(G instanceof A6)if(G.name==="class"){let z=Y.kind,I=W,V=q.tail,H=G.value,F=I+" "+H,N=new A6(z,"class",F);Z=_(N,V),J=X}else{let z=Y;Z=q,J=_(z,X)}else{let U=Y;Z=q,J=_(U,X)}}}}else if(K==="style"){let W=Y.value;if(W==="")Z=Q.tail,J=X;else{let q=Q.tail;if(q instanceof x){let G=Y;Z=q,J=_(G,X)}else{let G=q.head;if(G instanceof A6)if(G.name==="style"){let z=Y.kind,I=W,V=q.tail,H=G.value,F=I+";"+H,N=new A6(z,"style",F);Z=_(N,V),J=X}else{let z=Y;Z=q,J=_(z,X)}else{let U=Y;Z=q,J=_(U,X)}}}}else{let W=Y;Z=Q.tail,J=_(W,X)}}else{let K=Y;Z=Q.tail,J=_(K,X)}}}}function nq(Z){if(Z instanceof x)return Z;else if(Z.tail instanceof x)return Z;else{let X=DZ(Z,(Y,K)=>{return CZ(K,Y)});return $R(X,U1)}}function s1(Z,J){return cq(Z,J)}function v4(Z,J){return dq(Z,J)}function hR(Z,J){if(J)return s1(Z,"");else return v4(Z,g4(!1))}function b(Z){return s1("class",Z)}function lq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else if(Q.head[1]){let K=Q.tail,W=Q.head[0];return X+W+" "+lq(K,X)}else Z=Q.tail,J=X}}function l0(Z){return b(lq(Z,""))}function M7(Z){return s1("id",Z)}function _Z(Z,J){if(Z==="")return b("");else if(J==="")return b("");else return s1("style",Z+":"+J+";")}function kZ(Z){return s1("tabindex",M1(Z))}function m8(Z){return hR("disabled",Z)}function sq(Z){return s1("for",Z)}function iq(Z){return s1("max",Z)}function rq(Z){return s1("min",Z)}function aq(Z){return s1("placeholder",Z)}function xX(Z){return s1("type",Z)}function wX(Z){return s1("value",Z)}class wZ extends P{constructor(Z,J,Q){super();this.synchronous=Z,this.before_paint=J,this.after_paint=Q}}class oq extends P{constructor(Z,J,Q,X,Y,K,W){super();this.dispatch=Z,this.emit=J,this.select=Q,this.root=X,this.provide=Y,this.subscribe=K,this.unsubscribe=W}}var xZ=new wZ(U1,U1,U1);function j1(){return xZ}function B6(Z){return new wZ(S0((Q)=>{let X=Q.dispatch;return Z(X)}),xZ.before_paint,xZ.after_paint)}function m4(Z){return T0(Z,xZ,(J,Q)=>{return new wZ(T0(Q.synchronous,J.synchronous,RZ),T0(Q.before_paint,J.before_paint,RZ),T0(Q.after_paint,J.after_paint,RZ))})}function tq(Z,J,Q,X,Y,K,W,q){let G=new oq(J,Q,X,Y,K,W,q);return hW(Z.synchronous,(U)=>{return U(G)})}function n1(){return null}function b9(Z,J){return Z?.get(J)}function A7(Z,J,Q){return Z?.get(J)??Q()}function s6(Z,J){return Z&&Z.has(J)}function Q6(Z,J,Q){return Z??=new Map,Z.set(J,Q),Z}function bZ(Z,J){return Z?.delete(J),Z}function eq(Z,J){if(typeof Z==="number"&&typeof J==="number")return Z===J||Z!==Z&&J!==J;return Z===J}function ZG(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)if(X instanceof x)return!0;else return!1;else if(X instanceof x)return!1;else{let{head:Y,tail:K}=Q,W=X.head,q=X.tail,G=eq(Y,W);if(G)Z=K,J=q;else return G}}}class L6 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.children=Q,this.keyed_children=X}}class P6 extends P{constructor(Z,J,Q,X,Y,K,W,q,G){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.children=K,this.keyed_children=W,this.self_closing=q,this.void=G}}class i6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.content=Q}}class r6 extends P{constructor(Z,J,Q,X,Y,K){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.inner_html=K}}class s0 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.mapper=Q,this.child=X}}class y9 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.dependencies=Q,this.view=X}}var $9=0,c8=1,B7=2,JG=3,p8=4,yX=5;function $X(Z,J,Q){return new L6($9,Z,J,Q)}function c4(Z,J,Q,X,Y,K,W,q){return new P6(c8,Z,J,Q,nq(X),Y,K,W,q)}function d4(Z,J){if(J==="")if(Z==="area")return!0;else if(Z==="base")return!0;else if(Z==="br")return!0;else if(Z==="col")return!0;else if(Z==="embed")return!0;else if(Z==="hr")return!0;else if(Z==="img")return!0;else if(Z==="input")return!0;else if(Z==="link")return!0;else if(Z==="meta")return!0;else if(Z==="param")return!0;else if(Z==="source")return!0;else if(Z==="track")return!0;else if(Z==="wbr")return!0;else return!1;else return!1}function hX(Z,J){return new i6(B7,Z,J)}function QG(Z,J){if(Z instanceof s0){let Q=Z.mapper;return new s0(p8,Z.key,(X)=>{return f0(J)(Q(X))},f0(Z.child))}else return new s0(p8,Z.key,f0(J),f0(Z))}function XG(Z,J,Q){return new y9(yX,Z,J,Q)}function yZ(Z,J){if(J instanceof L6)return new L6(J.kind,Z,J.children,J.keyed_children);else if(J instanceof P6)return new P6(J.kind,Z,J.namespace,J.tag,J.attributes,J.children,J.keyed_children,J.self_closing,J.void);else if(J instanceof i6)return new i6(J.kind,Z,J.content);else if(J instanceof r6)return new r6(J.kind,Z,J.namespace,J.tag,J.attributes,J.inner_html);else if(J instanceof s0){let Q=J.child;return new s0(J.kind,Z,J.mapper,yZ(Z,Q))}else{let Q=J.view;return new y9(J.kind,Z,J.dependencies,()=>{return yZ(Z,Q())})}}class YG extends P{}var tC=new YG;class KG extends P{}var eC=new KG;class WG extends P{}var Z_=new WG;class qG extends P{}var J_=new qG;class GG extends P{}var Q_=new GG;function X0(Z,J,Q){return c4("","",Z,J,Q,n1(),!1,d4(Z,""))}function $Z(Z){return hX("",Z)}function h9(){return hX("","")}function UG(Z,J){return XG("",Z,J)}function zG(Z){return f0(Z)}function IG(Z,J){return QG(Z,J)}function i(Z){return $Z(Z)}function VG(Z,J){return X0("h1",Z,J)}function hZ(Z,J){return X0("h2",Z,J)}function fZ(Z,J){return X0("h3",Z,J)}function jG(Z,J){return X0("section",Z,J)}function Y1(Z,J){return X0("div",Z,J)}function n4(Z,J){return X0("li",Z,J)}function L7(Z,J){return X0("pre",Z,J)}function l4(Z,J){return X0("ul",Z,J)}function P7(Z,J){return X0("code",Z,J)}function p1(Z,J){return X0("span",Z,J)}function H0(Z,J){return X0("button",Z,J)}function fX(Z){return X0("input",Z,U1)}function HG(Z,J){return X0("label",Z,J)}function gX(Z,J){return X0("details",Z,J)}function uX(Z,J){return X0("summary",Z,J)}class uZ extends P{constructor(Z,J,Q,X,Y){super();this.index=Z,this.path=J,this.removed=Q,this.changes=X,this.children=Y}}class OG extends P{constructor(Z,J){super();this.kind=Z,this.content=J}}class FG extends P{constructor(Z,J){super();this.kind=Z,this.inner_html=J}}class NG extends P{constructor(Z,J,Q){super();this.kind=Z,this.added=J,this.removed=Q}}class RG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.before=Q}}class DG extends P{constructor(Z,J,Q){super();this.kind=Z,this.index=J,this.with=Q}}class MG extends P{constructor(Z,J){super();this.kind=Z,this.index=J}}class AG extends P{constructor(Z,J,Q){super();this.kind=Z,this.children=J,this.before=Q}}var vX=0,mX=1,pX=2,cX=3,dX=4,nX=5,lX=6;function n8(Z,J,Q,X){return new uZ(Z,U1,J,Q,X)}function BG(Z){return new OG(vX,Z)}function LG(Z){return new FG(mX,Z)}function sX(Z,J){return new NG(pX,Z,J)}function PG(Z,J){return new RG(cX,Z,J)}function TG(Z){return new MG(dX,Z)}function D8(Z,J){return new DG(nX,Z,J)}function iX(Z,J){return new AG(lX,Z,J)}function SG(Z,J){return new uZ(J,_(Z.index,Z.path),Z.removed,Z.changes,Z.children)}class CG extends P{constructor(Z,J,Q,X,Y,K,W,q,G){super();this.kind=Z,this.open_shadow_root=J,this.will_adopt_styles=Q,this.observed_attributes=X,this.observed_properties=Y,this.requested_contexts=K,this.provided_contexts=W,this.vdom=q,this.memos=G}}class _G extends P{constructor(Z,J,Q){super();this.kind=Z,this.patch=J,this.memos=Q}}class kG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.data=Q}}class xG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}class wG extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class bG extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class yG extends P{constructor(Z,J){super();this.kind=Z,this.messages=J}}var $G=(Z)=>Z instanceof yG;class hG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var fG=(Z)=>Z instanceof hG;class gG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var uG=(Z)=>Z instanceof gG;class vG extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.path=J,this.name=Q,this.event=X}}var mG=(Z)=>Z instanceof vG;class pG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}var cG=(Z)=>Z instanceof pG;var vR=0,mR=1,pR=2,cR=3,dR=4,nR=5;function dG(Z,J,Q,X,Y,K,W,q){return new CG(vR,Z,J,Q,X,Y,K,W,q)}function rX(Z,J){return new _G(mR,Z,J)}function nG(Z,J){return new kG(pR,Z,J)}function lG(Z,J){return new xG(cR,Z,J)}function sG(Z){return new wG(dR,Z)}function iG(Z){return new bG(nR,Z)}class aX extends P{}var lR=new aX;class oX extends P{constructor(Z,J){super();this.key=Z,this.parent=J}}class tX extends P{constructor(Z,J){super();this.index=Z,this.parent=J}}class oG extends P{constructor(Z){super();this.parent=Z}}var mZ="\r",vZ="\t",eX=`
`,pZ=lR;function aG(Z){if(Z instanceof x)return"";else{let J=Z.tail;return nW(J)}}function ZY(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof aX)return aG(K);else if(Y instanceof oX){let{key:W,parent:q}=Y;Z=X,J=q,Q=_(vZ,_(W,K))}else if(Y instanceof tX){let{index:W,parent:q}=Y,G=_(vZ,_(M1(W),K));Z=X,J=q,Q=G}else if(!X)return aG(K);else{let W=Y.parent;if(K instanceof x)Z=X,J=W,Q=K;else{let q=K.tail;Z=X,J=W,Q=_(mZ,q)}}}}function sR(Z){return ZY(!0,Z,U1)}function iR(Z,J){while(!0){let Q=Z,X=J;if(X instanceof x)return!1;else{let{head:Y,tail:K}=X,W=k4(Q,Y);if(W)return W;else Z=Q,J=K}}}function tG(Z,J){if(J instanceof x)return!1;else return iR(sR(Z),J)}function eG(Z){return MZ(Z,mZ)}function u0(Z,J,Q){if(Q==="")return new tX(J,Z);else return new oX(Q,Z)}function cZ(Z){return new oG(Z)}function JY(Z,J){return ZY(!1,Z,_(eX,_(J,U1)))}function s4(Z){return ZY(!1,Z,U1)}class M8 extends P{constructor(Z,J,Q,X,Y){super();this.events=Z,this.vdoms=J,this.old_vdoms=Q,this.dispatched_paths=X,this.next_dispatched_paths=Y}}class l8 extends P{constructor(Z,J){super();this.handlers=Z,this.children=J}}class nZ extends P{constructor(Z,J){super();this.mapper=Z,this.events=J}}class XU extends P{constructor(Z,J,Q){super();this.handlers=Z,this.children=J,this.vdoms=Q}}class YY extends P{constructor(Z,J){super();this.path=Z,this.handler=J}}class QY extends P{constructor(Z){super();this.path=Z}}function rR(Z,J){return(Q)=>{return Z(J(Q))}}function YU(){return new l8(n1(),n1())}function KY(){return new M8(YU(),n1(),n1(),U1,U1)}function KU(Z,J,Q,X){return Q6(Z,JY(J,Q),X)}function JU(Z,J,Q){return T0(Q,Z,(X,Y)=>{if(Y instanceof E0){let{name:K,handler:W}=Y;return KU(X,J,K,W)}else return X})}function dZ(Z,J,Q,X,Y,K){while(!0){let W=Z,q=J,G=Q,U=X,z=Y,I=K,V=z+1;if(I instanceof x)return new XU(W,q,G);else{let H=I.head;if(H instanceof L6){let F=I.tail,N=H.key,R=H.children,T=u0(U,z,N),S=dZ(W,q,G,T,0,R),C=S.handlers,k=S.children,A=S.vdoms;Z=C,J=k,Q=A,X=U,Y=V,K=F}else if(H instanceof P6){let F=I.tail,N=H.key,R=H.attributes,T=H.children,S=u0(U,z,N),C=JU(W,S,R),k=dZ(C,q,G,S,0,T),A=k.handlers,L=k.children,B=k.vdoms;Z=A,J=L,Q=B,X=U,Y=V,K=F}else if(H instanceof i6){let F=I.tail;Z=W,J=q,Q=G,X=U,Y=V,K=F}else if(H instanceof r6){let F=I.tail,N=H.key,R=H.attributes,T=u0(U,z,N);Z=JU(W,T,R),J=q,Q=G,X=U,Y=V,K=F}else if(H instanceof s0){let F=I.tail,N=H.key,R=H.mapper,T=H.child,S=u0(U,z,N),C=dZ(n1(),n1(),G,cZ(S),0,S0(T)),k=C.vdoms,A=new l8(C.handlers,C.children),L=new nZ(R,A),B=Q6(q,s4(S),L);Z=W,J=B,Q=k,X=U,Y=V,K=F}else{let F=I.tail,N=H.view,R=N(),T=Q6(G,N,R),S=z,C=_(R,F);Z=W,J=q,Q=T,X=U,Y=S,K=C}}}}function WY(Z,J,Q,X,Y){let K=Z.vdoms,W=J.handlers,q=J.children,G=dZ(W,q,K,Q,X,Y),U=G.handlers,z=G.children,I=G.vdoms;return[new M8(Z.events,I,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths),new l8(U,z)]}function lZ(Z,J,Q,X,Y){let K=S0(Y);return WY(Z,J,Q,X,K)}function WU(Z){let J=KY(),Q=lZ(J,J.events,pZ,0,Z),X=Q[0],Y=Q[1];return new M8(Y,X.vdoms,X.old_vdoms,X.dispatched_paths,X.next_dispatched_paths)}function qU(Z){return new M8(Z.events,n1(),Z.vdoms,Z.next_dispatched_paths,U1)}function GU(Z){return Z.events}function UU(Z,J){return new M8(J,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function T7(Z){return Z.vdoms}function zU(Z,J,Q){return A7(Z.old_vdoms,J,Q)}function IU(Z,J,Q){let X=A7(Z.old_vdoms,J,Q),Y=Q6(Z.vdoms,Q,X);return new M8(Z.events,Y,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function VU(Z,J,Q){let X=Q6(Z.vdoms,J,Q);return new M8(Z.events,X,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function jU(Z,J,Q){return A7(Z.children,J,()=>{return new nZ(Q,YU())}).events}function HU(Z,J,Q,X){let Y=new nZ(Q,X),K=Q6(Z.children,J,Y);return new l8(Z.handlers,K)}function S7(Z,J,Q,X){let Y=KU(Z.handlers,J,Q,X);return new l8(Y,Z.children)}function OU(Z,J,Q){return bZ(Z,JY(J,Q))}function sZ(Z,J,Q){let X=OU(Z.handlers,J,Q);return new l8(X,Z.children)}function QU(Z,J,Q){return T0(Q,Z,(X,Y)=>{if(Y instanceof E0){let K=Y.name;return OU(X,J,K)}else return X})}function XY(Z,J,Q,X,Y,K){while(!0){let W=Z,q=J,G=Q,U=X,z=Y,I=K,V=z+1;if(I instanceof x)return new l8(W,q);else{let H=I.head;if(H instanceof L6){let F=I.tail,N=H.key,R=H.children,T=u0(U,z,N),S=XY(W,q,G,T,0,R),C=S.handlers,k=S.children;Z=C,J=k,Q=G,X=U,Y=V,K=F}else if(H instanceof P6){let F=I.tail,N=H.key,R=H.attributes,T=H.children,S=u0(U,z,N),C=QU(W,S,R),k=XY(C,q,G,S,0,T),A=k.handlers,L=k.children;Z=A,J=L,Q=G,X=U,Y=V,K=F}else if(H instanceof i6){let F=I.tail;Z=W,J=q,Q=G,X=U,Y=V,K=F}else if(H instanceof r6){let F=I.tail,N=H.key,R=H.attributes,T=u0(U,z,N);Z=QU(W,T,R),J=q,Q=G,X=U,Y=V,K=F}else if(H instanceof s0){let F=I.tail,N=H.key,R=u0(U,z,N),T=bZ(q,s4(R));Z=W,J=T,Q=G,X=U,Y=V,K=F}else{let F=I.tail,N=H.view;if(s6(G,N)){let T=b9(G,N),S=_(T,F);Z=W,J=q,Q=G,X=U,Y=z,K=S}else Z=W,J=q,Q=G,X=U,Y=V,K=F}}}}function iZ(Z,J,Q,X,Y){return XY(J.handlers,J.children,Z.old_vdoms,Q,X,S0(Y))}function A8(Z,J,Q,X,Y,K){let W=iZ(Z,J,Q,X,Y);return lZ(Z,W,Q,X,K)}function aR(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof x)return N7;else{let W=Y.tail;if(W instanceof x){let q=Y.head;if(s6(X.handlers,q)){let U=b9(X.handlers,q);return new u(E9(U,(z)=>{return new D7(z.prevent_default,z.stop_propagation,f0(K)(z.message))}))}else return N7}else{let q=Y.head,G=W;if(s6(X.children,q)){let z=b9(X.children,q),I=rR(K,z.mapper);Z=z.events,J=G,Q=I}else return N7}}}}function qY(Z,J,Q,X){let Y=eG(J+eX+Q),K=aR(Z.events,Y,f0);if(K instanceof u){let W=K[0],q=n6(X,W);if(q instanceof u){let G=q[0];return new YY(J,G)}else return new QY(J)}else return new QY(J)}function GY(Z,J){let Q=_(J.path,Z.next_dispatched_paths),X=new M8(Z.events,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Q);if(J instanceof YY){let Y=J.handler;return[X,new u(Y)]}else return[X,N7]}function FU(Z,J,Q,X){let Y=qY(Z,J,Q,X);return((K)=>{return GY(Z,K)})(Y)}function rZ(Z,J){return tG(J,Z.dispatched_paths)}class NU extends P{constructor(Z){super();this.message=Z}}var RU=(Z)=>Z instanceof NU;class DU extends P{constructor(Z){super();this.callback=Z}}var MU=(Z)=>Z instanceof DU;class AU extends P{constructor(Z){super();this.callback=Z}}var BU=(Z)=>Z instanceof AU;class oZ extends P{constructor(Z){super();this.message=Z}}var LU=(Z)=>new oZ(Z),i4=(Z)=>Z instanceof oZ;class UY extends P{constructor(Z,J){super();this.name=Z,this.data=J}}var PU=(Z,J)=>new UY(Z,J),r4=(Z)=>Z instanceof UY;class zY extends P{constructor(Z,J){super();this.key=Z,this.value=J}}var TU=(Z,J)=>new zY(Z,J),SU=(Z)=>Z instanceof zY;class IY extends P{constructor(Z,J){super();this.key=Z,this.decoder=J}}var EU=(Z,J)=>new IY(Z,J),CU=(Z)=>Z instanceof IY;class VY extends P{constructor(Z){super();this.key=Z}}var _U=(Z)=>new VY(Z),kU=(Z)=>Z instanceof VY;class jY extends P{}var oR=new jY;var a4=(Z)=>Z instanceof jY;class HY extends P{constructor(Z,J,Q,X,Y){super();this.name=Z,this.init=J,this.update=Q,this.view=X,this.config=Y}}class OY extends P{constructor(Z,J,Q,X,Y,K,W,q,G,U,z,I,V,H){super();this.open_shadow_root=Z,this.adopt_styles=J,this.delegates_focus=Q,this.attributes=X,this.properties=Y,this.contexts=K,this.is_form_associated=W,this.on_form_autofill=q,this.on_form_reset=G,this.on_form_restore=U,this.on_form_disabled=z,this.on_connect=I,this.on_adopt=V,this.on_disconnect=H}}var wU=new OY(!0,!0,!1,U1,U1,U1,!1,z1,z1,z1,z1,z1,z1,z1);var T6=(Z,J)=>{if(Z===J)return!0;if(Z==null||J==null)return!1;let Q=typeof Z;if(Q!==typeof J)return!1;if(Q!=="object")return!1;if(Z.constructor!==J.constructor)return!1;if(Array.isArray(Z))return tR(Z,J);return eR(Z,J)},tR=(Z,J)=>{let Q=Z.length;if(Q!==J.length)return!1;while(Q--)if(!T6(Z[Q],J[Q]))return!1;return!0},eR=(Z,J)=>{let Q=Object.keys(Z),X=Q.length;if(Object.keys(J).length!==X)return!1;while(X--){let Y=Q[X];if(!Object.hasOwn(J,Y))return!1;if(!T6(Z[Y],J[Y]))return!1}return!0};class yU extends P{constructor(Z,J){super();this.patch=Z,this.cache=J}}class NY extends P{constructor(Z,J,Q){super();this.patch=Z,this.cache=J,this.events=Q}}class $U extends P{constructor(Z,J,Q){super();this.added=Z,this.removed=J,this.events=Q}}function bU(Z,J,Q,X,Y,K,W){while(!0){let q=Z,G=J,U=Q,z=X,I=Y,V=K,H=W;if(z instanceof x)if(I instanceof x)return new $U(V,H,U);else{let F=I.head;if(F instanceof E0){let N=F,R=I.tail,T=F.name,S=F.handler,C=S7(U,G,T,S),k=_(N,V);Z=q,J=G,Q=C,X=z,Y=R,K=k,W=H}else{let N=F,R=I.tail,T=_(N,V);Z=q,J=G,Q=U,X=z,Y=R,K=T,W=H}}else if(I instanceof x){let F=z.head;if(F instanceof E0){let N=F,R=z.tail,T=F.name,S=sZ(U,G,T),C=_(N,H);Z=q,J=G,Q=S,X=R,Y=I,K=V,W=C}else{let N=F,R=z.tail,T=_(N,H);Z=q,J=G,Q=U,X=R,Y=I,K=V,W=T}}else{let{head:F,tail:N}=z,R=I.head,T=I.tail,S=CZ(F,R);if(S instanceof n0)if(F instanceof E0){let C=F.name;Z=q,J=G,Q=sZ(U,G,C),X=N,Y=I,K=V,W=_(F,H)}else Z=q,J=G,Q=U,X=N,Y=I,K=V,W=_(F,H);else if(S instanceof P0)if(F instanceof A6)if(R instanceof A6){let C,k=R.name;if(k==="value")C=q||F.value!==R.value;else if(k==="checked")C=q||F.value!==R.value;else if(k==="selected")C=q||F.value!==R.value;else C=F.value!==R.value;let A=C,L;if(A)L=_(R,V);else L=V;let B=L;Z=q,J=G,Q=U,X=N,Y=T,K=B,W=H}else if(R instanceof E0){let{name:C,handler:k}=R;Z=q,J=G,Q=S7(U,G,C,k),X=N,Y=T,K=_(R,V),W=_(F,H)}else Z=q,J=G,Q=U,X=N,Y=T,K=_(R,V),W=_(F,H);else if(F instanceof R7)if(R instanceof R7){let C,k=R.name;if(k==="scrollLeft")C=!0;else if(k==="scrollRight")C=!0;else if(k==="value")C=q||!T6(F.value,R.value);else if(k==="checked")C=q||!T6(F.value,R.value);else if(k==="selected")C=q||!T6(F.value,R.value);else C=!T6(F.value,R.value);let A=C,L;if(A)L=_(R,V);else L=V;let B=L;Z=q,J=G,Q=U,X=N,Y=T,K=B,W=H}else if(R instanceof E0){let{name:C,handler:k}=R;Z=q,J=G,Q=S7(U,G,C,k),X=N,Y=T,K=_(R,V),W=_(F,H)}else Z=q,J=G,Q=U,X=N,Y=T,K=_(R,V),W=_(F,H);else if(R instanceof E0){let{name:C,handler:k}=R,A=F.prevent_default.kind!==R.prevent_default.kind||F.stop_propagation.kind!==R.stop_propagation.kind||F.debounce!==R.debounce||F.throttle!==R.throttle,L;if(A)L=_(R,V);else L=V;let B=L;Z=q,J=G,Q=S7(U,G,C,k),X=N,Y=T,K=B,W=H}else{let C=F.name;Z=q,J=G,Q=sZ(U,G,C),X=N,Y=T,K=_(R,V),W=_(F,H)}else if(R instanceof E0){let{name:C,handler:k}=R;Z=q,J=G,Q=S7(U,G,C,k),X=z,Y=T,K=_(R,V),W=H}else Z=q,J=G,Q=U,X=z,Y=T,K=_(R,V),W=H}}}function ZD(Z,J,Q,X){if(Q==="input"&&J==="")return rZ(Z,X);else if(Q==="select"&&J==="")return rZ(Z,X);else if(Q==="textarea"&&J==="")return rZ(Z,X);else return!1}function tZ(Z,J,Q,X,Y,K,W,q,G,U,z,I,V,H){while(!0){let F=Z,N=J,R=Q,T=X,S=Y,C=K,k=W,A=q,L=G,B=U,E=z,D=I,l=V,f=H;if(F instanceof x)if(R instanceof x){let c,q1=f9();if(B instanceof x)if(E instanceof x)c=n8(L,k,B,E);else if(!q1)if(E.tail instanceof x&&k===0){let W1=E.head;c=SG(W1,L)}else c=n8(L,k,B,E);else c=n8(L,k,B,E);else c=n8(L,k,B,E);return new NY(c,l,f)}else{let c=WY(l,f,D,A,R),q1=c[0],e=c[1],Z1=iX(R,A-C),W1=_(Z1,B),G1=n8(L,k,W1,E);return new NY(G1,q1,e)}else if(R instanceof x){let{head:c,tail:q1}=F;if(c.key===""||!s6(S,c.key)){let Z1=iZ(l,f,D,A,c);Z=q1,J=N,Q=R,X=T,Y=S,K=C,W=k+1,q=A,G=L,U=B,z=E,I=D,V=l,H=Z1}else Z=q1,J=N,Q=R,X=T,Y=S,K=C,W=k,q=A,G=L,U=B,z=E,I=D,V=l,H=f}else{let c=F.head,q1=R.head;if(c.key!==q1.key){let e=F.tail,Z1=R.tail,W1=s6(N,q1.key);if(s6(T,c.key))if(W1)if(s6(S,c.key))Z=e,J=N,Q=R,X=T,Y=S,K=C-1,W=k,q=A,G=L,U=B,z=E,I=D,V=l,H=f;else{let t=b9(N,q1.key),g=A-C,y=_(PG(q1.key,g),B),d=Q6(S,q1.key,void 0);Z=_(t,F),J=N,Q=R,X=T,Y=d,K=C+1,W=k,q=A,G=L,U=y,z=E,I=D,V=l,H=f}else{let J1=A-C,t=lZ(l,f,D,A,q1),g=t[0],y=t[1],d=iX(S0(q1),J1),Q1=_(d,B);Z=F,J=N,Q=Z1,X=T,Y=S,K=C+1,W=k,q=A+1,G=L,U=Q1,z=E,I=D,V=g,H=y}else if(W1){let J1=A-C,t=_(TG(J1),B),g=iZ(l,f,D,A,c);Z=e,J=N,Q=R,X=T,Y=S,K=C-1,W=k,q=A,G=L,U=t,z=E,I=D,V=l,H=g}else{let J1=D8(A-C,q1),t=A8(l,f,D,A,c,q1),g=t[0],y=t[1];Z=e,J=N,Q=Z1,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(J1,B),z=E,I=D,V=g,H=y}}else{let e=F.head;if(e instanceof L6){let Z1=R.head;if(Z1 instanceof L6){let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=tZ(W1.children,W1.keyed_children,J1.children,J1.keyed_children,n1(),0,0,0,A,U1,U1,u0(D,A,J1.key),l,f),y=g.patch,d=g.cache,Q1=g.events,u1;if(y.changes instanceof x)if(y.children instanceof x)if(y.removed===0)u1=E;else u1=_(y,E);else u1=_(y,E);else u1=_(y,E);let S1=u1;Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=S1,I=D,V=d,H=Q1}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}else if(e instanceof P6){let Z1=R.head;if(Z1 instanceof P6){let W1=e,G1=Z1;if(W1.namespace===G1.namespace&&W1.tag===G1.tag){let J1=F.tail,t=R.tail,g=u0(D,A,G1.key),y=ZD(l,G1.namespace,G1.tag,g),d=bU(y,g,f,W1.attributes,G1.attributes,U1,U1),Q1=d.added,u1=d.removed,V1=d.events,S1;if(Q1 instanceof x&&u1 instanceof x)S1=U1;else S1=S0(sX(Q1,u1));let K0=S1,K8=tZ(W1.children,W1.keyed_children,G1.children,G1.keyed_children,n1(),0,0,0,A,K0,U1,g,l,V1),q0=K8.patch,$0=K8.cache,H6=K8.events,p6;if(q0.changes instanceof x)if(q0.children instanceof x)if(q0.removed===0)p6=E;else p6=_(q0,E);else p6=_(q0,E);else p6=_(q0,E);let JZ=p6;Z=J1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=JZ,I=D,V=$0,H=H6}else{let J1=e,t=F.tail,g=Z1,y=R.tail,d=D8(A-C,g),Q1=A8(l,f,D,A,J1,g),u1=Q1[0],V1=Q1[1];Z=t,J=N,Q=y,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(d,B),z=E,I=D,V=u1,H=V1}}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}else if(e instanceof i6){let Z1=R.head;if(Z1 instanceof i6){let W1=e,G1=Z1;if(W1.content===G1.content){let J1=F.tail,t=R.tail;Z=J1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=E,I=D,V=l,H=f}else{let J1=F.tail,t=Z1,g=R.tail,y=n8(A,0,S0(BG(t.content)),U1);Z=J1,J=N,Q=g,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=_(y,E),I=D,V=l,H=f}}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}else if(e instanceof r6){let Z1=R.head;if(Z1 instanceof r6){let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=u0(D,A,J1.key),y=bU(!1,g,f,W1.attributes,J1.attributes,U1,U1),d=y.added,Q1=y.removed,u1=y.events,V1;if(d instanceof x&&Q1 instanceof x)V1=U1;else V1=S0(sX(d,Q1));let S1=V1,K0;if(W1.inner_html===J1.inner_html)K0=S1;else K0=_(LG(J1.inner_html),S1);let q0=K0,$0;if(q0 instanceof x)$0=E;else $0=_(n8(A,0,q0,U1),E);let H6=$0;Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=H6,I=D,V=l,H=u1}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}else if(e instanceof s0){let Z1=R.head;if(Z1 instanceof s0){let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=u0(D,A,J1.key),y=s4(g),d=tZ(S0(W1.child),n1(),S0(J1.child),n1(),n1(),0,0,0,A,U1,U1,cZ(g),l,jU(f,y,W1.mapper)),Q1=d.patch,u1=d.cache,V1=d.events,S1=HU(f,y,J1.mapper,V1),K0;if(Q1.changes instanceof x)if(Q1.children instanceof x)if(Q1.removed===0)K0=E;else K0=_(Q1,E);else K0=_(Q1,E);else K0=_(Q1,E);let q0=K0;Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=q0,I=D,V=u1,H=S1}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}else{let Z1=R.head;if(Z1 instanceof y9){let W1=e,G1=F.tail,J1=Z1,t=R.tail;if(ZG(W1.dependencies,J1.dependencies)){let y=IU(l,W1.view,J1.view);Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=B,z=E,I=D,V=y,H=f}else{let y=zU(l,W1.view,W1.view),d=J1.view(),Q1=VU(l,J1.view,d);Z=_(y,G1),J=N,Q=_(d,t),X=T,Y=S,K=C,W=k,q=A,G=L,U=B,z=E,I=D,V=Q1,H=f}}else{let W1=e,G1=F.tail,J1=Z1,t=R.tail,g=D8(A-C,J1),y=A8(l,f,D,A,W1,J1),d=y[0],Q1=y[1];Z=G1,J=N,Q=t,X=T,Y=S,K=C,W=k,q=A+1,G=L,U=_(g,B),z=E,I=D,V=d,H=Q1}}}}}}function o4(Z,J,Q){let X=qU(Z),Y=tZ(S0(J),n1(),S0(Q),n1(),n1(),0,0,0,0,U1,U1,pZ,X,GU(X)),K=Y.patch,W=Y.cache,q=Y.events;return new yU(K,UU(W,q))}var hU=(Z)=>Z.reduceRight((J,Q)=>W7(Q,J),U1),X6=(Z,J)=>{if(Array.isArray(Z))for(let Q=0;Q<Z.length;Q++)J(Z[Q]);else if(Z)for(Z;c6(Z);Z=c6(Z))J(q7(Z))},RY=(Z,J)=>{if(!c6(Z))return J;else if(!c6(J))return Z;else return G0(Z,J)};var eZ="http://www.w3.org/1999/xhtml",fU=1,gU=3,DY=8;var uU=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:QD,clearTimeout:MY}=globalThis,XD=(Z,J)=>globalThis.document.createElementNS(Z,J),vU=(Z)=>globalThis.document.createTextNode(Z),mU=(Z)=>globalThis.document.createComment(Z),YD=()=>globalThis.document.createDocumentFragment(),s8=(Z,J,Q)=>Z.insertBefore(J,Q),pU=uU?(Z,J,Q)=>Z.moveBefore(J,Q):s8,cU=(Z,J)=>Z.removeChild(J),KD=(Z,J)=>Z.getAttribute(J),dU=(Z,J,Q)=>Z.setAttribute(J,Q),WD=(Z,J)=>Z.removeAttribute(J),qD=(Z,J,Q,X)=>Z.addEventListener(J,Q,X),nU=(Z,J,Q)=>Z.removeEventListener(J,Q),GD=(Z,J)=>Z.innerHTML=J,UD=(Z,J)=>Z.data=J,Y6=Symbol("lustre");class iU{constructor(Z,J,Q,X){this.kind=Z,this.key=X,this.parent=J,this.children=[],this.node=Q,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===$9||this.kind===p8}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var K6=(Z,J,Q,X,Y)=>{let K=new iU(Z,J,Q,Y);return Q[Y6]=K,J?.children.splice(X,0,K),K},zD=(Z)=>{let J="";for(let Q=Z[Y6];Q.parent;Q=Q.parent){let X=Q.parent&&Q.parent.kind===p8?mZ:vZ;if(Q.key)J=`${X}${Q.key}${J}`;else{let Y=Q.parent.children.indexOf(Q);J=`${X}${Y}${J}`}}return J.slice(1)};class BY{#Z=null;#W;#X;#J=!1;constructor(Z,J,Q,{debug:X=!1}={}){this.#Z=Z,this.#W=J,this.#X=Q,this.#J=X}mount(Z){K6(c8,null,this.#Z,0,null),this.#F(this.#Z,null,this.#Z[Y6],0,Z)}push(Z,J=null){this.#Q=J,this.#Y.push({node:this.#Z[Y6],patch:Z}),this.#q()}#Q;#Y=[];#q(){let Z=this.#Y;while(Z.length){let{node:J,patch:Q}=Z.pop(),{path:X,changes:Y,removed:K,children:W}=Q;X6(X,(G)=>{J=J.children[G]});let{children:q}=J;if(X6(Y,(G)=>this.#K(J,G)),K)this.#j(J,q.length-K,K);X6(W,(G)=>{let U=q[G.index|0];this.#Y.push({node:U,patch:G})})}}#K(Z,J){switch(J.kind){case vX:this.#T(Z,J);break;case mX:this.#A(Z,J);break;case pX:this.#O(Z,J);break;case cX:this.#I(Z,J);break;case dX:this.#R(Z,J);break;case nX:this.#G(Z,J);break;case lX:this.#V(Z,J);break}}#V(Z,{children:J,before:Q}){let X=YD(),Y=this.#z(Z,Q);this.#M(X,null,Z,Q|0,J),s8(Z.parentNode,X,Y)}#G(Z,{index:J,with:Q}){this.#j(Z,J|0,1);let X=this.#z(Z,J);this.#F(Z.parentNode,X,Z,J|0,Q)}#z(Z,J){J=J|0;let{children:Q}=Z,X=Q.length;if(J<X)return Q[J].node;if(Z.endNode)return Z.endNode;if(!Z.isVirtual)return null;while(Z.isVirtual&&Z.children.length){if(Z.endNode)return Z.endNode.nextSibling;Z=Z.children[Z.children.length-1]}return Z.node.nextSibling}#I(Z,{key:J,before:Q}){Q=Q|0;let{children:X,parentNode:Y}=Z,K=X[Q].node,W=X[Q];for(let q=Q+1;q<X.length;++q){let G=X[q];if(X[q]=W,W=G,G.key===J){X[Q]=G;break}}this.#N(Y,W,K)}#U(Z,J,Q){for(let X=0;X<J.length;++X)this.#N(Z,J[X],Q)}#N(Z,J,Q){if(pU(Z,J.node,Q),J.isVirtual)this.#U(Z,J.children,Q);if(J.endNode)pU(Z,J.endNode,Q)}#R(Z,{index:J}){this.#j(Z,J,1)}#j(Z,J,Q){let{children:X,parentNode:Y}=Z,K=X.splice(J,Q);for(let W=0;W<K.length;++W){let q=K[W],{node:G,endNode:U,isVirtual:z,children:I}=q;if(cU(Y,G),U)cU(Y,U);if(this.#H(q),z)K.push(...I)}}#H(Z){let{debouncers:J,children:Q}=Z;for(let{timeout:X}of J.values())if(X)MY(X);J.clear(),X6(Q,(X)=>this.#H(X))}#O({node:Z,handlers:J,throttles:Q,debouncers:X},{added:Y,removed:K}){X6(K,({name:W})=>{if(J.delete(W))nU(Z,W,AY),this.#D(Q,W,0),this.#D(X,W,0);else WD(Z,W),sU[W]?.removed?.(Z,W)}),X6(Y,(W)=>this.#P(Z,W))}#T({node:Z},{content:J}){UD(Z,J??"")}#A({node:Z},{inner_html:J}){GD(Z,J??"")}#M(Z,J,Q,X,Y){X6(Y,(K)=>this.#F(Z,J,Q,X++,K))}#F(Z,J,Q,X,Y){switch(Y.kind){case c8:{let K=this.#B(Q,X,Y);this.#M(K,null,K[Y6],0,Y.children),s8(Z,K,J);break}case B7:{let K=this.#S(Q,X,Y);s8(Z,K,J);break}case $9:{let W=this.#L("lustre:fragment",Q,X,Y);if(s8(Z,W,J),this.#M(Z,J,W[Y6],0,Y.children),this.#J)W[Y6].endNode=mU(" /lustre:fragment "),s8(Z,W[Y6].endNode,J);break}case JG:{let K=this.#B(Q,X,Y);this.#A({node:K},Y),s8(Z,K,J);break}case p8:{let K=this.#L("lustre:map",Q,X,Y);s8(Z,K,J),this.#F(Z,J,K[Y6],0,Y.child);break}case yX:{let K=this.#Q?.get(Y.view)??Y.view();this.#F(Z,J,Q,X,K);break}}}#B(Z,J,{kind:Q,key:X,tag:Y,namespace:K,attributes:W}){let q=XD(K||eZ,Y);if(K6(Q,Z,q,J,X),this.#J&&X)dU(q,"data-lustre-key",X);return X6(W,(G)=>this.#P(q,G)),q}#S(Z,J,{kind:Q,key:X,content:Y}){let K=vU(Y??"");return K6(Q,Z,K,J,X),K}#L(Z,J,Q,{kind:X,key:Y}){let K=this.#J?mU(ID(Z,Y)):vU("");return K6(X,J,K,Q,Y),K}#P(Z,J){let{debouncers:Q,handlers:X,throttles:Y}=Z[Y6],{kind:K,name:W,value:q,prevent_default:G,debounce:U,throttle:z}=J;switch(K){case LX:{let I=q??"";if(W==="virtual:defaultValue"){Z.defaultValue=I;return}else if(W==="virtual:defaultChecked"){Z.defaultChecked=!0;return}else if(W==="virtual:defaultSelected"){Z.defaultSelected=!0;return}if(I!==KD(Z,W))dU(Z,W,I);sU[W]?.added?.(Z,I);break}case PX:Z[W]=q;break;case TX:{if(X.has(W))nU(Z,W,AY);let I=G.kind===SX;qD(Z,W,AY,{passive:I}),this.#D(Y,W,z),this.#D(Q,W,U),X.set(W,(V)=>this.#E(J,V));break}}}#D(Z,J,Q){let X=Z.get(J);if(Q>0)if(X)X.delay=Q;else Z.set(J,{delay:Q});else if(X){let{timeout:Y}=X;if(Y)MY(Y);Z.delete(J)}}#E(Z,J){let{currentTarget:Q,type:X}=J,{debouncers:Y,throttles:K}=Q[Y6],W=zD(Q),{prevent_default:q,stop_propagation:G,include:U}=Z;if(q.kind===_X)J.preventDefault();if(G.kind===_X)J.stopPropagation();if(X==="submit")J.detail??={},J.detail.formData=[...new FormData(J.target,J.submitter).entries()];let z=this.#W(J,W,X,U),I=K.get(X);if(I){let H=Date.now(),F=I.last||0;if(H>F+I.delay)I.last=H,I.lastEvent=J,this.#X(J,z)}let V=Y.get(X);if(V)MY(V.timeout),V.timeout=QD(()=>{if(J===K.get(X)?.lastEvent)return;this.#X(J,z)},V.delay);if(!I&&!V)this.#X(J,z)}}var ID=(Z,J)=>{if(J)return` ${Z} key="${u4(J)}" `;else return` ${Z} `},AY=(Z)=>{let{currentTarget:J,type:Q}=Z;J[Y6].handlers.get(Q)(Z)},lU=(Z)=>{return{added(J){J[Z]=!0},removed(J){J[Z]=!1}}},VD=(Z)=>{return{added(J,Q){J[Z]=Q}}},sU={checked:lU("checked"),selected:lU("selected"),value:VD("value"),autofocus:{added(Z){queueMicrotask(()=>{Z.focus?.()})}},autoplay:{added(Z){try{Z.play?.()}catch(J){console.error(J)}}}};function jD(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return[Y,E1(K)];else{let W=X.tail,q=X.head[0],G=X.head[1],U=yZ(q,G),z;if(q==="")z=Y;else z=Q6(Y,q,U);let I=z,V=_(U,K);Z=W,J=I,Q=V}}}function LY(Z){return jD(Z,n1(),U1)}function PY(Z,J,Q){let X=LY(Q),Y=X[0],K=X[1];return c4("","",Z,J,K,Y,!1,d4(Z,""))}function rU(Z,J,Q,X){let Y=LY(X),K=Y[0],W=Y[1];return c4("",Z,J,Q,W,K,!1,d4(J,Z))}function TY(Z){let J=LY(Z),Q=J[0],X=J[1];return $X("",X,Q)}function i8(Z,J){return PY("div",Z,J)}var oU=(Z)=>{let J=K6(c8,null,Z,0,null),{children:Q}=SY(J,Z,Z.firstChild);if(Q.length>1){let Y=K6(c8,null,Z,0,null);return J.kind=$9,J.node=globalThis.document.createTextNode(""),J.parent=Y,Y.children.push(J),Z.insertBefore(J.node,Z.firstChild),TY(E7(Q))}if(Q.length===1)return Q[0][1];let X=globalThis.document.createTextNode("");return K6(B7,J,X,0,null),Z.insertBefore(X,Z.firstChild),h9()},tU=(Z,J,Q,X)=>{if(Q.nodeType===DY){let Y=Q.data.trim();if(Y.startsWith("lustre:fragment"))return FD(Z,J,Q,X);if(Y.startsWith("lustre:map"))return ND(Z,J,Q,X);if(Y.startsWith("lustre:memo"))return RD(Z,J,Q,X);return null}if(Q.nodeType===fU)return HD(Z,Q,X);if(Q.nodeType===gU)return OD(Z,Q,X);return null},HD=(Z,J,Q)=>{let X=J.getAttribute("data-lustre-key")??"";if(X)J.removeAttribute("data-lustre-key");let Y=K6(c8,Z,J,Q,X),K=J.localName,W=J.namespaceURI,q=!W||W===eZ;if(q&&MD.includes(K))AD(K,J);let G=DD(J),{children:U}=SY(Y,J,J.firstChild),z=q?PY(K,G,E7(U)):rU(W,K,G,E7(U));return t4(X,z,J.nextSibling)},SY=(Z,J,Q)=>{let X=[];while(Q&&(Q.nodeType!==DY||Q.data.trim()!=="/lustre:fragment")){let Y=tU(Z,J,Q,X.length);if(Y)X.push([Y.key,Y.vnode]),Q=Y.next;else Q=Q.nextSibling}return{children:X,end:Q}},OD=(Z,J,Q)=>{return K6(B7,Z,J,Q,null),t4("",$Z(J.data),J.nextSibling)},FD=(Z,J,Q,X)=>{let Y=EY(Q.data),K=K6($9,Z,Q,X,Y),{children:W,end:q}=SY(K,J,Q.nextSibling);K.endNode=q;let G=TY(E7(W));return t4(Y,G,q?.nextSibling)},ND=(Z,J,Q,X)=>{let Y=EY(Q.data),K=K6(p8,Z,Q,X,Y),W=eU(K,J,Q,0);if(!W)return null;let q=IG(W.vnode,(G)=>G);return t4(Y,q,W.next)},RD=(Z,J,Q,X)=>{let Y=EY(Q.data),K=eU(Z,J,Q,X);if(!K)return null;J.removeChild(Q);let W=UG(E7([zG({})]),()=>K.vnode);return t4(Y,W,K.next)},eU=(Z,J,Q,X)=>{while(!0){if(Q=Q.nextSibling,!Q)return null;let Y=tU(Z,J,Q,X);if(Y)return Y}},t4=(Z,J,Q)=>{return{key:Z,vnode:J,next:Q}},DD=(Z)=>{let J=[];for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];if(X.name!=="xmlns")J.push(s1(X.localName,X.value))}return E7(J)},MD=["input","select","textarea"],AD=(Z,J)=>{let{value:Q,checked:X}=J;if(Z==="input"&&J.type==="checkbox"&&!X)return;if(Z==="input"&&J.type==="radio"&&!X)return;if(J.type!=="checkbox"&&J.type!=="radio"&&!Q)return;queueMicrotask(()=>{if(J.value=Q,J.checked=X,J.dispatchEvent(new Event("input",{bubbles:!0})),J.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==J)J.dispatchEvent(new Event("blur",{bubbles:!0}))})},EY=(Z)=>{let J=Z.match(/key="([^"]*)"/);if(!J)return"";return BD(J[1])},BD=(Z)=>{return Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},E7=(Z)=>Z.reduceRight((J,Q)=>W7(Q,J),U1);var f9=()=>!!globalThis.document;class ZJ{constructor(Z,[J,Q],X,Y,K){this.root=Z,this.#Z=J,this.#W=X,this.#X=Y,this.root.addEventListener("context-request",(G)=>{if(!(G.context&&G.callback))return;if(!this.#q.has(G.context))return;G.stopImmediatePropagation();let U=this.#q.get(G.context);if(G.subscribe){let z=()=>{U.subscribers=U.subscribers.filter((I)=>I!==G.callback)};U.subscribers.push([G.callback,z]),G.callback(U.value,z)}else G.callback(U.value)});let W=(G,U,z)=>qY(this.#Q,U,z,G),q=(G,U)=>{let[z,I]=GY(this.#Q,U);if(this.#Q=z,N0(I)){let V=L0(I);if(V.stop_propagation)G.stopPropagation();if(V.prevent_default)G.preventDefault();this.dispatch(V.message,!1)}};this.#Y=new BY(this.root,W,q,K),this.#J=oU(this.root),this.#Q=KY(),this.#j(Q),this.#O()}root=null;dispatch(Z,J=!1){if(this.#V)this.#G.push(Z);else{let[Q,X]=this.#X(this.#Z,Z);this.#Z=Q,this.#R(J),this.#j(X)}}emit(Z,J){(this.root.host??this.root).dispatchEvent(new Jz(Z,J))}provide(Z,J){if(!this.#q.has(Z))this.#q.set(Z,{value:J,subscribers:[]});else{let Q=this.#q.get(Z);if(T6(Q.value,J))return;Q.value=J;for(let X=Q.subscribers.length-1;X>=0;X--){let[Y,K]=Q.subscribers[X];if(!Y){Q.subscribers.splice(X,1);continue}Y(J,K)}}}subscribe(Z,J){if(!Z)return;this.#K.get(Z)?.(),(this.root.host??this.root).dispatchEvent(new CY(Z,(X,Y)=>{let K=this.#K.get(Z);if(K!==Y)K?.();let W=n6(X,J);if(this.#K.set(Z,Y),N0(W))this.dispatch(L0(W),!0)},!0))}unsubscribe(Z){let J=this.#K.get(Z);if(J)J(),this.#K.delete(Z)}unsubscribeAll(){for(let[Z,J]of this.#K)J?.();this.#K.clear()}#Z;#W;#X;#J;#Q;#Y;#q=new Map;#K=new Map;#V=!1;#G=[];#z=U1;#I=U1;#U=null;#N={dispatch:(Z)=>this.dispatch(Z),emit:(Z,J)=>this.emit(Z,J),select:()=>{},root:()=>this.root,provide:(Z,J)=>this.provide(Z,J),subscribe:(Z,J)=>this.subscribe(Z,J),unsubscribe:(Z)=>this.unsubscribe(Z)};#R(Z=!1){if(this.#U)return;if(Z)this.#U="sync",queueMicrotask(()=>this.#O());else this.#U=window.requestAnimationFrame(()=>this.#O())}#j(Z){this.#V=!0;let J=!1;while(!0){if(X6(Z.synchronous,(X)=>X(this.#N)),this.#z=RY(this.#z,Z.before_paint),this.#I=RY(this.#I,Z.after_paint),!this.#G.length)break;let Q=this.#G.shift();[this.#Z,Z]=this.#X(this.#Z,Q),J=!0}return this.#V=!1,J}#H(Z){if(this.#j(Z))this.#R(!0)}#O(){this.#U=null;let Z=this.#W(this.#Z),{patch:J,cache:Q}=o4(this.#Q,this.#J,Z);if(this.#Q=Q,this.#J=Z,this.#Y.push(J,T7(Q)),G8(this.#z)){let X=Zz(this.#z);this.#z=U1,queueMicrotask(()=>this.#H(X))}if(G8(this.#I)){let X=Zz(this.#I);this.#I=U1,window.requestAnimationFrame(()=>this.#H(X))}}}function Zz(Z){return{synchronous:Z,after_paint:U1,before_paint:U1}}class CY extends Event{constructor(Z,J,Q){super("context-request",{bubbles:!0,composed:!0});this.context=Z,this.callback=J,this.subscribe=Q}}class Jz extends CustomEvent{isLustreEvent=!0;constructor(Z,J){super(Z,{detail:J,bubbles:!0,composed:!0})}}class Qz{#Z;constructor(Z,[J,Q],X,Y){this.#Z=new ZJ(Z,[J,Q],Y,X)}send(Z){if(i4(Z))this.dispatch(Z.message,!1);else if(r4(Z))this.emit(Z.name,Z.data);else if(a4(Z));}dispatch(Z){this.#Z.dispatch(Z)}emit(Z,J){this.#Z.emit(Z,J)}}var Xz=({init:Z,update:J,view:Q},X,Y)=>{if(!f9())return Q0(_Y());let K=X instanceof HTMLElement?X:globalThis.document.querySelector(X);if(!K)return Q0(Yz(X));return m1(new Qz(K,Z(Y),J,Q))};class TD{#Z;#W;#X;#J;#Q;#Y;#q=G7();#K=new Set;constructor(Z,J,Q,X,Y,K){let[W,q]=J(K);this.#Z=W,this.#W=Q,this.#X=X,this.#J=Y,this.#Q=this.#X(this.#Z),this.#Y=WU(this.#Q),this.#U(q)}send(Z){if(RU(Z)){let{message:J}=J,Q=this.#V(J),X=o4(this.#Y,this.#Q,Q);this.#Q=Q,this.#Y=X.cache,this.broadcast(rX(X.patch,T7(X.cache)))}else if(MU(Z)){let{callback:J}=Z;if(this.#K.add(J),J(dG(this.#J.open_shadow_root,this.#J.adopt_styles,L4(this.#J.attributes),L4(this.#J.properties),L4(this.#J.contexts),this.#q,this.#Q,T7(this.#Y))),UZ(this.#J.on_connect))this.#G(zZ(this.#J.on_connect))}else if(BU(Z)){let{callback:J}=Z;if(this.#K.delete(J),UZ(this.#J.on_disconnect))this.#G(zZ(this.#J.on_disconnect))}else if(i4(Z)){let{message:J}=J,[Q,X]=this.#W(this.#Z,J),Y=this.#X(Q),K=o4(this.#Y,this.#Q,Y);this.#U(X),this.#Z=Q,this.#Q=Y,this.#Y=K.cache,this.broadcast(rX(K.patch,T7(K.cache)))}else if(r4(Z)){let{name:J,data:Q}=Z;this.broadcast(nG(J,Q))}else if(SU(Z)){let{key:J,value:Q}=Z,X=z8(this.#q,J);if(N0(X)&&T6(L0(X),Q))return;this.#q=T9(this.#q,J,Q),this.broadcast(lG(J,Q))}else if(CU(Z)){let{key:J,decoder:Q}=Z;this.broadcast(sG(J)),this.#J.contexts=T9(this.#J.contexts,J,Q)}else if(kU(Z)){let{key:J}=Z;this.broadcast(iG(J)),this.#J.contexts=qX(this.#J.contexts,J)}else if(a4(Z))this.#Z=null,this.#W=null,this.#X=null,this.#J=null,this.#Q=null,this.#Y=null,this.#q=null,this.#K.clear()}broadcast(Z){for(let J of this.#K)J(Z)}#V(Z){if($G(Z)){let{messages:J}=Z,Q=this.#Z,X=j1();for(let Y=J;c6(Y);Y=c6(Y)){let K=this.#V(q7(Y));if(N0(K)){Q=L0(K)[0],X=m4(hU([X,L0(K)[1]]));break}}return this.#U(X),this.#Z=Q,this.#X(Q)}else if(fG(Z)){let{name:J,value:Q}=Z,X=this.#z(J,Q);if(!N0(X))return this.#Q;return this.#G(L0(X))}else if(uG(Z)){let{name:J,value:Q}=Z,X=this.#I(J,Q);if(!N0(X))return this.#Q;return this.#G(L0(X))}else if(mG(Z)){let{path:J,name:Q,event:X}=W,[Y,K]=FU(this.#Y,J,Q,X);if(this.#Y=Y,!N0(K))return this.#Q;let{message:W}=L0(K);return this.#G(W)}else if(cG(Z)){let{key:J,value:Q}=Z,X=z8(this.#J.contexts,J);if(!N0(X))return this.#Q;if(X=n6(Q,L0(X)),!N0(X))return this.#Q;return this.#G(L0(X))}}#G(Z){let[J,Q]=this.#W(this.#Z,Z);return this.#U(Q),this.#Z=J,this.#X(this.#Z)}#z(Z,J){let Q=z8(this.#J.attributes,Z);if(!N0(Q))return Q;return L0(Q)(J)}#I(Z,J){let Q=z8(this.#J.properties,Z);if(!N0(Q))return Q;return L0(Q)(J)}#U(Z){let J=(G)=>this.send(LU(G)),Q=(G,U)=>this.send(PU(G,U)),X=()=>{return},Y=()=>{return},K=(G,U)=>this.send(TU(G,U)),W=(G,U)=>this.send(EU(G,U)),q=(G)=>this.send(_U(G));globalThis.queueMicrotask(()=>{tq(Z,J,Q,X,Y,K,W,q)})}}class Kz extends P{constructor(Z){super();this.selector=Z}}var Yz=(Z)=>new Kz(Z);class Wz extends P{}var qz=new Wz,_Y=()=>qz;function Gz(Z,J,Q){return new HY(z1,Z,J,Q,wU)}function Uz(Z,J,Q){return Pq(!f9(),new P1(qz),()=>{return Xz(Z,J,Q)})}var zz=new Map;function kY(Z,J,Q){clearTimeout(zz.get(Z)),zz.set(Z,setTimeout(Q,J))}function xY(Z){return confirm(Z)}function wY(Z){alert(Z)}function bY(Z){return Z<=0?0:Math.floor(Math.random()*Z)}function e4(Z,J){return kX(Z,E9(J,(Q)=>{return new D7(!1,!1,Q)}),U1,EX,EX,0,0)}function Iz(Z,J){return kX(Z,J,U1,CX,CX,0,0)}function JJ(Z,J,Q){return new D7(J,Q,Z)}function i1(Z){return e4("click",b1(Z))}function Vz(Z){return e4("input",j7(j(["target","value"]),w1,(J)=>{return b1(Z(J))}))}function jz(Z){return e4("change",j7(j(["target","value"]),w1,(J)=>{return b1(Z(J))}))}var $Y=[],Nz=[];(()=>{let Z="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((J)=>J?parseInt(J,36):1);for(let J=0,Q=0;J<Z.length;J++)(J%2?Nz:$Y).push(Q=Q+Z[J])})();function _D(Z){if(Z<768)return!1;for(let J=0,Q=$Y.length;;){let X=J+Q>>1;if(Z<$Y[X])Q=X;else if(Z>=Nz[X])J=X+1;else return!0;if(J==Q)return!1}}function Hz(Z){return Z>=127462&&Z<=127487}var Oz=8205;function Rz(Z,J,Q=!0,X=!0){return(Q?Dz:kD)(Z,J,X)}function Dz(Z,J,Q){if(J==Z.length)return J;if(J&&Mz(Z.charCodeAt(J))&&Az(Z.charCodeAt(J-1)))J--;let X=yY(Z,J);J+=Fz(X);while(J<Z.length){let Y=yY(Z,J);if(X==Oz||Y==Oz||Q&&_D(Y))J+=Fz(Y),X=Y;else if(Hz(Y)){let K=0,W=J-2;while(W>=0&&Hz(yY(Z,W)))K++,W-=2;if(K%2==0)break;else J+=2}else break}return J}function kD(Z,J,Q){while(J>1){let X=Dz(Z,J-2,Q);if(X<J)return X;J--}return 0}function yY(Z,J){let Q=Z.charCodeAt(J);if(!Az(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!Mz(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function Mz(Z){return Z>=56320&&Z<57344}function Az(Z){return Z>=55296&&Z<56320}function Fz(Z){return Z<65536?1:2}class R1{lineAt(Z){if(Z<0||Z>this.length)throw RangeError(`Invalid position ${Z} in document of length ${this.length}`);return this.lineInner(Z,!1,1,0)}line(Z){if(Z<1||Z>this.lines)throw RangeError(`Invalid line number ${Z} in ${this.lines}-line document`);return this.lineInner(Z,!0,1,0)}replace(Z,J,Q){[Z,J]=x7(this,Z,J);let X=[];if(this.decompose(0,Z,X,2),Q.length)Q.decompose(0,Q.length,X,3);return this.decompose(J,this.length,X,1),a6.from(X,this.length-(J-Z)+Q.length)}append(Z){return this.replace(this.length,this.length,Z)}slice(Z,J=this.length){[Z,J]=x7(this,Z,J);let Q=[];return this.decompose(Z,J,Q,0),a6.from(Q,J-Z)}eq(Z){if(Z==this)return!0;if(Z.length!=this.length||Z.lines!=this.lines)return!1;let J=this.scanIdentical(Z,1),Q=this.length-this.scanIdentical(Z,-1),X=new _7(this),Y=new _7(Z);for(let K=J,W=J;;){if(X.next(K),Y.next(K),K=0,X.lineBreak!=Y.lineBreak||X.done!=Y.done||X.value!=Y.value)return!1;if(W+=X.value.length,X.done||W>=Q)return!0}}iter(Z=1){return new _7(this,Z)}iterRange(Z,J=this.length){return new lY(this,Z,J)}iterLines(Z,J){let Q;if(Z==null)Q=this.iter();else{if(J==null)J=this.lines+1;let X=this.line(Z).from;Q=this.iterRange(X,Math.max(X,J==this.lines+1?this.length:J<=1?0:this.line(J-1).to))}return new sY(Q)}toString(){return this.sliceString(0)}toJSON(){let Z=[];return this.flatten(Z),Z}constructor(){}static of(Z){if(Z.length==0)throw RangeError("A document must have at least one line");if(Z.length==1&&!Z[0])return R1.empty;return Z.length<=32?new r1(Z):a6.from(r1.split(Z,[]))}}class r1 extends R1{constructor(Z,J=xD(Z)){super();this.text=Z,this.length=J}get lines(){return this.text.length}get children(){return null}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.text[Y],W=X+K.length;if((J?Q:W)>=Z)return new Ez(X,W,Q,K);X=W+1,Q++}}decompose(Z,J,Q,X){let Y=Z<=0&&J>=this.length?this:new r1(Bz(this.text,Z,J),Math.min(J,this.length)-Math.max(0,Z));if(X&1){let K=Q.pop(),W=WJ(Y.text,K.text.slice(),0,Y.length);if(W.length<=32)Q.push(new r1(W,K.length+Y.length));else{let q=W.length>>1;Q.push(new r1(W.slice(0,q)),new r1(W.slice(q)))}}else Q.push(Y)}replace(Z,J,Q){if(!(Q instanceof r1))return super.replace(Z,J,Q);[Z,J]=x7(this,Z,J);let X=WJ(this.text,WJ(Q.text,Bz(this.text,0,Z)),J),Y=this.length+Q.length-(J-Z);if(X.length<=32)return new r1(X,Y);return a6.from(r1.split(X,[]),Y)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=x7(this,Z,J);let X="";for(let Y=0,K=0;Y<=J&&K<this.text.length;K++){let W=this.text[K],q=Y+W.length;if(Y>Z&&K)X+=Q;if(Z<q&&J>Y)X+=W.slice(Math.max(0,Z-Y),J-Y);Y=q+1}return X}flatten(Z){for(let J of this.text)Z.push(J)}scanIdentical(){return 0}static split(Z,J){let Q=[],X=-1;for(let Y of Z)if(Q.push(Y),X+=Y.length+1,Q.length==32)J.push(new r1(Q,X)),Q=[],X=-1;if(X>-1)J.push(new r1(Q,X));return J}}class a6 extends R1{constructor(Z,J){super();this.children=Z,this.length=J,this.lines=0;for(let Q of Z)this.lines+=Q.lines}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.children[Y],W=X+K.length,q=Q+K.lines-1;if((J?q:W)>=Z)return K.lineInner(Z,J,Q,X);X=W+1,Q=q+1}}decompose(Z,J,Q,X){for(let Y=0,K=0;K<=J&&Y<this.children.length;Y++){let W=this.children[Y],q=K+W.length;if(Z<=q&&J>=K){let G=X&((K<=Z?1:0)|(q>=J?2:0));if(K>=Z&&q<=J&&!G)Q.push(W);else W.decompose(Z-K,J-K,Q,G)}K=q+1}}replace(Z,J,Q){if([Z,J]=x7(this,Z,J),Q.lines<this.lines)for(let X=0,Y=0;X<this.children.length;X++){let K=this.children[X],W=Y+K.length;if(Z>=Y&&J<=W){let q=K.replace(Z-Y,J-Y,Q),G=this.lines-K.lines+q.lines;if(q.lines<G>>4&&q.lines>G>>6){let U=this.children.slice();return U[X]=q,new a6(U,this.length-(J-Z)+Q.length)}return super.replace(Y,W,q)}Y=W+1}return super.replace(Z,J,Q)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=x7(this,Z,J);let X="";for(let Y=0,K=0;Y<this.children.length&&K<=J;Y++){let W=this.children[Y],q=K+W.length;if(K>Z&&Y)X+=Q;if(Z<q&&J>K)X+=W.sliceString(Z-K,J-K,Q);K=q+1}return X}flatten(Z){for(let J of this.children)J.flatten(Z)}scanIdentical(Z,J){if(!(Z instanceof a6))return 0;let Q=0,[X,Y,K,W]=J>0?[0,0,this.children.length,Z.children.length]:[this.children.length-1,Z.children.length-1,-1,-1];for(;;X+=J,Y+=J){if(X==K||Y==W)return Q;let q=this.children[X],G=Z.children[Y];if(q!=G)return Q+q.scanIdentical(G,J);Q+=q.length+1}}static from(Z,J=Z.reduce((Q,X)=>Q+X.length+1,-1)){let Q=0;for(let V of Z)Q+=V.lines;if(Q<32){let V=[];for(let H of Z)H.flatten(V);return new r1(V,J)}let X=Math.max(32,Q>>5),Y=X<<1,K=X>>1,W=[],q=0,G=-1,U=[];function z(V){let H;if(V.lines>Y&&V instanceof a6)for(let F of V.children)z(F);else if(V.lines>K&&(q>K||!q))I(),W.push(V);else if(V instanceof r1&&q&&(H=U[U.length-1])instanceof r1&&V.lines+H.lines<=32)q+=V.lines,G+=V.length+1,U[U.length-1]=new r1(H.text.concat(V.text),H.length+1+V.length);else{if(q+V.lines>X)I();q+=V.lines,G+=V.length+1,U.push(V)}}function I(){if(q==0)return;W.push(U.length==1?U[0]:a6.from(U,G)),G=-1,q=U.length=0}for(let V of Z)z(V);return I(),W.length==1?W[0]:new a6(W,J)}}R1.empty=new r1([""],0);function xD(Z){let J=-1;for(let Q of Z)J+=Q.length+1;return J}function WJ(Z,J,Q=0,X=1e9){for(let Y=0,K=0,W=!0;K<Z.length&&Y<=X;K++){let q=Z[K],G=Y+q.length;if(G>=Q){if(G>X)q=q.slice(0,X-Y);if(Y<Q)q=q.slice(Q-Y);if(W)J[J.length-1]+=q,W=!1;else J.push(q)}Y=G+1}return J}function Bz(Z,J,Q){return WJ(Z,[""],J,Q)}class _7{constructor(Z,J=1){this.dir=J,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[Z],this.offsets=[J>0?1:(Z instanceof r1?Z.text.length:Z.children.length)<<1]}nextInner(Z,J){this.done=this.lineBreak=!1;for(;;){let Q=this.nodes.length-1,X=this.nodes[Q],Y=this.offsets[Q],K=Y>>1,W=X instanceof r1?X.text.length:X.children.length;if(K==(J>0?W:0)){if(Q==0)return this.done=!0,this.value="",this;if(J>0)this.offsets[Q-1]++;this.nodes.pop(),this.offsets.pop()}else if((Y&1)==(J>0?0:1)){if(this.offsets[Q]+=J,Z==0)return this.lineBreak=!0,this.value=`
`,this;Z--}else if(X instanceof r1){let q=X.text[K+(J<0?-1:0)];if(this.offsets[Q]+=J,q.length>Math.max(0,Z))return this.value=Z==0?q:J>0?q.slice(Z):q.slice(0,q.length-Z),this;Z-=q.length}else{let q=X.children[K+(J<0?-1:0)];if(Z>q.length)Z-=q.length,this.offsets[Q]+=J;else{if(J<0)this.offsets[Q]--;this.nodes.push(q),this.offsets.push(J>0?1:(q instanceof r1?q.text.length:q.children.length)<<1)}}}}next(Z=0){if(Z<0)this.nextInner(-Z,-this.dir),Z=this.value.length;return this.nextInner(Z,this.dir)}}class lY{constructor(Z,J,Q){this.value="",this.done=!1,this.cursor=new _7(Z,J>Q?-1:1),this.pos=J>Q?Z.length:0,this.from=Math.min(J,Q),this.to=Math.max(J,Q)}nextInner(Z,J){if(J<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;Z+=Math.max(0,J<0?this.pos-this.to:this.from-this.pos);let Q=J<0?this.pos-this.from:this.to-this.pos;if(Z>Q)Z=Q;Q-=Z;let{value:X}=this.cursor.next(Z);return this.pos+=(X.length+Z)*J,this.value=X.length<=Q?X:J<0?X.slice(X.length-Q):X.slice(0,Q),this.done=!this.value,this}next(Z=0){if(Z<0)Z=Math.max(Z,this.from-this.pos);else if(Z>0)Z=Math.min(Z,this.to-this.pos);return this.nextInner(Z,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class sY{constructor(Z){this.inner=Z,this.afterBreak=!0,this.value="",this.done=!1}next(Z=0){let{done:J,lineBreak:Q,value:X}=this.inner.next(Z);if(J&&this.afterBreak)this.value="",this.afterBreak=!1;else if(J)this.done=!0,this.value="";else if(Q)if(this.afterBreak)this.value="";else this.afterBreak=!0,this.next();else this.value=X,this.afterBreak=!1;return this}get lineBreak(){return!1}}if(typeof Symbol<"u")R1.prototype[Symbol.iterator]=function(){return this.iter()},_7.prototype[Symbol.iterator]=lY.prototype[Symbol.iterator]=sY.prototype[Symbol.iterator]=function(){return this};class Ez{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.number=Q,this.text=X}get length(){return this.to-this.from}}function x7(Z,J,Q){return J=Math.max(0,Math.min(Z.length,J)),[J,Math.max(J,Math.min(Z.length,Q))]}function z0(Z,J,Q=!0,X=!0){return Rz(Z,J,Q,X)}function wD(Z){return Z>=56320&&Z<57344}function bD(Z){return Z>=55296&&Z<56320}function Cz(Z,J){let Q=Z.charCodeAt(J);if(!bD(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!wD(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function _z(Z){return Z<65536?1:2}var fY=/\r\n?|\n/,C0=function(Z){return Z[Z.Simple=0]="Simple",Z[Z.TrackDel=1]="TrackDel",Z[Z.TrackBefore=2]="TrackBefore",Z[Z.TrackAfter=3]="TrackAfter",Z}(C0||(C0={}));class E6{constructor(Z){this.sections=Z}get length(){let Z=0;for(let J=0;J<this.sections.length;J+=2)Z+=this.sections[J];return Z}get newLength(){let Z=0;for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J+1];Z+=Q<0?this.sections[J]:Q}return Z}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(Z){for(let J=0,Q=0,X=0;J<this.sections.length;){let Y=this.sections[J++],K=this.sections[J++];if(K<0)Z(Q,X,Y),X+=Y;else X+=K;Q+=Y}}iterChangedRanges(Z,J=!1){gY(this,Z,J)}get invertedDesc(){let Z=[];for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];if(X<0)Z.push(Q,X);else Z.push(X,Q)}return new E6(Z)}composeDesc(Z){return this.empty?Z:Z.empty?this:kz(this,Z)}mapDesc(Z,J=!1){return Z.empty?this:uY(this,Z,J)}mapPos(Z,J=-1,Q=C0.Simple){let X=0,Y=0;for(let K=0;K<this.sections.length;){let W=this.sections[K++],q=this.sections[K++],G=X+W;if(q<0){if(G>Z)return Y+(Z-X);Y+=W}else{if(Q!=C0.Simple&&G>=Z&&(Q==C0.TrackDel&&X<Z&&G>Z||Q==C0.TrackBefore&&X<Z||Q==C0.TrackAfter&&G>Z))return null;if(G>Z||G==Z&&J<0&&!W)return Z==X||J<0?Y:Y+q;Y+=q}X=G}if(Z>X)throw RangeError(`Position ${Z} is out of range for changeset of length ${X}`);return Y}touchesRange(Z,J=Z){for(let Q=0,X=0;Q<this.sections.length&&X<=J;){let Y=this.sections[Q++],K=this.sections[Q++],W=X+Y;if(K>=0&&X<=J&&W>=Z)return X<Z&&W>J?"cover":!0;X=W}return!1}toString(){let Z="";for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];Z+=(Z?" ":"")+Q+(X>=0?":"+X:"")}return Z}toJSON(){return this.sections}static fromJSON(Z){if(!Array.isArray(Z)||Z.length%2||Z.some((J)=>typeof J!="number"))throw RangeError("Invalid JSON representation of ChangeDesc");return new E6(Z)}static create(Z){return new E6(Z)}}class a1 extends E6{constructor(Z,J){super(Z);this.inserted=J}apply(Z){if(this.length!=Z.length)throw RangeError("Applying change set to a document with the wrong length");return gY(this,(J,Q,X,Y,K)=>Z=Z.replace(X,X+(Q-J),K),!1),Z}mapDesc(Z,J=!1){return uY(this,Z,J,!0)}invert(Z){let J=this.sections.slice(),Q=[];for(let X=0,Y=0;X<J.length;X+=2){let K=J[X],W=J[X+1];if(W>=0){J[X]=W,J[X+1]=K;let q=X>>1;while(Q.length<q)Q.push(R1.empty);Q.push(K?Z.slice(Y,Y+K):R1.empty)}Y+=K}return new a1(J,Q)}compose(Z){return this.empty?Z:Z.empty?this:kz(this,Z,!0)}map(Z,J=!1){return Z.empty?this:uY(this,Z,J,!0)}iterChanges(Z,J=!1){gY(this,Z,J)}get desc(){return E6.create(this.sections)}filter(Z){let J=[],Q=[],X=[],Y=new w7(this);Z:for(let K=0,W=0;;){let q=K==Z.length?1e9:Z[K++];while(W<q||W==q&&Y.len==0){if(Y.done)break Z;let U=Math.min(Y.len,q-W);D0(X,U,-1);let z=Y.ins==-1?-1:Y.off==0?Y.ins:0;if(D0(J,U,z),z>0)a8(Q,J,Y.text);Y.forward(U),W+=U}let G=Z[K++];while(W<G){if(Y.done)break Z;let U=Math.min(Y.len,G-W);D0(J,U,-1),D0(X,U,Y.ins==-1?-1:Y.off==0?Y.ins:0),Y.forward(U),W+=U}}return{changes:new a1(J,Q),filtered:E6.create(X)}}toJSON(){let Z=[];for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J],X=this.sections[J+1];if(X<0)Z.push(Q);else if(X==0)Z.push([Q]);else Z.push([Q].concat(this.inserted[J>>1].toJSON()))}return Z}static of(Z,J,Q){let X=[],Y=[],K=0,W=null;function q(U=!1){if(!U&&!X.length)return;if(K<J)D0(X,J-K,-1);let z=new a1(X,Y);W=W?W.compose(z.map(W)):z,X=[],Y=[],K=0}function G(U){if(Array.isArray(U))for(let z of U)G(z);else if(U instanceof a1){if(U.length!=J)throw RangeError(`Mismatched change set length (got ${U.length}, expected ${J})`);q(),W=W?W.compose(U.map(W)):U}else{let{from:z,to:I=z,insert:V}=U;if(z>I||z<0||I>J)throw RangeError(`Invalid change range ${z} to ${I} (in doc of length ${J})`);let H=!V?R1.empty:typeof V=="string"?R1.of(V.split(Q||fY)):V,F=H.length;if(z==I&&F==0)return;if(z<K)q();if(z>K)D0(X,z-K,-1);D0(X,I-z,F),a8(Y,X,H),K=I}}return G(Z),q(!W),W}static empty(Z){return new a1(Z?[Z,-1]:[],[])}static fromJSON(Z){if(!Array.isArray(Z))throw RangeError("Invalid JSON representation of ChangeSet");let J=[],Q=[];for(let X=0;X<Z.length;X++){let Y=Z[X];if(typeof Y=="number")J.push(Y,-1);else if(!Array.isArray(Y)||typeof Y[0]!="number"||Y.some((K,W)=>W&&typeof K!="string"))throw RangeError("Invalid JSON representation of ChangeSet");else if(Y.length==1)J.push(Y[0],0);else{while(Q.length<X)Q.push(R1.empty);Q[X]=R1.of(Y.slice(1)),J.push(Y[0],Q[X].length)}}return new a1(J,Q)}static createSet(Z,J){return new a1(Z,J)}}function D0(Z,J,Q,X=!1){if(J==0&&Q<=0)return;let Y=Z.length-2;if(Y>=0&&Q<=0&&Q==Z[Y+1])Z[Y]+=J;else if(Y>=0&&J==0&&Z[Y]==0)Z[Y+1]+=Q;else if(X)Z[Y]+=J,Z[Y+1]+=Q;else Z.push(J,Q)}function a8(Z,J,Q){if(Q.length==0)return;let X=J.length-2>>1;if(X<Z.length)Z[Z.length-1]=Z[Z.length-1].append(Q);else{while(Z.length<X)Z.push(R1.empty);Z.push(Q)}}function gY(Z,J,Q){let X=Z.inserted;for(let Y=0,K=0,W=0;W<Z.sections.length;){let q=Z.sections[W++],G=Z.sections[W++];if(G<0)Y+=q,K+=q;else{let U=Y,z=K,I=R1.empty;for(;;){if(U+=q,z+=G,G&&X)I=I.append(X[W-2>>1]);if(Q||W==Z.sections.length||Z.sections[W+1]<0)break;q=Z.sections[W++],G=Z.sections[W++]}J(Y,U,K,z,I),Y=U,K=z}}}function uY(Z,J,Q,X=!1){let Y=[],K=X?[]:null,W=new w7(Z),q=new w7(J);for(let G=-1;;)if(W.done&&q.len||q.done&&W.len)throw Error("Mismatched change set lengths");else if(W.ins==-1&&q.ins==-1){let U=Math.min(W.len,q.len);D0(Y,U,-1),W.forward(U),q.forward(U)}else if(q.ins>=0&&(W.ins<0||G==W.i||W.off==0&&(q.len<W.len||q.len==W.len&&!Q))){let U=q.len;D0(Y,q.ins,-1);while(U){let z=Math.min(W.len,U);if(W.ins>=0&&G<W.i&&W.len<=z){if(D0(Y,0,W.ins),K)a8(K,Y,W.text);G=W.i}W.forward(z),U-=z}q.next()}else if(W.ins>=0){let U=0,z=W.len;while(z)if(q.ins==-1){let I=Math.min(z,q.len);U+=I,z-=I,q.forward(I)}else if(q.ins==0&&q.len<z)z-=q.len,q.next();else break;if(D0(Y,U,G<W.i?W.ins:0),K&&G<W.i)a8(K,Y,W.text);G=W.i,W.forward(W.len-z)}else if(W.done&&q.done)return K?a1.createSet(Y,K):E6.create(Y);else throw Error("Mismatched change set lengths")}function kz(Z,J,Q=!1){let X=[],Y=Q?[]:null,K=new w7(Z),W=new w7(J);for(let q=!1;;)if(K.done&&W.done)return Y?a1.createSet(X,Y):E6.create(X);else if(K.ins==0)D0(X,K.len,0,q),K.next();else if(W.len==0&&!W.done){if(D0(X,0,W.ins,q),Y)a8(Y,X,W.text);W.next()}else if(K.done||W.done)throw Error("Mismatched change set lengths");else{let G=Math.min(K.len2,W.len),U=X.length;if(K.ins==-1){let z=W.ins==-1?-1:W.off?0:W.ins;if(D0(X,G,z,q),Y&&z)a8(Y,X,W.text)}else if(W.ins==-1){if(D0(X,K.off?0:K.len,G,q),Y)a8(Y,X,K.textBit(G))}else if(D0(X,K.off?0:K.len,W.off?0:W.ins,q),Y&&!W.off)a8(Y,X,W.text);q=(K.ins>G||W.ins>=0&&W.len>G)&&(q||X.length>U),K.forward2(G),W.forward(G)}}class w7{constructor(Z){this.set=Z,this.i=0,this.next()}next(){let{sections:Z}=this.set;if(this.i<Z.length)this.len=Z[this.i++],this.ins=Z[this.i++];else this.len=0,this.ins=-2;this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:Z}=this.set,J=this.i-2>>1;return J>=Z.length?R1.empty:Z[J]}textBit(Z){let{inserted:J}=this.set,Q=this.i-2>>1;return Q>=J.length&&!Z?R1.empty:J[Q].slice(this.off,Z==null?void 0:this.off+Z)}forward(Z){if(Z==this.len)this.next();else this.len-=Z,this.off+=Z}forward2(Z){if(this.ins==-1)this.forward(Z);else if(Z==this.ins)this.next();else this.ins-=Z,this.off+=Z}}class r8{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.flags=Q,this.goalColumn=X}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let Z=this.flags&7;return Z==7?null:Z}map(Z,J=-1){let Q,X;if(this.empty)Q=X=Z.mapPos(this.from,J);else Q=Z.mapPos(this.from,1),X=Z.mapPos(this.to,-1);return Q==this.from&&X==this.to?this:new r8(Q,X,this.flags,this.goalColumn)}extend(Z,J=Z,Q=0){if(Z<=this.anchor&&J>=this.anchor)return h.range(Z,J,void 0,void 0,Q);let X=Math.abs(Z-this.anchor)>Math.abs(J-this.anchor)?Z:J;return h.range(this.anchor,X,void 0,void 0,Q)}eq(Z,J=!1){return this.anchor==Z.anchor&&this.head==Z.head&&this.goalColumn==Z.goalColumn&&(!J||!this.empty||this.assoc==Z.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(Z){if(!Z||typeof Z.anchor!="number"||typeof Z.head!="number")throw RangeError("Invalid JSON representation for SelectionRange");return h.range(Z.anchor,Z.head)}static create(Z,J,Q,X){return new r8(Z,J,Q,X)}}class h{constructor(Z,J){this.ranges=Z,this.mainIndex=J}map(Z,J=-1){if(Z.empty)return this;return h.create(this.ranges.map((Q)=>Q.map(Z,J)),this.mainIndex)}eq(Z,J=!1){if(this.ranges.length!=Z.ranges.length||this.mainIndex!=Z.mainIndex)return!1;for(let Q=0;Q<this.ranges.length;Q++)if(!this.ranges[Q].eq(Z.ranges[Q],J))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new h([this.main],0)}addRange(Z,J=!0){return h.create([Z].concat(this.ranges),J?0:this.mainIndex+1)}replaceRange(Z,J=this.mainIndex){let Q=this.ranges.slice();return Q[J]=Z,h.create(Q,this.mainIndex)}toJSON(){return{ranges:this.ranges.map((Z)=>Z.toJSON()),main:this.mainIndex}}static fromJSON(Z){if(!Z||!Array.isArray(Z.ranges)||typeof Z.main!="number"||Z.main>=Z.ranges.length)throw RangeError("Invalid JSON representation for EditorSelection");return new h(Z.ranges.map((J)=>r8.fromJSON(J)),Z.main)}static single(Z,J=Z){return new h([h.range(Z,J)],0)}static create(Z,J=0){if(Z.length==0)throw RangeError("A selection needs at least one range");for(let Q=0,X=0;X<Z.length;X++){let Y=Z[X];if(Y.empty?Y.from<=Q:Y.from<Q)return h.normalized(Z.slice(),J);Q=Y.to}return new h(Z,J)}static cursor(Z,J=0,Q,X){return r8.create(Z,Z,(J==0?0:J<0?8:16)|(Q==null?7:Math.min(6,Q)),X)}static range(Z,J,Q,X,Y){let K=X==null?7:Math.min(6,X);if(!Y&&Z!=J)Y=J<Z?1:-1;if(Y)K|=Y<0?8:16;return J<Z?r8.create(J,Z,K|32,Q):r8.create(Z,J,K,Q)}static undirectionalRange(Z,J){return r8.create(Z,J,64,void 0)}static normalized(Z,J=0){let Q=Z[J];Z.sort((X,Y)=>X.from-Y.from),J=Z.indexOf(Q);for(let X=1;X<Z.length;X++){let Y=Z[X],K=Z[X-1];if(Y.empty?Y.from<=K.to:Y.from<K.to){let W=K.from,q=Math.max(Y.to,K.to);if(X<=J)J--;Z.splice(--X,2,Y.anchor>Y.head?h.range(q,W):h.range(W,q))}}return new h(Z,J)}}function xz(Z,J){for(let Q of Z.ranges)if(Q.to>J)throw RangeError("Selection points outside of document")}var iY=0;class o{constructor(Z,J,Q,X,Y){this.combine=Z,this.compareInput=J,this.compare=Q,this.isStatic=X,this.id=iY++,this.default=Z([]),this.extensions=typeof Y=="function"?Y(this):Y}get reader(){return this}static define(Z={}){return new o(Z.combine||((J)=>J),Z.compareInput||((J,Q)=>J===Q),Z.compare||(!Z.combine?rY:(J,Q)=>J===Q),!!Z.static,Z.enables)}of(Z){return new J5([],this,0,Z)}compute(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new J5(Z,this,1,J)}computeN(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new J5(Z,this,2,J)}from(Z,J){if(!J)J=(Q)=>Q;return this.compute([Z],(Q)=>J(Q.field(Z)))}}function rY(Z,J){return Z==J||Z.length==J.length&&Z.every((Q,X)=>Q===J[X])}class J5{constructor(Z,J,Q,X){this.dependencies=Z,this.facet=J,this.type=Q,this.value=X,this.id=iY++}dynamicSlot(Z){var J;let Q=this.value,X=this.facet.compareInput,Y=this.id,K=Z[Y]>>1,W=this.type==2,q=!1,G=!1,U=[];for(let z of this.dependencies)if(z=="doc")q=!0;else if(z=="selection")G=!0;else if((((J=Z[z.id])!==null&&J!==void 0?J:1)&1)==0)U.push(Z[z.id]);return{create(z){return z.values[K]=Q(z),1},update(z,I){if(q&&I.docChanged||G&&(I.docChanged||I.selection)||vY(z,U)){let V=Q(z);if(W?!Lz(V,z.values[K],X):!X(V,z.values[K]))return z.values[K]=V,1}return 0},reconfigure:(z,I)=>{let V,H=I.config.address[Y];if(H!=null){let F=UJ(I,H);if(this.dependencies.every((N)=>{return N instanceof o?I.facet(N)===z.facet(N):N instanceof M0?I.field(N,!1)==z.field(N,!1):!0})||(W?Lz(V=Q(z),F,X):X(V=Q(z),F)))return z.values[K]=F,0}else V=Q(z);return z.values[K]=V,1}}}get extension(){return this}}function Lz(Z,J,Q){if(Z.length!=J.length)return!1;for(let X=0;X<Z.length;X++)if(!Q(Z[X],J[X]))return!1;return!0}function vY(Z,J){let Q=!1;for(let X of J)if(Q5(Z,X)&1)Q=!0;return Q}function yD(Z,J,Q){let X=Q.map((G)=>Z[G.id]),Y=Q.map((G)=>G.type),K=X.filter((G)=>!(G&1)),W=Z[J.id]>>1;function q(G){let U=[];for(let z=0;z<X.length;z++){let I=UJ(G,X[z]);if(Y[z]==2)for(let V of I)U.push(V);else U.push(I)}return J.combine(U)}return{create(G){for(let U of X)Q5(G,U);return G.values[W]=q(G),1},update(G,U){if(!vY(G,K))return 0;let z=q(G);if(J.compare(z,G.values[W]))return 0;return G.values[W]=z,1},reconfigure(G,U){let z=vY(G,X),I=U.config.facets[J.id],V=U.facet(J);if(I&&!z&&rY(Q,I))return G.values[W]=V,0;let H=q(G);if(J.compare(H,V))return G.values[W]=V,0;return G.values[W]=H,1}}}var XJ=o.define({static:!0});class M0{constructor(Z,J,Q,X,Y){this.id=Z,this.createF=J,this.updateF=Q,this.compareF=X,this.spec=Y,this.provides=void 0}static define(Z){let J=new M0(iY++,Z.create,Z.update,Z.compare||((Q,X)=>Q===X),Z);if(Z.provide)J.provides=Z.provide(J);return J}create(Z){let J=Z.facet(XJ).find((Q)=>Q.field==this);return((J===null||J===void 0?void 0:J.create)||this.createF)(Z)}slot(Z){let J=Z[this.id]>>1;return{create:(Q)=>{return Q.values[J]=this.create(Q),1},update:(Q,X)=>{let Y=Q.values[J],K=this.updateF(Y,X);if(this.compareF(Y,K))return 0;return Q.values[J]=K,1},reconfigure:(Q,X)=>{let Y=Q.facet(XJ),K=X.facet(XJ),W;if((W=Y.find((q)=>q.field==this))&&W!=K.find((q)=>q.field==this))return Q.values[J]=W.create(Q),1;if(X.config.address[this.id]!=null)return Q.values[J]=X.field(this),0;return Q.values[J]=this.create(Q),1}}}init(Z){return[this,XJ.of({field:this,create:Z})]}get extension(){return this}}var g9={lowest:4,low:3,default:2,high:1,highest:0};function Z5(Z){return(J)=>new aY(J,Z)}var P8={highest:Z5(g9.highest),high:Z5(g9.high),default:Z5(g9.default),low:Z5(g9.low),lowest:Z5(g9.lowest)};class aY{constructor(Z,J){this.inner=Z,this.prec=J}get extension(){return this}}class u9{of(Z){return new qJ(this,Z)}reconfigure(Z){return u9.reconfigure.of({compartment:this,extension:Z})}get(Z){return Z.config.compartments.get(this)}}class qJ{constructor(Z,J){this.compartment=Z,this.inner=J}get extension(){return this}}class GJ{constructor(Z,J,Q,X,Y,K){this.base=Z,this.compartments=J,this.dynamicSlots=Q,this.address=X,this.staticValues=Y,this.facets=K,this.statusTemplate=[];while(this.statusTemplate.length<Q.length)this.statusTemplate.push(0)}staticFacet(Z){let J=this.address[Z.id];return J==null?Z.default:this.staticValues[J>>1]}static resolve(Z,J,Q){let X=[],Y=Object.create(null),K=new Map;for(let I of $D(Z,J,K))if(I instanceof M0)X.push(I);else(Y[I.facet.id]||(Y[I.facet.id]=[])).push(I);let W=Object.create(null),q=[],G=[];for(let I of X)W[I.id]=G.length<<1,G.push((V)=>I.slot(V));let U=Q===null||Q===void 0?void 0:Q.config.facets;for(let I in Y){let V=Y[I],H=V[0].facet,F=U&&U[I]||[];if(V.every((N)=>N.type==0))if(W[H.id]=q.length<<1|1,rY(F,V))q.push(Q.facet(H));else{let N=H.combine(V.map((R)=>R.value));q.push(Q&&H.compare(N,Q.facet(H))?Q.facet(H):N)}else{for(let N of V)if(N.type==0)W[N.id]=q.length<<1|1,q.push(N.value);else W[N.id]=G.length<<1,G.push((R)=>N.dynamicSlot(R));W[H.id]=G.length<<1,G.push((N)=>yD(N,H,V))}}let z=G.map((I)=>I(W));return new GJ(Z,K,z,W,q,Y)}}function $D(Z,J,Q){let X=[[],[],[],[],[]],Y=new Map;function K(W,q){let G=Y.get(W);if(G!=null){if(G<=q)return;let U=X[G].indexOf(W);if(U>-1)X[G].splice(U,1);if(W instanceof qJ)Q.delete(W.compartment)}if(Y.set(W,q),Array.isArray(W))for(let U of W)K(U,q);else if(W instanceof qJ){if(Q.has(W.compartment))throw RangeError("Duplicate use of compartment in extensions");let U=J.get(W.compartment)||W.inner;Q.set(W.compartment,U),K(U,q)}else if(W instanceof aY)K(W.inner,W.prec);else if(W instanceof M0){if(X[q].push(W),W.provides)K(W.provides,q)}else if(W instanceof J5){if(X[q].push(W),W.facet.extensions)K(W.facet.extensions,g9.default)}else{let U=W.extension;if(!U)throw Error(`Unrecognized extension value in extension set (${W}).`);if(U==W)throw Error(`Unrecognized extension value in extension set (${W}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);K(U,q)}}return K(Z,g9.default),X.reduce((W,q)=>W.concat(q))}function Q5(Z,J){if(J&1)return 2;let Q=J>>1,X=Z.status[Q];if(X==4)throw Error("Cyclic dependency between fields and/or facets");if(X&2)return X;Z.status[Q]=4;let Y=Z.computeSlot(Z,Z.config.dynamicSlots[Q]);return Z.status[Q]=2|Y}function UJ(Z,J){return J&1?Z.config.staticValues[J>>1]:Z.values[J>>1]}var wz=o.define(),mY=o.define({combine:(Z)=>Z.some((J)=>J),static:!0}),bz=o.define({combine:(Z)=>Z.length?Z[0]:void 0,static:!0}),yz=o.define(),$z=o.define(),hz=o.define(),fz=o.define({combine:(Z)=>Z.length?Z[0]:!1});class C6{constructor(Z,J){this.type=Z,this.value=J}static define(){return new gz}}class gz{of(Z){return new C6(this,Z)}}class uz{constructor(Z){this.map=Z}of(Z){return new B1(this,Z)}}class B1{constructor(Z,J){this.type=Z,this.value=J}map(Z){let J=this.type.map(this.value,Z);return J===void 0?void 0:J==this.value?this:new B1(this.type,J)}is(Z){return this.type==Z}static define(Z={}){return new uz(Z.map||((J)=>J))}static mapEffects(Z,J){if(!Z.length)return Z;let Q=[];for(let X of Z){let Y=X.map(J);if(Y)Q.push(Y)}return Q}}B1.reconfigure=B1.define();B1.appendConfig=B1.define();class o1{constructor(Z,J,Q,X,Y,K){if(this.startState=Z,this.changes=J,this.selection=Q,this.effects=X,this.annotations=Y,this.scrollIntoView=K,this._doc=null,this._state=null,Q)xz(Q,J.newLength);if(!Y.some((W)=>W.type==o1.time))this.annotations=Y.concat(o1.time.of(Date.now()))}static create(Z,J,Q,X,Y,K){return new o1(Z,J,Q,X,Y,K)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){if(!this._state)this.startState.applyTransaction(this);return this._state}annotation(Z){for(let J of this.annotations)if(J.type==Z)return J.value;return}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(Z){let J=this.annotation(o1.userEvent);return!!(J&&(J==Z||J.length>Z.length&&J.slice(0,Z.length)==Z&&J[Z.length]=="."))}}o1.time=C6.define();o1.userEvent=C6.define();o1.addToHistory=C6.define();o1.remote=C6.define();function hD(Z,J){let Q=[];for(let X=0,Y=0;;){let K,W;if(X<Z.length&&(Y==J.length||J[Y]>=Z[X]))K=Z[X++],W=Z[X++];else if(Y<J.length)K=J[Y++],W=J[Y++];else return Q;if(!Q.length||Q[Q.length-1]<K)Q.push(K,W);else if(Q[Q.length-1]<W)Q[Q.length-1]=W}}function vz(Z,J,Q){var X;let Y,K,W;if(Q)Y=J.changes,K=a1.empty(J.changes.length),W=Z.changes.compose(J.changes);else Y=J.changes.map(Z.changes),K=Z.changes.mapDesc(J.changes,!0),W=Z.changes.compose(Y);return{changes:W,selection:J.selection?J.selection.map(K):(X=Z.selection)===null||X===void 0?void 0:X.map(Y),effects:B1.mapEffects(Z.effects,Y).concat(B1.mapEffects(J.effects,K)),annotations:Z.annotations.length?Z.annotations.concat(J.annotations):J.annotations,scrollIntoView:Z.scrollIntoView||J.scrollIntoView}}function pY(Z,J,Q){let X=J.selection,Y=k7(J.annotations);if(J.userEvent)Y=Y.concat(o1.userEvent.of(J.userEvent));return{changes:J.changes instanceof a1?J.changes:a1.of(J.changes||[],Q,Z.facet(bz)),selection:X&&(X instanceof h?X:h.single(X.anchor,X.head)),effects:k7(J.effects),annotations:Y,scrollIntoView:!!J.scrollIntoView}}function mz(Z,J,Q){let X=pY(Z,J.length?J[0]:{},Z.doc.length);if(J.length&&J[0].filter===!1)Q=!1;for(let K=1;K<J.length;K++){if(J[K].filter===!1)Q=!1;let W=!!J[K].sequential;X=vz(X,pY(Z,J[K],W?X.changes.newLength:Z.doc.length),W)}let Y=o1.create(Z,X.changes,X.selection,X.effects,X.annotations,X.scrollIntoView);return gD(Q?fD(Y):Y)}function fD(Z){let J=Z.startState,Q=!0;for(let Y of J.facet(yz)){let K=Y(Z);if(K===!1){Q=!1;break}if(Array.isArray(K))Q=Q===!0?K:hD(Q,K)}if(Q!==!0){let Y,K;if(Q===!1)K=Z.changes.invertedDesc,Y=a1.empty(J.doc.length);else{let W=Z.changes.filter(Q);Y=W.changes,K=W.filtered.mapDesc(W.changes).invertedDesc}Z=o1.create(J,Y,Z.selection&&Z.selection.map(K),B1.mapEffects(Z.effects,K),Z.annotations,Z.scrollIntoView)}let X=J.facet($z);for(let Y=X.length-1;Y>=0;Y--){let K=X[Y](Z);if(K instanceof o1)Z=K;else if(Array.isArray(K)&&K.length==1&&K[0]instanceof o1)Z=K[0];else Z=mz(J,k7(K),!1)}return Z}function gD(Z){let J=Z.startState,Q=J.facet(hz),X=Z;for(let Y=Q.length-1;Y>=0;Y--){let K=Q[Y](Z);if(K&&Object.keys(K).length)X=vz(X,pY(J,K,Z.changes.newLength),!0)}return X==Z?Z:o1.create(J,Z.changes,Z.selection,X.effects,X.annotations,X.scrollIntoView)}var uD=[];function k7(Z){return Z==null?uD:Array.isArray(Z)?Z:[Z]}var S6=function(Z){return Z[Z.Word=0]="Word",Z[Z.Space=1]="Space",Z[Z.Other=2]="Other",Z}(S6||(S6={})),vD=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,cY;try{cY=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch(Z){}function mD(Z){if(cY)return cY.test(Z);for(let J=0;J<Z.length;J++){let Q=Z[J];if(/\w/.test(Q)||Q>""&&(Q.toUpperCase()!=Q.toLowerCase()||vD.test(Q)))return!0}return!1}function pD(Z){return(J)=>{if(!/\S/.test(J))return S6.Space;if(mD(J))return S6.Word;for(let Q=0;Q<Z.length;Q++)if(J.indexOf(Z[Q])>-1)return S6.Word;return S6.Other}}class A1{constructor(Z,J,Q,X,Y,K){if(this.config=Z,this.doc=J,this.selection=Q,this.values=X,this.status=Z.statusTemplate.slice(),this.computeSlot=Y,K)K._state=this;for(let W=0;W<this.config.dynamicSlots.length;W++)Q5(this,W<<1);this.computeSlot=null}field(Z,J=!0){let Q=this.config.address[Z.id];if(Q==null){if(J)throw RangeError("Field is not present in this state");return}return Q5(this,Q),UJ(this,Q)}update(...Z){return mz(this,Z,!0)}applyTransaction(Z){let J=this.config,{base:Q,compartments:X}=J;for(let W of Z.effects)if(W.is(u9.reconfigure)){if(J)X=new Map,J.compartments.forEach((q,G)=>X.set(G,q)),J=null;X.set(W.value.compartment,W.value.extension)}else if(W.is(B1.reconfigure))J=null,Q=W.value;else if(W.is(B1.appendConfig))J=null,Q=k7(Q).concat(W.value);let Y;if(!J)J=GJ.resolve(Q,X,this),Y=new A1(J,this.doc,this.selection,J.dynamicSlots.map(()=>null),(q,G)=>G.reconfigure(q,this),null).values;else Y=Z.startState.values.slice();let K=Z.startState.facet(mY)?Z.newSelection:Z.newSelection.asSingle();new A1(J,Z.newDoc,K,Y,(W,q)=>q.update(W,Z),Z)}replaceSelection(Z){if(typeof Z=="string")Z=this.toText(Z);return this.changeByRange((J)=>({changes:{from:J.from,to:J.to,insert:Z},range:h.cursor(J.from+Z.length)}))}changeByRange(Z){let J=this.selection,Q=Z(J.ranges[0]),X=this.changes(Q.changes),Y=[Q.range],K=k7(Q.effects);for(let W=1;W<J.ranges.length;W++){let q=Z(J.ranges[W]),G=this.changes(q.changes),U=G.map(X);for(let I=0;I<W;I++)Y[I]=Y[I].map(U);let z=X.mapDesc(G,!0);Y.push(q.range.map(z)),X=X.compose(U),K=B1.mapEffects(K,U).concat(B1.mapEffects(k7(q.effects),z))}return{changes:X,selection:h.create(Y,J.mainIndex),effects:K}}changes(Z=[]){if(Z instanceof a1)return Z;return a1.of(Z,this.doc.length,this.facet(A1.lineSeparator))}toText(Z){return R1.of(Z.split(this.facet(A1.lineSeparator)||fY))}sliceDoc(Z=0,J=this.doc.length){return this.doc.sliceString(Z,J,this.lineBreak)}facet(Z){let J=this.config.address[Z.id];if(J==null)return Z.default;return Q5(this,J),UJ(this,J)}toJSON(Z){let J={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(Z)for(let Q in Z){let X=Z[Q];if(X instanceof M0&&this.config.address[X.id]!=null)J[Q]=X.spec.toJSON(this.field(Z[Q]),this)}return J}static fromJSON(Z,J={},Q){if(!Z||typeof Z.doc!="string")throw RangeError("Invalid JSON representation for EditorState");let X=[];if(Q){for(let Y in Q)if(Object.prototype.hasOwnProperty.call(Z,Y)){let K=Q[Y],W=Z[Y];X.push(K.init((q)=>K.spec.fromJSON(W,q)))}}return A1.create({doc:Z.doc,selection:h.fromJSON(Z.selection),extensions:J.extensions?X.concat([J.extensions]):X})}static create(Z={}){let J=GJ.resolve(Z.extensions||[],new Map),Q=Z.doc instanceof R1?Z.doc:R1.of((Z.doc||"").split(J.staticFacet(A1.lineSeparator)||fY)),X=!Z.selection?h.single(0):Z.selection instanceof h?Z.selection:h.single(Z.selection.anchor,Z.selection.head);if(xz(X,Q.length),!J.staticFacet(mY))X=X.asSingle();return new A1(J,Q,X,J.dynamicSlots.map(()=>null),(Y,K)=>K.create(Y),null)}get tabSize(){return this.facet(A1.tabSize)}get lineBreak(){return this.facet(A1.lineSeparator)||`
`}get readOnly(){return this.facet(fz)}phrase(Z,...J){for(let Q of this.facet(A1.phrases))if(Object.prototype.hasOwnProperty.call(Q,Z)){Z=Q[Z];break}if(J.length)Z=Z.replace(/\$(\$|\d*)/g,(Q,X)=>{if(X=="$")return"$";let Y=+(X||1);return!Y||Y>J.length?Q:J[Y-1]});return Z}languageDataAt(Z,J,Q=-1){let X=[];for(let Y of this.facet(wz))for(let K of Y(this,J,Q))if(Object.prototype.hasOwnProperty.call(K,Z))X.push(K[Z]);return X}charCategorizer(Z){let J=this.languageDataAt("wordChars",Z);return pD(J.length?J[0]:"")}wordAt(Z){let{text:J,from:Q,length:X}=this.doc.lineAt(Z),Y=this.charCategorizer(Z),K=Z-Q,W=Z-Q;while(K>0){let q=z0(J,K,!1);if(Y(J.slice(q,K))!=S6.Word)break;K=q}while(W<X){let q=z0(J,W);if(Y(J.slice(W,q))!=S6.Word)break;W=q}return K==W?null:h.range(K+Q,W+Q)}}A1.allowMultipleSelections=mY;A1.tabSize=o.define({combine:(Z)=>Z.length?Z[0]:4});A1.lineSeparator=bz;A1.readOnly=fz;A1.phrases=o.define({compare(Z,J){let Q=Object.keys(Z),X=Object.keys(J);return Q.length==X.length&&Q.every((Y)=>Z[Y]==J[Y])}});A1.languageData=wz;A1.changeFilter=yz;A1.transactionFilter=$z;A1.transactionExtender=hz;u9.reconfigure=B1.define();function T8(Z,J,Q={}){let X={};for(let Y of Z)for(let K of Object.keys(Y)){let W=Y[K],q=X[K];if(q===void 0)X[K]=W;else if(q===W||W===void 0);else if(Object.hasOwnProperty.call(Q,K))X[K]=Q[K](q,W);else throw Error("Config merge conflict for field "+K)}for(let Y in J)if(X[Y]===void 0)X[Y]=J[Y];return X}class B8{eq(Z){return this==Z}range(Z,J=Z){return X5.create(Z,J,this)}}B8.prototype.startSide=B8.prototype.endSide=0;B8.prototype.point=!1;B8.prototype.mapMode=C0.TrackDel;function oY(Z,J){return Z==J||Z.constructor==J.constructor&&Z.eq(J)}class X5{constructor(Z,J,Q){this.from=Z,this.to=J,this.value=Q}static create(Z,J,Q){return new X5(Z,J,Q)}}function dY(Z,J){return Z.from-J.from||Z.value.startSide-J.value.startSide}class tY{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.value=Q,this.maxPoint=X}get length(){return this.to[this.to.length-1]}findIndex(Z,J,Q,X=0){let Y=Q?this.to:this.from;for(let K=X,W=Y.length;;){if(K==W)return K;let q=K+W>>1,G=Y[q]-Z||(Q?this.value[q].endSide:this.value[q].startSide)-J;if(q==K)return G>=0?K:W;if(G>=0)W=q;else K=q+1}}between(Z,J,Q,X){for(let Y=this.findIndex(J,-1e9,!0),K=this.findIndex(Q,1e9,!1,Y);Y<K;Y++)if(X(this.from[Y]+Z,this.to[Y]+Z,this.value[Y])===!1)return!1}map(Z,J){let Q=[],X=[],Y=[],K=-1,W=-1;for(let q=0;q<this.value.length;q++){let G=this.value[q],U=this.from[q]+Z,z=this.to[q]+Z,I,V;if(U==z){let H=J.mapPos(U,G.startSide,G.mapMode);if(H==null)continue;if(I=V=H,G.startSide!=G.endSide){if(V=J.mapPos(U,G.endSide),V<I)continue}}else if(I=J.mapPos(U,G.startSide),V=J.mapPos(z,G.endSide),I>V||I==V&&G.startSide>0&&G.endSide<=0)continue;if((V-I||G.endSide-G.startSide)<0)continue;if(K<0)K=I;if(G.point)W=Math.max(W,V-I);Q.push(G),X.push(I-K),Y.push(V-K)}return{mapped:Q.length?new tY(X,Y,Q,W):null,pos:K}}}class N1{constructor(Z,J,Q,X){this.chunkPos=Z,this.chunk=J,this.nextLayer=Q,this.maxPoint=X}static create(Z,J,Q,X){return new N1(Z,J,Q,X)}get length(){let Z=this.chunk.length-1;return Z<0?0:Math.max(this.chunkEnd(Z),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let Z=this.nextLayer.size;for(let J of this.chunk)Z+=J.value.length;return Z}chunkEnd(Z){return this.chunkPos[Z]+this.chunk[Z].length}update(Z){let{add:J=[],sort:Q=!1,filterFrom:X=0,filterTo:Y=this.length}=Z,K=Z.filter;if(J.length==0&&!K)return this;if(Q)J=J.slice().sort(dY);if(this.isEmpty)return J.length?N1.of(J):this;let W=new eY(this,null,-1).goto(0),q=0,G=[],U=new L8;while(W.value||q<J.length)if(q<J.length&&(W.from-J[q].from||W.startSide-J[q].value.startSide)>=0){let z=J[q++];if(!U.addInner(z.from,z.to,z.value))G.push(z)}else if(W.rangeIndex==1&&W.chunkIndex<this.chunk.length&&(q==J.length||this.chunkEnd(W.chunkIndex)<J[q].from)&&(!K||X>this.chunkEnd(W.chunkIndex)||Y<this.chunkPos[W.chunkIndex])&&U.addChunk(this.chunkPos[W.chunkIndex],this.chunk[W.chunkIndex]))W.nextChunk();else{if(!K||X>W.to||Y<W.from||K(W.from,W.to,W.value)){if(!U.addInner(W.from,W.to,W.value))G.push(X5.create(W.from,W.to,W.value))}W.next()}return U.finishInner(this.nextLayer.isEmpty&&!G.length?N1.empty:this.nextLayer.update({add:G,filter:K,filterFrom:X,filterTo:Y}))}map(Z){if(Z.empty||this.isEmpty)return this;let J=[],Q=[],X=-1;for(let K=0;K<this.chunk.length;K++){let W=this.chunkPos[K],q=this.chunk[K],G=Z.touchesRange(W,W+q.length);if(G===!1)X=Math.max(X,q.maxPoint),J.push(q),Q.push(Z.mapPos(W));else if(G===!0){let{mapped:U,pos:z}=q.map(W,Z);if(U)X=Math.max(X,U.maxPoint),J.push(U),Q.push(z)}}let Y=this.nextLayer.map(Z);return J.length==0?Y:new N1(Q,J,Y||N1.empty,X)}between(Z,J,Q){if(this.isEmpty)return;for(let X=0;X<this.chunk.length;X++){let Y=this.chunkPos[X],K=this.chunk[X];if(J>=Y&&Z<=Y+K.length&&K.between(Y,Z-Y,J-Y,Q)===!1)return}this.nextLayer.between(Z,J,Q)}iter(Z=0){return Y5.from([this]).goto(Z)}get isEmpty(){return this.nextLayer==this}static iter(Z,J=0){return Y5.from(Z).goto(J)}static compare(Z,J,Q,X,Y=-1){let K=Z.filter((z)=>z.maxPoint>0||!z.isEmpty&&z.maxPoint>=Y),W=J.filter((z)=>z.maxPoint>0||!z.isEmpty&&z.maxPoint>=Y),q=Pz(K,W,Q),G=new C7(K,q,Y),U=new C7(W,q,Y);if(Q.iterGaps((z,I,V)=>Tz(G,z,U,I,V,X)),Q.empty&&Q.length==0)Tz(G,0,U,0,0,X)}static eq(Z,J,Q=0,X){if(X==null)X=999999999;let Y=Z.filter((U)=>!U.isEmpty&&J.indexOf(U)<0),K=J.filter((U)=>!U.isEmpty&&Z.indexOf(U)<0);if(Y.length!=K.length)return!1;if(!Y.length)return!0;let W=Pz(Y,K),q=new C7(Y,W,0).goto(Q),G=new C7(K,W,0).goto(Q);for(;;){if(q.to!=G.to||!nY(q.active,G.active)||q.point&&(!G.point||!oY(q.point,G.point)))return!1;if(q.to>X)return!0;q.next(),G.next()}}static spans(Z,J,Q,X,Y=-1){let K=new C7(Z,null,Y).goto(J),W=J,q=K.openStart;for(;;){let G=Math.min(K.to,Q);if(K.point){let U=K.activeForPoint(K.to),z=K.pointFrom<J?U.length+1:K.point.startSide<0?U.length:Math.min(U.length,q);X.point(W,G,K.point,U,z,K.pointRank),q=Math.min(K.openEnd(G),U.length)}else if(G>W)X.span(W,G,K.active,q),q=K.openEnd(G);if(K.to>Q)return q+(K.point&&K.to>Q?1:0);W=K.to,K.next()}}static of(Z,J=!1){let Q=new L8;for(let X of Z instanceof X5?[Z]:J?cD(Z):Z)Q.add(X.from,X.to,X.value);return Q.finish()}static join(Z){if(!Z.length)return N1.empty;let J=Z[Z.length-1];for(let Q=Z.length-2;Q>=0;Q--)for(let X=Z[Q];X!=N1.empty;X=X.nextLayer)J=new N1(X.chunkPos,X.chunk,J,Math.max(X.maxPoint,J.maxPoint));return J}}N1.empty=new N1([],[],null,-1);function cD(Z){if(Z.length>1)for(let J=Z[0],Q=1;Q<Z.length;Q++){let X=Z[Q];if(dY(J,X)>0)return Z.slice().sort(dY);J=X}return Z}N1.empty.nextLayer=N1.empty;class L8{finishChunk(Z){if(this.chunks.push(new tY(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,Z)this.from=[],this.to=[],this.value=[]}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(Z,J,Q){if(!this.addInner(Z,J,Q))(this.nextLayer||(this.nextLayer=new L8)).add(Z,J,Q)}addInner(Z,J,Q){let X=Z-this.lastTo||Q.startSide-this.last.endSide;if(X<=0&&(Z-this.lastFrom||Q.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");if(X<0)return!1;if(this.from.length==250)this.finishChunk(!0);if(this.chunkStart<0)this.chunkStart=Z;if(this.from.push(Z-this.chunkStart),this.to.push(J-this.chunkStart),this.last=Q,this.lastFrom=Z,this.lastTo=J,this.value.push(Q),Q.point)this.maxPoint=Math.max(this.maxPoint,J-Z);return!0}addChunk(Z,J){if((Z-this.lastTo||J.value[0].startSide-this.last.endSide)<0)return!1;if(this.from.length)this.finishChunk(!0);this.setMaxPoint=Math.max(this.setMaxPoint,J.maxPoint),this.chunks.push(J),this.chunkPos.push(Z);let Q=J.value.length-1;return this.last=J.value[Q],this.lastFrom=J.from[Q]+Z,this.lastTo=J.to[Q]+Z,!0}finish(){return this.finishInner(N1.empty)}finishInner(Z){if(this.from.length)this.finishChunk(!1);if(this.chunks.length==0)return Z;let J=N1.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(Z):Z,this.setMaxPoint);return this.from=null,J}}function Pz(Z,J,Q){let X=new Map;for(let K of Z)for(let W=0;W<K.chunk.length;W++)if(K.chunk[W].maxPoint<=0)X.set(K.chunk[W],K.chunkPos[W]);let Y=new Set;for(let K of J)for(let W=0;W<K.chunk.length;W++){let q=X.get(K.chunk[W]);if(q!=null&&(Q?Q.mapPos(q):q)==K.chunkPos[W]&&!(Q===null||Q===void 0?void 0:Q.touchesRange(q,q+K.chunk[W].length)))Y.add(K.chunk[W])}return Y}class eY{constructor(Z,J,Q,X=0){this.layer=Z,this.skip=J,this.minPoint=Q,this.rank=X}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(Z,J=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(Z,J,!1),this}gotoInner(Z,J,Q){while(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(X)||this.layer.chunkEnd(this.chunkIndex)<Z||X.maxPoint<this.minPoint))break;this.chunkIndex++,Q=!1}if(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex].findIndex(Z-this.layer.chunkPos[this.chunkIndex],J,!0);if(!Q||this.rangeIndex<X)this.setRangeIndex(X)}this.next()}forward(Z,J){if((this.to-Z||this.endSide-J)<0)this.gotoInner(Z,J,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let Z=this.layer.chunkPos[this.chunkIndex],J=this.layer.chunk[this.chunkIndex],Q=Z+J.from[this.rangeIndex];if(this.from=Q,this.to=Z+J.to[this.rangeIndex],this.value=J.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(Z){if(Z==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)while(this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]))this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=Z}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(Z){return this.from-Z.from||this.startSide-Z.startSide||this.rank-Z.rank||this.to-Z.to||this.endSide-Z.endSide}}class Y5{constructor(Z){this.heap=Z}static from(Z,J=null,Q=-1){let X=[];for(let Y=0;Y<Z.length;Y++)for(let K=Z[Y];!K.isEmpty;K=K.nextLayer)if(K.maxPoint>=Q)X.push(new eY(K,J,Q,Y));return X.length==1?X[0]:new Y5(X)}get startSide(){return this.value?this.value.startSide:0}goto(Z,J=-1e9){for(let Q of this.heap)Q.goto(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)hY(this.heap,Q);return this.next(),this}forward(Z,J){for(let Q of this.heap)Q.forward(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)hY(this.heap,Q);if((this.to-Z||this.value.endSide-J)<0)this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let Z=this.heap[0];if(this.from=Z.from,this.to=Z.to,this.value=Z.value,this.rank=Z.rank,Z.value)Z.next();hY(this.heap,0)}}}function hY(Z,J){for(let Q=Z[J];;){let X=(J<<1)+1;if(X>=Z.length)break;let Y=Z[X];if(X+1<Z.length&&Y.compare(Z[X+1])>=0)Y=Z[X+1],X++;if(Q.compare(Y)<0)break;Z[X]=Q,Z[J]=Y,J=X}}class C7{constructor(Z,J,Q){this.minPoint=Q,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=Y5.from(Z,J,Q)}goto(Z,J=-1e9){return this.cursor.goto(Z,J),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=Z,this.endSide=J,this.openStart=-1,this.next(),this}forward(Z,J){while(this.minActive>-1&&(this.activeTo[this.minActive]-Z||this.active[this.minActive].endSide-J)<0)this.removeActive(this.minActive);this.cursor.forward(Z,J)}removeActive(Z){YJ(this.active,Z),YJ(this.activeTo,Z),YJ(this.activeRank,Z),this.minActive=Sz(this.active,this.activeTo)}addActive(Z){let J=0,{value:Q,to:X,rank:Y}=this.cursor;while(J<this.activeRank.length&&(Y-this.activeRank[J]||X-this.activeTo[J])>0)J++;if(KJ(this.active,J,Q),KJ(this.activeTo,J,X),KJ(this.activeRank,J,Y),Z)KJ(Z,J,this.cursor.from);this.minActive=Sz(this.active,this.activeTo)}next(){let Z=this.to,J=this.point;this.point=null;let Q=this.openStart<0?[]:null;for(;;){let X=this.minActive;if(X>-1&&(this.activeTo[X]-this.cursor.from||this.active[X].endSide-this.cursor.startSide)<0){if(this.activeTo[X]>Z){this.to=this.activeTo[X],this.endSide=this.active[X].endSide;break}if(this.removeActive(X),Q)YJ(Q,X)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>Z){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let Y=this.cursor.value;if(!Y.point)this.addActive(Q),this.cursor.next();else if(J&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=Y,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=Y.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(Q){this.openStart=0;for(let X=Q.length-1;X>=0&&Q[X]<Z;X--)this.openStart++}}activeForPoint(Z){if(!this.active.length)return this.active;let J=[];for(let Q=this.active.length-1;Q>=0;Q--){if(this.activeRank[Q]<this.pointRank)break;if(this.activeTo[Q]>Z||this.activeTo[Q]==Z&&this.active[Q].endSide>=this.point.endSide)J.push(this.active[Q])}return J.reverse()}openEnd(Z){let J=0;for(let Q=this.activeTo.length-1;Q>=0&&this.activeTo[Q]>Z;Q--)J++;return J}}function Tz(Z,J,Q,X,Y,K){Z.goto(J),Q.goto(X);let W=X+Y,q=X,G=X-J,U=!!K.boundChange;for(let z=!1;;){let I=Z.to+G-Q.to,V=I||Z.endSide-Q.endSide,H=V<0?Z.to+G:Q.to,F=Math.min(H,W);if(Z.point||Q.point){if(!(Z.point&&Q.point&&oY(Z.point,Q.point)&&nY(Z.activeForPoint(Z.to),Q.activeForPoint(Q.to))))K.comparePoint(q,F,Z.point,Q.point);z=!1}else{if(z)K.boundChange(q);if(F>q&&!nY(Z.active,Q.active))K.compareRange(q,F,Z.active,Q.active);if(U&&F<W&&(I||Z.openEnd(H)!=Q.openEnd(H)))z=!0}if(H>W)break;if(q=H,V<=0)Z.next();if(V>=0)Q.next()}}function nY(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(Z[Q]!=J[Q]&&!oY(Z[Q],J[Q]))return!1;return!0}function YJ(Z,J){for(let Q=J,X=Z.length-1;Q<X;Q++)Z[Q]=Z[Q+1];Z.pop()}function KJ(Z,J,Q){for(let X=Z.length-1;X>=J;X--)Z[X+1]=Z[X];Z[J]=Q}function Sz(Z,J){let Q=-1,X=1e9;for(let Y=0;Y<J.length;Y++)if((J[Y]-X||Z[Y].endSide-Z[Q].endSide)<0)Q=Y,X=J[Y];return Q}function v9(Z,J,Q=Z.length){let X=0;for(let Y=0;Y<Q&&Y<Z.length;)if(Z.charCodeAt(Y)==9)X+=J-X%J,Y++;else X++,Y=z0(Z,Y);return X}function pz(Z,J,Q,X){for(let Y=0,K=0;;){if(K>=J)return Y;if(Y==Z.length)break;K+=Z.charCodeAt(Y)==9?Q-K%Q:1,Y=z0(Z,Y)}return X===!0?-1:Z.length}var cz=typeof Symbol>"u"?"__"+"ͼ":Symbol.for("ͼ"),ZK=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),dz=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class _6{constructor(Z,J){this.rules=[];let{finish:Q}=J||{};function X(K){return/^@/.test(K)?[K]:K.split(/,\s*/)}function Y(K,W,q,G){let U=[],z=/^@(\w+)\b/.exec(K[0]),I=z&&z[1]=="keyframes";if(z&&W==null)return q.push(K[0]+";");for(let V in W){let H=W[V];if(/&/.test(V))Y(V.split(/,\s*/).map((F)=>K.map((N)=>F.replace(/&/,N))).reduce((F,N)=>F.concat(N)),H,q);else if(H&&typeof H=="object"){if(!z)throw RangeError("The value of a property ("+V+") should be a primitive value.");Y(X(V),H,U,I)}else if(H!=null)U.push(V.replace(/_.*/,"").replace(/[A-Z]/g,(F)=>"-"+F.toLowerCase())+": "+H+";")}if(U.length||I)q.push((Q&&!z&&!G?K.map(Q):K).join(", ")+" {"+U.join(" ")+"}")}for(let K in Z)Y(X(K),Z[K],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let Z=dz[cz]||1;return dz[cz]=Z+1,"ͼ"+Z.toString(36)}static mount(Z,J,Q){let X=Z[ZK],Y=Q&&Q.nonce;if(!X)X=new lz(Z,Y);else if(Y)X.setNonce(Y);X.mount(Array.isArray(J)?J:[J],Z)}}var nz=new Map;class lz{constructor(Z,J){let Q=Z.ownerDocument||Z,X=Q.defaultView;if(!Z.head&&Z.adoptedStyleSheets&&X.CSSStyleSheet){let Y=nz.get(Q);if(Y)return Z[ZK]=Y;this.sheet=new X.CSSStyleSheet,nz.set(Q,this)}else if(this.styleTag=Q.createElement("style"),J)this.styleTag.setAttribute("nonce",J);this.modules=[],Z[ZK]=this}mount(Z,J){let Q=this.sheet,X=0,Y=0;for(let K=0;K<Z.length;K++){let W=Z[K],q=this.modules.indexOf(W);if(q<Y&&q>-1)this.modules.splice(q,1),Y--,q=-1;if(q==-1){if(this.modules.splice(Y++,0,W),Q)for(let G=0;G<W.rules.length;G++)Q.insertRule(W.rules[G],X++)}else{while(Y<q)X+=this.modules[Y++].rules.length;X+=W.rules.length,Y++}}if(Q){if(J.adoptedStyleSheets.indexOf(this.sheet)<0)J.adoptedStyleSheets=[this.sheet,...J.adoptedStyleSheets]}else{let K="";for(let q=0;q<this.modules.length;q++)K+=this.modules[q].getRules()+`
`;this.styleTag.textContent=K;let W=J.head||J;if(this.styleTag.parentNode!=W)W.insertBefore(this.styleTag,W.firstChild)}}setNonce(Z){if(this.styleTag&&this.styleTag.getAttribute("nonce")!=Z)this.styleTag.setAttribute("nonce",Z)}}var S8={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},b7={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},dD=typeof navigator<"u"&&/Mac/.test(navigator.platform),nD=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(c1=0;c1<10;c1++)S8[48+c1]=S8[96+c1]=String(c1);var c1;for(c1=1;c1<=24;c1++)S8[c1+111]="F"+c1;var c1;for(c1=65;c1<=90;c1++)S8[c1]=String.fromCharCode(c1+32),b7[c1]=String.fromCharCode(c1);var c1;for(K5 in S8)if(!b7.hasOwnProperty(K5))b7[K5]=S8[K5];var K5;function sz(Z){var J=dD&&Z.metaKey&&Z.shiftKey&&!Z.ctrlKey&&!Z.altKey||nD&&Z.shiftKey&&Z.key&&Z.key.length==1||Z.key=="Unidentified",Q=!J&&Z.key||(Z.shiftKey?b7:S8)[Z.keyCode]||Z.key||"Unidentified";if(Q=="Esc")Q="Escape";if(Q=="Del")Q="Delete";if(Q=="Left")Q="ArrowLeft";if(Q=="Up")Q="ArrowUp";if(Q=="Right")Q="ArrowRight";if(Q=="Down")Q="ArrowDown";return Q}function i0(){var Z=arguments[0];if(typeof Z=="string")Z=document.createElement(Z);var J=1,Q=arguments[1];if(Q&&typeof Q=="object"&&Q.nodeType==null&&!Array.isArray(Q)){for(var X in Q)if(Object.prototype.hasOwnProperty.call(Q,X)){var Y=Q[X];if(typeof Y=="string")Z.setAttribute(X,Y);else if(Y!=null)Z[X]=Y}J++}for(;J<arguments.length;J++)iz(Z,arguments[J]);return Z}function iz(Z,J){if(typeof J=="string")Z.appendChild(document.createTextNode(J));else if(J==null);else if(J.nodeType!=null)Z.appendChild(J);else if(Array.isArray(J))for(var Q=0;Q<J.length;Q++)iz(Z,J[Q]);else throw RangeError("Unsupported child node: "+J)}var _0=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},UK=typeof document<"u"?document:{documentElement:{style:{}}},zK=/Edge\/(\d+)/.exec(_0.userAgent),kI=/MSIE \d/.test(_0.userAgent),IK=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(_0.userAgent),hJ=!!(kI||IK||zK),rz=!hJ&&/gecko\/(\d+)/i.test(_0.userAgent),JK=!hJ&&/Chrome\/(\d+)/.exec(_0.userAgent),az="webkitFontSmoothing"in UK.documentElement.style,VK=!hJ&&/Apple Computer/.test(_0.vendor),oz=VK&&(/Mobile\/\w+/.test(_0.userAgent)||_0.maxTouchPoints>2),r={mac:oz||/Mac/.test(_0.platform),windows:/Win/.test(_0.platform),linux:/Linux|X11/.test(_0.platform),ie:hJ,ie_version:kI?UK.documentMode||6:IK?+IK[1]:zK?+zK[1]:0,gecko:rz,gecko_version:rz?+(/Firefox\/(\d+)/.exec(_0.userAgent)||[0,0])[1]:0,chrome:!!JK,chrome_version:JK?+JK[1]:0,ios:oz,android:/Android\b/.test(_0.userAgent),webkit:az,webkit_version:az?+(/\bAppleWebKit\/(\d+)/.exec(_0.userAgent)||[0,0])[1]:0,safari:VK,safari_version:VK?+(/\bVersion\/(\d+(\.\d+)?)/.exec(_0.userAgent)||[0,0])[1]:0,tabSize:UK.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function wK(Z,J){for(let Q in Z)if(Q=="class"&&J.class)J.class+=" "+Z.class;else if(Q=="style"&&J.style)J.style+=";"+Z.style;else J[Q]=Z[Q];return J}var EJ=Object.create(null);function bK(Z,J,Q){if(Z==J)return!0;if(!Z)Z=EJ;if(!J)J=EJ;let X=Object.keys(Z),Y=Object.keys(J);if(X.length-(Q&&X.indexOf(Q)>-1?1:0)!=Y.length-(Q&&Y.indexOf(Q)>-1?1:0))return!1;for(let K of X)if(K!=Q&&(Y.indexOf(K)==-1||Z[K]!==J[K]))return!1;return!0}function lD(Z,J){for(let Q=Z.attributes.length-1;Q>=0;Q--){let X=Z.attributes[Q].name;if(J[X]==null)Z.removeAttribute(X)}for(let Q in J){let X=J[Q];if(Q=="style")Z.style.cssText=X;else if(Z.getAttribute(Q)!=X)Z.setAttribute(Q,X)}}function tz(Z,J,Q){let X=!1;if(J){for(let Y in J)if(!(Q&&(Y in Q)))if(X=!0,Y=="style")Z.style.cssText="";else Z.removeAttribute(Y)}if(Q){for(let Y in Q)if(!(J&&J[Y]==Q[Y]))if(X=!0,Y=="style")Z.style.cssText=Q[Y];else Z.setAttribute(Y,Q[Y])}return X}function sD(Z){let J=Object.create(null);for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];J[X.name]=X.value}return J}class e8{eq(Z){return!1}updateDOM(Z,J,Q){return!1}compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(Z){return!0}coordsAt(Z,J,Q){return null}get isHidden(){return!1}get editable(){return!1}destroy(Z){}}var F0=function(Z){return Z[Z.Text=0]="Text",Z[Z.WidgetBefore=1]="WidgetBefore",Z[Z.WidgetAfter=2]="WidgetAfter",Z[Z.WidgetRange=3]="WidgetRange",Z}(F0||(F0={}));class L1 extends B8{constructor(Z,J,Q,X){super();this.startSide=Z,this.endSide=J,this.widget=Q,this.spec=X}get heightRelevant(){return!1}static mark(Z){return new N5(Z)}static widget(Z){let J=Math.max(-1e4,Math.min(1e4,Z.side||0)),Q=!!Z.block;return J+=Q&&!Z.inlineOrder?J>0?300000000:-400000000:J>0?1e8:-1e8,new d9(Z,J,J,Q,Z.widget||null,!1)}static replace(Z){let J=!!Z.block,Q,X;if(Z.isBlockGap)Q=-500000000,X=400000000;else{let{start:Y,end:K}=xI(Z,J);Q=(Y?J?-300000000:-1:500000000)-1,X=(K?J?200000000:1:-600000000)+1}return new d9(Z,Q,X,J,Z.widget||null,!0)}static line(Z){return new R5(Z)}static set(Z,J=!1){return N1.of(Z,J)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}L1.none=N1.empty;class N5 extends L1{constructor(Z){let{start:J,end:Q}=xI(Z);super(J?-1:500000000,Q?1:-600000000,null,Z);this.tagName=Z.tagName||"span",this.attrs=Z.class&&Z.attributes?wK(Z.attributes,{class:Z.class}):Z.class?{class:Z.class}:Z.attributes||EJ}eq(Z){return this==Z||Z instanceof N5&&this.tagName==Z.tagName&&bK(this.attrs,Z.attrs)}range(Z,J=Z){if(Z>=J)throw RangeError("Mark decorations may not be empty");return super.range(Z,J)}}N5.prototype.point=!1;class R5 extends L1{constructor(Z){super(-200000000,-200000000,null,Z)}eq(Z){return Z instanceof R5&&this.spec.class==Z.spec.class&&bK(this.spec.attributes,Z.spec.attributes)}range(Z,J=Z){if(J!=Z)throw RangeError("Line decoration ranges must be zero-length");return super.range(Z,J)}}R5.prototype.mapMode=C0.TrackBefore;R5.prototype.point=!0;class d9 extends L1{constructor(Z,J,Q,X,Y,K){super(J,Q,Y,Z);this.block=X,this.isReplace=K,this.mapMode=!X?C0.TrackDel:J<=0?C0.TrackBefore:C0.TrackAfter}get type(){return this.startSide!=this.endSide?F0.WidgetRange:this.startSide<=0?F0.WidgetBefore:F0.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(Z){return Z instanceof d9&&iD(this.widget,Z.widget)&&this.block==Z.block&&this.startSide==Z.startSide&&this.endSide==Z.endSide}range(Z,J=Z){if(this.isReplace&&(Z>J||Z==J&&this.startSide>0&&this.endSide<=0))throw RangeError("Invalid range for replacement decoration");if(!this.isReplace&&J!=Z)throw RangeError("Widget decorations can only have zero-length ranges");return super.range(Z,J)}}d9.prototype.point=!0;function xI(Z,J=!1){let{inclusiveStart:Q,inclusiveEnd:X}=Z;if(Q==null)Q=Z.inclusive;if(X==null)X=Z.inclusive;return{start:Q!==null&&Q!==void 0?Q:J,end:X!==null&&X!==void 0?X:J}}function iD(Z,J){return Z==J||!!(Z&&J&&Z.compare(J))}function f7(Z,J,Q,X=0){let Y=Q.length-1;if(Y>=0&&Q[Y]+X>=Z)Q[Y]=Math.max(Q[Y],J);else Q.push(Z,J)}class j5 extends B8{constructor(Z,J,Q){super();this.tagName=Z,this.attributes=J,this.rank=Q}eq(Z){return Z==this||Z instanceof j5&&this.tagName==Z.tagName&&bK(this.attributes,Z.attributes)}static create(Z){return new j5(Z.tagName,Z.attributes||EJ,Z.rank==null?50:Math.max(0,Math.min(Z.rank,100)))}static set(Z,J=!1){return N1.of(Z,J)}}j5.prototype.startSide=j5.prototype.endSide=-1;function H5(Z){let J;if(Z.nodeType==11)J=Z.getSelection?Z:Z.ownerDocument;else J=Z;return J.getSelection()}function jK(Z,J){return J?Z==J||Z.contains(J.nodeType!=1?J.parentNode:J):!1}function z5(Z,J){if(!J.anchorNode)return!1;try{return jK(Z,J.anchorNode)}catch(Q){return!1}}function DJ(Z){if(Z.nodeType==3)return O5(Z,0,Z.nodeValue.length).getClientRects();else if(Z.nodeType==1)return Z.getClientRects();else return[]}function I5(Z,J,Q,X){return Q?ez(Z,J,Q,X,-1)||ez(Z,J,Q,X,1):!1}function t8(Z){for(var J=0;;J++)if(Z=Z.previousSibling,!Z)return J}function CJ(Z){return Z.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(Z.nodeName)}function ez(Z,J,Q,X,Y){for(;;){if(Z==Q&&J==X)return!0;if(J==(Y<0?0:_8(Z))){if(Z.nodeName=="DIV")return!1;let K=Z.parentNode;if(!K||K.nodeType!=1)return!1;J=t8(Z)+(Y<0?0:1),Z=K}else if(Z.nodeType==1){if(Z=Z.childNodes[J+(Y<0?-1:0)],Z.nodeType==1&&Z.contentEditable=="false")return!1;J=Y<0?_8(Z):0}else return!1}}function _8(Z){return Z.nodeType==3?Z.nodeValue.length:Z.childNodes.length}function _J(Z,J){let{left:Q,right:X}=Z;if(Q==X)return Z;let Y=J?Q:X;return{left:Y,right:Y,top:Z.top,bottom:Z.bottom}}function rD(Z){let J=Z.visualViewport;if(J)return{left:0,right:J.width,top:0,bottom:J.height};return{left:0,right:Z.innerWidth,top:0,bottom:Z.innerHeight}}function wI(Z,J){let Q=J.width/Z.offsetWidth,X=J.height/Z.offsetHeight;if(Q>0.995&&Q<1.005||!isFinite(Q)||Math.abs(J.width-Z.offsetWidth)<1)Q=1;if(X>0.995&&X<1.005||!isFinite(X)||Math.abs(J.height-Z.offsetHeight)<1)X=1;return{scaleX:Q,scaleY:X}}function aD(Z,J,Q,X,Y,K,W,q){let G=Z.ownerDocument,U=G.defaultView||window;for(let z=Z,I=!1;z&&!I;)if(z.nodeType==1){let V,H=z==G.body,F=1,N=1;if(H)V=rD(U);else{if(/^(fixed|sticky)$/.test(getComputedStyle(z).position))I=!0;if(z.scrollHeight<=z.clientHeight&&z.scrollWidth<=z.clientWidth){z=z.assignedSlot||z.parentNode;continue}let S=z.getBoundingClientRect();({scaleX:F,scaleY:N}=wI(z,S)),V={left:S.left,right:S.left+z.clientWidth*F,top:S.top,bottom:S.top+z.clientHeight*N}}let R=0,T=0;if(Y=="nearest"){if(J.top<V.top+W){if(T=J.top-(V.top+W),Q>0&&J.bottom>V.bottom+T)T=J.bottom-V.bottom+W}else if(J.bottom>V.bottom-W){if(T=J.bottom-V.bottom+W,Q<0&&J.top-T<V.top)T=J.top-(V.top+W)}}else{let S=J.bottom-J.top,C=V.bottom-V.top;T=(Y=="center"&&S<=C?J.top+S/2-C/2:Y=="start"||Y=="center"&&Q<0?J.top-W:J.bottom-C+W)-V.top}if(X=="nearest"){if(J.left<V.left+K){if(R=J.left-(V.left+K),Q>0&&J.right>V.right+R)R=J.right-V.right+K}else if(J.right>V.right-K){if(R=J.right-V.right+K,Q<0&&J.left<V.left+R)R=J.left-(V.left+K)}}else R=(X=="center"?J.left+(J.right-J.left)/2-(V.right-V.left)/2:X=="start"==q?J.left-K:J.right-(V.right-V.left)+K)-V.left;if(R||T)if(H)U.scrollBy(R,T);else{let S=0,C=0;if(T){let k=z.scrollTop;z.scrollTop+=T/N,C=(z.scrollTop-k)*N}if(R){let k=z.scrollLeft;z.scrollLeft+=R/F,S=(z.scrollLeft-k)*F}if(J={left:J.left-S,top:J.top-C,right:J.right-S,bottom:J.bottom-C},S&&Math.abs(S-R)<1)X="nearest";if(C&&Math.abs(C-T)<1)Y="nearest"}if(H)break;if(J.top<V.top||J.bottom>V.bottom||J.left<V.left||J.right>V.right)J={left:Math.max(J.left,V.left),right:Math.min(J.right,V.right),top:Math.max(J.top,V.top),bottom:Math.min(J.bottom,V.bottom)};z=z.assignedSlot||z.parentNode}else if(z.nodeType==11)z=z.host;else break}function bI(Z,J=!0){let Q=Z.ownerDocument,X=null,Y=null;for(let K=Z.parentNode;K;)if(K==Q.body||(!J||X)&&Y)break;else if(K.nodeType==1){if(!Y&&K.scrollHeight>K.clientHeight)Y=K;if(J&&!X&&K.scrollWidth>K.clientWidth)X=K;K=K.assignedSlot||K.parentNode}else if(K.nodeType==11)K=K.host;else break;return{x:X,y:Y}}class yI{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(Z){return this.anchorNode==Z.anchorNode&&this.anchorOffset==Z.anchorOffset&&this.focusNode==Z.focusNode&&this.focusOffset==Z.focusOffset}setRange(Z){let{anchorNode:J,focusNode:Q}=Z;this.set(J,Math.min(Z.anchorOffset,J?_8(J):0),Q,Math.min(Z.focusOffset,Q?_8(Q):0))}set(Z,J,Q,X){this.anchorNode=Z,this.anchorOffset=J,this.focusNode=Q,this.focusOffset=X}}function $I(Z){let J=[];for(let Q=Z;Q;Q=Q.nodeType==11?Q.host:Q.parentNode)if(Q.nodeType==1)J.push({node:Q,left:Q.scrollLeft,top:Q.scrollTop});return J}function hI(Z,J=!0){for(let{node:Q,left:X,top:Y}of Z){if(J&&Q.scrollTop!=Y)Q.scrollTop=Y;if(Q.scrollLeft!=X)Q.scrollLeft=X}}var m9=null;if(r.safari&&r.safari_version>=26)m9=!1;function fI(Z){if(Z.setActive)return Z.setActive();if(m9)return Z.focus(m9);let J=$I(Z);if(Z.focus(m9==null?{get preventScroll(){return m9={preventScroll:!0},!0}}:void 0),!m9)m9=!1,hI(J)}var ZI;function O5(Z,J,Q=J){let X=ZI||(ZI=document.createRange());return X.setEnd(Z,Q),X.setStart(Z,J),X}function g7(Z,J,Q,X){let Y={key:J,code:J,keyCode:Q,which:Q,cancelable:!0};if(X)({altKey:Y.altKey,ctrlKey:Y.ctrlKey,shiftKey:Y.shiftKey,metaKey:Y.metaKey}=X);let K=new KeyboardEvent("keydown",Y);K.synthetic=!0,Z.dispatchEvent(K);let W=new KeyboardEvent("keyup",Y);return W.synthetic=!0,Z.dispatchEvent(W),K.defaultPrevented||W.defaultPrevented}function oD(Z){while(Z){if(Z&&(Z.nodeType==9||Z.nodeType==11&&Z.host))return Z;Z=Z.assignedSlot||Z.parentNode}return null}function tD(Z,J){let{focusNode:Q,focusOffset:X}=J;if(!Q||J.anchorNode!=Q||J.anchorOffset!=X)return!1;X=Math.min(X,_8(Q));for(;;)if(X){if(Q.nodeType!=1)return!1;let Y=Q.childNodes[X-1];if(Y.contentEditable=="false")X--;else Q=Y,X=_8(Q)}else if(Q==Z)return!0;else X=t8(Q),Q=Q.parentNode}function gI(Z){if(Z instanceof Window)return Z.pageYOffset>Math.max(0,Z.document.documentElement.scrollHeight-Z.innerHeight-4);return Z.scrollTop>Math.max(1,Z.scrollHeight-Z.clientHeight-4)}function uI(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X>0)return{node:Q,offset:X};else if(Q.nodeType==1&&X>0){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X-1],X=_8(Q)}else if(Q.parentNode&&!CJ(Q))X=t8(Q),Q=Q.parentNode;else return null}function vI(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X<Q.nodeValue.length)return{node:Q,offset:X};else if(Q.nodeType==1&&X<Q.childNodes.length){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X],X=0}else if(Q.parentNode&&!CJ(Q))X=t8(Q)+1,Q=Q.parentNode;else return null}class w6{constructor(Z,J,Q=!0){this.node=Z,this.offset=J,this.precise=Q}static before(Z,J){return new w6(Z.parentNode,t8(Z),J)}static after(Z,J){return new w6(Z.parentNode,t8(Z)+1,J)}}var k1=function(Z){return Z[Z.LTR=0]="LTR",Z[Z.RTL=1]="RTL",Z}(k1||(k1={})),n9=k1.LTR,yK=k1.RTL;function mI(Z){let J=[];for(let Q=0;Q<Z.length;Q++)J.push(1<<+Z[Q]);return J}var eD=mI("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),ZM=mI("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),HK=Object.create(null),o6=[];for(let Z of["()","[]","{}"]){let J=Z.charCodeAt(0),Q=Z.charCodeAt(1);HK[J]=Q,HK[Q]=-J}function pI(Z){return Z<=247?eD[Z]:1424<=Z&&Z<=1524?2:1536<=Z&&Z<=1785?ZM[Z-1536]:1774<=Z&&Z<=2220?4:8192<=Z&&Z<=8204?256:64336<=Z&&Z<=65023?4:1}var JM=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class b6{get dir(){return this.level%2?yK:n9}constructor(Z,J,Q){this.from=Z,this.to=J,this.level=Q}side(Z,J){return this.dir==J==Z?this.to:this.from}forward(Z,J){return Z==(this.dir==J)}static find(Z,J,Q,X){let Y=-1;for(let K=0;K<Z.length;K++){let W=Z[K];if(W.from<=J&&W.to>=J){if(W.level==Q)return K;if(Y<0||(X!=0?X<0?W.from<J:W.to>J:Z[Y].level>W.level))Y=K}}if(Y<0)throw RangeError("Index out of range");return Y}}function cI(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.direction!=Y.direction||!cI(X.inner,Y.inner))return!1}return!0}var y1=[];function QM(Z,J,Q,X,Y){for(let K=0;K<=X.length;K++){let W=K?X[K-1].to:J,q=K<X.length?X[K].from:Q,G=K?256:Y;for(let U=W,z=G,I=G;U<q;U++){let V=pI(Z.charCodeAt(U));if(V==512)V=z;else if(V==8&&I==4)V=16;if(y1[U]=V==4?2:V,V&7)I=V;z=V}for(let U=W,z=G,I=G;U<q;U++){let V=y1[U];if(V==128)if(U<q-1&&z==y1[U+1]&&z&24)V=y1[U]=z;else y1[U]=256;else if(V==64){let H=U+1;while(H<q&&y1[H]==64)H++;let F=U&&z==8||H<Q&&y1[H]==8?I==1?1:8:256;for(let N=U;N<H;N++)y1[N]=F;U=H-1}else if(V==8&&I==1)y1[U]=1;if(z=V,V&7)I=V}}}function XM(Z,J,Q,X,Y){let K=Y==1?2:1;for(let W=0,q=0,G=0;W<=X.length;W++){let U=W?X[W-1].to:J,z=W<X.length?X[W].from:Q;for(let I=U,V,H,F;I<z;I++)if(H=HK[V=Z.charCodeAt(I)])if(H<0){for(let N=q-3;N>=0;N-=3)if(o6[N+1]==-H){let R=o6[N+2],T=R&2?Y:!(R&4)?0:R&1?K:Y;if(T)y1[I]=y1[o6[N]]=T;q=N;break}}else if(o6.length==189)break;else o6[q++]=I,o6[q++]=V,o6[q++]=G;else if((F=y1[I])==2||F==1){let N=F==Y;G=N?0:1;for(let R=q-3;R>=0;R-=3){let T=o6[R+2];if(T&2)break;if(N)o6[R+2]|=2;else{if(T&4)break;o6[R+2]|=4}}}}}function YM(Z,J,Q,X){for(let Y=0,K=X;Y<=Q.length;Y++){let W=Y?Q[Y-1].to:Z,q=Y<Q.length?Q[Y].from:J;for(let G=W;G<q;){let U=y1[G];if(U==256){let z=G+1;for(;;)if(z==q){if(Y==Q.length)break;z=Q[Y++].to,q=Y<Q.length?Q[Y].from:J}else if(y1[z]==256)z++;else break;let I=K==1,V=(z<J?y1[z]:X)==1,H=I==V?I?1:2:X;for(let F=z,N=Y,R=N?Q[N-1].to:Z;F>G;){if(F==R)F=Q[--N].from,R=N?Q[N-1].to:Z;y1[--F]=H}G=z}else K=U,G++}}}function OK(Z,J,Q,X,Y,K,W){let q=X%2?2:1;if(X%2==Y%2)for(let G=J,U=0;G<Q;){let z=!0,I=!1;if(U==K.length||G<K[U].from){let N=y1[G];if(N!=q)z=!1,I=N==16}let V=!z&&q==1?[]:null,H=z?X:X+1,F=G;Z:for(;;)if(U<K.length&&F==K[U].from){if(I)break Z;let N=K[U];if(!z)for(let R=N.to,T=U+1;;){if(R==Q)break Z;if(T<K.length&&K[T].from==R)R=K[T++].to;else if(y1[R]==q)break Z;else break}if(U++,V)V.push(N);else{if(N.from>G)W.push(new b6(G,N.from,H));let R=N.direction==n9!=!(H%2);FK(Z,R?X+1:X,Y,N.inner,N.from,N.to,W),G=N.to}F=N.to}else if(F==Q||(z?y1[F]!=q:y1[F]==q))break;else F++;if(V)OK(Z,G,F,X+1,Y,V,W);else if(G<F)W.push(new b6(G,F,H));G=F}else for(let G=Q,U=K.length;G>J;){let z=!0,I=!1;if(!U||G>K[U-1].to){let N=y1[G-1];if(N!=q)z=!1,I=N==16}let V=!z&&q==1?[]:null,H=z?X:X+1,F=G;Z:for(;;)if(U&&F==K[U-1].to){if(I)break Z;let N=K[--U];if(!z)for(let R=N.from,T=U;;){if(R==J)break Z;if(T&&K[T-1].to==R)R=K[--T].from;else if(y1[R-1]==q)break Z;else break}if(V)V.push(N);else{if(N.to<G)W.push(new b6(N.to,G,H));let R=N.direction==n9!=!(H%2);FK(Z,R?X+1:X,Y,N.inner,N.from,N.to,W),G=N.from}F=N.from}else if(F==J||(z?y1[F-1]!=q:y1[F-1]==q))break;else F--;if(V)OK(Z,F,G,X+1,Y,V,W);else if(F<G)W.push(new b6(F,G,H));G=F}}function FK(Z,J,Q,X,Y,K,W){let q=J%2?2:1;QM(Z,Y,K,X,q),XM(Z,Y,K,X,q),YM(Y,K,X,q),OK(Z,Y,K,J,Q,X,W)}function KM(Z,J,Q){if(!Z)return[new b6(0,0,J==yK?1:0)];if(J==n9&&!Q.length&&!JM.test(Z))return dI(Z.length);if(Q.length)while(Z.length>y1.length)y1[y1.length]=256;let X=[],Y=J==n9?0:1;return FK(Z,Y,Y,Q,0,Z.length,X),X}function dI(Z){return[new b6(0,Z,0)]}var nI="";function WM(Z,J,Q,X,Y){var K;let W=X.head-Z.from,q=b6.find(J,W,(K=X.bidiLevel)!==null&&K!==void 0?K:-1,X.assoc),G=J[q],U=G.side(Y,Q);if(W==U){let V=q+=Y?1:-1;if(V<0||V>=J.length)return null;G=J[q=V],W=G.side(!Y,Q),U=G.side(Y,Q)}let z=z0(Z.text,W,G.forward(Y,Q));if(z<G.from||z>G.to)z=U;nI=Z.text.slice(Math.min(W,z),Math.max(W,z));let I=q==(Y?J.length-1:0)?null:J[q+(Y?1:-1)];if(I&&z==U&&I.level+(Y?0:1)<G.level)return h.cursor(I.side(!Y,Q)+Z.from,I.forward(Y,Q)?1:-1,I.level);return h.cursor(z+Z.from,G.forward(Y,Q)?-1:1,G.level)}function qM(Z,J,Q){for(let X=J;X<Q;X++){let Y=pI(Z.charCodeAt(X));if(Y==1)return n9;if(Y==2||Y==4)return yK}return n9}var lI=o.define(),sI=o.define(),iI=o.define(),rI=o.define(),NK=o.define(),aI=o.define(),oI=o.define(),$K=o.define(),hK=o.define(),tI=o.define({combine:(Z)=>Z.some((J)=>J)}),eI=o.define({combine:(Z)=>Z.some((J)=>J)}),ZV=o.define();class u7{constructor(Z,J,Q,X,Y,K=!1){this.range=Z,this.y=J,this.x=Q,this.yMargin=X,this.xMargin=Y,this.isSnapshot=K}map(Z){return Z.empty?this:new u7(this.range.map(Z),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(Z){return this.range.to<=Z.doc.length?this:new u7(h.cursor(Z.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}var zJ=B1.define({map:(Z,J)=>Z.map(J)}),JV=B1.define();function a0(Z,J,Q){let X=Z.facet(rI);if(X.length)X[0](J);else if(window.onerror&&window.onerror(String(J),Q,void 0,void 0,J));else if(Q)console.error(Q+":",J);else console.error(J)}var E8=o.define({combine:(Z)=>Z.length?Z[0]:!0}),GM=0,$7=o.define({combine(Z){return Z.filter((J,Q)=>{for(let X=0;X<Q;X++)if(Z[X].plugin==J.plugin)return!1;return!0})}});class A0{constructor(Z,J,Q,X,Y){this.id=Z,this.create=J,this.domEventHandlers=Q,this.domEventObservers=X,this.baseExtensions=Y(this),this.extension=this.baseExtensions.concat($7.of({plugin:this,arg:void 0}))}of(Z){return this.baseExtensions.concat($7.of({plugin:this,arg:Z}))}static define(Z,J){let{eventHandlers:Q,eventObservers:X,provide:Y,decorations:K}=J||{};return new A0(GM++,Z,Q,X,(W)=>{let q=[];if(K)q.push(fJ.of((G)=>{let U=G.plugin(W);return U?K(U):L1.none}));if(Y)q.push(Y(W));return q})}static fromClass(Z,J){return A0.define((Q,X)=>new Z(Q,X),J)}}class MJ{constructor(Z){this.spec=Z,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(Z){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(Z,this.spec.arg)}catch(J){a0(Z.state,J,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let J=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(J)}catch(Q){if(a0(J.state,Q,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(X){}this.deactivate()}}return this}destroy(Z){var J;if((J=this.value)===null||J===void 0?void 0:J.destroy)try{this.value.destroy()}catch(Q){a0(Z.state,Q,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}var QV=o.define(),fK=o.define(),fJ=o.define(),XV=o.define(),gK=o.define(),D5=o.define(),YV=o.define();function JI(Z,J){let Q=Z.state.facet(YV);if(!Q.length)return Q;let X=Q.map((K)=>K instanceof Function?K(Z):K),Y=[];return N1.spans(X,J.from,J.to,{point(){},span(K,W,q,G){let U=K-J.from,z=W-J.from,I=Y;for(let V=q.length-1;V>=0;V--,G--){let H=q[V].spec.bidiIsolate,F;if(H==null)H=qM(J.text,U,z);if(G>0&&I.length&&(F=I[I.length-1]).to==U&&F.direction==H)F.to=z,I=F.inner;else{let N={from:U,to:z,direction:H,inner:[]};I.push(N),I=N.inner}}}}),Y}var KV=o.define();function uK(Z){let J=0,Q=0,X=0,Y=0;for(let K of Z.state.facet(KV)){let W=K(Z);if(W){if(W.left!=null)J=Math.max(J,W.left);if(W.right!=null)Q=Math.max(Q,W.right);if(W.top!=null)X=Math.max(X,W.top);if(W.bottom!=null)Y=Math.max(Y,W.bottom)}}return{left:J,right:Q,top:X,bottom:Y}}var W5=o.define();class W6{constructor(Z,J,Q,X){this.fromA=Z,this.toA=J,this.fromB=Q,this.toB=X}join(Z){return new W6(Math.min(this.fromA,Z.fromA),Math.max(this.toA,Z.toA),Math.min(this.fromB,Z.fromB),Math.max(this.toB,Z.toB))}addToSet(Z){let J=Z.length,Q=this;for(;J>0;J--){let X=Z[J-1];if(X.fromA>Q.toA)continue;if(X.toA<Q.fromA)break;Q=Q.join(X),Z.splice(J-1,1)}return Z.splice(J,0,Q),Z}static extendWithRanges(Z,J){if(J.length==0)return Z;let Q=[];for(let X=0,Y=0,K=0;;){let W=X<Z.length?Z[X].fromB:1e9,q=Y<J.length?J[Y]:1e9,G=Math.min(W,q);if(G==1e9)break;let U=G+K,z=G,I=U;for(;;)if(Y<J.length&&J[Y]<=z){let V=J[Y+1];Y+=2,z=Math.max(z,V);for(let H=X;H<Z.length&&Z[H].fromB<=z;H++)K=Z[H].toA-Z[H].toB;I=Math.max(I,V+K)}else if(X<Z.length&&Z[X].fromB<=z){let V=Z[X++];z=Math.max(z,V.toB),I=Math.max(I,V.toA),K=V.toA-V.toB}else break;Q.push(new W6(U,I,G,z))}return Q}}class kJ{constructor(Z,J,Q){this.view=Z,this.state=J,this.transactions=Q,this.flags=0,this.startState=Z.state,this.changes=a1.empty(this.startState.doc.length);for(let Y of Q)this.changes=this.changes.compose(Y.changes);let X=[];this.changes.iterChangedRanges((Y,K,W,q)=>X.push(new W6(Y,K,W,q))),this.changedRanges=X}static create(Z,J,Q){return new kJ(Z,J,Q)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some((Z)=>Z.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}var UM=[];class d1{constructor(Z,J,Q=0){this.dom=Z,this.length=J,this.flags=Q,this.parent=null,Z.cmTile=this}get breakAfter(){return this.flags&1}get children(){return UM}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(Z){if(this.flags|=2,this.flags&4){this.flags&=-5;let J=this.domAttrs;if(J)lD(this.dom,J)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(Z){this.dom=Z,Z.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(Z,J=this.posAtStart){let Q=J;for(let X of this.children){if(X==Z)return Q;Q+=X.length+X.breakAfter}throw RangeError("Invalid child in posBefore")}posAfter(Z){return this.posBefore(Z)+Z.length}covers(Z){return!0}coordsIn(Z,J,Q){return null}domPosFor(Z,J){let Q=t8(this.dom),X=this.length?Z>0:J>0;return new w6(this.parent.dom,Q+(X?1:0),Z==0||Z==this.length)}markDirty(Z){if(this.flags&=-3,Z)this.flags|=4;if(this.parent&&this.parent.flags&2)this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let Z=this;Z;Z=Z.parent)if(Z instanceof A5)return Z;return null}static get(Z){return Z.cmTile}}class M5 extends d1{constructor(Z){super(Z,0);this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(Z){this.children.push(Z),Z.parent=this}sync(Z){if(this.flags&2)return;super.sync(Z);let J=this.dom,Q=null,X,Y=(Z===null||Z===void 0?void 0:Z.node)==J?Z:null,K=0;for(let W of this.children){if(W.sync(Z),K+=W.length+W.breakAfter,X=Q?Q.nextSibling:J.firstChild,Y&&X!=W.dom)Y.written=!0;if(W.dom.parentNode==J)while(X&&X!=W.dom)X=QI(X);else J.insertBefore(W.dom,X);Q=W.dom}if(X=Q?Q.nextSibling:J.firstChild,Y&&X)Y.written=!0;while(X)X=QI(X);this.length=K}}function QI(Z){let J=Z.nextSibling;return Z.parentNode.removeChild(Z),J}class A5 extends M5{constructor(Z,J){super(J);this.view=Z}owns(Z){for(;Z;Z=Z.parent)if(Z==this)return!0;return!1}isBlock(){return!0}nearest(Z){for(;;){if(!Z)return null;let J=d1.get(Z);if(J&&this.owns(J))return J;Z=Z.parentNode}}blockTiles(Z){for(let J=[],Q=this,X=0,Y=0;;)if(X==Q.children.length){if(!J.length)return;if(Q=Q.parent,Q.breakAfter)Y++;X=J.pop()}else{let K=Q.children[X++];if(K instanceof C8)J.push(X),Q=K,X=0;else{let W=Y+K.length,q=Z(K,Y);if(q!==void 0)return q;Y=W+K.breakAfter}}}resolveBlock(Z,J){let Q,X=-1,Y,K=-1;if(this.blockTiles((W,q)=>{let G=q+W.length;if(Z>=q&&Z<=G){if(W.isWidget()&&J>=-1&&J<=1){if(W.flags&32)return!0;if(W.flags&16)Q=void 0}if((q<Z||Z==G&&(J<-1?W.length:W.covers(1)))&&(!Q||!W.isWidget()&&Q.isWidget()))Q=W,X=Z-q;if((G>Z||Z==q&&(J>1?W.length:W.covers(-1)))&&(!Y||!W.isWidget()&&Y.isWidget()))Y=W,K=Z-q}}),!Q&&!Y)throw Error("No tile at position "+Z);return Q&&J<0||!Y?{tile:Q,offset:X}:{tile:Y,offset:K}}}class C8 extends M5{constructor(Z,J){super(Z);this.wrapper=J}isBlock(){return!0}covers(Z){if(!this.children.length)return!1;return Z<0?this.children[0].covers(-1):this.lastChild.covers(1)}get domAttrs(){return this.wrapper.attributes}static of(Z,J){let Q=new C8(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class v7 extends M5{constructor(Z,J){super(Z);this.attrs=J}isLine(){return!0}static start(Z,J,Q){let X=new v7(J||document.createElement("div"),Z);if(!J||!Q)X.flags|=4;return X}get domAttrs(){return this.attrs}resolveInline(Z,J,Q){let X=null,Y=-1,K=null,W=-1;function q(U,z){for(let I=0,V=0;I<U.children.length&&V<=z;I++){let H=U.children[I],F=V+H.length;if(F>=z){if(H.isComposite())q(H,z-V);else if((!K||K.isHidden&&(J>0&&!(K.flags&32)||Q&&IM(K,H)))&&(F>z||H.flags&32&&J<=1))K=H,W=z-V;else if(V<z||H.flags&16&&!H.isHidden&&J>=-1)X=H,Y=z-V}V=F}}q(this,Z);let G=(J<0?X:K)||X||K;return G?{tile:G,offset:G==X?Y:W}:null}coordsIn(Z,J,Q){let X=this.resolveInline(Z,J,!0);if(!X)return zM(this);return X.tile.coordsIn(Math.max(0,X.offset),J,Q)}domIn(Z,J){let Q=this.resolveInline(Z,J);if(Q){let{tile:X,offset:Y}=Q;if(this.dom.contains(X.dom)){if(X.isText())return new w6(X.dom,Math.min(X.dom.nodeValue.length,Y));return X.domPosFor(Y,X.flags&16?1:X.flags&32?-1:J)}let K=Q.tile.parent,W=!1;for(let q of K.children){if(W)return new w6(q.dom,0);if(q==Q.tile)W=!0}}return new w6(this.dom,0)}}function zM(Z){let J=Z.dom.lastChild;if(!J)return Z.dom.getBoundingClientRect();let Q=DJ(J);return Q[Q.length-1]||null}function IM(Z,J){let Q=Z.coordsIn(0,1),X=J.coordsIn(0,1);return Q&&X&&X.top<Q.bottom}class v0 extends M5{constructor(Z,J){super(Z);this.mark=J}get domAttrs(){return this.mark.attrs}static of(Z,J){let Q=new v0(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class p9 extends d1{constructor(Z,J){super(Z,J.length);this.text=J}sync(Z){if(this.flags&2)return;if(super.sync(Z),this.dom.nodeValue!=this.text){if(Z&&Z.node==this.dom)Z.written=!0;this.dom.nodeValue=this.text}}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(Z,J,Q){let X=this.dom.nodeValue.length;if(Z>X)Z=X;let Y=Z,K=Z,W=0;if(Z==0&&J<0||Z==X&&J>=0){if(!(r.chrome||r.gecko)){if(Z)Y--,W=1;else if(K<X)K++,W=-1}}else if(J<0)Y--;else if(K<X)K++;let q=O5(this.dom,Y,K).getClientRects();if(!q.length)return null;let G=q[(W?W<0:J>=0)?0:q.length-1];if(r.safari&&!W&&G.width==0)G=Array.prototype.find.call(q,(U)=>U.width)||G;return Q==null?G:_J(G,(W?W>0:J<0)==Q)}static of(Z,J){let Q=new p9(J||document.createTextNode(Z),Z);if(!J)Q.flags|=2;return Q}}class l9 extends d1{constructor(Z,J,Q,X){super(Z,J,X);this.widget=Q}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(Z){if(this.flags&48)return!1;return(this.flags&(Z<0?64:128))>0}coordsIn(Z,J){return this.coordsInWidget(Z,J,!1)}coordsInWidget(Z,J,Q){let X=this.widget.coordsAt(this.dom,Z,J);if(X)return X;if(Q)return _J(this.dom.getBoundingClientRect(),this.length?Z==0:J<=0);else{let Y=this.dom.getClientRects(),K=null;if(!Y.length)return null;let W=this.flags&16?!0:this.flags&32?!1:Z>0;for(let q=W?Y.length-1:0;;q+=W?-1:1)if(K=Y[q],Z>0?q==0:q==Y.length-1||K.top<K.bottom)break;return _J(K,!W)}}get overrideDOMText(){if(!this.length)return R1.empty;let{root:Z}=this;if(!Z)return R1.empty;let J=this.posAtStart;return Z.view.state.doc.slice(J,J+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(Z,J,Q,X,Y){if(!Y){if(Y=Z.toDOM(J),!Z.editable)Y.contentEditable="false"}return new l9(Y,Q,Z,X)}}class F5 extends d1{constructor(Z){let J=document.createElement("img");J.className="cm-widgetBuffer",J.setAttribute("aria-hidden","true");super(J,0,Z)}get isHidden(){return!0}get overrideDOMText(){return R1.empty}coordsIn(Z,J,Q){let X=this.dom.getBoundingClientRect();return Q==null?X:_J(X,J>0==Q)}}class WV{constructor(Z){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=Z}advance(Z,J,Q){let{tile:X,index:Y,beforeBreak:K,parents:W}=this;while(Z||J>0)if(!X.isComposite()){let q=X.length;if(Y<q&&Z){let G=Math.min(Z,q-Y);if(Q)Q.skip(X,Y,Y+G);Z-=G,Y+=G}if(Y==q)K=!!X.breakAfter,{tile:X,index:Y}=W.pop(),Y++;else if(!Z)break}else if(K){if(!Z)break;if(Q)Q.break();Z--,K=!1}else if(Y==X.children.length){if(!Z&&!W.length)break;if(Q)Q.leave(X);K=!!X.breakAfter,{tile:X,index:Y}=W.pop(),Y++}else{let q=X.children[Y],G=q.breakAfter;if((J>0?q.length<=Z:q.length<Z)&&(!Q||Q.skip(q,0,q.length)!==!1||!q.isComposite))K=!!G,Y++,Z-=q.length;else if(W.push({tile:X,index:Y}),X=q,Y=0,Q&&q.isComposite())Q.enter(q)}return this.tile=X,this.index=Y,this.beforeBreak=K,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class qV{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.wrapper=Q,this.rank=X}}class GV{constructor(Z,J,Q){this.cache=Z,this.root=J,this.blockWrappers=Q,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(Z,J,Q,X){var Y;this.flushBuffer();let K=this.ensureMarks(J,Q),W=K.lastChild;if(W&&W.isText()&&!(W.flags&8)&&W.length+Z.length<512){this.cache.reused.set(W,2);let q=K.children[K.children.length-1]=new p9(W.dom,W.text+Z);q.parent=K}else K.append(X||p9.of(Z,(Y=this.cache.find(p9))===null||Y===void 0?void 0:Y.dom));this.pos+=Z.length,this.afterWidget=null}addComposition(Z,J){let Q=this.curLine;if(Q.dom!=J.line.dom)Q.setDOM(this.cache.reused.has(J.line)?QK(J.line.dom):J.line.dom),this.cache.reused.set(J.line,2);let X=Q;for(let W=J.marks.length-1;W>=0;W--){let q=J.marks[W],G=X.lastChild;if(G instanceof v0&&G.mark.eq(q.mark)){if(G.dom!=q.dom)G.setDOM(QK(q.dom));X=G}else{if(this.cache.reused.get(q)){let z=d1.get(q.dom);if(z)z.setDOM(QK(q.dom))}let U=v0.of(q.mark,q.dom);X.append(U),X=U}this.cache.reused.set(q,2)}let Y=d1.get(Z.text);if(Y)this.cache.reused.set(Y,2);let K=new p9(Z.text,Z.text.nodeValue);K.flags|=8,this.pos=Z.range.toB,X.append(K)}addInlineWidget(Z,J,Q){let X=this.afterWidget&&Z.flags&48&&(this.afterWidget.flags&48)==(Z.flags&48);if(!X)this.flushBuffer();let Y=this.ensureMarks(J,Q);if(!X&&!(Z.flags&16))Y.append(this.getBuffer(1));Y.append(Z),this.pos+=Z.length,this.afterWidget=Z}addMark(Z,J,Q){this.flushBuffer(),this.ensureMarks(J,Q).append(Z),this.pos+=Z.length,this.afterWidget=null}addBlockWidget(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}continueWidget(Z){let J=this.afterWidget||this.lastBlock;J.length+=Z,this.pos+=Z}addLineStart(Z,J){var Q;if(!Z)Z=VV;let X=v7.start(Z,J||((Q=this.cache.find(v7))===null||Q===void 0?void 0:Q.dom),!!J);this.getBlockPos().append(this.lastBlock=this.curLine=X)}addLine(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(Z){if(!this.blockPosCovered())this.addLineStart(Z)}ensureLine(Z){if(!this.curLine)this.addLineStart(Z)}ensureMarks(Z,J){var Q;let X=this.curLine;for(let Y=Z.length-1;Y>=0;Y--){let K=Z[Y],W;if(J>0&&(W=X.lastChild)&&W instanceof v0&&W.mark.eq(K))X=W,J--;else{let q=v0.of(K,(Q=this.cache.find(v0,(G)=>G.mark.eq(K)))===null||Q===void 0?void 0:Q.dom);X.append(q),X=q,J=0}}return X}endLine(){if(this.curLine){this.flushBuffer();let Z=this.curLine.lastChild;if(!Z||!XI(this.curLine,!1)||Z.dom.nodeName!="BR"&&Z.isWidget()&&!(r.ios&&XI(this.curLine,!0)))this.curLine.append(this.cache.findWidget(XK,0,32)||new l9(XK.toDOM(),0,XK,32));this.curLine=this.afterWidget=null}}updateBlockWrappers(){if(this.wrapperPos>this.pos+1e4)this.blockWrappers.goto(this.pos),this.wrappers.length=0;for(let Z=this.wrappers.length-1;Z>=0;Z--)if(this.wrappers[Z].to<this.pos)this.wrappers.splice(Z,1);for(let Z=this.blockWrappers;Z.value&&Z.from<=this.pos;Z.next())if(Z.to>=this.pos){let J=Z.rank*102+Z.value.rank,Q=new qV(Z.from,Z.to,Z.value,J),X=this.wrappers.length;while(X>0&&(this.wrappers[X-1].rank-Q.rank||this.wrappers[X-1].to-Q.to)<0)X--;this.wrappers.splice(X,0,Q)}this.wrapperPos=this.pos}getBlockPos(){var Z;this.updateBlockWrappers();let J=this.root;for(let Q of this.wrappers){let X=J.lastChild;if(Q.from<this.pos&&X instanceof C8&&X.wrapper.eq(Q.wrapper))J=X;else{let Y=C8.of(Q.wrapper,(Z=this.cache.find(C8,(K)=>K.wrapper.eq(Q.wrapper)))===null||Z===void 0?void 0:Z.dom);J.append(Y),J=Y}}return J}blockPosCovered(){let Z=this.lastBlock;return Z!=null&&!Z.breakAfter&&(!Z.isWidget()||(Z.flags&160)>0)}getBuffer(Z){let J=2|(Z<0?16:32),Q=this.cache.find(F5,void 0,1);if(Q)Q.flags=J;return Q||new F5(J)}flushBuffer(){if(this.afterWidget&&!(this.afterWidget.flags&32))this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null}}class UV{constructor(Z){this.skipCount=0,this.text="",this.textOff=0,this.cursor=Z.iter()}skip(Z){if(this.textOff+Z<=this.text.length)this.textOff+=Z;else this.skipCount+=Z-(this.text.length-this.textOff),this.text="",this.textOff=0}next(Z){if(this.textOff==this.text.length){let{value:X,lineBreak:Y,done:K}=this.cursor.next(this.skipCount);if(this.skipCount=0,K)throw Error("Ran out of text content when drawing inline views");this.text=X;let W=this.textOff=Math.min(Z,X.length);return Y?null:X.slice(0,W)}let J=Math.min(this.text.length,this.textOff+Z),Q=this.text.slice(this.textOff,J);return this.textOff=J,Q}}var xJ=[l9,v7,p9,v0,F5,C8,A5];for(let Z=0;Z<xJ.length;Z++)xJ[Z].bucket=Z;class zV{constructor(Z){this.view=Z,this.buckets=xJ.map(()=>[]),this.index=xJ.map(()=>0),this.reused=new Map}add(Z){let J=Z.constructor.bucket,Q=this.buckets[J];if(Q.length<6)Q.push(Z);else Q[this.index[J]=(this.index[J]+1)%6]=Z}find(Z,J,Q=2){let X=Z.bucket,Y=this.buckets[X],K=this.index[X];for(let W=0;W<Y.length;W++){let q=(W+K)%Y.length,G=Y[q];if((!J||J(G))&&!this.reused.has(G)){if(Y.splice(q,1),q<K)this.index[X]--;return this.reused.set(G,Q),G}}return null}findWidget(Z,J,Q){let X=this.buckets[0];if(X.length)for(let Y=0,K=0;;Y++){if(Y==X.length){if(K)return null;K=1,Y=0}let W=X[Y];if(!this.reused.has(W)&&(K==0?W.widget.compare(Z):W.widget.constructor==Z.constructor&&Z.updateDOM(W.dom,this.view,W.widget))){if(X.splice(Y,1),Y<this.index[0])this.index[0]--;if(W.widget==Z&&W.length==J&&(W.flags&497)==Q)return this.reused.set(W,1),W;else return this.reused.set(W,2),new l9(W.dom,J,Z,W.flags&-498|Q)}}}reuse(Z){return this.reused.set(Z,1),Z}maybeReuse(Z,J=2){if(this.reused.has(Z))return;return this.reused.set(Z,J),Z.dom}clear(){for(let Z=0;Z<this.buckets.length;Z++)this.buckets[Z].length=this.index[Z]=0}}class IV{constructor(Z,J,Q,X,Y){this.view=Z,this.decorations=X,this.disallowBlockEffectsFor=Y,this.openWidget=!1,this.openMarks=0,this.cache=new zV(Z),this.text=new UV(Z.state.doc),this.builder=new GV(this.cache,new A5(Z,Z.contentDOM),N1.iter(Q)),this.cache.reused.set(J,2),this.old=new WV(J),this.reuseWalker={skip:(K,W,q)=>{if(this.cache.add(K),K.isComposite())return!1},enter:(K)=>this.cache.add(K),leave:()=>{},break:()=>{}}}run(Z,J){let Q=J&&this.getCompositionContext(J.text);for(let X=0,Y=0,K=0;;){let W=K<Z.length?Z[K++]:null,q=W?W.fromA:this.old.root.length;if(q>X){let G=q-X;this.preserve(G,!K,!W),X=q,Y+=G}if(!W)break;if(J&&W.fromA<=J.range.fromA&&W.toA>=J.range.toA)this.forward(W.fromA,J.range.fromA,J.range.fromA<J.range.toA?1:-1),this.emit(Y,J.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(J,Q),this.text.skip(J.range.toB-J.range.fromB),this.forward(J.range.fromA,W.toA),this.emit(J.range.toB,W.toB);else this.forward(W.fromA,W.toA),this.emit(Y,W.toB);Y=W.toB,X=W.toA}if(this.builder.curLine)this.builder.endLine();return this.builder.root}preserve(Z,J,Q){let X=HM(this.old),Y=this.openMarks;this.old.advance(Z,Q?1:-1,{skip:(K,W,q)=>{if(K.isWidget())if(this.openWidget)this.builder.continueWidget(q-W);else{let G=q>0||W<K.length?l9.of(K.widget,this.view,q-W,K.flags&496,this.cache.maybeReuse(K)):this.cache.reuse(K);if(G.flags&256)G.flags&=-2,this.builder.addBlockWidget(G);else this.builder.ensureLine(null),this.builder.addInlineWidget(G,X,Y),Y=X.length}else if(K.isText()){if(this.builder.ensureLine(null),!W&&q==K.length&&!this.cache.reused.has(K))this.builder.addText(K.text,X,Y,this.cache.reuse(K));else this.cache.add(K),this.builder.addText(K.text.slice(W,q),X,Y);Y=X.length}else if(K.isLine())K.flags&=-2,this.cache.reused.set(K,1),this.builder.addLine(K);else if(K instanceof F5)this.cache.add(K);else if(K instanceof v0)this.builder.ensureLine(null),this.builder.addMark(K,X,Y),this.cache.reused.set(K,1),Y=X.length;else return!1;this.openWidget=!1},enter:(K)=>{if(K.isLine())this.builder.addLineStart(K.attrs,this.cache.maybeReuse(K));else if(this.cache.add(K),K instanceof v0)X.unshift(K.mark);this.openWidget=!1},leave:(K)=>{if(K.isLine()){if(X.length)X.length=Y=0}else if(K instanceof v0)X.shift(),Y=Math.min(Y,X.length)},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(Z)}emit(Z,J){let Q=null,X=this.builder,Y=-1,K=N1.spans(this.decorations,Z,J,{point:(W,q,G,U,z,I)=>{if(G instanceof d9){if(this.disallowBlockEffectsFor[I]){if(G.block)throw RangeError("Block decorations may not be specified via plugins");if(q>this.view.state.doc.lineAt(W).to)throw RangeError("Decorations that replace line breaks may not be specified via plugins")}if(Y=U.length,z>U.length)X.continueWidget(q-W);else{let V=G.widget||(G.block?s9.block:s9.inline),H=VM(G),F=this.cache.findWidget(V,q-W,H)||l9.of(V,this.view,q-W,H);if(G.block){if(G.startSide>0)X.addLineStartIfNotCovered(Q);X.addBlockWidget(F)}else X.ensureLine(Q),X.addInlineWidget(F,U,z)}Q=null}else Q=jM(Q,G);if(q>W)this.text.skip(q-W)},span:(W,q,G,U)=>{for(let z=W;z<q;){let I=this.text.next(Math.min(512,q-z));if(I==null)X.addLineStartIfNotCovered(Q),X.addBreak(),z++;else X.ensureLine(Q),X.addText(I,G,z==W?U:G.length),z+=I.length;Q=null}Y=G.length}});if(Y>-1)this.openWidget=K>Y;if(!this.openWidget)X.addLineStartIfNotCovered(Q);this.openMarks=K}forward(Z,J,Q=1){if(J-Z<=10)this.old.advance(J-Z,Q,this.reuseWalker);else this.old.advance(5,-1,this.reuseWalker),this.old.advance(J-Z-10,-1),this.old.advance(5,Q,this.reuseWalker)}getCompositionContext(Z){let J=[],Q=null;for(let X=Z.parentNode;;X=X.parentNode){let Y=d1.get(X);if(X==this.view.contentDOM)break;if(Y instanceof v0)J.push(Y);else if(Y===null||Y===void 0?void 0:Y.isLine())Q=Y;else if(Y instanceof C8);else if(X.nodeName=="DIV"&&!Q&&X!=this.view.contentDOM)Q=new v7(X,VV);else if(!Q)J.push(v0.of(new N5({tagName:X.nodeName.toLowerCase(),attributes:sD(X)}),X))}return{line:Q,marks:J}}}function XI(Z,J){let Q=(X)=>{for(let Y of X.children)if((J?Y.isText():Y.length)||Q(Y))return!0;return!1};return Q(Z)}function VM(Z){let J=Z.isReplace?(Z.startSide<0?64:0)|(Z.endSide>0?128:0):Z.startSide>0?32:16;if(Z.block)J|=256;return J}var VV={class:"cm-line"};function jM(Z,J){let Q=J.spec.attributes,X=J.spec.class;if(!Q&&!X)return Z;if(!Z)Z={class:"cm-line"};if(Q)wK(Q,Z);if(X)Z.class+=" "+X;return Z}function HM(Z){let J=[];for(let Q=Z.parents.length;Q>1;Q--){let X=Q==Z.parents.length?Z.tile:Z.parents[Q].tile;if(X instanceof v0)J.push(X.mark)}return J}function QK(Z){let J=d1.get(Z);if(J)J.setDOM(Z.cloneNode());return Z}class s9 extends e8{constructor(Z){super();this.tag=Z}eq(Z){return Z.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(Z){return Z.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}s9.inline=new s9("span");s9.block=new s9("div");var XK=new class extends e8{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class RK{constructor(Z){this.view=Z,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=L1.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new A5(Z,Z.contentDOM),this.updateInner([new W6(0,0,0,Z.state.doc.length)],null)}update(Z){var J;let Q=Z.changedRanges;if(this.minWidth>0&&Q.length)if(!Q.every(({fromA:U,toA:z})=>z<this.minWidthFrom||U>this.minWidthTo))this.minWidth=this.minWidthFrom=this.minWidthTo=0;else this.minWidthFrom=Z.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=Z.changes.mapPos(this.minWidthTo,1);this.updateEditContextFormatting(Z);let X=-1;if(this.view.inputState.composing>=0&&!this.view.observer.editContext){if((J=this.domChanged)===null||J===void 0?void 0:J.newSel)X=this.domChanged.newSel.head;else if(!BM(Z.changes,this.hasComposition)&&!Z.selectionSet)X=Z.state.selection.main.head}let Y=X>-1?FM(this.view,Z.changes,X):null;if(this.domChanged=null,this.hasComposition){let{from:U,to:z}=this.hasComposition;Q=new W6(U,z,Z.changes.mapPos(U,-1),Z.changes.mapPos(z,1)).addToSet(Q.slice())}if(this.hasComposition=Y?{from:Y.range.fromB,to:Y.range.toB}:null,(r.ie||r.chrome)&&!Y&&Z&&Z.state.doc.lines!=Z.startState.doc.lines)this.forceSelection=!0;let K=this.decorations,W=this.blockWrappers;this.updateDeco();let q=DM(K,this.decorations,Z.changes);if(q.length)Q=W6.extendWithRanges(Q,q);let G=MM(W,this.blockWrappers,Z.changes);if(G.length)Q=W6.extendWithRanges(Q,G);if(Y&&!Q.some((U)=>U.fromA<=Y.range.fromA&&U.toA>=Y.range.toA))Q=Y.range.addToSet(Q.slice());if(this.tile.flags&2&&Q.length==0)return!1;else{if(this.updateInner(Q,Y),Z.transactions.length)this.lastUpdate=Date.now();return!0}}updateInner(Z,J){this.view.viewState.mustMeasureContent=!0;let{observer:Q}=this.view;Q.ignore(()=>{if(J||Z.length){let K=this.tile,W=new IV(this.view,K,this.blockWrappers,this.decorations,this.dynamicDecorationMap);if(J&&d1.get(J.text))W.cache.reused.set(d1.get(J.text),2);this.tile=W.run(Z,J),DK(K,W.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let Y=r.chrome||r.ios?{node:Q.selectionRange.focusNode,written:!1}:void 0;if(this.tile.sync(Y),Y&&(Y.written||Q.selectionRange.focusNode!=Y.node||!this.tile.dom.contains(Y.node)))this.forceSelection=!0;this.tile.dom.style.height=""});let X=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length){for(let Y of this.tile.children)if(Y.isWidget()&&Y.widget instanceof AJ)X.push(Y.dom)}Q.updateGaps(X)}updateEditContextFormatting(Z){this.editContextFormatting=this.editContextFormatting.map(Z.changes);for(let J of Z.transactions)for(let Q of J.effects)if(Q.is(JV))this.editContextFormatting=Q.value}updateSelection(Z=!1,J=!1){if(Z||!this.view.observer.selectionRange.focusNode)this.view.observer.readSelectionRange();let{dom:Q}=this.tile,X=this.view.root.activeElement,Y=X==Q,K=!Y&&!(this.view.state.facet(E8)||Q.tabIndex>-1)&&z5(Q,this.view.observer.selectionRange)&&!(X&&Q.contains(X));if(!(Y||J||K))return;let W=this.forceSelection;this.forceSelection=!1;let q=this.view.state.selection.main,G,U;if(q.empty)U=G=this.inlineDOMNearPos(q.anchor,q.assoc||1);else U=this.inlineDOMNearPos(q.head,q.head==q.from?1:-1),G=this.inlineDOMNearPos(q.anchor,q.anchor==q.from?1:-1);if(r.gecko&&q.empty&&!this.hasComposition&&OM(G)){let I=document.createTextNode("");this.view.observer.ignore(()=>G.node.insertBefore(I,G.node.childNodes[G.offset]||null)),G=U=new w6(I,0),W=!0}let z=this.view.observer.selectionRange;if(W||!z.focusNode||(!I5(G.node,G.offset,z.anchorNode,z.anchorOffset)||!I5(U.node,U.offset,z.focusNode,z.focusOffset))&&!this.suppressWidgetCursorChange(z,q))this.view.observer.ignore(()=>{if(r.android&&r.chrome&&Q.contains(z.focusNode)&&AM(z.focusNode,Q))Q.blur(),Q.focus({preventScroll:!0});let I=H5(this.view.root);if(!I);else if(q.empty){if(r.gecko){let V=NM(G.node,G.offset);if(V&&V!=3){let H=(V==1?uI:vI)(G.node,G.offset);if(H)G=new w6(H.node,H.offset)}}if(I.collapse(G.node,G.offset),q.bidiLevel!=null&&I.caretBidiLevel!==void 0)I.caretBidiLevel=q.bidiLevel}else if(I.extend){I.collapse(G.node,G.offset);try{I.extend(U.node,U.offset)}catch(V){}}else{let V=document.createRange();if(q.anchor>q.head)[G,U]=[U,G];V.setEnd(U.node,U.offset),V.setStart(G.node,G.offset),I.removeAllRanges(),I.addRange(V)}if(K&&this.view.root.activeElement==Q){if(Q.blur(),X)X.focus()}}),this.view.observer.setSelectionRange(G,U);this.impreciseAnchor=G.precise?null:new w6(z.anchorNode,z.anchorOffset),this.impreciseHead=U.precise?null:new w6(z.focusNode,z.focusOffset)}suppressWidgetCursorChange(Z,J){return this.hasComposition&&J.empty&&I5(Z.focusNode,Z.focusOffset,Z.anchorNode,Z.anchorOffset)&&this.posFromDOM(Z.focusNode,Z.focusOffset)==J.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:Z}=this,J=Z.state.selection.main,Q=H5(Z.root),{anchorNode:X,anchorOffset:Y}=Z.observer.selectionRange;if(!Q||!J.empty||!J.assoc||!Q.modify)return;let K=this.lineAt(J.head,J.assoc);if(!K)return;let W=K.posAtStart;if(J.head==W||J.head==W+K.length)return;let q=this.coordsAt(J.head,-1),G=this.coordsAt(J.head,1);if(!q||!G||q.bottom>G.top)return;let U=this.domAtPos(J.head+J.assoc,J.assoc);Q.collapse(U.node,U.offset),Q.modify("move",J.assoc<0?"forward":"backward","lineboundary"),Z.observer.readSelectionRange();let z=Z.observer.selectionRange;if(Z.docView.posFromDOM(z.anchorNode,z.anchorOffset)!=J.from)Q.collapse(X,Y)}posFromDOM(Z,J){let Q=this.tile.nearest(Z);if(!Q)return this.tile.dom.compareDocumentPosition(Z)&2?0:this.view.state.doc.length;let X=Q.posAtStart;if(Q.isComposite()){let Y;if(Z==Q.dom)Y=Q.dom.childNodes[J];else{let K=_8(Z)==0?0:J==0?-1:1;for(;;){let W=Z.parentNode;if(W==Q.dom)break;if(K==0&&W.firstChild!=W.lastChild)if(Z==W.firstChild)K=-1;else K=1;Z=W}if(K<0)Y=Z;else Y=Z.nextSibling}if(Y==Q.dom.firstChild)return X;while(Y&&!d1.get(Y))Y=Y.nextSibling;if(!Y)return X+Q.length;for(let K=0,W=X;;K++){let q=Q.children[K];if(q.dom==Y)return W;W+=q.length+q.breakAfter}}else if(Q.isText())return Z==Q.dom?X+J:X+(J?Q.length:0);else return X}domAtPos(Z,J){let{tile:Q,offset:X}=this.tile.resolveBlock(Z,J);if(Q.isWidget())return Q.domPosFor(X,J);return Q.domIn(X,J)}inlineDOMNearPos(Z,J){let Q,X=-1,Y=!1,K,W=-1,q=!1;if(this.tile.blockTiles((G,U)=>{if(G.isWidget()){if(G.flags&32&&U>=Z)return!0;if(G.flags&16)Y=!0}else{let z=U+G.length;if(U<=Z)Q=G,X=Z-U,Y=z<Z;if(z>=Z&&!K)K=G,W=Z-U,q=U>Z;if(U>Z&&K)return!0}}),!Q&&!K)return this.domAtPos(Z,J);if(Y&&K)Q=null;else if(q&&Q)K=null;return Q&&J<0||!K?Q.domIn(X,J):K.domIn(W,J)}coordsAt(Z,J,Q){let{tile:X,offset:Y}=this.tile.resolveBlock(Z,J);if(X.isWidget()){if(X.widget instanceof AJ)return null;return X.coordsInWidget(Y,J,!0)}return X.coordsIn(Y,J,Q)}lineAt(Z,J){let{tile:Q}=this.tile.resolveBlock(Z,J);return Q.isLine()?Q:null}coordsForChar(Z){let{tile:J,offset:Q}=this.tile.resolveBlock(Z,1);if(!J.isLine())return null;function X(Y,K){if(Y.isComposite())for(let W of Y.children){if(W.length>=K){let q=X(W,K);if(q)return q}if(K-=W.length,K<0)break}else if(Y.isText()&&K<Y.length){let W=z0(Y.text,K);if(W==K)return null;let q=O5(Y.dom,K,W).getClientRects();for(let G=0;G<q.length;G++){let U=q[G];if(G==q.length-1||U.top<U.bottom&&U.left<U.right)return U}}return null}return X(J,Q)}measureVisibleLineHeights(Z){let J=[],{from:Q,to:X}=Z,Y=this.view.contentDOM.clientWidth,K=Y>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,W=-1,q=this.view.textDirection==k1.LTR,G=0,U=(z,I,V)=>{for(let H=0;H<z.children.length;H++){if(I>X)break;let F=z.children[H],N=I+F.length,R=F.dom.getBoundingClientRect(),{height:T}=R;if(V&&!H)G+=R.top-V.top;if(F instanceof C8){if(N>Q)U(F,I,R)}else if(I>=Q){if(G>0)J.push(-G);if(J.push(T+G),G=0,K){let S=F.dom.lastChild,C=S?DJ(S):[];if(C.length){let k=C[C.length-1],A=q?k.right-R.left:R.right-k.left;if(A>W)W=A,this.minWidth=Y,this.minWidthFrom=I,this.minWidthTo=N}}}if(V&&H==z.children.length-1)G+=V.bottom-R.bottom;I=N+F.breakAfter}};return U(this.tile,0,null),J}textDirectionAt(Z){let{tile:J}=this.tile.resolveBlock(Z,1);return getComputedStyle(J.dom).direction=="rtl"?k1.RTL:k1.LTR}measureTextSize(){let Z=this.tile.blockTiles((K)=>{if(K.isLine()&&K.children.length&&K.length<=20){let W=0,q;for(let G of K.children){if(!G.isText()||/[^ -~]/.test(G.text))return;let U=DJ(G.dom);if(U.length!=1)return;W+=U[0].width,q=U[0].height}if(W)return{lineHeight:K.dom.getBoundingClientRect().height,charWidth:W/K.length,textHeight:q}}});if(Z)return Z;let J=document.createElement("div"),Q,X,Y;return J.className="cm-line",J.style.width="99999px",J.style.position="absolute",J.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(J);let K=DJ(J.firstChild)[0];Q=J.getBoundingClientRect().height,X=K&&K.width?K.width/27:7,Y=K&&K.height?K.height:Q,J.remove()}),{lineHeight:Q,charWidth:X,textHeight:Y}}computeBlockGapDeco(){let Z=[],J=this.view.viewState;for(let Q=0,X=0;;X++){let Y=X==J.viewports.length?null:J.viewports[X],K=Y?Y.from-1:this.view.state.doc.length;if(K>Q){let W=(J.lineBlockAt(K).bottom-J.lineBlockAt(Q).top)/this.view.scaleY;Z.push(L1.replace({widget:new AJ(W),block:!0,inclusive:!0,isBlockGap:!0}).range(Q,K))}if(!Y)break;Q=Y.to+1}return L1.set(Z)}updateDeco(){let Z=1,J=this.view.state.facet(fJ).map((Y)=>{return(this.dynamicDecorationMap[Z++]=typeof Y=="function")?Y(this.view):Y}),Q=!1,X=this.view.state.facet(gK).map((Y,K)=>{let W=typeof Y=="function";if(W)Q=!0;return W?Y(this.view):Y});if(X.length)this.dynamicDecorationMap[Z++]=Q,J.push(N1.join(X));this.decorations=[this.editContextFormatting,...J,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];while(Z<this.decorations.length)this.dynamicDecorationMap[Z++]=!1;this.blockWrappers=this.view.state.facet(XV).map((Y)=>typeof Y=="function"?Y(this.view):Y)}scrollIntoView(Z){if(Z.isSnapshot){let G=this.view.viewState.lineBlockAt(Z.range.head);this.view.scrollDOM.scrollTop=G.top-Z.yMargin,this.view.scrollDOM.scrollLeft=Z.xMargin;return}for(let G of this.view.state.facet(ZV))try{if(G(this.view,Z.range,Z))return!0}catch(U){a0(this.view.state,U,"scroll handler")}let{range:J}=Z,Q=this.coordsAt(J.head,J.assoc||(J.head>J.anchor?-1:1)),X;if(!Q)return;if(!J.empty&&(X=this.coordsAt(J.anchor,J.anchor>J.head?-1:1)))Q={left:Math.min(Q.left,X.left),top:Math.min(Q.top,X.top),right:Math.max(Q.right,X.right),bottom:Math.max(Q.bottom,X.bottom)};let Y=uK(this.view),K={left:Q.left-Y.left,top:Q.top-Y.top,right:Q.right+Y.right,bottom:Q.bottom+Y.bottom},{offsetWidth:W,offsetHeight:q}=this.view.scrollDOM;if(aD(this.view.scrollDOM,K,J.head<J.anchor?-1:1,Z.x,Z.y,Math.max(Math.min(Z.xMargin,W),-W),Math.max(Math.min(Z.yMargin,q),-q),this.view.textDirection==k1.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(Q.top>window.visualViewport.offsetTop+window.visualViewport.height||Q.bottom<window.visualViewport.offsetTop)){let G=this.view.docView.lineAt(J.head,1);if(G){let U=$I(G.dom);G.dom.scrollIntoView({block:"nearest"}),hI(U,!1)}}}lineHasWidget(Z){let J=(Q)=>Q.isWidget()||Q.children.some(J);return J(this.tile.resolveBlock(Z,1).tile)}destroy(){DK(this.tile)}}function DK(Z,J){let Q=J===null||J===void 0?void 0:J.get(Z);if(Q!=1){if(Q==null)Z.destroy();for(let X of Z.children)DK(X,J)}}function OM(Z){return Z.node.nodeType==1&&Z.node.firstChild&&(Z.offset==0||Z.node.childNodes[Z.offset-1].contentEditable=="false")&&(Z.offset==Z.node.childNodes.length||Z.node.childNodes[Z.offset].contentEditable=="false")}function jV(Z,J){let Q=Z.observer.selectionRange;if(!Q.focusNode)return null;let X=uI(Q.focusNode,Q.focusOffset),Y=vI(Q.focusNode,Q.focusOffset),K=X||Y;if(Y&&X&&Y.node!=X.node){let q=d1.get(Y.node);if(!q||q.isText()&&q.text!=Y.node.nodeValue)K=Y;else if(Z.docView.lastCompositionAfterCursor){let G=d1.get(X.node);if(!(!G||G.isText()&&G.text!=X.node.nodeValue))K=Y}}if(Z.docView.lastCompositionAfterCursor=K!=X,!K)return null;let W=J-K.offset;return{from:W,to:W+K.node.nodeValue.length,node:K.node}}function FM(Z,J,Q){let X=jV(Z,Q);if(!X)return null;let{node:Y,from:K,to:W}=X,q=Y.nodeValue;if(/[\n\r]/.test(q))return null;if(Z.state.doc.sliceString(X.from,X.to)!=q)return null;let G=J.invertedDesc;return{range:new W6(G.mapPos(K),G.mapPos(W),K,W),text:Y}}function NM(Z,J){if(Z.nodeType!=1)return 0;return(J&&Z.childNodes[J-1].contentEditable=="false"?1:0)|(J<Z.childNodes.length&&Z.childNodes[J].contentEditable=="false"?2:0)}var RM=class{constructor(){this.changes=[]}compareRange(J,Q){f7(J,Q,this.changes)}comparePoint(J,Q){f7(J,Q,this.changes)}boundChange(J){f7(J,J,this.changes)}};function DM(Z,J,Q){let X=new RM;return N1.compare(Z,J,Q,X),X.changes}class HV{constructor(){this.changes=[]}compareRange(Z,J){f7(Z,J,this.changes)}comparePoint(){}boundChange(Z){f7(Z,Z,this.changes)}}function MM(Z,J,Q){let X=new HV;return N1.compare(Z,J,Q,X),X.changes}function AM(Z,J){for(let Q=Z;Q&&Q!=J;Q=Q.assignedSlot||Q.parentNode)if(Q.nodeType==1&&Q.contentEditable=="false")return!0;return!1}function BM(Z,J){let Q=!1;if(J)Z.iterChangedRanges((X,Y)=>{if(X<J.to&&Y>J.from)Q=!0});return Q}class AJ extends e8{constructor(Z){super();this.height=Z}toDOM(){let Z=document.createElement("div");return Z.className="cm-gap",this.updateDOM(Z),Z}eq(Z){return Z.height==this.height}updateDOM(Z){return Z.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function LM(Z,J,Q=1){let X=Z.charCategorizer(J),Y=Z.doc.lineAt(J),K=J-Y.from;if(Y.length==0)return h.cursor(J);if(K==0)Q=1;else if(K==Y.length)Q=-1;let W=K,q=K;if(Q<0)W=z0(Y.text,K,!1);else q=z0(Y.text,K);let G=X(Y.text.slice(W,q));while(W>0){let U=z0(Y.text,W,!1);if(X(Y.text.slice(U,W))!=G)break;W=U}while(q<Y.length){let U=z0(Y.text,q);if(X(Y.text.slice(q,U))!=G)break;q=U}return h.undirectionalRange(W+Y.from,q+Y.from)}function PM(Z,J,Q,X,Y){let K=Math.round((X-J.left)*Z.defaultCharacterWidth);if(Z.lineWrapping&&Q.height>Z.defaultLineHeight*1.5){let q=Z.viewState.heightOracle.textHeight,G=Math.floor((Y-Q.top-(Z.defaultLineHeight-q)*0.5)/q);K+=G*Z.viewState.heightOracle.lineLength}let W=Z.state.sliceDoc(Q.from,Q.to);return Q.from+pz(W,K,Z.state.tabSize)}function MK(Z,J,Q){let X=Z.lineBlockAt(J);if(Array.isArray(X.type)){let Y;for(let K of X.type){if(K.from>J)break;if(K.to<J)continue;if(K.from<J&&K.to>J)return K;if(!Y||K.type==F0.Text&&(Y.type!=K.type||(Q<0?K.from<J:K.to>J)))Y=K}return Y||X}return X}function TM(Z,J,Q,X){let Y=MK(Z,J.head,J.assoc||-1),K=!X||Y.type!=F0.Text||!(Z.lineWrapping||Y.widgetLineBreaks)?null:Z.coordsAtPos(J.assoc<0&&J.head>Y.from?J.head-1:J.head);if(K){let W=Z.dom.getBoundingClientRect(),q=Z.textDirectionAt(Y.from),G=Z.posAtCoords({x:Q==(q==k1.LTR)?W.right-1:W.left+1,y:(K.top+K.bottom)/2});if(G!=null)return h.cursor(G,Q?-1:1)}return h.cursor(Q?Y.to:Y.from,Q?-1:1)}function YI(Z,J,Q,X){let Y=Z.state.doc.lineAt(J.head),K=Z.bidiSpans(Y),W=Z.textDirectionAt(Y.from);for(let q=J,G=null;;){let U=WM(Y,K,W,q,Q),z=nI;if(!U){if(Y.number==(Q?Z.state.doc.lines:1))return q;z=`
`,Y=Z.state.doc.line(Y.number+(Q?1:-1)),K=Z.bidiSpans(Y),U=Z.visualLineSide(Y,!Q)}if(!G){if(!X)return U;G=X(z)}else if(!G(z))return q;q=U}}function SM(Z,J,Q){let X=Z.state.charCategorizer(J),Y=X(Q);return(K)=>{let W=X(K);if(Y==S6.Space)Y=W;return Y==W}}function EM(Z,J,Q,X){let Y=J.head,K=Q?1:-1;if(Y==(Q?Z.state.doc.length:0))return h.cursor(Y,J.assoc);let W=J.goalColumn,q,G=Z.contentDOM.getBoundingClientRect(),U=Z.coordsAtPos(Y,J.assoc||((J.empty?Q:J.head==J.from)?1:-1)),z=Z.documentTop;if(U){if(W==null)W=U.left-G.left;q=K<0?U.top:U.bottom}else{let F=Z.viewState.lineBlockAt(Y);if(W==null)W=Math.min(G.right-G.left,Z.defaultCharacterWidth*(Y-F.from));q=(K<0?F.top:F.bottom)+z}let I=G.left+W,V=Z.viewState.heightOracle.textHeight>>1,H=X!==null&&X!==void 0?X:V;for(let F=0;;F+=V){let N=q+(H+F)*K,R=AK(Z,{x:I,y:N},!1,K);if(Q?N>G.bottom:N<G.top)return h.cursor(R.pos,R.assoc);let T=Z.coordsAtPos(R.pos,R.assoc),S=T?(T.top+T.bottom)/2:0;if(!T||(Q?S>q:S<q))return h.cursor(R.pos,R.assoc,void 0,W)}}function V5(Z,J,Q){for(;;){let X=0;for(let Y of Z)Y.between(J-1,J+1,(K,W,q)=>{if(J>K&&J<W){let G=X||Q||(J-K<W-J?-1:1);J=G<0?K:W,X=G}});if(!X)return J}}function OV(Z,J){let Q=null;for(let X=0;X<J.ranges.length;X++){let Y=J.ranges[X],K=null;if(Y.empty){let W=V5(Z,Y.from,0);if(W!=Y.from)K=h.cursor(W,-1)}else{let W=V5(Z,Y.from,-1),q=V5(Z,Y.to,1);if(W!=Y.from||q!=Y.to)if(Y.undirectional)K=h.undirectionalRange(Y.from,Y.to);else K=h.range(Y.from==Y.anchor?W:q,Y.from==Y.head?W:q)}if(K){if(!Q)Q=J.ranges.slice();Q[X]=K}}return Q?h.create(Q,J.mainIndex):J}function YK(Z,J,Q){let X=V5(Z.state.facet(D5).map((Y)=>Y(Z)),Q.from,J.head>Q.from?-1:1);return X==Q.from?Q:h.cursor(X,X<Q.from?1:-1)}class k6{constructor(Z,J){this.pos=Z,this.assoc=J}}function AK(Z,J,Q,X){let Y=Z.contentDOM.getBoundingClientRect(),K=Y.top+Z.viewState.paddingTop,{x:W,y:q}=J,G=q-K,U;for(;;){if(G<0)return new k6(0,1);if(G>Z.viewState.docHeight)return new k6(Z.state.doc.length,-1);if(U=Z.elementAtHeight(G),X==null)break;if(U.type==F0.Text){if(X<0?U.to<Z.viewport.from:U.from>Z.viewport.to)break;let V=Z.docView.coordsAt(X<0?U.from:U.to,X>0?-1:1);if(V&&(X<0?V.top<=G+K:V.bottom>=G+K))break}let I=Z.viewState.heightOracle.textHeight/2;G=X>0?U.bottom+I:U.top-I}if(Z.viewport.from>=U.to||Z.viewport.to<=U.from){if(Q)return null;if(U.type==F0.Text){let I=PM(Z,Y,U,W,q);return new k6(I,I==U.from?1:-1)}}if(U.type!=F0.Text)return G<(U.top+U.bottom)/2?new k6(U.from,1):new k6(U.to,-1);let z=Z.docView.lineAt(U.from,2);if(!z||z.length!=U.length)z=Z.docView.lineAt(U.from,-2);return new FV(Z,W,q,Z.textDirectionAt(U.from)).scanTile(z,U.from)}class FV{constructor(Z,J,Q,X){this.view=Z,this.x=J,this.y=Q,this.baseDir=X,this.line=null,this.spans=null}bidiSpansAt(Z){if(!this.line||this.line.from>Z||this.line.to<Z)this.line=this.view.state.doc.lineAt(Z),this.spans=this.view.bidiSpans(this.line);return this}baseDirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[b6.find(X,Z-Q.from,-1,J)].level==this.baseDir}dirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[b6.find(X,Z-Q.from,-1,J)].dir}bidiIn(Z,J){let{spans:Q,line:X}=this.bidiSpansAt(Z);return Q.length>1||Q.length&&(Q[0].level!=this.baseDir||Q[0].to+X.from<J)}scan(Z,J,Q=!1){let X=0,Y=Z.length-1,K=new Set,W=this.bidiIn(Z[0],Z[Y]),q,G,U=-1,z=1e9,I;Z:while(X<Y){let H=Y-X,F=X+Y>>1;J:if(K.has(F)){for(let T=1;T<H;T++){let S=F+T;if(S>=Y)S-=H;if(!K.has(S)){F=S;break J}}break Z}K.add(F);let N=J(F),R=0;if(N)for(let T=0;T<N.length;T++){let S=N[T];if(S.width==0&&N.length>1)continue;if(S.bottom<this.y){if(!q||q.bottom<S.bottom)q=S;R=1}else if(S.top>this.y){if(!G||G.top>S.top)G=S;R=-1}else{let C=S.left>this.x?this.x-S.left:S.right<this.x?this.x-S.right:0,k=Math.abs(C);if(k<z)U=F,z=k,I=S;if(C)R=C<0==(this.baseDir==k1.LTR)?-1:1}}if(R==-1&&(!W||this.baseDirAt(Z[F],1)))Y=F;else if(R==1&&(!W||this.baseDirAt(Z[F+1],-1)))X=F+1}if(!I){if(!G&&!q)return{i:Z[0],after:!1};let H=q&&(!G||this.y-q.bottom<G.top-this.y)?q:G;return this.y=(H.top+H.bottom)/2,this.scan(Z,J,!0)}if(z&&!Q){let{top:H,bottom:F}=I;if(q&&q.bottom>(H+H+F)/3)return this.y=q.bottom-1,this.scan(Z,J,!0);if(G&&G.top<(H+F+F)/3)return this.y=G.top+1,this.scan(Z,J,!0)}let V=(W?this.dirAt(Z[U],1):this.baseDir)==k1.LTR;return{i:U,after:this.x>(I.left+I.right)/2==V}}scanText(Z,J){let Q=[];for(let Y=0;Y<Z.length;Y=z0(Z.text,Y))Q.push(J+Y);Q.push(J+Z.length);let X=this.scan(Q,(Y)=>{let K=Q[Y]-J,W=Q[Y+1]-J;return O5(Z.dom,K,W).getClientRects()});return X.after?new k6(Q[X.i+1],-1):new k6(Q[X.i],1)}scanTile(Z,J){if(!Z.length)return new k6(J,1);if(Z.children.length==1){let W=Z.children[0];if(W.isText())return this.scanText(W,J);else if(W.isComposite())return this.scanTile(W,J)}let Q=[J];for(let W=0,q=J;W<Z.children.length;W++)Q.push(q+=Z.children[W].length);let X=this.scan(Q,(W)=>{let q=Z.children[W];if(q.flags&48)return null;return(q.dom.nodeType==1?q.dom:O5(q.dom,0,q.length)).getClientRects()}),Y=Z.children[X.i],K=Q[X.i];if(Y.isText())return this.scanText(Y,K);if(Y.isComposite())return this.scanTile(Y,K);return X.after?new k6(Q[X.i+1],-1):new k6(K,1)}}var y7="￿";class NV{constructor(Z,J){this.points=Z,this.view=J,this.text="",this.lineSeparator=J.state.facet(A1.lineSeparator)}append(Z){this.text+=Z}lineBreak(){this.text+=y7}readRange(Z,J){if(!Z)return this;let Q=Z.parentNode;for(let X=Z;;){this.findPointBefore(Q,X);let Y=this.text.length;this.readNode(X);let K=d1.get(X),W=X.nextSibling;if(W==J){if((K===null||K===void 0?void 0:K.breakAfter)&&!W&&Q!=this.view.contentDOM)this.lineBreak();break}let q=d1.get(W);if((K&&q?K.breakAfter:(K?K.breakAfter:CJ(X))||CJ(W)&&(X.nodeName!="BR"||(K===null||K===void 0?void 0:K.isWidget()))&&this.text.length>Y)&&!_M(W,J))this.lineBreak();X=W}return this.findPointBefore(Q,J),this}readTextNode(Z){let J=Z.nodeValue;for(let Q of this.points)if(Q.node==Z)Q.pos=this.text.length+Math.min(Q.offset,J.length);for(let Q=0,X=this.lineSeparator?null:/\r\n?|\n/g;;){let Y=-1,K=1,W;if(this.lineSeparator)Y=J.indexOf(this.lineSeparator,Q),K=this.lineSeparator.length;else if(W=X.exec(J))Y=W.index,K=W[0].length;if(this.append(J.slice(Q,Y<0?J.length:Y)),Y<0)break;if(this.lineBreak(),K>1){for(let q of this.points)if(q.node==Z&&q.pos>this.text.length)q.pos-=K-1}Q=Y+K}}readNode(Z){let J=d1.get(Z),Q=J&&J.overrideDOMText;if(Q!=null){this.findPointInside(Z,Q.length);for(let X=Q.iter();!X.next().done;)if(X.lineBreak)this.lineBreak();else this.append(X.value)}else if(Z.nodeType==3)this.readTextNode(Z);else if(Z.nodeName=="BR"){if(Z.nextSibling)this.lineBreak()}else if(Z.nodeType==1)this.readRange(Z.firstChild,null)}findPointBefore(Z,J){for(let Q of this.points)if(Q.node==Z&&Z.childNodes[Q.offset]==J)Q.pos=this.text.length}findPointInside(Z,J){for(let Q of this.points)if(Z.nodeType==3?Q.node==Z:Z.contains(Q.node))Q.pos=this.text.length+(CM(Z,Q.node,Q.offset)?J:0)}}function CM(Z,J,Q){for(;;){if(!J||Q<_8(J))return!1;if(J==Z)return!0;Q=t8(J)+1,J=J.parentNode}}function _M(Z,J){let Q;for(;;Z=Z.nextSibling){if(Z==J||!Z)break;let X=d1.get(Z);if(!(X===null||X===void 0?void 0:X.isWidget()))return!1;if(X)(Q||(Q=[])).push(X)}if(Q)for(let X of Q){let Y=X.overrideDOMText;if(Y===null||Y===void 0?void 0:Y.length)return!1}return!0}class BK{constructor(Z,J){this.node=Z,this.offset=J,this.pos=-1}}class RV{constructor(Z,J,Q,X){this.typeOver=X,this.bounds=null,this.text="",this.domChanged=J>-1;let{impreciseHead:Y,impreciseAnchor:K}=Z.docView,W=Z.state.selection;if(Z.state.readOnly&&J>-1)this.newSel=null;else if(J>-1&&(this.bounds=DV(Z.docView.tile,J,Q,0))){let q=Y||K?[]:xM(Z),G=new NV(q,Z);G.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=G.text,this.newSel=wM(q,this.bounds.from)}else{let q=Z.observer.selectionRange,G=Y&&Y.node==q.focusNode&&Y.offset==q.focusOffset||!jK(Z.contentDOM,q.focusNode)?W.main.head:Z.docView.posFromDOM(q.focusNode,q.focusOffset),U=K&&K.node==q.anchorNode&&K.offset==q.anchorOffset||!jK(Z.contentDOM,q.anchorNode)?W.main.anchor:Z.docView.posFromDOM(q.anchorNode,q.anchorOffset),z=Z.viewport;if((r.ios||r.chrome)&&G!=U&&Math.min(G,U)<=W.main.from&&Math.max(G,U)>=W.main.to&&(z.from>0||z.to<Z.state.doc.length)){let I=Math.min(G,U),V=Math.max(G,U),H=z.from-I,F=z.to-V;if((H==0||H==1||I==0)&&(F==0||F==-1||V==Z.state.doc.length))G=0,U=Z.state.doc.length}if(Z.inputState.composing>-1&&W.ranges.length>1)this.newSel=W.replaceRange(h.range(U,G));else if(Z.lineWrapping&&U==G&&!(W.main.empty&&W.main.head==G)&&Z.inputState.lastTouchTime>Date.now()-100){let I=Z.coordsAtPos(G,-1),V=0;if(I)V=Z.inputState.lastTouchY<=I.bottom?-1:1;this.newSel=h.create([h.cursor(G,V)])}else this.newSel=h.single(U,G)}}}function DV(Z,J,Q,X){if(Z.isComposite()){let Y=-1,K=-1,W=-1,q=-1;for(let G=0,U=X,z=X;G<Z.children.length;G++){let I=Z.children[G],V=U+I.length;if(U<J&&V>Q)return DV(I,J,Q,U);if(V>=J&&Y==-1)Y=G,K=U;if(U>Q&&I.dom.parentNode==Z.dom){W=G,q=z;break}z=V,U=V+I.breakAfter}return{from:K,to:q<0?X+Z.length:q,startDOM:(Y?Z.children[Y-1].dom.nextSibling:null)||Z.dom.firstChild,endDOM:W<Z.children.length&&W>=0?Z.children[W].dom:null}}else if(Z.isText())return{from:X,to:X+Z.length,startDOM:Z.dom,endDOM:Z.dom.nextSibling};else return null}function MV(Z,J){let Q,{newSel:X}=J,{state:Y}=Z,K=Y.selection.main,W=Z.inputState.lastKeyTime>Date.now()-100?Z.inputState.lastKeyCode:-1;if(J.bounds){let{from:q,to:G}=J.bounds,U=K.from,z=null;if(W===8||r.android&&J.text.length<G-q)U=K.to,z="end";let I=Y.doc.sliceString(q,G,y7),V,H;if(!K.empty&&K.from>=q&&K.to<=G&&(J.typeOver||I!=J.text)&&I.slice(0,K.from-q)==J.text.slice(0,K.from-q)&&I.slice(K.to-q)==J.text.slice(V=J.text.length-(I.length-(K.to-q))))Q={from:K.from,to:K.to,insert:R1.of(J.text.slice(K.from-q,V).split(y7))};else if(H=AV(I,J.text,U-q,z)){if(r.chrome&&W==13&&H.toB==H.from+2&&J.text.slice(H.from,H.toB)==y7+y7)H.toB--;Q={from:q+H.from,to:q+H.toA,insert:R1.of(J.text.slice(H.from,H.toB).split(y7))}}}else if(X&&(!Z.hasFocus&&Y.facet(E8)||wJ(X,K)))X=null;if(!Q&&!X)return!1;if((r.mac||r.android)&&Q&&Q.from==Q.to&&Q.from==K.head-1&&/^\. ?$/.test(Q.insert.toString())&&Z.contentDOM.getAttribute("autocorrect")=="off"){if(X&&Q.insert.length==2)X=h.single(X.main.anchor-1,X.main.head-1);Q={from:Q.from,to:Q.to,insert:R1.of([Q.insert.toString().replace("."," ")])}}else if(Y.doc.lineAt(K.from).to<K.to&&Z.docView.lineHasWidget(K.to)&&Z.inputState.insertingTextAt>Date.now()-50)Q={from:K.from,to:K.to,insert:Y.toText(Z.inputState.insertingText)};else if(r.chrome&&Q&&Q.from==Q.to&&Q.from==K.head&&Q.insert.toString()==`
 `&&Z.lineWrapping){if(X)X=h.single(X.main.anchor-1,X.main.head-1);Q={from:K.from,to:K.to,insert:R1.of([" "])}}if(Q)return vK(Z,Q,X,W);else if(X&&!wJ(X,K)){let q=!1,G="select";if(Z.inputState.lastSelectionTime>Date.now()-50){if(Z.inputState.lastSelectionOrigin=="select")q=!0;if(G=Z.inputState.lastSelectionOrigin,G=="select.pointer")X=OV(Y.facet(D5).map((U)=>U(Z)),X)}return Z.dispatch({selection:X,scrollIntoView:q,userEvent:G}),!0}else return!1}function vK(Z,J,Q,X=-1){if(r.ios&&Z.inputState.flushIOSKey(J))return!0;let Y=Z.state.selection.main;if(r.android&&(J.to==Y.to&&(J.from==Y.from||J.from==Y.from-1&&Z.state.sliceDoc(J.from,Y.from)==" ")&&J.insert.length==1&&J.insert.lines==2&&g7(Z.contentDOM,"Enter",13)||(J.from==Y.from-1&&J.to==Y.to&&J.insert.length==0||X==8&&J.insert.length<J.to-J.from&&J.to>Y.head)&&g7(Z.contentDOM,"Backspace",8)||J.from==Y.from&&J.to==Y.to+1&&J.insert.length==0&&g7(Z.contentDOM,"Delete",46)))return!0;let K=J.insert.toString();if(Z.inputState.composing>=0)Z.inputState.composing++;let W,q=()=>W||(W=kM(Z,J,Q));if(!Z.state.facet(aI).some((G)=>G(Z,J.from,J.to,K,q)))Z.dispatch(q());return!0}function kM(Z,J,Q){let X,Y=Z.state,K=Y.selection.main,W=-1;if(J.from==J.to&&J.from<K.from||J.from>K.to){let G=J.from<K.from?-1:1,U=G<0?K.from:K.to,z=V5(Y.facet(D5).map((I)=>I(Z)),U,G);if(J.from==z)W=z}if(W>-1)X={changes:J,selection:h.cursor(J.from+J.insert.length,-1)};else if(J.from>=K.from&&J.to<=K.to&&J.to-J.from>=(K.to-K.from)/3&&(!Q||Q.main.empty&&Q.main.from==J.from+J.insert.length)&&Z.inputState.composing<0){let G=K.from<J.from?Y.sliceDoc(K.from,J.from):"",U=K.to>J.to?Y.sliceDoc(J.to,K.to):"";X=Y.replaceSelection(Z.state.toText(G+J.insert.sliceString(0,void 0,Z.state.lineBreak)+U))}else{let G=Y.changes(J),U=Q&&Q.main.to<=G.newLength?Q.main:void 0;if(Y.selection.ranges.length>1&&(Z.inputState.composing>=0||Z.inputState.compositionPendingChange)&&J.to<=K.to+10&&J.to>=K.to-10){let z=Z.state.sliceDoc(J.from,J.to),I,V=Q&&jV(Z,Q.main.head);if(V){let F=J.insert.length-(J.to-J.from);I={from:V.from,to:V.to-F}}else I=Z.state.doc.lineAt(K.head);let H=K.to-J.to;X=Y.changeByRange((F)=>{if(F.from==K.from&&F.to==K.to)return{changes:G,range:U||F.map(G)};let N=F.to-H,R=N-z.length;if(Z.state.sliceDoc(R,N)!=z||N>=I.from&&R<=I.to)return{range:F};let T=Y.changes({from:R,to:N,insert:J.insert}),S=F.to-K.to;return{changes:T,range:!U?F.map(T):h.range(Math.max(0,U.anchor+S),Math.max(0,U.head+S))}})}else X={changes:G,selection:U&&Y.selection.replaceRange(U)}}let q="input.type";if(Z.composing||Z.inputState.compositionPendingChange&&Z.inputState.compositionEndedAt>Date.now()-50){if(Z.inputState.compositionPendingChange=!1,q+=".compose",Z.inputState.compositionFirstChange)q+=".start",Z.inputState.compositionFirstChange=!1}return Y.update(X,{userEvent:q,scrollIntoView:!0})}function AV(Z,J,Q,X){let Y=Math.min(Z.length,J.length),K=0;while(K<Y&&Z.charCodeAt(K)==J.charCodeAt(K))K++;if(K==Y&&Z.length==J.length)return null;let W=Z.length,q=J.length;while(W>0&&q>0&&Z.charCodeAt(W-1)==J.charCodeAt(q-1))W--,q--;if(X=="end"){let G=Math.max(0,K-Math.min(W,q));Q-=W+G-K}if(W<K&&Z.length<J.length){let G=Q<=K&&Q>=W?K-Q:0;K-=G,q=K+(q-W),W=K}else if(q<K){let G=Q<=K&&Q>=q?K-Q:0;K-=G,W=K+(W-q),q=K}return{from:K,toA:W,toB:q}}function xM(Z){let J=[];if(Z.root.activeElement!=Z.contentDOM)return J;let{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}=Z.observer.selectionRange;if(Q){if(J.push(new BK(Q,X)),Y!=Q||K!=X)J.push(new BK(Y,K))}return J}function wM(Z,J){if(Z.length==0)return null;let Q=Z[0].pos,X=Z.length==2?Z[1].pos:Q;return Q>-1&&X>-1?h.single(Q+J,X+J):null}function wJ(Z,J){return J.head==Z.main.head&&J.anchor==Z.main.anchor}class BV{setSelectionOrigin(Z){this.lastSelectionOrigin=Z,this.lastSelectionTime=Date.now()}constructor(Z){if(this.view=Z,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=Z.hasFocus,r.safari)Z.contentDOM.addEventListener("input",()=>null);if(r.gecko)sM(Z.contentDOM.ownerDocument)}handleEvent(Z){if(!vM(this.view,Z)||this.ignoreDuringComposition(Z))return;if(Z.type=="keydown"&&this.keydown(Z))return;if(this.view.updateState!=0)Promise.resolve().then(()=>this.runHandlers(Z.type,Z));else this.runHandlers(Z.type,Z)}runHandlers(Z,J){let Q=this.handlers[Z];if(Q){for(let X of Q.observers)X(this.view,J);for(let X of Q.handlers){if(J.defaultPrevented)break;if(X(this.view,J)){J.preventDefault();break}}}}ensureHandlers(Z){let J=yM(Z),Q=this.handlers,X=this.view.contentDOM;for(let Y in J)if(Y!="scroll"){let K=!J[Y].handlers.length,W=Q[Y];if(W&&K!=!W.handlers.length)X.removeEventListener(Y,this.handleEvent),W=null;if(!W)X.addEventListener(Y,this.handleEvent,{passive:K})}for(let Y in Q)if(Y!="scroll"&&!J[Y])X.removeEventListener(Y,this.handleEvent);this.handlers=J}keydown(Z){if(this.lastKeyCode=Z.keyCode,this.lastKeyTime=Date.now(),Z.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&Z.keyCode!=27&&PV.indexOf(Z.keyCode)<0)this.tabFocusMode=-1;if(r.android&&r.chrome&&!Z.synthetic&&(Z.keyCode==13||Z.keyCode==8))return this.view.observer.delayAndroidKey(Z.key,Z.keyCode),!0;if(r.ios&&!Z.synthetic&&!Z.altKey&&!Z.metaKey&&(LV.some((J)=>J.keyCode==Z.keyCode)&&!Z.ctrlKey||$M.indexOf(Z.key)>-1&&Z.ctrlKey)){let J={ctrlKey:Z.ctrlKey,altKey:Z.altKey,metaKey:Z.metaKey,shiftKey:Z.shiftKey};if(J.shiftKey&&r.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&bM(this.view.win))J.shiftKey=!1;return this.pendingIOSKey={key:Z.key,keyCode:Z.keyCode,mods:J},setTimeout(()=>this.flushIOSKey(),250),!0}if(Z.keyCode!=229)this.view.observer.forceFlush();return!1}flushIOSKey(Z){let J=this.pendingIOSKey;if(!J)return!1;if(J.key=="Enter"&&Z&&Z.from<Z.to&&/^\S+$/.test(Z.insert.toString()))return!1;return this.pendingIOSKey=void 0,g7(this.view.contentDOM,J.key,J.keyCode,J.mods)}ignoreDuringComposition(Z){if(!/^key/.test(Z.type)||Z.synthetic)return!1;if(this.composing>0)return!0;if(r.safari&&!r.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100)return this.compositionPendingKey=!1,!0;return!1}startMouseSelection(Z){if(this.mouseSelection)this.mouseSelection.destroy();this.mouseSelection=Z}update(Z){if(this.view.observer.update(Z),this.mouseSelection)this.mouseSelection.update(Z);if(this.draggedContent&&Z.docChanged)this.draggedContent=this.draggedContent.map(Z.changes);if(Z.transactions.length)this.lastKeyCode=this.lastSelectionTime=0}destroy(){if(this.mouseSelection)this.mouseSelection.destroy()}}function bM(Z){if(!Z.visualViewport)return!1;return Z.visualViewport.height*Z.visualViewport.scale/Z.document.documentElement.clientHeight<0.85}function KI(Z,J){return(Q,X)=>{try{return J.call(Z,X,Q)}catch(Y){a0(Q.state,Y)}}}function yM(Z){let J=Object.create(null);function Q(X){return J[X]||(J[X]={observers:[],handlers:[]})}for(let X of Z){let Y=X.spec,K=Y&&Y.plugin.domEventHandlers,W=Y&&Y.plugin.domEventObservers;if(K)for(let q in K){let G=K[q];if(G)Q(q).handlers.push(KI(X.value,G))}if(W)for(let q in W){let G=W[q];if(G)Q(q).observers.push(KI(X.value,G))}}for(let X in y6)Q(X).handlers.push(y6[X]);for(let X in x0)Q(X).observers.push(x0[X]);return J}var LV=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],$M="dthko",PV=[16,17,18,20,91,92,224,225],IJ=6;function VJ(Z){return Math.max(0,Z)*0.7+8}function hM(Z,J){return Math.max(Math.abs(Z.clientX-J.clientX),Math.abs(Z.clientY-J.clientY))}class TV{constructor(Z,J,Q,X){this.view=Z,this.startEvent=J,this.style=Q,this.mustSelect=X,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=J,this.scrollParents=bI(Z.contentDOM),this.atoms=Z.state.facet(D5).map((K)=>K(Z));let Y=Z.contentDOM.ownerDocument;Y.addEventListener("mousemove",this.move=this.move.bind(this)),Y.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=J.shiftKey,this.multiple=Z.state.facet(A1.allowMultipleSelections)&&fM(Z,J),this.dragging=uM(Z,J)&&CV(J)==1?null:!1}start(Z){if(this.dragging===!1)this.select(Z)}move(Z){if(Z.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&hM(this.startEvent,Z)<10)return;this.select(this.lastEvent=Z);let J=0,Q=0,X=0,Y=0,K=this.view.win.innerWidth,W=this.view.win.innerHeight;if(this.scrollParents.x)({left:X,right:K}=this.scrollParents.x.getBoundingClientRect());if(this.scrollParents.y)({top:Y,bottom:W}=this.scrollParents.y.getBoundingClientRect());let q=uK(this.view);if(Z.clientX-q.left<=X+IJ)J=-VJ(X-Z.clientX);else if(Z.clientX+q.right>=K-IJ)J=VJ(Z.clientX-K);if(Z.clientY-q.top<=Y+IJ)Q=-VJ(Y-Z.clientY);else if(Z.clientY+q.bottom>=W-IJ)Q=VJ(Z.clientY-W);this.setScrollSpeed(J,Q)}up(Z){if(this.dragging==null)this.select(this.lastEvent);if(!this.dragging)Z.preventDefault();this.destroy()}destroy(){this.setScrollSpeed(0,0);let Z=this.view.contentDOM.ownerDocument;Z.removeEventListener("mousemove",this.move),Z.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(Z,J){if(this.scrollSpeed={x:Z,y:J},Z||J){if(this.scrolling<0)this.scrolling=setInterval(()=>this.scroll(),50)}else if(this.scrolling>-1)clearInterval(this.scrolling),this.scrolling=-1}scroll(){let{x:Z,y:J}=this.scrollSpeed;if(Z&&this.scrollParents.x)this.scrollParents.x.scrollLeft+=Z,Z=0;if(J&&this.scrollParents.y)this.scrollParents.y.scrollTop+=J,J=0;if(Z||J)this.view.win.scrollBy(Z,J);if(this.dragging===!1)this.select(this.lastEvent)}select(Z){let{view:J}=this,Q=OV(this.atoms,this.style.get(Z,this.extend,this.multiple));if(this.mustSelect||!Q.eq(J.state.selection,this.dragging===!1))this.view.dispatch({selection:Q,userEvent:"select.pointer"});this.mustSelect=!1}update(Z){if(Z.transactions.some((J)=>J.isUserEvent("input.type")))this.destroy();else if(this.style.update(Z))setTimeout(()=>this.select(this.lastEvent),20)}}function fM(Z,J){let Q=Z.state.facet(lI);return Q.length?Q[0](J):r.mac?J.metaKey:J.ctrlKey}function gM(Z,J){let Q=Z.state.facet(sI);return Q.length?Q[0](J):r.mac?!J.altKey:!J.ctrlKey}function uM(Z,J){let{main:Q}=Z.state.selection;if(Q.empty)return!1;let X=H5(Z.root);if(!X||X.rangeCount==0)return!0;let Y=X.getRangeAt(0).getClientRects();for(let K=0;K<Y.length;K++){let W=Y[K];if(W.left<=J.clientX&&W.right>=J.clientX&&W.top<=J.clientY&&W.bottom>=J.clientY)return!0}return!1}function vM(Z,J){if(!J.bubbles)return!0;if(J.defaultPrevented)return!1;for(let Q=J.target,X;Q!=Z.contentDOM;Q=Q.parentNode)if(!Q||Q.nodeType==11||(X=d1.get(Q))&&X.isWidget()&&!X.isHidden&&X.widget.ignoreEvent(J))return!1;return!0}var y6=Object.create(null),x0=Object.create(null),SV=r.ie&&r.ie_version<15||r.ios&&r.webkit_version<604;function mM(Z){let J=Z.dom.parentNode;if(!J)return;let Q=J.appendChild(document.createElement("textarea"));Q.style.cssText="position: fixed; left: -10000px; top: 10px",Q.focus(),setTimeout(()=>{Z.focus(),Q.remove(),EV(Z,Q.value)},50)}function gJ(Z,J,Q){for(let X of Z.facet(J))Q=X(Q,Z);return Q}function EV(Z,J){J=gJ(Z.state,$K,J);let{state:Q}=Z,X,Y=1,K=Q.toText(J),W=K.lines==Q.selection.ranges.length;if(LK!=null&&Q.selection.ranges.every((G)=>G.empty)&&LK==K.toString()){let G=-1;X=Q.changeByRange((U)=>{let z=Q.doc.lineAt(U.from);if(z.from==G)return{range:U};G=z.from;let I=Q.toText((W?K.line(Y++).text:J)+Q.lineBreak);return{changes:{from:z.from,insert:I},range:h.cursor(U.from+I.length)}})}else if(W)X=Q.changeByRange((G)=>{let U=K.line(Y++);return{changes:{from:G.from,to:G.to,insert:U.text},range:h.cursor(G.from+U.length)}});else X=Q.replaceSelection(K);Z.dispatch(X,{userEvent:"input.paste",scrollIntoView:!0})}x0.scroll=(Z)=>{let J=Z.inputState;if(J.lastScrollTop=Z.scrollDOM.scrollTop,J.lastScrollLeft=Z.scrollDOM.scrollLeft,r.ios&&!J.touchActive)J.lastIOSMomentumScroll=Date.now()};x0.wheel=x0.mousewheel=(Z)=>{Z.inputState.lastWheelEvent=Date.now()};y6.keydown=(Z,J)=>{if(Z.inputState.setSelectionOrigin("select"),J.keyCode==27&&Z.inputState.tabFocusMode!=0)Z.inputState.tabFocusMode=Date.now()+2000;return!1};x0.touchstart=(Z,J)=>{let Q=Z.inputState,X=J.targetTouches[0];if(Q.touchActive=!0,Q.lastTouchTime=Date.now(),X)Q.lastTouchX=X.clientX,Q.lastTouchY=X.clientY;Q.setSelectionOrigin("select.pointer")};x0.touchmove=(Z)=>{Z.inputState.setSelectionOrigin("select.pointer")};x0.touchend=(Z,J)=>{Z.inputState.touchActive=!1};y6.mousedown=(Z,J)=>{if(Z.observer.flush(),Z.inputState.lastTouchTime>Date.now()-2000)return!1;let Q=null;for(let X of Z.state.facet(iI))if(Q=X(Z,J),Q)break;if(!Q&&J.button==0)Q=cM(Z,J);if(Q){let X=!Z.hasFocus;if(Z.inputState.startMouseSelection(new TV(Z,J,Q,X)),X)Z.observer.ignore(()=>{fI(Z.contentDOM);let K=Z.root.activeElement;if(K&&!K.contains(Z.contentDOM))K.blur()});let Y=Z.inputState.mouseSelection;if(Y)return Y.start(J),Y.dragging===!1}else Z.inputState.setSelectionOrigin("select.pointer");return!1};function WI(Z,J,Q,X){if(X==1)return h.cursor(J,Q);else if(X==2)return LM(Z.state,J,Q);else{let Y=Z.docView.lineAt(J,Q),K=Z.state.doc.lineAt(Y?Y.posAtEnd:J),W=Y?Y.posAtStart:K.from,q=Y?Y.posAtEnd:K.to;if(q<Z.state.doc.length&&q==K.to)q++;return h.undirectionalRange(W,q)}}var pM=r.ie&&r.ie_version<=11,qI=null,GI=0,UI=0;function CV(Z){if(!pM)return Z.detail;let J=qI,Q=UI;return qI=Z,UI=Date.now(),GI=!J||Q>Date.now()-400&&Math.abs(J.clientX-Z.clientX)<2&&Math.abs(J.clientY-Z.clientY)<2?(GI+1)%3:1}function cM(Z,J){let Q=Z.posAndSideAtCoords({x:J.clientX,y:J.clientY},!1),X=CV(J),Y=Z.state.selection;return{update(K){if(K.docChanged)Q.pos=K.changes.mapPos(Q.pos),Y=Y.map(K.changes)},get(K,W,q){let G=Z.posAndSideAtCoords({x:K.clientX,y:K.clientY},!1),U,z=WI(Z,G.pos,G.assoc,X);if(Q.pos!=G.pos&&!W){let I=WI(Z,Q.pos,Q.assoc,X),V=Math.min(I.from,z.from),H=Math.max(I.to,z.to);z=V<z.from?h.range(V,H,z.assoc):h.range(H,V,z.assoc)}if(W)return Y.replaceRange(Y.main.extend(z.from,z.to,z.assoc));else if(q&&X==1&&Y.ranges.length>1&&(U=dM(Y,G.pos)))return U;else if(q)return Y.addRange(z);else return h.create([z])}}}function dM(Z,J){for(let Q=0;Q<Z.ranges.length;Q++){let{from:X,to:Y}=Z.ranges[Q];if(X<=J&&Y>=J)return h.create(Z.ranges.slice(0,Q).concat(Z.ranges.slice(Q+1)),Z.mainIndex==Q?0:Z.mainIndex-(Z.mainIndex>Q?1:0))}return null}y6.dragstart=(Z,J)=>{let{selection:{main:Q}}=Z.state;if(J.target.draggable){let Y=Z.docView.tile.nearest(J.target);if(Y&&Y.isWidget()){let K=Y.posAtStart,W=K+Y.length;if(K>=Q.to||W<=Q.from)Q=h.undirectionalRange(K,W)}}let{inputState:X}=Z;if(X.mouseSelection)X.mouseSelection.dragging=!0;if(X.draggedContent=Q,J.dataTransfer)J.dataTransfer.setData("Text",gJ(Z.state,hK,Z.state.sliceDoc(Q.from,Q.to))),J.dataTransfer.effectAllowed="copyMove";return!1};y6.dragend=(Z)=>{return Z.inputState.draggedContent=null,!1};function zI(Z,J,Q,X){if(Q=gJ(Z.state,$K,Q),!Q)return;let Y=Z.posAtCoords({x:J.clientX,y:J.clientY},!1),{draggedContent:K}=Z.inputState,W=X&&K&&gM(Z,J)?{from:K.from,to:K.to}:null,q={from:Y,insert:Q},G=Z.state.changes(W?[W,q]:q);Z.focus(),Z.dispatch({changes:G,selection:{anchor:G.mapPos(Y,-1),head:G.mapPos(Y,1)},userEvent:W?"move.drop":"input.drop"}),Z.inputState.draggedContent=null}y6.drop=(Z,J)=>{if(!J.dataTransfer)return!1;if(Z.state.readOnly)return!0;let Q=J.dataTransfer.files;if(Q&&Q.length){let X=Array(Q.length),Y=0,K=()=>{if(++Y==Q.length)zI(Z,J,X.filter((W)=>W!=null).join(Z.state.lineBreak),!1)};for(let W=0;W<Q.length;W++){let q=new FileReader;q.onerror=K,q.onload=()=>{if(!/[\x00-\x08\x0e-\x1f]{2}/.test(q.result))X[W]=q.result;K()},q.readAsText(Q[W])}return!0}else{let X=J.dataTransfer.getData("Text");if(X)return zI(Z,J,X,!0),!0}return!1};y6.paste=(Z,J)=>{if(Z.state.readOnly)return!0;Z.observer.flush();let Q=SV?null:J.clipboardData;if(Q)return EV(Z,Q.getData("text/plain")||Q.getData("text/uri-list")),!0;else return mM(Z),!1};function nM(Z,J){let Q=Z.dom.parentNode;if(!Q)return;let X=Q.appendChild(document.createElement("textarea"));X.style.cssText="position: fixed; left: -10000px; top: 10px",X.value=J,X.focus(),X.selectionEnd=J.length,X.selectionStart=0,setTimeout(()=>{X.remove(),Z.focus()},50)}function lM(Z){let J=[],Q=[],X=!1;for(let Y of Z.selection.ranges)if(!Y.empty)J.push(Z.sliceDoc(Y.from,Y.to)),Q.push(Y);if(!J.length){let Y=-1;for(let{from:K}of Z.selection.ranges){let W=Z.doc.lineAt(K);if(W.number>Y)J.push(W.text),Q.push({from:W.from,to:Math.min(Z.doc.length,W.to+1)});Y=W.number}X=!0}return{text:gJ(Z,hK,J.join(Z.lineBreak)),ranges:Q,linewise:X}}var LK=null;y6.copy=y6.cut=(Z,J)=>{if(!z5(Z.contentDOM,Z.observer.selectionRange))return!1;let{text:Q,ranges:X,linewise:Y}=lM(Z.state);if(!Q&&!Y)return!1;if(LK=Y?Q:null,J.type=="cut"&&!Z.state.readOnly)Z.dispatch({changes:X,scrollIntoView:!0,userEvent:"delete.cut"});let K=SV?null:J.clipboardData;if(K)return K.clearData(),K.setData("text/plain",Q),!0;else return nM(Z,Q),!1};var _V=C6.define();function kV(Z,J){let Q=[];for(let X of Z.facet(oI)){let Y=X(Z,J);if(Y)Q.push(Y)}return Q.length?Z.update({effects:Q,annotations:_V.of(!0)}):null}function xV(Z){setTimeout(()=>{let J=Z.hasFocus;if(J!=Z.inputState.notifiedFocused){let Q=kV(Z.state,J);if(Q)Z.dispatch(Q);else Z.update([])}},10)}x0.focus=(Z)=>{if(Z.inputState.lastFocusTime=Date.now(),!Z.scrollDOM.scrollTop&&(Z.inputState.lastScrollTop||Z.inputState.lastScrollLeft))Z.scrollDOM.scrollTop=Z.inputState.lastScrollTop,Z.scrollDOM.scrollLeft=Z.inputState.lastScrollLeft;xV(Z)};x0.blur=(Z)=>{Z.observer.clearSelectionRange(),xV(Z)};x0.compositionstart=x0.compositionupdate=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.compositionFirstChange==null)Z.inputState.compositionFirstChange=!0;if(Z.inputState.composing<0)Z.inputState.composing=0};x0.compositionend=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.composing=-1,Z.inputState.compositionEndedAt=Date.now(),Z.inputState.compositionPendingKey=!0,Z.inputState.compositionPendingChange=Z.observer.pendingRecords().length>0,Z.inputState.compositionFirstChange=null,r.chrome&&r.android)Z.observer.flushSoon();else if(Z.inputState.compositionPendingChange)Promise.resolve().then(()=>Z.observer.flush());else setTimeout(()=>{if(Z.inputState.composing<0&&Z.docView.hasComposition)Z.update([])},50)};x0.contextmenu=(Z)=>{Z.inputState.lastContextMenu=Date.now()};y6.beforeinput=(Z,J)=>{var Q,X;if(J.inputType=="insertText"||J.inputType=="insertCompositionText")Z.inputState.insertingText=J.data,Z.inputState.insertingTextAt=Date.now();if(J.inputType=="insertReplacementText"&&Z.observer.editContext){let K=(Q=J.dataTransfer)===null||Q===void 0?void 0:Q.getData("text/plain"),W=J.getTargetRanges();if(K&&W.length){let q=W[0],G=Z.posAtDOM(q.startContainer,q.startOffset),U=Z.posAtDOM(q.endContainer,q.endOffset);return vK(Z,{from:G,to:U,insert:Z.state.toText(K)},null),!0}}let Y;if(r.chrome&&r.android&&(Y=LV.find((K)=>K.inputType==J.inputType))){if(Z.observer.delayAndroidKey(Y.key,Y.keyCode),Y.key=="Backspace"||Y.key=="Delete"){let K=((X=window.visualViewport)===null||X===void 0?void 0:X.height)||0;setTimeout(()=>{var W;if((((W=window.visualViewport)===null||W===void 0?void 0:W.height)||0)>K+10&&Z.hasFocus)Z.contentDOM.blur(),Z.focus()},100)}}if(r.ios&&J.inputType=="deleteContentForward")Z.observer.flushSoon();if(r.safari&&J.inputType=="insertText"&&Z.inputState.composing>=0)setTimeout(()=>x0.compositionend(Z,J),20);return!1};var II=new Set;function sM(Z){if(!II.has(Z))II.add(Z),Z.addEventListener("copy",()=>{}),Z.addEventListener("cut",()=>{})}var VI=["pre-wrap","normal","pre-line","break-spaces"],m7=!1;function jI(){m7=!1}class wV{constructor(Z){this.lineWrapping=Z,this.doc=R1.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(Z,J){let Q=this.doc.lineAt(J).number-this.doc.lineAt(Z).number+1;if(this.lineWrapping)Q+=Math.max(0,Math.ceil((J-Z-Q*this.lineLength*0.5)/this.lineLength));return this.lineHeight*Q}heightForLine(Z){if(!this.lineWrapping)return this.lineHeight;return(1+Math.max(0,Math.ceil((Z-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight}setDoc(Z){return this.doc=Z,this}mustRefreshForWrapping(Z){return VI.indexOf(Z)>-1!=this.lineWrapping}mustRefreshForHeights(Z){let J=!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q];if(X<0)Q++;else if(!this.heightSamples[Math.floor(X*10)])J=!0,this.heightSamples[Math.floor(X*10)]=!0}return J}refresh(Z,J,Q,X,Y,K){let W=VI.indexOf(Z)>-1,q=Math.abs(J-this.lineHeight)>0.3||this.lineWrapping!=W;if(this.lineWrapping=W,this.lineHeight=J,this.charWidth=Q,this.textHeight=X,this.lineLength=Y,q){this.heightSamples={};for(let G=0;G<K.length;G++){let U=K[G];if(U<0)G++;else this.heightSamples[Math.floor(U*10)]=!0}}return q}}class bV{constructor(Z,J){this.from=Z,this.heights=J,this.index=0}get more(){return this.index<this.heights.length}}class x6{constructor(Z,J,Q,X,Y){this.from=Z,this.length=J,this.top=Q,this.height=X,this._content=Y}get type(){return typeof this._content=="number"?F0.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof d9?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(Z){let J=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(Z._content)?Z._content:[Z]);return new x6(this.from,this.length+Z.length,this.top,this.height+Z.height,J)}}var h1=function(Z){return Z[Z.ByPos=0]="ByPos",Z[Z.ByHeight=1]="ByHeight",Z[Z.ByPosNoHeight=2]="ByPosNoHeight",Z}(h1||(h1={})),BJ=0.001;class k0{constructor(Z,J,Q=2){this.length=Z,this.height=J,this.flags=Q}get outdated(){return(this.flags&2)>0}set outdated(Z){this.flags=(Z?2:0)|this.flags&-3}setHeight(Z){if(this.height!=Z){if(Math.abs(this.height-Z)>BJ)m7=!0;this.height=Z}}replace(Z,J,Q){return k0.of(Q)}decomposeLeft(Z,J){J.push(this)}decomposeRight(Z,J){J.push(this)}applyChanges(Z,J,Q,X){let Y=this,K=Q.doc;for(let W=X.length-1;W>=0;W--){let{fromA:q,toA:G,fromB:U,toB:z}=X[W],I=Y.lineAt(q,h1.ByPosNoHeight,Q.setDoc(J),0,0),V=I.to>=G?I:Y.lineAt(G,h1.ByPosNoHeight,Q,0,0);z+=V.to-G,G=V.to;while(W>0&&I.from<=X[W-1].toA)if(q=X[W-1].fromA,U=X[W-1].fromB,W--,q<I.from)I=Y.lineAt(q,h1.ByPosNoHeight,Q,0,0);U+=I.from-q,q=I.from;let H=pK.build(Q.setDoc(K),Z,U,z);Y=bJ(Y,Y.replace(q,G,H))}return Y.updateHeight(Q,0)}static empty(){return new r0(0,0,0)}static of(Z){if(Z.length==1)return Z[0];let J=0,Q=Z.length,X=0,Y=0;for(;;)if(J==Q)if(X>Y*2){let W=Z[J-1];if(W.break)Z.splice(--J,1,W.left,null,W.right);else Z.splice(--J,1,W.left,W.right);Q+=1+W.break,X-=W.size}else if(Y>X*2){let W=Z[Q];if(W.break)Z.splice(Q,1,W.left,null,W.right);else Z.splice(Q,1,W.left,W.right);Q+=2+W.break,Y-=W.size}else break;else if(X<Y){let W=Z[J++];if(W)X+=W.size}else{let W=Z[--Q];if(W)Y+=W.size}let K=0;if(Z[J-1]==null)K=1,J--;else if(Z[J]==null)K=1,Q++;return new yV(k0.of(Z.slice(0,J)),K,k0.of(Z.slice(Q)))}}function bJ(Z,J){if(Z==J)return Z;if(Z.constructor!=J.constructor)m7=!0;return J}k0.prototype.size=1;var iM=L1.replace({});class mK extends k0{constructor(Z,J,Q){super(Z,J);this.deco=Q,this.spaceAbove=0}mainBlock(Z,J){return new x6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(Z,J,Q,X){return this.spaceAbove&&Z<Q+this.spaceAbove?new x6(X,0,Q,this.spaceAbove,iM):this.mainBlock(Q,X)}lineAt(Z,J,Q,X,Y){let K=this.mainBlock(X,Y);return this.spaceAbove?this.blockAt(0,Q,X,Y).join(K):K}forEachLine(Z,J,Q,X,Y,K){if(Z<=Y+this.length&&J>=Y)K(this.lineAt(0,h1.ByPos,Q,X,Y))}setMeasuredHeight(Z){let J=Z.heights[Z.index++];if(J<0)this.spaceAbove=-J,J=Z.heights[Z.index++];else this.spaceAbove=0;this.setHeight(J)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);return this.outdated=!1,this}toString(){return`block(${this.length})`}}class r0 extends mK{constructor(Z,J,Q){super(Z,J,null);this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=Q}mainBlock(Z,J){return new x6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(Z,J,Q){let X=Q[0];if(Q.length==1&&(X instanceof r0||X instanceof O0&&X.flags&4)&&Math.abs(this.length-X.length)<10){if(X instanceof O0)X=new r0(X.length,this.height,this.spaceAbove);else X.height=this.height;if(!this.outdated)X.outdated=!1;return X}else return k0.of(Q)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);else if(Q||this.outdated)this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,Z.heightForLine(this.length-this.collapsed))+this.breaks*Z.lineHeight);return this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class O0 extends k0{constructor(Z){super(Z,0)}heightMetrics(Z,J){let Q=Z.doc.lineAt(J).number,X=Z.doc.lineAt(J+this.length).number,Y=X-Q+1,K,W=0;if(Z.lineWrapping){let q=Math.min(this.height,Z.lineHeight*Y);if(K=q/Y,this.length>Y+1)W=(this.height-q)/(this.length-Y-1)}else K=this.height/Y;return{firstLine:Q,lastLine:X,perLine:K,perChar:W}}blockAt(Z,J,Q,X){let{firstLine:Y,lastLine:K,perLine:W,perChar:q}=this.heightMetrics(J,X);if(J.lineWrapping){let G=X+(Z<J.lineHeight?0:Math.round(Math.max(0,Math.min(1,(Z-Q)/this.height))*this.length)),U=J.doc.lineAt(G),z=W+U.length*q,I=Math.max(Q,Z-z/2);return new x6(U.from,U.length,I,z,0)}else{let G=Math.max(0,Math.min(K-Y,Math.floor((Z-Q)/W))),{from:U,length:z}=J.doc.line(Y+G);return new x6(U,z,Q+W*G,W,0)}}lineAt(Z,J,Q,X,Y){if(J==h1.ByHeight)return this.blockAt(Z,Q,X,Y);if(J==h1.ByPosNoHeight){let{from:V,to:H}=Q.doc.lineAt(Z);return new x6(V,H-V,0,0,0)}let{firstLine:K,perLine:W,perChar:q}=this.heightMetrics(Q,Y),G=Q.doc.lineAt(Z),U=W+G.length*q,z=G.number-K,I=X+W*z+q*(G.from-Y-z);return new x6(G.from,G.length,Math.max(X,Math.min(I,X+this.height-U)),U,0)}forEachLine(Z,J,Q,X,Y,K){Z=Math.max(Z,Y),J=Math.min(J,Y+this.length);let{firstLine:W,perLine:q,perChar:G}=this.heightMetrics(Q,Y);for(let U=Z,z=X;U<=J;){let I=Q.doc.lineAt(U);if(U==Z){let H=I.number-W;z+=q*H+G*(Z-Y-H)}let V=q+G*I.length;K(new x6(I.from,I.length,z,V,0)),z+=V,U=I.to+1}}replace(Z,J,Q){let X=this.length-J;if(X>0){let Y=Q[Q.length-1];if(Y instanceof O0)Q[Q.length-1]=new O0(Y.length+X);else Q.push(null,new O0(X-1))}if(Z>0){let Y=Q[0];if(Y instanceof O0)Q[0]=new O0(Z+Y.length);else Q.unshift(new O0(Z-1),null)}return k0.of(Q)}decomposeLeft(Z,J){J.push(new O0(Z-1),null)}decomposeRight(Z,J){J.push(null,new O0(this.length-Z-1))}updateHeight(Z,J=0,Q=!1,X){let Y=J+this.length;if(X&&X.from<=J+this.length&&X.more){let K=[],W=Math.max(J,X.from),q=-1;if(X.from>J)K.push(new O0(X.from-J-1).updateHeight(Z,J));while(W<=Y&&X.more){let U=Z.doc.lineAt(W).length;if(K.length)K.push(null);let z=X.heights[X.index++],I=0;if(z<0)I=-z,z=X.heights[X.index++];if(q==-1)q=z;else if(Math.abs(z-q)>=BJ)q=-2;let V=new r0(U,z,I);V.outdated=!1,K.push(V),W+=U+1}if(W<=Y)K.push(null,new O0(Y-W).updateHeight(Z,W));let G=k0.of(K);if(q<0||Math.abs(G.height-this.height)>=BJ||Math.abs(q-this.heightMetrics(Z,J).perLine)>=BJ)m7=!0;return bJ(this,G)}else if(Q||this.outdated)this.setHeight(Z.heightForGap(J,J+this.length)),this.outdated=!1;return this}toString(){return`gap(${this.length})`}}class yV extends k0{constructor(Z,J,Q){super(Z.length+J+Q.length,Z.height+Q.height,J|(Z.outdated||Q.outdated?2:0));this.left=Z,this.right=Q,this.size=Z.size+Q.size}get break(){return this.flags&1}blockAt(Z,J,Q,X){let Y=Q+this.left.height;return Z<Y?this.left.blockAt(Z,J,Q,X):this.right.blockAt(Z,J,Y,X+this.left.length+this.break)}lineAt(Z,J,Q,X,Y){let K=X+this.left.height,W=Y+this.left.length+this.break,q=J==h1.ByHeight?Z<K:Z<W,G=q?this.left.lineAt(Z,J,Q,X,Y):this.right.lineAt(Z,J,Q,K,W);if(this.break||(q?G.to<W:G.from>W))return G;let U=J==h1.ByPosNoHeight?h1.ByPosNoHeight:h1.ByPos;if(q)return G.join(this.right.lineAt(W,U,Q,K,W));else return this.left.lineAt(W,U,Q,X,Y).join(G)}forEachLine(Z,J,Q,X,Y,K){let W=X+this.left.height,q=Y+this.left.length+this.break;if(this.break){if(Z<q)this.left.forEachLine(Z,J,Q,X,Y,K);if(J>=q)this.right.forEachLine(Z,J,Q,W,q,K)}else{let G=this.lineAt(q,h1.ByPos,Q,X,Y);if(Z<G.from)this.left.forEachLine(Z,G.from-1,Q,X,Y,K);if(G.to>=Z&&G.from<=J)K(G);if(J>G.to)this.right.forEachLine(G.to+1,J,Q,W,q,K)}}replace(Z,J,Q){let X=this.left.length+this.break;if(J<X)return this.balanced(this.left.replace(Z,J,Q),this.right);if(Z>this.left.length)return this.balanced(this.left,this.right.replace(Z-X,J-X,Q));let Y=[];if(Z>0)this.decomposeLeft(Z,Y);let K=Y.length;for(let W of Q)Y.push(W);if(Z>0)HI(Y,K-1);if(J<this.length){let W=Y.length;this.decomposeRight(J,Y),HI(Y,W)}return k0.of(Y)}decomposeLeft(Z,J){let Q=this.left.length;if(Z<=Q)return this.left.decomposeLeft(Z,J);if(J.push(this.left),this.break){if(Q++,Z>=Q)J.push(null)}if(Z>Q)this.right.decomposeLeft(Z-Q,J)}decomposeRight(Z,J){let Q=this.left.length,X=Q+this.break;if(Z>=X)return this.right.decomposeRight(Z-X,J);if(Z<Q)this.left.decomposeRight(Z,J);if(this.break&&Z<X)J.push(null);J.push(this.right)}balanced(Z,J){if(Z.size>2*J.size||J.size>2*Z.size)return k0.of(this.break?[Z,null,J]:[Z,J]);return this.left=bJ(this.left,Z),this.right=bJ(this.right,J),this.setHeight(Z.height+J.height),this.outdated=Z.outdated||J.outdated,this.size=Z.size+J.size,this.length=Z.length+this.break+J.length,this}updateHeight(Z,J=0,Q=!1,X){let{left:Y,right:K}=this,W=J+Y.length+this.break,q=null;if(X&&X.from<=J+Y.length&&X.more)q=Y=Y.updateHeight(Z,J,Q,X);else Y.updateHeight(Z,J,Q);if(X&&X.from<=W+K.length&&X.more)q=K=K.updateHeight(Z,W,Q,X);else K.updateHeight(Z,W,Q);if(q)return this.balanced(Y,K);return this.height=this.left.height+this.right.height,this.outdated=!1,this}toString(){return this.left+(this.break?" ":"-")+this.right}}function HI(Z,J){let Q,X;if(Z[J]==null&&(Q=Z[J-1])instanceof O0&&(X=Z[J+1])instanceof O0)Z.splice(J-1,3,new O0(Q.length+1+X.length))}var rM=5;class pK{constructor(Z,J){this.pos=Z,this.oracle=J,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=Z}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(Z,J){if(this.lineStart>-1){let Q=Math.min(J,this.lineEnd),X=this.nodes[this.nodes.length-1];if(X instanceof r0)X.length+=Q-this.pos;else if(Q>this.pos||!this.isCovered)this.nodes.push(new r0(Q-this.pos,-1,0));if(this.writtenTo=Q,J>Q)this.nodes.push(null),this.writtenTo++,this.lineStart=-1}this.pos=J}point(Z,J,Q){if(Z<J||Q.heightRelevant){let X=Q.widget?Q.widget.estimatedHeight:0,Y=Q.widget?Q.widget.lineBreaks:0;if(X<0)X=this.oracle.lineHeight;let K=J-Z;if(Q.block)this.addBlock(new mK(K,X,Q));else if(K||Y||X>=rM)this.addLineDeco(X,Y,K)}else if(J>Z)this.span(Z,J);if(this.lineEnd>-1&&this.lineEnd<this.pos)this.lineEnd=this.oracle.doc.lineAt(this.pos).to}enterLine(){if(this.lineStart>-1)return;let{from:Z,to:J}=this.oracle.doc.lineAt(this.pos);if(this.lineStart=Z,this.lineEnd=J,this.writtenTo<Z){if(this.writtenTo<Z-1||this.nodes[this.nodes.length-1]==null)this.nodes.push(this.blankContent(this.writtenTo,Z-1));this.nodes.push(null)}if(this.pos>Z)this.nodes.push(new r0(this.pos-Z,-1,0));this.writtenTo=this.pos}blankContent(Z,J){let Q=new O0(J-Z);if(this.oracle.doc.lineAt(Z).to==J)Q.flags|=4;return Q}ensureLine(){this.enterLine();let Z=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(Z instanceof r0)return Z;let J=new r0(0,-1,0);return this.nodes.push(J),J}addBlock(Z){this.enterLine();let J=Z.deco;if(J&&J.startSide>0&&!this.isCovered)this.ensureLine();if(this.nodes.push(Z),this.writtenTo=this.pos=this.pos+Z.length,J&&J.endSide>0)this.covering=Z}addLineDeco(Z,J,Q){let X=this.ensureLine();X.length+=Q,X.collapsed+=Q,X.widgetHeight=Math.max(X.widgetHeight,Z),X.breaks+=J,this.writtenTo=this.pos=this.pos+Q}finish(Z){let J=this.nodes.length==0?null:this.nodes[this.nodes.length-1];if(this.lineStart>-1&&!(J instanceof r0)&&!this.isCovered)this.nodes.push(new r0(0,-1,0));else if(this.writtenTo<this.pos||J==null)this.nodes.push(this.blankContent(this.writtenTo,this.pos));let Q=Z;for(let X of this.nodes){if(X instanceof r0)X.updateHeight(this.oracle,Q);Q+=X?X.length:1}return this.nodes}static build(Z,J,Q,X){let Y=new pK(Q,Z);return N1.spans(J,Q,X,Y,0),Y.finish(Q)}}function aM(Z,J,Q){let X=new $V;return N1.compare(Z,J,Q,X,0),X.changes}class $V{constructor(){this.changes=[]}compareRange(){}comparePoint(Z,J,Q,X){if(Z<J||Q&&Q.heightRelevant||X&&X.heightRelevant)f7(Z,J,this.changes,5)}}function oM(Z,J){let Q=Z.getBoundingClientRect(),X=Z.ownerDocument,Y=X.defaultView||window,K=Math.max(0,Q.left),W=Math.min(Y.innerWidth,Q.right),q=Math.max(0,Q.top),G=Math.min(Y.innerHeight,Q.bottom);for(let U=Z.parentNode;U&&U!=X.body;)if(U.nodeType==1){let z=U,I=window.getComputedStyle(z);if((z.scrollHeight>z.clientHeight||z.scrollWidth>z.clientWidth)&&I.overflow!="visible"){let V=z.getBoundingClientRect();K=Math.max(K,V.left),W=Math.min(W,V.right),q=Math.max(q,V.top),G=Math.min(U==Z.parentNode?Y.innerHeight:G,V.bottom)}U=I.position=="absolute"||I.position=="fixed"?z.offsetParent:z.parentNode}else if(U.nodeType==11)U=U.host;else break;return{left:K-Q.left,right:Math.max(K,W)-Q.left,top:q-(Q.top+J),bottom:Math.max(q,G)-(Q.top+J)}}function tM(Z){let J=Z.getBoundingClientRect(),Q=Z.ownerDocument.defaultView||window;return J.left<Q.innerWidth&&J.right>0&&J.top<Q.innerHeight&&J.bottom>0}function eM(Z,J){let Q=Z.getBoundingClientRect();return{left:0,right:Q.right-Q.left,top:J,bottom:Q.bottom-(Q.top+J)}}class LJ{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.size=Q,this.displaySize=X}static same(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.size!=Y.size)return!1}return!0}draw(Z,J){return L1.replace({widget:new hV(this.displaySize*(J?Z.scaleY:Z.scaleX),J)}).range(this.from,this.to)}}class hV extends e8{constructor(Z,J){super();this.size=Z,this.vertical=J}eq(Z){return Z.size==this.size&&Z.vertical==this.vertical}toDOM(){let Z=document.createElement("div");if(this.vertical)Z.style.height=this.size+"px";else Z.style.width=this.size+"px",Z.style.height="2px",Z.style.display="inline-block";return Z}get estimatedHeight(){return this.vertical?this.size:-1}}class PK{constructor(Z,J){this.view=Z,this.state=J,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=OI,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=k1.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let Q=J.facet(fK).some((X)=>typeof X!="function"&&X.class=="cm-lineWrapping");this.heightOracle=new wV(Q),this.stateDeco=FI(J),this.heightMap=k0.empty().applyChanges(this.stateDeco,R1.empty,this.heightOracle.setDoc(J.doc),[new W6(0,0,0,J.doc.length)]);for(let X=0;X<2;X++)if(this.viewport=this.getViewport(0,null),!this.updateForViewport())break;this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=L1.set(this.lineGaps.map((X)=>X.draw(this,!1))),this.scrollParent=Z.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let Z=[this.viewport],{main:J}=this.state.selection;for(let Q=0;Q<=1;Q++){let X=Q?J.head:J.anchor;if(!Z.some(({from:Y,to:K})=>X>=Y&&X<=K)){let{from:Y,to:K}=this.lineBlockAt(X);Z.push(new q5(Y,K))}}return this.viewports=Z.sort((Q,X)=>Q.from-X.from),this.updateScaler()}updateScaler(){let Z=this.scaler;return this.scaler=this.heightMap.height<=7000000?OI:new cK(this.heightOracle,this.heightMap,this.viewports),Z.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,(Z)=>{this.viewportLines.push(G5(Z,this.scaler))})}update(Z,J=null){this.state=Z.state;let Q=this.stateDeco;this.stateDeco=FI(this.state);let X=Z.changedRanges,Y=W6.extendWithRanges(X,aM(Q,this.stateDeco,Z?Z.changes:a1.empty(this.state.doc.length))),K=this.heightMap.height,W=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);if(jI(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,Z.startState.doc,this.heightOracle.setDoc(this.state.doc),Y),this.heightMap.height!=K||m7)Z.flags|=2;if(W)this.scrollAnchorPos=Z.changes.mapPos(W.from,-1),this.scrollAnchorHeight=W.top;else this.scrollAnchorPos=-1,this.scrollAnchorHeight=K;let q=Y.length?this.mapViewport(this.viewport,Z.changes):this.viewport;if(J&&(J.range.head<q.from||J.range.head>q.to)||!this.viewportIsAppropriate(q))q=this.getViewport(0,J);let G=q.from!=this.viewport.from||q.to!=this.viewport.to;if(this.viewport=q,Z.flags|=this.updateForViewport(),G||!Z.changes.empty||Z.flags&2)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,Z.changes)));if(Z.flags|=this.computeVisibleRanges(Z.changes),J)this.scrollTarget=J;if(!this.mustEnforceCursorAssoc&&(Z.selectionSet||Z.focusChanged)&&Z.view.lineWrapping&&Z.state.selection.main.empty&&Z.state.selection.main.assoc&&!Z.state.facet(eI))this.mustEnforceCursorAssoc=!0}measure(){let{view:Z}=this,J=Z.contentDOM,Q=window.getComputedStyle(J),X=this.heightOracle,Y=Q.whiteSpace;this.defaultTextDirection=Q.direction=="rtl"?k1.RTL:k1.LTR;let K=this.heightOracle.mustRefreshForWrapping(Y)||this.mustMeasureContent==="refresh",W=J.getBoundingClientRect(),q=K||this.mustMeasureContent||this.contentDOMHeight!=W.height;this.contentDOMHeight=W.height,this.mustMeasureContent=!1;let G=0,U=0;if(W.width&&W.height){let{scaleX:k,scaleY:A}=wI(J,W);if(k>0.005&&Math.abs(this.scaleX-k)>0.005||A>0.005&&Math.abs(this.scaleY-A)>0.005)this.scaleX=k,this.scaleY=A,G|=16,K=q=!0}let z=(parseInt(Q.paddingTop)||0)*this.scaleY,I=(parseInt(Q.paddingBottom)||0)*this.scaleY;if(this.paddingTop!=z||this.paddingBottom!=I)this.paddingTop=z,this.paddingBottom=I,G|=18;if(this.editorWidth!=Z.scrollDOM.clientWidth){if(X.lineWrapping)q=!0;this.editorWidth=Z.scrollDOM.clientWidth,G|=16}let V=bI(this.view.contentDOM,!1).y;if(V!=this.scrollParent)this.scrollParent=V,this.scrollAnchorHeight=-1,this.scrollOffset=0;let H=this.getScrollOffset();if(this.scrollOffset!=H)this.scrollAnchorHeight=-1,this.scrollOffset=H;this.scrolledToBottom=gI(this.scrollParent||Z.win);let F=(this.printing?eM:oM)(J,this.paddingTop),N=F.top-this.pixelViewport.top,R=F.bottom-this.pixelViewport.bottom;this.pixelViewport=F;let T=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(T!=this.inView){if(this.inView=T,T)q=!0}if(!this.inView&&!this.scrollTarget&&!tM(Z.dom))return 0;let S=W.width;if(this.contentDOMWidth!=S||this.editorHeight!=Z.scrollDOM.clientHeight)this.contentDOMWidth=W.width,this.editorHeight=Z.scrollDOM.clientHeight,G|=16;if(q){let k=Z.docView.measureVisibleLineHeights(this.viewport);if(X.mustRefreshForHeights(k))K=!0;if(K||X.lineWrapping&&Math.abs(S-this.contentDOMWidth)>X.charWidth){let{lineHeight:A,charWidth:L,textHeight:B}=Z.docView.measureTextSize();if(K=A>0&&X.refresh(Y,A,L,B,Math.max(5,S/L),k),K)Z.docView.minWidth=0,G|=16}if(N>0&&R>0)U=Math.max(N,R);else if(N<0&&R<0)U=Math.min(N,R);jI();for(let A of this.viewports){let L=A.from==this.viewport.from?k:Z.docView.measureVisibleLineHeights(A);this.heightMap=(K?k0.empty().applyChanges(this.stateDeco,R1.empty,this.heightOracle,[new W6(0,0,0,Z.state.doc.length)]):this.heightMap).updateHeight(X,0,K,new bV(A.from,L))}if(m7)G|=2}let C=!this.viewportIsAppropriate(this.viewport,U)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);if(C){if(G&2)G|=this.updateScaler();this.viewport=this.getViewport(U,this.scrollTarget),G|=this.updateForViewport()}if(G&2||C)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(K?[]:this.lineGaps,Z));if(G|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc)this.mustEnforceCursorAssoc=!1,Z.docView.enforceCursorAssoc();return G}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(Z,J){let Q=0.5-Math.max(-0.5,Math.min(0.5,Z/1000/2)),X=this.heightMap,Y=this.heightOracle,{visibleTop:K,visibleBottom:W}=this,q=new q5(X.lineAt(K-Q*1000,h1.ByHeight,Y,0,0).from,X.lineAt(W+(1-Q)*1000,h1.ByHeight,Y,0,0).to);if(J){let{head:G}=J.range;if(G<q.from||G>q.to){let U=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),z=X.lineAt(G,h1.ByPos,Y,0,0),I;if(J.y=="center")I=(z.top+z.bottom)/2-U/2;else if(J.y=="start"||J.y=="nearest"&&G<q.from)I=z.top;else I=z.bottom-U;q=new q5(X.lineAt(I-500,h1.ByHeight,Y,0,0).from,X.lineAt(I+U+500,h1.ByHeight,Y,0,0).to)}}return q}mapViewport(Z,J){let Q=J.mapPos(Z.from,-1),X=J.mapPos(Z.to,1);return new q5(this.heightMap.lineAt(Q,h1.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(X,h1.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:Z,to:J},Q=0){if(!this.inView)return!0;let{top:X}=this.heightMap.lineAt(Z,h1.ByPos,this.heightOracle,0,0),{bottom:Y}=this.heightMap.lineAt(J,h1.ByPos,this.heightOracle,0,0),{visibleTop:K,visibleBottom:W}=this;return(Z==0||X<=K-Math.max(10,Math.min(-Q,250)))&&(J==this.state.doc.length||Y>=W+Math.max(10,Math.min(Q,250)))&&(X>K-2000&&Y<W+2000)}mapLineGaps(Z,J){if(!Z.length||J.empty)return Z;let Q=[];for(let X of Z)if(!J.touchesRange(X.from,X.to))Q.push(new LJ(J.mapPos(X.from),J.mapPos(X.to),X.size,X.displaySize));return Q}ensureLineGaps(Z,J){let Q=this.heightOracle.lineWrapping,X=Q?1e4:2000,Y=X>>1,K=X<<1;if(this.defaultTextDirection!=k1.LTR&&!Q)return[];let W=[],q=(U,z,I,V)=>{if(z-U<Y)return;let H=this.state.selection.main,F=[H.from];if(!H.empty)F.push(H.to);for(let R of F)if(R>U&&R<z){q(U,R-10,I,V),q(R+10,z,I,V);return}let N=JA(Z,(R)=>R.from>=I.from&&R.to<=I.to&&Math.abs(R.from-U)<Y&&Math.abs(R.to-z)<Y&&!F.some((T)=>R.from<T&&R.to>T));if(!N){if(z<I.to&&J&&Q&&J.visibleRanges.some((S)=>S.from<=z&&S.to>=z)){let S=J.moveToLineBoundary(h.cursor(z),!1,!0).head;if(S>U)z=S}let R=this.gapSize(I,U,z,V),T=Q||R<2000000?R:2000000;N=new LJ(U,z,R,T)}W.push(N)},G=(U)=>{if(U.length<K||U.type!=F0.Text)return;let z=ZA(U.from,U.to,this.stateDeco);if(z.total<K)return;let I=this.scrollTarget?this.scrollTarget.range.head:null,V,H;if(Q){let F=X/this.heightOracle.lineLength*this.heightOracle.lineHeight,N,R;if(I!=null){let T=HJ(z,I),S=((this.visibleBottom-this.visibleTop)/2+F)/U.height;N=T-S,R=T+S}else N=(this.visibleTop-U.top-F)/U.height,R=(this.visibleBottom-U.top+F)/U.height;V=jJ(z,N),H=jJ(z,R)}else{let F=z.total*this.heightOracle.charWidth,N=X*this.heightOracle.charWidth,R=0;if(F>2000000){for(let A of Z)if(A.from>=U.from&&A.from<U.to&&A.size!=A.displaySize&&A.from*this.heightOracle.charWidth+R<this.pixelViewport.left)R=A.size-A.displaySize}let T=this.pixelViewport.left+R,S=this.pixelViewport.right+R,C,k;if(I!=null){let A=HJ(z,I),L=((S-T)/2+N)/F;C=A-L,k=A+L}else C=(T-N)/F,k=(S+N)/F;V=jJ(z,C),H=jJ(z,k)}if(V>U.from)q(U.from,V,U,z);if(H<U.to)q(H,U.to,U,z)};for(let U of this.viewportLines)if(Array.isArray(U.type))U.type.forEach(G);else G(U);return W}gapSize(Z,J,Q,X){let Y=HJ(X,Q)-HJ(X,J);if(this.heightOracle.lineWrapping)return Z.height*Y;else return X.total*this.heightOracle.charWidth*Y}updateLineGaps(Z){if(!LJ.same(Z,this.lineGaps))this.lineGaps=Z,this.lineGapDeco=L1.set(Z.map((J)=>J.draw(this,this.heightOracle.lineWrapping)))}computeVisibleRanges(Z){let J=this.stateDeco;if(this.lineGaps.length)J=J.concat(this.lineGapDeco);let Q=[];N1.spans(J,this.viewport.from,this.viewport.to,{span(Y,K){Q.push({from:Y,to:K})},point(){}},20);let X=0;if(Q.length!=this.visibleRanges.length)X=12;else for(let Y=0;Y<Q.length&&!(X&8);Y++){let K=this.visibleRanges[Y],W=Q[Y];if(K.from!=W.from||K.to!=W.to){if(X|=4,!(Z&&Z.mapPos(K.from,-1)==W.from&&Z.mapPos(K.to,1)==W.to))X|=8}}return this.visibleRanges=Q,X}lineBlockAt(Z){return Z>=this.viewport.from&&Z<=this.viewport.to&&this.viewportLines.find((J)=>J.from<=Z&&J.to>=Z)||G5(this.heightMap.lineAt(Z,h1.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(Z){return Z>=this.viewportLines[0].top&&Z<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find((J)=>J.top<=Z&&J.bottom>=Z)||G5(this.heightMap.lineAt(this.scaler.fromDOM(Z),h1.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(Z){let J=this.lineBlockAtHeight(Z+8);return J.from>=this.viewport.from||this.viewportLines[0].top-Z>200?J:this.viewportLines[0]}elementAtHeight(Z){return G5(this.heightMap.blockAt(this.scaler.fromDOM(Z),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class q5{constructor(Z,J){this.from=Z,this.to=J}}function ZA(Z,J,Q){let X=[],Y=Z,K=0;if(N1.spans(Q,Z,J,{span(){},point(W,q){if(W>Y)X.push({from:Y,to:W}),K+=W-Y;Y=q}},20),Y<J)X.push({from:Y,to:J}),K+=J-Y;return{total:K,ranges:X}}function jJ({total:Z,ranges:J},Q){if(Q<=0)return J[0].from;if(Q>=1)return J[J.length-1].to;let X=Math.floor(Z*Q);for(let Y=0;;Y++){let{from:K,to:W}=J[Y],q=W-K;if(X<=q)return K+X;X-=q}}function HJ(Z,J){let Q=0;for(let{from:X,to:Y}of Z.ranges){if(J<=Y){Q+=J-X;break}Q+=Y-X}return Q/Z.total}function JA(Z,J){for(let Q of Z)if(J(Q))return Q;return}var OI={toDOM(Z){return Z},fromDOM(Z){return Z},scale:1,eq(Z){return Z==this}};function FI(Z){let J=Z.facet(fJ).filter((X)=>typeof X!="function"),Q=Z.facet(gK).filter((X)=>typeof X!="function");if(Q.length)J.push(N1.join(Q));return J}class cK{constructor(Z,J,Q){let X=0,Y=0,K=0;this.viewports=Q.map(({from:W,to:q})=>{let G=J.lineAt(W,h1.ByPos,Z,0,0).top,U=J.lineAt(q,h1.ByPos,Z,0,0).bottom;return X+=U-G,{from:W,to:q,top:G,bottom:U,domTop:0,domBottom:0}}),this.scale=(7000000-X)/(J.height-X);for(let W of this.viewports)W.domTop=K+(W.top-Y)*this.scale,K=W.domBottom=W.domTop+(W.bottom-W.top),Y=W.bottom}toDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.top)return X+(Z-Q)*this.scale;if(Z<=Y.bottom)return Y.domTop+(Z-Y.top);Q=Y.bottom,X=Y.domBottom}}fromDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.domTop)return Q+(Z-X)/this.scale;if(Z<=Y.domBottom)return Y.top+(Z-Y.domTop);Q=Y.bottom,X=Y.domBottom}}eq(Z){if(!(Z instanceof cK))return!1;return this.scale==Z.scale&&this.viewports.length==Z.viewports.length&&this.viewports.every((J,Q)=>J.from==Z.viewports[Q].from&&J.to==Z.viewports[Q].to)}}function G5(Z,J){if(J.scale==1)return Z;let Q=J.toDOM(Z.top),X=J.toDOM(Z.bottom);return new x6(Z.from,Z.length,Q,X-Q,Array.isArray(Z._content)?Z._content.map((Y)=>G5(Y,J)):Z._content)}var OJ=o.define({combine:(Z)=>Z.join(" ")}),TK=o.define({combine:(Z)=>Z.indexOf(!0)>-1}),SK=_6.newName(),fV=_6.newName(),gV=_6.newName(),uV={"&light":"."+fV,"&dark":"."+gV};function EK(Z,J,Q){return new _6(J,{finish(X){return/&/.test(X)?X.replace(/&\w*/,(Y)=>{if(Y=="&")return Z;if(!Q||!Q[Y])throw RangeError(`Unsupported selector: ${Y}`);return Q[Y]}):Z+" "+X}})}var QA=EK("."+SK,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{userSelect:"none",position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},".cm-panels-top":{top:"0"},".cm-panels-bottom":{bottom:"0"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},uV),XA={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},KK=r.ie&&r.ie_version<=11;class vV{constructor(Z){if(this.view=Z,this.active=!1,this.editContext=null,this.selectionRange=new yI,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=Z.contentDOM,this.observer=new MutationObserver((J)=>{for(let Q of J)this.queue.push(Q);if((r.ie&&r.ie_version<=11||r.ios&&Z.composing)&&J.some((Q)=>Q.type=="childList"&&Q.removedNodes.length||Q.type=="characterData"&&Q.oldValue.length>Q.target.nodeValue.length))this.flushSoon();else this.flush()}),window.EditContext&&r.android&&Z.constructor.EDIT_CONTEXT!==!1&&!(r.chrome&&r.chrome_version<126)){if(this.editContext=new mV(Z),Z.state.facet(E8))Z.contentDOM.editContext=this.editContext.editContext}if(KK)this.onCharData=(J)=>{this.queue.push({target:J.target,type:"characterData",oldValue:J.prevValue}),this.flushSoon()};if(this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia)this.printQuery=window.matchMedia("print");if(typeof ResizeObserver=="function")this.resizeScroll=new ResizeObserver(()=>{var J;if(((J=this.view.docView)===null||J===void 0?void 0:J.lastUpdate)<Date.now()-75)this.onResize()}),this.resizeScroll.observe(Z.scrollDOM);if(this.addWindowListeners(this.win=Z.win),this.start(),typeof IntersectionObserver=="function")this.intersection=new IntersectionObserver((J)=>{if(this.parentCheck<0)this.parentCheck=setTimeout(this.listenForScroll.bind(this),1000);if(J.length>0&&J[J.length-1].intersectionRatio>0!=this.intersecting){if(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView)this.onScrollChanged(document.createEvent("Event"))}},{threshold:[0,0.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver((J)=>{if(J.length>0&&J[J.length-1].intersectionRatio>0)this.onScrollChanged(document.createEvent("Event"))},{});this.listenForScroll(),this.readSelectionRange()}onScrollChanged(Z){if(this.view.inputState.runHandlers("scroll",Z),this.intersecting)this.view.measure()}onScroll(Z){if(this.intersecting)this.flush(!1);if(this.editContext)this.view.requestMeasure(this.editContext.measureReq);this.onScrollChanged(Z)}onResize(){if(this.resizeTimeout<0)this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50)}onPrint(Z){if((Z.type=="change"||!Z.type)&&!Z.matches)return;this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500)}updateGaps(Z){if(this.gapIntersection&&(Z.length!=this.gaps.length||this.gaps.some((J,Q)=>J!=Z[Q]))){this.gapIntersection.disconnect();for(let J of Z)this.gapIntersection.observe(J);this.gaps=Z}}onSelectionChange(Z){let J=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:Q}=this,X=this.selectionRange;if(Q.state.facet(E8)?Q.root.activeElement!=this.dom:!z5(this.dom,X))return;let Y=X.anchorNode&&Q.docView.tile.nearest(X.anchorNode);if(Y&&Y.isWidget()&&Y.widget.ignoreEvent(Z)){if(!J)this.selectionChanged=!1;return}if((r.ie&&r.ie_version<=11||r.android&&r.chrome)&&!Q.state.selection.main.empty&&X.focusNode&&I5(X.focusNode,X.focusOffset,X.anchorNode,X.anchorOffset))this.flushSoon();else this.flush(!1)}readSelectionRange(){let{view:Z}=this,J=H5(Z.root);if(!J)return!1;let Q=r.safari&&Z.root.nodeType==11&&Z.root.activeElement==this.dom&&YA(this.view,J)||J;if(!Q||this.selectionRange.eq(Q))return!1;let X=z5(this.dom,Q);if(X&&!this.selectionChanged&&Z.inputState.lastFocusTime>Date.now()-200&&Z.inputState.lastTouchTime<Date.now()-300&&tD(this.dom,Q))return this.view.inputState.lastFocusTime=0,Z.docView.updateSelection(),!1;if(this.selectionRange.setRange(Q),X)this.selectionChanged=!0;return!0}setSelectionRange(Z,J){this.selectionRange.set(Z.node,Z.offset,J.node,J.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let Z=0,J=null;for(let Q=this.dom;Q;)if(Q.nodeType==1){if(!J&&Z<this.scrollTargets.length&&this.scrollTargets[Z]==Q)Z++;else if(!J)J=this.scrollTargets.slice(0,Z);if(J)J.push(Q);Q=Q.assignedSlot||Q.parentNode}else if(Q.nodeType==11)Q=Q.host;else break;if(Z<this.scrollTargets.length&&!J)J=this.scrollTargets.slice(0,Z);if(J){for(let Q of this.scrollTargets)Q.removeEventListener("scroll",this.onScroll);for(let Q of this.scrollTargets=J)Q.addEventListener("scroll",this.onScroll)}}ignore(Z){if(!this.active)return Z();try{return this.stop(),Z()}finally{this.start(),this.clear()}}start(){if(this.active)return;if(this.observer.observe(this.dom,XA),KK)this.dom.addEventListener("DOMCharacterDataModified",this.onCharData);this.active=!0}stop(){if(!this.active)return;if(this.active=!1,this.observer.disconnect(),KK)this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(Z,J){var Q;if(!this.delayedAndroidKey){let X=()=>{let Y=this.delayedAndroidKey;if(Y){if(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=Y.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&Y.force)g7(this.dom,Y.key,Y.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(X)}if(!this.delayedAndroidKey||Z=="Enter")this.delayedAndroidKey={key:Z,keyCode:J,force:this.lastChange<Date.now()-50||!!((Q=this.delayedAndroidKey)===null||Q===void 0?void 0:Q.force)}}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){if(this.delayedFlush<0)this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()})}forceFlush(){if(this.delayedFlush>=0)this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1;this.flush()}pendingRecords(){for(let Z of this.observer.takeRecords())this.queue.push(Z);return this.queue}processRecords(){let Z=this.pendingRecords();if(Z.length)this.queue=[];let J=-1,Q=-1,X=!1;for(let Y of Z){let K=this.readMutation(Y);if(!K)continue;if(K.typeOver)X=!0;if(J==-1)({from:J,to:Q}=K);else J=Math.min(K.from,J),Q=Math.max(K.to,Q)}return{from:J,to:Q,typeOver:X}}readChange(){let{from:Z,to:J,typeOver:Q}=this.processRecords(),X=this.selectionChanged&&z5(this.dom,this.selectionRange);if(Z<0&&!X)return null;if(Z>-1)this.lastChange=Date.now();this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let Y=new RV(this.view,Z,J,Q);return this.view.docView.domChanged={newSel:Y.newSel?Y.newSel.main:null},Y}flush(Z=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;if(Z)this.readSelectionRange();let J=this.readChange();if(!J)return this.view.requestMeasure(),!1;let Q=this.view.state,X=MV(this.view,J);if(this.view.state==Q&&(J.domChanged||J.newSel&&!wJ(this.view.state.selection,J.newSel.main)))this.view.update([]);return X}readMutation(Z){let J=this.view.docView.tile.nearest(Z.target);if(!J||J.isWidget())return null;if(J.markDirty(Z.type=="attributes"),Z.type=="childList"){let Q=NI(J,Z.previousSibling||Z.target.previousSibling,-1),X=NI(J,Z.nextSibling||Z.target.nextSibling,1);return{from:Q?J.posAfter(Q):J.posAtStart,to:X?J.posBefore(X):J.posAtEnd,typeOver:!1}}else if(Z.type=="characterData")return{from:J.posAtStart,to:J.posAtEnd,typeOver:Z.target.nodeValue==Z.oldValue};else return null}setWindow(Z){if(Z!=this.win)this.removeWindowListeners(this.win),this.win=Z,this.addWindowListeners(this.win)}addWindowListeners(Z){if(Z.addEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.addEventListener)this.printQuery.addEventListener("change",this.onPrint);else this.printQuery.addListener(this.onPrint);else Z.addEventListener("beforeprint",this.onPrint);Z.addEventListener("scroll",this.onScroll),Z.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(Z){if(Z.removeEventListener("scroll",this.onScroll),Z.removeEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.removeEventListener)this.printQuery.removeEventListener("change",this.onPrint);else this.printQuery.removeListener(this.onPrint);else Z.removeEventListener("beforeprint",this.onPrint);Z.document.removeEventListener("selectionchange",this.onSelectionChange)}update(Z){if(this.editContext){if(this.editContext.update(Z),Z.startState.facet(E8)!=Z.state.facet(E8))Z.view.contentDOM.editContext=Z.state.facet(E8)?this.editContext.editContext:null}}destroy(){var Z,J,Q;this.stop(),(Z=this.intersection)===null||Z===void 0||Z.disconnect(),(J=this.gapIntersection)===null||J===void 0||J.disconnect(),(Q=this.resizeScroll)===null||Q===void 0||Q.disconnect();for(let X of this.scrollTargets)X.removeEventListener("scroll",this.onScroll);if(this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext)this.view.contentDOM.editContext=null,this.editContext.destroy()}}function NI(Z,J,Q){while(J){let X=d1.get(J);if(X&&X.parent==Z)return X;let Y=J.parentNode;J=Y!=Z.dom?Y:Q>0?J.nextSibling:J.previousSibling}return null}function RI(Z,J){let{startContainer:Q,startOffset:X,endContainer:Y,endOffset:K}=J,W=Z.docView.domAtPos(Z.state.selection.main.anchor,1);if(I5(W.node,W.offset,Y,K))[Q,X,Y,K]=[Y,K,Q,X];return{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}}function YA(Z,J){if(J.getComposedRanges){let Y=J.getComposedRanges(Z.root)[0];if(Y)return RI(Z,Y)}let Q=null;function X(Y){Y.preventDefault(),Y.stopImmediatePropagation(),Q=Y.getTargetRanges()[0]}return Z.contentDOM.addEventListener("beforeinput",X,!0),Z.dom.ownerDocument.execCommand("indent"),Z.contentDOM.removeEventListener("beforeinput",X,!0),Q?RI(Z,Q):null}class mV{constructor(Z){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(Z.state);let J=this.editContext=new window.EditContext({text:Z.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,Z.state.selection.main.anchor))),selectionEnd:this.toContextPos(Z.state.selection.main.head)});this.handlers.textupdate=(Q)=>{let X=Z.state.selection.main,{anchor:Y,head:K}=X,W=this.toEditorPos(Q.updateRangeStart),q=this.toEditorPos(Q.updateRangeEnd);if(Z.inputState.composing>=0&&!this.composing)this.composing={contextBase:Q.updateRangeStart,editorBase:W,drifted:!1};let G=q-W>Q.text.length;if(W==this.from&&Y<this.from)W=Y;else if(q==this.to&&Y>this.to)q=Y;let U=AV(Z.state.sliceDoc(W,q),Q.text,(G?X.from:X.to)-W,G?"end":null);if(!U){let I=h.single(this.toEditorPos(Q.selectionStart),this.toEditorPos(Q.selectionEnd));if(!wJ(I,X))Z.dispatch({selection:I,userEvent:"select"});return}let z={from:U.from+W,to:U.toA+W,insert:R1.of(Q.text.slice(U.from,U.toB).split(`
`))};if((r.mac||r.android)&&z.from==K-1&&/^\. ?$/.test(Q.text)&&Z.contentDOM.getAttribute("autocorrect")=="off")z={from:W,to:q,insert:R1.of([Q.text.replace("."," ")])};if(this.pendingContextChange=z,!Z.state.readOnly){let I=this.to-this.from+(z.to-z.from+z.insert.length);vK(Z,z,h.single(this.toEditorPos(Q.selectionStart,I),this.toEditorPos(Q.selectionEnd,I)))}if(this.pendingContextChange)this.revertPending(Z.state),this.setSelection(Z.state);if(z.from<z.to&&!z.insert.length&&Z.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(J.text.slice(Math.max(0,Q.updateRangeStart-1),Math.min(J.text.length,Q.updateRangeStart+1))))this.handlers.compositionend(Q)},this.handlers.characterboundsupdate=(Q)=>{let X=[],Y=null;for(let K=this.toEditorPos(Q.rangeStart),W=this.toEditorPos(Q.rangeEnd);K<W;K++){let q=Z.coordsForChar(K);Y=q&&new DOMRect(q.left,q.top,q.right-q.left,q.bottom-q.top)||Y||new DOMRect,X.push(Y)}J.updateCharacterBounds(Q.rangeStart,X)},this.handlers.textformatupdate=(Q)=>{let X=[];for(let Y of Q.getTextFormats()){let{underlineStyle:K,underlineThickness:W}=Y;if(!/none/i.test(K)&&!/none/i.test(W)){let q=this.toEditorPos(Y.rangeStart),G=this.toEditorPos(Y.rangeEnd);if(q<G){let U=`text-decoration: underline ${/^[a-z]/.test(K)?K+" ":K=="Dashed"?"dashed ":K=="Squiggle"?"wavy ":""}${/thin/i.test(W)?1:2}px`;X.push(L1.mark({attributes:{style:U}}).range(q,G))}}}Z.dispatch({effects:JV.of(L1.set(X))})},this.handlers.compositionstart=()=>{if(Z.inputState.composing<0)Z.inputState.composing=0,Z.inputState.compositionFirstChange=!0},this.handlers.compositionend=()=>{if(Z.inputState.composing=-1,Z.inputState.compositionFirstChange=null,this.composing){let{drifted:Q}=this.composing;if(this.composing=null,Q)this.reset(Z.state)}};for(let Q in this.handlers)J.addEventListener(Q,this.handlers[Q]);this.measureReq={read:(Q)=>{let X=H5(Q.root);if(X&&X.rangeCount)this.editContext.updateSelectionBounds(X.getRangeAt(0).getBoundingClientRect())}}}applyEdits(Z){let J=0,Q=!1,X=this.pendingContextChange;if(Z.changes.iterChanges((Y,K,W,q,G)=>{if(Q)return;let U=G.length-(K-Y);if(X&&K>=X.to)if(X.from==Y&&X.to==K&&X.insert.eq(G)){X=this.pendingContextChange=null,J+=U,this.to+=U;return}else X=null,this.revertPending(Z.state);if(Y+=J,K+=J,K<=this.from)this.from+=U,this.to+=U;else if(Y<this.to){if(Y<this.from||K>this.to||this.to-this.from+G.length>30000){Q=!0;return}this.editContext.updateText(this.toContextPos(Y),this.toContextPos(K),G.toString()),this.to+=U}J+=U}),X&&!Q)this.revertPending(Z.state);return!Q}update(Z){let J=this.pendingContextChange,Q=Z.startState.selection.main;if(this.composing&&(this.composing.drifted||!Z.changes.touchesRange(Q.from,Q.to)&&Z.transactions.some((X)=>!X.isUserEvent("input.type")&&X.changes.touchesRange(this.from,this.to))))this.composing.drifted=!0,this.composing.editorBase=Z.changes.mapPos(this.composing.editorBase);else if(!this.applyEdits(Z)||!this.rangeIsValid(Z.state))this.pendingContextChange=null,this.reset(Z.state);else if(Z.docChanged||Z.selectionSet||J)this.setSelection(Z.state);if(Z.geometryChanged||Z.docChanged||Z.selectionSet)Z.view.requestMeasure(this.measureReq)}resetRange(Z){let{head:J}=Z.selection.main;this.from=Math.max(0,J-1e4),this.to=Math.min(Z.doc.length,J+1e4)}reset(Z){this.resetRange(Z),this.editContext.updateText(0,this.editContext.text.length,Z.doc.sliceString(this.from,this.to)),this.setSelection(Z)}revertPending(Z){let J=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(J.from),this.toContextPos(J.from+J.insert.length),Z.doc.sliceString(J.from,J.to))}setSelection(Z){let{main:J}=Z.selection,Q=this.toContextPos(Math.max(this.from,Math.min(this.to,J.anchor))),X=this.toContextPos(J.head);if(this.editContext.selectionStart!=Q||this.editContext.selectionEnd!=X)this.editContext.updateSelection(Q,X)}rangeIsValid(Z){let{head:J}=Z.selection.main;return!(this.from>0&&J-this.from<500||this.to<Z.doc.length&&this.to-J<500||this.to-this.from>30000)}toEditorPos(Z,J=this.to-this.from){Z=Math.min(Z,J);let Q=this.composing;return Q&&Q.drifted?Q.editorBase+(Z-Q.contextBase):Z+this.from}toContextPos(Z){let J=this.composing;return J&&J.drifted?J.contextBase+(Z-J.editorBase):Z-this.from}destroy(){for(let Z in this.handlers)this.editContext.removeEventListener(Z,this.handlers[Z])}}class K1{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(Z={}){var J;if(this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),Z.parent)Z.parent.appendChild(this.dom);let{dispatch:Q}=Z;if(this.dispatchTransactions=Z.dispatchTransactions||Q&&((X)=>X.forEach((Y)=>Q(Y,this)))||((X)=>this.update(X)),this.dispatch=this.dispatch.bind(this),this._root=Z.root||oD(Z.parent)||document,this.viewState=new PK(this,Z.state||A1.create(Z)),Z.scrollTo&&Z.scrollTo.is(zJ))this.viewState.scrollTarget=Z.scrollTo.value.clip(this.viewState.state);this.plugins=this.state.facet($7).map((X)=>new MJ(X));for(let X of this.plugins)X.update(this);if(this.observer=new vV(this),this.inputState=new BV(this),this.inputState.ensureHandlers(this.plugins),this.docView=new RK(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),(J=document.fonts)===null||J===void 0?void 0:J.ready)document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...Z){let J=Z.length==1&&Z[0]instanceof o1?Z:Z.length==1&&Array.isArray(Z[0])?Z[0]:[this.state.update(...Z)];this.dispatchTransactions(J,this)}update(Z){if(this.updateState!=0)throw Error("Calls to EditorView.update are not allowed while an update is in progress");let J=!1,Q=!1,X,Y=this.state;for(let I of Z){if(I.startState!=Y)throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");Y=I.state}if(this.destroyed){this.viewState.state=Y;return}let K=this.hasFocus,W=0,q=null;if(Z.some((I)=>I.annotation(_V)))this.inputState.notifiedFocused=K,W=1;else if(K!=this.inputState.notifiedFocused){if(this.inputState.notifiedFocused=K,q=kV(Y,K),!q)W=1}let G=this.observer.delayedAndroidKey,U=null;if(G){if(this.observer.clearDelayedAndroidKey(),U=this.observer.readChange(),U&&!this.state.doc.eq(Y.doc)||!this.state.selection.eq(Y.selection))U=null}else this.observer.clear();if(Y.facet(A1.phrases)!=this.state.facet(A1.phrases))return this.setState(Y);X=kJ.create(this,Y,Z),X.flags|=W;let z=this.viewState.scrollTarget;try{this.updateState=2;for(let I of Z){if(z)z=z.map(I.changes);if(I.scrollIntoView){let{main:V}=I.state.selection,{x:H,y:F}=this.state.facet(K1.cursorScrollMargin);z=new u7(V.empty?V:h.cursor(V.head,V.head>V.anchor?-1:1),"nearest","nearest",F,H)}for(let V of I.effects)if(V.is(zJ))z=V.value.clip(this.state)}if(this.viewState.update(X,z),this.bidiCache=yJ.update(this.bidiCache,X.changes),!X.empty)this.updatePlugins(X),this.inputState.update(X);if(J=this.docView.update(X),this.state.facet(W5)!=this.styleModules)this.mountStyles();Q=this.updateAttrs(),this.showAnnouncements(Z),this.docView.updateSelection(J,Z.some((I)=>I.isUserEvent("select.pointer")))}finally{this.updateState=0}if(X.startState.facet(OJ)!=X.state.facet(OJ))this.viewState.mustMeasureContent=!0;if(J||Q||z||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)this.requestMeasure();if(J)this.docViewUpdate();if(!X.empty)for(let I of this.state.facet(NK))try{I(X)}catch(V){a0(this.state,V,"update listener")}if(q||U)Promise.resolve().then(()=>{if(q&&this.state==q.startState)this.dispatch(q);if(U){if(!MV(this,U)&&G.force)g7(this.contentDOM,G.key,G.keyCode)}})}setState(Z){if(this.updateState!=0)throw Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=Z;return}this.updateState=2;let J=this.hasFocus;try{for(let Q of this.plugins)Q.destroy(this);this.viewState=new PK(this,Z),this.plugins=Z.facet($7).map((Q)=>new MJ(Q)),this.pluginMap.clear();for(let Q of this.plugins)Q.update(this);this.docView.destroy(),this.docView=new RK(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}if(J)this.focus();this.requestMeasure()}updatePlugins(Z){let J=Z.startState.facet($7),Q=Z.state.facet($7);if(J!=Q){let X=[];for(let Y of Q){let K=J.indexOf(Y);if(K<0)X.push(new MJ(Y));else{let W=this.plugins[K];W.mustUpdate=Z,X.push(W)}}for(let Y of this.plugins)if(Y.mustUpdate!=Z)Y.destroy(this);this.plugins=X,this.pluginMap.clear()}else for(let X of this.plugins)X.mustUpdate=Z;for(let X=0;X<this.plugins.length;X++)this.plugins[X].update(this);if(J!=Q)this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let Z of this.plugins){let J=Z.value;if(J&&J.docViewUpdate)try{J.docViewUpdate(this)}catch(Q){a0(this.state,Q,"doc view update listener")}}}measure(Z=!0){if(this.destroyed)return;if(this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);if(this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}if(this.measureScheduled=0,Z)this.observer.forceFlush();let J=null,Q=this.viewState.scrollParent,X=this.viewState.getScrollOffset(),{scrollAnchorPos:Y,scrollAnchorHeight:K}=this.viewState;if(Math.abs(X-this.viewState.scrollOffset)>1)K=-1;this.viewState.scrollAnchorHeight=-1;try{for(let W=0;;W++){if(K<0)if(gI(Q||this.win))Y=-1,K=this.viewState.heightMap.height;else{let V=this.viewState.scrollAnchorAt(X);Y=V.from,K=V.top}this.updateState=1;let q=this.viewState.measure();if(!q&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(W>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let G=[];if(!(q&4))[this.measureRequests,G]=[G,this.measureRequests];let U=G.map((V)=>{try{return V.read(this)}catch(H){return a0(this.state,H),DI}}),z=kJ.create(this,this.state,[]),I=!1;if(z.flags|=q,!J)J=z;else J.flags|=q;if(this.updateState=2,!z.empty){if(this.updatePlugins(z),this.inputState.update(z),this.updateAttrs(),I=this.docView.update(z),I)this.docViewUpdate()}for(let V=0;V<G.length;V++)if(U[V]!=DI)try{let H=G[V];if(H.write)H.write(U[V],this)}catch(H){a0(this.state,H)}if(I)this.docView.updateSelection(!0);if(!z.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,K=-1;continue}else{let H=((Y<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(Y).top)-K)/this.scaleY;if((H>1||H<-1)&&!(r.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(Q==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){if(X=X+H,Q)Q.scrollTop+=H;else this.win.scrollBy(0,H);K=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(J&&!J.empty)for(let W of this.state.facet(NK))W(J)}get themeClasses(){return SK+" "+(this.state.facet(TK)?gV:fV)+" "+this.state.facet(OJ)}updateAttrs(){let Z=MI(this,QV,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),J={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:!this.state.facet(E8)?"false":"true",class:"cm-content",style:`${r.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};if(this.state.readOnly)J["aria-readonly"]="true";MI(this,fK,J);let Q=this.observer.ignore(()=>{let X=tz(this.contentDOM,this.contentAttrs,J),Y=tz(this.dom,this.editorAttrs,Z);return X||Y});return this.editorAttrs=Z,this.contentAttrs=J,Q}showAnnouncements(Z){let J=!0;for(let Q of Z)for(let X of Q.effects)if(X.is(K1.announce)){if(J)this.announceDOM.textContent="";J=!1;let Y=this.announceDOM.appendChild(document.createElement("div"));Y.textContent=X.value}}mountStyles(){this.styleModules=this.state.facet(W5);let Z=this.state.facet(K1.cspNonce);_6.mount(this.root,this.styleModules.concat(QA).reverse(),Z?{nonce:Z}:void 0)}readMeasured(){if(this.updateState==2)throw Error("Reading the editor layout isn't allowed during an update");if(this.updateState==0&&this.measureScheduled>-1)this.measure(!1)}requestMeasure(Z){if(this.measureScheduled<0)this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure());if(Z){if(this.measureRequests.indexOf(Z)>-1)return;if(Z.key!=null){for(let J=0;J<this.measureRequests.length;J++)if(this.measureRequests[J].key===Z.key){this.measureRequests[J]=Z;return}}this.measureRequests.push(Z)}}plugin(Z){let J=this.pluginMap.get(Z);if(J===void 0||J&&J.plugin!=Z)this.pluginMap.set(Z,J=this.plugins.find((Q)=>Q.plugin==Z)||null);return J&&J.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(Z){return this.readMeasured(),this.viewState.elementAtHeight(Z)}lineBlockAtHeight(Z){return this.readMeasured(),this.viewState.lineBlockAtHeight(Z)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(Z){return this.viewState.lineBlockAt(Z)}get contentHeight(){return this.viewState.contentHeight}moveByChar(Z,J,Q){return YK(this,Z,YI(this,Z,J,Q))}moveByGroup(Z,J){return YK(this,Z,YI(this,Z,J,(Q)=>SM(this,Z.head,Q)))}visualLineSide(Z,J){let Q=this.bidiSpans(Z),X=this.textDirectionAt(Z.from),Y=Q[J?Q.length-1:0];return h.cursor(Y.side(J,X)+Z.from,Y.forward(!J,X)?1:-1)}moveToLineBoundary(Z,J,Q=!0){return TM(this,Z,J,Q)}moveVertically(Z,J,Q){return YK(this,Z,EM(this,Z,J,Q))}domAtPos(Z,J=1){return this.docView.domAtPos(Z,J)}posAtDOM(Z,J=0){return this.docView.posFromDOM(Z,J)}posAtCoords(Z,J=!0){this.readMeasured();let Q=AK(this,Z,J);return Q&&Q.pos}posAndSideAtCoords(Z,J=!0){return this.readMeasured(),AK(this,Z,J)}coordsAtPos(Z,J=1){this.readMeasured();let Q=this.state.doc.lineAt(Z),X=this.bidiSpans(Q),Y=X[b6.find(X,Z-Q.from,-1,J)];return this.docView.coordsAt(Z,J,Y.dir==k1.RTL)}coordsForChar(Z){return this.readMeasured(),this.docView.coordsForChar(Z)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(Z){if(!this.state.facet(tI)||Z<this.viewport.from||Z>this.viewport.to)return this.textDirection;return this.readMeasured(),this.docView.textDirectionAt(Z)}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(Z){if(Z.length>KA)return dI(Z.length);let J=this.textDirectionAt(Z.from),Q;for(let Y of this.bidiCache)if(Y.from==Z.from&&Y.dir==J&&(Y.fresh||cI(Y.isolates,Q=JI(this,Z))))return Y.order;if(!Q)Q=JI(this,Z);let X=KM(Z.text,J,Q);return this.bidiCache.push(new yJ(Z.from,Z.to,J,Q,!0,X)),X}get hasFocus(){var Z;return(this.dom.ownerDocument.hasFocus()||r.safari&&((Z=this.inputState)===null||Z===void 0?void 0:Z.lastContextMenu)>Date.now()-30000)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{fI(this.contentDOM),this.docView.updateSelection()})}setRoot(Z){if(this._root!=Z)this._root=Z,this.observer.setWindow((Z.nodeType==9?Z:Z.ownerDocument).defaultView||window),this.mountStyles()}destroy(){if(this.root.activeElement==this.contentDOM)this.contentDOM.blur();for(let Z of this.plugins)Z.destroy(this);if(this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);this.destroyed=!0}static scrollIntoView(Z,J={}){var Q,X,Y,K;return zJ.of(new u7(typeof Z=="number"?h.cursor(Z):Z,(Q=J.y)!==null&&Q!==void 0?Q:"nearest",(X=J.x)!==null&&X!==void 0?X:"nearest",(Y=J.yMargin)!==null&&Y!==void 0?Y:5,(K=J.xMargin)!==null&&K!==void 0?K:5))}scrollSnapshot(){let{scrollTop:Z,scrollLeft:J}=this.scrollDOM,Q=this.viewState.scrollAnchorAt(Z);return zJ.of(new u7(h.cursor(Q.from),"start","start",Q.top-Z,J,!0))}setTabFocusMode(Z){if(Z==null)this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1;else if(typeof Z=="boolean")this.inputState.tabFocusMode=Z?0:-1;else if(this.inputState.tabFocusMode!=0)this.inputState.tabFocusMode=Date.now()+Z}static domEventHandlers(Z){return A0.define(()=>({}),{eventHandlers:Z})}static domEventObservers(Z){return A0.define(()=>({}),{eventObservers:Z})}static theme(Z,J){let Q=_6.newName(),X=[OJ.of(Q),W5.of(EK(`.${Q}`,Z))];if(J&&J.dark)X.push(TK.of(!0));return X}static baseTheme(Z){return P8.lowest(W5.of(EK("."+SK,Z,uV)))}static findFromDOM(Z){var J;let Q=Z.querySelector(".cm-content"),X=Q&&d1.get(Q)||d1.get(Z);return((J=X===null||X===void 0?void 0:X.root)===null||J===void 0?void 0:J.view)||null}}K1.styleModule=W5;K1.inputHandler=aI;K1.clipboardInputFilter=$K;K1.clipboardOutputFilter=hK;K1.scrollHandler=ZV;K1.focusChangeEffect=oI;K1.perLineTextDirection=tI;K1.exceptionSink=rI;K1.updateListener=NK;K1.editable=E8;K1.mouseSelectionStyle=iI;K1.dragMovesSelection=sI;K1.clickAddsSelectionRange=lI;K1.decorations=fJ;K1.blockWrappers=XV;K1.outerDecorations=gK;K1.atomicRanges=D5;K1.bidiIsolatedRanges=YV;K1.cursorScrollMargin=o.define({combine:(Z)=>{let J=5,Q=5;for(let X of Z)if(typeof X=="number")J=Q=X;else({x:J,y:Q}=X);return{x:J,y:Q}}});K1.scrollMargins=KV;K1.darkTheme=TK;K1.cspNonce=o.define({combine:(Z)=>Z.length?Z[0]:""});K1.contentAttributes=fK;K1.editorAttributes=QV;K1.lineWrapping=K1.contentAttributes.of({class:"cm-lineWrapping"});K1.announce=B1.define();var KA=4096,DI={};class yJ{constructor(Z,J,Q,X,Y,K){this.from=Z,this.to=J,this.dir=Q,this.isolates=X,this.fresh=Y,this.order=K}static update(Z,J){if(J.empty&&!Z.some((Y)=>Y.fresh))return Z;let Q=[],X=Z.length?Z[Z.length-1].dir:k1.LTR;for(let Y=Math.max(0,Z.length-10);Y<Z.length;Y++){let K=Z[Y];if(K.dir==X&&!J.touchesRange(K.from,K.to))Q.push(new yJ(J.mapPos(K.from,1),J.mapPos(K.to,-1),K.dir,K.isolates,!1,K.order))}return Q}}function MI(Z,J,Q){for(let X=Z.state.facet(J),Y=X.length-1;Y>=0;Y--){let K=X[Y],W=typeof K=="function"?K(Z):K;if(W)wK(W,Q)}return Q}var WA=r.mac?"mac":r.windows?"win":r.linux?"linux":"key";function qA(Z,J){let Q=Z.split(/-(?!$)/),X=Q[Q.length-1];if(X=="Space")X=" ";let Y,K,W,q;for(let G=0;G<Q.length-1;++G){let U=Q[G];if(/^(cmd|meta|m)$/i.test(U))q=!0;else if(/^a(lt)?$/i.test(U))Y=!0;else if(/^(c|ctrl|control)$/i.test(U))K=!0;else if(/^s(hift)?$/i.test(U))W=!0;else if(/^mod$/i.test(U))if(J=="mac")q=!0;else K=!0;else throw Error("Unrecognized modifier name: "+U)}if(Y)X="Alt-"+X;if(K)X="Ctrl-"+X;if(q)X="Meta-"+X;if(W)X="Shift-"+X;return X}function FJ(Z,J,Q){if(J.altKey)Z="Alt-"+Z;if(J.ctrlKey)Z="Ctrl-"+Z;if(J.metaKey)Z="Meta-"+Z;if(Q!==!1&&J.shiftKey)Z="Shift-"+Z;return Z}var GA=P8.default(K1.domEventHandlers({keydown(Z,J){return VA(UA(J.state),Z,J,"editor")}})),uJ=o.define({enables:GA}),AI=new WeakMap;function UA(Z){let J=Z.facet(uJ),Q=AI.get(J);if(!Q)AI.set(J,Q=IA(J.reduce((X,Y)=>X.concat(Y),[])));return Q}var o8=null,zA=4000;function IA(Z,J=WA){let Q=Object.create(null),X=Object.create(null),Y=(W,q)=>{let G=X[W];if(G==null)X[W]=q;else if(G!=q)throw Error("Key binding "+W+" is used both as a regular binding and as a multi-stroke prefix")},K=(W,q,G,U,z)=>{var I,V;let H=Q[W]||(Q[W]=Object.create(null)),F=q.split(/ (?!$)/).map((T)=>qA(T,J));for(let T=1;T<F.length;T++){let S=F.slice(0,T).join(" ");if(Y(S,!0),!H[S])H[S]={preventDefault:!0,stopPropagation:!1,run:[(C)=>{let k=o8={view:C,prefix:S,scope:W};return setTimeout(()=>{if(o8==k)o8=null},zA),!0}]}}let N=F.join(" ");Y(N,!1);let R=H[N]||(H[N]={preventDefault:!1,stopPropagation:!1,run:((V=(I=H._any)===null||I===void 0?void 0:I.run)===null||V===void 0?void 0:V.slice())||[]});if(G)R.run.push(G);if(U)R.preventDefault=!0;if(z)R.stopPropagation=!0};for(let W of Z){let q=W.scope?W.scope.split(" "):["editor"];if(W.any)for(let U of q){let z=Q[U]||(Q[U]=Object.create(null));if(!z._any)z._any={preventDefault:!1,stopPropagation:!1,run:[]};let{any:I}=W;for(let V in z)z[V].run.push((H)=>I(H,CK))}let G=W[J]||W.key;if(!G)continue;for(let U of q)if(K(U,G,W.run,W.preventDefault,W.stopPropagation),W.shift)K(U,"Shift-"+G,W.shift,W.preventDefault,W.stopPropagation)}return Q}var CK=null;function VA(Z,J,Q,X){CK=J;let Y=sz(J),K=Cz(Y,0),W=_z(K)==Y.length&&Y!=" ",q="",G=!1,U=!1,z=!1;if(o8&&o8.view==Q&&o8.scope==X){if(q=o8.prefix+" ",PV.indexOf(J.keyCode)<0)U=!0,o8=null}let I=new Set,V=(R)=>{if(R){for(let T of R.run)if(!I.has(T)){if(I.add(T),T(Q)){if(R.stopPropagation)z=!0;return!0}}if(R.preventDefault){if(R.stopPropagation)z=!0;U=!0}}return!1},H=Z[X],F,N;if(H){if(V(H[q+FJ(Y,J,!W)]))G=!0;else if(W&&(J.altKey||J.metaKey||J.ctrlKey)&&!(r.windows&&J.ctrlKey&&J.altKey)&&!(r.mac&&J.altKey&&!(J.ctrlKey||J.metaKey))&&(F=S8[J.keyCode])&&F!=Y){if(V(H[q+FJ(F,J,!0)]))G=!0;else if(J.shiftKey&&(N=b7[J.keyCode])!=Y&&N!=F&&V(H[q+FJ(N,J,!1)]))G=!0}else if(W&&J.shiftKey&&V(H[q+FJ(Y,J,!0)]))G=!0;if(!G&&V(H._any))G=!0}if(U)G=!0;if(G&&z)J.stopPropagation();return CK=null,G}class c9{constructor(Z,J,Q,X,Y){this.className=Z,this.left=J,this.top=Q,this.width=X,this.height=Y}draw(){let Z=document.createElement("div");return Z.className=this.className,this.adjust(Z),Z}update(Z,J){if(J.className!=this.className)return!1;return this.adjust(Z),!0}adjust(Z){if(Z.style.left=this.left+"px",Z.style.top=this.top+"px",this.width!=null)Z.style.width=this.width+"px";Z.style.height=this.height+"px"}eq(Z){return this.left==Z.left&&this.top==Z.top&&this.width==Z.width&&this.height==Z.height&&this.className==Z.className}static forRange(Z,J,Q){if(Q.empty){let X=Z.coordsAtPos(Q.head,Q.assoc||1);if(!X)return[];let Y=pV(Z);return[new c9(J,X.left-Y.left,X.top-Y.top,null,X.bottom-X.top)]}else return jA(Z,J,Q)}}function pV(Z){let J=Z.scrollDOM.getBoundingClientRect();return{left:(Z.textDirection==k1.LTR?J.left:J.right-Z.scrollDOM.clientWidth*Z.scaleX)-Z.scrollDOM.scrollLeft*Z.scaleX,top:J.top-Z.scrollDOM.scrollTop*Z.scaleY}}function BI(Z,J,Q,X){let Y=Z.coordsAtPos(J,Q*2);if(!Y)return X;let K=Z.dom.getBoundingClientRect(),W=(Y.top+Y.bottom)/2,q=Z.posAtCoords({x:K.left+1,y:W}),G=Z.posAtCoords({x:K.right-1,y:W});if(q==null||G==null)return X;return{from:Math.max(X.from,Math.min(q,G)),to:Math.min(X.to,Math.max(q,G))}}function jA(Z,J,Q){if(Q.to<=Z.viewport.from||Q.from>=Z.viewport.to)return[];let X=Math.max(Q.from,Z.viewport.from),Y=Math.min(Q.to,Z.viewport.to),K=Z.textDirection==k1.LTR,W=Z.contentDOM,q=W.getBoundingClientRect(),G=pV(Z),U=W.querySelector(".cm-line"),z=U&&window.getComputedStyle(U),I=q.left+(z?parseInt(z.paddingLeft)+Math.min(0,parseInt(z.textIndent)):0),V=q.right-(z?parseInt(z.paddingRight):0),H=MK(Z,X,1),F=MK(Z,Y,-1),N=H.type==F0.Text?H:null,R=F.type==F0.Text?F:null;if(N&&(Z.lineWrapping||H.widgetLineBreaks))N=BI(Z,X,1,N);if(R&&(Z.lineWrapping||F.widgetLineBreaks))R=BI(Z,Y,-1,R);if(N&&R&&N.from==R.from&&N.to==R.to)return S(C(Q.from,Q.to,N));else{let A=N?C(Q.from,null,N):k(H,!1),L=R?C(null,Q.to,R):k(F,!0),B=[];if((N||H).to<(R||F).from-(N&&R?1:0)||H.widgetLineBreaks>1&&A.bottom+Z.defaultLineHeight/2<L.top)B.push(T(I,A.bottom,V,L.top));else if(A.bottom<L.top&&Z.elementAtHeight((A.bottom+L.top)/2).type==F0.Text)A.bottom=L.top=(A.bottom+L.top)/2;return S(A).concat(B).concat(S(L))}function T(A,L,B,E){return new c9(J,A-G.left,L-G.top,Math.max(0,B-A),E-L)}function S({top:A,bottom:L,horizontal:B}){let E=[];for(let D=0;D<B.length;D+=2)E.push(T(B[D],A,B[D+1],L));return E}function C(A,L,B){let E=1e9,D=-1e9,l=[];function f(e,Z1,W1,G1,J1){let t=Z.coordsAtPos(e,e==B.to?-2:2),g=Z.coordsAtPos(W1,W1==B.from?2:-2);if(!t||!g)return;if(E=Math.min(t.top,g.top,E),D=Math.max(t.bottom,g.bottom,D),J1==k1.LTR)l.push(K&&Z1?I:t.left,K&&G1?V:g.right);else l.push(!K&&G1?I:g.left,!K&&Z1?V:t.right)}let c=A!==null&&A!==void 0?A:B.from,q1=L!==null&&L!==void 0?L:B.to;for(let e of Z.visibleRanges)if(e.to>c&&e.from<q1)for(let Z1=Math.max(e.from,c),W1=Math.min(e.to,q1);;){let G1=Z.state.doc.lineAt(Z1);for(let J1 of Z.bidiSpans(G1)){let t=J1.from+G1.from,g=J1.to+G1.from;if(t>=W1)break;if(g>Z1)f(Math.max(t,Z1),A==null&&t<=c,Math.min(g,W1),L==null&&g>=q1,J1.dir)}if(Z1=G1.to+1,Z1>=W1)break}if(l.length==0)f(c,A==null,q1,L==null,Z.textDirection);return{top:E,bottom:D,horizontal:l}}function k(A,L){let B=q.top+(L?A.top:A.bottom);return{top:B,bottom:B,horizontal:[]}}}function HA(Z,J){return Z.constructor==J.constructor&&Z.eq(J)}class cV{constructor(Z,J){if(this.view=Z,this.layer=J,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=Z.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),J.above)this.dom.classList.add("cm-layer-above");if(J.class)this.dom.classList.add(J.class);if(this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(Z.state),Z.requestMeasure(this.measureReq),J.mount)J.mount(this.dom,Z)}update(Z){if(Z.startState.facet(PJ)!=Z.state.facet(PJ))this.setOrder(Z.state);if(this.layer.update(Z,this.dom)||Z.geometryChanged)this.scale(),Z.view.requestMeasure(this.measureReq)}docViewUpdate(Z){if(this.layer.updateOnDocViewUpdate!==!1)Z.requestMeasure(this.measureReq)}setOrder(Z){let J=0,Q=Z.facet(PJ);while(J<Q.length&&Q[J]!=this.layer)J++;this.dom.style.zIndex=String((this.layer.above?150:-1)-J)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:Z,scaleY:J}=this.view;if(Z!=this.scaleX||J!=this.scaleY)this.scaleX=Z,this.scaleY=J,this.dom.style.transform=`scale(${1/Z}, ${1/J})`}draw(Z){if(Z.length!=this.drawn.length||Z.some((J,Q)=>!HA(J,this.drawn[Q]))){let J=this.dom.firstChild,Q=0;for(let X of Z)if(X.update&&J&&X.constructor&&this.drawn[Q].constructor&&X.update(J,this.drawn[Q]))J=J.nextSibling,Q++;else this.dom.insertBefore(X.draw(),J);while(J){let X=J.nextSibling;J.remove(),J=X}if(this.drawn=Z,r.webkit)this.dom.style.display=this.dom.firstChild?"":"none"}}destroy(){if(this.layer.destroy)this.layer.destroy(this.dom,this.view);this.dom.remove()}}var PJ=o.define();function dV(Z){return[A0.define((J)=>new cV(J,Z)),PJ.of(Z)]}var p7=o.define({combine(Z){return T8(Z,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(J,Q)=>Math.min(J,Q),drawRangeCursor:(J,Q)=>J||Q})}});function nV(Z={}){return[p7.of(Z),OA,FA,RA,eI.of(!0)]}function lV(Z){return Z.startState.facet(p7)!=Z.state.facet(p7)}var OA=dV({above:!0,markers(Z){let{state:J}=Z,Q=J.facet(p7),X=[];for(let Y of J.selection.ranges){let K=Y==J.selection.main;if(Y.empty||Q.drawRangeCursor&&!(K&&r.ios&&Q.iosSelectionHandles)){let W=K?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",q=Y.empty?Y:h.cursor(Y.head,Y.assoc);for(let G of c9.forRange(Z,W,q))X.push(G)}}return X},update(Z,J){if(Z.transactions.some((X)=>X.selection))J.style.animationName=J.style.animationName=="cm-blink"?"cm-blink2":"cm-blink";let Q=lV(Z);if(Q)LI(Z.state,J);return Z.docChanged||Z.selectionSet||Q},mount(Z,J){LI(J.state,Z)},class:"cm-cursorLayer"});function LI(Z,J){J.style.animationDuration=Z.facet(p7).cursorBlinkRate+"ms"}var FA=dV({above:!1,markers(Z){let J=[],{main:Q,ranges:X}=Z.state.selection;for(let Y of X)if(!Y.empty)for(let K of c9.forRange(Z,"cm-selectionBackground",Y))J.push(K);if(r.ios&&!Q.empty&&Z.state.facet(p7).iosSelectionHandles){for(let Y of c9.forRange(Z,"cm-selectionHandle cm-selectionHandle-start",h.cursor(Q.from,1)))J.push(Y);for(let Y of c9.forRange(Z,"cm-selectionHandle cm-selectionHandle-end",h.cursor(Q.to,1)))J.push(Y)}return J},update(Z,J){return Z.docChanged||Z.selectionSet||Z.viewportChanged||lV(Z)},class:"cm-selectionLayer"}),NA=r.gecko&&r.gecko_version==153?"#ffffff01":"transparent",RA=P8.highest(K1.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${NA} !important`},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var bx=/x/.unicode!=null?"gu":"g";function sV(){return MA}var DA=L1.line({class:"cm-activeLine"}),MA=A0.fromClass(class{constructor(Z){this.decorations=this.getDeco(Z)}update(Z){if(Z.docChanged||Z.selectionSet)this.decorations=this.getDeco(Z.view)}getDeco(Z){let J=-1,Q=[];for(let X of Z.state.selection.ranges){let Y=Z.lineBlockAt(X.head);if(Y.from>J)Q.push(DA.range(Y.from)),J=Y.from}return L1.set(Q)}},{decorations:(Z)=>Z.decorations});var NJ="-10000px";class dK{constructor(Z,J,Q,X){this.facet=J,this.createTooltipView=Q,this.removeTooltipView=X,this.input=Z.state.facet(J),this.tooltips=this.input.filter((K)=>K);let Y=null;this.tooltipViews=this.tooltips.map((K)=>Y=Q(K,Y))}update(Z,J){var Q;let X=Z.state.facet(this.facet),Y=X.filter((q)=>q);if(X===this.input){for(let q of this.tooltipViews)if(q.update)q.update(Z);return!1}let K=[],W=J?[]:null;for(let q=0;q<Y.length;q++){let G=Y[q],U=-1;if(!G)continue;for(let z=0;z<this.tooltips.length;z++){let I=this.tooltips[z];if(I&&I.create==G.create)U=z}if(U<0){if(K[q]=this.createTooltipView(G,q?K[q-1]:null),W)W[q]=!!G.above}else{let z=K[q]=this.tooltipViews[U];if(W)W[q]=J[U];if(z.update)z.update(Z)}}for(let q of this.tooltipViews)if(K.indexOf(q)<0)this.removeTooltipView(q),(Q=q.destroy)===null||Q===void 0||Q.call(q);if(J)W.forEach((q,G)=>J[G]=q),J.length=W.length;return this.input=X,this.tooltips=Y,this.tooltipViews=K,!0}}function AA(Z){let J=Z.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:J.clientHeight,right:J.clientWidth}}var WK=o.define({combine:(Z)=>{var J,Q,X;return{position:r.ios?"absolute":((J=Z.find((Y)=>Y.position))===null||J===void 0?void 0:J.position)||"fixed",parent:((Q=Z.find((Y)=>Y.parent))===null||Q===void 0?void 0:Q.parent)||null,tooltipSpace:((X=Z.find((Y)=>Y.tooltipSpace))===null||X===void 0?void 0:X.tooltipSpace)||AA}}}),PI=new WeakMap,iV=A0.fromClass(class{constructor(Z){this.view=Z,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let J=Z.state.facet(WK);this.position=J.position,this.parent=J.parent,this.classes=Z.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new dK(Z,nK,(Q,X)=>this.createTooltip(Q,X),(Q)=>{if(this.resizeObserver)this.resizeObserver.unobserve(Q.dom);Q.dom.remove()}),this.above=this.manager.tooltips.map((Q)=>!!Q.above),this.intersectionObserver=typeof IntersectionObserver=="function"?new IntersectionObserver((Q)=>{if(Date.now()>this.lastTransaction-50&&Q.length>0&&Q[Q.length-1].intersectionRatio<1)this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),Z.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){if(this.parent)this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container);else this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let Z of this.manager.tooltipViews)this.intersectionObserver.observe(Z.dom)}}measureSoon(){if(this.measureTimeout<0)this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50)}update(Z){if(Z.transactions.length)this.lastTransaction=Date.now();let J=this.manager.update(Z,this.above);if(J)this.observeIntersection();let Q=J||Z.geometryChanged,X=Z.state.facet(WK);if(X.position!=this.position&&!this.madeAbsolute){this.position=X.position;for(let Y of this.manager.tooltipViews)Y.dom.style.position=this.position;Q=!0}if(X.parent!=this.parent){if(this.parent)this.container.remove();this.parent=X.parent,this.createContainer();for(let Y of this.manager.tooltipViews)this.container.appendChild(Y.dom);Q=!0}else if(this.parent&&this.view.themeClasses!=this.classes)this.classes=this.container.className=this.view.themeClasses;if(Q)this.maybeMeasure()}createTooltip(Z,J){let Q=Z.create(this.view),X=J?J.dom:null;if(Q.dom.classList.add("cm-tooltip"),Z.arrow&&!Q.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let Y=document.createElement("div");Y.className="cm-tooltip-arrow",Q.dom.appendChild(Y)}if(Q.dom.style.position=this.position,Q.dom.style.top=NJ,Q.dom.style.left="0px",this.container.insertBefore(Q.dom,X),Q.mount)Q.mount(this.view);if(this.resizeObserver)this.resizeObserver.observe(Q.dom);return Q}destroy(){var Z,J,Q;this.view.win.removeEventListener("resize",this.measureSoon);for(let X of this.manager.tooltipViews)X.dom.remove(),(Z=X.destroy)===null||Z===void 0||Z.call(X);if(this.parent)this.container.remove();(J=this.resizeObserver)===null||J===void 0||J.disconnect(),(Q=this.intersectionObserver)===null||Q===void 0||Q.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let Z=1,J=1,Q=!1;if(this.position=="fixed"&&this.manager.tooltipViews.length){let{dom:K}=this.manager.tooltipViews[0];if(r.safari){let W=K.getBoundingClientRect();Q=Math.abs(W.top+1e4)>1||Math.abs(W.left)>1}else Q=!!K.offsetParent&&K.offsetParent!=this.container.ownerDocument.body}if(Q||this.position=="absolute")if(this.parent){let K=this.parent.getBoundingClientRect();if(K.width&&K.height)Z=K.width/this.parent.offsetWidth,J=K.height/this.parent.offsetHeight}else({scaleX:Z,scaleY:J}=this.view.viewState);let X=this.view.scrollDOM.getBoundingClientRect(),Y=uK(this.view);return{visible:{left:X.left+Y.left,top:X.top+Y.top,right:X.right-Y.right,bottom:X.bottom-Y.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((K,W)=>{let q=this.manager.tooltipViews[W];return q.getCoords?q.getCoords(K.pos):this.view.coordsAtPos(K.pos)}),size:this.manager.tooltipViews.map(({dom:K})=>K.getBoundingClientRect()),space:this.view.state.facet(WK).tooltipSpace(this.view),scaleX:Z,scaleY:J,makeAbsolute:Q}}writeMeasure(Z){var J;if(Z.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let q of this.manager.tooltipViews)q.dom.style.position="absolute"}let{visible:Q,space:X,scaleX:Y,scaleY:K}=Z,W=[];for(let q=0;q<this.manager.tooltips.length;q++){let G=this.manager.tooltips[q],U=this.manager.tooltipViews[q],{dom:z}=U,I=Z.pos[q],V=Z.size[q];if(!I||G.clip!==!1&&(I.bottom<=Math.max(Q.top,X.top)||I.top>=Math.min(Q.bottom,X.bottom)||I.right<Math.max(Q.left,X.left)-0.1||I.left>Math.min(Q.right,X.right)+0.1)){z.style.top=NJ;continue}let H=G.arrow?U.dom.querySelector(".cm-tooltip-arrow"):null,F=H?7:0,N=V.right-V.left,R=(J=PI.get(U))!==null&&J!==void 0?J:V.bottom-V.top,T=U.offset||LA,S=this.view.textDirection==k1.LTR,C=V.width>X.right-X.left?S?X.left:X.right-V.width:S?Math.max(X.left,Math.min(I.left-(H?14:0)+T.x,X.right-N)):Math.min(Math.max(X.left,I.left-N+(H?14:0)-T.x),X.right-N),k=this.above[q];if(!G.strictSide&&(k?I.top-R-F-T.y<X.top:I.bottom+R+F+T.y>X.bottom)&&k==X.bottom-I.bottom>I.top-X.top)k=this.above[q]=!k;let A=(k?I.top-X.top:X.bottom-I.bottom)-F;if(A<R&&U.resize!==!1){if(A<this.view.defaultLineHeight){z.style.top=NJ;continue}PI.set(U,R),z.style.height=(R=A)/K+"px"}else if(z.style.height)z.style.height="";let L=k?I.top-R-F-T.y:I.bottom+F+T.y,B=C+N;if(U.overlap!==!0){for(let E of W)if(E.left<B&&E.right>C&&E.top<L+R&&E.bottom>L)L=k?E.top-R-2-F:E.bottom+F+2}if(this.position=="absolute")z.style.top=(L-Z.parent.top)/K+"px",TI(z,(C-Z.parent.left)/Y);else z.style.top=L/K+"px",TI(z,C/Y);if(H){let E=I.left+(S?T.x:-T.x)-(C+14-7);H.style.left=E/Y+"px"}if(U.overlap!==!0)W.push({left:C,top:L,right:B,bottom:L+R});if(z.classList.toggle("cm-tooltip-above",k),z.classList.toggle("cm-tooltip-below",!k),U.positioned)U.positioned(Z.space)}}maybeMeasure(){if(this.manager.tooltips.length){if(this.view.inView)this.view.requestMeasure(this.measureReq);if(this.inView!=this.view.inView){if(this.inView=this.view.inView,!this.inView)for(let Z of this.manager.tooltipViews)Z.dom.style.top=NJ}}}},{eventObservers:{scroll(){this.maybeMeasure()}}});function TI(Z,J){let Q=parseInt(Z.style.left,10);if(isNaN(Q)||Math.abs(J-Q)>1)Z.style.left=J+"px"}var BA=K1.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:"7px",width:"14px",position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent"},".cm-tooltip-above &":{bottom:"-7px","&:before":{borderTop:"7px solid #bbb"},"&:after":{borderTop:"7px solid #f5f5f5",bottom:"1px"}},".cm-tooltip-below &":{top:"-7px","&:before":{borderBottom:"7px solid #bbb"},"&:after":{borderBottom:"7px solid #f5f5f5",top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),LA={x:0,y:0},nK=o.define({enables:[iV,BA]}),$J=o.define({combine:(Z)=>Z.reduce((J,Q)=>J.concat(Q),[])});class vJ{static create(Z){return new vJ(Z)}constructor(Z){this.view=Z,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new dK(Z,$J,(J,Q)=>this.createHostedView(J,Q),(J)=>J.dom.remove())}createHostedView(Z,J){let Q=Z.create(this.view);if(Q.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(Q.dom,J?J.dom.nextSibling:this.dom.firstChild),this.mounted&&Q.mount)Q.mount(this.view);return Q}mount(Z){for(let J of this.manager.tooltipViews)if(J.mount)J.mount(Z);this.mounted=!0}positioned(Z){for(let J of this.manager.tooltipViews)if(J.positioned)J.positioned(Z)}update(Z){this.manager.update(Z)}destroy(){var Z;for(let J of this.manager.tooltipViews)(Z=J.destroy)===null||Z===void 0||Z.call(J)}passProp(Z){let J=void 0;for(let Q of this.manager.tooltipViews){let X=Q[Z];if(X!==void 0){if(J===void 0)J=X;else if(J!==X)return}}return J}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}var PA=nK.compute([$J],(Z)=>{let J=Z.facet($J);if(J.length===0)return null;return{pos:Math.min(...J.map((Q)=>Q.pos)),end:Math.max(...J.map((Q)=>{var X;return(X=Q.end)!==null&&X!==void 0?X:Q.pos})),create:vJ.create,above:J[0].above,arrow:J.some((Q)=>Q.arrow)}}),TA=o.define();class rV{constructor(Z,J,Q,X,Y,K){this.view=Z,this.source=J,this.field=Q,this.locked=X,this.setHover=Y,this.hoverTime=K,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:Z.dom,time:0},this.checkHover=this.checkHover.bind(this),Z.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),Z.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(Z){if(this.pending)this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20)}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let Z=Date.now()-this.lastMove.time;if(Z<this.hoverTime)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-Z);else this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:Z,lastMove:J}=this,Q=Z.docView.tile.nearest(J.target);if(!Q)return;let X,Y=1;if(Q.isWidget())X=Q.posAtStart;else{if(X=Z.posAtCoords(J),X==null)return;let K=Z.coordsAtPos(X);if(!K||J.y<K.top||J.y>K.bottom||J.x<K.left-Z.defaultCharacterWidth||J.x>K.right+Z.defaultCharacterWidth)return;let W=Z.bidiSpans(Z.state.doc.lineAt(X)).find((G)=>G.from<=X&&G.to>=X),q=W&&W.dir==k1.RTL?-1:1;Y=J.x<K.left?-q:q}this.activateHover(Z,X,Y)}activateHover(Z,J,Q,X){let Y=this.source(Z,J,Q),K=(W)=>{if(W&&!(Array.isArray(W)&&!W.length)){let q=Array.isArray(W)?W:[W];if(X)this.locked.set(q,X);Z.dispatch({effects:this.setHover.of(q)})}};if(Y&&"then"in Y){let W=this.pending={pos:J};Y.then((q)=>{if(this.pending==W)this.pending=null,K(q)},(q)=>a0(Z.state,q,"hover tooltip"))}else K(Y)}get tooltip(){let Z=this.view.plugin(iV),J=Z?Z.manager.tooltips.findIndex((Q)=>Q.create==vJ.create):-1;return J>-1?Z.manager.tooltipViews[J]:null}mousemove(Z){var J,Q;if(this.lastMove={x:Z.clientX,y:Z.clientY,target:Z.target,time:Date.now()},this.hoverTimeout<0)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime);let{active:X,tooltip:Y}=this;if(X.length&&!this.locked.has(X)&&Y&&!SA(Y.dom,Z)||this.pending){let{pos:K}=X[0]||this.pending,W=(Q=(J=X[0])===null||J===void 0?void 0:J.end)!==null&&Q!==void 0?Q:K;if(K==W?this.view.posAtCoords(this.lastMove)!=K:!EA(this.view,K,W,Z.clientX,Z.clientY))this.view.dispatch({effects:this.setHover.of([])}),this.pending=null}}mouseleave(Z){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:J}=this;if(J.length&&!this.locked.has(J)){let{tooltip:Q}=this;if(!(Q&&Q.dom.contains(Z.relatedTarget)))this.view.dispatch({effects:this.setHover.of([])});else this.watchTooltipLeave(Q.dom)}}watchTooltipLeave(Z){let J=(Q)=>{Z.removeEventListener("mouseleave",J);let{active:X}=this;if(X.length&&!this.locked.has(X)&&!this.view.dom.contains(Q.relatedTarget))this.view.dispatch({effects:this.setHover.of([])})};Z.addEventListener("mouseleave",J)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}var RJ=4;function SA(Z,J){let{left:Q,right:X,top:Y,bottom:K}=Z.getBoundingClientRect(),W;if(W=Z.querySelector(".cm-tooltip-arrow")){let q=W.getBoundingClientRect();Y=Math.min(q.top,Y),K=Math.max(q.bottom,K)}return J.clientX>=Q-RJ&&J.clientX<=X+RJ&&J.clientY>=Y-RJ&&J.clientY<=K+RJ}function EA(Z,J,Q,X,Y,K){let W=Z.scrollDOM.getBoundingClientRect(),q=Z.documentTop+Z.documentPadding.top+Z.contentHeight;if(W.left>X||W.right<X||W.top>Y||Math.min(W.bottom,q)<Y)return!1;let G=Z.posAtCoords({x:X,y:Y},!1);return G>=J&&G<=Q}function aV(Z,J={}){let Q=B1.define(),X=new WeakMap,Y=M0.define({create(){return[]},update(W,q){let G=X.get(W);if(W.length){if(J.hideOnChange&&(q.docChanged||q.selection))W=[];else if(G&&G(q))W=[];else if(J.hideOn)W=W.filter((U)=>!J.hideOn(q,U))}if(q.docChanged&&W.length){let U=[];for(let z of W){let I=q.changes.mapPos(z.pos,-1,C0.TrackDel);if(I!=null){let V=Object.assign(Object.create(null),z);if(V.pos=I,V.end!=null)V.end=q.changes.mapPos(V.end);U.push(V)}}W=U}for(let U of q.effects){if(U.is(Q))W=U.value,G=void 0;if(U.is(CA)&&!U.value||U.value==Y)W=[]}if(W.length&&G)X.set(W,G);return W},provide:(W)=>$J.from(W)}),K=A0.define((W)=>new rV(W,Z,Y,X,Q,J.hoverTime||300));return{active:Y,extension:[Y,K,TA.of(K),PA]}}var CA=B1.define();var SI=o.define({combine(Z){let J,Q;for(let X of Z)J=J||X.topContainer,Q=Q||X.bottomContainer;return{topContainer:J,bottomContainer:Q}}});var _A=A0.fromClass(class{constructor(Z){this.input=Z.state.facet(c7),this.specs=this.input.filter((Q)=>Q),this.panels=this.specs.map((Q)=>Q(Z));let J=Z.state.facet(SI);this.top=new U5(Z,!0,J.topContainer),this.bottom=new U5(Z,!1,J.bottomContainer),this.top.sync(this.panels.filter((Q)=>Q.top)),this.bottom.sync(this.panels.filter((Q)=>!Q.top));for(let Q of this.panels)if(Q.dom.classList.add("cm-panel"),Q.mount)Q.mount()}update(Z){let J=Z.state.facet(SI);if(this.top.container!=J.topContainer)this.top.sync([]),this.top=new U5(Z.view,!0,J.topContainer);if(this.bottom.container!=J.bottomContainer)this.bottom.sync([]),this.bottom=new U5(Z.view,!1,J.bottomContainer);this.top.syncClasses(),this.bottom.syncClasses();let Q=Z.state.facet(c7);if(Q!=this.input){let X=Q.filter((G)=>G),Y=[],K=[],W=[],q=[];for(let G of X){let U=this.specs.indexOf(G),z;if(U<0)z=G(Z.view),q.push(z);else if(z=this.panels[U],z.update)z.update(Z);Y.push(z),(z.top?K:W).push(z)}this.specs=X,this.panels=Y,this.top.sync(K),this.bottom.sync(W);for(let G of q)if(G.dom.classList.add("cm-panel"),G.mount)G.mount()}else for(let X of this.panels)if(X.update)X.update(Z)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:(Z)=>K1.scrollMargins.of((J)=>{let Q=J.plugin(Z);return Q&&{top:Q.top.scrollMargin(),bottom:Q.bottom.scrollMargin()}})});class U5{constructor(Z,J,Q){this.view=Z,this.top=J,this.container=Q,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(Z){for(let J of this.panels)if(J.destroy&&Z.indexOf(J)<0)J.destroy();this.panels=Z,this.syncDOM()}syncDOM(){if(this.panels.length==0){if(this.dom)this.dom.remove(),this.dom=void 0;return}if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom";let J=this.container||this.view.dom;J.insertBefore(this.dom,this.top?J.firstChild:null)}let Z=this.dom.firstChild;for(let J of this.panels)if(J.dom.parentNode==this.dom){while(Z!=J.dom)Z=EI(Z);Z=Z.nextSibling}else this.dom.insertBefore(J.dom,Z);while(Z)Z=EI(Z)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(!this.container||this.classes==this.view.themeClasses)return;for(let Z of this.classes.split(" "))if(Z)this.container.classList.remove(Z);for(let Z of(this.classes=this.view.themeClasses).split(" "))if(Z)this.container.classList.add(Z)}}function EI(Z){let J=Z.nextSibling;return Z.remove(),J}var c7=o.define({enables:_A});class t6 extends B8{compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}eq(Z){return!1}destroy(Z){}}t6.prototype.elementClass="";t6.prototype.toDOM=void 0;t6.prototype.mapMode=C0.TrackBefore;t6.prototype.startSide=t6.prototype.endSide=-1;t6.prototype.point=!0;var qK=o.define(),kA=o.define();var TJ=o.define();var _K=o.define({combine:(Z)=>Z.some((J)=>J)});function xA(Z){let J=[wA];if(Z&&Z.fixed===!1)J.push(_K.of(!0));return J}var wA=A0.fromClass(class{constructor(Z){this.view=Z,this.domAfter=null,this.prevViewport=Z.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=Z.state.facet(TJ).map((J)=>new xK(Z,J)),this.fixed=!Z.state.facet(_K);for(let J of this.gutters)if(J.config.side=="after")this.getDOMAfter().appendChild(J.dom);else this.dom.appendChild(J.dom);if(this.fixed)this.dom.style.position="sticky";this.syncGutters(!1),Z.scrollDOM.insertBefore(this.dom,Z.contentDOM)}getDOMAfter(){if(!this.domAfter)this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter);return this.domAfter}update(Z){if(this.updateGutters(Z)){let J=this.prevViewport,Q=Z.view.viewport,X=Math.min(J.to,Q.to)-Math.max(J.from,Q.from);this.syncGutters(X<(Q.to-Q.from)*0.8)}if(Z.geometryChanged){let J=this.view.contentHeight/this.view.scaleY+"px";if(this.dom.style.minHeight=J,this.domAfter)this.domAfter.style.minHeight=J}if(this.view.state.facet(_K)!=!this.fixed){if(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter)this.domAfter.style.position=this.fixed?"sticky":""}this.prevViewport=Z.view.viewport}syncGutters(Z){let J=this.dom.nextSibling;if(Z){if(this.dom.remove(),this.domAfter)this.domAfter.remove()}let Q=N1.iter(this.view.state.facet(qK),this.view.viewport.from),X=[],Y=this.gutters.map((K)=>new oV(K,this.view.viewport,-this.view.documentPadding.top));for(let K of this.view.viewportLineBlocks){if(X.length)X=[];if(Array.isArray(K.type)){let W=!0;for(let q of K.type)if(q.type==F0.Text&&W){kK(Q,X,q.from);for(let G of Y)G.line(this.view,q,X);W=!1}else if(q.widget)for(let G of Y)G.widget(this.view,q)}else if(K.type==F0.Text){kK(Q,X,K.from);for(let W of Y)W.line(this.view,K,X)}else if(K.widget)for(let W of Y)W.widget(this.view,K)}for(let K of Y)K.finish();if(Z){if(this.view.scrollDOM.insertBefore(this.dom,J),this.domAfter)this.view.scrollDOM.appendChild(this.domAfter)}}updateGutters(Z){let J=Z.startState.facet(TJ),Q=Z.state.facet(TJ),X=Z.docChanged||Z.heightChanged||Z.viewportChanged||!N1.eq(Z.startState.facet(qK),Z.state.facet(qK),Z.view.viewport.from,Z.view.viewport.to);if(J==Q){for(let Y of this.gutters)if(Y.update(Z))X=!0}else{X=!0;let Y=[];for(let K of Q){let W=J.indexOf(K);if(W<0)Y.push(new xK(this.view,K));else this.gutters[W].update(Z),Y.push(this.gutters[W])}for(let K of this.gutters)if(K.dom.remove(),Y.indexOf(K)<0)K.destroy();for(let K of Y)if(K.config.side=="after")this.getDOMAfter().appendChild(K.dom);else this.dom.appendChild(K.dom);this.gutters=Y}return X}destroy(){for(let Z of this.gutters)Z.destroy();if(this.dom.remove(),this.domAfter)this.domAfter.remove()}},{provide:(Z)=>K1.scrollMargins.of((J)=>{let Q=J.plugin(Z);if(!Q||Q.gutters.length==0||!Q.fixed)return null;let X=Q.dom.offsetWidth*J.scaleX,Y=Q.domAfter?Q.domAfter.offsetWidth*J.scaleX:0;return J.textDirection==k1.LTR?{left:X,right:Y}:{right:X,left:Y}})});function CI(Z){return Array.isArray(Z)?Z:[Z]}function kK(Z,J,Q){while(Z.value&&Z.from<=Q){if(Z.from==Q)J.push(Z.value);Z.next()}}class oV{constructor(Z,J,Q){this.gutter=Z,this.height=Q,this.i=0,this.cursor=N1.iter(Z.markers,J.from)}addElement(Z,J,Q){let{gutter:X}=this,Y=(J.top-this.height)/Z.scaleY,K=J.height/Z.scaleY;if(this.i==X.elements.length){let W=new lK(Z,K,Y,Q);X.elements.push(W),X.dom.appendChild(W.dom)}else X.elements[this.i].update(Z,K,Y,Q);this.height=J.bottom,this.i++}line(Z,J,Q){let X=[];if(kK(this.cursor,X,J.from),Q.length)X=X.concat(Q);let Y=this.gutter.config.lineMarker(Z,J,X);if(Y)X.unshift(Y);let K=this.gutter;if(X.length==0&&!K.config.renderEmptyElements)return;this.addElement(Z,J,X)}widget(Z,J){let Q=this.gutter.config.widgetMarker(Z,J.widget,J),X=Q?[Q]:null;for(let Y of Z.state.facet(kA)){let K=Y(Z,J.widget,J);if(K)(X||(X=[])).push(K)}if(X)this.addElement(Z,J,X)}finish(){let Z=this.gutter;while(Z.elements.length>this.i){let J=Z.elements.pop();Z.dom.removeChild(J.dom),J.destroy()}}}class xK{constructor(Z,J){this.view=Z,this.config=J,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let Q in J.domEventHandlers)this.dom.addEventListener(Q,(X)=>{let Y=X.target,K;if(Y!=this.dom&&this.dom.contains(Y)){while(Y.parentNode!=this.dom)Y=Y.parentNode;let q=Y.getBoundingClientRect();K=(q.top+q.bottom)/2}else K=X.clientY;let W=Z.lineBlockAtHeight(K-Z.documentTop);if(J.domEventHandlers[Q](Z,W,X))X.preventDefault()});if(this.markers=CI(J.markers(Z)),J.initialSpacer)this.spacer=new lK(Z,0,0,[J.initialSpacer(Z)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none"}update(Z){let J=this.markers;if(this.markers=CI(this.config.markers(Z.view)),this.spacer&&this.config.updateSpacer){let X=this.config.updateSpacer(this.spacer.markers[0],Z);if(X!=this.spacer.markers[0])this.spacer.update(Z.view,0,0,[X])}let Q=Z.view.viewport;return!N1.eq(this.markers,J,Q.from,Q.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(Z):!1)}destroy(){for(let Z of this.elements)Z.destroy()}}class lK{constructor(Z,J,Q,X){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(Z,J,Q,X)}update(Z,J,Q,X){if(this.height!=J)this.height=J,this.dom.style.height=J+"px";if(this.above!=Q)this.dom.style.marginTop=(this.above=Q)?Q+"px":"";if(!bA(this.markers,X))this.setMarkers(Z,X)}setMarkers(Z,J){let Q="cm-gutterElement",X=this.dom.firstChild;for(let Y=0,K=0;;){let W=K,q=Y<J.length?J[Y++]:null,G=!1;if(q){let U=q.elementClass;if(U)Q+=" "+U;for(let z=K;z<this.markers.length;z++)if(this.markers[z].compare(q)){W=z,G=!0;break}}else W=this.markers.length;while(K<W){let U=this.markers[K++];if(U.toDOM){U.destroy(X);let z=X.nextSibling;X.remove(),X=z}}if(!q)break;if(q.toDOM)if(G)X=X.nextSibling;else this.dom.insertBefore(q.toDOM(Z),X);if(G)K++}this.dom.className=Q,this.markers=J}destroy(){this.setMarkers(null,[])}}function bA(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(!Z[Q].compare(J[Q]))return!1;return!0}var yA=o.define(),$A=o.define(),h7=o.define({combine(Z){return T8(Z,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(J,Q){let X=Object.assign({},J);for(let Y in Q){let K=X[Y],W=Q[Y];X[Y]=K?(q,G,U)=>K(q,G,U)||W(q,G,U):W}return X}})}});class SJ extends t6{constructor(Z){super();this.number=Z}eq(Z){return this.number==Z.number}toDOM(){return document.createTextNode(this.number)}}function GK(Z,J){return Z.state.facet(h7).formatNumber(J,Z.state)}var hA=TJ.compute([h7],(Z)=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(J){return J.state.facet(yA)},lineMarker(J,Q,X){if(X.some((Y)=>Y.toDOM))return null;return new SJ(GK(J,J.state.doc.lineAt(Q.from).number))},widgetMarker:(J,Q,X)=>{for(let Y of J.state.facet($A)){let K=Y(J,Q,X);if(K)return K}return null},lineMarkerChange:(J)=>J.startState.facet(h7)!=J.state.facet(h7),initialSpacer(J){return new SJ(GK(J,_I(J.state.doc.lines)))},updateSpacer(J,Q){let X=GK(Q.view,_I(Q.view.state.doc.lines));return X==J.number?J:new SJ(X)},domEventHandlers:Z.facet(h7).domEventHandlers,side:"before"}));function tV(Z={}){return[h7.of(Z),xA(),hA]}function _I(Z){let J=9;while(J<Z)J=J*10+9;return J}var fA=0;class pJ{constructor(Z,J){this.from=Z,this.to=J}}class O1{constructor(Z={}){this.id=fA++,this.perNode=!!Z.perNode,this.deserialize=Z.deserialize||(()=>{throw Error("This node type doesn't define a deserialize function")}),this.combine=Z.combine||null}add(Z){if(this.perNode)throw RangeError("Can't add per-node props to node types");if(typeof Z!="function")Z=w0.match(Z);return(J)=>{let Q=Z(J);return Q===void 0?null:[this,Q]}}}O1.closedBy=new O1({deserialize:(Z)=>Z.split(" ")});O1.openedBy=new O1({deserialize:(Z)=>Z.split(" ")});O1.group=new O1({deserialize:(Z)=>Z.split(" ")});O1.isolate=new O1({deserialize:(Z)=>{if(Z&&Z!="rtl"&&Z!="ltr"&&Z!="auto")throw RangeError("Invalid value for isolate: "+Z);return Z||"auto"}});O1.contextHash=new O1({perNode:!0});O1.lookAhead=new O1({perNode:!0});O1.mounted=new O1({perNode:!0});class d7{constructor(Z,J,Q,X=!1){this.tree=Z,this.overlay=J,this.parser=Q,this.bracketed=X}static get(Z){return Z&&Z.props&&Z.props[O1.mounted.id]}}var gA=Object.create(null);class w0{constructor(Z,J,Q,X=0){this.name=Z,this.props=J,this.id=Q,this.flags=X}static define(Z){let J=Z.props&&Z.props.length?Object.create(null):gA,Q=(Z.top?1:0)|(Z.skipped?2:0)|(Z.error?4:0)|(Z.name==null?8:0),X=new w0(Z.name||"",J,Z.id,Q);if(Z.props)for(let Y of Z.props){if(!Array.isArray(Y))Y=Y(X);if(Y){if(Y[0].perNode)throw RangeError("Can't store a per-node prop on a node type");J[Y[0].id]=Y[1]}}return X}prop(Z){return this.props[Z.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(Z){if(typeof Z=="string"){if(this.name==Z)return!0;let J=this.prop(O1.group);return J?J.indexOf(Z)>-1:!1}return this.id==Z}static match(Z){let J=Object.create(null);for(let Q in Z)for(let X of Q.split(" "))J[X]=Z[Q];return(Q)=>{for(let X=Q.prop(O1.group),Y=-1;Y<(X?X.length:0);Y++){let K=J[Y<0?Q.name:X[Y]];if(K)return K}}}}w0.none=new w0("",Object.create(null),0,8);class nJ{constructor(Z){this.types=Z;for(let J=0;J<Z.length;J++)if(Z[J].id!=J)throw RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...Z){let J=[];for(let Q of this.types){let X=null;for(let Y of Z){let K=Y(Q);if(K){if(!X)X=Object.assign({},Q.props);let W=K[1],q=K[0];if(q.combine&&q.id in X)W=q.combine(X[q.id],W);X[q.id]=W}}J.push(X?new w0(Q.name,X,Q.id,Q.flags):Q)}return new nJ(J)}}var mJ=new WeakMap,eV=new WeakMap,l1;(function(Z){Z[Z.ExcludeBuffers=1]="ExcludeBuffers",Z[Z.IncludeAnonymous=2]="IncludeAnonymous",Z[Z.IgnoreMounts=4]="IgnoreMounts",Z[Z.IgnoreOverlays=8]="IgnoreOverlays",Z[Z.EnterBracketed=16]="EnterBracketed"})(l1||(l1={}));class g1{constructor(Z,J,Q,X,Y){if(this.type=Z,this.children=J,this.positions=Q,this.length=X,this.props=null,Y&&Y.length){this.props=Object.create(null);for(let[K,W]of Y)this.props[typeof K=="number"?K:K.id]=W}}toString(){let Z=d7.get(this);if(Z&&!Z.overlay)return Z.tree.toString();let J="";for(let Q of this.children){let X=Q.toString();if(X){if(J)J+=",";J+=X}}return!this.type.name?J:(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(J.length?"("+J+")":"")}cursor(Z=0){return new dJ(this.topNode,Z)}cursorAt(Z,J=0,Q=0){let X=mJ.get(this)||this.topNode,Y=new dJ(X);return Y.moveTo(Z,J),mJ.set(this,Y._tree),Y}get topNode(){return new q6(this,0,0,null)}resolve(Z,J=0){let Q=B5(mJ.get(this)||this.topNode,Z,J,!1);return mJ.set(this,Q),Q}resolveInner(Z,J=0){let Q=B5(eV.get(this)||this.topNode,Z,J,!0);return eV.set(this,Q),Q}resolveStack(Z,J=0){return uA(this,Z,J)}iterate(Z){let{enter:J,leave:Q,from:X=0,to:Y=this.length}=Z,K=Z.mode||0,W=(K&l1.IncludeAnonymous)>0;for(let q=this.cursor(K|l1.IncludeAnonymous);;){let G=!1;if(q.from<=Y&&q.to>=X&&(!W&&q.type.isAnonymous||J(q)!==!1)){if(q.firstChild())continue;G=!0}for(;;){if(G&&Q&&(W||!q.type.isAnonymous))Q(q);if(q.nextSibling())break;if(!q.parent())return;G=!0}}}prop(Z){return!Z.perNode?this.type.prop(Z):this.props?this.props[Z.id]:void 0}get propValues(){let Z=[];if(this.props)for(let J in this.props)Z.push([+J,this.props[J]]);return Z}balance(Z={}){return this.children.length<=8?this:oK(w0.none,this.children,this.positions,0,this.children.length,0,this.length,(J,Q,X)=>new g1(this.type,J,Q,X,this.propValues),Z.makeTree||((J,Q,X)=>new g1(w0.none,J,Q,X)))}static build(Z){return vA(Z)}}g1.empty=new g1(w0.none,[],[],0);class iK{constructor(Z,J){this.buffer=Z,this.index=J}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new iK(this.buffer,this.index)}}class J9{constructor(Z,J,Q){this.buffer=Z,this.length=J,this.set=Q}get type(){return w0.none}toString(){let Z=[];for(let J=0;J<this.buffer.length;)Z.push(this.childString(J)),J=this.buffer[J+3];return Z.join(",")}childString(Z){let J=this.buffer[Z],Q=this.buffer[Z+3],X=this.set.types[J],Y=X.name;if(/\W/.test(Y)&&!X.isError)Y=JSON.stringify(Y);if(Z+=4,Q==Z)return Y;let K=[];while(Z<Q)K.push(this.childString(Z)),Z=this.buffer[Z+3];return Y+"("+K.join(",")+")"}findChild(Z,J,Q,X,Y){let{buffer:K}=this,W=-1;for(let q=Z;q!=J;q=K[q+3])if(Qj(Y,X,K[q+1],K[q+2])){if(W=q,Q>0)break}return W}slice(Z,J,Q){let X=this.buffer,Y=new Uint16Array(J-Z),K=0;for(let W=Z,q=0;W<J;){Y[q++]=X[W++],Y[q++]=X[W++]-Q;let G=Y[q++]=X[W++]-Q;Y[q++]=X[W++]-Z,K=Math.max(K,G)}return new J9(Y,K,this.set)}}function Qj(Z,J,Q,X){switch(Z){case-2:return Q<J;case-1:return X>=J&&Q<J;case 0:return Q<J&&X>J;case 1:return Q<=J&&X>J;case 2:return X>J;case 4:return!0}}function B5(Z,J,Q,X){var Y;while(Z.from==Z.to||(Q<1?Z.from>=J:Z.from>J)||(Q>-1?Z.to<=J:Z.to<J)){let W=!X&&Z instanceof q6&&Z.index<0?null:Z.parent;if(!W)return Z;Z=W}let K=X?0:l1.IgnoreOverlays;if(X){for(let W=Z,q=W.parent;q;W=q,q=W.parent)if(W instanceof q6&&W.index<0&&((Y=q.enter(J,Q,K))===null||Y===void 0?void 0:Y.from)!=W.from)Z=q}for(;;){let W=Z.enter(J,Q,K);if(!W)return Z;Z=W}}class rK{cursor(Z=0){return new dJ(this,Z)}getChild(Z,J=null,Q=null){let X=Zj(this,Z,J,Q);return X.length?X[0]:null}getChildren(Z,J=null,Q=null){return Zj(this,Z,J,Q)}resolve(Z,J=0){return B5(this,Z,J,!1)}resolveInner(Z,J=0){return B5(this,Z,J,!0)}matchContext(Z){return sK(this.parent,Z)}enterUnfinishedNodesBefore(Z){let J=this.childBefore(Z),Q=this;while(J){let X=J.lastChild;if(!X||X.to!=J.to)break;if(X.type.isError&&X.from==X.to)Q=J,J=X.prevSibling;else J=X}return Q}get node(){return this}get next(){return this.parent}}class q6 extends rK{constructor(Z,J,Q,X){super();this._tree=Z,this.from=J,this.index=Q,this._parent=X}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(Z,J,Q,X,Y=0){for(let K=this;;){for(let{children:W,positions:q}=K._tree,G=J>0?W.length:-1;Z!=G;Z+=J){let U=W[Z],z=q[Z]+K.from,I;if(!(Y&l1.EnterBracketed&&U instanceof g1&&(I=d7.get(U))&&!I.overlay&&I.bracketed&&Q>=z&&Q<=z+U.length)&&!Qj(X,Q,z,z+U.length))continue;if(U instanceof J9){if(Y&l1.ExcludeBuffers)continue;let V=U.findChild(0,U.buffer.length,J,Q-z,X);if(V>-1)return new Z9(new Xj(K,U,Z,z),null,V)}else if(Y&l1.IncludeAnonymous||(!U.type.isAnonymous||aK(U))){let V;if(!(Y&l1.IgnoreMounts)&&(V=d7.get(U))&&!V.overlay)return new q6(V.tree,z,Z,K);let H=new q6(U,z,Z,K);return Y&l1.IncludeAnonymous||!H.type.isAnonymous?H:H.nextChild(J<0?U.children.length-1:0,J,Q,X,Y)}}if(Y&l1.IncludeAnonymous||!K.type.isAnonymous)return null;if(K.index>=0)Z=K.index+J;else Z=J<0?-1:K._parent._tree.children.length;if(K=K._parent,!K)return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(Z){return this.nextChild(0,1,Z,2)}childBefore(Z){return this.nextChild(this._tree.children.length-1,-1,Z,-2)}prop(Z){return this._tree.prop(Z)}enter(Z,J,Q=0){let X;if(!(Q&l1.IgnoreOverlays)&&(X=d7.get(this._tree))&&X.overlay){let Y=Z-this.from,K=Q&l1.EnterBracketed&&X.bracketed;for(let{from:W,to:q}of X.overlay)if((J>0||K?W<=Y:W<Y)&&(J<0||K?q>=Y:q>Y))return new q6(X.tree,X.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,Z,J,Q)}nextSignificantParent(){let Z=this;while(Z.type.isAnonymous&&Z._parent)Z=Z._parent;return Z}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Zj(Z,J,Q,X){let Y=Z.cursor(),K=[];if(!Y.firstChild())return K;if(Q!=null){for(let W=!1;!W;)if(W=Y.type.is(Q),!Y.nextSibling())return K}for(;;){if(X!=null&&Y.type.is(X))return K;if(Y.type.is(J))K.push(Y.node);if(!Y.nextSibling())return X==null?K:[]}}function sK(Z,J,Q=J.length-1){for(let X=Z;Q>=0;X=X.parent){if(!X)return!1;if(!X.type.isAnonymous){if(J[Q]&&J[Q]!=X.name)return!1;Q--}}return!0}class Xj{constructor(Z,J,Q,X){this.parent=Z,this.buffer=J,this.index=Q,this.start=X}}class Z9 extends rK{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(Z,J,Q){super();this.context=Z,this._parent=J,this.index=Q,this.type=Z.buffer.set.types[Z.buffer.buffer[Q]]}child(Z,J,Q){let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.context.start,Q);return Y<0?null:new Z9(this.context,this,Y)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(Z){return this.child(1,Z,2)}childBefore(Z){return this.child(-1,Z,-2)}prop(Z){return this.type.prop(Z)}enter(Z,J,Q=0){if(Q&l1.ExcludeBuffers)return null;let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],J>0?1:-1,Z-this.context.start,J);return Y<0?null:new Z9(this.context,this,Y)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(Z){return this._parent?null:this.context.parent.nextChild(this.context.index+Z,Z,0,4)}get nextSibling(){let{buffer:Z}=this.context,J=Z.buffer[this.index+3];if(J<(this._parent?Z.buffer[this._parent.index+3]:Z.buffer.length))return new Z9(this.context,this._parent,J);return this.externalSibling(1)}get prevSibling(){let{buffer:Z}=this.context,J=this._parent?this._parent.index+4:0;if(this.index==J)return this.externalSibling(-1);return new Z9(this.context,this._parent,Z.findChild(J,this.index,-1,0,4))}get tree(){return null}toTree(){let Z=[],J=[],{buffer:Q}=this.context,X=this.index+4,Y=Q.buffer[this.index+3];if(Y>X){let K=Q.buffer[this.index+1];Z.push(Q.slice(X,Y,K)),J.push(0)}return new g1(this.type,Z,J,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Yj(Z){if(!Z.length)return null;let J=0,Q=Z[0];for(let K=1;K<Z.length;K++){let W=Z[K];if(W.from>Q.from||W.to<Q.to)Q=W,J=K}let X=Q instanceof q6&&Q.index<0?null:Q.parent,Y=Z.slice();if(X)Y[J]=X;else Y.splice(J,1);return new Kj(Y,Q)}class Kj{constructor(Z,J){this.heads=Z,this.node=J}get next(){return Yj(this.heads)}}function uA(Z,J,Q){let X=Z.resolveInner(J,Q),Y=null;for(let K=X instanceof q6?X:X.context.parent;K;K=K.parent)if(K.index<0){let W=K.parent;(Y||(Y=[X])).push(W.resolve(J,Q)),K=W}else{let W=d7.get(K.tree);if(W&&W.overlay&&W.overlay[0].from<=J&&W.overlay[W.overlay.length-1].to>=J){let q=new q6(W.tree,W.overlay[0].from+K.from,-1,K);(Y||(Y=[X])).push(B5(q,J,Q,!1))}}return Y?Yj(Y):X}class dJ{get name(){return this.type.name}constructor(Z,J=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=J&~l1.EnterBracketed,Z instanceof q6)this.yieldNode(Z);else{this._tree=Z.context.parent,this.buffer=Z.context;for(let Q=Z._parent;Q;Q=Q._parent)this.stack.unshift(Q.index);this.bufferNode=Z,this.yieldBuf(Z.index)}}yieldNode(Z){if(!Z)return!1;return this._tree=Z,this.type=Z.type,this.from=Z.from,this.to=Z.to,!0}yieldBuf(Z,J){this.index=Z;let{start:Q,buffer:X}=this.buffer;return this.type=J||X.set.types[X.buffer[Z]],this.from=Q+X.buffer[Z+1],this.to=Q+X.buffer[Z+2],!0}yield(Z){if(!Z)return!1;if(Z instanceof q6)return this.buffer=null,this.yieldNode(Z);return this.buffer=Z.context,this.yieldBuf(Z.index,Z.type)}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(Z,J,Q){if(!this.buffer)return this.yield(this._tree.nextChild(Z<0?this._tree._tree.children.length-1:0,Z,J,Q,this.mode));let{buffer:X}=this.buffer,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.buffer.start,Q);if(Y<0)return!1;return this.stack.push(this.index),this.yieldBuf(Y)}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(Z){return this.enterChild(1,Z,2)}childBefore(Z){return this.enterChild(-1,Z,-2)}enter(Z,J,Q=this.mode){if(!this.buffer)return this.yield(this._tree.enter(Z,J,Q));return Q&l1.ExcludeBuffers?!1:this.enterChild(1,Z,J)}parent(){if(!this.buffer)return this.yieldNode(this.mode&l1.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let Z=this.mode&l1.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(Z)}sibling(Z){if(!this.buffer)return!this._tree._parent?!1:this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+Z,Z,0,4,this.mode));let{buffer:J}=this.buffer,Q=this.stack.length-1;if(Z<0){let X=Q<0?0:this.stack[Q]+4;if(this.index!=X)return this.yieldBuf(J.findChild(X,this.index,-1,0,4))}else{let X=J.buffer[this.index+3];if(X<(Q<0?J.buffer.length:J.buffer[this.stack[Q]+3]))return this.yieldBuf(X)}return Q<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+Z,Z,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(Z){let J,Q,{buffer:X}=this;if(X){if(Z>0){if(this.index<X.buffer.buffer.length)return!1}else for(let Y=0;Y<this.index;Y++)if(X.buffer.buffer[Y+3]<this.index)return!1;({index:J,parent:Q}=X)}else({index:J,_parent:Q}=this._tree);for(;Q;{index:J,_parent:Q}=Q)if(J>-1)for(let Y=J+Z,K=Z<0?-1:Q._tree.children.length;Y!=K;Y+=Z){let W=Q._tree.children[Y];if(this.mode&l1.IncludeAnonymous||W instanceof J9||!W.type.isAnonymous||aK(W))return!1}return!0}move(Z,J){if(J&&this.enterChild(Z,0,4))return!0;for(;;){if(this.sibling(Z))return!0;if(this.atLastNode(Z)||!this.parent())return!1}}next(Z=!0){return this.move(1,Z)}prev(Z=!0){return this.move(-1,Z)}moveTo(Z,J=0){while(this.from==this.to||(J<1?this.from>=Z:this.from>Z)||(J>-1?this.to<=Z:this.to<Z))if(!this.parent())break;while(this.enterChild(1,Z,J));return this}get node(){if(!this.buffer)return this._tree;let Z=this.bufferNode,J=null,Q=0;if(Z&&Z.context==this.buffer)Z:for(let X=this.index,Y=this.stack.length;Y>=0;){for(let K=Z;K;K=K._parent)if(K.index==X){if(X==this.index)return K;J=K,Q=Y+1;break Z}X=this.stack[--Y]}for(let X=Q;X<this.stack.length;X++)J=new Z9(this.buffer,J,this.stack[X]);return this.bufferNode=new Z9(this.buffer,J,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(Z,J){for(let Q=0;;){let X=!1;if(this.type.isAnonymous||Z(this)!==!1){if(this.firstChild()){Q++;continue}if(!this.type.isAnonymous)X=!0}for(;;){if(X&&J)J(this);if(X=this.type.isAnonymous,!Q)return;if(this.nextSibling())break;this.parent(),Q--,X=!0}}}matchContext(Z){if(!this.buffer)return sK(this.node.parent,Z);let{buffer:J}=this.buffer,{types:Q}=J.set;for(let X=Z.length-1,Y=this.stack.length-1;X>=0;Y--){if(Y<0)return sK(this._tree,Z,X);let K=Q[J.buffer[this.stack[Y]]];if(!K.isAnonymous){if(Z[X]&&Z[X]!=K.name)return!1;X--}}return!0}}function aK(Z){return Z.children.some((J)=>J instanceof J9||!J.type.isAnonymous||aK(J))}function vA(Z){var J;let{buffer:Q,nodeSet:X,maxBufferLength:Y=1024,reused:K=[],minRepeatType:W=X.types.length}=Z,q=Array.isArray(Q)?new iK(Q,Q.length):Q,G=X.types,U=0,z=0;function I(A,L,B,E,D,l){let{id:f,start:c,end:q1,size:e}=q,Z1=z,W1=U;if(e<0)if(q.next(),e==-1){let y=K[f];B.push(y),E.push(c-A);return}else if(e==-3){U=f;return}else if(e==-4){z=f;return}else throw RangeError(`Unrecognized record size: ${e}`);let G1=G[f],J1,t,g=c-A;if(q1-c<=Y&&(t=R(q.pos-L,D))){let y=new Uint16Array(t.size-t.skip),d=q.pos-t.size,Q1=y.length;while(q.pos>d)Q1=T(t.start,y,Q1);J1=new J9(y,q1-t.start,X),g=t.start-A}else{let y=q.pos-e;q.next();let d=[],Q1=[],u1=f>=W?f:-1,V1=0,S1=q1;while(q.pos>y)if(u1>=0&&q.id==u1&&q.size>=0){if(q.end<=S1-Y)F(d,Q1,c,V1,q.end,S1,u1,Z1,W1),V1=d.length,S1=q.end;q.next()}else if(l>2500)V(c,y,d,Q1);else I(c,y,d,Q1,u1,l+1);if(u1>=0&&V1>0&&V1<d.length)F(d,Q1,c,V1,c,S1,u1,Z1,W1);if(d.reverse(),Q1.reverse(),u1>-1&&V1>0){let K0=H(G1,W1);J1=oK(G1,d,Q1,0,d.length,0,q1-c,K0,K0)}else J1=N(G1,d,Q1,q1-c,Z1-q1,W1)}B.push(J1),E.push(g)}function V(A,L,B,E){let D=[],l=0,f=-1;while(q.pos>L){let{id:c,start:q1,end:e,size:Z1}=q;if(Z1>4)q.next();else if(f>-1&&q1<f)break;else{if(f<0)f=e-Y;D.push(c,q1,e),l++,q.next()}}if(l){let c=new Uint16Array(l*4),q1=D[D.length-2];for(let e=D.length-3,Z1=0;e>=0;e-=3)c[Z1++]=D[e],c[Z1++]=D[e+1]-q1,c[Z1++]=D[e+2]-q1,c[Z1++]=Z1;B.push(new J9(c,D[2]-q1,X)),E.push(q1-A)}}function H(A,L){return(B,E,D)=>{let l=0,f=B.length-1,c,q1;if(f>=0&&(c=B[f])instanceof g1){if(!f&&c.type==A&&c.length==D)return c;if(q1=c.prop(O1.lookAhead))l=E[f]+c.length+q1}return N(A,B,E,D,l,L)}}function F(A,L,B,E,D,l,f,c,q1){let e=[],Z1=[];while(A.length>E)e.push(A.pop()),Z1.push(L.pop()+B-D);A.push(N(X.types[f],e,Z1,l-D,c-l,q1)),L.push(D-B)}function N(A,L,B,E,D,l,f){if(l){let c=[O1.contextHash,l];f=f?[c].concat(f):[c]}if(D>25){let c=[O1.lookAhead,D];f=f?[c].concat(f):[c]}return new g1(A,L,B,E,f)}function R(A,L){let B=q.fork(),E=0,D=0,l=0,f=B.end-Y,c={size:0,start:0,skip:0};Z:for(let q1=B.pos-A;B.pos>q1;){let e=B.size;if(B.id==L&&e>=0){c.size=E,c.start=D,c.skip=l,l+=4,E+=4,B.next();continue}let Z1=B.pos-e;if(e<0||Z1<q1||B.start<f)break;let W1=B.id>=W?4:0,G1=B.start;B.next();while(B.pos>Z1){if(B.size<0)if(B.size==-3||B.size==-4)W1+=4;else break Z;else if(B.id>=W)W1+=4;B.next()}D=G1,E+=e,l+=W1}if(L<0||E==A)c.size=E,c.start=D,c.skip=l;return c.size>4?c:void 0}function T(A,L,B){let{id:E,start:D,end:l,size:f}=q;if(q.next(),f>=0&&E<W){let c=B;if(f>4){let q1=q.pos-(f-4);while(q.pos>q1)B=T(A,L,B)}L[--B]=c,L[--B]=l-A,L[--B]=D-A,L[--B]=E}else if(f==-3)U=E;else if(f==-4)z=E;return B}let S=[],C=[];while(q.pos>0)I(Z.start||0,Z.bufferStart||0,S,C,-1,0);let k=(J=Z.length)!==null&&J!==void 0?J:S.length?C[0]+S[0].length:0;return new g1(G[Z.topID],S.reverse(),C.reverse(),k)}var Jj=new WeakMap;function cJ(Z,J){if(!Z.isAnonymous||J instanceof J9||J.type!=Z)return 1;let Q=Jj.get(J);if(Q==null){Q=1;for(let X of J.children){if(X.type!=Z||!(X instanceof g1)){Q=1;break}Q+=cJ(Z,X)}Jj.set(J,Q)}return Q}function oK(Z,J,Q,X,Y,K,W,q,G){let U=0;for(let F=X;F<Y;F++)U+=cJ(Z,J[F]);let z=Math.ceil(U*1.5/8),I=[],V=[];function H(F,N,R,T,S){for(let C=R;C<T;){let k=C,A=N[C],L=cJ(Z,F[C]);C++;for(;C<T;C++){let B=cJ(Z,F[C]);if(L+B>=z)break;L+=B}if(C==k+1){if(L>z){let B=F[k];H(B.children,B.positions,0,B.children.length,N[k]+S);continue}I.push(F[k])}else{let B=N[C-1]+F[C-1].length-A;I.push(oK(Z,F,N,k,C,A,B,null,G))}V.push(A+S-K)}}return H(J,Q,X,Y,0),(q||G)(I,V,W)}class Q9{constructor(Z,J,Q,X,Y=!1,K=!1){this.from=Z,this.to=J,this.tree=Q,this.offset=X,this.open=(Y?1:0)|(K?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(Z,J=[],Q=!1){let X=[new Q9(0,Z.length,Z,0,!1,Q)];for(let Y of J)if(Y.to>Z.length)X.push(Y);return X}static applyChanges(Z,J,Q=128){if(!J.length)return Z;let X=[],Y=1,K=Z.length?Z[0]:null;for(let W=0,q=0,G=0;;W++){let U=W<J.length?J[W]:null,z=U?U.fromA:1e9;if(z-q>=Q)while(K&&K.from<z){let I=K;if(q>=I.from||z<=I.to||G){let V=Math.max(I.from,q)-G,H=Math.min(I.to,z)-G;I=V>=H?null:new Q9(V,H,I.tree,I.offset+G,W>0,!!U)}if(I)X.push(I);if(K.to>z)break;K=Y<Z.length?Z[Y++]:null}if(!U)break;q=U.toA,G=U.toA-U.toB}return X}}class lJ{startParse(Z,J,Q){if(typeof Z=="string")Z=new Wj(Z);return Q=!Q?[new pJ(0,Z.length)]:Q.length?Q.map((X)=>new pJ(X.from,X.to)):[new pJ(0,0)],this.createParse(Z,J||[],Q)}parse(Z,J,Q){let X=this.startParse(Z,J,Q);for(;;){let Y=X.advance();if(Y)return Y}}}class Wj{constructor(Z){this.string=Z}get length(){return this.string.length}chunk(Z){return this.string.slice(Z)}get lineChunks(){return!1}read(Z,J){return this.string.slice(Z,J)}}var vx=new O1({perNode:!0});var mA=0;class G6{constructor(Z,J,Q,X){this.name=Z,this.set=J,this.base=Q,this.modified=X,this.id=mA++}toString(){let{name:Z}=this;for(let J of this.modified)if(J.name)Z=`${J.name}(${Z})`;return Z}static define(Z,J){let Q=typeof Z=="string"?Z:"?";if(Z instanceof G6)J=Z;if(J===null||J===void 0?void 0:J.base)throw Error("Can not derive from a modified tag");let X=new G6(Q,[],null,[]);if(X.set.push(X),J)for(let Y of J.set)X.set.push(Y);return X}static defineModifier(Z){let J=new aJ(Z);return(Q)=>{if(Q.modified.indexOf(J)>-1)return Q;return aJ.get(Q.base||Q,Q.modified.concat(J).sort((X,Y)=>X.id-Y.id))}}}var pA=0;class aJ{constructor(Z){this.name=Z,this.instances=[],this.id=pA++}static get(Z,J){if(!J.length)return Z;let Q=J[0].instances.find((W)=>W.base==Z&&cA(J,W.modified));if(Q)return Q;let X=[],Y=new G6(Z.name,X,Z,J);for(let W of J)W.instances.push(Y);let K=dA(J);for(let W of Z.set)if(!W.modified.length)for(let q of K)X.push(aJ.get(W,q));return Y}}function cA(Z,J){return Z.length==J.length&&Z.every((Q,X)=>Q==J[X])}function dA(Z){let J=[[]];for(let Q=0;Q<Z.length;Q++)for(let X=0,Y=J.length;X<Y;X++)J.push(J[X].concat(Z[Q]));return J.sort((Q,X)=>X.length-Q.length)}function Uj(Z){let J=Object.create(null);for(let Q in Z){let X=Z[Q];if(!Array.isArray(X))X=[X];for(let Y of Q.split(" "))if(Y){let K=[],W=2,q=Y;for(let I=0;;){if(q=="..."&&I>0&&I+3==Y.length){W=1;break}let V=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(q);if(!V)throw RangeError("Invalid path: "+Y);if(K.push(V[0]=="*"?"":V[0][0]=='"'?JSON.parse(V[0]):V[0]),I+=V[0].length,I==Y.length)break;let H=Y[I++];if(I==Y.length&&H=="!"){W=0;break}if(H!="/")throw RangeError("Invalid path: "+Y);q=Y.slice(I)}let G=K.length-1,U=K[G];if(!U)throw RangeError("Invalid path: "+Y);let z=new n7(X,W,G>0?K.slice(0,G):null);J[U]=z.sort(J[U])}}return zj.add(J)}var zj=new O1({combine(Z,J){let Q,X,Y;while(Z||J){if(!Z||J&&Z.depth>=J.depth)Y=J,J=J.next;else Y=Z,Z=Z.next;if(Q&&Q.mode==Y.mode&&!Y.context&&!Q.context)continue;let K=new n7(Y.tags,Y.mode,Y.context);if(Q)Q.next=K;else X=K;Q=K}return X}});class n7{constructor(Z,J,Q,X){this.tags=Z,this.mode=J,this.context=Q,this.next=X}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(Z){if(!Z||Z.depth<this.depth)return this.next=Z,this;return Z.next=this.sort(Z.next),Z}get depth(){return this.context?this.context.length:0}}n7.empty=new n7([],2,null);function Z3(Z,J){let Q=Object.create(null);for(let K of Z)if(!Array.isArray(K.tag))Q[K.tag.id]=K.class;else for(let W of K.tag)Q[W.id]=K.class;let{scope:X,all:Y=null}=J||{};return{style:(K)=>{let W=Y;for(let q of K)for(let G of q.set){let U=Q[G.id];if(U){W=W?W+" "+U:U;break}}return W},scope:X}}function nA(Z,J){let Q=null;for(let X of Z){let Y=X.style(J);if(Y)Q=Q?Q+" "+Y:Y}return Q}function Ij(Z,J,Q,X=0,Y=Z.length){let K=new Vj(X,Array.isArray(J)?J:[J],Q);K.highlightRange(Z.cursor(),X,Y,"",K.highlighters),K.flush(Y)}class Vj{constructor(Z,J,Q){this.at=Z,this.highlighters=J,this.span=Q,this.class=""}startSpan(Z,J){if(J!=this.class){if(this.flush(Z),Z>this.at)this.at=Z;this.class=J}}flush(Z){if(Z>this.at&&this.class)this.span(this.at,Z,this.class)}highlightRange(Z,J,Q,X,Y){let{type:K,from:W,to:q}=Z;if(W>=Q||q<=J)return;if(K.isTop)Y=this.highlighters.filter((V)=>!V.scope||V.scope(K));let G=X,U=lA(Z)||n7.empty,z=nA(Y,U.tags);if(z){if(G)G+=" ";if(G+=z,U.mode==1)X+=(X?" ":"")+z}if(this.startSpan(Math.max(J,W),G),U.opaque)return;let I=Z.tree&&Z.tree.prop(O1.mounted);if(I&&I.overlay){let V=Z.node.enter(I.overlay[0].from+W,1),H=this.highlighters.filter((N)=>!N.scope||N.scope(I.tree.type)),F=Z.firstChild();for(let N=0,R=W;;N++){let T=N<I.overlay.length?I.overlay[N]:null,S=T?T.from+W:q,C=Math.max(J,R),k=Math.min(Q,S);if(C<k&&F){while(Z.from<k)if(this.highlightRange(Z,C,k,X,Y),this.startSpan(Math.min(k,Z.to),G),Z.to>=S||!Z.nextSibling())break}if(!T||S>Q)break;if(R=T.to+W,R>J)this.highlightRange(V.cursor(),Math.max(J,T.from+W),Math.min(Q,R),"",H),this.startSpan(Math.min(Q,R),G)}if(F)Z.parent()}else if(Z.firstChild()){if(I)X="";do{if(Z.to<=J)continue;if(Z.from>=Q)break;this.highlightRange(Z,J,Q,X,Y),this.startSpan(Math.min(Q,Z.to),G)}while(Z.nextSibling());Z.parent()}}}function lA(Z){let J=Z.type.prop(zj);while(J&&J.context&&!Z.matchContext(J.context))J=J.next;return J||null}var n=G6.define,sJ=n(),X9=n(),qj=n(X9),Gj=n(X9),Y9=n(),iJ=n(Y9),tK=n(Y9),J8=n(),i9=n(J8),e6=n(),Z8=n(),eK=n(),L5=n(eK),rJ=n(),m={comment:sJ,lineComment:n(sJ),blockComment:n(sJ),docComment:n(sJ),name:X9,variableName:n(X9),typeName:qj,tagName:n(qj),propertyName:Gj,attributeName:n(Gj),className:n(X9),labelName:n(X9),namespace:n(X9),macroName:n(X9),literal:Y9,string:iJ,docString:n(iJ),character:n(iJ),attributeValue:n(iJ),number:tK,integer:n(tK),float:n(tK),bool:n(Y9),regexp:n(Y9),escape:n(Y9),color:n(Y9),url:n(Y9),keyword:e6,self:n(e6),null:n(e6),atom:n(e6),unit:n(e6),modifier:n(e6),operatorKeyword:n(e6),controlKeyword:n(e6),definitionKeyword:n(e6),moduleKeyword:n(e6),operator:Z8,derefOperator:n(Z8),arithmeticOperator:n(Z8),logicOperator:n(Z8),bitwiseOperator:n(Z8),compareOperator:n(Z8),updateOperator:n(Z8),definitionOperator:n(Z8),typeOperator:n(Z8),controlOperator:n(Z8),punctuation:eK,separator:n(eK),bracket:L5,angleBracket:n(L5),squareBracket:n(L5),paren:n(L5),brace:n(L5),content:J8,heading:i9,heading1:n(i9),heading2:n(i9),heading3:n(i9),heading4:n(i9),heading5:n(i9),heading6:n(i9),contentSeparator:n(J8),list:n(J8),quote:n(J8),emphasis:n(J8),strong:n(J8),link:n(J8),monospace:n(J8),strikethrough:n(J8),inserted:n(),deleted:n(),changed:n(),invalid:n(),meta:rJ,documentMeta:n(rJ),annotation:n(rJ),processingInstruction:n(rJ),definition:G6.defineModifier("definition"),constant:G6.defineModifier("constant"),function:G6.defineModifier("function"),standard:G6.defineModifier("standard"),local:G6.defineModifier("local"),special:G6.defineModifier("special")};for(let Z in m){let J=m[Z];if(J instanceof G6)J.name=Z}var cx=Z3([{tag:m.link,class:"tok-link"},{tag:m.heading,class:"tok-heading"},{tag:m.emphasis,class:"tok-emphasis"},{tag:m.strong,class:"tok-strong"},{tag:m.keyword,class:"tok-keyword"},{tag:m.atom,class:"tok-atom"},{tag:m.bool,class:"tok-bool"},{tag:m.url,class:"tok-url"},{tag:m.labelName,class:"tok-labelName"},{tag:m.inserted,class:"tok-inserted"},{tag:m.deleted,class:"tok-deleted"},{tag:m.literal,class:"tok-literal"},{tag:m.string,class:"tok-string"},{tag:m.number,class:"tok-number"},{tag:[m.regexp,m.escape,m.special(m.string)],class:"tok-string2"},{tag:m.variableName,class:"tok-variableName"},{tag:m.local(m.variableName),class:"tok-variableName tok-local"},{tag:m.definition(m.variableName),class:"tok-variableName tok-definition"},{tag:m.special(m.variableName),class:"tok-variableName2"},{tag:m.definition(m.propertyName),class:"tok-propertyName tok-definition"},{tag:m.typeName,class:"tok-typeName"},{tag:m.namespace,class:"tok-namespace"},{tag:m.className,class:"tok-className"},{tag:m.macroName,class:"tok-macroName"},{tag:m.propertyName,class:"tok-propertyName"},{tag:m.operator,class:"tok-operator"},{tag:m.comment,class:"tok-comment"},{tag:m.meta,class:"tok-meta"},{tag:m.invalid,class:"tok-invalid"},{tag:m.punctuation,class:"tok-punctuation"}]);var J3,l7=new O1;function iA(Z){return o.define({combine:Z?(J)=>J.concat(Z):void 0})}var rA=new O1;class U6{constructor(Z,J,Q=[],X=""){if(this.data=Z,this.name=X,!A1.prototype.hasOwnProperty("tree"))Object.defineProperty(A1.prototype,"tree",{get(){return h6(this)}});this.parser=J,this.extension=[r7.of(this),A1.languageData.of((Y,K,W)=>{let q=jj(Y,K,W),G=q.type.prop(l7);if(!G)return[];let U=Y.facet(G),z=q.type.prop(rA);if(z){let I=q.resolve(K-q.from,W);for(let V of z)if(V.test(I,Y)){let H=Y.facet(V.facet);return V.type=="replace"?H:H.concat(U)}}return U})].concat(Q)}isActiveAt(Z,J,Q=-1){return jj(Z,J,Q).type.prop(l7)==this.data}findRegions(Z){let J=Z.facet(r7);if((J===null||J===void 0?void 0:J.data)==this.data)return[{from:0,to:Z.doc.length}];if(!J||!J.allowsNesting)return[];let Q=[],X=(Y,K)=>{if(Y.prop(l7)==this.data){Q.push({from:K,to:K+Y.length});return}let W=Y.prop(O1.mounted);if(W){if(W.tree.prop(l7)==this.data){if(W.overlay)for(let q of W.overlay)Q.push({from:q.from+K,to:q.to+K});else Q.push({from:K,to:K+Y.length});return}else if(W.overlay){let q=Q.length;if(X(W.tree,W.overlay[0].from+K),Q.length>q)return}}for(let q=0;q<Y.children.length;q++){let G=Y.children[q];if(G instanceof g1)X(G,Y.positions[q]+K)}};return X(h6(Z),0),Q}get allowsNesting(){return!0}}U6.setState=B1.define();function jj(Z,J,Q){let X=Z.facet(r7),Y=h6(Z).topNode;if(!X||X.allowsNesting){for(let K=Y;K;K=K.enter(J,Q,l1.ExcludeBuffers|l1.EnterBracketed))if(K.type.isTop)Y=K}return Y}function h6(Z){let J=Z.field(U6.state,!1);return J?J.tree:g1.empty}class Mj{constructor(Z){this.doc=Z,this.cursorPos=0,this.string="",this.cursor=Z.iter()}get length(){return this.doc.length}syncTo(Z){return this.string=this.cursor.next(Z-this.cursorPos).value,this.cursorPos=Z+this.string.length,this.cursorPos-this.string.length}chunk(Z){return this.syncTo(Z),this.string}get lineChunks(){return!0}read(Z,J){let Q=this.cursorPos-this.string.length;if(Z<Q||J>=this.cursorPos)return this.doc.sliceString(Z,J);else return this.string.slice(Z-Q,J-Q)}}var P5=null;class s7{constructor(Z,J,Q=[],X,Y,K,W,q){this.parser=Z,this.state=J,this.fragments=Q,this.tree=X,this.treeLen=Y,this.viewport=K,this.skipped=W,this.scheduleOn=q,this.parse=null,this.tempSkipped=[]}static create(Z,J,Q){return new s7(Z,J,[],g1.empty,0,Q,[],null)}startParse(){return this.parser.startParse(new Mj(this.state.doc),this.fragments)}work(Z,J){if(J!=null&&J>=this.state.doc.length)J=void 0;if(this.tree!=g1.empty&&this.isDone(J!==null&&J!==void 0?J:this.state.doc.length))return this.takeTree(),!0;return this.withContext(()=>{var Q;if(typeof Z=="number"){let X=Date.now()+Z;Z=()=>Date.now()>X}if(!this.parse)this.parse=this.startParse();if(J!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>J)&&J<this.state.doc.length)this.parse.stopAt(J);for(;;){let X=this.parse.advance();if(X)if(this.fragments=this.withoutTempSkipped(Q9.addTree(X,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(Q=this.parse.stoppedAt)!==null&&Q!==void 0?Q:this.state.doc.length,this.tree=X,this.parse=null,this.treeLen<(J!==null&&J!==void 0?J:this.state.doc.length))this.parse=this.startParse();else return!0;if(Z())return!1}})}takeTree(){let Z,J;if(this.parse&&(Z=this.parse.parsedPos)>=this.treeLen){if(this.parse.stoppedAt==null||this.parse.stoppedAt>Z)this.parse.stopAt(Z);this.withContext(()=>{while(!(J=this.parse.advance()));}),this.treeLen=Z,this.tree=J,this.fragments=this.withoutTempSkipped(Q9.addTree(this.tree,this.fragments,!0)),this.parse=null}}withContext(Z){let J=P5;P5=this;try{return Z()}finally{P5=J}}withoutTempSkipped(Z){for(let J;J=this.tempSkipped.pop();)Z=Hj(Z,J.from,J.to);return Z}changes(Z,J){let{fragments:Q,tree:X,treeLen:Y,viewport:K,skipped:W}=this;if(this.takeTree(),!Z.empty){let q=[];if(Z.iterChangedRanges((G,U,z,I)=>q.push({fromA:G,toA:U,fromB:z,toB:I})),Q=Q9.applyChanges(Q,q),X=g1.empty,Y=0,K={from:Z.mapPos(K.from,-1),to:Z.mapPos(K.to,1)},this.skipped.length){W=[];for(let G of this.skipped){let U=Z.mapPos(G.from,1),z=Z.mapPos(G.to,-1);if(U<z)W.push({from:U,to:z})}}}return new s7(this.parser,J,Q,X,Y,K,W,this.scheduleOn)}updateViewport(Z){if(this.viewport.from==Z.from&&this.viewport.to==Z.to)return!1;this.viewport=Z;let J=this.skipped.length;for(let Q=0;Q<this.skipped.length;Q++){let{from:X,to:Y}=this.skipped[Q];if(X<Z.to&&Y>Z.from)this.fragments=Hj(this.fragments,X,Y),this.skipped.splice(Q--,1)}if(this.skipped.length>=J)return!1;return this.reset(),!0}reset(){if(this.parse)this.takeTree(),this.parse=null}skipUntilInView(Z,J){this.skipped.push({from:Z,to:J})}static getSkippingParser(Z){return new class extends lJ{createParse(J,Q,X){let Y=X[0].from,K=X[X.length-1].to;return{parsedPos:Y,advance(){let q=P5;if(q){for(let G of X)q.tempSkipped.push(G);if(Z)q.scheduleOn=q.scheduleOn?Promise.all([q.scheduleOn,Z]):Z}return this.parsedPos=K,new g1(w0.none,[],[],K-Y)},stoppedAt:null,stopAt(){}}}}}isDone(Z){Z=Math.min(Z,this.state.doc.length);let J=this.fragments;return this.treeLen>=Z&&J.length&&J[0].from==0&&J[0].to>=Z}static get(){return P5}}function Hj(Z,J,Q){return Q9.applyChanges(Z,[{fromA:J,toA:Q,fromB:J,toB:Q}])}class i7{constructor(Z){this.context=Z,this.tree=Z.tree}apply(Z){if(!Z.docChanged&&this.tree==this.context.tree)return this;let J=this.context.changes(Z.changes,Z.state),Q=this.context.treeLen==Z.startState.doc.length?void 0:Math.max(Z.changes.mapPos(this.context.treeLen),J.viewport.to);if(!J.work(20,Q))J.takeTree();return new i7(J)}static init(Z){let J=Math.min(3000,Z.doc.length),Q=s7.create(Z.facet(r7).parser,Z,{from:0,to:J});if(!Q.work(20,J))Q.takeTree();return new i7(Q)}}U6.state=M0.define({create:i7.init,update(Z,J){for(let Q of J.effects)if(Q.is(U6.setState))return Q.value;if(J.startState.facet(r7)!=J.state.facet(r7))return i7.init(J.state);return Z.apply(J)}});var Aj=(Z)=>{let J=setTimeout(()=>Z(),500);return()=>clearTimeout(J)};if(typeof requestIdleCallback<"u")Aj=(Z)=>{let J=-1,Q=setTimeout(()=>{J=requestIdleCallback(Z,{timeout:400})},100);return()=>J<0?clearTimeout(Q):cancelIdleCallback(J)};var Q3=typeof navigator<"u"&&((J3=navigator.scheduling)===null||J3===void 0?void 0:J3.isInputPending)?()=>navigator.scheduling.isInputPending():null,aA=A0.fromClass(class{constructor(J){this.view=J,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(J){let Q=this.view.state.field(U6.state).context;if(Q.updateViewport(J.view.viewport)||this.view.viewport.to>Q.treeLen)this.scheduleWork();if(J.docChanged||J.selectionSet){if(this.view.hasFocus)this.chunkBudget+=50;this.scheduleWork()}this.checkAsyncSchedule(Q)}scheduleWork(){if(this.working)return;let{state:J}=this.view,Q=J.field(U6.state);if(Q.tree!=Q.context.tree||!Q.context.isDone(J.doc.length))this.working=Aj(this.work)}work(J){this.working=null;let Q=Date.now();if(this.chunkEnd<Q&&(this.chunkEnd<0||this.view.hasFocus))this.chunkEnd=Q+30000,this.chunkBudget=3000;if(this.chunkBudget<=0)return;let{state:X,viewport:{to:Y}}=this.view,K=X.field(U6.state);if(K.tree==K.context.tree&&K.context.isDone(Y+1e5))return;let W=Date.now()+Math.min(this.chunkBudget,100,J&&!Q3?Math.max(25,J.timeRemaining()-5):1e9),q=K.context.treeLen<Y&&X.doc.length>Y+1000,G=K.context.work(()=>{return Q3&&Q3()||Date.now()>W},Y+(q?0:1e5));if(this.chunkBudget-=Date.now()-Q,G||this.chunkBudget<=0)K.context.takeTree(),this.view.dispatch({effects:U6.setState.of(new i7(K.context))});if(this.chunkBudget>0&&!(G&&!q))this.scheduleWork();this.checkAsyncSchedule(K.context)}checkAsyncSchedule(J){if(J.scheduleOn)this.workScheduled++,J.scheduleOn.then(()=>this.scheduleWork()).catch((Q)=>a0(this.view.state,Q)).then(()=>this.workScheduled--),J.scheduleOn=null}destroy(){if(this.working)this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),r7=o.define({combine(Z){return Z.length?Z[0]:null},enables:(Z)=>[U6.state,aA,K1.contentAttributes.compute([Z],(J)=>{let Q=J.facet(Z);return Q&&Q.name?{"data-language":Q.name}:{}})]});var oA=o.define(),a7=o.define({combine:(Z)=>{if(!Z.length)return"  ";let J=Z[0];if(!J||/\S/.test(J)||Array.from(J).some((Q)=>Q!=J[0]))throw Error("Invalid indent unit: "+JSON.stringify(Z[0]));return J}});function K9(Z){let J=Z.facet(a7);return J.charCodeAt(0)==9?Z.tabSize*J.length:J.length}function S5(Z,J){let Q="",X=Z.tabSize,Y=Z.facet(a7)[0];if(Y=="\t"){while(J>=X)Q+="\t",J-=X;Y=" "}for(let K=0;K<J;K++)Q+=Y;return Q}function G3(Z,J){if(Z instanceof A1)Z=new o7(Z);for(let X of Z.state.facet(oA)){let Y=X(Z,J);if(Y!==void 0)return Y}let Q=h6(Z.state);return Q.length>=J?tA(Z,Q,J):null}class o7{constructor(Z,J={}){this.state=Z,this.options=J,this.unit=K9(Z)}lineAt(Z,J=1){let Q=this.state.doc.lineAt(Z),{simulateBreak:X,simulateDoubleBreak:Y}=this.options;if(X!=null&&X>=Q.from&&X<=Q.to)if(Y&&X==Z)return{text:"",from:Z};else if(J<0?X<Z:X<=Z)return{text:Q.text.slice(X-Q.from),from:X};else return{text:Q.text.slice(0,X-Q.from),from:Q.from};return Q}textAfterPos(Z,J=1){if(this.options.simulateDoubleBreak&&Z==this.options.simulateBreak)return"";let{text:Q,from:X}=this.lineAt(Z,J);return Q.slice(Z-X,Math.min(Q.length,Z+100-X))}column(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.countColumn(Q,Z-X),K=this.options.overrideIndentation?this.options.overrideIndentation(X):-1;if(K>-1)Y+=K-this.countColumn(Q,Q.search(/\S|$/));return Y}countColumn(Z,J=Z.length){return v9(Z,this.state.tabSize,J)}lineIndent(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.options.overrideIndentation;if(Y){let K=Y(X);if(K>-1)return K}return this.countColumn(Q,Q.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}var Bj=new O1;function tA(Z,J,Q){let X=J.resolveStack(Q),Y=J.resolveInner(Q,-1).resolve(Q,0).enterUnfinishedNodesBefore(Q);if(Y!=X.node){let K=[];for(let W=Y;W&&!(W.from<X.node.from||W.to>X.node.to||W.from==X.node.from&&W.type==X.node.type);W=W.parent)K.push(W);for(let W=K.length-1;W>=0;W--)X={node:K[W],next:X}}return Lj(X,Z,Q)}function Lj(Z,J,Q){for(let X=Z;X;X=X.next){let Y=ZB(X.node);if(Y)return Y(U3.create(J,Q,X))}return 0}function eA(Z){return Z.pos==Z.options.simulateBreak&&Z.options.simulateDoubleBreak}function ZB(Z){let J=Z.type.prop(Bj);if(J)return J;let Q=Z.firstChild,X;if(Q&&(X=Q.type.prop(O1.closedBy))){let Y=Z.lastChild,K=Y&&X.indexOf(Y.name)>-1;return(W)=>YB(W,!0,1,void 0,K&&!eA(W)?Y.from:void 0)}return Z.parent==null?JB:null}function JB(){return 0}class U3 extends o7{constructor(Z,J,Q){super(Z.state,Z.options);this.base=Z,this.pos=J,this.context=Q}get node(){return this.context.node}static create(Z,J,Q){return new U3(Z,J,Q)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(Z){let J=this.state.doc.lineAt(Z.from);for(;;){let Q=Z.resolve(J.from);while(Q.parent&&Q.parent.from==Q.from)Q=Q.parent;if(QB(Q,Z))break;J=this.state.doc.lineAt(Q.from)}return this.lineIndent(J.from)}continue(){return Lj(this.context.next,this.base,this.pos)}}function QB(Z,J){for(let Q=J;Q;Q=Q.parent)if(Z==Q)return!0;return!1}function XB(Z){let J=Z.node,Q=J.childAfter(J.from),X=J.lastChild;if(!Q)return null;let Y=Z.options.simulateBreak,K=Z.state.doc.lineAt(Q.from),W=Y==null||Y<=K.from?K.to:Math.min(K.to,Y);for(let q=Q.to;;){let G=J.childAfter(q);if(!G||G==X)return null;if(!G.type.isSkipped){if(G.from>=W)return null;let U=/^ */.exec(K.text.slice(Q.to-K.from))[0].length;return{from:Q.from,to:Q.to+U}}q=G.to}}function YB(Z,J,Q,X,Y){let K=Z.textAfter,W=K.match(/^\s*/)[0].length,q=X&&K.slice(W,W+X.length)==X||Y==Z.pos+W,G=J?XB(Z):null;if(G)return q?Z.column(G.from):Z.column(G.to);return Z.baseIndent+(q?0:Z.unit*Q)}class t7{constructor(Z,J){this.specs=Z;let Q;function X(W){let q=_6.newName();return(Q||(Q=Object.create(null)))["."+q]=W,q}let Y=typeof J.all=="string"?J.all:J.all?X(J.all):void 0,K=J.scope;this.scope=K instanceof U6?(W)=>W.prop(l7)==K.data:K?(W)=>W==K:void 0,this.style=Z3(Z.map((W)=>({tag:W.tag,class:W.class||X(Object.assign({},W,{tag:null}))})),{all:Y}).style,this.module=Q?new _6(Q):null,this.themeType=J.themeType}static define(Z,J){return new t7(Z,J||{})}}var K3=o.define(),Pj=o.define({combine(Z){return Z.length?[Z[0]]:null}});function X3(Z){let J=Z.facet(K3);return J.length?J:Z.facet(Pj)}function Tj(Z,J){let Q=[KB],X;if(Z instanceof t7){if(Z.module)Q.push(K1.styleModule.of(Z.module));X=Z.themeType}if(J===null||J===void 0?void 0:J.fallback)Q.push(Pj.of(Z));else if(X)Q.push(K3.computeN([K1.darkTheme],(Y)=>{return Y.facet(K1.darkTheme)==(X=="dark")?[Z]:[]}));else Q.push(K3.of(Z));return Q}class Sj{constructor(Z){this.markCache=Object.create(null),this.tree=h6(Z.state),this.decorations=this.buildDeco(Z,X3(Z.state)),this.decoratedTo=Z.viewport.to}update(Z){let J=h6(Z.state),Q=X3(Z.state),X=Q!=X3(Z.startState),{viewport:Y}=Z.view,K=Z.changes.mapPos(this.decoratedTo,1);if(J.length<Y.to&&!X&&J.type==this.tree.type&&K>=Y.to)this.decorations=this.decorations.map(Z.changes),this.decoratedTo=K;else if(J!=this.tree||Z.viewportChanged||X)this.tree=J,this.decorations=this.buildDeco(Z.view,Q),this.decoratedTo=Y.to}buildDeco(Z,J){if(!J||!this.tree.length)return L1.none;let Q=new L8;for(let{from:X,to:Y}of Z.visibleRanges)Ij(this.tree,J,(K,W,q)=>{Q.add(K,W,this.markCache[q]||(this.markCache[q]=L1.mark({class:q})))},X,Y);return Q.finish()}}var KB=P8.high(A0.fromClass(Sj,{decorations:(Z)=>Z.decorations})),ax=t7.define([{tag:m.meta,color:"#404740"},{tag:m.link,textDecoration:"underline"},{tag:m.heading,textDecoration:"underline",fontWeight:"bold"},{tag:m.emphasis,fontStyle:"italic"},{tag:m.strong,fontWeight:"bold"},{tag:m.strikethrough,textDecoration:"line-through"},{tag:m.keyword,color:"#708"},{tag:[m.atom,m.bool,m.url,m.contentSeparator,m.labelName],color:"#219"},{tag:[m.literal,m.inserted],color:"#164"},{tag:[m.string,m.deleted],color:"#a11"},{tag:[m.regexp,m.escape,m.special(m.string)],color:"#e40"},{tag:m.definition(m.variableName),color:"#00f"},{tag:m.local(m.variableName),color:"#30a"},{tag:[m.typeName,m.namespace],color:"#085"},{tag:m.className,color:"#167"},{tag:[m.special(m.variableName),m.macroName],color:"#256"},{tag:m.definition(m.propertyName),color:"#00c"},{tag:m.comment,color:"#940"},{tag:m.invalid,color:"#f00"}]),WB=K1.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),Ej=1e4,Cj="()[]{}",_j=o.define({combine(Z){return T8(Z,{afterCursor:!0,brackets:Cj,maxScanDistance:Ej,renderMatch:UB})}}),qB=L1.mark({class:"cm-matchingBracket"}),GB=L1.mark({class:"cm-nonmatchingBracket"});function UB(Z){let J=[],Q=Z.matched?qB:GB;if(J.push(Q.range(Z.start.from,Z.start.to)),Z.end)J.push(Q.range(Z.end.from,Z.end.to));return J}function Oj(Z){let J=[],Q=Z.facet(_j);for(let X of Z.selection.ranges){if(!X.empty)continue;let Y=$6(Z,X.head,-1,Q)||X.head>0&&$6(Z,X.head-1,1,Q)||Q.afterCursor&&($6(Z,X.head,1,Q)||X.head<Z.doc.length&&$6(Z,X.head+1,-1,Q));if(Y)J=J.concat(Q.renderMatch(Y,Z))}return L1.set(J,!0)}var zB=A0.fromClass(class{constructor(Z){this.paused=!1,this.decorations=Oj(Z.state)}update(Z){if(Z.docChanged||Z.selectionSet||this.paused)if(Z.view.composing)this.decorations=this.decorations.map(Z.changes),this.paused=!0;else this.decorations=Oj(Z.state),this.paused=!1}},{decorations:(Z)=>Z.decorations}),IB=[zB,WB];function kj(Z={}){return[_j.of(Z),IB]}var VB=new O1;function W3(Z,J,Q){let X=Z.prop(J<0?O1.openedBy:O1.closedBy);if(X)return X;if(Z.name.length==1){let Y=Q.indexOf(Z.name);if(Y>-1&&Y%2==(J<0?1:0))return[Q[Y+J]]}return null}function q3(Z){let J=Z.type.prop(VB);return J?J(Z.node):Z}function $6(Z,J,Q,X={}){let Y=X.maxScanDistance||Ej,K=X.brackets||Cj,W=h6(Z),q=W.resolveInner(J,Q);for(let G=q;G;G=G.parent){let U=W3(G.type,Q,K);if(U&&G.from<G.to){let z=q3(G);if(z&&(Q>0?J>=z.from&&J<z.to:J>z.from&&J<=z.to))return jB(Z,J,Q,G,z,U,K)}}return HB(Z,J,Q,W,q.type,Y,K)}function jB(Z,J,Q,X,Y,K,W){let q=X.parent,G={from:Y.from,to:Y.to},U=0,z=q===null||q===void 0?void 0:q.cursor();if(z&&(Q<0?z.childBefore(X.from):z.childAfter(X.to)))do if(Q<0?z.to<=X.from:z.from>=X.to){if(U==0&&K.indexOf(z.type.name)>-1&&z.from<z.to){let I=q3(z);return{start:G,end:I?{from:I.from,to:I.to}:void 0,matched:!0}}else if(W3(z.type,Q,W))U++;else if(W3(z.type,-Q,W)){if(U==0){let I=q3(z);return{start:G,end:I&&I.from<I.to?{from:I.from,to:I.to}:void 0,matched:!1}}U--}}while(Q<0?z.prevSibling():z.nextSibling());return{start:G,matched:!1}}function HB(Z,J,Q,X,Y,K,W){if(Q<0?!J:J==Z.doc.length)return null;let q=Q<0?Z.sliceDoc(J-1,J):Z.sliceDoc(J,J+1),G=W.indexOf(q);if(G<0||G%2==0!=Q>0)return null;let U={from:Q<0?J-1:J,to:Q>0?J+1:J},z=Z.doc.iterRange(J,Q>0?Z.doc.length:0),I=0;for(let V=0;!z.next().done&&V<=K;){let H=z.value;if(Q<0)V+=H.length;let F=J+V*Q;for(let N=Q>0?0:H.length-1,R=Q>0?H.length:-1;N!=R;N+=Q){let T=W.indexOf(H[N]);if(T<0||X.resolveInner(F+N,1).type!=Y)continue;if(T%2==0==Q>0)I++;else if(I==1)return{start:U,end:{from:F+N,to:F+N+1},matched:T>>1==G>>1};else I--}if(Q>0)V+=H.length}return z.done?{start:U,matched:!1}:null}function Fj(Z,J,Q,X=0,Y=0){if(J==null){if(J=Z.search(/[^\s\u00a0]/),J==-1)J=Z.length}let K=Y;for(let W=X;W<J;W++)if(Z.charCodeAt(W)==9)K+=Q-K%Q;else K++;return K}class z3{constructor(Z,J,Q,X){this.string=Z,this.tabSize=J,this.indentUnit=Q,this.overrideIndent=X,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(Z){let J=this.string.charAt(this.pos),Q;if(typeof Z=="string")Q=J==Z;else Q=J&&(Z instanceof RegExp?Z.test(J):Z(J));if(Q)return++this.pos,J}eatWhile(Z){let J=this.pos;while(this.eat(Z));return this.pos>J}eatSpace(){let Z=this.pos;while(/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;return this.pos>Z}skipToEnd(){this.pos=this.string.length}skipTo(Z){let J=this.string.indexOf(Z,this.pos);if(J>-1)return this.pos=J,!0}backUp(Z){this.pos-=Z}column(){if(this.lastColumnPos<this.start)this.lastColumnValue=Fj(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start;return this.lastColumnValue}indentation(){var Z;return(Z=this.overrideIndent)!==null&&Z!==void 0?Z:Fj(this.string,null,this.tabSize)}match(Z,J,Q){if(typeof Z=="string"){let X=(K)=>Q?K.toLowerCase():K,Y=this.string.substr(this.pos,Z.length);if(X(Y)==X(Z)){if(J!==!1)this.pos+=Z.length;return!0}else return null}else{let X=this.string.slice(this.pos).match(Z);if(X&&X.index>0)return null;if(X&&J!==!1)this.pos+=X[0].length;return X}}current(){return this.string.slice(this.start,this.pos)}}function OB(Z){return{name:Z.name||"",token:Z.token,blankLine:Z.blankLine||(()=>{}),startState:Z.startState||(()=>!0),copyState:Z.copyState||FB,indent:Z.indent||(()=>null),languageData:Z.languageData||{},tokenTable:Z.tokenTable||V3,mergeTokens:Z.mergeTokens!==!1}}function FB(Z){if(typeof Z!="object")return Z;let J={};for(let Q in Z){let X=Z[Q];J[Q]=X instanceof Array?X.slice():X}return J}var Nj=new WeakMap;class r9 extends U6{constructor(Z){let J=iA(Z.languageData),Q=OB(Z),X,Y=new class extends lJ{createParse(K,W,q){return new wj(X,K,W,q)}};super(J,Y,[],Z.name);this.topNode=MB(J,this),X=this,this.streamParser=Q,this.stateAfter=new O1({perNode:!0}),this.tokenTable=Z.tokenTable?new j3(Q.tokenTable):DB}static define(Z){return new r9(Z)}getIndent(Z){let J=void 0,{overrideIndentation:Q}=Z.options;if(Q){if(J=Nj.get(Z.state),J!=null&&J<Z.pos-1e4)J=void 0}let X=I3(this,Z.node.tree,Z.node.from,Z.node.from,J!==null&&J!==void 0?J:Z.pos),Y,K;if(X)K=X.state,Y=X.pos+1;else K=this.streamParser.startState(Z.unit),Y=Z.node.from;if(Z.pos-Y>1e4)return null;while(Y<Z.pos){let q=Z.state.doc.lineAt(Y),G=Math.min(Z.pos,q.to);if(q.length){let U=Q?Q(q.from):-1,z=new z3(q.text,Z.state.tabSize,Z.unit,U<0?void 0:U);while(z.pos<G-q.from)bj(this.streamParser.token,z,K)}else this.streamParser.blankLine(K,Z.unit);if(G==Z.pos)break;Y=q.to+1}let W=Z.lineAt(Z.pos);if(Q&&J==null)Nj.set(Z.state,W.from);return this.streamParser.indent(K,/^\s*(.*)/.exec(W.text)[1],Z)}get allowsNesting(){return!1}}function I3(Z,J,Q,X,Y){let K=Q>=X&&Q+J.length<=Y&&J.prop(Z.stateAfter);if(K)return{state:Z.streamParser.copyState(K),pos:Q+J.length};for(let W=J.children.length-1;W>=0;W--){let q=J.children[W],G=Q+J.positions[W],U=q instanceof g1&&G<Y&&I3(Z,q,G,X,Y);if(U)return U}return null}function xj(Z,J,Q,X,Y){if(Y&&Q<=0&&X>=J.length)return J;if(!Y&&Q==0&&J.type==Z.topNode)Y=!0;for(let K=J.children.length-1;K>=0;K--){let W=J.positions[K],q=J.children[K],G;if(W<X&&q instanceof g1){if(!(G=xj(Z,q,Q-W,X-W,Y)))break;return!Y?G:new g1(J.type,J.children.slice(0,K).concat(G),J.positions.slice(0,K+1),W+G.length)}}return null}function NB(Z,J,Q,X,Y){for(let K of J){let W=K.from+(K.openStart?25:0),q=K.to-(K.openEnd?25:0),G=W<=Q&&q>Q&&I3(Z,K.tree,0-K.offset,Q,q),U;if(G&&G.pos<=X&&(U=xj(Z,K.tree,Q+K.offset,G.pos+K.offset,!1)))return{state:G.state,tree:U}}return{state:Z.streamParser.startState(Y?K9(Y):4),tree:g1.empty}}class wj{constructor(Z,J,Q,X){this.lang=Z,this.input=J,this.fragments=Q,this.ranges=X,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=X[X.length-1].to;let Y=s7.get(),K=X[0].from,{state:W,tree:q}=NB(Z,Q,K,this.to,Y===null||Y===void 0?void 0:Y.state);this.state=W,this.parsedPos=this.chunkStart=K+q.length;for(let G=0;G<q.children.length;G++)this.chunks.push(q.children[G]),this.chunkPos.push(q.positions[G]);if(Y&&this.parsedPos<Y.viewport.from-1e5&&X.some((G)=>G.from<=Y.viewport.from&&G.to>=Y.viewport.from))this.state=this.lang.streamParser.startState(K9(Y.state)),Y.skipUntilInView(this.parsedPos,Y.viewport.from),this.parsedPos=Y.viewport.from;this.moveRangeIndex()}advance(){let Z=s7.get(),J=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),Q=Math.min(J,this.chunkStart+512);if(Z)Q=Math.min(Q,Z.viewport.to);while(this.parsedPos<Q)this.parseLine(Z);if(this.chunkStart<this.parsedPos)this.finishChunk();if(this.parsedPos>=J)return this.finish();if(Z&&this.parsedPos>=Z.viewport.to)return Z.skipUntilInView(this.parsedPos,J),this.finish();return null}stopAt(Z){this.stoppedAt=Z}lineAfter(Z){let J=this.input.chunk(Z);if(!this.input.lineChunks){let Q=J.indexOf(`
`);if(Q>-1)J=J.slice(0,Q)}else if(J==`
`)J="";return Z+J.length<=this.to?J:J.slice(0,this.to-Z)}nextLine(){let Z=this.parsedPos,J=this.lineAfter(Z),Q=Z+J.length;for(let X=this.rangeIndex;;){let Y=this.ranges[X].to;if(Y>=Q)break;if(J=J.slice(0,Y-(Q-J.length)),X++,X==this.ranges.length)break;let K=this.ranges[X].from,W=this.lineAfter(K);J+=W,Q=K+W.length}return{line:J,end:Q}}skipGapsTo(Z,J,Q){for(;;){let X=this.ranges[this.rangeIndex].to,Y=Z+J;if(Q>0?X>Y:X>=Y)break;let K=this.ranges[++this.rangeIndex].from;J+=K-X}return J}moveRangeIndex(){while(this.ranges[this.rangeIndex].to<this.parsedPos)this.rangeIndex++}emitToken(Z,J,Q,X){let Y=4;if(this.ranges.length>1){X=this.skipGapsTo(J,X,1),J+=X;let W=this.chunk.length;X=this.skipGapsTo(Q,X,-1),Q+=X,Y+=this.chunk.length-W}let K=this.chunk.length-4;if(this.lang.streamParser.mergeTokens&&Y==4&&K>=0&&this.chunk[K]==Z&&this.chunk[K+2]==J)this.chunk[K+2]=Q;else this.chunk.push(Z,J,Q,Y);return X}parseLine(Z){let{line:J,end:Q}=this.nextLine(),X=0,{streamParser:Y}=this.lang,K=new z3(J,Z?Z.state.tabSize:4,Z?K9(Z.state):2);if(K.eol())Y.blankLine(this.state,K.indentUnit);else while(!K.eol()){let W=bj(Y.token,K,this.state);if(W)X=this.emitToken(this.lang.tokenTable.resolve(W),this.parsedPos+K.start,this.parsedPos+K.pos,X);if(K.start>1e4)break}if(this.parsedPos=Q,this.moveRangeIndex(),this.parsedPos<this.to)this.parsedPos++}finishChunk(){let Z=g1.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:RB,topID:0,maxBufferLength:512,reused:this.chunkReused});Z=new g1(Z.type,Z.children,Z.positions,Z.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(Z),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new g1(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function bj(Z,J,Q){J.start=J.pos;for(let X=0;X<10;X++){let Y=Z(J,Q);if(J.pos>J.start)return Y}throw Error("Stream parser failed to advance stream.")}var V3=Object.create(null),T5=[w0.none],RB=new nJ(T5),Rj=[],Dj=Object.create(null),yj=Object.create(null);for(let[Z,J]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])yj[Z]=$j(V3,J);class j3{constructor(Z){this.extra=Z,this.table=Object.assign(Object.create(null),yj)}resolve(Z){return!Z?0:this.table[Z]||(this.table[Z]=$j(this.extra,Z))}}var DB=new j3(V3);function Y3(Z,J){if(Rj.indexOf(Z)>-1)return;Rj.push(Z),console.warn(J)}function $j(Z,J){let Q=[];for(let q of J.split(" ")){let G=[];for(let U of q.split(".")){let z=Z[U]||m[U];if(!z)Y3(U,`Unknown highlighting tag ${U}`);else if(typeof z=="function")if(!G.length)Y3(U,`Modifier ${U} used at start of tag`);else G=G.map(z);else if(G.length)Y3(U,`Tag ${U} used as modifier`);else G=Array.isArray(z)?z:[z]}for(let U of G)Q.push(U)}if(!Q.length)return 0;let X=J.replace(/ /g,"_"),Y=X+" "+Q.map((q)=>q.id),K=Dj[Y];if(K)return K.id;let W=Dj[Y]=w0.define({id:T5.length,name:X,props:[Uj({[X]:Q})]});return T5.push(W),W.id}function MB(Z,J){let Q=w0.define({id:T5.length,name:"Document",props:[l7.add(()=>Z),Bj.add(()=>(X)=>J.getIndent(X))],top:!0});return T5.push(Q),Q}var ox={rtl:L1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:k1.RTL}),ltr:L1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:k1.LTR}),auto:L1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var AB=(Z)=>{let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.from),X=R3(Z.state,Q.from);return X.line?BB(Z):X.block?PB(Z):!1};function N3(Z,J){return({state:Q,dispatch:X})=>{if(Q.readOnly)return!1;let Y=Z(J,Q);if(!Y)return!1;return X(Q.update(Y)),!0}}var BB=N3(EB,0);var LB=N3(mj,0);var PB=N3((Z,J)=>mj(Z,J,SB(J)),0);function R3(Z,J){let Q=Z.languageDataAt("commentTokens",J,1);return Q.length?Q[0]:{}}var E5=50;function TB(Z,{open:J,close:Q},X,Y){let K=Z.sliceDoc(X-E5,X),W=Z.sliceDoc(Y,Y+E5),q=/\s*$/.exec(K)[0].length,G=/^\s*/.exec(W)[0].length,U=K.length-q;if(K.slice(U-J.length,U)==J&&W.slice(G,G+Q.length)==Q)return{open:{pos:X-q,margin:q&&1},close:{pos:Y+G,margin:G&&1}};let z,I;if(Y-X<=2*E5)z=I=Z.sliceDoc(X,Y);else z=Z.sliceDoc(X,X+E5),I=Z.sliceDoc(Y-E5,Y);let V=/^\s*/.exec(z)[0].length,H=/\s*$/.exec(I)[0].length,F=I.length-H-Q.length;if(z.slice(V,V+J.length)==J&&I.slice(F,F+Q.length)==Q)return{open:{pos:X+V+J.length,margin:/\s/.test(z.charAt(V+J.length))?1:0},close:{pos:Y-H-Q.length,margin:/\s/.test(I.charAt(F-1))?1:0}};return null}function SB(Z){let J=[];for(let Q of Z.selection.ranges){let X=Z.doc.lineAt(Q.from),Y=Q.to<=X.to?X:Z.doc.lineAt(Q.to);if(Y.from>X.from&&Y.from==Q.to)Y=Q.to==X.to+1?X:Z.doc.lineAt(Q.to-1);let K=J.length-1;if(K>=0&&J[K].to>X.from)J[K].to=Y.to;else J.push({from:X.from+/^\s*/.exec(X.text)[0].length,to:Y.to})}return J}function mj(Z,J,Q=J.selection.ranges){let X=Q.map((K)=>R3(J,K.from).block);if(!X.every((K)=>K))return null;let Y=Q.map((K,W)=>TB(J,X[W],K.from,K.to));if(Z!=2&&!Y.every((K)=>K))return{changes:J.changes(Q.map((K,W)=>{if(Y[W])return[];return[{from:K.from,insert:X[W].open+" "},{from:K.to,insert:" "+X[W].close}]}))};else if(Z!=1&&Y.some((K)=>K)){let K=[];for(let W=0,q;W<Y.length;W++)if(q=Y[W]){let G=X[W],{open:U,close:z}=q;K.push({from:U.pos-G.open.length,to:U.pos+U.margin},{from:z.pos-z.margin,to:z.pos+G.close.length})}return{changes:K}}return null}function EB(Z,J,Q=J.selection.ranges){let X=[],Y=-1;Z:for(let{from:K,to:W}of Q){let q=X.length,G=1e9,U;for(let z=K;z<=W;){let I=J.doc.lineAt(z);if(U==null){if(U=R3(J,I.from).line,!U)continue Z}if(I.from>Y&&(K==W||W>I.from)){Y=I.from;let V=/^\s*/.exec(I.text)[0].length,H=V==I.length,F=I.text.slice(V,V+U.length)==U?V:-1;if(V<I.text.length&&V<G)G=V;X.push({line:I,comment:F,token:U,indent:V,empty:H,single:!1})}z=I.to+1}if(G<1e9){for(let z=q;z<X.length;z++)if(X[z].indent<X[z].line.text.length)X[z].indent=G}if(X.length==q+1)X[q].single=!0}if(Z!=2&&X.some((K)=>K.comment<0&&(!K.empty||K.single))){let K=[];for(let{line:q,token:G,indent:U,empty:z,single:I}of X)if(I||!z)K.push({from:q.from+U,insert:G+" "});let W=J.changes(K);return{changes:W,selection:J.selection.map(W,1)}}else if(Z!=1&&X.some((K)=>K.comment>=0)){let K=[];for(let{line:W,comment:q,token:G}of X)if(q>=0){let U=W.from+q,z=U+G.length;if(W.text[z-W.from]==" ")z++;K.push({from:U,to:z})}return{changes:K}}return null}var O3=C6.define(),CB=C6.define(),_B=o.define(),pj=o.define({combine(Z){return T8(Z,{minDepth:100,newGroupDelay:500,joinToEvent:(J,Q)=>Q},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(J,Q)=>(X,Y)=>J(X,Y)||Q(X,Y)})}}),cj=M0.define({create(){return Q8.empty},update(Z,J){let Q=J.state.facet(pj),X=J.annotation(O3);if(X){let G=m0.fromTransaction(J,X.selection),U=X.side,z=U==0?Z.undone:Z.done;if(G)z=tJ(z,z.length,Q.minDepth,G);else z=lj(z,J.startState.selection);return new Q8(U==0?X.rest:z,U==0?z:X.rest)}let Y=J.annotation(CB);if(Y=="full"||Y=="before")Z=Z.isolate();if(J.annotation(o1.addToHistory)===!1)return!J.changes.empty?Z.addMapping(J.changes.desc):Z;let K=m0.fromTransaction(J),W=J.annotation(o1.time),q=J.annotation(o1.userEvent);if(K)Z=Z.addChanges(K,W,q,Q,J);else if(J.selection)Z=Z.addSelection(J.startState.selection,W,q,Q.newGroupDelay);if(Y=="full"||Y=="after")Z=Z.isolate();return Z},toJSON(Z){return{done:Z.done.map((J)=>J.toJSON()),undone:Z.undone.map((J)=>J.toJSON())}},fromJSON(Z){return new Q8(Z.done.map(m0.fromJSON),Z.undone.map(m0.fromJSON))}});function dj(Z={}){return[cj,pj.of(Z),K1.domEventHandlers({beforeinput(J,Q){let X=J.inputType=="historyUndo"?QQ:J.inputType=="historyRedo"?C5:null;if(!X)return!1;return J.preventDefault(),X(Q)}})]}function JQ(Z,J){return function({state:Q,dispatch:X}){if(!J&&Q.readOnly)return!1;let Y=Q.field(cj,!1);if(!Y)return!1;let K=Y.pop(Z,Q,J);if(!K)return!1;return X(K),!0}}var QQ=JQ(0,!1),C5=JQ(1,!1),kB=JQ(0,!0),xB=JQ(1,!0);class m0{constructor(Z,J,Q,X,Y){this.changes=Z,this.effects=J,this.mapped=Q,this.startSelection=X,this.selectionsAfter=Y}setSelAfter(Z){return new m0(this.changes,this.effects,this.mapped,this.startSelection,Z)}toJSON(){var Z,J,Q;return{changes:(Z=this.changes)===null||Z===void 0?void 0:Z.toJSON(),mapped:(J=this.mapped)===null||J===void 0?void 0:J.toJSON(),startSelection:(Q=this.startSelection)===null||Q===void 0?void 0:Q.toJSON(),selectionsAfter:this.selectionsAfter.map((X)=>X.toJSON())}}static fromJSON(Z){return new m0(Z.changes&&a1.fromJSON(Z.changes),[],Z.mapped&&E6.fromJSON(Z.mapped),Z.startSelection&&h.fromJSON(Z.startSelection),Z.selectionsAfter.map(h.fromJSON))}static fromTransaction(Z,J){let Q=z6;for(let X of Z.startState.facet(_B)){let Y=X(Z);if(Y.length)Q=Q.concat(Y)}if(!Q.length&&Z.changes.empty)return null;return new m0(Z.changes.invert(Z.startState.doc),Q,void 0,J||Z.startState.selection,z6)}static selection(Z){return new m0(void 0,z6,void 0,void 0,Z)}}function tJ(Z,J,Q,X){let Y=J+1>Q+20?J-Q-1:0,K=Z.slice(Y,J);return K.push(X),K}function wB(Z,J){let Q=[],X=!1;return Z.iterChangedRanges((Y,K)=>Q.push(Y,K)),J.iterChangedRanges((Y,K,W,q)=>{for(let G=0;G<Q.length;){let U=Q[G++],z=Q[G++];if(q>=U&&W<=z)X=!0}}),X}function bB(Z,J){return Z.ranges.length==J.ranges.length&&Z.ranges.filter((Q,X)=>Q.empty!=J.ranges[X].empty).length===0}function nj(Z,J){return!Z.length?J:!J.length?Z:Z.concat(J)}var z6=[],yB=200;function lj(Z,J){if(!Z.length)return[m0.selection([J])];else{let Q=Z[Z.length-1],X=Q.selectionsAfter.slice(Math.max(0,Q.selectionsAfter.length-yB));if(X.length&&X[X.length-1].eq(J))return Z;return X.push(J),tJ(Z,Z.length-1,1e9,Q.setSelAfter(X))}}function $B(Z){let J=Z[Z.length-1],Q=Z.slice();return Q[Z.length-1]=J.setSelAfter(J.selectionsAfter.slice(0,J.selectionsAfter.length-1)),Q}function H3(Z,J){if(!Z.length)return Z;let Q=Z.length,X=z6;while(Q){let Y=hB(Z[Q-1],J,X);if(Y.changes&&!Y.changes.empty||Y.effects.length){let K=Z.slice(0,Q);return K[Q-1]=Y,K}else J=Y.mapped,Q--,X=Y.selectionsAfter}return X.length?[m0.selection(X)]:z6}function hB(Z,J,Q){let X=nj(Z.selectionsAfter.length?Z.selectionsAfter.map((q)=>q.map(J)):z6,Q);if(!Z.changes)return m0.selection(X);let Y=Z.changes.map(J),K=J.mapDesc(Z.changes,!0),W=Z.mapped?Z.mapped.composeDesc(K):K;return new m0(Y,B1.mapEffects(Z.effects,J),W,Z.startSelection.map(K),X)}var fB=/^(input\.type|delete)($|\.)/;class Q8{constructor(Z,J,Q=0,X=void 0){this.done=Z,this.undone=J,this.prevTime=Q,this.prevUserEvent=X}isolate(){return this.prevTime?new Q8(this.done,this.undone):this}addChanges(Z,J,Q,X,Y){let K=this.done,W=K[K.length-1];if(W&&W.changes&&!W.changes.empty&&Z.changes&&(!Q||fB.test(Q))&&(!W.selectionsAfter.length&&J-this.prevTime<X.newGroupDelay&&X.joinToEvent(Y,wB(W.changes,Z.changes))||Q=="input.type.compose"))K=tJ(K,K.length-1,X.minDepth,new m0(Z.changes.compose(W.changes),nj(B1.mapEffects(Z.effects,W.changes),W.effects),W.mapped,W.startSelection,z6));else K=tJ(K,K.length,X.minDepth,Z);return new Q8(K,z6,J,Q)}addSelection(Z,J,Q,X){let Y=this.done.length?this.done[this.done.length-1].selectionsAfter:z6;if(Y.length>0&&J-this.prevTime<X&&Q==this.prevUserEvent&&Q&&/^select($|\.)/.test(Q)&&bB(Y[Y.length-1],Z))return this;return new Q8(lj(this.done,Z),this.undone,J,Q)}addMapping(Z){return new Q8(H3(this.done,Z),H3(this.undone,Z),this.prevTime,this.prevUserEvent)}pop(Z,J,Q){let X=Z==0?this.done:this.undone;if(X.length==0)return null;let Y=X[X.length-1],K=Y.selectionsAfter[0]||(Y.startSelection?Y.startSelection.map(Y.changes.invertedDesc,1):J.selection);if(Q&&Y.selectionsAfter.length)return J.update({selection:Y.selectionsAfter[Y.selectionsAfter.length-1],annotations:O3.of({side:Z,rest:$B(X),selection:K}),userEvent:Z==0?"select.undo":"select.redo",scrollIntoView:!0});else if(!Y.changes)return null;else{let W=X.length==1?z6:X.slice(0,X.length-1);if(Y.mapped)W=H3(W,Y.mapped);return J.update({changes:Y.changes,selection:Y.startSelection,effects:Y.effects,annotations:O3.of({side:Z,rest:W,selection:K}),filter:!1,userEvent:Z==0?"undo":"redo",scrollIntoView:!0})}}}Q8.empty=new Q8(z6,z6);var sj=[{key:"Mod-z",run:QQ,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:C5,preventDefault:!0},{linux:"Ctrl-Shift-z",run:C5,preventDefault:!0},{key:"Mod-u",run:kB,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:xB,preventDefault:!0}];function Z4(Z,J){return h.create(Z.ranges.map(J),Z.mainIndex)}function f6(Z,J){return Z.update({selection:J,scrollIntoView:!0,userEvent:"select"})}function g6({state:Z,dispatch:J},Q){let X=Z4(Z.selection,Q);if(X.eq(Z.selection,!0))return!1;return J(f6(Z,X)),!0}function XQ(Z,J){return h.cursor(J?Z.to:Z.from)}function ij(Z,J){return g6(Z,(Q)=>Q.empty?Z.moveByChar(Q,J):XQ(Q,J))}function B0(Z){return Z.textDirectionAt(Z.state.selection.main.head)==k1.LTR}var YQ=(Z)=>ij(Z,!B0(Z)),KQ=(Z)=>ij(Z,B0(Z));function rj(Z,J){return g6(Z,(Q)=>Q.empty?Z.moveByGroup(Q,J):XQ(Q,J))}var D3=(Z)=>rj(Z,!B0(Z)),M3=(Z)=>rj(Z,B0(Z));var Ww=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function gB(Z,J,Q){if(J.type.prop(Q))return!0;let X=J.to-J.from;return X&&(X>2||/[^\s,.;:]/.test(Z.sliceDoc(J.from,J.to)))||J.firstChild}function WQ(Z,J,Q){let X=h6(Z).resolveInner(J.head),Y=Q?O1.closedBy:O1.openedBy;for(let G=J.head;;){let U=Q?X.childAfter(G):X.childBefore(G);if(!U)break;if(gB(Z,U,Y))X=U;else G=Q?U.to:U.from}let K=X.type.prop(Y),W,q;if(K&&(W=Q?$6(Z,X.from,1):$6(Z,X.to,-1))&&W.matched)q=Q?W.end.to:W.end.from;else q=Q?X.to:X.from;return h.cursor(q,Q?-1:1)}var uB=(Z)=>g6(Z,(J)=>WQ(Z.state,J,!B0(Z))),vB=(Z)=>g6(Z,(J)=>WQ(Z.state,J,B0(Z)));function aj(Z,J){return g6(Z,(Q)=>{if(!Q.empty)return XQ(Q,J);let X=Z.moveVertically(Q,J);return X.head!=Q.head?X:Z.moveToLineBoundary(Q,J)})}var qQ=(Z)=>aj(Z,!1),GQ=(Z)=>aj(Z,!0);function oj(Z){let J=Z.scrollDOM.clientHeight<Z.scrollDOM.scrollHeight-2,Q=0,X=0,Y;if(J){for(let K of Z.state.facet(K1.scrollMargins)){let W=K(Z);if(W===null||W===void 0?void 0:W.top)Q=Math.max(W===null||W===void 0?void 0:W.top,Q);if(W===null||W===void 0?void 0:W.bottom)X=Math.max(W===null||W===void 0?void 0:W.bottom,X)}Y=Z.scrollDOM.clientHeight-Q-X}else Y=(Z.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:Q,marginBottom:X,selfScroll:J,height:Math.max(Z.defaultLineHeight,Y-5)}}function tj(Z,J){let Q=oj(Z),{state:X}=Z,Y=Z4(X.selection,(W)=>{return W.empty?Z.moveVertically(W,J,Q.height):XQ(W,J)});if(Y.eq(X.selection))return!1;let K;if(Q.selfScroll){let W=Z.coordsAtPos(X.selection.main.head),q=Z.scrollDOM.getBoundingClientRect(),G=q.top+Q.marginTop,U=q.bottom-Q.marginBottom;if(W&&W.top>G&&W.bottom<U)K=K1.scrollIntoView(Y.main.head,{y:"start",yMargin:W.top-G})}return Z.dispatch(f6(X,Y),{effects:K}),!0}var _5=(Z)=>tj(Z,!1),e7=(Z)=>tj(Z,!0);function W9(Z,J,Q){let X=Z.lineBlockAt(J.head),Y=Z.moveToLineBoundary(J,Q);if(Y.head==J.head&&Y.head!=(Q?X.to:X.from))Y=Z.moveToLineBoundary(J,Q,!1);if(!Q&&Y.head==X.from&&X.length){let K=/^\s*/.exec(Z.state.sliceDoc(X.from,Math.min(X.from+100,X.to)))[0].length;if(K&&J.head!=X.from+K)Y=h.cursor(X.from+K)}return Y}var mB=(Z)=>g6(Z,(J)=>W9(Z,J,!0)),pB=(Z)=>g6(Z,(J)=>W9(Z,J,!1)),cB=(Z)=>g6(Z,(J)=>W9(Z,J,!B0(Z))),dB=(Z)=>g6(Z,(J)=>W9(Z,J,B0(Z))),A3=(Z)=>g6(Z,(J)=>h.cursor(Z.lineBlockAt(J.head).from,1)),B3=(Z)=>g6(Z,(J)=>h.cursor(Z.lineBlockAt(J.head).to,-1));function nB(Z,J,Q){let X=!1,Y=Z4(Z.selection,(K)=>{let W=$6(Z,K.head,-1)||$6(Z,K.head,1)||K.head>0&&$6(Z,K.head-1,1)||K.head<Z.doc.length&&$6(Z,K.head+1,-1);if(!W||!W.end)return K;X=!0;let q=W.start.from==K.head?W.end.to:W.end.from;return Q?h.range(K.anchor,q):h.cursor(q)});if(!X)return!1;return J(f6(Z,Y)),!0}var lB=({state:Z,dispatch:J})=>nB(Z,J,!1);function I6(Z,J,Q){let X=Z4(Z.state.selection,(Y)=>{if(Y.undirectional&&Y.head>=Y.anchor!=J)Y=h.range(Y.head,Y.anchor);let K=Q(Y);return h.range(Y.anchor,K.head,K.goalColumn,K.bidiLevel||void 0,K.assoc)});if(X.eq(Z.state.selection))return!1;return Z.dispatch(f6(Z.state,X)),!0}function ej(Z,J){return I6(Z,J,(Q)=>Z.moveByChar(Q,J))}var ZH=(Z)=>ej(Z,!B0(Z)),JH=(Z)=>ej(Z,B0(Z));function QH(Z,J){return I6(Z,J,(Q)=>Z.moveByGroup(Q,J))}var sB=(Z)=>QH(Z,!B0(Z)),iB=(Z)=>QH(Z,B0(Z));var rB=(Z)=>{let J=!B0(Z);return I6(Z,J,(Q)=>WQ(Z.state,Q,J))},aB=(Z)=>{let J=B0(Z);return I6(Z,J,(Q)=>WQ(Z.state,Q,J))};function XH(Z,J){return I6(Z,J,(Q)=>Z.moveVertically(Q,J))}var YH=(Z)=>XH(Z,!1),KH=(Z)=>XH(Z,!0);function WH(Z,J){return I6(Z,J,(Q)=>Z.moveVertically(Q,J,oj(Z).height))}var hj=(Z)=>WH(Z,!1),fj=(Z)=>WH(Z,!0),oB=(Z)=>I6(Z,!0,(J)=>W9(Z,J,!0)),tB=(Z)=>I6(Z,!1,(J)=>W9(Z,J,!1)),eB=(Z)=>{let J=!B0(Z);return I6(Z,J,(Q)=>W9(Z,Q,J))},ZL=(Z)=>{let J=B0(Z);return I6(Z,J,(Q)=>W9(Z,Q,J))},JL=(Z)=>I6(Z,!1,(J)=>h.cursor(Z.lineBlockAt(J.head).from)),QL=(Z)=>I6(Z,!0,(J)=>h.cursor(Z.lineBlockAt(J.head).to)),eJ=({state:Z,dispatch:J})=>{return J(f6(Z,{anchor:0})),!0},ZQ=({state:Z,dispatch:J})=>{return J(f6(Z,{anchor:Z.doc.length})),!0},gj=({state:Z,dispatch:J})=>{return J(f6(Z,{anchor:Z.selection.main.anchor,head:0})),!0},uj=({state:Z,dispatch:J})=>{return J(f6(Z,{anchor:Z.selection.main.anchor,head:Z.doc.length})),!0},XL=({state:Z,dispatch:J})=>{return J(Z.update({selection:{anchor:0,head:Z.doc.length},userEvent:"select"})),!0},YL=({state:Z,dispatch:J})=>{let Q=zQ(Z).map(({from:X,to:Y})=>h.range(X,Math.min(Y+1,Z.doc.length)));return J(Z.update({selection:h.create(Q),userEvent:"select"})),!0},KL=({state:Z,dispatch:J})=>{let Q=Z4(Z.selection,(X)=>{let Y=h6(Z),K=Y.resolveStack(X.from,1);if(X.empty){let W=Y.resolveStack(X.from,-1);if(W.node.from>=K.node.from&&W.node.to<=K.node.to)K=W}for(let W=K;W;W=W.next){let{node:q}=W;if((q.from<X.from&&q.to>=X.to||q.to>X.to&&q.from<=X.from)&&W.next)return h.range(q.to,q.from)}return X});if(Q.eq(Z.selection))return!1;return J(f6(Z,Q)),!0};function qH(Z,J){let{state:Q}=Z,X=Q.selection,Y=Q.selection.ranges.slice();for(let K of Q.selection.ranges){let W=Q.doc.lineAt(K.head);if(J?W.to<Z.state.doc.length:W.from>0)for(let q=K;;){let G=Z.moveVertically(q,J);if(G.head<W.from||G.head>W.to){if(!Y.some((U)=>U.head==G.head))Y.push(G);break}else if(G.head==q.head)break;else q=G}}if(Y.length==X.ranges.length)return!1;return Z.dispatch(f6(Q,h.create(Y,Y.length-1))),!0}var WL=(Z)=>qH(Z,!1),qL=(Z)=>qH(Z,!0),GL=({state:Z,dispatch:J})=>{let Q=Z.selection,X=null;if(Q.ranges.length>1)X=h.create([Q.main]);else if(!Q.main.empty)X=h.create([h.cursor(Q.main.head)]);if(!X)return!1;return J(f6(Z,X)),!0};function k5(Z,J){if(Z.state.readOnly)return!1;let Q="delete.selection",{state:X}=Z,Y=X.changeByRange((K)=>{let{from:W,to:q}=K;if(W==q){let G=J(K);if(G<W)Q="delete.backward",G=oJ(Z,G,!1);else if(G>W)Q="delete.forward",G=oJ(Z,G,!0);W=Math.min(W,G),q=Math.max(q,G)}else W=oJ(Z,W,!1),q=oJ(Z,q,!0);return W==q?{range:K}:{changes:{from:W,to:q},range:h.cursor(W,W<K.head?-1:1)}});if(Y.changes.empty)return!1;return Z.dispatch(X.update(Y,{scrollIntoView:!0,userEvent:Q,effects:Q=="delete.selection"?K1.announce.of(X.phrase("Selection deleted")):void 0})),!0}function oJ(Z,J,Q){if(Z instanceof K1)for(let X of Z.state.facet(K1.atomicRanges).map((Y)=>Y(Z)))X.between(J,J,(Y,K)=>{if(Y<J&&K>J)J=Q?K:Y});return J}var GH=(Z,J,Q)=>k5(Z,(X)=>{let Y=X.from,{state:K}=Z,W=K.doc.lineAt(Y),q,G;if(Q&&!J&&Y>W.from&&Y<W.from+200&&!/[^ \t]/.test(q=W.text.slice(0,Y-W.from))){if(q[q.length-1]=="\t")return Y-1;let U=v9(q,K.tabSize),z=U%K9(K)||K9(K);for(let I=0;I<z&&q[q.length-1-I]==" ";I++)Y--;G=Y}else if(G=z0(W.text,Y-W.from,J,J)+W.from,G==Y&&W.number!=(J?K.doc.lines:1))G+=J?1:-1;else if(!J&&/[\ufe00-\ufe0f]/.test(W.text.slice(G-W.from,Y-W.from)))G=z0(W.text,G-W.from,!1,!1)+W.from;return G}),F3=(Z)=>GH(Z,!1,!0);var UQ=(Z)=>GH(Z,!0,!1),UH=(Z,J)=>k5(Z,(Q)=>{let X=Q.head,{state:Y}=Z,K=Y.doc.lineAt(X),W=Y.charCategorizer(X);for(let q=null;;){if(X==(J?K.to:K.from)){if(X==Q.head&&K.number!=(J?Y.doc.lines:1))X+=J?1:-1;break}let G=z0(K.text,X-K.from,J)+K.from,U=K.text.slice(Math.min(X,G)-K.from,Math.max(X,G)-K.from),z=W(U);if(q!=null&&z!=q)break;if(U!=" "||X!=Q.head)q=z;X=G}return X}),zH=(Z)=>UH(Z,!1),L3=(Z)=>UH(Z,!0);var UL=(Z)=>k5(Z,(J)=>{let Q=Z.lineBlockAt(J.head).to;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var zL=(Z)=>k5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!1).head;return J.head>Q?Q:Math.max(0,J.head-1)}),IL=(Z)=>k5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!0).head;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var VL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{return{changes:{from:X.from,to:X.to,insert:R1.of(["",""])},range:h.cursor(X.from)}});return J(Z.update(Q,{scrollIntoView:!0,userEvent:"input"})),!0},jL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{if(!X.empty||X.from==0||X.from==Z.doc.length)return{range:X};let Y=X.from,K=Z.doc.lineAt(Y),W=Y==K.from?Y-1:z0(K.text,Y-K.from,!1)+K.from,q=Y==K.to?Y+1:z0(K.text,Y-K.from,!0)+K.from;return{changes:{from:W,to:q,insert:Z.doc.slice(Y,q).append(Z.doc.slice(W,Y))},range:h.cursor(q)}});if(Q.changes.empty)return!1;return J(Z.update(Q,{scrollIntoView:!0,userEvent:"move.character"})),!0};function zQ(Z){let J=[],Q=-1;for(let X of Z.selection.ranges){let Y=Z.doc.lineAt(X.from),K=Z.doc.lineAt(X.to);if(!X.empty&&X.to==K.from)K=Z.doc.lineAt(X.to-1);if(Q>=Y.number){let W=J[J.length-1];W.to=K.to,W.ranges.push(X)}else J.push({from:Y.from,to:K.to,ranges:[X]});Q=K.number+1}return J}function IH(Z,J,Q){if(Z.readOnly)return!1;let X=[],Y=[];for(let K of zQ(Z)){if(Q?K.to==Z.doc.length:K.from==0)continue;let W=Z.doc.lineAt(Q?K.to+1:K.from-1),q=W.length+1;if(Q){X.push({from:K.to,to:W.to},{from:K.from,insert:W.text+Z.lineBreak});for(let G of K.ranges)Y.push(h.range(Math.min(Z.doc.length,G.anchor+q),Math.min(Z.doc.length,G.head+q)))}else{X.push({from:W.from,to:K.from},{from:K.to,insert:Z.lineBreak+W.text});for(let G of K.ranges)Y.push(h.range(G.anchor-q,G.head-q))}}if(!X.length)return!1;return J(Z.update({changes:X,scrollIntoView:!0,selection:h.create(Y,Z.selection.mainIndex),userEvent:"move.line"})),!0}var HL=({state:Z,dispatch:J})=>IH(Z,J,!1),OL=({state:Z,dispatch:J})=>IH(Z,J,!0);function VH(Z,J,Q){if(Z.readOnly)return!1;let X=[];for(let K of zQ(Z))if(Q)X.push({from:K.from,insert:Z.doc.slice(K.from,K.to)+Z.lineBreak});else X.push({from:K.to,insert:Z.lineBreak+Z.doc.slice(K.from,K.to)});let Y=Z.changes(X);return J(Z.update({changes:Y,selection:Z.selection.map(Y,Q?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}var FL=({state:Z,dispatch:J})=>VH(Z,J,!1),NL=({state:Z,dispatch:J})=>VH(Z,J,!0),RL=(Z)=>{if(Z.state.readOnly)return!1;let{state:J}=Z,Q=J.changes(zQ(J).map(({from:Y,to:K})=>{if(Y>0)Y--;else if(K<J.doc.length)K++;return{from:Y,to:K}})),X=Z4(J.selection,(Y)=>{let K=void 0;if(Z.lineWrapping){let W=Z.lineBlockAt(Y.head),q=Z.coordsAtPos(Y.head,Y.assoc||1);if(q)K=W.bottom+Z.documentTop-q.bottom+Z.defaultLineHeight/2}return Z.moveVertically(Y,!0,K)}).map(Q);return Z.dispatch({changes:Q,selection:X,scrollIntoView:!0,userEvent:"delete.line"}),!0};function DL(Z,J){if(/\(\)|\[\]|\{\}/.test(Z.sliceDoc(J-1,J+1)))return{from:J,to:J};let Q=h6(Z).resolveInner(J),X=Q.childBefore(J),Y=Q.childAfter(J),K;if(X&&Y&&X.to<=J&&Y.from>=J&&(K=X.type.prop(O1.closedBy))&&K.indexOf(Y.name)>-1&&Z.doc.lineAt(X.to).from==Z.doc.lineAt(Y.from).from&&!/\S/.test(Z.sliceDoc(X.to,Y.from)))return{from:X.to,to:Y.from};return null}var vj=jH(!1),ML=jH(!0);function jH(Z){return({state:J,dispatch:Q})=>{if(J.readOnly)return!1;let X=J.changeByRange((Y)=>{let{from:K,to:W}=Y,q=J.doc.lineAt(K),G=!Z&&K==W&&DL(J,K);if(Z)K=W=(W<=q.to?q:J.doc.lineAt(W)).to;let U=new o7(J,{simulateBreak:K,simulateDoubleBreak:!!G}),z=G3(U,K);if(z==null)z=v9(/^\s*/.exec(J.doc.lineAt(K).text)[0],J.tabSize);while(W<q.to&&/\s/.test(q.text[W-q.from]))W++;if(G)({from:K,to:W}=G);else if(K>q.from&&K<q.from+100&&!/\S/.test(q.text.slice(0,K)))K=q.from;let I=["",S5(J,z)];if(G)I.push(S5(J,U.lineIndent(q.from,-1)));return{changes:{from:K,to:W,insert:R1.of(I)},range:h.cursor(K+1+I[1].length)}});return Q(J.update(X,{scrollIntoView:!0,userEvent:"input"})),!0}}function P3(Z,J){let Q=-1;return Z.changeByRange((X)=>{let Y=[];for(let W=X.from;W<=X.to;){let q=Z.doc.lineAt(W);if(q.number>Q&&(X.empty||X.to>q.from))J(q,Y,X),Q=q.number;W=q.to+1}let K=Z.changes(Y);return{changes:Y,range:h.range(K.mapPos(X.anchor,1),K.mapPos(X.head,1))}})}var AL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Object.create(null),X=new o7(Z,{overrideIndentation:(K)=>{let W=Q[K];return W==null?-1:W}}),Y=P3(Z,(K,W,q)=>{let G=G3(X,K.from);if(G==null)return;if(!/\S/.test(K.text))G=0;let U=/^\s*/.exec(K.text)[0],z=S5(Z,G);if(U!=z||q.from<K.from+U.length)Q[K.from]=G,W.push({from:K.from,to:K.from+U.length,insert:z})});if(!Y.changes.empty)J(Z.update(Y,{userEvent:"indent"}));return!0},HH=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(P3(Z,(Q,X)=>{X.push({from:Q.from,insert:Z.facet(a7)})}),{userEvent:"input.indent"})),!0},OH=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(P3(Z,(Q,X)=>{let Y=/^\s*/.exec(Q.text)[0];if(!Y)return;let K=v9(Y,Z.tabSize),W=0,q=S5(Z,Math.max(0,K-K9(Z)));while(W<Y.length&&W<q.length&&Y.charCodeAt(W)==q.charCodeAt(W))W++;X.push({from:Q.from+W,to:Q.from+Y.length,insert:q.slice(W)})}),{userEvent:"delete.dedent"})),!0},BL=(Z)=>{return Z.setTabFocusMode(),!0};var LL=[{key:"Ctrl-b",run:YQ,shift:ZH,preventDefault:!0},{key:"Ctrl-f",run:KQ,shift:JH},{key:"Ctrl-p",run:qQ,shift:YH},{key:"Ctrl-n",run:GQ,shift:KH},{key:"Ctrl-a",run:A3,shift:JL},{key:"Ctrl-e",run:B3,shift:QL},{key:"Ctrl-d",run:UQ},{key:"Ctrl-h",run:F3},{key:"Ctrl-k",run:UL},{key:"Ctrl-Alt-h",run:zH},{key:"Ctrl-o",run:VL},{key:"Ctrl-t",run:jL},{key:"Ctrl-v",run:e7}],PL=[{key:"ArrowLeft",run:YQ,shift:ZH,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:D3,shift:sB,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:cB,shift:eB,preventDefault:!0},{key:"ArrowRight",run:KQ,shift:JH,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:M3,shift:iB,preventDefault:!0},{mac:"Cmd-ArrowRight",run:dB,shift:ZL,preventDefault:!0},{key:"ArrowUp",run:qQ,shift:YH,preventDefault:!0},{mac:"Cmd-ArrowUp",run:eJ,shift:gj},{mac:"Ctrl-ArrowUp",run:_5,shift:hj},{key:"ArrowDown",run:GQ,shift:KH,preventDefault:!0},{mac:"Cmd-ArrowDown",run:ZQ,shift:uj},{mac:"Ctrl-ArrowDown",run:e7,shift:fj},{key:"PageUp",run:_5,shift:hj},{key:"PageDown",run:e7,shift:fj},{key:"Home",run:pB,shift:tB,preventDefault:!0},{key:"Mod-Home",run:eJ,shift:gj},{key:"End",run:mB,shift:oB,preventDefault:!0},{key:"Mod-End",run:ZQ,shift:uj},{key:"Enter",run:vj,shift:vj},{key:"Mod-a",run:XL},{key:"Backspace",run:F3,shift:F3,preventDefault:!0},{key:"Delete",run:UQ,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:zH,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:L3,preventDefault:!0},{mac:"Mod-Backspace",run:zL,preventDefault:!0},{mac:"Mod-Delete",run:IL,preventDefault:!0}].concat(LL.map((Z)=>({mac:Z.key,run:Z.run,shift:Z.shift}))),FH=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:uB,shift:rB},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:vB,shift:aB},{key:"Alt-ArrowUp",run:HL},{key:"Shift-Alt-ArrowUp",run:FL},{key:"Alt-ArrowDown",run:OL},{key:"Shift-Alt-ArrowDown",run:NL},{key:"Mod-Alt-ArrowUp",run:WL},{key:"Mod-Alt-ArrowDown",run:qL},{key:"Escape",run:GL},{key:"Mod-Enter",run:ML},{key:"Alt-l",mac:"Ctrl-l",run:YL},{key:"Mod-i",run:KL,preventDefault:!0},{key:"Mod-[",run:OH},{key:"Mod-]",run:HH},{key:"Mod-Alt-\\",run:AL},{key:"Shift-Mod-k",run:RL},{key:"Shift-Mod-\\",run:lB},{key:"Mod-/",run:AB},{key:"Alt-A",run:LB},{key:"Ctrl-m",mac:"Shift-Alt-m",run:BL}].concat(PL),NH={key:"Tab",run:HH,shift:OH};class T3{constructor(Z,J,Q){this.from=Z,this.to=J,this.diagnostic=Q}}class a9{constructor(Z,J,Q){this.diagnostics=Z,this.panel=J,this.selected=Q}static init(Z,J,Q){let X=Q.facet(x5).markerFilter;if(X)Z=X(Z,Q);let Y=Z.slice().sort((V,H)=>V.from-H.from||V.to-H.to),K=new L8,W=[],q=0,G=Q.doc.iter(),U=0,z=Q.doc.length;for(let V=0;;){let H=V==Y.length?null:Y[V];if(!H&&!W.length)break;let F,N;if(W.length)F=q,N=W.reduce((S,C)=>Math.min(S,C.to),H&&H.from>F?H.from:1e8);else{if(F=H.from,F>z)break;N=H.to,W.push(H),V++}while(V<Y.length){let S=Y[V];if(S.from==F&&(S.to>S.from||S.to==F))W.push(S),V++,N=Math.min(S.to,N);else{N=Math.min(S.from,N);break}}N=Math.min(N,z);let R=!1;if(W.some((S)=>S.from==F&&(S.to==N||N==z))){if(R=F==N,!R&&N-F<10){let S=F-(U+G.value.length);if(S>0)G.next(S),U=F;for(let C=F;;){if(C>=N){R=!0;break}if(!G.lineBreak&&U+G.value.length>C)break;C=U+G.value.length,U+=G.value.length,G.next()}}}let T=bL(W);if(R)K.add(F,F,L1.widget({widget:new TH(T),diagnostics:W.slice()}));else{let S=W.reduce((C,k)=>k.markClass?C+" "+k.markClass:C,"");K.add(F,N,L1.mark({class:"cm-lintRange cm-lintRange-"+T+S,diagnostics:W.slice(),inclusiveEnd:W.some((C)=>C.to>N)}))}if(q=N,q==z)break;for(let S=0;S<W.length;S++)if(W[S].to<=q)W.splice(S--,1)}let I=K.finish();return new a9(I,J,J4(I))}}function J4(Z,J=null,Q=0){let X=null;return Z.between(Q,1e9,(Y,K,{spec:W})=>{if(J&&W.diagnostics.indexOf(J)<0)return;if(!X)X=new T3(Y,K,J||W.diagnostics[0]);else if(W.diagnostics.indexOf(X.diagnostic)<0)return!1;else X=new T3(X.from,K,X.diagnostic)}),X}function TL(Z,J){let Q=J.pos,X=J.end||Q,Y=Z.state.facet(x5).hideOn(Z,Q,X);if(Y!=null)return Y;let K=Z.startState.doc.lineAt(J.pos);return!!(Z.effects.some((W)=>W.is(E3))||Z.changes.touchesRange(K.from,Math.max(K.to,X)))}function SL(Z,J){return Z.field(u6,!1)?J:J.concat(B1.appendConfig.of($L))}function MH(Z,J){return{effects:SL(Z,[E3.of(J)])}}var E3=B1.define(),AH=B1.define(),BH=B1.define(),u6=M0.define({create(){return new a9(L1.none,null,null)},update(Z,J){if(J.docChanged&&Z.diagnostics.size){let Q=Z.diagnostics.map(J.changes),X=null,Y=Z.panel;if(Z.selected){let K=J.changes.mapPos(Z.selected.from,1);X=J4(Q,Z.selected.diagnostic,K)||J4(Q,null,K)}if(!Q.size&&Y&&J.state.facet(x5).autoPanel)Y=null;Z=new a9(Q,Y,X)}for(let Q of J.effects)if(Q.is(E3)){let X=!J.state.facet(x5).autoPanel?Z.panel:Q.value.length?VQ.open:null;Z=a9.init(Q.value,X,J.state)}else if(Q.is(AH))Z=new a9(Z.diagnostics,Q.value?VQ.open:null,Z.selected);else if(Q.is(BH))Z=new a9(Z.diagnostics,Z.panel,Q.value);return Z},provide:(Z)=>[c7.from(Z,(J)=>J.panel),K1.decorations.from(Z,(J)=>J.diagnostics)]});var EL=L1.mark({class:"cm-lintRange cm-lintRange-active"});function CL(Z,J,Q){let{diagnostics:X}=Z.state.field(u6),Y,K=-1,W=-1;X.between(J-(Q<0?1:0),J+(Q>0?1:0),(G,U,{spec:z})=>{if(J>=G&&J<=U&&(G==U||(J>G||Q>0)&&(J<U||Q<0)))return Y=z.diagnostics,K=G,W=U,!1});let q=Z.state.facet(x5).tooltipFilter;if(Y&&q)Y=q(Y,Z.state);if(!Y)return null;return{pos:K,end:W,above:!0,create(){return{dom:_L(Z,Y)}}}}function _L(Z,J){return i0("ul",{class:"cm-tooltip-lint"},J.map((Q)=>PH(Z,Q,!1)))}var RH=(Z)=>{let J=Z.state.field(u6,!1);if(!J||!J.panel)return!1;return Z.dispatch({effects:AH.of(!1)}),!0};var x5=o.define({combine(Z){return{sources:Z.map((J)=>J.source).filter((J)=>J!=null),...T8(Z.map((J)=>J.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:DH,tooltipFilter:DH,needsRefresh:(J,Q)=>!J?Q:!Q?J:(X)=>J(X)||Q(X),hideOn:(J,Q)=>!J?Q:!Q?J:(X,Y,K)=>J(X,Y,K)||Q(X,Y,K),autoPanel:(J,Q)=>J||Q})}}});function DH(Z,J){return!Z?J:!J?Z:(Q,X)=>J(Z(Q,X),X)}function LH(Z){let J=[];if(Z)Z:for(let{name:Q}of Z){for(let X=0;X<Q.length;X++){let Y=Q[X];if(/[a-zA-Z]/.test(Y)&&!J.some((K)=>K.toLowerCase()==Y.toLowerCase())){J.push(Y);continue Z}}J.push("")}return J}function PH(Z,J,Q){var X;let Y=Q?LH(J.actions):[];return i0("li",{class:"cm-diagnostic cm-diagnostic-"+J.severity},i0("span",{class:"cm-diagnosticText"},J.renderMessage?J.renderMessage(Z):J.message),(X=J.actions)===null||X===void 0?void 0:X.map((K,W)=>{let q=!1,G=(H)=>{if(H.preventDefault(),q)return;q=!0;let F=J4(Z.state.field(u6).diagnostics,J);if(F)K.apply(Z,F.from,F.to)},{name:U}=K,z=Y[W]?U.indexOf(Y[W]):-1,I=z<0?U:[U.slice(0,z),i0("u",U.slice(z,z+1)),U.slice(z+1)],V=K.markClass?" "+K.markClass:"";return i0("button",{type:"button",class:"cm-diagnosticAction"+V,onclick:G,onmousedown:G,"aria-label":` Action: ${U}${z<0?"":` (access key "${Y[W]})"`}.`},I)}),J.source&&i0("div",{class:"cm-diagnosticSource"},J.source))}class TH extends e8{constructor(Z){super();this.sev=Z}eq(Z){return Z.sev==this.sev}toDOM(){return i0("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class S3{constructor(Z,J){this.diagnostic=J,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=PH(Z,J,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class VQ{constructor(Z){this.view=Z,this.items=[];let J=(X)=>{if(X.ctrlKey||X.altKey||X.metaKey)return;if(X.keyCode==27)RH(this.view),this.view.focus();else if(X.keyCode==38||X.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(X.keyCode==40||X.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(X.keyCode==36)this.moveSelection(0);else if(X.keyCode==35)this.moveSelection(this.items.length-1);else if(X.keyCode==13)this.view.focus();else if(X.keyCode>=65&&X.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:Y}=this.items[this.selectedIndex],K=LH(Y.actions);for(let W=0;W<K.length;W++)if(K[W].toUpperCase().charCodeAt(0)==X.keyCode){let q=J4(this.view.state.field(u6).diagnostics,Y);if(q)Y.actions[W].apply(Z,q.from,q.to)}}else return;X.preventDefault()},Q=(X)=>{for(let Y=0;Y<this.items.length;Y++)if(this.items[Y].dom.contains(X.target))this.moveSelection(Y)};this.list=i0("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:J,onclick:Q}),this.dom=i0("div",{class:"cm-panel-lint"},this.list,i0("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>RH(this.view)},"×")),this.update()}get selectedIndex(){let Z=this.view.state.field(u6).selected;if(!Z)return-1;for(let J=0;J<this.items.length;J++)if(this.items[J].diagnostic==Z.diagnostic)return J;return-1}update(){let{diagnostics:Z,selected:J}=this.view.state.field(u6),Q=0,X=!1,Y=null,K=new Set;Z.between(0,this.view.state.doc.length,(W,q,{spec:G})=>{for(let U of G.diagnostics){if(K.has(U))continue;K.add(U);let z=-1,I;for(let V=Q;V<this.items.length;V++)if(this.items[V].diagnostic==U){z=V;break}if(z<0)I=new S3(this.view,U),this.items.splice(Q,0,I),X=!0;else if(I=this.items[z],z>Q)this.items.splice(Q,z-Q),X=!0;if(J&&I.diagnostic==J.diagnostic){if(!I.dom.hasAttribute("aria-selected"))I.dom.setAttribute("aria-selected","true"),Y=I}else if(I.dom.hasAttribute("aria-selected"))I.dom.removeAttribute("aria-selected");Q++}});while(Q<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0))X=!0,this.items.pop();if(this.items.length==0)this.items.push(new S3(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),X=!0;if(Y)this.list.setAttribute("aria-activedescendant",Y.id),this.view.requestMeasure({key:this,read:()=>({sel:Y.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:W,panel:q})=>{let G=q.height/this.list.offsetHeight;if(W.top<q.top)this.list.scrollTop-=(q.top-W.top)/G;else if(W.bottom>q.bottom)this.list.scrollTop+=(W.bottom-q.bottom)/G}});else if(this.selectedIndex<0)this.list.removeAttribute("aria-activedescendant");if(X)this.sync()}sync(){let Z=this.list.firstChild;function J(){let Q=Z;Z=Q.nextSibling,Q.remove()}for(let Q of this.items)if(Q.dom.parentNode==this.list){while(Z!=Q.dom)J();Z=Q.dom.nextSibling}else this.list.insertBefore(Q.dom,Z);while(Z)J()}moveSelection(Z){if(this.selectedIndex<0)return;let J=this.view.state.field(u6),Q=J4(J.diagnostics,this.items[Z].diagnostic);if(!Q)return;this.view.dispatch({selection:{anchor:Q.from,head:Q.to},scrollIntoView:!0,effects:BH.of(Q)})}static open(Z){return new VQ(Z)}}function kL(Z,J='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${J}>${encodeURIComponent(Z)}</svg>')`}function IQ(Z){return kL(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${Z}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}var xL=K1.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:0.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:IQ("#f11")},".cm-lintRange-warning":{backgroundImage:IQ("orange")},".cm-lintRange-info":{backgroundImage:IQ("#999")},".cm-lintRange-hint":{backgroundImage:IQ("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});function wL(Z){return Z=="error"?4:Z=="warning"?3:Z=="info"?2:1}function bL(Z){let J="hint",Q=1;for(let X of Z){let Y=wL(X.severity);if(Y>Q)Q=Y,J=X.severity}return J}var yL=aV(CL,{hideOn:TL}),$L=[u6,K1.decorations.compute([u6],(Z)=>{let{selected:J,panel:Q}=Z.field(u6);return!J||!Q||J.from==J.to?L1.none:L1.set([EL.range(J.from,J.to)])}),yL,xL];function C3(Z){return new RegExp("^(("+Z.join(")|(")+"))\\b")}var hL=C3(["and","or","not","is"]),SH=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],EH=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function v6(Z){return Z.scopes[Z.scopes.length-1]}function CH(Z){var J="error",Q=Z.delimiters||Z.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,X=[Z.singleOperators,Z.doubleOperators,Z.doubleDelimiters,Z.tripleDelimiters,Z.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/];for(var Y=0;Y<X.length;Y++)if(!X[Y])X.splice(Y--,1);var K=Z.hangingIndent,W=SH,q=EH;if(Z.extra_keywords!=null)W=W.concat(Z.extra_keywords);if(Z.extra_builtins!=null)q=q.concat(Z.extra_builtins);var G=!(Z.version&&Number(Z.version)<3);if(G){var U=Z.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;W=W.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),q=q.concat(["ascii","bytes","exec","print"]);var z=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var U=Z.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;W=W.concat(["exec","print"]),q=q.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var z=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var I=C3(W),V=C3(q);function H(A,L){var B=A.sol()&&L.lastToken!="\\";if(B)L.indent=A.indentation();if(B&&v6(L).type=="py"){var E=v6(L).offset;if(A.eatSpace()){var D=A.indentation();if(D>E)T(A,L);else if(D<E&&C(A,L)&&A.peek()!="#")L.errorToken=!0;return null}else{var l=F(A,L);if(E>0&&C(A,L))l+=" "+J;return l}}return F(A,L)}function F(A,L,B){if(A.eatSpace())return null;if(!B&&A.match(/^#.*/))return"comment";if(A.match(/^[0-9\.]/,!1)){var E=!1;if(A.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i))E=!0;if(A.match(/^[\d_]+\.\d*/))E=!0;if(A.match(/^\.\d+/))E=!0;if(E)return A.eat(/J/i),"number";var D=!1;if(A.match(/^0x[0-9a-f_]+/i))D=!0;if(A.match(/^0b[01_]+/i))D=!0;if(A.match(/^0o[0-7_]+/i))D=!0;if(A.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/))A.eat(/J/i),D=!0;if(A.match(/^0(?![\dx])/i))D=!0;if(D)return A.eat(/L/i),"number"}if(A.match(z)){var l=A.current().toLowerCase().indexOf("f")!==-1;if(!l)return L.tokenize=R(A.current(),L.tokenize),L.tokenize(A,L);else return L.tokenize=N(A.current(),L.tokenize),L.tokenize(A,L)}for(var f=0;f<X.length;f++)if(A.match(X[f]))return"operator";if(A.match(Q))return"punctuation";if(L.lastToken=="."&&A.match(U))return"property";if(A.match(I)||A.match(hL))return"keyword";if(A.match(V))return"builtin";if(A.match(/^(self|cls)\b/))return"self";if(A.match(U)){if(L.lastToken=="def"||L.lastToken=="class")return"def";return"variable"}return A.next(),B?null:J}function N(A,L){while("rubf".indexOf(A.charAt(0).toLowerCase())>=0)A=A.substr(1);var B=A.length==1,E="string";function D(f){return function(c,q1){var e=F(c,q1,!0);if(e=="punctuation"){if(c.current()=="{")q1.tokenize=D(f+1);else if(c.current()=="}")if(f>1)q1.tokenize=D(f-1);else q1.tokenize=l}return e}}function l(f,c){while(!f.eol())if(f.eatWhile(/[^'"\{\}\\]/),f.eat("\\")){if(f.next(),B&&f.eol())return E}else if(f.match(A))return c.tokenize=L,E;else if(f.match("{{"))return E;else if(f.match("{",!1))if(c.tokenize=D(0),f.current())return E;else return c.tokenize(f,c);else if(f.match("}}"))return E;else if(f.match("}"))return J;else f.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else c.tokenize=L;return E}return l.isString=!0,l}function R(A,L){while("rubf".indexOf(A.charAt(0).toLowerCase())>=0)A=A.substr(1);var B=A.length==1,E="string";function D(l,f){while(!l.eol())if(l.eatWhile(/[^'"\\]/),l.eat("\\")){if(l.next(),B&&l.eol())return E}else if(l.match(A))return f.tokenize=L,E;else l.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else f.tokenize=L;return E}return D.isString=!0,D}function T(A,L){while(v6(L).type!="py")L.scopes.pop();L.scopes.push({offset:v6(L).offset+A.indentUnit,type:"py",align:null})}function S(A,L,B){var E=A.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:A.column()+1;L.scopes.push({offset:L.indent+(K||A.indentUnit),type:B,align:E})}function C(A,L){var B=A.indentation();while(L.scopes.length>1&&v6(L).offset>B){if(v6(L).type!="py")return!0;L.scopes.pop()}return v6(L).offset!=B}function k(A,L){if(A.sol())L.beginningOfLine=!0,L.dedent=!1;var B=L.tokenize(A,L),E=A.current();if(L.beginningOfLine&&E=="@")return A.match(U,!1)?"meta":G?"operator":J;if(/\S/.test(E))L.beginningOfLine=!1;if((B=="variable"||B=="builtin")&&L.lastToken=="meta")B="meta";if(E=="pass"||E=="return")L.dedent=!0;if(E=="lambda")L.lambda=!0;if(E==":"&&!L.lambda&&v6(L).type=="py"&&A.match(/^\s*(?:#|$)/,!1))T(A,L);if(E.length==1&&!/string|comment/.test(B)){var D="[({".indexOf(E);if(D!=-1)S(A,L,"])}".slice(D,D+1));if(D="])}".indexOf(E),D!=-1)if(v6(L).type==E)L.indent=L.scopes.pop().offset-(K||A.indentUnit);else return J}if(L.dedent&&A.eol()&&v6(L).type=="py"&&L.scopes.length>1)L.scopes.pop();return B}return{name:"python",startState:function(){return{tokenize:H,scopes:[{offset:0,type:"py",align:null}],indent:0,lastToken:null,lambda:!1,dedent:0}},token:function(A,L){var B=L.errorToken;if(B)L.errorToken=!1;var E=k(A,L);if(E&&E!="comment")L.lastToken=E=="keyword"||E=="punctuation"?A.current():E;if(E=="punctuation")E=null;if(A.eol()&&L.lambda)L.lambda=!1;return B?J:E},indent:function(A,L,B){if(A.tokenize!=H)return A.tokenize.isString?null:0;var E=v6(A),D=E.type==L.charAt(0)||E.type=="py"&&!A.dedent&&/^(else:|elif |except |finally:)/.test(L);if(E.align!=null)return E.align-(D?1:0);else return E.offset-(D?K||B.unit:0)},languageData:{autocomplete:SH.concat(EH).concat(["exec","print"]),indentOnInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}}}var fL=function(Z){return Z.split(" ")},_H=CH({}),Hw=CH({extra_keywords:fL("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")});function jQ(Z){var{statementIndent:J,jsonld:Q}=Z,X=Z.json||Q,Y=Z.typescript,K=Z.wordCharacters||/[\w$\xa1-\uffff]/,W=function(){function O(d0){return{type:d0,style:"keyword"}}var M=O("keyword a"),w=O("keyword b"),s=O("keyword c"),X1=O("keyword d"),D1=O("operator"),_1={type:"atom",style:"atom"};return{if:O("if"),while:M,with:M,else:w,do:w,try:w,finally:w,return:X1,break:X1,continue:X1,new:O("new"),delete:s,void:s,throw:s,debugger:O("debugger"),var:O("var"),const:O("var"),let:O("var"),function:O("function"),catch:O("catch"),for:O("for"),switch:O("switch"),case:O("case"),default:O("default"),in:D1,typeof:D1,instanceof:D1,true:_1,false:_1,null:_1,undefined:_1,NaN:_1,Infinity:_1,this:O("this"),class:O("class"),super:O("atom"),yield:s,export:O("export"),import:O("import"),extends:s,await:s}}(),q=/[+\-*&%=<>!?|~^@]/,G=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function U(O){var M=!1,w,s=!1;while((w=O.next())!=null){if(!M){if(w=="/"&&!s)return;if(w=="[")s=!0;else if(s&&w=="]")s=!1}M=!M&&w=="\\"}}var z,I;function V(O,M,w){return z=O,I=w,M}function H(O,M){var w=O.next();if(w=='"'||w=="'")return M.tokenize=F(w),M.tokenize(O,M);else if(w=="."&&O.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return V("number","number");else if(w=="."&&O.match(".."))return V("spread","meta");else if(/[\[\]{}\(\),;\:\.]/.test(w))return V(w);else if(w=="="&&O.eat(">"))return V("=>","operator");else if(w=="0"&&O.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return V("number","number");else if(/\d/.test(w))return O.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),V("number","number");else if(w=="/")if(O.eat("*"))return M.tokenize=N,N(O,M);else if(O.eat("/"))return O.skipToEnd(),V("comment","comment");else if(Q2(O,M,1))return U(O),O.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),V("regexp","string.special");else return O.eat("="),V("operator","operator",O.current());else if(w=="`")return M.tokenize=R,R(O,M);else if(w=="#"&&O.peek()=="!")return O.skipToEnd(),V("meta","meta");else if(w=="#"&&O.eatWhile(K))return V("variable","property");else if(w=="<"&&O.match("!--")||w=="-"&&O.match("->")&&!/\S/.test(O.string.slice(0,O.start)))return O.skipToEnd(),V("comment","comment");else if(q.test(w)){if(w!=">"||!M.lexical||M.lexical.type!=">"){if(O.eat("=")){if(w=="!"||w=="=")O.eat("=")}else if(/[<>*+\-|&?]/.test(w)){if(O.eat(w),w==">")O.eat(w)}}if(w=="?"&&O.eat("."))return V(".");return V("operator","operator",O.current())}else if(K.test(w)){O.eatWhile(K);var s=O.current();if(M.lastType!="."){if(W.propertyIsEnumerable(s)){var X1=W[s];return V(X1.type,X1.style,s)}if(s=="async"&&O.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return V("async","keyword",s)}return V("variable","variable",s)}}function F(O){return function(M,w){var s=!1,X1;if(Q&&M.peek()=="@"&&M.match(G))return w.tokenize=H,V("jsonld-keyword","meta");while((X1=M.next())!=null){if(X1==O&&!s)break;s=!s&&X1=="\\"}if(!s)w.tokenize=H;return V("string","string")}}function N(O,M){var w=!1,s;while(s=O.next()){if(s=="/"&&w){M.tokenize=H;break}w=s=="*"}return V("comment","comment")}function R(O,M){var w=!1,s;while((s=O.next())!=null){if(!w&&(s=="`"||s=="$"&&O.eat("{"))){M.tokenize=H;break}w=!w&&s=="\\"}return V("quasi","string.special",O.current())}var T="([{}])";function S(O,M){if(M.fatArrowAt)M.fatArrowAt=null;var w=O.string.indexOf("=>",O.start);if(w<0)return;if(Y){var s=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(O.string.slice(O.start,w));if(s)w=s.index}var X1=0,D1=!1;for(var _1=w-1;_1>=0;--_1){var d0=O.string.charAt(_1),e0=T.indexOf(d0);if(e0>=0&&e0<3){if(!X1){++_1;break}if(--X1==0){if(d0=="(")D1=!0;break}}else if(e0>=3&&e0<6)++X1;else if(K.test(d0))D1=!0;else if(/["'\/`]/.test(d0))for(;;--_1){if(_1==0)return;var N4=O.string.charAt(_1-1);if(N4==d0&&O.string.charAt(_1-2)!="\\"){_1--;break}}else if(D1&&!X1){++_1;break}}if(D1&&!X1)M.fatArrowAt=_1}var C={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function k(O,M,w,s,X1,D1){if(this.indented=O,this.column=M,this.type=w,this.prev=X1,this.info=D1,s!=null)this.align=s}function A(O,M){for(var w=O.localVars;w;w=w.next)if(w.name==M)return!0;for(var s=O.context;s;s=s.prev)for(var w=s.vars;w;w=w.next)if(w.name==M)return!0}function L(O,M,w,s,X1){var D1=O.cc;if(B.state=O,B.stream=X1,B.marked=null,B.cc=D1,B.style=M,!O.lexical.hasOwnProperty("align"))O.lexical.align=!0;while(!0){var _1=D1.length?D1.pop():X?V1:Q1;if(_1(w,s)){while(D1.length&&D1[D1.length-1].lex)D1.pop()();if(B.marked)return B.marked;if(w=="variable"&&A(O,s))return"variableName.local";return M}}}var B={state:null,column:null,marked:null,cc:null};function E(){for(var O=arguments.length-1;O>=0;O--)B.cc.push(arguments[O])}function D(){return E.apply(null,arguments),!0}function l(O,M){for(var w=M;w;w=w.next)if(w.name==O)return!0;return!1}function f(O){var M=B.state;if(B.marked="def",M.context){if(M.lexical.info=="var"&&M.context&&M.context.block){var w=c(O,M.context);if(w!=null){M.context=w;return}}else if(!l(O,M.localVars)){M.localVars=new Z1(O,M.localVars);return}}if(Z.globalVars&&!l(O,M.globalVars))M.globalVars=new Z1(O,M.globalVars)}function c(O,M){if(!M)return null;else if(M.block){var w=c(O,M.prev);if(!w)return null;if(w==M.prev)return M;return new e(w,M.vars,!0)}else if(l(O,M.vars))return M;else return new e(M.prev,new Z1(O,M.vars),!1)}function q1(O){return O=="public"||O=="private"||O=="protected"||O=="abstract"||O=="readonly"}function e(O,M,w){this.prev=O,this.vars=M,this.block=w}function Z1(O,M){this.name=O,this.next=M}var W1=new Z1("this",new Z1("arguments",null));function G1(){B.state.context=new e(B.state.context,B.state.localVars,!1),B.state.localVars=W1}function J1(){B.state.context=new e(B.state.context,B.state.localVars,!0),B.state.localVars=null}G1.lex=J1.lex=!0;function t(){B.state.localVars=B.state.context.vars,B.state.context=B.state.context.prev}t.lex=!0;function g(O,M){var w=function(){var s=B.state,X1=s.indented;if(s.lexical.type=="stat")X1=s.lexical.indented;else for(var D1=s.lexical;D1&&D1.type==")"&&D1.align;D1=D1.prev)X1=D1.indented;s.lexical=new k(X1,B.stream.column(),O,null,s.lexical,M)};return w.lex=!0,w}function y(){var O=B.state;if(O.lexical.prev){if(O.lexical.type==")")O.indented=O.lexical.indented;O.lexical=O.lexical.prev}}y.lex=!0;function d(O){function M(w){if(w==O)return D();else if(O==";"||w=="}"||w==")"||w=="]")return E();else return D(M)}return M}function Q1(O,M){if(O=="var")return D(g("vardef",M),lQ,d(";"),y);if(O=="keyword a")return D(g("form"),K0,Q1,y);if(O=="keyword b")return D(g("form"),Q1,y);if(O=="keyword d")return B.stream.match(/^\s*$/,!1)?D():D(g("stat"),q0,d(";"),y);if(O=="debugger")return D(d(";"));if(O=="{")return D(g("}"),J1,XZ,y,t);if(O==";")return D();if(O=="if"){if(B.state.lexical.info=="else"&&B.state.cc[B.state.cc.length-1]==y)B.state.cc.pop()();return D(g("form"),K0,Q1,y,WW)}if(O=="function")return D(h8);if(O=="for")return D(g("form"),J1,qW,Q1,t,y);if(O=="class"||Y&&M=="interface")return B.marked="keyword",D(g("form",O=="class"?O:M),UW,y);if(O=="variable")if(Y&&M=="declare")return B.marked="keyword",D(Q1);else if(Y&&(M=="module"||M=="enum"||M=="type")&&B.stream.match(/^\s*\w/,!1))if(B.marked="keyword",M=="enum")return D(VW);else if(M=="type")return D(GW,d("operator"),C1,d(";"));else return D(g("form"),O6,d("{"),g("}"),XZ,y,y);else if(Y&&M=="namespace")return B.marked="keyword",D(g("form"),V1,Q1,y);else if(Y&&M=="abstract")return B.marked="keyword",D(Q1);else return D(g("stat"),fN);if(O=="switch")return D(g("form"),K0,d("{"),g("}","switch"),J1,XZ,y,y,t);if(O=="case")return D(V1,d(":"));if(O=="default")return D(d(":"));if(O=="catch")return D(g("form"),G1,u1,Q1,y,t);if(O=="export")return D(g("stat"),aN,y);if(O=="import")return D(g("stat"),oN,y);if(O=="async")return D(Q1);if(M=="@")return D(V1,Q1);return E(g("stat"),V1,d(";"),y)}function u1(O){if(O=="(")return D(R9,d(")"))}function V1(O,M){return K8(O,M,!1)}function S1(O,M){return K8(O,M,!0)}function K0(O){if(O!="(")return E();return D(g(")"),q0,d(")"),y)}function K8(O,M,w){if(B.state.fatArrowAt==B.stream.start){var s=w?pQ:JZ;if(O=="(")return D(G1,g(")"),V0(R9,")"),y,d("=>"),s,t);else if(O=="variable")return E(G1,O6,d("=>"),s,t)}var X1=w?H6:$0;if(C.hasOwnProperty(O))return D(X1);if(O=="function")return D(h8,X1);if(O=="class"||Y&&M=="interface")return B.marked="keyword",D(g("form"),rN,y);if(O=="keyword c"||O=="async")return D(w?S1:V1);if(O=="(")return D(g(")"),q0,d(")"),y,X1);if(O=="operator"||O=="spread")return D(w?S1:V1);if(O=="[")return D(g("]"),eN,y,X1);if(O=="{")return O4(QZ,"}",null,X1);if(O=="quasi")return E(p6,X1);if(O=="new")return D(XW(w));return D()}function q0(O){if(O.match(/[;\}\)\],]/))return E();return E(V1)}function $0(O,M){if(O==",")return D(q0);return H6(O,M,!1)}function H6(O,M,w){var s=w==!1?$0:H6,X1=w==!1?V1:S1;if(O=="=>")return D(G1,w?pQ:JZ,t);if(O=="operator"){if(/\+\+|--/.test(M)||Y&&M=="!")return D(s);if(Y&&M=="<"&&B.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1))return D(g(">"),V0(C1,">"),y,s);if(M=="?")return D(V1,d(":"),X1);return D(X1)}if(O=="quasi")return E(p6,s);if(O==";")return;if(O=="(")return O4(S1,")","call",s);if(O==".")return D(gN,s);if(O=="[")return D(g("]"),q0,d("]"),y,s);if(Y&&M=="as")return B.marked="keyword",D(C1,s);if(O=="regexp")return B.state.lastType=B.marked="operator",B.stream.backUp(B.stream.pos-B.stream.start-1),D(X1)}function p6(O,M){if(O!="quasi")return E();if(M.slice(M.length-2)!="${")return D(p6);return D(q0,QW)}function QW(O){if(O=="}")return B.marked="string.special",B.state.tokenize=R,D(p6)}function JZ(O){return S(B.stream,B.state),E(O=="{"?Q1:V1)}function pQ(O){return S(B.stream,B.state),E(O=="{"?Q1:S1)}function XW(O){return function(M){if(M==".")return D(O?hN:$N);else if(M=="variable"&&Y)return D(dN,O?H6:$0);else return E(O?S1:V1)}}function $N(O,M){if(M=="target")return B.marked="keyword",D($0)}function hN(O,M){if(M=="target")return B.marked="keyword",D(H6)}function fN(O){if(O==":")return D(y,Q1);return E($0,d(";"),y)}function gN(O){if(O=="variable")return B.marked="property",D()}function QZ(O,M){if(O=="async")return B.marked="property",D(QZ);else if(O=="variable"||B.style=="keyword"){if(B.marked="property",M=="get"||M=="set")return D(uN);var w;if(Y&&B.state.fatArrowAt==B.stream.start&&(w=B.stream.match(/^\s*:\s*/,!1)))B.state.fatArrowAt=B.stream.pos+w[0].length;return D(N9)}else if(O=="number"||O=="string")return B.marked=Q?"property":B.style+" property",D(N9);else if(O=="jsonld-keyword")return D(N9);else if(Y&&q1(M))return B.marked="keyword",D(QZ);else if(O=="[")return D(V1,X7,d("]"),N9);else if(O=="spread")return D(S1,N9);else if(M=="*")return B.marked="keyword",D(QZ);else if(O==":")return E(N9)}function uN(O){if(O!="variable")return E(N9);return B.marked="property",D(h8)}function N9(O){if(O==":")return D(S1);if(O=="(")return E(h8)}function V0(O,M,w){function s(X1,D1){if(w?w.indexOf(X1)>-1:X1==","){var _1=B.state.lexical;if(_1.info=="call")_1.pos=(_1.pos||0)+1;return D(function(d0,e0){if(d0==M||e0==M)return E();return E(O)},s)}if(X1==M||D1==M)return D();if(w&&w.indexOf(";")>-1)return E(O);return D(d(M))}return function(X1,D1){if(X1==M||D1==M)return D();return E(O,s)}}function O4(O,M,w){for(var s=3;s<arguments.length;s++)B.cc.push(arguments[s]);return D(g(M,w),V0(O,M),y)}function XZ(O){if(O=="}")return D();return E(Q1,XZ)}function X7(O,M){if(Y){if(O==":")return D(C1);if(M=="?")return D(X7)}}function vN(O,M){if(Y&&(O==":"||M=="in"))return D(C1)}function YW(O){if(Y&&O==":")if(B.stream.match(/^\s*\w+\s+is\b/,!1))return D(V1,mN,C1);else return D(C1)}function mN(O,M){if(M=="is")return B.marked="keyword",D()}function C1(O,M){if(M=="keyof"||M=="typeof"||M=="infer"||M=="readonly")return B.marked="keyword",D(M=="typeof"?S1:C1);if(O=="variable"||M=="void")return B.marked="type",D(W8);if(M=="|"||M=="&")return D(C1);if(O=="string"||O=="number"||O=="atom")return D(W8);if(O=="[")return D(g("]"),V0(C1,"]",","),y,W8);if(O=="{")return D(g("}"),cQ,y,W8);if(O=="(")return D(V0(nQ,")"),pN,W8);if(O=="<")return D(V0(C1,">"),C1);if(O=="quasi")return E(dQ,W8)}function pN(O){if(O=="=>")return D(C1)}function cQ(O){if(O.match(/[\}\)\]]/))return D();if(O==","||O==";")return D(cQ);return E(F4,cQ)}function F4(O,M){if(O=="variable"||B.style=="keyword")return B.marked="property",D(F4);else if(M=="?"||O=="number"||O=="string")return D(F4);else if(O==":")return D(C1);else if(O=="[")return D(d("variable"),vN,d("]"),F4);else if(O=="(")return E(K7,F4);else if(!O.match(/[;\}\)\],]/))return D()}function dQ(O,M){if(O!="quasi")return E();if(M.slice(M.length-2)!="${")return D(dQ);return D(C1,cN)}function cN(O){if(O=="}")return B.marked="string.special",B.state.tokenize=R,D(dQ)}function nQ(O,M){if(O=="variable"&&B.stream.match(/^\s*[?:]/,!1)||M=="?")return D(nQ);if(O==":")return D(C1);if(O=="spread")return D(nQ);return E(C1)}function W8(O,M){if(M=="<")return D(g(">"),V0(C1,">"),y,W8);if(M=="|"||O=="."||M=="&")return D(C1);if(O=="[")return D(C1,d("]"),W8);if(M=="extends"||M=="implements")return B.marked="keyword",D(C1);if(M=="?")return D(C1,d(":"),C1)}function dN(O,M){if(M=="<")return D(g(">"),V0(C1,">"),y,W8)}function YZ(){return E(C1,nN)}function nN(O,M){if(M=="=")return D(C1)}function lQ(O,M){if(M=="enum")return B.marked="keyword",D(VW);return E(O6,X7,$8,sN)}function O6(O,M){if(Y&&q1(M))return B.marked="keyword",D(O6);if(O=="variable")return f(M),D();if(O=="spread")return D(O6);if(O=="[")return O4(lN,"]");if(O=="{")return O4(KW,"}")}function KW(O,M){if(O=="variable"&&!B.stream.match(/^\s*:/,!1))return f(M),D($8);if(O=="variable")B.marked="property";if(O=="spread")return D(O6);if(O=="}")return E();if(O=="[")return D(V1,d("]"),d(":"),KW);return D(d(":"),O6,$8)}function lN(){return E(O6,$8)}function $8(O,M){if(M=="=")return D(S1)}function sN(O){if(O==",")return D(lQ)}function WW(O,M){if(O=="keyword b"&&M=="else")return D(g("form","else"),Q1,y)}function qW(O,M){if(M=="await")return D(qW);if(O=="(")return D(g(")"),iN,y)}function iN(O){if(O=="var")return D(lQ,Y7);if(O=="variable")return D(Y7);return E(Y7)}function Y7(O,M){if(O==")")return D();if(O==";")return D(Y7);if(M=="in"||M=="of")return B.marked="keyword",D(V1,Y7);return E(V1,Y7)}function h8(O,M){if(M=="*")return B.marked="keyword",D(h8);if(O=="variable")return f(M),D(h8);if(O=="(")return D(G1,g(")"),V0(R9,")"),y,YW,Q1,t);if(Y&&M=="<")return D(g(">"),V0(YZ,">"),y,h8)}function K7(O,M){if(M=="*")return B.marked="keyword",D(K7);if(O=="variable")return f(M),D(K7);if(O=="(")return D(G1,g(")"),V0(R9,")"),y,YW,t);if(Y&&M=="<")return D(g(">"),V0(YZ,">"),y,K7)}function GW(O,M){if(O=="keyword"||O=="variable")return B.marked="type",D(GW);else if(M=="<")return D(g(">"),V0(YZ,">"),y)}function R9(O,M){if(M=="@")D(V1,R9);if(O=="spread")return D(R9);if(Y&&q1(M))return B.marked="keyword",D(R9);if(Y&&O=="this")return D(X7,$8);return E(O6,X7,$8)}function rN(O,M){if(O=="variable")return UW(O,M);return KZ(O,M)}function UW(O,M){if(O=="variable")return f(M),D(KZ)}function KZ(O,M){if(M=="<")return D(g(">"),V0(YZ,">"),y,KZ);if(M=="extends"||M=="implements"||Y&&O==","){if(M=="implements")B.marked="keyword";return D(Y?C1:V1,KZ)}if(O=="{")return D(g("}"),q8,y)}function q8(O,M){if(O=="async"||O=="variable"&&(M=="static"||M=="get"||M=="set"||Y&&q1(M))&&B.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1))return B.marked="keyword",D(q8);if(O=="variable"||B.style=="keyword")return B.marked="property",D(WZ,q8);if(O=="number"||O=="string")return D(WZ,q8);if(O=="[")return D(V1,X7,d("]"),WZ,q8);if(M=="*")return B.marked="keyword",D(q8);if(Y&&O=="(")return E(K7,q8);if(O==";"||O==",")return D(q8);if(O=="}")return D();if(M=="@")return D(V1,q8)}function WZ(O,M){if(M=="!"||M=="?")return D(WZ);if(O==":")return D(C1,$8);if(M=="=")return D(S1);var w=B.state.lexical.prev,s=w&&w.info=="interface";return E(s?K7:h8)}function aN(O,M){if(M=="*")return B.marked="keyword",D(sQ,d(";"));if(M=="default")return B.marked="keyword",D(V1,d(";"));if(O=="{")return D(V0(zW,"}"),sQ,d(";"));return E(Q1)}function zW(O,M){if(M=="as")return B.marked="keyword",D(d("variable"));if(O=="variable")return E(S1,zW)}function oN(O){if(O=="string")return D();if(O=="(")return E(V1);if(O==".")return E($0);return E(qZ,IW,sQ)}function qZ(O,M){if(O=="{")return O4(qZ,"}");if(O=="variable")f(M);if(M=="*")B.marked="keyword";return D(tN)}function IW(O){if(O==",")return D(qZ,IW)}function tN(O,M){if(M=="as")return B.marked="keyword",D(qZ)}function sQ(O,M){if(M=="from")return B.marked="keyword",D(V1)}function eN(O){if(O=="]")return D();return E(V0(S1,"]"))}function VW(){return E(g("form"),O6,d("{"),g("}"),V0(Z2,"}"),y,y)}function Z2(){return E(O6,$8)}function J2(O,M){return O.lastType=="operator"||O.lastType==","||q.test(M.charAt(0))||/[,.]/.test(M.charAt(0))}function Q2(O,M,w){return M.tokenize==H&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(M.lastType)||M.lastType=="quasi"&&/\{\s*$/.test(O.string.slice(0,O.pos-(w||0)))}return{name:Z.name,startState:function(O){var M={tokenize:H,lastType:"sof",cc:[],lexical:new k(-O,0,"block",!1),localVars:Z.localVars,context:Z.localVars&&new e(null,null,!1),indented:0};if(Z.globalVars&&typeof Z.globalVars=="object")M.globalVars=Z.globalVars;return M},token:function(O,M){if(O.sol()){if(!M.lexical.hasOwnProperty("align"))M.lexical.align=!1;M.indented=O.indentation(),S(O,M)}if(M.tokenize!=N&&O.eatSpace())return null;var w=M.tokenize(O,M);if(z=="comment")return w;return M.lastType=z=="operator"&&(I=="++"||I=="--")?"incdec":z,L(M,w,z,I,O)},indent:function(O,M,w){if(O.tokenize==N||O.tokenize==R)return null;if(O.tokenize!=H)return 0;var s=M&&M.charAt(0),X1=O.lexical,D1;if(!/^\s*else\b/.test(M))for(var _1=O.cc.length-1;_1>=0;--_1){var d0=O.cc[_1];if(d0==y)X1=X1.prev;else if(d0!=WW&&d0!=t)break}while((X1.type=="stat"||X1.type=="form")&&(s=="}"||(D1=O.cc[O.cc.length-1])&&(D1==$0||D1==H6)&&!/^[,\.=+\-*:?[\(]/.test(M)))X1=X1.prev;if(J&&X1.type==")"&&X1.prev.type=="stat")X1=X1.prev;var e0=X1.type,N4=s==e0;if(e0=="vardef")return X1.indented+(O.lastType=="operator"||O.lastType==","?X1.info.length+1:0);else if(e0=="form"&&s=="{")return X1.indented;else if(e0=="form")return X1.indented+w.unit;else if(e0=="stat")return X1.indented+(J2(O,M)?J||w.unit:0);else if(X1.info=="switch"&&!N4&&Z.doubleIndentSwitch!=!1)return X1.indented+(/^(?:case|default)\b/.test(M)?w.unit:2*w.unit);else if(X1.align)return X1.column+(N4?0:1);else return X1.indented+(N4?0:w.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:X?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}var Fw=jQ({name:"javascript"}),Nw=jQ({name:"json",json:!0}),Rw=jQ({name:"json",jsonld:!0}),kH=jQ({name:"typescript",typescript:!0});var OQ="";function gL(Z){let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.head),X=J.selection.main.head,Y=X===Q.to?Math.min(Q.to+1,J.doc.length):Q.to;if(X===Y)return!1;return OQ=J.sliceDoc(X,Y),Z.dispatch({changes:{from:X,to:Y},userEvent:"delete"}),!0}function uL(Z){if(!OQ)return!1;let{from:J,to:Q}=Z.state.selection.main;return Z.dispatch({changes:{from:J,to:Q,insert:OQ},selection:{anchor:J+OQ.length},userEvent:"input"}),!0}var vL=uJ.of([{key:"Ctrl-f",run:KQ},{key:"Ctrl-b",run:YQ},{key:"Ctrl-n",run:GQ},{key:"Ctrl-p",run:qQ},{key:"Ctrl-a",run:A3},{key:"Ctrl-e",run:B3},{key:"Alt-f",run:M3},{key:"Alt-b",run:D3},{key:"Ctrl-d",run:UQ},{key:"Alt-d",run:L3},{key:"Ctrl-k",run:gL},{key:"Ctrl-y",run:uL},{key:"Ctrl-v",run:e7},{key:"Alt-v",run:_5},{key:"Alt-Shift-,",run:eJ},{key:"Alt-Shift-.",run:ZQ}]),q9=B1.define(),I0={count:"",operator:null,pending:""},Q4=M0.define({create:()=>({mode:"normal",...I0}),update(Z,J){for(let Q of J.effects)if(Q.is(q9))Z={...Z,...Q.value};return Z}}),o9={text:"",linewise:!1};function p0(Z,J){Z.dispatch({effects:q9.of(J)})}function k8(Z,J){return J>=0&&J<Z.length?Z.sliceString(J,J+1):""}function x8(Z){if(!Z||/\s/.test(Z))return"space";return/[A-Za-z0-9_]/.test(Z)?"word":"punct"}function mL(Z,J){let Q=J,X=x8(k8(Z,Q));if(X!=="space")while(Q<Z.length&&x8(k8(Z,Q))===X)Q++;while(Q<Z.length&&x8(k8(Z,Q))==="space")Q++;return Q}function pL(Z,J){let Q=J-1;while(Q>=0&&x8(k8(Z,Q))==="space")Q--;if(Q<0)return 0;let X=x8(k8(Z,Q));while(Q>=0&&x8(k8(Z,Q))===X)Q--;return Q+1}function cL(Z,J){let Q=J+1;while(Q<Z.length&&x8(k8(Z,Q))==="space")Q++;if(Q>=Z.length)return Math.max(0,Z.length-1);let X=x8(k8(Z,Q));while(Q+1<Z.length&&x8(k8(Z,Q+1))===X)Q++;return Q}function t9(Z){return Z.from+/^\s*/.exec(Z.text)[0].length}function w5(Z,J,Q,X){let{doc:Y,selection:K}=Z.state,W=K.main.head,q=Y.lineAt(W),G=Q||1;switch(J){case"h":return{pos:Math.max(q.from,W-G)};case"l":return{pos:Math.min(X?q.to:Math.max(q.from,q.to-1),W+G)};case"j":case"k":{let U=K.main;for(let z=0;z<G;z++)U=Z.moveVertically(U,J==="j");return{pos:U.head,linewise:!0}}case"w":{let U=W;for(let z=0;z<G;z++)U=mL(Y,U);return{pos:U}}case"b":{let U=W;for(let z=0;z<G;z++)U=pL(Y,U);return{pos:U}}case"e":{let U=W;for(let z=0;z<G;z++)U=cL(Y,U);return{pos:U,inclusive:!0}}case"0":return{pos:q.from};case"^":return{pos:t9(q)};case"$":return{pos:X?q.to:Math.max(q.from,q.to-1)};case"gg":case"G":{let U=Q?Math.min(Math.max(Q,1),Y.lines):J==="gg"?1:Y.lines;return{pos:t9(Y.line(U)),linewise:!0}}default:return null}}function o0(Z,J){let{doc:Q}=Z.state,X=Math.max(0,Math.min(J,Q.length)),Y=Q.lineAt(X);Z.dispatch({selection:{anchor:Math.min(X,Math.max(Y.from,Y.to-1))},scrollIntoView:!0})}function HQ(Z,J){let Q=q9.of({mode:"insert",...I0});if(J===void 0)Z.dispatch({effects:Q});else Z.dispatch({selection:{anchor:J},effects:Q,scrollIntoView:!0})}function dL(Z){let{head:J}=Z.state.selection.main,Q=Z.state.doc.lineAt(J);Z.dispatch({selection:{anchor:J>Q.from?J-1:J},effects:q9.of({mode:"normal",...I0})})}function nL(Z,J,Q){let X=Z.lineAt(J),Y=Z.line(Math.min(X.number+Math.max(Q,1)-1,Z.lines)),K=Z.sliceString(X.from,Y.to)+`
`;if(Y.to<Z.length)return{from:X.from,to:Y.to+1,text:K};return{from:Math.max(0,X.from-1),to:Y.to,text:K}}function k3(Z,J,Q,X){let Y=Math.min(Q,X),K=Math.max(Q,X);if(o9={text:Z.state.sliceDoc(Y,K),linewise:!1},J==="y"){o0(Z,Y);return}if(J==="d"){Z.dispatch({changes:{from:Y,to:K},userEvent:"delete"}),o0(Z,Y);return}Z.dispatch({changes:{from:Y,to:K},selection:{anchor:Y},effects:q9.of({mode:"insert",...I0}),userEvent:"delete",scrollIntoView:!0})}function FQ(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head;if(J==="c"){let q=X.lineAt(Y),G=X.line(Math.min(q.number+Math.max(Q,1)-1,X.lines)),U=t9(q);o9={text:X.sliceString(U,G.to)+`
`,linewise:!0},Z.dispatch({changes:{from:U,to:G.to},selection:{anchor:U},effects:q9.of({mode:"insert",...I0}),userEvent:"delete",scrollIntoView:!0});return}let K=nL(X,Y,Q);if(o9={text:K.text,linewise:!0},J==="y"){o0(Z,X.lineAt(Y).from);return}Z.dispatch({changes:{from:K.from,to:K.to},userEvent:"delete"});let W=Math.min(K.from,Z.state.doc.length);o0(Z,t9(Z.state.doc.lineAt(W)))}function xH(Z,J,Q){if(!o9.text)return;let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=o9.text.repeat(Math.max(Q,1)),W=X.lineAt(Y);if(o9.linewise){let G=K.endsWith(`
`)?K.slice(0,-1):K,U=J?W.to:W.from,z=J?`
`+G:G+`
`;Z.dispatch({changes:{from:U,insert:z},userEvent:"input.paste"});let I=J?W.to+1:W.from;o0(Z,t9(Z.state.doc.lineAt(I)));return}let q=J?Math.min(Y+1,W.to):Y;Z.dispatch({changes:{from:q,insert:K},userEvent:"input.paste"}),o0(Z,q+K.length-1)}function wH(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=/^\s*/.exec(X.text)[0],K=J?X.to:X.from,W=J?`
`+Y:Y+`
`;Z.dispatch({changes:{from:K,insert:W},selection:{anchor:K+W.length-(J?0:1)},effects:q9.of({mode:"insert",...I0}),userEvent:"input",scrollIntoView:!0})}function lL(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=X.to,K=0;for(let q=Math.max(J-1,1);q>0;q--){let G=Q.lineAt(Y).number+1;if(G>Q.lines)break;Y=Q.line(G).to,K++}if(!K)return;let W=Q.sliceString(X.from,Y).replace(/\n\s*/g," ");Z.dispatch({changes:{from:X.from,to:Y,insert:W},userEvent:"input"}),o0(Z,X.from+X.text.replace(/\s+$/,"").length)}function _3(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=X.lineAt(Y),W=Math.min(K.to,Y+Math.max(J,1));if(W===Y)return;if(o9={text:X.sliceString(Y,W),linewise:!1},Q){Z.dispatch({changes:{from:Y,to:W},selection:{anchor:Y},effects:q9.of({mode:"insert",...I0}),userEvent:"delete"});return}Z.dispatch({changes:{from:Y,to:W},userEvent:"delete"}),o0(Z,Y)}function bH(Z,J,Q,X){let Y=Z.state.selection.main.head,K=w5(Z,Q,X,!0);if(!K){p0(Z,I0);return}if(K.linewise){let{doc:q}=Z.state,G=q.lineAt(Y).number,U=q.lineAt(Math.max(0,Math.min(K.pos,q.length))).number,z=q.line(Math.min(G,U));if(o0(Z,z.from),FQ(Z,J,Math.abs(U-G)+1),J!=="c")p0(Z,I0);return}let W=K.inclusive?K.pos+1:K.pos;if(k3(Z,J,Y,W),J!=="c")p0(Z,I0)}var sL=new Set(["Enter","Backspace","Delete","Tab"]);function iL(Z,J,Q){let X=J.key,Y=Q.count?parseInt(Q.count,10):0;if(J.ctrlKey){if(X==="r")return C5(Z)||!0;if(X==="d")return e7(Z)||!0;if(X==="u")return _5(Z)||!0;if(X==="[")return p0(Z,I0),!0;return!1}if(X==="Escape")return p0(Z,I0),!0;if(sL.has(X)){if(X==="Enter"){let U=w5(Z,"j",Y,!1);if(U)o0(Z,t9(Z.state.doc.lineAt(U.pos)))}else if(X==="Backspace"){let U=w5(Z,"h",Y,!1);if(U)o0(Z,U.pos)}else if(X==="Delete")_3(Z,Y||1,!1);return p0(Z,I0),!0}if(X.length!==1)return!1;if(/[1-9]/.test(X)||X==="0"&&Q.count)return p0(Z,{count:Q.count+X}),!0;if(Q.pending==="g"){if(X==="g")if(Q.operator)bH(Z,Q.operator,"gg",Y);else{let U=w5(Z,"gg",Y,!1);o0(Z,U.pos),p0(Z,I0)}else p0(Z,I0);return!0}if(X==="g")return p0(Z,{pending:"g"}),!0;if(Q.operator){if(X===Q.operator){if(FQ(Z,Q.operator,Y||1),Q.operator!=="c")p0(Z,I0)}else bH(Z,Q.operator,X,Y);return!0}if(X==="d"||X==="c"||X==="y")return p0(Z,{operator:X}),!0;let K=w5(Z,X,Y,!1);if(K)return o0(Z,K.pos),p0(Z,I0),!0;let{doc:W}=Z.state,q=Z.state.selection.main.head,G=W.lineAt(q);switch(X){case"i":HQ(Z,q);break;case"a":HQ(Z,Math.min(q+1,G.to));break;case"I":HQ(Z,t9(G));break;case"A":HQ(Z,G.to);break;case"o":wH(Z,!0);break;case"O":wH(Z,!1);break;case"x":_3(Z,Y||1,!1);break;case"s":_3(Z,Y||1,!0);break;case"S":FQ(Z,"c",Y||1);break;case"D":k3(Z,"d",q,G.to);break;case"C":k3(Z,"c",q,G.to);break;case"Y":FQ(Z,"y",Y||1);break;case"p":xH(Z,!0,Y||1);break;case"P":xH(Z,!1,Y||1);break;case"J":lL(Z,Y||1);break;case"u":QQ(Z);break;default:break}return p0(Z,I0),!0}function rL(Z,J){let Q=J.state.field(Q4,!1);if(!Q)return!1;if(Z.metaKey||Z.altKey)return!1;if(Z.key==="Shift"||Z.key==="Control")return!1;if(Z.key==="Alt"||Z.key==="Meta")return!1;if(Q.mode==="insert"){if(Z.key==="Escape"||Z.ctrlKey&&Z.key==="[")return dL(J),Z.preventDefault(),!0;return!1}if(!iL(J,Z,Q))return!1;return Z.preventDefault(),Z.stopPropagation(),!0}function aL(Z){let J=document.createElement("div");J.className="cm-vim-panel";let Q=(X)=>{let Y=X.field(Q4,!1);if(!Y)return;let K=Y.count+(Y.operator??"")+Y.pending;J.textContent=(Y.mode==="insert"?"-- INSERT --":"-- NORMAL --")+(K?"  "+K:"")};return Q(Z.state),{dom:J,bottom:!0,update:(X)=>Q(X.state)}}var oL=[Q4,K1.domEventHandlers({keydown:rL}),K1.inputHandler.of((Z)=>{let J=Z.state.field(Q4,!1);return!!J&&J.mode!=="insert"}),K1.editorAttributes.compute([Q4],(Z)=>{let J=Z.field(Q4,!1);return J&&J.mode!=="insert"?{class:"cm-vim-normal"}:{}}),c7.of(aL)],tL=new Set(["as","assert","auto","case","const","delegate","derive","echo","else","fn","if","implement","import","let","macro","opaque","panic","pub","test","todo","type","use"]),eL=r9.define({name:"gleam",token(Z){if(Z.eatSpace())return null;if(Z.match("//"))return Z.skipToEnd(),"comment";if(Z.peek()==='"'){Z.next();let Q=!1;while(!Z.eol()){let X=Z.next();if(Q)Q=!1;else if(X==="\\")Q=!0;else if(X==='"')break}return"string"}if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9]*/))return"typeName";if(Z.match(/^[a-z_][a-z0-9_]*/))return tL.has(Z.current())?"keyword":"variableName";if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}#".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"//"},closeBrackets:{brackets:["(","[","{",'"']}}}),ZP=new Set(["after","and","case","catch","cond","def","defdelegate","defexception","defguard","defimpl","defmacro","defmodule","defp","defprotocol","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","rescue","try","unless","unquote","use","when","with"]),JP=new Set(["true","false","nil"]),QP=r9.define({name:"elixir",token(Z){if(Z.eatSpace())return null;if(Z.match("#"))return Z.skipToEnd(),"comment";if(Z.match('"""')||Z.match("'''"))return Z.skipToEnd(),"string";if(Z.peek()==='"'||Z.peek()==="'"){let Q=Z.next(),X=!1;while(!Z.eol()){let Y=Z.next();if(X)X=!1;else if(Y==="\\")X=!0;else if(Y===Q)break}return"string"}if(Z.match(/^~[a-zA-Z]/)){let Q=Z.next(),X={"(":")","[":"]","{":"}","<":">"}[Q]??Q;while(!Z.eol()&&Z.next()!==X);return Z.match(/^[a-z]*/),"string"}if(Z.match(/^[@^][a-z_][A-Za-z0-9_]*/))return"variableName";if(Z.match(/^:"[^"]*"/)||Z.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/))return"atom";if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9_]*/))return"typeName";if(Z.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)){let Q=Z.current();if(ZP.has(Q))return"keyword";if(JP.has(Q))return"atom";return"variableName"}if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("=>")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("===")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{",'"']}}}),XP=t7.define([{tag:m.keyword,color:"#bb9af7"},{tag:m.string,color:"#9ece6a"},{tag:m.comment,color:"#565f89",fontStyle:"italic"},{tag:m.number,color:"#ff9e64"},{tag:m.typeName,color:"#2ac3de"},{tag:m.variableName,color:"#c0caf5"},{tag:m.operator,color:"#89ddff"},{tag:m.bracket,color:"#a9b1d6"}]),YP=K1.theme({"&":{backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"var(--editor-font-size, 14px)",height:"100%"},".cm-content":{caretColor:"var(--accent)",fontFamily:"inherit",padding:"12px 0"},".cm-gutters":{backgroundColor:"var(--bg-secondary)",color:"var(--text-secondary)",border:"none",opacity:"0.7"},".cm-activeLine":{backgroundColor:"rgba(65, 72, 104, 0.3)"},".cm-activeLineGutter":{backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--bg-hover)"},".cm-cursor":{borderLeftColor:"var(--accent)"}},{dark:!0});function yH(Z){switch(Z){case"vim":return P8.highest(oL);case"emacs":return P8.highest(vL);default:return[]}}function $H(Z){switch(Z){case"python":return r9.define(_H);case"typescript":return r9.define(kH);case"elixir":return QP;default:return eL}}class hH extends HTMLElement{static observedAttributes=["keymap","language"];#Z=null;#W="";#X=[];#J=new u9;#Q=new u9;set doc(Z){if(this.#W=Z??"",this.#Z&&this.#Z.state.doc.toString()!==this.#W)this.#Z.dispatch({changes:{from:0,to:this.#Z.state.doc.length,insert:this.#W}})}get doc(){return this.#Z?this.#Z.state.doc.toString():this.#W}set diagnostics(Z){if(this.#X=Array.isArray(Z)?Z:[],this.#Z)this.#K()}get#Y(){return this.getAttribute("keymap")??"default"}get#q(){return this.getAttribute("language")??"gleam"}attributeChangedCallback(Z,J,Q){if(!this.#Z)return;switch(Z){case"keymap":this.#Z.dispatch({effects:this.#J.reconfigure(yH(this.#Y))});break;case"language":this.#Z.dispatch({effects:this.#Q.reconfigure($H(this.#q))});break}}connectedCallback(){if(this.#Z)return;let Z=K1.updateListener.of((J)=>{if(J.docChanged)this.dispatchEvent(new CustomEvent("editor-change",{detail:{value:J.state.doc.toString()},bubbles:!0}))});if(this.#Z=new K1({state:A1.create({doc:this.#W,extensions:[this.#J.of(yH(this.#Y)),tV(),dj(),nV(),kj(),sV(),a7.of("  "),this.#Q.of($H(this.#q)),Tj(XP),YP,uJ.of([NH,...FH,...sj]),Z]}),parent:this}),this.#X.length>0)this.#K()}disconnectedCallback(){this.#Z?.destroy(),this.#Z=null}#K(){let Z=this.#Z.state.doc,J=this.#X.flatMap((Q)=>{if(!Q||typeof Q.line!=="number")return[];let X=Z.line(Math.min(Math.max(Q.line,1),Z.lines)),Y=Math.min(X.from+Math.max((Q.column??1)-1,0),X.to),W=X.text.slice(Y-X.from).match(/^\S+/),q=Math.min(Y+(W?W[0].length:1),Z.length);return[{from:Y,to:Math.max(q,Math.min(Y+1,Z.length)),severity:"error",message:String(Q.message??"")}]});this.#Z.dispatch(MH(this.#Z.state,J))}}function x3(){if(!customElements.get("gleam-editor"))customElements.define("gleam-editor",hH)}class b5 extends P{constructor(Z,J,Q){super();this.line=Z,this.column=J,this.message=Q}}function fH(Z){return X0("gleam-editor",Z,$)}function gH(Z){return v4("doc",U0(Z))}function uH(Z){return s1("keymap",Z)}function vH(Z){return s1("language",Z)}function mH(Z){return v4("diagnostics",O8(Z,(J)=>{return x9(j([["line",l6(J.line)],["column",l6(J.column)],["message",U0(J.message)]]))}))}function pH(Z){return e4("editor-change",j7(j(["detail","value"]),w1,(J)=>{return b1(Z(J))}))}class X4 extends P{}var G9=new X4;class w8 extends P{}var y5=new w8;class NQ extends P{}var RQ=new NQ;class X8 extends P{constructor(Z,J,Q){super();this.category=Z,this.subcategory=J,this.title=Q}}class Y4 extends P{}var KP=new Y4;class DQ extends P{}var w3=new DQ;class K4 extends P{}var dH=new K4;class MQ extends P{constructor(Z){super();this[0]=Z}}class b3 extends P{constructor(Z,J,Q,X){super();this.label=Z,this.expected=J,this.actual=Q,this.passed=X}}class y3 extends P{constructor(Z,J,Q,X,Y){super();this.phase=Z,this.file=J,this.line=Q,this.column=X,this.message=Y}}class U9 extends P{constructor(Z){super();this[0]=Z}}class z9 extends P{constructor(Z){super();this[0]=Z}}class $3 extends P{}var h3=new $3;class AQ extends P{}var W4=new AQ;class I9 extends P{constructor(Z){super();this.id=Z}}class V9 extends P{constructor(Z){super();this[0]=Z}}class j9 extends P{}var BQ=new j9;class f3 extends P{}var $5=new f3;class H1 extends P{constructor(Z,J,Q,X,Y,K,W,q,G,U,z,I,V,H,F,N,R,T,S){super();this.route=Z,this.selected_category=J,this.selected_subcategory=Q,this.selected=X,this.problem_index=Y,this.iteration_count=K,this.current_iteration=W,this.draft=q,this.revealed_solution=G,this.runtimes=U,this.run=z,this.drafts=I,this.attempts=V,this.search=H,this.next_run_id=F,this.editor_keymap=N,this.choice=R,this.graded=T,this.exam_answers=S}}class h5 extends P{constructor(Z){super();this[0]=Z}}class f5 extends P{constructor(Z){super();this[0]=Z}}class g5 extends P{constructor(Z){super();this[0]=Z}}class b8 extends P{constructor(Z){super();this[0]=Z}}class LQ extends P{}var nH=new LQ;class PQ extends P{}var lH=new PQ;class u5 extends P{constructor(Z){super();this[0]=Z}}class TQ extends P{}var sH=new TQ;class v5 extends P{}var iH=new v5;class m5 extends P{constructor(Z){super();this[0]=Z}}class q4 extends P{constructor(Z){super();this[0]=Z}}class SQ extends P{}var g3=new SQ;class p5 extends P{constructor(Z){super();this[0]=Z}}class c5 extends P{constructor(Z){super();this[0]=Z}}class G4 extends P{constructor(Z){super();this[0]=Z}}class EQ extends P{}var rH=new EQ;class d5 extends P{}var aH=new d5;class Z7 extends P{constructor(Z){super();this.language=Z}}class H9 extends P{constructor(Z,J){super();this.language=Z,this.message=J}}class U4 extends P{constructor(Z,J){super();this.id=Z,this.outcome=J}}class n5 extends P{constructor(Z){super();this.id=Z}}class l5 extends P{constructor(Z){super();this[0]=Z}}class CQ extends P{}var oH=new CQ;class _Q extends P{}var tH=new _Q;class kQ extends P{constructor(Z){super();this[0]=Z}}class u3 extends P{}var eH=new u3;class ZO extends P{constructor(Z,J,Q){super();this.section=Z,this.correct=J,this.total=Q}}var xQ=70;function O9(){return new H1(G9,z1,z1,$,0,3,1,"",z1,$,W4,$,$,"",1,"default",z1,!1,$)}function z4(Z,J){return bW(Z,(Q)=>{if(T1(Q[0],J))return new u(Q[1]);else return new P1(void 0)})}function s5(Z,J){let Q=z4(Z.runtimes,J);if(Q instanceof u)return Q[0];else return KP}function m6(Z,J,Q){return _([J,Q],W0(Z,(X)=>{return!T1(X[0],J)}))}function V6(Z){let J=Z.selected,Q=FZ(J,Z.problem_index);return OZ(Q)}function e9(Z,J){if(J===0)return J;else return f8(Z*100,J)}function JO(Z,J){let X=I1(J,(K)=>{let W=W0(Z,(q)=>{return q[0].subcategory===K});return new ZO(K,z7(W,(q)=>{return q[1]}),j0(W))}),Y=W0(X,(K)=>{return K.total>0});return DZ(Y,(K,W)=>{let q=Uq(e9(K.correct,K.total),e9(W.correct,W.total));if(q instanceof P0)return dW(K.section,W.section);else return q})}class wQ extends P{}var bQ=new wQ;class yQ extends P{}var $Q=new yQ;class hQ extends P{}var QO=new hQ;class fQ extends P{}var XO=new fQ;class YO extends P{}var KO=new YO;class v extends P{constructor(Z,J,Q){super();this.signature=Z,this.starter=J,this.harness=Q}}class t0 extends P{constructor(Z,J){super();this.label=Z,this.code=J}}class v3 extends P{constructor(Z,J,Q,X){super();this.choices=Z,this.correct=J,this.explanation=Q,this.page=X}}class b0 extends P{constructor(Z,J,Q,X,Y,K,W){super();this.title=Z,this.prompt=J,this.approach=Q,this.solutions=X,this.language=Y,this.check=K,this.quiz=W}}class F1 extends P{constructor(Z,J){super();this.name=Z,this.problems=J}}class y0 extends P{constructor(Z,J){super();this.name=Z,this.subcategories=J}}function WO(Z){if(Z instanceof wQ)return"Python";else if(Z instanceof yQ)return"Gleam";else if(Z instanceof hQ)return"TypeScript";else if(Z instanceof fQ)return"Elixir";else return"Concept"}function i5(Z){if(Z instanceof wQ)return"python";else if(Z instanceof yQ)return"gleam";else if(Z instanceof hQ)return"typescript";else if(Z instanceof fQ)return"elixir";else return"concept"}function j6(Z){if(Z==="Contains Duplicate")return"A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n).";else if(Z==="Valid Anagram")return"A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative.";else if(Z==="Two Sum")return"A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n²).";else if(Z==="Group Anagrams")return"A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups.";else if(Z==="Top K Frequent Elements")return"Count, then select. Build a value-to-frequency map first; then pick the k largest counts — sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n.";else if(Z==="Product of Array Except Self")return"A prefix/suffix problem. The answer at position i is (product of everything before i) × (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise — no division needed.";else if(Z==="Longest Consecutive Sequence")return"A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk.";else if(Z==="Valid Palindrome")return"Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse — same complexity, pick whichever reads better in your language.";else if(Z==="Two Sum II - Input Array Is Sorted")return"A two-pointer convergence problem — the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory.";else if(Z==="3Sum")return"Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip.";else if(Z==="Container With Most Water")return"Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help — always move the shorter one inwards and track the best area seen.";else if(Z==="Best Time to Buy and Sell Stock")return"A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables.";else if(Z==="Longest Substring Without Repeating Characters")return"A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen.";else if(Z==="Longest Repeating Character Replacement")return"A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window.";else if(Z==="Permutation in String")return"A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies — slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps.";else if(Z==="Valid Parentheses")return"A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack.";else if(Z==="Min Stack")return"Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1).";else if(Z==="Daily Temperatures")return"A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry — the popped days just found their warmer day — then pushes itself.";else if(Z==="Binary Search")return"The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step.";else if(Z==="Find Minimum in Rotated Sorted Array")return"Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point — and the minimum — hides in the unsorted half.";else if(Z==="Search in Rotated Sorted Array")return"Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it — recurse into that half or the other.";else if(Z==="Pattern matching on lists")return"In Gleam a list is either [] or [head, ..tail] — every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail.";else if(Z==="Tail recursion with accumulators")return"The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop — no stack growth.";else if(Z==="fold is the loop")return"Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values.";else if(Z==="Frequency maps with dict.upsert")return"dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside.";else if(Z==="Result chains with use")return"use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results.";else if(Z==="Option ergonomics")return"Chains of option.map / option.unwrap / option.from_result express “use it if present, fall back if not” without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value.";else if(Z==="String prefix patterns and graphemes")return'Gleam can pattern-match string prefixes directly: "# " <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions.';else if(Z==="Pipelines")return"The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline.";else if(Z==="Records: labelled args and update syntax")return"Records are immutable: construction uses labelled arguments, and “modifying” one is Record(..old, field: new) — a copy with some fields swapped. Updates return the new record; nothing changes in place.";else if(Z==="gleam/set for membership and dedupe")return"Membership questions want a set, not a list — contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new.";else if(Z==="Counter for frequency maps")return"collections.Counter is the counting idiom: feed it any iterable and it's a dict of value → count, with missing keys reading as 0 and most_common(k) giving the top k — no manual dict bookkeeping.";else if(Z==="defaultdict for grouping")return"collections.defaultdict removes the “is the key there yet?” dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership.";else if(Z==="deque for O(1) popleft")return"Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm — breadth-first search above all — wants a deque: append to the right, popleft from the left.";else if(Z==="heapq for min/max heaps")return"heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap — negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection.";else if(Z==="Enumerate, zip, and unpacking")return"enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly — between them, almost no loop needs range(len(...)).";else if(Z==="Slicing and reversal")return"Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate — every slice is a new sequence.";else if(Z==="Sorting with a key")return"sort/sorted take a key function that maps each element to what it should be compared by — len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list.";else if(Z==="Building strings efficiently")return"Strings are immutable, so building one with += in a loop re-copies everything each time — O(n²). Collect the pieces in a list and ''.join(parts) once at the end for O(n).";else return""}class p extends P{constructor(Z,J){super();this.solutions=Z,this.check=J}}function qO(){return new p(j([["Solution 1",`import gleam/set

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
}`],["Solution 2 · Sorting",`import gleam/int
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
}`]]),new v("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
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
}`))}function GO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorting",`import gleam/list
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
}`]]),new v("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
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
}`))}function UO(){return new p(j([["Solution 1",`import gleam/dict

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
}`],["Solution 2 · Brute force",`import gleam/list

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
}`],["Solution 3 · Sorted two pointer",`import gleam/int
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
}`]]),new v("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
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
}`))}function zO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Count key",`import gleam/dict
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
}`]]),new v("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
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
}`))}function IO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Bucket sort",`import gleam/dict
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
}`]]),new v("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
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
}`))}function VO(){return new p(j([["Solution 1",`import gleam/list

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
}`],["Solution 2 · Brute force",`import gleam/list

/// The obvious O(n²) reading of the problem: for each slot, multiply everything
/// that is not in it. Worth knowing as the thing the prefix/suffix trick beats.
pub fn product_except_self(nums: List(Int)) -> List(Int) {
  list.index_map(nums, fn(_, i) {
    list.index_fold(nums, 1, fn(product, n, j) {
      case i == j {
        True -> product
        False -> product * n
      }
    })
  })
}`]]),new v("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
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
}`))}function jO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Sorting",`import gleam/int
import gleam/list

/// No set: sort, then walk once counting runs. O(n log n) rather than O(n), but
/// it needs no extra structure and the run logic is easier to hold in your head.
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
}`]]),new v("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
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
}`))}function HO(){return new p(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Two pointers",`import gleam/list
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
}`]]),new v("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
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
}`))}function OO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Binary search",`import gleam/int
import gleam/list
import gleam/order

/// Instead of converging two pointers, fix each number and binary search the
/// tail for its complement — O(n log n), and it reuses the binary search you
/// already know rather than a second pointer discipline.
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
}`]]),new v(`pub fn two_sum_sorted(
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
}`))}function FO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

/// Every triple, checked. Sorting first means each triple comes out in
/// ascending order, so \`list.unique\` is enough to collapse the duplicates that
/// repeated values produce — no set needed.
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
}`]]),new v("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
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
}`))}function NO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

/// Every pair of lines, measured. O(n²), but it makes the thing the two-pointer
/// sweep is actually maximising explicit: shorter line times distance.
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
}`]]),new v("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
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
}`))}function RO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [buy, ..later] -> int.max(best_sale(buy, later), max_profit(later))
  }
}

fn best_sale(buy: Int, later: List(Int)) -> Int {
  list.fold(later, 0, fn(best, sell) { int.max(best, sell - buy) })
}`]]),new v("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
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
}`))}function DO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Shrinking window",`import gleam/int
import gleam/list
import gleam/string

/// The window itself is the bookkeeping: when a character repeats, drop
/// everything up to and including its earlier copy. No last-seen dictionary,
/// at the cost of scanning the window on each repeat.
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
}`]]),new v("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
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
}`))}function MO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Per character",`import gleam/int
import gleam/list
import gleam/string

/// One sweep per distinct character, asking a much simpler question each time:
/// how long a window can I hold if *this* is the character I keep? The answer
/// is the best of those. No running frequency map, no max-count bookkeeping.
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
}`]]),new v("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
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
}`))}function AO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorted windows",`import gleam/list
import gleam/string

/// Every window of the right length, sorted and compared against the sorted
/// needle. Slower than sliding counts, but there is no incremental state to get
/// wrong — the whole method is "is this window an anagram?".
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
}`]]),new v("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
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
}`))}function BO(){return new p(j([["Solution 1",`import gleam/string

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
}`],["Solution 2 · Reduction",`import gleam/string

/// No stack: strip every matched pair, over and over, until nothing more can
/// go. Whatever survives is unmatched, so the string was balanced exactly when
/// nothing survives. This is why "([)]" fails — neither pair is ever adjacent.
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
}`]]),new v("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
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
}`))}function LO(){return new p(j([["Solution 1",`import gleam/int

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
}`],["Solution 2 · Two stacks",`import gleam/int

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
}`]]),new v(`pub type MinStack {
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
}`))}function PO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Brute force",`import gleam/list

/// For each day, scan forward until it gets warmer. O(n²), and the direct
/// reading of the question — the monotonic stack exists only to avoid rescanning
/// the same cold stretch once per day.
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
}`]]),new v("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
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
}`))}function TO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · First match scan",`import gleam/list

/// The O(n) baseline the binary search beats: scan with an index. Worth
/// contrasting with the halving version to see what the sortedness buys.
pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}`]]),new v("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function SO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Linear scan",`/// O(n) rather than O(log n), but it makes the shape of the problem obvious:
/// a rotated sorted array has exactly one place where a value drops, and that
/// drop is the minimum. No drop means it was never rotated, so the head wins.
pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`]]),new v("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`))}function EO(){return new p(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Find pivot",`import gleam/int
import gleam/list
import gleam/order

/// Two plain steps instead of one clever one: find where the rotation wrapped,
/// which splits the input into two ordinary sorted arrays, then binary search
/// each. Nothing has to reason about which half is sorted mid-search.
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
}`]]),new v("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function CO(){return new p(j([["Solution 1",`pub fn length(items: List(a)) -> Int {
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
}`],["Solution 2 · Stdlib",`import gleam/list

/// The same two answers straight from the standard library. Writing the
/// recursion by hand is how you learn the shape; reaching for these is what you
/// actually do afterwards.
pub fn length(items: List(a)) -> Int {
  list.length(items)
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  list.last(items)
}`]]),new v(`pub fn length(items: List(a)) -> Int

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
}`))}function _O(){return new p(j([["Solution 1",`pub fn reverse(items: List(a)) -> List(a) {
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
}`],["Solution 2 · Fold",`import gleam/list

/// A fold *is* a tail-recursive loop with a name: the accumulator is the second
/// argument, the step function is the body. Once you see that, most hand-written
/// \`*_loop\` helpers turn into one line.
pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}`]]),new v(`pub fn reverse(items: List(a)) -> List(a)

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
}`))}function kO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Explicit recursion",`import gleam/int
import gleam/list

/// What each fold expands to. Useful to write once so the folded version stops
/// looking like magic — and to notice that \`count_if\` here is not tail
/// recursive, while the fold always is.
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
}`]]),new v(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

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
}`))}function xO(){return new p(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorted runs",`import gleam/dict
import gleam/list
import gleam/string

/// Group by sorting instead of by lookup: once the words are in order, equal
/// ones are adjacent, so counting is a single pass that never searches for
/// anything. The dictionary is built at the end, from finished pairs.
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
}`]]),new v("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
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
}`))}function wO(){return new p(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Nested case",`import gleam/int

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

/// What \`use <- result.try\` desugars to. Same behaviour, one level of nesting
/// per fallible step — which is exactly the staircase \`use\` exists to flatten.
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
}`]]),new v(`pub type Config {
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
}`))}function bO(){return new p(j([["Solution 1",`import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`],["Solution 2 · Case on result",`import gleam/dict

/// Skipping Option entirely: \`dict.get\` already returns a Result, so one \`case\`
/// covers both branches. Converting to Option earns its keep when the value is
/// passed on, not when it is consumed immediately like this.
pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}`]]),new v("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
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
}`))}function yO(){return new p(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Prefix functions",`import gleam/list
import gleam/string

/// The same work with functions rather than string patterns. Patterns bind the
/// remainder for free, which is why they win for prefixes; these read better
/// when the test and the surgery are separate ideas.
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
}`]]),new v(`pub fn strip_comment(line: String) -> String

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
}`))}function $O(){return new p(j([["Solution 1",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`],["Solution 2 · Nested calls",`import gleam/list
import gleam/string

/// The same steps without the pipe, and therefore inside out: to read the order
/// of operations you start at \`title\` in the middle and work outwards. Identical
/// output — the pipe only changes which end you read from.
pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}`]]),new v("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
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
}`))}function hO(){return new p(j([["Solution 1",`pub type Player {
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
}`],["Solution 2 · Explicit fields",`pub type Player {
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
}`]]),new v(`pub type Player {
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
}`))}function fO(){return new p(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · List contains",`import gleam/list

/// No set: keep what has been accepted and ask that list directly. O(n²)
/// instead of O(n), but it needs nothing of the element type — and for a
/// handful of items it is the shorter, plainer code.
pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}`]]),new v("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
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
}`))}function Y8(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q.solutions,(X)=>{return new t0(X[0],X[1])}),$Q,new a(Q.check),z1)}function gO(){return new y0("Gleam Tips",j([new F1("Idioms",j([Y8("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",CO()),Y8("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",_O()),Y8("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",kO()),Y8("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",xO()),Y8("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",wO()),Y8("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',bO()),Y8("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',yO()),Y8("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",$O()),Y8("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",hO()),Y8("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",fO())]))]))}function uO(){return j([["Solution 1",`defmodule Solution do
  def contains_duplicate?(nums) do
    # A MapSet collapses duplicates, so a shrunken size is the answer.
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end`],["Solution 2 · Sorting",`defmodule Solution do
  def contains_duplicate?(nums) do
    # Duplicates are adjacent once sorted, so a sliding pair over the sorted
    # list answers it without holding every value in a set.
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end`]])}function vO(){return j([["Solution 1",`defmodule Solution do
  def anagram?(s, t) do
    frequencies(s) == frequencies(t)
  end

  defp frequencies(word) do
    word |> String.graphemes() |> Enum.frequencies()
  end
end`],["Solution 2 · Sorting",`defmodule Solution do
  def anagram?(s, t) do
    # Two words are anagrams exactly when their sorted letters match.
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end`]])}function mO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def two_sum(nums, target) do
    indexed = Enum.with_index(nums)

    # A comprehension over every ordered pair, stopping at the first hit.
    Enum.find_value(indexed, fn {a, i} ->
      Enum.find_value(indexed, fn {b, j} ->
        if j > i and a + b == target, do: {i, j}
      end)
    end)
  end
end`]])}function pO(){return j([["Solution 1",`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.sort() end)
    |> Map.values()
  end
end`],["Solution 2 · Count key",`defmodule Solution do
  def group_anagrams(strs) do
    # A letter tally is anagram-invariant too, and costs O(len) to build rather
    # than O(len log len).
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.frequencies() end)
    |> Map.values()
  end
end`]])}function cO(){return j([["Solution 1",`defmodule Solution do
  def top_k_frequent(nums, k) do
    nums
    |> Enum.frequencies()
    |> Enum.sort_by(fn {_num, count} -> count end, :desc)
    |> Enum.take(k)
    |> Enum.map(fn {num, _count} -> num end)
  end
end`],["Solution 2 · Bucket sort",`defmodule Solution do
  def top_k_frequent(nums, k) do
    # A count can never exceed the input length, so grouping by count and
    # reading the groups downwards replaces the comparison sort entirely.
    buckets =
      nums
      |> Enum.frequencies()
      |> Enum.group_by(fn {_num, count} -> count end, fn {num, _count} -> num end)

    length(nums)..1//-1
    |> Enum.flat_map(fn count -> Map.get(buckets, count, []) end)
    |> Enum.take(k)
  end
end`]])}function dO(){return j([["Solution 1",`defmodule Solution do
  def product_except_self(nums) do
    # Everything before each slot, times everything after it — no division.
    prefixes = nums |> Enum.scan(1, &(&1 * &2)) |> then(&[1 | Enum.drop(&1, -1)])

    suffixes =
      nums
      |> Enum.reverse()
      |> Enum.scan(1, &(&1 * &2))
      |> then(&[1 | Enum.drop(&1, -1)])
      |> Enum.reverse()

    Enum.zip_with(prefixes, suffixes, &(&1 * &2))
  end
end`],["Solution 2 · Brute force",`defmodule Solution do
  def product_except_self(nums) do
    # The obvious O(n^2) reading: for each slot, multiply everything else.
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end`]])}function nO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Sorting",`defmodule Solution do
  def longest_consecutive(nums) do
    # No set: sort, then fold once over the gaps. O(n log n) rather than O(n),
    # but the run logic reads straight through.
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
end`]])}function lO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Two pointers",`defmodule Solution do
  def palindrome?(s) do
    # Compare inwards from both ends instead of building a reversed copy.
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
end`]])}function sO(){return j([["Solution 1",`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    # Positions are 1-based. Sorted input means too small can only be fixed by
    # raising the low end, too large by lowering the high end.
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
end`],["Solution 2 · Binary search",`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    # Fix each number and binary search the tail for its complement.
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
end`]])}function iO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def three_sum(nums) do
    # Every triple, checked. Sorting first means each triple comes out in
    # ascending order, so \`uniq\` is enough to collapse the repeats.
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
end`]])}function rO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def max_area(heights) do
    # Every pair of lines, measured — the definition the two-pointer sweep is
    # an optimisation of.
    indexed = Enum.with_index(heights)

    areas =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          j > i,
          do: min(a, b) * (j - i)

    Enum.max([0 | areas])
  end
end`]])}function aO(){return j([["Solution 1",`defmodule Solution do
  def max_profit(prices) do
    # Carry the cheapest day seen so far; today's best sale is against that.
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end`],["Solution 2 · Brute force",`defmodule Solution do
  def max_profit(prices) do
    # Every buy day against every later sell day. O(n^2), and the problem
    # statement written out.
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end`]])}function oO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Shrinking window",`defmodule Solution do
  def length_of_longest_substring(s) do
    # The window itself is the bookkeeping: on a repeat, drop everything up to
    # and including the earlier copy. No last-seen map at all.
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
end`]])}function tO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Per character",`defmodule Solution do
  @alphabet String.graphemes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def character_replacement(s, k) do
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep?
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
end`]])}function eO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Sorted windows",`defmodule Solution do
  def inclusion?(s1, s2) do
    # Every window of the right length, sorted and compared. Slower, but there
    # is no incremental state to get wrong.
    needle = s1 |> String.graphemes() |> Enum.sort()
    size = length(needle)
    graphemes = String.graphemes(s2)

    cond do
      size == 0 -> true
      size > length(graphemes) -> false
      true -> graphemes |> Enum.chunk_every(size, 1, :discard) |> Enum.any?(&(Enum.sort(&1) == needle))
    end
  end
end`]])}function ZF(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Reduction",`defmodule Solution do
  def valid?(s) do
    # No stack: strip every matched pair, over and over. Whatever survives is
    # unmatched — which is also why "([)]" fails, since neither pair is ever
    # adjacent.
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end`]])}function JF(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Two stacks",`defmodule Solution do
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
end`]])}function QF(){return j([["Solution 1",`defmodule Solution do
  def daily_temperatures(temps) do
    # A stack of days still waiting for something warmer; each day resolves
    # every colder day below it, so each day is pushed and popped once.
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def daily_temperatures(temps) do
    # For each day, scan forward until it gets warmer. O(n^2) — the monotonic
    # stack exists only to avoid rescanning the same cold stretch every day.
    temps
    |> Enum.with_index()
    |> Enum.map(fn {temp, i} ->
      case Enum.find_index(Enum.drop(temps, i + 1), &(&1 > temp)) do
        nil -> 0
        offset -> offset + 1
      end
    end)
  end
end`]])}function XF(){return j([["Solution 1",`defmodule Solution do
  def search(nums, target) do
    # Lists have no random access, so index into a tuple instead — otherwise
    # every "midpoint" would cost a walk and the log would be a lie.
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
end`],["Solution 2 · First match scan",`defmodule Solution do
  def search(nums, target) do
    # O(n), so it fails the stated requirement — but it is the baseline the
    # halving has to beat, and on a short list it wins on constants.
    Enum.find_index(nums, &(&1 == target))
  end
end`]])}function YF(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Linear scan",`defmodule Solution do
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
end`]])}function KF(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Find pivot",`defmodule Solution do
  def search_rotated(nums, target) do
    # Two plain steps instead of one clever one: find where the rotation
    # wrapped, which leaves two ordinary sorted runs, then binary search each.
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
end`]])}function t1(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q,(X)=>{return new t0(X[0],X[1])}),XO,z1,z1)}function WF(){return new y0("NeetCode 150 (Elixir)",j([new F1("Arrays & Hashing",j([t1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",uO()),t1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",vO()),t1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",mO()),t1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",pO()),t1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",cO()),t1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",dO()),t1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",nO())])),new F1("Two Pointers",j([t1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",lO()),t1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",sO()),t1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",iO()),t1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",rO())])),new F1("Sliding Window",j([t1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",aO()),t1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",oO()),t1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",tO()),t1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",eO())])),new F1("Stack",j([t1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",ZF()),t1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",JF()),t1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",QF())])),new F1("Binary Search",j([t1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",XF()),t1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",YF()),t1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",KF())]))]))}function e1(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q.solutions,(X)=>{return new t0(X[0],X[1])}),$Q,new a(Q.check),z1)}function qF(){return new y0("NeetCode 150 (Gleam)",j([new F1("Arrays & Hashing",j([e1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Solve it in Gleam.",qO()),e1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise. Solve it in Gleam.",GO()),e1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Solve it in Gleam.",UO()),e1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve it in Gleam.",zO()),e1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Note: Gleam's stdlib has no heap - counting then sorting by frequency is the idiomatic approach. Solve it in Gleam.",IO()),e1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time. Solve it in Gleam.",VO()),e1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time. Solve it in Gleam.",jO())])),new F1("Two Pointers",j([e1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Note: in Gleam, comparing the cleaned graphemes with their reverse is the idiomatic answer. Solve it in Gleam.",HO()),e1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",OO()),e1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",FO()),e1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",NO())])),new F1("Sliding Window",j([e1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell. Solve it in Gleam.",RO()),e1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters. Solve it in Gleam.",DO()),e1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get. Solve it in Gleam.",MO()),e1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2. Solve it in Gleam.",AO())])),new F1("Stack",j([e1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Solve it in Gleam.",BO()),e1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Note: model the stack as a list of #(value, min_so_far) tuples returned from each operation. Solve it in Gleam.",LO()),e1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. Solve it in Gleam.",PO())])),new F1("Binary Search",j([e1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",TO()),e1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",SO()),e1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",EO())]))]))}function GF(){return new p(j([["Solution 1",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`],["Solution 2 · Sorting",`def containsDuplicate(nums):
    # Duplicates are adjacent once sorted, so one pass over the sorted copy
    # answers it — O(n log n) time but no extra structure to hold every value.
    ordered = sorted(nums)
    for i in range(1, len(ordered)):
        if ordered[i] == ordered[i - 1]:
            return True
    return False`]]),new v("def containsDuplicate(nums):",`def containsDuplicate(nums):
    pass`,`try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))`))}function UF(){return new p(j([["Solution 1",`def isAnagram(s, t):
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

    return True`],["Solution 2 · Sorting",`def isAnagram(s, t):
    # Two words are anagrams exactly when their sorted letters match. One line,
    # O(n log n), and nothing to get wrong in the counting.
    return sorted(s) == sorted(t)`]]),new v("def isAnagram(s, t):",`def isAnagram(s, t):
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
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))`))}function zF(){return new p(j([["Solution 1",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`],["Solution 2 · Brute force",`def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`],["Solution 3 · Sorted two pointer",`def twoSum(nums, target):
    # Sorting loses the original positions, so carry them along, then walk one
    # pointer in from each end: too small lifts the low end, too large drops
    # the high end.
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

    return []`]]),new v("def twoSum(nums, target):",`def twoSum(nums, target):
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
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))`))}function IF(){return new p(j([["Solution 1",`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`],["Solution 2 · Sorted key",`from collections import defaultdict

def groupAnagrams(strs):
    # The sorted word itself is an anagram-invariant key. Shorter than tallying
    # letters, and it works for any alphabet rather than just a-z.
    groups = defaultdict(list)
    for s in strs:
        groups["".join(sorted(s))].append(s)
    return list(groups.values())`]]),new v("def groupAnagrams(strs):",`def groupAnagrams(strs):
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
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))`))}function VF(){return new p(j([["Solution 1",`from collections import Counter

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
    return result`],["Solution 2 · Heapq",`import heapq
from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)`],["Solution 3 · Sorting",`def topKFrequent(nums, k):
    # Straight sort by frequency: O(n log n) rather than the bucket version's
    # O(n), but it is the version you can write without thinking.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]`]]),new v("def topKFrequent(nums, k):",`def topKFrequent(nums, k):
    pass`,`try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))`))}function jF(){return new p(j([["Solution 1",`def productExceptSelf(nums):
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

    return result`],["Solution 2 · Brute force",`def productExceptSelf(nums):
    # The obvious O(n^2) reading of the problem: for each slot, multiply
    # everything that is not in it. Worth knowing as the thing prefix/suffix
    # beats.
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result`]]),new v("def productExceptSelf(nums):",`def productExceptSelf(nums):
    pass`,`try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))`))}function HF(){return new p(j([["Solution 1",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`],["Solution 2 · Sorting",`def longestConsecutive(nums):
    # No set: sort, then walk once counting runs. O(n log n) rather than O(n),
    # but it needs no extra structure and the run logic reads straight through.
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

    return longest`]]),new v("def longestConsecutive(nums):",`def longestConsecutive(nums):
    pass`,`try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))`))}function OF(){return new p(j([["Solution 1",`def isPalindrome(s):
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

    return True`],["Solution 2 · Cleaned reverse",`def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`]]),new v("def isPalindrome(s):",`def isPalindrome(s):
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
__case__("isPalindrome('0P')", False, isPalindrome("0P"))`))}function FF(){return new p(j([["Solution 1",`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`],["Solution 2 · Binary search",`def twoSum(numbers, target):
    # Instead of converging two pointers, fix each number and binary search the
    # tail for its complement. O(n log n), and it reuses a search you already
    # know rather than a second pointer discipline.
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
    return []`]]),new v("def twoSum(numbers, target):",`def twoSum(numbers, target):
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
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))`))}function NF(){return new p(j([["Solution 1",`def threeSum(nums):
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

    return result`],["Solution 2 · Brute force",`def threeSum(nums):
    # Every triple, checked. Sorting first means each triple comes out in
    # ascending order, so duplicates are literal list equality.
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            for k in range(j + 1, len(ordered)):
                triple = [ordered[i], ordered[j], ordered[k]]
                if sum(triple) == 0 and triple not in result:
                    result.append(triple)

    return result`]]),new v("def threeSum(nums):",`def threeSum(nums):
    pass`,`try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))`))}function RF(){return new p(j([["Solution 1",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`],["Solution 2 · Brute force",`def maxArea(height):
    # Every pair of lines, measured. O(n^2), but it makes what the two-pointer
    # sweep is maximising explicit: shorter line times distance.
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best`]]),new v("def maxArea(height):",`def maxArea(height):
    pass`,`try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))`))}function DF(){return new p(j([["Solution 1",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`],["Solution 2 · Brute force",`def maxProfit(prices):
    profit = 0
    for buy in range(len(prices)):
        for sell in range(buy + 1, len(prices)):
            profit = max(profit, prices[sell] - prices[buy])
    return profit`]]),new v("def maxProfit(prices):",`def maxProfit(prices):
    pass`,`try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))`))}function MF(){return new p(j([["Solution 1",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`],["Solution 2 · Index scan",`def lengthOfLongestSubstring(s):
    # No set, no dict: ask the string itself whether this character already
    # appeared inside the current window, and if so start just past it.
    longest = 0
    start = 0

    for right, char in enumerate(s):
        found = s.find(char, start, right)
        if found != -1:
            start = found + 1
        longest = max(longest, right - start + 1)

    return longest`]]),new v("def lengthOfLongestSubstring(s):",`def lengthOfLongestSubstring(s):
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
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))`))}function AF(){return new p(j([["Solution 1",`def characterReplacement(s, k):
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

    return longest`],["Solution 2 · Per character",`ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep? No running frequency
    # map and no max-count bookkeeping — 26 easy passes instead of one subtle
    # one.
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

    return longest`]]),new v("def characterReplacement(s, k):",`def characterReplacement(s, k):
    pass`,`try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))`))}function BF(){return new p(j([["Solution 1",`from collections import Counter

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

    return False`],["Solution 2 · Sorted windows",`def checkInclusion(s1, s2):
    # Every window of the right length, sorted and compared. Slower than
    # sliding counts, but there is no incremental state to get wrong: the whole
    # method is "is this window an anagram?".
    if len(s1) > len(s2):
        return False

    needle = sorted(s1)
    size = len(s1)

    for start in range(len(s2) - size + 1):
        if sorted(s2[start:start + size]) == needle:
            return True

    return False`]]),new v("def checkInclusion(s1, s2):",`def checkInclusion(s1, s2):
    pass`,`try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))`))}function LF(){return new p(j([["Solution 1",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`],["Solution 2 · Reduction",`def isValid(s):
    # No stack: strip every matched pair, over and over, until nothing more can
    # go. Whatever survives is unmatched. This is also why "([)]" fails —
    # neither pair is ever adjacent.
    previous = None
    while previous != s:
        previous = s
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return s == ""`]]),new v("def isValid(s):",`def isValid(s):
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
__case__("isValid('(')", False, isValid("("))`))}function PF(){return new p(j([["Solution 1",`class MinStack:
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
        return self.mins[-1]`],["Solution 2 · Pair stack",`class MinStack:
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
        return self.entries[-1][1]`]]),new v(`class MinStack:
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
__case__("getMin() after pop()", -2, __stack__.getMin())`))}function TF(){return new p(j([["Solution 1",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`],["Solution 2 · Brute force",`def dailyTemperatures(temperatures):
    # For each day, scan forward until it gets warmer. O(n^2), and the direct
    # reading of the question — the monotonic stack exists only to avoid
    # rescanning the same cold stretch once per day.
    result = []
    for i, temp in enumerate(temperatures):
        days = 0
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temp:
                days = j - i
                break
        result.append(days)
    return result`]]),new v("def dailyTemperatures(temperatures):",`def dailyTemperatures(temperatures):
    pass`,`try:
    (dailyTemperatures)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
__case__("dailyTemperatures([30, 40, 50, 60])", [1, 1, 1, 0], dailyTemperatures([30, 40, 50, 60]))
__case__("dailyTemperatures([30, 30, 30])", [0, 0, 0], dailyTemperatures([30, 30, 30]))`))}function SF(){return new p(j([["Solution 1",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`],["Solution 2 · Recursive",`def search(nums, target):
    # The same halving, written as recursion. The bounds are arguments rather
    # than mutated locals, which makes each step's invariant easier to see.
    return halve(nums, target, 0, len(nums) - 1)

def halve(nums, target, lo, hi):
    if lo > hi:
        return -1

    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return halve(nums, target, mid + 1, hi)
    return halve(nums, target, lo, mid - 1)`]]),new v("def search(nums, target):",`def search(nums, target):
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
__case__("search([], 1)", -1, search([], 1))`))}function EF(){return new p(j([["Solution 1",`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`],["Solution 2 · Linear scan",`def findMin(nums):
    # O(n) rather than O(log n), but it makes the shape of the problem obvious:
    # a rotated sorted array drops in value exactly once, and that drop is the
    # minimum. No drop means it was never rotated, so the head wins.
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return nums[i]
    return nums[0]`]]),new v("def findMin(nums):",`def findMin(nums):
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
__case__("findMin([2, 1])", 1, findMin([2, 1]))`))}function CF(){return new p(j([["Solution 1",`def search(nums, target):
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

    return -1`],["Solution 2 · Find pivot",`def search(nums, target):
    # Two plain steps instead of one clever one: find where the rotation
    # wrapped, which splits the input into two ordinary sorted arrays, then
    # binary search each. Nothing has to reason mid-search about which half is
    # sorted.
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
    return -1`]]),new v("def search(nums, target):",`def search(nums, target):
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
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))`))}function _F(){return new p(j([["Solution 1",`from collections import Counter

def topTwo(nums):
    return Counter(nums).most_common(2)

def countOf(nums, value):
    return Counter(nums)[value]`],["Solution 2 · Plain dict",`def topTwo(nums):
    # What Counter does underneath: a dict of counts, then a sort. Worth writing
    # once so most_common stops being a black box.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return ordered[:2]

def countOf(nums, value):
    return sum(1 for num in nums if num == value)`]]),new v(`def topTwo(nums):

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
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))`))}function kF(){return new p(j([["Solution 1",`from collections import defaultdict

def groupByLength(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)`],["Solution 2 · Setdefault",`def groupByLength(words):
    # setdefault does the same job as defaultdict without changing the type of
    # the dictionary — handy when the result is returned or serialised, since
    # there is no default factory left attached to it.
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups`]]),new v("def groupByLength(words):",`def groupByLength(words):
    pass`,`try:
    (groupByLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("groupByLength(['a', 'bc', 'de', 'f'])", {1: ["a", "f"], 2: ["bc", "de"]}, groupByLength(["a", "bc", "de", "f"]))
__case__("groupByLength([])", {}, groupByLength([]))`))}function xF(){return new p(j([["Solution 1",`from collections import deque

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
    return order`],["Solution 2 · List queue",`def bfsOrder(graph, start):
    # A list plus a read cursor. The cursor is the point: list.pop(0) is O(n),
    # so a plain list only stays a good queue if you never shift it.
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

    return order`]]),new v("def bfsOrder(graph, start):",`def bfsOrder(graph, start):
    pass`,`try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))`))}function wF(){return new p(j([["Solution 1",`import heapq

def kSmallest(nums, k):
    heap = list(nums)
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(min(k, len(heap)))]

def kLargest(nums, k):
    heap = [-n for n in nums]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(min(k, len(heap)))]`],["Solution 2 · Sorting",`def kSmallest(nums, k):
    # Sorting is O(n log n) against the heap's O(n + k log n). For small k the
    # heap wins; for k near n they are the same, and this is far shorter.
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]`]]),new v(`def kSmallest(nums, k):

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
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))`))}function bF(){return new p(j([["Solution 1",`def firstIndexOf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1

def dotProduct(a, b):
    return sum(x * y for x, y in zip(a, b))`],["Solution 2 · Index loop",`def firstIndexOf(nums, target):
    # Indexing by hand. It works, and it is exactly what enumerate and zip save
    # you from: the off-by-one risk and the second subscript in dotProduct.
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

def dotProduct(a, b):
    total = 0
    for i in range(min(len(a), len(b))):
        total += a[i] * b[i]
    return total`]]),new v(`def firstIndexOf(nums, target):

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
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))`))}function yF(){return new p(j([["Solution 1",`def reversedString(s):
    return s[::-1]

def everySecond(s):
    return s[::2]

def lastN(s, n):
    return s[-n:] if n > 0 else ""

def trimEnds(s):
    return s[1:-1]`],["Solution 2 · Explicit loops",`def reversedString(s):
    # Every slice spelled out as a loop. The slices are better in real code;
    # writing them this way once makes the step and the negative bounds obvious.
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
    return "".join(s[i] for i in range(1, len(s) - 1))`]]),new v(`def reversedString(s):

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
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))`))}function $F(){return new p(j([["Solution 1",`def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))`],["Solution 2 · Decorate sort undecorate",`def sortByLength(words):
    # Decorate, sort, undecorate: attach the sort key to each item, sort the
    # pairs, then strip it. \`key=\` is this pattern built into sorted().
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]`]]),new v(`def sortByLength(words):

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
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))`))}function hF(){return new p(j([["Solution 1",`def joinUpper(chars):
    parts = []
    for c in chars:
        parts.append(c.upper())
    return "".join(parts)`],["Solution 2 · Concatenation",`def joinUpper(chars):
    # The version join exists to replace. Each \`+=\` builds a whole new string,
    # so this is quadratic in the output length — fine for two characters,
    # painful for a megabyte.
    out = ""
    for c in chars:
        out += c.upper()
    return out`]]),new v("def joinUpper(chars):",`def joinUpper(chars):
    pass`,`try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))`))}function Z0(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q.solutions,(X)=>{return new t0(X[0],X[1])}),bQ,new a(Q.check),z1)}function gF(){return new y0("NeetCode 150",j([new F1("Arrays & Hashing",j([Z0("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",GF()),Z0("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",UF()),Z0("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",zF()),Z0("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",IF()),Z0("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",VF()),Z0("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",jF()),Z0("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",HF())])),new F1("Two Pointers",j([Z0("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",OF()),Z0("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",FF()),Z0("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",NF()),Z0("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",RF())])),new F1("Sliding Window",j([Z0("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",DF()),Z0("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",MF()),Z0("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",AF()),Z0("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",BF())])),new F1("Stack",j([Z0("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",LF()),Z0("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",PF()),Z0("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",TF())])),new F1("Binary Search",j([Z0("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",SF()),Z0("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",EF()),Z0("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",CF())]))]))}function uF(){return new p(j([["Solution 1",`export function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`],["Solution 2 · Sorting",`export function containsDuplicate(nums: number[]): boolean {
  // Duplicates are adjacent once sorted, so one pass over the sorted copy
  // answers it — O(n log n), but nothing has to hold every value at once.
  const ordered = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] === ordered[i - 1]) return true;
  }
  return false;
}`]]),new v("export function containsDuplicate(nums: number[]): boolean",`export function containsDuplicate(nums: number[]): boolean {
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
}`))}function vF(){return new p(j([["Solution 1",`export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();
  for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

  for (const char of t) {
    const remaining = counts.get(char);
    if (remaining === undefined || remaining === 0) return false;
    counts.set(char, remaining - 1);
  }

  return true;
}`],["Solution 2 · Sorting",`export function isAnagram(s: string, t: string): boolean {
  // Two words are anagrams exactly when their sorted letters match. O(n log n),
  // and there is no counting to get wrong.
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}`]]),new v("export function isAnagram(s: string, t: string): boolean",`export function isAnagram(s: string, t: string): boolean {
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
}`))}function mF(){return new p(j([["Solution 1",`export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`],["Solution 2 · Sorted two pointer",`export function twoSum(nums: number[], target: number): number[] {
  // Sorting loses the original positions, so carry them along, then walk one
  // pointer in from each end.
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
}`]]),new v("export function twoSum(nums: number[], target: number): number[]",`export function twoSum(nums: number[], target: number): number[] {
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
}`))}function pF(){return new p(j([["Solution 1",`export function groupAnagrams(strs: string[]): string[][] {
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
}`],["Solution 2 · Sorted key",`export function groupAnagrams(strs: string[]): string[][] {
  // The sorted word itself is an anagram-invariant key: shorter than tallying
  // letters, and it works for any alphabet rather than just a-z.
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
}`]]),new v("export function groupAnagrams(strs: string[]): string[][]",`export function groupAnagrams(strs: string[]): string[][] {
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
}`))}function cF(){return new p(j([["Solution 1",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`],["Solution 2 · Sorting",`export function topKFrequent(nums: number[], k: number): number[] {
  // Straight sort by frequency: O(n log n) rather than the bucket version's
  // O(n), but it is the version you can write without thinking.
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`]]),new v("export function topKFrequent(nums: number[], k: number): number[]",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`))}function dF(){return new p(j([["Solution 1",`export function productExceptSelf(nums: number[]): number[] {
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
}`],["Solution 2 · Brute force",`export function productExceptSelf(nums: number[]): number[] {
  // The obvious O(n^2) reading: for each slot, multiply everything that is not
  // in it. Worth knowing as the thing prefix/suffix beats.
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}`]]),new v("export function productExceptSelf(nums: number[]): number[]",`export function productExceptSelf(nums: number[]): number[] {
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
}`))}function nF(){return new p(j([["Solution 1",`export function longestConsecutive(nums: number[]): number {
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
}`],["Solution 2 · Sorting",`export function longestConsecutive(nums: number[]): number {
  // No set: sort, then walk once counting runs. O(n log n) rather than O(n),
  // but it needs no extra structure and the run logic reads straight through.
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
}`]]),new v("export function longestConsecutive(nums: number[]): number",`export function longestConsecutive(nums: number[]): number {
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
}`))}function lF(){return new p(j([["Solution 1",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`],["Solution 2 · Cleaned reverse",`export function isPalindrome(s: string): boolean {
  // Strip, then compare against the reverse. Allocates a second string instead
  // of converging two pointers, but it is one line of intent.
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}`]]),new v("export function isPalindrome(s: string): boolean",`export function isPalindrome(s: string): boolean {
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
}`))}function sF(){return new p(j([["Solution 1",`export function twoSum(numbers: number[], target: number): number[] {
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
}`],["Solution 2 · Binary search",`export function twoSum(numbers: number[], target: number): number[] {
  // Fix each number and binary search the tail for its complement, rather than
  // converging two pointers. O(n log n), reusing a search you already know.
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
}`]]),new v("export function twoSum(numbers: number[], target: number): number[]",`export function twoSum(numbers: number[], target: number): number[] {
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
}`))}function iF(){return new p(j([["Solution 1",`export function threeSum(nums: number[]): number[][] {
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
}`],["Solution 2 · Brute force",`export function threeSum(nums: number[]): number[][] {
  // Every triple, checked. Sorting first means each triple comes out in
  // ascending order, so duplicates are plain string equality on the triple.
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
}`]]),new v("export function threeSum(nums: number[]): number[][]",`export function threeSum(nums: number[]): number[][] {
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
}`))}function rF(){return new p(j([["Solution 1",`export function maxArea(height: number[]): number {
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
}`],["Solution 2 · Brute force",`export function maxArea(height: number[]): number {
  // Every pair of lines, measured. O(n^2), but it makes what the two-pointer
  // sweep is maximising explicit: shorter line times distance.
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}`]]),new v("export function maxArea(height: number[]): number",`export function maxArea(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}`))}function aF(){return new p(j([["Solution 1",`export function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let profit = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    profit = Math.max(profit, price - lowest);
  }
  return profit;
}`],["Solution 2 · Brute force",`export function maxProfit(prices: number[]): number {
  // Every buy day against every later sell day. O(n^2), and the definition of
  // the problem written out — the single pass is the optimisation.
  let profit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      profit = Math.max(profit, prices[sell] - prices[buy]);
    }
  }
  return profit;
}`]]),new v("export function maxProfit(prices: number[]): number",`export function maxProfit(prices: number[]): number {
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
}`))}function oF(){return new p(j([["Solution 1",`export function lengthOfLongestSubstring(s: string): number {
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
}`],["Solution 2 · Index scan",`export function lengthOfLongestSubstring(s: string): number {
  // No set: ask the string itself whether this character already appeared
  // inside the current window, and if so restart just past it.
  let longest = 0;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const found = s.slice(start, right).indexOf(s[right]);
    if (found !== -1) start = start + found + 1;
    longest = Math.max(longest, right - start + 1);
  }

  return longest;
}`]]),new v("export function lengthOfLongestSubstring(s: string): number",`export function lengthOfLongestSubstring(s: string): number {
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
}`))}function tF(){return new p(j([["Solution 1",`export function characterReplacement(s: string, k: number): number {
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
}`],["Solution 2 · Per character",`const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function characterReplacement(s: string, k: number): number {
  // One sweep per letter, asking a much simpler question each time: how long a
  // window can I hold if *this* is the letter I keep? No running frequency map
  // and no max-count bookkeeping — 26 easy passes instead of one subtle one.
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
}`]]),new v("export function characterReplacement(s: string, k: number): number",`export function characterReplacement(s: string, k: number): number {
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
}`))}function eF(){return new p(j([["Solution 1",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`],["Solution 2 · Sorted windows",`export function checkInclusion(s1: string, s2: string): boolean {
  // Every window of the right length, sorted and compared. Slower than sliding
  // counts, but there is no incremental state to get wrong: the whole method is
  // "is this window an anagram?".
  if (s1.length > s2.length) return false;

  const needle = [...s1].sort().join("");
  for (let start = 0; start + s1.length <= s2.length; start++) {
    if ([...s2.slice(start, start + s1.length)].sort().join("") === needle) {
      return true;
    }
  }

  return false;
}`]]),new v("export function checkInclusion(s1: string, s2: string): boolean",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`))}function ZN(){return new p(j([["Solution 1",`export function isValid(s: string): boolean {
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
}`],["Solution 2 · Reduction",`export function isValid(s: string): boolean {
  // No stack: strip every matched pair, over and over, until nothing more can
  // go. Whatever survives is unmatched. It is also why "([)]" fails — neither
  // pair is ever adjacent.
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}`]]),new v("export function isValid(s: string): boolean",`export function isValid(s: string): boolean {
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
}`))}function JN(){return new p(j([["Solution 1",`export class MinStack {
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
}`],["Solution 2 · Pair stack",`export class MinStack {
  // Each entry carries the minimum of everything at or below it, so getMin is
  // a peek. One array instead of two, at the cost of a second number per value.
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
}`]]),new v(`export class MinStack
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
}`))}function QN(){return new p(j([["Solution 1",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`],["Solution 2 · Brute force",`export function dailyTemperatures(temperatures: number[]): number[] {
  // For each day, scan forward until it gets warmer. O(n^2), and the direct
  // reading of the question — the monotonic stack exists only to avoid
  // rescanning the same cold stretch once per day.
  return temperatures.map((temp, i) => {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temp) return j - i;
    }
    return 0;
  });
}`]]),new v("export function dailyTemperatures(temperatures: number[]): number[]",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`))}function XN(){return new p(j([["Solution 1",`export function search(nums: number[], target: number): number {
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
}`],["Solution 2 · Recursive",`export function search(nums: number[], target: number): number {
  // The same halving, written as recursion: the bounds are arguments rather
  // than mutated locals, which makes each step's invariant easier to see.
  return halve(nums, target, 0, nums.length - 1);
}

function halve(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return halve(nums, target, mid + 1, hi);
  return halve(nums, target, lo, mid - 1);
}`]]),new v("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function YN(){return new p(j([["Solution 1",`export function findMin(nums: number[]): number {
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
}`],["Solution 2 · Linear scan",`export function findMin(nums: number[]): number {
  // O(n) rather than O(log n), but it makes the shape of the problem obvious:
  // a rotated sorted array drops in value exactly once, and that drop is the
  // minimum. No drop means it was never rotated, so the head wins.
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return nums[i];
  }
  return nums[0];
}`]]),new v("export function findMin(nums: number[]): number",`export function findMin(nums: number[]): number {
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
}`))}function KN(){return new p(j([["Solution 1",`export function search(nums: number[], target: number): number {
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
}`],["Solution 2 · Find pivot",`export function search(nums: number[], target: number): number {
  // Two plain steps instead of one clever one: find where the rotation wrapped,
  // which splits the input into two ordinary sorted arrays, then binary search
  // each. Nothing has to reason mid-search about which half is sorted.
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
}`]]),new v("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function J0(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q.solutions,(X)=>{return new t0(X[0],X[1])}),QO,new a(Q.check),z1)}function WN(){return new y0("NeetCode 150 (TypeScript)",j([new F1("Arrays & Hashing",j([J0("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",uF()),J0("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",vF()),J0("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",mF()),J0("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",pF()),J0("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",cF()),J0("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",dF()),J0("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",nF())])),new F1("Two Pointers",j([J0("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",lF()),J0("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",sF()),J0("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",iF()),J0("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",rF())])),new F1("Sliding Window",j([J0("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",aF()),J0("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",oF()),J0("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",tF()),J0("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",eF())])),new F1("Stack",j([J0("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",ZN()),J0("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",JN()),J0("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",QN())])),new F1("Binary Search",j([J0("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",XN()),J0("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",YN()),J0("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",KN())]))]))}function F9(Z,J,Q){return new b0(Z,J,j6(Z),I1(Q.solutions,(X)=>{return new t0(X[0],X[1])}),bQ,new a(Q.check),z1)}function qN(){return new y0("Python Tips",j([new F1("Idioms",j([F9("Counter for frequency maps","Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",_F()),F9("defaultdict for grouping","Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",kF()),F9("deque for O(1) popleft","Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",xF()),F9("heapq for min/max heaps","Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",wF()),F9("Enumerate, zip, and unpacking","Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",bF()),F9("Slicing and reversal","Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",yF()),F9("Sorting with a key","Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",$F()),F9("Building strings efficiently","Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",hF())]))]))}var V4="System Design";function HP(){return $}function OP(){return $}function FP(){return $}function NP(){return $}function RP(){return $}function Y0(Z,J,Q,X,Y,K){return new b0(Z,J,"",$,KO,z1,new a(new v3(Q,X,Y,K)))}function DP(){return j([Y0("Partitioning, sharding and replication","You have used all three words in one sentence and the interviewer asks you to be precise. Which statement is right?",j(["Replication and sharding both divide a data set into subsets; partitioning is the term for copying those subsets to other nodes","Replication makes copies of data on different nodes; partitioning and sharding both divide a data set into subsets, but sharding implies those subsets are distributed across multiple nodes and partitioning does not","Sharding makes copies of data across nodes; partitioning divides a data set into subsets on one node; replication is the general term for both","Partitioning is a physical layout on disk; sharding is the logical division above it; replication is orthogonal to both"]),1,"Replication makes copies of data - replicas - stored on different nodes. Partitioning and sharding both divide a data set into subsets; sharding implies the subsets are distributed across multiple nodes, partitioning does not.","p111"),Y0("Where three-megabyte objects belong","Your service stores user-uploaded objects averaging 3 MB, read far more often than written, streamed to clients on request. Database or filesystem, and on what grounds?",j(["Database, as a BLOB column, so the object stays transactionally consistent with its metadata row","Either - below about 10 MB the choice makes no measurable difference to read latency","Database, sharded by object ID, so reads spread evenly across the cluster","Filesystem - objects larger than 1 MB belong there; database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow"]),3,"The 2006 Microsoft rule of thumb: objects smaller than 256 KB are best stored in a database; objects larger than 1 MB are best on the filesystem. Between 256 KB and 1 MB, the read:write ratio and the rate of overwrite decide. Also: database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow.","p111"),Y0("Read replicas for a write-heavy load","Your single-leader database is saturating on writes. A teammate proposes adding four read replicas. Does that solve the problem?",j(["No - single-leader replication scales reads, not writes, and the entire database must still fit on the single leader host","Yes - once provisioned, replicas can accept writes and forward them to the leader asynchronously","Yes, provided the replicas are synchronous, which lets the leader acknowledge writes without waiting for disk","Yes - adding a second tier of replicas below the first spreads write load across both tiers"]),0,"Single-leader replication scales reads, not writes. Its limits: the entire database must fit on a single host, and followers are eventually consistent because write replication takes time.","p112-115"),Y0("Sizing a quorum","You have 7 nodes and want quorum reads and writes that guarantee consistency. Which pair of quorum sizes does the rule give you?",j(["Read 3, write 3","Read 2, write 5","Read 4, write 4","Read 3, write 4"]),2,"A quorum is the minimum number of nodes that must agree for consensus. With n nodes, read and write quorums of n/2 + 1 guarantee consistency - here 7/2 + 1 = 4 for both. Every other pair listed sums to 7 or fewer, so a read quorum and a write quorum can miss each other entirely.","p117"),Y0("Last write wins by timestamp","Two leaders in different data centers accept conflicting updates to the same row. A teammate proposes resolving it with last-write-wins on a timestamp column. Why does that not work?",j(["It works, but only when both leaders sit in the same data center and share a clock signal","Clocks on different nodes cannot be perfectly synchronized - even periodically synced servers differ by milliseconds or more, so writes made inside that window cannot be ordered","Timestamps require a coordination service to issue them, which reintroduces the single leader you were trying to avoid","Timestamps are not monotonic while NTP is slewing, but the drift is bounded, so the scheme is safe at one-second granularity"]),1,"Clocks on different nodes cannot be perfectly synchronized, and sharing one clock fails because each node receives its signal at a different time - clock skew. Even periodically synced servers differ by milliseconds or more, so queries made within that window cannot be ordered.","p116"),Y0("Tuning quorums for a read-heavy load","A 5-node cluster serves ten reads for every write, and you need consistency rather than eventual consistency. How do you set the quorums, and what does it cost?",j(["Low write quorum, high read quorum - fast reads, paid for with slower writes","Read and write quorums both set to 5, so every operation sees every node","Read and write quorums both set to 1, accepting eventual consistency for speed on both sides","Low read quorum, high write quorum - fast reads, paid for with slower writes"]),3,"If you want consistency you must choose: a low write quorum and high read quorum gives fast writes; the reverse - a low read quorum and high write quorum - gives fast reads. Otherwise only eventual consistency is possible, and UPDATE and DELETE cannot be consistent.","p117"),Y0("Seeing your own increment","A user taps like and must immediately see the count include their own tap. Other users continuing to see the old count for a few seconds is fine. Name the guarantee, and the general lesson.",j(["Read-after-write consistency - and the lesson is to look for ways to relax consistency, minimizing the amount of data that must be consistent for all users","Linearizability - and the lesson is that any user-visible counter must be linearizable or users will report it as a bug","Monotonic reads - and the lesson is that a client must be pinned to one replica for the duration of a session","Strong eventual consistency - and the lesson is that conflict-free replicated data types remove the need to choose"]),0,"Read-after-write consistency: a user who increments a counter and then reads it sees their own increment, while other users may still be served the pre-increment value. The general lesson: look for ways to relax consistency, and minimize the amount of data that must be consistent for all users.","p117"),Y0("The JOIN that got slower after sharding","After sharding two large tables, a JOIN between them became dramatically slower. What is happening, and what is the suggested remedy?",j(["Replication lag means followers hold different snapshots of each table; directing the JOIN at the leader restores speed","The query planner lost its statistics at shard time; a covering index on each shard restores the original plan","Each shard of one table must compare its rows against every row of the other across the network - unless the JOIN is on the shard key, so you may constrain JOINs to those columns","The shard key was hashed rather than ranged, so matching rows are scattered; switching to range sharding colocates them"]),2,"Sharding imposes two limits on an RDBMS. JOINs get far slower - each shard of one table must compare its rows against every row of the other across the network, unless the JOIN is on the shard key, so you may constrain JOINs to those columns. And aggregation splits between database and application.","p120"),Y0("The aggregate that survived sharding worst","Your reporting queries run sum, count, mean and median over a sharded table. Which one becomes disproportionately harder and slower, and why?",j(["Mean - it needs the full row set in one place before a divisor can be computed","Median - sum and mean are easy because each node returns partial results, but median and percentile are much harder and slower","Sum - each node's partial must be locked across shards to avoid double counting","Count - it requires a distinct pass over every shard before the totals can be added"]),1,"Aggregation splits between database and application: sum and mean are easy (each node returns partials), median and percentile are much harder and slower.","p120"),Y0("Replication lag across thirty followers","Your leader replicates to thirty followers and the tail of them is falling steadily behind. What is the explanation, and the remedy?",j(["A leader's throughput caps the number of followers it can serve, so multi-level replication adds tiers to scale reads further - at the cost of further-delayed consistency","Followers compete with clients for the leader's read capacity, so moving client reads onto the followers lets the leader catch up","The write quorum has been set too high, so each write waits on too many acknowledgements before the next can start","Eventual consistency means replication lag is unbounded by design, so the only remedy is to make reads tolerate any staleness"]),0,"A leader's throughput caps the number of followers, so multi-level replication adds tiers to scale reads further, at the cost of further-delayed consistency.","p112-115")])}function MP(){return j([Y0("Buying a bigger host","Your service is saturating its single host. Finance has approved a mainframe-class replacement with four times the cores and eight times the RAM, and a migration window is agreed. Setting the invoice aside, what is the strongest argument against making this your scaling strategy?",j(["You lose the ability to do gradual rollouts, because there is no second host to shift a fraction of traffic onto","It trades higher latency for lower cost, because one host cannot be placed close to every region of users","Past a point, monetary cost rises faster than the hardware's performance; current technology imposes hard limits on processing power, RAM and storage per host; and the swap may require downtime unless the service's state lives elsewhere","A single host cannot implement the bulkhead pattern, so one saturated endpoint will starve all the others"]),2,"Three disadvantages of vertical scaling. Past a point, monetary cost rises faster than the hardware's performance - a multi-processor mainframe costs more than the same number of commodity single-processor machines. Current technology imposes hard limits on processing power, RAM and storage per host. And it may require downtime, unless you provision a new host, which is only possible if the service's state lives elsewhere.","p88"),Y0("Choosing the load balancer layer","You need the load balancer to reject requests missing an authorization header with a 401, terminate TLS, and forward events by key range based on a field in the request body. Which balancer do you specify, and why?",j(["Level 7 - it works at the application layer, so it can route on packet contents, authenticate, and terminate TLS","Level 4 - it works at the transport layer, which is faster and sufficient for header inspection","Level 4 with TLS passthrough, delegating authentication to an API gateway behind it","Either - the layers differ only in throughput, not in what they can inspect"]),0,"A level 4 balancer works at the transport layer (TCP), makes routing decisions from address information in the first few packets of the stream, and can only forward. A level 7 balancer works at the application layer (HTTP), so it can route on packet contents, authenticate (returning 401 when a header is absent), and terminate TLS.","p89-90"),Y0("Reading an availability SLA","A contract permits roughly five minutes of unplanned downtime per year. Which availability target are you being asked to hit?",j(["99.99% - 52.6 minutes per year, 8.64 seconds per day","99.9% - 8.77 hours per year, 1.44 minutes per day","99.95% - 4.38 hours per year, 43 seconds per day","99.999% - 5.26 minutes per year, 864 milliseconds per day"]),3,"99.9% is 8.77 hours per year (1.44 minutes per day). 99.99% is 52.6 minutes per year (8.64 seconds per day). 99.999% is 5.26 minutes per year (864 milliseconds per day).","p91"),Y0("The circuit breaker that hid the limit","Your team wraps every downstream call in a circuit breaker. A load test that previously overwhelmed the payment service now passes cleanly, so you ship. Real customer traffic then causes an outage in that same service. What went wrong?",j(["The breaker's failure counter reset between test runs, so the threshold was never actually reached","The breaker makes the system harder to test - it opened under the test load and masked the downstream limit the test existed to find","The breaker's probe requests counted against the payment service's rate limit and exhausted it","Retries without jitter arrived in unison and caused a retry storm against the recovering service"]),1,"A circuit breaker counts failures in a recent interval and stops calling downstream past a threshold, later probing with a limited number of requests. Its hidden cost: the breaker makes the system harder to test - a load test that should have overwhelmed downstream now passes, and real customer load causes the outage.","p93-94"),Y0("What per-endpoint thread pools cost","You adopt the bulkhead pattern, giving each endpoint its own thread pool so an exhausted pool cannot starve the others. What have you given up in exchange?",j(["Requests can no longer be traced across services, because each pool logs under its own identifier","You can no longer terminate TLS at the load balancer, since pools are selected after decryption","Thread pools force synchronous I/O, so a long downstream call blocks a whole pool","Pools cannot support each other during a spike - an idle pool's capacity is unavailable to a saturated one"]),3,"Divide the system into isolated pools so a fault in one cannot affect the whole. Per-endpoint thread pools mean an exhausted pool does not starve other endpoints. Host pools per requestor stop a crash-inducing request from taking down every host, and stop one noisy requestor consuming all capacity. The tradeoff: pools cannot support each other during a spike.","p95-96"),Y0("Which consistency are you talking about",'You have said "consistency" four times and the interviewer stops you: which consistency do you mean? What is the distinction they are fishing for?',j(["ACID consistency means synchronous replication; CAP consistency means asynchronous replication with a bounded lag","CAP consistency is read-after-write for the writing client; ACID consistency is the durability guarantee that survives a crash","ACID consistency is about data relationships - foreign keys, uniqueness, the invariants a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time and begin serving a change at the same time","ACID consistency applies within a single node; CAP consistency applies across the cluster, but both mean reads never return stale data"]),2,"ACID consistency is about data relationships - foreign keys, uniqueness, and the invariants that a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time, and when data changes all nodes start serving the change at the same time. Emphasize the distinction out loud in the interview.","p98"),Y0("Accepting writes during a partition","A hard requirement: the store must keep accepting writes during a network partition between data centers. Stale reads for a few seconds are acceptable. Which of these do you pick, and what rules the others out?",j(["Redis - being in-memory, it is unaffected by partitions between data centers","Cassandra - an ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did","MongoDB - it favors availability, and its replica sets elect a new primary on either side of the partition","HBase - its write-ahead log lets it accept writes and reconcile them once the partition heals"]),1,"Databases favoring linearizability: HBase, MongoDB, Redis. Databases favoring availability: Cassandra, CouchDB, Dynamo, Hadoop, Riak. An ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did.","p98"),Y0("Propagating state across a small cluster","Eight hosts need to share a small amount of mutable state. You want low latency, simple operations and independent scaling of the state store, and you accept that nothing will validate the shape of what gets written. Which technique fits?",j(["A full mesh, where every host broadcasts state changes to every other host","A coordination service such as ZooKeeper, using Paxos, Raft or Zab","A gossip protocol with random leader selection","A distributed cache such as Redis - simple, low latency and independently scalable, at the cost of no schema validation, so bad data goes undetected until it is read, and no encryption"]),3,"Full mesh - every host broadcasts to every other; simplest, but message count grows quadratically, so small clusters only. Coordination service - Paxos, Raft, Zab; ZooKeeper gives access control, in-memory speed, horizontal scaling and ordered reads, but is complex and must guarantee exactly one leader or you get split brain. Distributed cache - Redis; simple, low latency, independently scalable, but no schema validation, so bad data goes undetected until read, and no encryption. Gossip protocol and random leader selection trade consistency and accuracy for lower cost.","p99-103"),Y0("Approximating a distinct count","A dashboard needs the number of unique visitors over a huge event stream. An exact COUNT DISTINCT is too expensive, and a few percent of error is fine. Which algorithm?",j(["HyperLogLog, which estimates cardinality - it is what Presto uses for this","Count-min sketch, which is the standard structure for estimating distinct values in a stream","A bloom filter, testing each visitor for membership and counting the misses","A quorum read across the aggregation tier, summing each node's local count"]),0,"HyperLogLog for cardinality - COUNT DISTINCT, as used in Presto. Count-min sketch for estimating the frequency of events in a data stream. Estimation algorithms trade accuracy for lower complexity.","p103-104"),Y0("What PACELC adds to CAP","The interviewer asks whether CAP is the whole story. What does PACELC add to it?",j(["It adds durability as a fourth property, alongside consistency, availability and partition tolerance","It formalizes eventual consistency as a fourth choice available during a partition","Else - during normal operation with no partition, you must still choose between latency and consistency","Else - during normal operation, you must still choose between availability and partition tolerance"]),2,"PACELC is an extension of CAP: when a network Partition occurs you must choose between Availability and Consistency; Else, during normal operation, you must choose between Latency and Consistency. The book flags it as further reading rather than covering it in depth.","p107")])}function AP(){return $}function BP(){return $}function GN(){return new y0("System Design",(()=>{let Z=j([new F1("Interview flow & requirements",BP()),new F1("Observability & search",AP()),new F1("Non-functional requirements",MP()),new F1("Storage, replication & sharding",DP()),new F1("ETL, denormalization & caching",RP()),new F1("Events & distributed transactions",NP()),new F1("Services & API paradigms",FP()),new F1("Case studies",OP()),new F1("Terminology",HP())]);return W0(Z,(J)=>{return!(J.problems instanceof x)})})())}function j4(){return j([gF(),qF(),WN(),WF(),qN(),gO(),GN()])}function r5(Z,J){let Q=V7(j4(),(X)=>{return X.name===Z});if(Q instanceof u){let X=Q[0],Y=V7(X.subcategories,(K)=>{return K.name===J});if(Y instanceof u)return Y[0].problems;else return $}else return $}function a5(Z){let J=V7(j4(),(Q)=>{return Q.name===Z});if(J instanceof u){let Q=J[0];return I1(Q.subcategories,(X)=>{return X.name})}else return $}function gQ(){let Z=a5(V4);return I1(Z,(J)=>{return[J,(()=>{let Q=r5(V4,J);return I1(Q,(X)=>{return new X8(V4,J,X.title)})})()]})}function IN(){return I1(j4(),(Z)=>{return Z.name})}function zN(Z,J,Q){let X=V7(Z,J);if(X instanceof u){let Y=X[0];return Q(Y)}else return X}function y8(Z,J,Q){return zN(j4(),(X)=>{return X.name===Z},(X)=>{return zN(X.subcategories,(Y)=>{return Y.name===J},(Y)=>{return V7(Y.problems,(K)=>{return K.title===Q})})})}var t5=new Map;function m3(Z,J,Q,X,Y){if(t5.has(Z))return;let K=new Worker(J,Q?{type:"module"}:void 0);K.onmessage=(W)=>X(JSON.stringify(W.data)),K.onerror=(W)=>Y(String(W.message??"The runtime failed to load.")),t5.set(Z,K)}function VN(Z,J,Q,X,Y){t5.get(Z)?.terminate(),t5.delete(Z),m3(Z,J,Q,X,Y)}function jN(Z,J,Q,X){t5.get(Z)?.postMessage({type:"run",id:J,solution:Q,harness:X})}function HN(Z,J){setTimeout(J,Z)}var LP="1.18.1",PP="3.14.3",TP=8000;function ON(Z){if(Z==="python")return["/python-worker.js?v="+PP,!1];else if(Z==="typescript")return["/ts-worker.js",!0];else return["/gleam-worker.js?v="+LP,!0]}function p3(Z,J,Q){return H8(Z,z1,BZ(J),Q)}function SP(Z){return $1("phase",w1,(J)=>{return p3("file",w1,(Q)=>{return p3("line",J6,(X)=>{return p3("column",J6,(Y)=>{return $1("message",w1,(K)=>{return Z(new z9(new y3(J,Q,X,Y,K)))})})})})})}function EP(Z){let J=$1("label",w1,(Q)=>{return $1("expected",w1,(X)=>{return $1("actual",w1,(Y)=>{return $1("passed",w4,(K)=>{return b1(new b3(Q,X,Y,K))})})})});return $1("cases",j8(J),(Q)=>{return Z(new U9(Q))})}function CP(Z){return $1("type",w1,(J)=>{if(J==="ready")return b1(new Z7(Z));else if(J==="result")return $1("id",J6,(Q)=>{return EP((X)=>{return b1(new U4(Q,X))})});else if(J==="error")return $1("id",J6,(Q)=>{return SP((X)=>{return b1(new U4(Q,X))})});else return y4(new Z7(Z),"Msg")})}function FN(Z,J){let Q=k9(J,CP(Z));if(Q instanceof u)return Q[0];else return new H9(Z,"The runtime sent an unreadable message.")}function NN(Z){return B6((J)=>{let Q=ON(Z),X=Q[0],Y=Q[1];return m3(Z,X,Y,(K)=>{return J(FN(Z,K))},(K)=>{return J(new H9(Z,K))})})}function RN(Z){return B6((J)=>{let Q=ON(Z),X=Q[0],Y=Q[1];return VN(Z,X,Y,(K)=>{return J(FN(Z,K))},(K)=>{return J(new H9(Z,K))})})}function DN(Z,J,Q,X){return B6((Y)=>{return jN(Z,J,Q,X),HN(TP,()=>{return Y(new n5(J))})})}function uQ(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return m1(globalThis.localStorage);else return Q0(null)}catch{return Q0(null)}}function H4(Z,J){return kP(Z.getItem(J))}function c3(Z,J,Q){try{return Z.setItem(J,Q),m1(null)}catch{return Q0(null)}}function kP(Z){if(Z!==null)return m1(Z);else return Q0(null)}var wP="algoDrillState",bP="algoDrillState.v2",yP="algoDrillState.v3",AN="algoDrillState.v4";function mQ(Z){let J=(K)=>{if(y8(K.category,K.subcategory,K.title)instanceof u)return!0;else return!1},Q=W0(Z.selected,J),X=new H1(Z.route,Z.selected_category,Z.selected_subcategory,Q,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,W0(Z.drafts,(K)=>{return J(K[0])}),W0(Z.attempts,(K)=>{return J(K[0])}),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,W0(Z.exam_answers,(K)=>{return J(K[0])}));if(X.route instanceof w8&&X.problem_index>=j0(Q))return new H1(G9,X.selected_category,X.selected_subcategory,X.selected,0,X.iteration_count,1,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else if(X.route instanceof NQ&&X.exam_answers instanceof x)return new H1(G9,X.selected_category,X.selected_subcategory,X.selected,X.problem_index,X.iteration_count,X.current_iteration,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else return X}function $P(Z,J){if(Z==="currentView")return $1("currentProblemIndex",J6,J);else return $1("problemIndex",J6,J)}function BN(){return $1("category",w1,(Z)=>{return $1("subcategory",w1,(J)=>{return $1("title",w1,(Q)=>{return b1(new X8(Z,J,Q))})})})}function MN(Z,J){return H8(Z,z1,BZ(w1),J)}function hP(){return b4(w1,(Z)=>{if(Z==="drill")return b1(y5);else if(Z==="report")return b1(RQ);else return b1(G9)})}function n3(Z,J,Q){return $1(Z,hP(),(X)=>{return MN("selectedCategory",(Y)=>{return MN("selectedSubcategory",(K)=>{return $1(J,j8(BN()),(W)=>{return $P(Z,(q)=>{return $1("iterationCount",J6,(G)=>{return $1("currentIteration",J6,(U)=>{return Q((()=>{let z=O9();return new H1(X,Y,K,W,q,G,U,z.draft,z.revealed_solution,z.runtimes,z.run,z.drafts,z.attempts,z.search,z.next_run_id,z.editor_keymap,z.choice,z.graded,z.exam_answers)})())})})})})})})})}function fP(){return n3("currentView","selectedProblems",(Z)=>{return b1(Z)})}function gP(Z){let J=H4(Z,wP);if(J instanceof u){let Q=J[0],X=k9(Q,fP()),Y=H7(X,mQ);return f4(Y,O9())}else return O9()}function uP(){return n3("route","selected",(Z)=>{return b1(Z)})}function vP(Z){let J=H4(Z,bP);if(J instanceof u){let Q=J[0],X=k9(Q,uP()),Y=H7(X,mQ);return f4(Y,O9())}else return gP(Z)}function mP(){return b4(w1,(Z)=>{if(Z==="passed")return b1(BQ);else return b1($5)})}function d3(Z,J){return b4(BN(),(Q)=>{return $1(Z,J,(X)=>{return b1([Q,X])})})}function LN(){return n3("route","selected",(Z)=>{return H8("drafts",$,j8(d3("draft",w1)),(J)=>{return H8("attempts",$,j8(d3("result",mP())),(Q)=>{return H8("search","",w1,(X)=>{return H8("editorKeymap","default",w1,(Y)=>{return b1(new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,J,Q,X,Z.next_run_id,Y,Z.choice,Z.graded,Z.exam_answers))})})})})})}function pP(Z){let J=H4(Z,yP);if(J instanceof u){let Q=J[0],X=k9(Q,LN()),Y=H7(X,mQ);return f4(Y,O9())}else return vP(Z)}function cP(){return b4(LN(),(Z)=>{return H8("examAnswers",$,j8(d3("correct",w4)),(J)=>{return b1(new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,J))})})}function PN(){let Z=uQ();if(Z instanceof u){let J=Z[0],Q=H4(J,AN);if(Q instanceof u){let X=Q[0],Y=k9(X,cP()),K=H7(Y,mQ);return f4(K,O9())}else return pP(J)}else return O9()}function vQ(Z,J){return x9(_(["category",U0(Z.category)],_(["subcategory",U0(Z.subcategory)],_(["title",U0(Z.title)],J))))}function dP(Z){return vQ(Z,$)}function nP(Z){let J=x9(j([["route",U0((()=>{let Q=Z.route;if(Q instanceof X4)return"menu";else if(Q instanceof w8)return"drill";else return"report"})())],["selectedCategory",AX(Z.selected_category,U0)],["selectedSubcategory",AX(Z.selected_subcategory,U0)],["selected",O8(Z.selected,dP)],["problemIndex",l6(Z.problem_index)],["iterationCount",l6(Z.iteration_count)],["currentIteration",l6(Z.current_iteration)],["drafts",O8(Z.drafts,(Q)=>{return vQ(Q[0],j([["draft",U0(Q[1])]]))})],["attempts",O8(Z.attempts,(Q)=>{return vQ(Q[0],j([["result",U0((()=>{if(Q[1]instanceof j9)return"passed";else return"failed"})())]]))})],["examAnswers",O8(Z.exam_answers,(Q)=>{return vQ(Q[0],j([["correct",g4(Q[1])]]))})],["search",U0(Z.search)],["editorKeymap",U0(Z.editor_keymap)]]));return yq(J)}function TN(Z){return B6((J)=>{let Q=uQ();if(Q instanceof u){let X=Q[0],Y=c3(X,AN,nP(Z));return}else return})}function sP(Z,J){let Q=Z.revealed_solution;if(Q instanceof a){let X=Q[0],Y=J.solutions,K=FZ(Y,X);return OZ(K)}else return new P1(void 0)}function iP(Z,J){let Q,X=Z.file;if(X instanceof a){let W=X[0];Q=k4(W,"check")}else Q=!1;let Y=Q,K=J.check;if(Y&&K instanceof a){let W=K[0];return Y1(j([b("results")]),j([Y1(j([b("results-summary fail")]),j([i("Your solution doesn't match the required signature.")])),L7(j([b("signature")]),j([P7($,j([i(W.signature)]))])),gX(j([b("results-details")]),j([uX($,j([i("Details")])),L7(j([b("results-message")]),j([i(Z.message)]))]))]))}else return Y1(j([b("results")]),j([Y1(j([b("results-summary fail")]),j([i((()=>{if(Z.phase==="compile")return"Your code doesn't compile.";else return"Your code crashed while running."})())])),L7(j([b("results-message")]),j([i(Z.message)]))]))}function rP(Z){let J=j0(Z),Q=z7(Z,(U)=>{return U.passed}),X=Q===J&&J>0,Y=Y1(j([l0(j([["results-summary",!0],["pass",X],["fail",!X]]))]),j([i((()=>{if(X)return"✓ ";else return"✗ "})()+M1(Q)+"/"+M1(J)+" passed")])),K,q=W0(Z,(U)=>{return!U.passed});K=I1(q,(U)=>{return Y1(j([b("case fail")]),j([Y1(j([b("case-label")]),j([i("✗ "+U.label)])),Y1(j([b("case-diff")]),j([Y1($,j([p1(j([b("case-diff-tag")]),j([i("expected ")])),P7($,j([i(U.expected)]))])),Y1($,j([p1(j([b("case-diff-tag")]),j([i("got ")])),P7($,j([i(U.actual)]))]))]))]))});let G=K;return Y1(j([b("results")]),_(Y,G))}function aP(Z,J){let Q,X=Z.run;if(X instanceof AQ)Q=$;else if(X instanceof I9)Q=j([Y1(j([b("results")]),j([Y1(j([b("results-summary")]),j([i("Compiling and running…")]))]))]);else{let G=X[0];if(G instanceof U9){let U=G[0];Q=j([rP(U)])}else if(G instanceof z9){let U=G[0];Q=j([iP(U,J)])}else Q=j([Y1(j([b("results")]),j([Y1(j([b("results-summary fail")]),j([i("Your solution didn't finish — likely an infinite loop. The runtime was restarted.")]))]))])}let Y=Q,K,W=sP(Z,J);if(W instanceof u){let G=W[0];K=j([Y1(j([b("answer-content")]),j([Y1(j([b("answer-label")]),j([i(G.label)])),L7($,j([P7($,j([i(G.code)]))]))]))])}else K=$;return G0(Y,K)}function oP(Z,J){return T4(J.solutions,(Q,X)=>{return H0(j([l0(j([["btn-secondary",!0],["solution-button",!0],["revealed",T1(Z.revealed_solution,new a(X))]])),i1(new q4(X))]),j([i(Q.label)]))})}function e5(Z,J){return H0(j([b("btn-primary run-button"),m8(J),i1(aH)]),j([i(Z)]))}function tP(Z,J){let Q;if(J.check instanceof a)Q=j([(()=>{let K=s5(Z,i5(J.language));if(Z.run instanceof I9)return e5("Running…",!0);else if(K instanceof Y4)return e5("Loading runtime…",!0);else if(K instanceof DQ)return e5("Loading runtime…",!0);else if(K instanceof K4)return e5("▶ Run tests",!1);else return e5("Runtime unavailable",!0)})()]);else Q=j([p1(j([b("run-unavailable")]),j([i("Checking isn't available for this drill — compare with a solution.")]))]);let Y=Q;return Y1(j([b("run-bar")]),S4(j([Y,oP(Z,J),j([H0(j([b("btn-primary next-button"),i1(g3)]),j([i("Next")]))])])))}function l3(Z){let Q=MZ(Z,`
`),X=NZ(Q,3);return AZ(X,`
`)}function eP(Z){let J=Z.run;if(J instanceof V9){let Q=J[0];if(Q instanceof z9){let X=Q[0],Y=X.file,K=X.line,W=X.column;if(Y instanceof a&&K instanceof a&&W instanceof a){let q=Y[0];if(q==="solution.gleam"){let G=K[0],U=W[0];return j([new b5(G,U,l3(X.message))])}else if(q==="solution.py"){let G=K[0],U=W[0];return j([new b5(G,U,l3(X.message))])}else if(q==="solution.ts"){let G=K[0],U=W[0];return j([new b5(G,U,l3(X.message))])}else return $}else return $}else return $}else return $}function ZT(Z,J){if(Z.graded){let X=T1(Z.choice,new a(J.correct));return j([Y1(j([b("results")]),j([Y1(j([l0(j([["results-summary",!0],["pass",X],["fail",!X]]))]),j([i((()=>{if(X)return"✓ Correct";else return"✗ Not quite"})())])),Y1(j([b("quiz-explanation")]),j([i(J.explanation)])),Y1(j([b("quiz-page")]),j([i("Book reference: "+J.page)]))]))])}else return $}function JT(Z){if(Z===0)return"A";else if(Z===1)return"B";else if(Z===2)return"C";else if(Z===3)return"D";else return M1(Z+1)}function QT(Z,J){let Q=Y1(j([b("quiz-choices")]),T4(J.choices,(Y,K)=>{let W=T1(Z.choice,new a(K)),q=K===J.correct;return H0(j([l0(j([["quiz-choice",!0],["picked",W],["correct",Z.graded&&q],["wrong",Z.graded&&W&&!q]])),m8(Z.graded),i1(new l5(K))]),j([p1(j([b("quiz-marker")]),j([i(JT(K))])),p1(j([b("quiz-choice-text")]),j([i(Y)]))]))})),X=Y1(j([b("run-bar")]),(()=>{if(Z.graded)return j([H0(j([b("btn-primary next-button"),i1(g3)]),j([i("Next")]))]);else return j([H0(j([b("btn-primary"),m8(Z.choice instanceof F6),i1(oH)]),j([i("Submit answer")]))])})());return _(Q,_(X,ZT(Z,J)))}function XT(Z){let J=Z.run;if(J instanceof V9){let Q=J[0];if(Q instanceof U9){let X=Q[0];return l4(j([b("case-list")]),I1(X,(Y)=>{return n4(j([l0(j([["case",!0],["pass",Y.passed],["fail",!Y.passed]]))]),j([p1(j([b("case-icon")]),j([i((()=>{if(Y.passed)return"✓";else return"✗"})())])),i(" "+Y.label)]))}))}else return Y1(j([b("pane-empty")]),j([i("Run the tests to see the cases.")]))}else return Y1(j([b("pane-empty")]),j([i("Run the tests to see the cases.")]))}function s3(Z,J){return jG(j([b("panel")]),_(fZ(j([b("panel-title")]),j([i(Z)])),J))}function YT(Z,J,Q){let X=s3("Prompt",j([Y1(j([b("problem-category")]),j([i(J.category+" › "+J.subcategory+" · "+WO(Q.language))])),Y1(j([b("problem-prompt")]),j([i(Q.prompt)]))])),Y,K=Q.approach;if(K==="")Y=$;else{let z=K;Y=j([gX(j([b("panel approach")]),j([uX(j([b("panel-title")]),j([i("Approach")])),Y1(j([b("approach-text")]),j([i(z)]))]))])}let W=Y,q,G=Q.check;if(G instanceof a){let z=G[0];q=j([s3("Signature",j([L7(j([b("signature")]),j([P7($,j([i(z.signature)]))]))])),s3("Tests",j([XT(Z)]))])}else q=$;return _(X,G0(W,q))}function KT(Z){return Y1(j([b("keymap-picker")]),I1(j([["default","Std"],["vim","Vim"],["emacs","Emacs"]]),(J)=>{return H0(j([l0(j([["keymap-option",!0],["active",Z.editor_keymap===J[0]]])),s1("title",J[1]+" keybindings"),i1(new c5(J[0]))]),j([i(J[1])]))}))}function WT(Z,J,Q){let X=j0(Z.selected),Y;if(Q.quiz instanceof a)Y="Question "+M1(Z.problem_index+1)+"/"+M1(X);else Y="Pass "+M1(Z.current_iteration)+"/"+M1(Z.iteration_count)+" · Problem "+M1(Z.problem_index+1)+"/"+M1(X);let W=Y,q=X*Z.iteration_count,G=(Z.current_iteration-1)*X+Z.problem_index,U;if(q===0)U=q;else U=f8(G*100,q);let z=U,I=J.category+"|"+J.subcategory+"|"+J.title+"|"+M1(Z.current_iteration);return Y1(j([b("drill-container")]),j([Y1(j([b("drill-header")]),j([H0(j([b("btn-secondary"),i1(iH)]),j([i("← Exit")])),hZ(j([b("drill-title")]),j([i(Q.title)])),(()=>{if(Q.quiz instanceof a)return h9();else return KT(Z)})(),Y1(j([b("progress-text"),_Z("--progress",M1(z)+"%")]),j([i(W)]))])),Y1(j([b("drill-grid")]),j([Y1(j([b("drill-side")]),YT(Z,J,Q)),Y1(j([b("drill-main")]),(()=>{let V=Q.quiz;if(V instanceof a){let H=V[0];return QT(Z,H)}else return _(i8(j([b("editor-frame")]),j([[I,fH(j([gH(Z.draft),vH(i5(Q.language)),uH(Z.editor_keymap),pH((H)=>{return new G4(H)}),mH(eP(Z))]))]])),_(tP(Z,Q),aP(Z,Q)))})())]))]))}function SN(Z){return h4(V6(Z),(J)=>{return h4(y8(J.category,J.subcategory,J.title),(Q)=>{return new u(WT(Z,J,Q))})})}var EN="src/algodrill/view/menu.gleam";function GT(){let Z=gQ();return T0(Z,0,(J,Q)=>{return J+j0(Q[1])})}function UT(Z){let J=Z.selected;if(J instanceof x)return h9();else{let Q=J;return i8(j([b("chips")]),I1(Q,(X)=>{return[X.category+"|"+X.subcategory+"|"+X.title,p1(j([b("chip")]),j([i(X.title+" "),H0(j([b("chip-remove"),s1("aria-label","Remove "+X.title),i1(new b8(X))]),j([i("×")]))]))]}))}}function CN(Z,J){let Q=z4(Z.attempts,J);if(Q instanceof u){let X=Q[0],Y;if(X instanceof j9)Y=["badge badge-passed","✓"];else Y=["badge badge-failed","✗"];let K=Y,W=K[0],q=K[1];return p1(j([b(W)]),j([i(q)]))}else return h9()}function i3(Z){return Iz("keydown",$1("key",w1,(J)=>{if(J==="Enter")return b1(JJ(Z,!0,!1));else if(J===" ")return b1(JJ(Z,!0,!1));else return y4(JJ(Z,!1,!1),"key")}))}function zT(Z,J){let Q=_4(J),X,Y=j4();X=E4(Y,(W)=>{let q=W.subcategories;return E4(q,(G)=>{let U=G.problems;return GX(U,(z)=>{if(VX(_4(z.title),Q))return new u([new X8(W.name,G.name,z.title),z]);else return new P1(void 0)})})});let K=X;if(K instanceof x)return Y1(j([b("search-results")]),j([Y1(j([b("pane-empty")]),j([i("No problems match “"+J+"”")]))]));else return i8(j([b("search-results")]),I1(K,(W)=>{let q=W[0];return[q.category+"|"+q.subcategory+"|"+q.title,(()=>{let G=I7(Z.selected,q);return Y1(j([l0(j([["search-hit",!0],["selected",G]])),kZ(0),i1(new b8(q)),i3(new b8(q))]),j([p1(j([b("search-hit-title")]),j([i(q.title)])),CN(Z,q),p1(j([b("search-hit-context")]),j([i(q.category+" › "+q.subcategory)]))]))})()]}))}function IT(Z,J){return Y1(j([l0(j([["pane-item",!0],["selected",I7(Z.selected,J)]])),kZ(0),i1(new b8(J)),i3(new b8(J))]),j([i(J.title),CN(Z,J)]))}function r3(Z,J){return Y1(j([b("pane")]),j([fZ($,j([i(Z)])),J]))}function VT(Z,J){return r3("Problems",(()=>{if(J instanceof x)return Y1(j([b("pane-list")]),j([Y1(j([b("pane-empty")]),j([i("Pick a subcategory first")]))]));else{let Q=Z.selected_category,X;if(Q instanceof a)X=Q[0];else throw D9("let_assert",EN,"algodrill/view/menu",288,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Q,start:8541,end:8583,pattern_start:8552,pattern_end:8561});let Y=Z.selected_subcategory,K;if(Y instanceof a)K=Y[0];else throw D9("let_assert",EN,"algodrill/view/menu",289,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Y,start:8590,end:8635,pattern_start:8601,pattern_end:8610});return i8(j([b("pane-list")]),I1(J,(W)=>{let q=new X8(X,K,W.title);return[W.title,IT(Z,q)]}))}})())}function _N(Z,J,Q){return Y1(j([l0(j([["pane-item",!0],["current",J]])),kZ(0),i1(Q),i3(Q)]),j([i(Z)]))}function jT(Z){let J,Q=Z.selected_category;if(Q instanceof a){let Y=Q[0];J=a5(Y)}else J=$;let X=J;return r3("Subcategory",(()=>{if(X instanceof x)return Y1(j([b("pane-list")]),j([Y1(j([b("pane-empty")]),j([i("Pick a category first")]))]));else return i8(j([b("pane-list")]),I1(X,(Y)=>{return[Y,_N(Y,T1(Z.selected_subcategory,new a(Y)),new f5(Y))]}))})())}function HT(Z){return r3("Category",i8(j([b("pane-list")]),I1(IN(),(J)=>{return[J,_N(J,T1(Z.selected_category,new a(J)),new h5(J))]})))}function OT(Z){let J,Q=j(["Categories"]),X=G0(Q,eQ(j([Z.selected_category])));J=G0(X,eQ(j([Z.selected_subcategory])));let Y=J,K=j0(Y)-1;return Y1(j([b("breadcrumbs")]),(()=>{let q=T4(Y,(G,U)=>{if(U===K)return j([p1(j([b("breadcrumb")]),j([i(G)]))]);else return j([p1(j([b("breadcrumb clickable"),i1(new g5(U))]),j([i(G)])),i(" "),p1(j([b("breadcrumb")]),j([i("/")])),i(" ")])});return S4(q)})())}function a3(Z){let J,Q=Z.selected_category,X=Z.selected_subcategory;if(Q instanceof a&&X instanceof a){let K=Q[0],W=X[0];J=r5(K,W)}else J=$;let Y=J;return Y1(j([b("menu-container")]),_(Y1(j([b("menu-top")]),j([VG(j([b("menu-title")]),j([i("Algo Drill")])),fX(j([xX("search"),b("search"),aq("Search problems…"),wX(Z.search),Vz((K)=>{return new p5(K)})]))])),(()=>{let K,W=lW(Z.search);if(W==="")K=j([OT(Z),Y1(j([b("panes-container")]),j([HT(Z),jT(Z),VT(Z,Y)]))]);else K=j([zT(Z,W)]);return G0(K,j([UT(Z),Y1(j([b("iteration-control")]),j([HG(j([sq("iterations")]),j([i("Repetitions per problem")])),fX(j([xX("number"),M7("iterations"),rq("1"),iq("20"),wX(M1(Z.iteration_count)),jz((G)=>{return new u5(G)})])),p1(j([b("progress-text")]),j([i(M1(j0(Z.selected))+" selected")]))])),Y1(j([b("menu-actions")]),j([H0(j([M7("startDrill"),b("btn-primary"),m8(Z.selected instanceof x),i1(sH)]),j([i("Start drill")])),H0(j([M7("selectAll"),b("btn-secondary"),m8(Y instanceof x),i1(nH)]),j([i("Select all in subcategory")])),H0(j([M7("clearSelection"),b("btn-secondary"),i1(lH)]),j([i("Clear selection")])),H0(j([M7("startExam"),b("btn-secondary"),m8(GT()===0),i1(tH)]),j([i("System design exam")]))]))]))})()))}function o3(Z,J){return Y1(j([b("panel")]),_(Y1(j([b("panel-title")]),j([i(Z)])),J))}function NT(Z){if(Z instanceof x)return j([o3("Where to study",j([Y1(j([b("pane-empty")]),j([i("Nothing under "+M1(xQ)+"%. Widen the pool or raise the bar.")]))]))]);else return j([o3("Where to study",j([l4(j([b("report-advice")]),I1(Z,(J)=>{return n4($,j([i(J.section+" — "+M1(e9(J.correct,J.total))+"%")]))}))]))])}function RT(Z){let J=e9(Z.correct,Z.total),Q=J<xQ;return n4(j([l0(j([["report-section",!0],["weak",Q]]))]),j([p1(j([b("report-section-name")]),j([i(Z.section)])),p1(j([b("report-bar"),_Z("--score",M1(J)+"%")]),$),p1(j([b("report-section-score")]),j([i(M1(Z.correct)+"/"+M1(Z.total))])),p1(j([b("report-section-percent")]),j([i(M1(J)+"%")]))]))}function kN(Z){let J=JO(Z.exam_answers,a5(V4)),Q=j0(Z.exam_answers),X=z7(Z.exam_answers,(K)=>{return K[1]}),Y=W0(J,(K)=>{return e9(K.correct,K.total)<xQ});return Y1(j([b("report-container")]),j([Y1(j([b("drill-header")]),j([H0(j([b("btn-secondary"),i1(eH)]),j([i("← Menu")])),hZ(j([b("drill-title")]),j([i("Exam result")]))])),Y1(j([b("report-body")]),_(Y1(j([b("report-total")]),j([p1(j([b("report-total-score")]),j([i(M1(X)+"/"+M1(Q))])),p1(j([b("report-total-percent")]),j([i(M1(e9(X,Q))+"%")]))])),_(o3("By section — weakest first",j([l4(j([b("report-sections")]),I1(J,RT))])),NT(Y))))]))}var MT="src/algodrill.gleam",AT=40;function BT(Z){let J=Z.route;if(J instanceof X4)return a3(Z);else if(J instanceof w8){let Q=SN(Z);if(Q instanceof u)return Q[0];else return a3(Z)}else return kN(Z)}function LT(Z){if(Z instanceof v5)return!1;else if(Z instanceof m5)if(!Z[0])return!1;else return!0;else if(Z instanceof q4)return!1;else if(Z instanceof G4)return!1;else if(Z instanceof d5)return!1;else if(Z instanceof Z7)return!1;else if(Z instanceof H9)return!1;else return!0}function ZW(Z){let J=V6(Z);if(J instanceof u){let Q=J[0],X=y8(Q.category,Q.subcategory,Q.title);if(X instanceof u){let Y=X[0];return new u(i5(Y.language))}else return X}else return J}function t3(Z,J,Q){let X=z4(Z,J);if(Q)return m6(Z,J,BQ);else if(X instanceof u)if(X[0]instanceof j9)return Z;else return m6(Z,J,$5);else return m6(Z,J,$5)}function bN(Z){let J=V6(Z);if(J instanceof u){let Q=J[0],X=y8(Q.category,Q.subcategory,Q.title);if(X instanceof u){let K=X[0].check;if(K instanceof a){let W=K[0];return new u(W)}else return new P1(void 0)}else return X}else return J}function PT(){return B6((Z)=>{return kY("draft-save",400,()=>{return Z(rH)})})}function JW(Z){let J=Z[0],Q=Z[1],X=J.route instanceof w8&&!T1(bN(J),new P1(void 0)),Y=ZW(J);if(X&&Y instanceof u){let K=Y[0];if(s5(J,K)instanceof Y4)return[new H1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,J.draft,J.revealed_solution,m6(J.runtimes,K,w3),J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers),m4(j([Q,NN(K)]))];else return Z}else return Z}function ZZ(Z){let J=y8(Z.category,Z.subcategory,Z.title);if(J instanceof u){let X=J[0].check;if(X instanceof a)return X[0].starter;else return""}else return""}function e3(Z){return new H1(G9,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,"",z1,Z.runtimes,W4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,z1,!1,Z.exam_answers)}function xN(Z){let J=V6(Z);if(J instanceof u){let Q=J[0],X=y8(Q.category,Q.subcategory,Q.title);if(X instanceof u){let K=X[0].quiz;if(K instanceof a){let W=K[0];return new u(W)}else return new P1(void 0)}else return X}else return J}function TT(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return K;else{let q=$W(X,bY(Y)),G=q[0],U=q[1];if(U instanceof x)return G0(K,X);else{let{head:z,tail:I}=U;Z=G0(G,I),J=Y-1,Q=_(z,K)}}}}function wN(Z){return TT(Z,j0(Z),$)}function ST(){let Z=gQ(),J,Q=j0(Z);if(Q===0)J=Q;else J=TZ(1,f8(AT,Q));let X=J,K=E4(Z,(W)=>{return NZ(wN(W[1]),X)});return wN(K)}function ET(Z,J){if(I7(Z,J))return W0(Z,(X)=>{return!T1(X,J)});else return G0(Z,j([J]))}function CT(Z,J){if(J instanceof h5){let Q=J[0];return[new H1(Z.route,new a(Q),z1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof f5){let Q=J[0];return[new H1(Z.route,Z.selected_category,new a(Q),Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof g5)if(J[0]===0)return[new H1(Z.route,z1,z1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else return[new H1(Z.route,Z.selected_category,z1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else if(J instanceof b8){let Q=J[0];return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,ET(Z.selected,Q),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof LQ){let{selected_category:Q,selected_subcategory:X}=Z;if(Q instanceof a&&X instanceof a){let Y=Q[0],K=X[0],W,q=r5(Y,K),G=I1(q,(z)=>{return new X8(Y,K,z.title)});W=W0(G,(z)=>{return!I7(Z.selected,z)});let U=W;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,G0(Z.selected,U),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()]}else if(J instanceof PQ)return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,$,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else if(J instanceof u5){let Q=J[0],X,Y=OX(Q);if(Y instanceof u){let W=Y[0];if(W>0)X=W;else X=1}else X=1;let K=X;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,K,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof TQ){let Q=Z.selected;if(Q instanceof x)return[Z,j1()];else{let X=Q.head;return JW([new H1(y5,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,ZZ(X),z1,Z.runtimes,W4,m6(Z.drafts,X,ZZ(X)),Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,z1,!1,$),j1()])}}else if(J instanceof v5)return[Z,B6((Q)=>{return Q(new m5(xY((()=>{if(xN(Z)instanceof u)return"Exit the exam? You will not get a score for it.";else return"Exit the drill? Your typed code will be lost."})())))})];else if(J instanceof m5)if(J[0])return[e3(Z),j1()];else return[Z,j1()];else if(J instanceof q4){let Q=J[0],X,Y=Z.revealed_solution;if(Y instanceof a)if(Y[0]===Q)X=z1;else X=new a(Q);else X=new a(Q);let K=X;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,K,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof SQ){let Q;if(Z.problem_index+1<j0(Z.selected))Q=[Z.problem_index+1,Z.current_iteration];else Q=[0,Z.current_iteration+1];let Y=Q,K=Y[0],W=Y[1],q=W>Z.iteration_count,G=Z.exam_answers;if(q)if(G instanceof x)return[e3(Z),B6((U)=>{return wY("Drill complete.")})];else return[(()=>{let U=e3(Z);return new H1(RQ,U.selected_category,U.selected_subcategory,U.selected,U.problem_index,U.iteration_count,U.current_iteration,U.draft,U.revealed_solution,U.runtimes,U.run,U.drafts,U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers)})(),j1()];else{let U=new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,K,Z.iteration_count,W,Z.draft,z1,Z.runtimes,W4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,z1,!1,Z.exam_answers),z,I=V6(U);if(I instanceof u){let H=I[0];z=new H1(U.route,U.selected_category,U.selected_subcategory,U.selected,U.problem_index,U.iteration_count,U.current_iteration,ZZ(H),U.revealed_solution,U.runtimes,U.run,m6(U.drafts,H,ZZ(H)),U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers)}else z=new H1(U.route,U.selected_category,U.selected_subcategory,U.selected,U.problem_index,U.iteration_count,U.current_iteration,"",U.revealed_solution,U.runtimes,U.run,U.drafts,U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers);return JW([z,j1()])}}else if(J instanceof p5){let Q=J[0];return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Q,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof c5){let Q=J[0];return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Q,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof G4){let Q=J[0],X,Y=V6(Z);if(Y instanceof u){let W=Y[0];X=m6(Z.drafts,W,Q)}else X=Z.drafts;let K=X;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Q,Z.revealed_solution,Z.runtimes,Z.run,K,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),PT()]}else if(J instanceof EQ)return[Z,j1()];else if(J instanceof d5){let Q=ZW(Z),X=bN(Z);if(Q instanceof u&&X instanceof u){let Y=Q[0],K=X[0];if(s5(Z,Y)instanceof K4){let q=Z.next_run_id;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new I9(q),Z.drafts,Z.attempts,Z.search,q+1,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),DN(Y,q,Z.draft,K.harness)]}else return[Z,j1()]}else return[Z,j1()]}else if(J instanceof Z7){let Q=J.language;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,m6(Z.runtimes,Q,dH),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof H9){let{language:Q,message:X}=J;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,m6(Z.runtimes,Q,new MQ(X)),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof U4){let{id:Q,outcome:X}=J,Y=Z.run;if(Y instanceof I9)if(Y.id===Q){let W;if(X instanceof U9){let I=X[0];W=!(I instanceof x)&&yW(I,(V)=>{return V.passed})}else if(X instanceof z9)W=!1;else W=!1;let q=W,G,U=V6(Z);if(U instanceof u){let I=U[0];G=t3(Z.attempts,I,q)}else G=Z.attempts;let z=G;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new V9(X),Z.drafts,z,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()];else return[Z,j1()]}else if(J instanceof n5){let Q=J.id,X=Z.run;if(X instanceof I9)if(X.id===Q){let K,W=V6(Z);if(W instanceof u){let U=W[0];K=t3(Z.attempts,U,!1)}else K=Z.attempts;let q=K,G=ZW(Z);if(G instanceof u){let U=G[0];return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,m6(Z.runtimes,U,w3),new V9(h3),Z.drafts,q,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),RN(U)]}else return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new V9(h3),Z.drafts,q,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()];else return[Z,j1()]}else if(J instanceof l5){let Q=J[0];if(Z.graded)return[Z,j1()];else return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,new a(Q),Z.graded,Z.exam_answers),j1()]}else if(J instanceof CQ){let{graded:Q,choice:X}=Z,Y=xN(Z),K=V6(Z);if(!Q&&X instanceof a&&Y instanceof u&&K instanceof u){let W=X[0],q=Y[0],G=K[0],U=W===q.correct;return[new H1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,t3(Z.attempts,G,U),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,!0,_([G,U],Z.exam_answers)),j1()]}else return[Z,j1()]}else if(J instanceof _Q)return[Z,B6((Q)=>{return Q(new kQ(ST()))})];else if(J instanceof kQ){let Q=J[0];if(Q instanceof x)return[Z,j1()];else return[new H1(y5,Z.selected_category,Z.selected_subcategory,Q,0,1,1,"",z1,Z.runtimes,W4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,z1,!1,$),j1()]}else return[new H1(G9,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}function _T(Z,J){let Q=CT(Z,J),X=Q[0],Y=Q[1];if(LT(J))return[X,m4(j([TN(X),Y]))];else return[X,Y]}function kT(Z,J){let Q=z4(Z.drafts,J);if(Q instanceof u)return Q[0];else return ZZ(J)}function xT(Z){let J=PN(),Q,X=J.route,Y=V6(J);if(Y instanceof u&&X instanceof w8){let W=Y[0];Q=new H1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,kT(J,W),J.revealed_solution,J.runtimes,J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers)}else Q=J;return JW([Q,j1()])}function yN(){x3();let Z=Gz(xT,_T,BT),J=Uz(Z,"#app",void 0);if(!(J instanceof u))throw D9("let_assert",MT,"algodrill",32,"main","Pattern match failed, no pattern matched the value.",{value:J,start:1219,end:1268,pattern_start:1230,pattern_end:1235});return}yN();
