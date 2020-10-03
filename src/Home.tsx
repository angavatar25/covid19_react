import React from 'react';
import './App.scss';
import Axios from 'axios';

class CovidHome extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            penambahan_jumlah_positif: '',
            penambahan_jumlah_meninggal: '',
            penambahan_jumlah_sembuh: '',
            penambahan_jumlah_dirawat: '',
            daftarPenambahan: [],
            total_positif: "",
            total_dirawat: "",
            total_sembuh: "",
            total_meninggal: "",
            total_positif_provinsi: "",
            total_sembuh_provinsi: "",
            total_meninggal_provinsi: "",
            hari_dan_tanggal: '',
            provinsi: '',
            provinsiResult: [],
            provinsiSearchResult: true,
            message: false
        }
    }

    componentDidMount() {
        this.penambahanPerHari();
        this.penambahanArray();
        this.totalCovid();
        this.dataProvinsii();
    }

    provinsiInputHandler = (e:any) => {
        this.setState({
            provinsi: e.target.value
        })
    }

    dataProvinsii = () => {
        const api_key = 'https://indonesia-covid-19.mathdro.id/api/provinsi/'
        Axios.get(api_key)
        .then((response) => {
            const data_provinsi = response.data.data.map((provinsi: any) => {
                return {
                    key: provinsi.fid,
                    text: provinsi.provinsi,
                    kasus_positif: provinsi.kasusPosi,
                    kasus_negatif: provinsi.kasusSemb,
                    kasus_meninggal: provinsi.kasusMeni
                }
            })
            this.setState({
                provinsiResult: data_provinsi
            })
        })
    }

    dataProvinsi = (e:any) => {
        const api_key = 'https://indonesia-covid-19.mathdro.id/api/provinsi/'
        e.preventDefault();
        Axios.get(api_key)
        .then((response) => {
            const data_provinsi = response.data.data.map((provinsi: any) => {
                return {
                    key: provinsi.fid,
                    text: provinsi.provinsi,
                    kasus_positif: provinsi.kasusPosi,
                    kasus_negatif: provinsi.kasusSemb,
                    kasus_meninggal: provinsi.kasusMeni
                }
            })
            this.setState({
                provinsiResult: data_provinsi
            })
            if (this.state.provinsiResult.find((province:any) => province.text === this.state.provinsi)) {
                this.setState({
                    provinsiSearchResult: true,
                    message: false
                })
            } else this.setState({
                provinsiSearchResult: false,
                message: true
            })
        })
    }

    penambahanArray = () => {
        const api_key = 'https://data.covid19.go.id/public/api/update.json';
        Axios.get(api_key)
        .then((response) => {
            const total_covid = response.data.update.total;
            this.setState({
                total_positif: total_covid.jumlah_positif,
                total_dirawat: total_covid.jumlah_dirawat,
                total_meninggal: total_covid.jumlah_meninggal,
                total_sembuh: total_covid.jumlah_sembuh
            })
            const penambahanArray = [
                {key: '1',text: 'Total Jumlah Positif', angka: this.state.total_positif},
                {key: '2',text: 'Total Jumlah Dirawat', angka: this.state.total_dirawat},
                {key: '3',text: 'Total Jumlah Sembuh', angka: this.state.total_sembuh},
                {key: '4',text: 'Total Jumlah Dirawat', angka: this.state.total_dirawat}
            ];
    
            const daftar_penambahan = penambahanArray.map((daftar:any) => {
                return {
                    key: daftar.key,
                    text: daftar.text,
                    angka: daftar.angka
                }
            })
            this.setState({
                daftarPenambahan: daftar_penambahan
            })
        })
    }

    totalCovid = () => {
        const api_key = 'https://data.covid19.go.id/public/api/update.json';
        Axios.get(api_key)
        .then((response) => {
            const total_covid = response.data.update.total;
            this.setState({
                total_positif: total_covid.jumlah_positif,
                total_dirawat: total_covid.jumlah_dirawat,
                total_meninggal: total_covid.jumlah_meninggal,
                total_sembuh: total_covid.jumlah_sembuh
            })
        })
    }

    penambahanPerHari = () => {
        const api_key = 'https://data.covid19.go.id/public/api/update.json';
        var hari = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var get_date = new Date().getDay(); 
        var day = hari[get_date];
        Axios.get(api_key)
        .then((response) => {
            const penambahan_per_hari = response.data.update.penambahan;
            this.setState({
                penambahan_jumlah_positif: penambahan_per_hari.jumlah_positif,
                penambahan_jumlah_meninggal: penambahan_per_hari.jumlah_meninggal,
                penambahan_jumlah_dirawat: penambahan_per_hari.jumlah_dirawat,
                penambahan_jumlah_sembuh: penambahan_per_hari.jumlah_sembuh,
                hari_dan_tanggal: day + ', ' + penambahan_per_hari.tanggal,
            })
        })
    }
    render() {
        const {penambahan_jumlah_positif, 
            penambahan_jumlah_meninggal, 
            penambahan_jumlah_sembuh, 
            penambahan_jumlah_dirawat,
            hari_dan_tanggal,
            provinsi,
            provinsiSearchResult
        } = this.state;

        var {searchResult, message} = this.props

        if(provinsiSearchResult) {
            searchResult = (
                <div>
                    {this.state.provinsiResult.filter((province:any) => province.text === this.state.provinsi).map((filterResult:any) => (
                        <div className="search_result">
                            <h1 className="province">{filterResult.text}</h1>
                            <div className="row mx-0" style={{justifyContent: 'center',}}>
                                <div className="col-md-3 card-container px-0">
                                    <div className="card-content">
                                        <p className="label">Jumlah Positif</p>
                                        <p className="case_amount">{filterResult.kasus_positif} orang</p>
                                    </div>
                                </div>
                                <div className="col-md-3 card-container px-0">
                                    <div className="card-content">
                                        <p className="label">Jumlah Sembuh</p>
                                        <p className="case_amount">{filterResult.kasus_negatif} orang</p>
                                    </div>
                                </div>
                                <div className="col-md-3 card-container px-0">
                                    <div className="card-content">
                                        <p className="label">Jumlah Meninggal</p>
                                        <p className="case_amount">{filterResult.kasus_meninggal} orang</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else if(!provinsiSearchResult) {
            message = (
                <div>
                    <h3>
                        <strong>Provinsi Tidak Tersedia</strong>
                    </h3>
                </div>
            )
        }

        const {total_dirawat, 
            total_meninggal, 
            total_positif, 
            total_sembuh
        } = this.state

        const firstColumn = {
            backgroundColor: '#1E213A',
            minHeight: '100vh',
            padding: '20px'
        }

        const marginBottom = {
            marginBottom: '40px'
        }

        const secondColumn = {
            minHeight: '100vh',
            padding: '20px 50px'
        }

        const weather_style = {
            margin: '50px 0',
            textAlign: "center" as const
        }

        const weather_icon = require('./assets/Shower.png');
        return(
            <div className="home_container">
                <div className="row mx-0">
                    <div className="first_column col-md-4" style={firstColumn}>
                        <h1 style={{textAlign: 'center'}}>Penambahan hari ini</h1>
                        <p style={{textAlign: 'center'}} className="dates">{hari_dan_tanggal}</p>
                        <div className="weather-container" style={weather_style}>
                            <div className="image-weather">
                                <img src={weather_icon} alt=""/>
                            </div>
                            <div className="content">
                                <h1 className="city">Jakarta</h1>
                                <h3 className="degree">32°C</h3>
                            </div>
                        </div>
                        <div className="row mx-0" style={{textAlign: 'center'}}>
                            <div className="col-md-6 card-container px-0">
                                <div className="card-content">
                                    <p className="label">Jumlah Positif</p>
                                    <p className="case_amount">{penambahan_jumlah_positif} orang</p>
                                </div>
                            </div>
                            <div className="col-md-6 card-container px-0">
                                <div className="card-content">
                                    <p className="label">Jumlah Meninggal</p>
                                    <p className="case_amount">{penambahan_jumlah_meninggal} orang</p>
                                </div>
                            </div>
                            <div className="col-md-6 card-container px-0">
                                <div className="card-content">
                                    <p className="label">Jumlah Sembuh</p>
                                    <p className="case_amount">{penambahan_jumlah_sembuh} orang</p>
                                </div>
                            </div>
                            <div className="col-md-6 card-container px-0">
                                <div className="card-content">
                                    <p className="label">Jumlah Dirawat</p>
                                    <p className="case_amount">{penambahan_jumlah_dirawat} orang</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="second_column col-md-8" style={secondColumn}>
                        <h1 style={marginBottom}>Total</h1>
                        <div className="row mx-0" style={marginBottom}>
                            {this.state.daftarPenambahan.map((daftar:any) => {
                                return(
                                    <div className="col-md-3 card-container px-0" key={daftar.key}>
                                        <div className="card-content">
                                            <p className="label">{daftar.text}</p>
                                            <p className="case_amount">{daftar.angka} orang</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="weather-container">
                            <h1>Informasi COVID 19 Per Provinsi</h1>
                            <div className="search_container">
                                <form onSubmit={this.dataProvinsi}>
                                    <input type="search" value={provinsi} onChange={this.provinsiInputHandler} name="input_text" id="input_text" placeholder="Masukkan nama provinsi"/>
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                        {searchResult}
                        {message}
                    </div>
                </div>
            </div>
        )
    }
}

export default CovidHome;