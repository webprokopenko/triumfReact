import BtcAccountService from '../../services/Btc/AccountBtcService';
import ApiBTC from '../../services/Btc/ApiBTC';
import AbstractBlockchain from '../AbstractBlockchain';

class Btc extends AbstractBlockchain{
    constructor(){
        super(BtcAccountService, ApiBTC)
    }
}
export default Btc;