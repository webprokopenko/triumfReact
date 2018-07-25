import BtgAccountService from './AccountBtgService';
import ApiBTG from './ApiBTG';
import AbstractBlockchain from '../AbstractBlockchain';

class Btg extends AbstractBlockchain{
    constructor(){
        super(BtgAccountService, ApiBTG);
    }
}
export default Btg;