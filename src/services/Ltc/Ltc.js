import LtcAccountService from './AccountLtcService';
import ApiLTC from './ApiLTC';
import AbstractBlockchain from '../AbstractBlockchain';

class Ltc extends AbstractBlockchain{
    constructor(){
        super(LtcAccountService, ApiLTC);
    }
}
export default Ltc;