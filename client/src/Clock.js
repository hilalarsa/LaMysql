import React from 'react';
import moment from 'moment';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        var {par} = props
        var {val} = props
        console.log("ini props clock:"+par)
        console.log(val);
        // let fixDate = (new Date()).setHours(15, 0, 0); // for 3:00:00 pm
        let currDate = new Date();
        this.state = {
            serverDate:'',//waktu server
            serverTime:'', //waktu server
            presentTime: new Date("HH:mm:ss"),
            countdown:'',
            currentTime: moment(moment().format("HH:mm:ss")),
            future:'',
            timeLeft:'',
            par:localStorage.getItem('id_jadwal')
            // const currentDate = moment();
            // const future = moment('10:03:02');
            // const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss");
            // diff: fixDate - currDate
        };
    }

    componentDidMount() {
        let self = this;
        // let par = this.props.par
        const {par} = this.state
        console.log("par par par"+par)

        // fetch('http://localhost:5000/getIdJadwal/', { //ambil id dari jadwal
        //     method: 'GET'
        // }).then(function (response) {
        //     if (response.status >= 400) {
        //         throw new Error("Bad response from server");
        //     }
        //     return response.json();
        // }).then(function (data) {
        //     self.setState({ future: moment(`${data.serverDate} ${data.serverTime}`, "YYYY-MM-DD HH:mm:ss") })

        // }).catch(err => {
        //     console.log('caught it!', err);
        // })

        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/sesi/getCurrentTime/' + par, { //ambil waktu dari jadwal
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            console.log(JSON.stringify(response))
            return response.json();
        }).then(function (data) {
            // console.log(data)
            // self.setState({ serverDate: data[0].serverDate })
            // self.setState({ serverTime: data[0].serverTime })
            // var now = moment("04/09/2013 15:00:00");
            // var then = moment("04/09/2013 14:20:30");

            // console.log("GET DATA FUTURE!")
            
            // console.log(data.serverTime);
            self.setState({ future: moment(`${data.serverDate} ${data.serverTime}`,"YYYY-MM-DD HH:mm:ss")})

        }).catch(err => {
            console.log('caught it!', err);
        })

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        var now = moment(moment().format("YYYY-MM-DD HH:mm:ss"))
        var then = this.state.future

    //    var now = "04/09/2013 15:00:00";
    //    var then = "04/09/2013 14:20:30";

    //    console.log(moment.utc(moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"))

       var ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"));
       var d = moment.duration(ms);
       var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");   

    //    console.log(s)
        // console.log(moment(moment(then.diff(now))).format("HH:mm:ss"))
        
        
        // console.log(diff)
        this.setState((prevState, props) => ({
            timeLeft: s
        }));
        // console.log(moment(moment.duration('20:59:59')).format("hh:mm:ss"))
        // console.log(this.state.future)
        // console.log(moment(moment.duration(this.state.future.diff(this.state.currentTime))).format("hh:mm:ss"))
        // console.log(moment(moment.duration(this.state.currentTime.diff(this.state.future))).format("hh:mm:ss"))
    
        // this.setState({timeLeft: 
        //     // moment.duration(
        //     //     this.state.future(this.state.currentTime)
        //     // )
        //     this.state.currentTime-this.state.future
        // })
        // console.log(this.state.timeLeft)
    }

    render() {
        const { timeLeft } = this.state;

        // console.log(countdown)
        // const hours = Math.floor(diff / (60 * 60 * 1000));
        // const mins = Math.floor((diff - (hours * 60 * 60 * 1000)) / (60 * 1000));
        // const secs = Math.floor((diff - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000);

        return (
            <div>
                <p>{timeLeft} </p>
            </div>
        );
    }
}