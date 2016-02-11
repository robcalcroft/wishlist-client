import React from 'react';
import WishlistBase from '../WishlistBase';
import Spinner from './Spinner';

export default class EditWishlistItem extends WishlistBase {

    constructor() {
        super();

        this.state = {
            loading: true,
            wishlistItem: {}
        };
    }

    loadCurrentData(wishlistItemId) {
        this.wishlistAPI({
            uri: '/api/1/wishlist/item',
            method: 'GET',
            data: { wishlist_item_id: wishlistItemId }
        })
        .then(data => {
            this.setState({
                loading: false,
                wishlistItem: data.result[0]
            });
        })
        .catch(this.errorHandler);
    }

    componentDidUpdate() {
        $('select').material_select();
    }

    componentDidMount() {
        $(`#${this.modalButtonId}`).leanModal();
    }

    componentWillMount() {
        this.modalButtonId = `wishlist-item-edit-button-${this.props.wishlistItemId}`;
        this.modalId = `wishlist-item-edit-modal-${this.props.wishlistItemId}`;
        this.loadCurrentData(this.props.wishlistItemId);
    }

    render() {
        return (
        <div className='editWishlistItem'>
                <button id={this.modalButtonId} data-target={this.modalId} className='modal-trigger darken-1 waves-effect waves-light btn full-width top-spacer-small'>Edit Wishlist Item</button>

                <div id={this.modalId} className='modal bottom-sheet'>
                    <div className='modal-content'>
                        <div className='row'>
                            <div className='col offset-l1 l11 offset-m1 m11 s12'>
                                <h5>Edit a Wishlist Item</h5>
                                {this.props.error ? <b className='red-text'>this.props.error</b> : null}
                                <div className='row'>
                                    <div className='col l6 m8 s12'>
                                        {
                                            this.state.loading ? <Spinner size='small' /> :
                                            <form onSubmit={this.props.updateHandler} data-wishlistitemid={this.props.wishlistItemId}>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='title' type='text' name='title' defaultValue={this.state.wishlistItem.title}  required />
                                                        <label className='active' htmlFor='title'>Title</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='description' type='text' name='description' defaultValue={this.state.wishlistItem.description} />
                                                        <label className='active' htmlFor='description'>Description</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='source_uri' type='text' name='source_uri' defaultValue={this.state.wishlistItem.sourceURI} />
                                                        <label className='active' htmlFor='source_uri'>URL</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='source_name' type='text' name='source_name' defaultValue={this.state.wishlistItem.sourceName} />
                                                        <label className='active' htmlFor='source_name'>Sold by</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='image_uri' type='text' name='image_uri' defaultValue={this.state.wishlistItem.imageURI} />
                                                        <label className='active' htmlFor='image_uri'>Image link</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='price' type='text' name='price' defaultValue={this.state.wishlistItem.price} />
                                                        <label className='active' htmlFor='price'>Price</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <select name='price_currency'>
                                                            <option value=''>Select currency</option>
                                                            <option value='America (United States) Dollars - USD'>America (United States) Dollars – USD</option>
                                                            <option value='Afghanistan Afghanis - AFN'>Afghanistan Afghanis – AFN</option>
                                                            <option value='Albania Leke - ALL'>Albania Leke – ALL</option>
                                                            <option value='Algeria Dinars - DZD'>Algeria Dinars – DZD</option>
                                                            <option value='Argentina Pesos - ARS'>Argentina Pesos – ARS</option>
                                                            <option value='Australia Dollars - AUD'>Australia Dollars – AUD</option>
                                                            <option value='Austria Schillings - ATS'>Austria Schillings – ATS</option>

                                                            <option value='Bahamas Dollars - BSD'>Bahamas Dollars – BSD</option>
                                                            <option value='Bahrain Dinars - BHD'>Bahrain Dinars – BHD</option>
                                                            <option value='Bangladesh Taka - BDT'>Bangladesh Taka – BDT</option>
                                                            <option value='Barbados Dollars - BBD'>Barbados Dollars – BBD</option>
                                                            <option value='Belgium Francs - BEF'>Belgium Francs – BEF</option>
                                                            <option value='Bermuda Dollars - BMD'>Bermuda Dollars – BMD</option>

                                                            <option value='Brazil Reais - BRL'>Brazil Reais – BRL</option>
                                                            <option value='Bulgaria Leva - BGN'>Bulgaria Leva – BGN</option>
                                                            <option value='Canada Dollars - CAD'>Canada Dollars – CAD</option>
                                                            <option value='CFA BCEAO Francs - XOF'>CFA BCEAO Francs – XOF</option>
                                                            <option value='CFA BEAC Francs - XAF'>CFA BEAC Francs – XAF</option>
                                                            <option value='Chile Pesos - CLP'>Chile Pesos – CLP</option>

                                                            <option value='China Yuan Renminbi - CNY'>China Yuan Renminbi – CNY</option>
                                                            <option value='RMB (China Yuan Renminbi) - CNY'>RMB (China Yuan Renminbi) – CNY</option>
                                                            <option value='Colombia Pesos - COP'>Colombia Pesos – COP</option>
                                                            <option value='CFP Francs - XPF'>CFP Francs – XPF</option>
                                                            <option value='Costa Rica Colones - CRC'>Costa Rica Colones – CRC</option>
                                                            <option value='Croatia Kuna - HRK'>Croatia Kuna – HRK</option>

                                                            <option value='Cyprus Pounds - CYP'>Cyprus Pounds – CYP</option>
                                                            <option value='Czech Republic Koruny - CZK'>Czech Republic Koruny – CZK</option>
                                                            <option value='Denmark Kroner - DKK'>Denmark Kroner – DKK</option>
                                                            <option value='Deutsche (Germany) Marks - DEM'>Deutsche (Germany) Marks – DEM</option>
                                                            <option value='Dominican Republic Pesos - DOP'>Dominican Republic Pesos – DOP</option>
                                                            <option value='Dutch (Netherlands) Guilders - NLG'>Dutch (Netherlands) Guilders – NLG</option>

                                                            <option value='Eastern Caribbean Dollars - XCD'>Eastern Caribbean Dollars – XCD</option>
                                                            <option value='Egypt Pounds - EGP'>Egypt Pounds – EGP</option>
                                                            <option value='Estonia Krooni - EEK'>Estonia Krooni – EEK</option>
                                                            <option value='Euro - EUR'>Euro – EUR</option>
                                                            <option value='Fiji Dollars - FJD'>Fiji Dollars – FJD</option>
                                                            <option value='Finland Markkaa - FIM'>Finland Markkaa – FIM</option>

                                                            <option value='France Francs - FRF*'>France Francs – FRF*</option>
                                                            <option value='Germany Deutsche Marks - DEM'>Germany Deutsche Marks – DEM</option>
                                                            <option value='Gold Ounces - XAU'>Gold Ounces – XAU</option>
                                                            <option value='Greece Drachmae - GRD'>Greece Drachmae – GRD</option>
                                                            <option value='Guatemalan Quetzal - GTQ'>Guatemalan Quetzal – GTQ</option>
                                                            <option value='Holland (Netherlands) Guilders - NLG'>Holland (Netherlands) Guilders – NLG</option>
                                                            <option value='Hong Kong Dollars - HKD'>Hong Kong Dollars – HKD</option>

                                                            <option value='Hungary Forint - HUF'>Hungary Forint – HUF</option>
                                                            <option value='Iceland Kronur - ISK'>Iceland Kronur – ISK</option>
                                                            <option value='IMF Special Drawing Right - XDR'>IMF Special Drawing Right – XDR</option>
                                                            <option value='India Rupees - INR'>India Rupees – INR</option>
                                                            <option value='Indonesia Rupiahs - IDR'>Indonesia Rupiahs – IDR</option>
                                                            <option value='Iran Rials - IRR'>Iran Rials – IRR</option>

                                                            <option value='Iraq Dinars - IQD'>Iraq Dinars – IQD</option>
                                                            <option value='Ireland Pounds - IEP*'>Ireland Pounds – IEP*</option>
                                                            <option value='Israel New Shekels - ILS'>Israel New Shekels – ILS</option>
                                                            <option value='Italy Lire - ITL*'>Italy Lire – ITL*</option>
                                                            <option value='Jamaica Dollars - JMD'>Jamaica Dollars – JMD</option>
                                                            <option value='Japan Yen - JPY'>Japan Yen – JPY</option>

                                                            <option value='Jordan Dinars - JOD'>Jordan Dinars – JOD</option>
                                                            <option value='Kenya Shillings - KES'>Kenya Shillings – KES</option>
                                                            <option value='Korea (South) Won - KRW'>Korea (South) Won – KRW</option>
                                                            <option value='Kuwait Dinars - KWD'>Kuwait Dinars – KWD</option>
                                                            <option value='Lebanon Pounds - LBP'>Lebanon Pounds – LBP</option>
                                                            <option value='Luxembourg Francs - LUF'>Luxembourg Francs – LUF</option>

                                                            <option value='Malaysia Ringgits - MYR'>Malaysia Ringgits – MYR</option>
                                                            <option value='Malta Liri - MTL'>Malta Liri – MTL</option>
                                                            <option value='Mauritius Rupees - MUR'>Mauritius Rupees – MUR</option>
                                                            <option value='Mexico Pesos - MXN'>Mexico Pesos – MXN</option>
                                                            <option value='Morocco Dirhams - MAD'>Morocco Dirhams – MAD</option>
                                                            <option value='Netherlands Guilders - NLG'>Netherlands Guilders – NLG</option>

                                                            <option value='New Zealand Dollars - NZD'>New Zealand Dollars – NZD</option>
                                                            <option value='Norway Kroner - NOK'>Norway Kroner – NOK</option>
                                                            <option value='Oman Rials - OMR'>Oman Rials – OMR</option>
                                                            <option value='Pakistan Rupees - PKR'>Pakistan Rupees – PKR</option>
                                                            <option value='Palladium Ounces - XPD'>Palladium Ounces – XPD</option>
                                                            <option value='Peru Nuevos Soles - PEN'>Peru Nuevos Soles – PEN</option>

                                                            <option value='Philippines Pesos - PHP'>Philippines Pesos – PHP</option>
                                                            <option value='Platinum Ounces - XPT'>Platinum Ounces – XPT</option>
                                                            <option value='Poland Zlotych - PLN'>Poland Zlotych – PLN</option>
                                                            <option value='Portugal Escudos - PTE'>Portugal Escudos – PTE</option>
                                                            <option value='Qatar Riyals - QAR'>Qatar Riyals – QAR</option>
                                                            <option value='Romania New Lei - RON'>Romania New Lei – RON</option>

                                                            <option value='Romania Lei - ROL'>Romania Lei – ROL</option>
                                                            <option value='Russia Rubles - RUB'>Russia Rubles – RUB</option>
                                                            <option value='Saudi Arabia Riyals - SAR'>Saudi Arabia Riyals – SAR</option>
                                                            <option value='Silver Ounces - XAG'>Silver Ounces – XAG</option>
                                                            <option value='Singapore Dollars - SGD'>Singapore Dollars – SGD</option>
                                                            <option value='Slovakia Koruny - SKK'>Slovakia Koruny – SKK</option>

                                                            <option value='Slovenia Tolars - SIT'>Slovenia Tolars – SIT</option>
                                                            <option value='South Africa Rand - ZAR'>South Africa Rand – ZAR</option>
                                                            <option value='South Korea Won - KRW'>South Korea Won – KRW</option>
                                                            <option value='Spain Pesetas - ESP'>Spain Pesetas – ESP</option>
                                                            <option value='Special Drawing Rights (IMF) - XDR'>Special Drawing Rights (IMF) – XDR</option>
                                                            <option value='Sri Lanka Rupees - LKR'>Sri Lanka Rupees – LKR</option>

                                                            <option value='Sudan Dinars - SDD'>Sudan Dinars – SDD</option>
                                                            <option value='Sweden Kronor - SEK'>Sweden Kronor – SEK</option>
                                                            <option value='Switzerland Francs - CHF'>Switzerland Francs – CHF</option>
                                                            <option value='Taiwan New Dollars - TWD'>Taiwan New Dollars – TWD</option>
                                                            <option value='Thailand Baht - THB'>Thailand Baht – THB</option>
                                                            <option value='Trinidad and Tobago Dollars - TTD'>Trinidad and Tobago Dollars – TTD</option>

                                                            <option value='Tunisia Dinars - TND'>Tunisia Dinars – TND</option>
                                                            <option value='Turkey New Lira - TRY'>Turkey New Lira – TRY</option>
                                                            <option value='United Arab Emirates Dirhams - AED'>United Arab Emirates Dirhams – AED</option>
                                                            <option value='United Kingdom Pounds - GBP'>United Kingdom Pounds – GBP</option>
                                                            <option value='United States Dollars - USD'>United States Dollars – USD</option>
                                                            <option value='Venezuela Bolivares - VEB'>Venezuela Bolivares – VEB</option>

                                                            <option value='Vietnam Dong - VND'>Vietnam Dong – VND</option>
                                                            <option value='Zambia Kwacha - ZMK'>Zambia Kwacha – ZMK</option>
                                                        </select>
                                                        <label>Price Currency</label>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='input-field'>
                                                            <select name='price_currency_symbol'>
                                                                <option value=''>Select currency symbol</option>
                                                                <option value='£'>£</option>
                                                                <option value='$'>$</option>
                                                                <option value='€'>€</option>
                                                            </select>
                                                            <label>Currency Symbol</label>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='input-field'>
                                                            <select name='user_priority'>
                                                                <option value=''>Select item priority</option>
                                                                <option value='5'>I must have this</option>
                                                                <option value='4'>This would be great</option>
                                                                <option value='3'>I'd like this</option>
                                                                <option value='2'>I'm not too bothered about this</option>
                                                                <option value='1'>I'm not sure if I still want this</option>
                                                            </select>
                                                            <label>Priority</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type='submit' className='waves-effect waves-light btn'>Update Wishlist Item</button>
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
