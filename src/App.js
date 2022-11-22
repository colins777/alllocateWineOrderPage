import React, {useCallback, useEffect} from "react";
import './App.scss';
import Producer from "./components/Producer/Producer";

import {useState} from 'react'
import {UseCallback} from 'react'
import axios from "axios";

function App() {

  //console.log('TEst!!!')

    const [producers, setProducers] = useState(null);

    const fetchProducers = useCallback(async () => {
        const {data} = await axios.get('http://localhost:3004/producers')

        setProducers(data)
       // console.log('producers', data)

    }, [])

    useEffect(() => {
        fetchProducers()

        console.log('producers', producers)
    }, [fetchProducers])



  return (
    <div className="App">
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


        <form className="producers-table">
            { producers && producers.map((producer, index) => (
               <Producer producerData={producer}/>
            ))
            }

        </form>

    </div>
  );
}

export default App;
