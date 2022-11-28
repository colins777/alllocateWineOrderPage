import React, {useCallback, useEffect} from "react";
import './App.scss';
import Producer from "./components/Producer/Producer";
import {getProducers, setCurrency, setTotalCost, addCounter, setCounter} from "./redux/features/producers/producersSlice";
import {useSelector, useDispatch} from "react-redux";

function App() {
    //dispatch for changing state of component
    //useDispatch() - hook
    const dispatch = useDispatch();

    const producers = useSelector(state => state.producersData.producers);
    const currency = useSelector(state => state.producersData.currency);
    const totalCost = useSelector(state => state.producersData.total_cost);
    const storageFee = useSelector(state => state.producersData.storage_fee);
    const isLoading = useSelector(state => state.producersData.loading);
    const subtotal = useSelector(state =>
        state.producersData.subtotal);

   // const {producers, currency, totalCost, isLoading, subtotal } = useSelector(state => state.producersData);

    console.log('state.producersData.producers', useSelector(state => state.producersData));
    //test!!!!!!!!!!!!!!!!!
    const counter = useSelector(state =>
           state.producersData.counter
    );

    const plusCounter = () => {
        console.log()
    }

    useEffect(() => {
        dispatch(getProducers())
    }, []);

  return (
    <div className="App">
        <div className="counter">
            <button onClick={() => plusCounter()}>Counter</button>
            <div>Counter: {counter}</div>
        </div>

        <div className="allocation-top-block">
            <span>Allocations</span>
            <a href='#'>View timeline</a>
        </div>

        <div>
            <h2>INAUGURAL EVENT</h2>
            <span>Offered</span>
        </div>

        <div className="register-descision">
            <div className="icon">
                <img src="" alt=""/>
            </div>
            <div className="register-descision__text">
                <h3 className="title">Register your decision</h3>
                <p className="des-text">You can make changes until 08 Oct 2021.</p>
            </div>
        </div>

        <div className="allocation-number">
            <h3 className="allocation-code">
                <span>ALLOCATION NUMBER:</span>
                <span>A009202100002</span>
            </h3>
            <div className="allocation-content">
                <div className="allocation-column">
                    <div className="column-block">
                        <span className="title">
                            Allocation offer
                        </span>
                        <span className="event">
                            Inaugural Event
                        </span>
                    </div>

                    <div className="column-block">
                        <span className="title">
                            Status
                        </span>
                        <span className="event">
                            Offered
                        </span>
                    </div>
                </div>

                <div className="allocation-column">
                    <div className="column-block">
                        <span className="title">
                            <span>Confirmation deadline</span>
                            <div className="icon">
                                <img src="" alt=""/>
                            </div>
                        </span>
                        <span className="event">
                            08 Oct 2021, 23:59 (GMT+8)
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="personal-allocation">
            <h3>YOUR PERSONAL ALLOCATION</h3>
            <p className="personal-allocation__text">
                You can decide which producer allocations to accept or decline. By accepting a producer allocation,
                you agree to take all wines you originally requested from that producer.
            </p>
        </div>

        <div className="checkbox-all-block">
            <input type="checkbox" className="form-control"/>
            <div className="right-side">
                <a className="allocation-btn" href="">SHIP / STORE</a>
                <a className="allocation-btn" href="">ACCEPT ALL PRODUCERS</a>
                <a className="allocation-btn" href="">DECLINE ALL PRODUCERS</a>
            </div>
        </div>

        {isLoading && <h1>Form loading...</h1>}

        <form className="producers-table">
            { producers && producers.map((producer, index) => (
               <Producer producerData={producer}
                         producerId={producer.id}
                         currency={currency}
                         key={index}
               />
            ))
            }

            <div className="expert-advices">
                <div className="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        enableBackground="new 0 0 302.967 302.967"
                        version="1.1"
                        viewBox="0 0 302.967 302.967"
                        xmlSpace="preserve"
                    >
                        <path
                            fill="#010002"
                            d="M151.483 302.967C67.956 302.967 0 235.017 0 151.483S67.956 0 151.483 0s151.483 67.956 151.483 151.483-67.949 151.484-151.483 151.484zm0-278.551c-70.066 0-127.067 57.001-127.067 127.067S81.417 278.55 151.483 278.55 278.55 221.549 278.55 151.483 221.555 24.416 151.483 24.416z"
                        ></path>
                        <path
                            fill="#010002"
                            d="M116.586 118.12c1.795-4.607 4.297-8.588 7.511-11.961 3.225-3.389 7.114-6.016 11.667-7.898 4.547-1.904 9.633-2.845 15.262-2.845 7.261 0 13.32.995 18.183 2.997 4.857 1.996 8.768 4.482 11.738 7.441 2.964 2.97 5.091 6.168 6.369 9.584 1.273 3.432 1.915 6.636 1.915 9.595 0 4.901-.642 8.947-1.915 12.118-1.278 3.171-2.866 5.88-4.759 8.131-1.898 2.252-3.987 4.172-6.293 5.755a147.159 147.159 0 00-6.516 4.759 30.34 30.34 0 00-5.445 5.439c-1.588 2.04-2.589 4.601-2.991 7.664v5.831H140.6v-6.908c.305-4.395 1.153-8.072 2.529-11.036 1.382-2.964 2.991-5.499 4.83-7.598 1.844-2.089 3.786-3.911 5.836-5.445a105.25 105.25 0 005.673-4.591c1.73-1.545 3.144-3.225 4.221-5.069 1.071-1.833 1.556-4.15 1.452-6.908 0-4.705-1.148-8.18-3.454-10.427-2.295-2.257-5.493-3.378-9.589-3.378-2.758 0-5.134.533-7.131 1.605s-3.628 2.513-4.911 4.302c-1.278 1.795-2.225 3.894-2.834 6.288-.615 2.415-.919 4.982-.919 7.756h-22.55c.097-5.536 1.038-10.589 2.833-15.201zm45.95 65.818v23.616h-24.09v-23.616h24.09z"
                        ></path>
                    </svg>
                </div>

                    <div className="expert-advices__content">
                        <h3 className="expert-advices__title">
                            NEED SOME EXPERT ADVICES?
                        </h3>
                        <div className="expert-advices__text">
                            <span className="expert-advices__top">Contact our relationship managers at </span>
                            <a href="mailto:hello@allocate.wine" className="expert-advices__mail">hello@allocate.wine</a>
                        </div>
                    </div>

            </div>

            <div className="offer-summary">
                <div className="block-title">
                    ALLOCATION OFFER SUMMARY
                </div>
                <div className="offer-summary__content">
                    <div className="offer-summary__row">
                        <span className="subtotal-title">Subtotal</span>
                        <span className="subtotal-summ">{currency}{subtotal}</span>
                    </div>

                    <div className="offer-summary__row shipping-block">
                        <div className="shipping-rows">
                            <span>Indicative shipping cost (More details)</span>
                            <span>Indicative shipping cost ( (inclusive of insurance, duties, and taxes when applicable)</span>
                            <p>Shipping rates shown are based on air freight and are subject to change given the ongoing volatility in global logistics. Option for sea freight may also be available.</p>
                            <a className="shipping-policy-link">View our shipping policy</a>
                        </div>
                        <span className="subtotal-summ">{currency}401.60</span>
                    </div>

                    <div className="offer-summary__row">
                        <span className="subtotal-title">Storage fee (<span className="more-details">More details</span>)</span>
                        <span className="subtotal-summ">{currency}{storageFee}</span>
                    </div>

                    <div className="offer-summary__row total-allocation">
                        <span className="total-allocation__title">Total allocation offer</span>
                        <span className="total-allocation__summ">{currency}{totalCost}</span>
                        <input type="hidden" name="allocation_total_summ" value={totalCost}/>
                    </div>
                </div>
            </div>
        </form>

    </div>
  );
}

export default App;