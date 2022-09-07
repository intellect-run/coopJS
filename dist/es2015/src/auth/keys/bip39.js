import { validateMnemonic, mnemonicToSeed as mnemonicToSeedBip39, generateMnemonic as gM } from 'bip39';
import EN from 'bip39/src/wordlists/english.json';
export const isValidMnemonic = (mnemonic) => validateMnemonic(mnemonic, EN);
export const mnemonicToSeed = (mnemonic) => mnemonicToSeedBip39(mnemonic).then((seed) => seed.toString('hex'));
export const generateMnemonic = () => gM(null, null, EN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9rZXlzL2JpcDM5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLElBQUksbUJBQW1CLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBRWpELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUVuRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FDakQsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFFNUUsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2YWxpZGF0ZU1uZW1vbmljLCBtbmVtb25pY1RvU2VlZCBhcyBtbmVtb25pY1RvU2VlZEJpcDM5LCBnZW5lcmF0ZU1uZW1vbmljIGFzIGdNIH0gZnJvbSAnYmlwMzknXG5pbXBvcnQgRU4gZnJvbSAnYmlwMzkvc3JjL3dvcmRsaXN0cy9lbmdsaXNoLmpzb24nXG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkTW5lbW9uaWMgPSAobW5lbW9uaWM6IHN0cmluZykgPT4gdmFsaWRhdGVNbmVtb25pYyhtbmVtb25pYywgRU4pXG5cbmV4cG9ydCBjb25zdCBtbmVtb25pY1RvU2VlZCA9IChtbmVtb25pYzogc3RyaW5nKSA9PlxuICBtbmVtb25pY1RvU2VlZEJpcDM5KG1uZW1vbmljKS50aGVuKChzZWVkOiBCdWZmZXIpID0+IHNlZWQudG9TdHJpbmcoJ2hleCcpKVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVNbmVtb25pYyA9ICgpOiBzdHJpbmcgPT4gZ00obnVsbCwgbnVsbCwgRU4pXG4iXX0=