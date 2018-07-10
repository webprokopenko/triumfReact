import BchAccountService from './AccountBchService';
import ApiBCH from './ApiBCH';
import AbstractBlockchain from '../AbstractBlockchain';

class Bch extends AbstractBlockchain{
    constructor(){
        super(BchAccountService, ApiBCH);
    }
}
export default Bch;