import { validateMnemonic, mnemonicToSeed as mnemonicToSeedBip39, generateMnemonic as gM } from 'bip39';
import EN from 'bip39/src/wordlists/english.json';
export var isValidMnemonic = function (mnemonic) { return validateMnemonic(mnemonic, EN); };
export var mnemonicToSeed = function (mnemonic) {
    return mnemonicToSeedBip39(mnemonic).then(function (seed) { return seed.toString('hex'); });
};
export var generateMnemonic = function () { return gM(null, null, EN); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9rZXlzL2JpcDM5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLElBQUksbUJBQW1CLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBRWpELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxVQUFDLFFBQWdCLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQTlCLENBQThCLENBQUE7QUFFbkYsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLFVBQUMsUUFBZ0I7SUFDN0MsT0FBQSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFZLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDO0FBQTFFLENBQTBFLENBQUE7QUFFNUUsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsY0FBYyxPQUFBLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFsQixDQUFrQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmFsaWRhdGVNbmVtb25pYywgbW5lbW9uaWNUb1NlZWQgYXMgbW5lbW9uaWNUb1NlZWRCaXAzOSwgZ2VuZXJhdGVNbmVtb25pYyBhcyBnTSB9IGZyb20gJ2JpcDM5J1xuaW1wb3J0IEVOIGZyb20gJ2JpcDM5L3NyYy93b3JkbGlzdHMvZW5nbGlzaC5qc29uJ1xuXG5leHBvcnQgY29uc3QgaXNWYWxpZE1uZW1vbmljID0gKG1uZW1vbmljOiBzdHJpbmcpID0+IHZhbGlkYXRlTW5lbW9uaWMobW5lbW9uaWMsIEVOKVxuXG5leHBvcnQgY29uc3QgbW5lbW9uaWNUb1NlZWQgPSAobW5lbW9uaWM6IHN0cmluZykgPT5cbiAgbW5lbW9uaWNUb1NlZWRCaXAzOShtbmVtb25pYykudGhlbigoc2VlZDogQnVmZmVyKSA9PiBzZWVkLnRvU3RyaW5nKCdoZXgnKSlcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlTW5lbW9uaWMgPSAoKTogc3RyaW5nID0+IGdNKG51bGwsIG51bGwsIEVOKVxuIl19