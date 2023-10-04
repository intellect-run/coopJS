var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ono from '@jsdevtools/ono';
import { UniCoreMnemonicParseError, UniCoreWifParseError } from './errors';
import { generateMnemonic, isValidMnemonic, mnemonicToSeed } from './keys/bip39';
import { hdNodeToPublicKeyBuffer, hdNodeToPrivateKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey';
import { hdPublicToEccPublicKey, hdPrivateToWif, isValidWif, privateKeyToPublic, wifToPrivateKey } from './keys/ecc';
import { generateAccountName } from "./utils";
const { subtle } = globalThis.crypto;
export const makeHdNodeByMnemonic = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isValidMnemonic(mnemonic)) {
        throw ono(new UniCoreMnemonicParseError('Invalid mnemonic'));
    }
    const seed = yield mnemonicToSeed(mnemonic);
    const hdBase = seedToHd(seed);
    const hdFirstNode = hdToFirstHdNode(hdBase);
    return hdFirstNode;
});
export const makePublicKeyByMnemonic = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    const hdFirstNode = yield makeHdNodeByMnemonic(mnemonic);
    const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
    return hdPublicToEccPublicKey(hdPublicKeyBuffer);
});
export const makeAccount = (username, mnemonic, wif, pub) => {
    return {
        name: username,
        mnemonic,
        wif,
        pub,
    };
};
export const makeAccountByMnemonic = (username, mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    const hdFirstNode = yield makeHdNodeByMnemonic(mnemonic);
    const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
    const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode);
    return makeAccount(username, '', hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer));
});
export const makeAccountByWif = (username, wif) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isValidWif(wif)) {
        throw ono(new UniCoreWifParseError('Invalid wif'));
    }
    const publicKey = privateKeyToPublic(wifToPrivateKey(wif)).toLegacyString();
    return makeAccount(username, '', wif, publicKey);
});
export const generateAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = generateAccountName();
    const mnemonic = generateMnemonic();
    const seed = yield mnemonicToSeed(mnemonic);
    const hdBase = seedToHd(seed);
    const hdFirstNode = hdToFirstHdNode(hdBase);
    const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
    const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode);
    return makeAccount(name, mnemonic, hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer));
});
export const generateKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
    const mnemonic = generateMnemonic();
    const seed = yield mnemonicToSeed(mnemonic);
    const hdBase = seedToHd(seed);
    const hdFirstNode = hdToFirstHdNode(hdBase);
    const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
    const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode);
    return { mnemonic, private_key: hdPrivateToWif(hdPrivateKeyBuffer), public_key: hdPublicToEccPublicKey(hdPublicKeyBuffer) };
});
// export const generateKeyPair = async() => {
//   const { privateKey, publicKey } = await subtle.generateKey(
//   {
//     name: "ECDSA",
//     namedCurve: "P-256",
//   },
//   true,
//   ["sign", "verify"]
//   );
//   let private_jwk = await subtle.exportKey("jwk", privateKey)
//   let private_hex = to_hex(ab2b(base64url_decode(private_jwk.d!)))
//   //SHA-256 hash with a 0x80 byte in front
//   let private_m256  = await sha256('80'+ private_hex )
//   //SHA-256 hash of the private key
//   let private_sha256  = await sha256(private_m256)
//   //first 4 bytes of the second SHA-256 hash
//   let private_four = private_sha256.substr(0,8);
//   //Base58 encode the binary data to get EOS private key
//   let private_wif = encode_b58('80'+ private_hex + private_four)
//   console.log("private_jwk: ", private_jwk)
//   let public_jwk = await subtle.exportKey("jwk", publicKey);
//   console.log("public_jwk: ", public_jwk)
//   const x_binary = ab2b(base64url_decode(public_jwk.x!));
//   const y_binary = ab2b(base64url_decode(public_jwk.y!));
//   const public_binary = x_binary.concat(y_binary);
//   console.log("public_binary: ", public_binary)
//   const public_ripemd160 = hash.ripemd160().update(new Uint8Array(public_binary)).digest('hex');
//   console.log("public_ripemd160: ", public_ripemd160)
//   let checksum = public_ripemd160.substr(0, 8); // Первые 4 байта, но в hex формате
//   let public_with_checksum = public_binary.concat(
//       public_ripemd160.substr(0, 8).split('').map(x => parseInt(x, 16))
//   );
//   console.log("public_with_checksum: ", public_with_checksum)
//   let public_base58 = encode_b58(public_with_checksum.map(x => x.toString(16)).join(''));
//   console.log("public_base58: ", public_base58)
//   let public_key = "PUB_R1_" + public_base58;
//   console.log("public_key: ", public_key)
//   return {private_wif, public_key}
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQTtBQUVqQyxPQUFPLEVBQUMseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUE7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDM0csT0FBTyxFQUFDLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ2xILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUs5QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUVyQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFPLFFBQWdCLEVBQUUsRUFBRTtJQUM3RCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sR0FBRyxDQUFDLElBQUkseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0tBQzdEO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUzQyxPQUFPLFdBQVcsQ0FBQTtBQUNwQixDQUFDLENBQUEsQ0FBQTtBQUdELE1BQU0sQ0FBQyxNQUFNLHVCQUF1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QWtCLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFaEUsT0FBTyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLEVBQUMsQ0FBQTtBQUMzSCxDQUFDLENBQUEsQ0FBQTtBQUNELDhDQUE4QztBQUM5QyxnRUFBZ0U7QUFDaEUsTUFBTTtBQUNOLHFCQUFxQjtBQUNyQiwyQkFBMkI7QUFDM0IsT0FBTztBQUNQLFVBQVU7QUFDVix1QkFBdUI7QUFDdkIsT0FBTztBQUVQLGdFQUFnRTtBQUVoRSxxRUFBcUU7QUFFckUsNkNBQTZDO0FBQzdDLHlEQUF5RDtBQUV6RCxzQ0FBc0M7QUFDdEMscURBQXFEO0FBRXJELCtDQUErQztBQUMvQyxtREFBbUQ7QUFFbkQsMkRBQTJEO0FBQzNELG1FQUFtRTtBQUNuRSw4Q0FBOEM7QUFFOUMsK0RBQStEO0FBQy9ELDRDQUE0QztBQUU1Qyw0REFBNEQ7QUFDNUQsNERBQTREO0FBQzVELHFEQUFxRDtBQUVyRCxrREFBa0Q7QUFHbEQsbUdBQW1HO0FBRW5HLHdEQUF3RDtBQUN4RCxzRkFBc0Y7QUFFdEYscURBQXFEO0FBQ3JELDBFQUEwRTtBQUMxRSxPQUFPO0FBRVAsZ0VBQWdFO0FBRWhFLDRGQUE0RjtBQUU1RixrREFBa0Q7QUFFbEQsZ0RBQWdEO0FBQ2hELDRDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbm8gZnJvbSAnQGpzZGV2dG9vbHMvb25vJ1xuXG5pbXBvcnQge1VuaUNvcmVNbmVtb25pY1BhcnNlRXJyb3IsIFVuaUNvcmVXaWZQYXJzZUVycm9yfSBmcm9tICcuL2Vycm9ycydcbmltcG9ydCB7IGdlbmVyYXRlTW5lbW9uaWMsIGlzVmFsaWRNbmVtb25pYywgbW5lbW9uaWNUb1NlZWQgfSBmcm9tICcuL2tleXMvYmlwMzknXG5pbXBvcnQgeyBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlciwgaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyLCBoZFRvRmlyc3RIZE5vZGUsIHNlZWRUb0hkIH0gZnJvbSAnLi9rZXlzL2hka2V5J1xuaW1wb3J0IHtoZFB1YmxpY1RvRWNjUHVibGljS2V5LCBoZFByaXZhdGVUb1dpZiwgaXNWYWxpZFdpZiwgcHJpdmF0ZUtleVRvUHVibGljLCB3aWZUb1ByaXZhdGVLZXl9IGZyb20gJy4va2V5cy9lY2MnXG5pbXBvcnQgeyBnZW5lcmF0ZUFjY291bnROYW1lIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW1wb3J0IHt0b19oZXgsIGFiMmIsIHNoYTI1NiwgZW5jb2RlX2I1OCwgYmFzZTY0dXJsX2RlY29kZX0gZnJvbSBcIi4va2V5cy9jcnlwdG9cIjtcbmltcG9ydCBoYXNoIGZyb20gJ2hhc2guanMnO1xuXG5jb25zdCB7IHN1YnRsZSB9ID0gZ2xvYmFsVGhpcy5jcnlwdG87XG5cbmV4cG9ydCBjb25zdCBtYWtlSGROb2RlQnlNbmVtb25pYyA9IGFzeW5jIChtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGlmICghaXNWYWxpZE1uZW1vbmljKG1uZW1vbmljKSkge1xuICAgIHRocm93IG9ubyhuZXcgVW5pQ29yZU1uZW1vbmljUGFyc2VFcnJvcignSW52YWxpZCBtbmVtb25pYycpKVxuICB9XG5cbiAgY29uc3Qgc2VlZCA9IGF3YWl0IG1uZW1vbmljVG9TZWVkKG1uZW1vbmljKVxuICBjb25zdCBoZEJhc2UgPSBzZWVkVG9IZChzZWVkKVxuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGhkVG9GaXJzdEhkTm9kZShoZEJhc2UpXG5cbiAgcmV0dXJuIGhkRmlyc3ROb2RlXG59XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VQdWJsaWNLZXlCeU1uZW1vbmljID0gYXN5bmMgKG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBhd2FpdCBtYWtlSGROb2RlQnlNbmVtb25pYyhtbmVtb25pYylcbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcilcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50RGF0YSB7XG4gIG5hbWU6IHN0cmluZ1xuICBtbmVtb25pYzogc3RyaW5nXG4gIHdpZjogc3RyaW5nXG4gIHB1Yjogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudCA9ICh1c2VybmFtZTogc3RyaW5nLCBtbmVtb25pYzogc3RyaW5nLCB3aWY6IHN0cmluZywgcHViOiBzdHJpbmcpOiBBY2NvdW50RGF0YSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgbW5lbW9uaWMsXG4gICAgd2lmLFxuICAgIHB1YixcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnRCeU1uZW1vbmljID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBhd2FpdCBtYWtlSGROb2RlQnlNbmVtb25pYyhtbmVtb25pYylcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KHVzZXJuYW1lLCAnJywgaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcikpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudEJ5V2lmID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHdpZjogc3RyaW5nKSA9PiB7XG4gIGlmICghaXNWYWxpZFdpZih3aWYpKSB7XG4gICAgdGhyb3cgb25vKG5ldyBVbmlDb3JlV2lmUGFyc2VFcnJvcignSW52YWxpZCB3aWYnKSlcbiAgfVxuXG4gIGNvbnN0IHB1YmxpY0tleSA9IHByaXZhdGVLZXlUb1B1YmxpYyh3aWZUb1ByaXZhdGVLZXkod2lmKSkudG9MZWdhY3lTdHJpbmcoKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudCh1c2VybmFtZSwgJycsIHdpZiwgcHVibGljS2V5KVxufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVBY2NvdW50ID0gYXN5bmMgKCk6IFByb21pc2U8QWNjb3VudERhdGE+ID0+IHtcbiAgY29uc3QgbmFtZSA9IGdlbmVyYXRlQWNjb3VudE5hbWUoKVxuICBjb25zdCBtbmVtb25pYyA9IGdlbmVyYXRlTW5lbW9uaWMoKVxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KG5hbWUsIG1uZW1vbmljLCBoZFByaXZhdGVUb1dpZihoZFByaXZhdGVLZXlCdWZmZXIpLCBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKSlcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5UGFpciA9IGFzeW5jKCkgPT4ge1xuICBjb25zdCBtbmVtb25pYyA9IGdlbmVyYXRlTW5lbW9uaWMoKVxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIFxuICByZXR1cm4ge21uZW1vbmljLCBwcml2YXRlX2tleTogaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgcHVibGljX2tleTogaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcil9ICBcbn1cbi8vIGV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleVBhaXIgPSBhc3luYygpID0+IHtcbi8vICAgY29uc3QgeyBwcml2YXRlS2V5LCBwdWJsaWNLZXkgfSA9IGF3YWl0IHN1YnRsZS5nZW5lcmF0ZUtleShcbi8vICAge1xuLy8gICAgIG5hbWU6IFwiRUNEU0FcIixcbi8vICAgICBuYW1lZEN1cnZlOiBcIlAtMjU2XCIsXG4vLyAgIH0sXG4vLyAgIHRydWUsXG4vLyAgIFtcInNpZ25cIiwgXCJ2ZXJpZnlcIl1cbi8vICAgKTtcblxuLy8gICBsZXQgcHJpdmF0ZV9qd2sgPSBhd2FpdCBzdWJ0bGUuZXhwb3J0S2V5KFwiandrXCIsIHByaXZhdGVLZXkpXG4gIFxuLy8gICBsZXQgcHJpdmF0ZV9oZXggPSB0b19oZXgoYWIyYihiYXNlNjR1cmxfZGVjb2RlKHByaXZhdGVfandrLmQhKSkpXG4gIFxuLy8gICAvL1NIQS0yNTYgaGFzaCB3aXRoIGEgMHg4MCBieXRlIGluIGZyb250XG4vLyAgIGxldCBwcml2YXRlX20yNTYgID0gYXdhaXQgc2hhMjU2KCc4MCcrIHByaXZhdGVfaGV4IClcblxuLy8gICAvL1NIQS0yNTYgaGFzaCBvZiB0aGUgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfc2hhMjU2ICA9IGF3YWl0IHNoYTI1Nihwcml2YXRlX20yNTYpXG5cbi8vICAgLy9maXJzdCA0IGJ5dGVzIG9mIHRoZSBzZWNvbmQgU0hBLTI1NiBoYXNoXG4vLyAgIGxldCBwcml2YXRlX2ZvdXIgPSBwcml2YXRlX3NoYTI1Ni5zdWJzdHIoMCw4KTtcblxuLy8gICAvL0Jhc2U1OCBlbmNvZGUgdGhlIGJpbmFyeSBkYXRhIHRvIGdldCBFT1MgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfd2lmID0gZW5jb2RlX2I1OCgnODAnKyBwcml2YXRlX2hleCArIHByaXZhdGVfZm91cilcbi8vICAgY29uc29sZS5sb2coXCJwcml2YXRlX2p3azogXCIsIHByaXZhdGVfandrKVxuXG4vLyAgIGxldCBwdWJsaWNfandrID0gYXdhaXQgc3VidGxlLmV4cG9ydEtleShcImp3a1wiLCBwdWJsaWNLZXkpO1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19qd2s6IFwiLCBwdWJsaWNfandrKVxuICBcbi8vICAgY29uc3QgeF9iaW5hcnkgPSBhYjJiKGJhc2U2NHVybF9kZWNvZGUocHVibGljX2p3ay54ISkpO1xuLy8gICBjb25zdCB5X2JpbmFyeSA9IGFiMmIoYmFzZTY0dXJsX2RlY29kZShwdWJsaWNfandrLnkhKSk7XG4vLyAgIGNvbnN0IHB1YmxpY19iaW5hcnkgPSB4X2JpbmFyeS5jb25jYXQoeV9iaW5hcnkpO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX2JpbmFyeTogXCIsIHB1YmxpY19iaW5hcnkpXG5cbiAgXG4vLyAgIGNvbnN0IHB1YmxpY19yaXBlbWQxNjAgPSBoYXNoLnJpcGVtZDE2MCgpLnVwZGF0ZShuZXcgVWludDhBcnJheShwdWJsaWNfYmluYXJ5KSkuZGlnZXN0KCdoZXgnKTtcbiAgXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3JpcGVtZDE2MDogXCIsIHB1YmxpY19yaXBlbWQxNjApXG4vLyAgIGxldCBjaGVja3N1bSA9IHB1YmxpY19yaXBlbWQxNjAuc3Vic3RyKDAsIDgpOyAvLyDQn9C10YDQstGL0LUgNCDQsdCw0LnRgtCwLCDQvdC+INCyIGhleCDRhNC+0YDQvNCw0YLQtVxuICBcbi8vICAgbGV0IHB1YmxpY193aXRoX2NoZWNrc3VtID0gcHVibGljX2JpbmFyeS5jb25jYXQoXG4vLyAgICAgICBwdWJsaWNfcmlwZW1kMTYwLnN1YnN0cigwLCA4KS5zcGxpdCgnJykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKVxuLy8gICApO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3dpdGhfY2hlY2tzdW06IFwiLCBwdWJsaWNfd2l0aF9jaGVja3N1bSlcblxuLy8gICBsZXQgcHVibGljX2Jhc2U1OCA9IGVuY29kZV9iNTgocHVibGljX3dpdGhfY2hlY2tzdW0ubWFwKHggPT4geC50b1N0cmluZygxNikpLmpvaW4oJycpKTtcblxuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19iYXNlNTg6IFwiLCBwdWJsaWNfYmFzZTU4KVxuXG4vLyAgIGxldCBwdWJsaWNfa2V5ID0gXCJQVUJfUjFfXCIgKyBwdWJsaWNfYmFzZTU4O1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19rZXk6IFwiLCBwdWJsaWNfa2V5KVxuLy8gICByZXR1cm4ge3ByaXZhdGVfd2lmLCBwdWJsaWNfa2V5fVxuLy8gfVxuIl19