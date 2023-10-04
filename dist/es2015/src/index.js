/// <reference path="./eos-api.d.ts" />
export { makePublicKeyByMnemonic, generateAccount, makeAccountByMnemonic, makeAccountByWif, generateKeyPair } from './auth';
export { isValidWif } from './auth/keys/ecc';
export { default as ChainsSingleton } from './blockchain/chainsSingleton';
export { default as ReadApi } from './blockchain/readApi';
export { default as BaseContract } from './blockchain/contracts/base';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdUNBQXVDO0FBRXZDLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsZUFBZSxFQUVmLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNsQixNQUFNLFFBQVEsQ0FBQTtBQUVmLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUUxQyxPQUFPLEVBQUMsT0FBTyxJQUFJLGVBQWUsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBRXZFLE9BQU8sRUFBQyxPQUFPLElBQUksT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFFdkQsT0FBTyxFQUFDLE9BQU8sSUFBSSxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2Vvcy1hcGkuZC50c1wiIC8+XG5cbmV4cG9ydCB7XG4gICAgbWFrZVB1YmxpY0tleUJ5TW5lbW9uaWMsXG4gICAgZ2VuZXJhdGVBY2NvdW50LFxuICAgIEFjY291bnREYXRhLFxuICAgIG1ha2VBY2NvdW50QnlNbmVtb25pYyxcbiAgICBtYWtlQWNjb3VudEJ5V2lmLFxuICAgIGdlbmVyYXRlS2V5UGFpclxufSBmcm9tICcuL2F1dGgnXG5cbmV4cG9ydCB7aXNWYWxpZFdpZn0gZnJvbSAnLi9hdXRoL2tleXMvZWNjJ1xuXG5leHBvcnQge2RlZmF1bHQgYXMgQ2hhaW5zU2luZ2xldG9ufSBmcm9tICcuL2Jsb2NrY2hhaW4vY2hhaW5zU2luZ2xldG9uJ1xuXG5leHBvcnQge2RlZmF1bHQgYXMgUmVhZEFwaX0gZnJvbSAnLi9ibG9ja2NoYWluL3JlYWRBcGknXG5leHBvcnQge1RhYmxlQ29kZUNvbmZpZ30gZnJvbSAnLi9ibG9ja2NoYWluL3R5cGVzJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIEJhc2VDb250cmFjdH0gZnJvbSAnLi9ibG9ja2NoYWluL2NvbnRyYWN0cy9iYXNlJ1xuIl19