import React, { useState, useEffect } from "react";
import ListaArtikala from "./ListaArtikala";
import axios from "axios";

export default function Faktura() {
  const [skladiste, setSkladiste] = useState([]);
  const [broj, setBroj] = useState();
  const [putnik, setPutnik] = useState([]);
  const [partner, setPartner] = useState([]);
  const [datum, setDatum] = useState();
  const [dpo, setDPO] = useState();
  const [valuta, setValuta] = useState();
  const [narudzbenica, setNarudzbenica] = useState();
  const [nacinIsporuke, setNacinIsporuke] = useState();
  const [vozilo, setVozilo] = useState([]);
  const [vozac, setVozac] = useState([]);
  const [napomena, setNapomena] = useState();
  const [artikli, setArtikli] = useState();
  const [cijena, setCijena] = useState();
  const [stanje, setStanje] = useState();
  const [paketi, setPaketi] = useState();
  const [rabatProc, setRabatProc] = useState();
  const [rabat, setRabat] = useState();
  const [putnik2, setPutnik2] = useState();
  const [porez, setPorez] = useState();
  const [ukupno, setUkupno] = useState();

  const baseURL = "http://192.168.100.9:5000";

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let svaSkladista = await axios.get(`${baseURL}/skladista`);
      let sviPartneri = await axios.get(`${baseURL}/partneri`);
      let sviVozaci = await axios.get(`${baseURL}/vozaci`);
      let svaVozila = await axios.get(`${baseURL}/vozila`);

      setPartner(sviPartneri.data);
      setVozilo(svaVozila.data);
      setVozac(sviVozaci.data);
      setSkladiste(svaSkladista.data);
      console.log("Dohvatio sve");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h1>Loading..</h1>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "gainsboro",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid grey",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <div className="row" style={{ marginTop: "10px" }}>
              <span className="field-name">Skladiste</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                {skladiste.map((elem, index) => (
                  <option>{elem.naziv}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="field-name">Broj</span>
              <input
                type="text"
                value="1"
                style={{ textAlign: "right" }}
                className="input-field"
              ></input>
            </div>
            <div className="row">
              <span className="field-name">Putnik</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                {putnik.map((elem, index) => (
                  <option>{elem.naziv}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="field-name">Partner</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                {partner.map((elem, index) => (
                  <option>{elem.naziv}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="field-name">Datum</span>
              <div>
                <input className="input-field" type="date"></input>
                <span style={{ marginRight: "20px", marginLeft: "50px" }}>
                  DPO
                </span>
                <input className="input-field" type="date"></input>
                <span style={{ marginRight: "20px", marginLeft: "50px" }}>
                  Valuta
                </span>
                <input className="input-field" type="date"></input>
              </div>
            </div>
            <div className="row">
              <span className="field-name">Narudzbenica</span>
              <input
                style={{ width: "calc(85% - 4px)" }}
                className="input-field"
              ></input>
            </div>
            <div className="row">
              <span className="field-name">Nacin isporuke</span>
              <input
                style={{ width: "calc(85% - 4px)" }}
                className="input-field"
              ></input>
            </div>
            <div className="row">
              <span className="field-name">Vozilo</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                {vozilo.map((elem, index) => (
                  <option>{elem.naziv}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="field-name">Vozac</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                {vozac.map((elem, index) => (
                  <option>{elem.naziv}</option>
                ))}
              </select>
            </div>
            {/* <div className="row">
              <span className="field-name">Skladistar</span>
              <select style={{ width: "85%" }} className="input-field">
                <option>Skladistar 1</option>
                <option>Skladistar 2</option>
              </select>
            </div> */}
            <div className="row">
              <span className="field-name">Napomena</span>
              <textarea
                style={{
                  width: "calc(85% - 4px)",
                  height: "50px",
                  resize: "none",
                }}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "gainsboro",
              borderTop: "1px solid grey",
            }}
          >
            <div className="row" style={{ marginTop: "20px" }}>
              <span className="field-name">Artikl</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
              >
                <option>Artikal 1</option>
                <option>Artikal 2</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "1vw",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "32%" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Cijena</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Stanje</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Cijena</span>
                  <input className="input-field"></input>
                </div>
              </div>
              <div style={{ width: "32%", marginLeft: "0.5vw" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Paketi</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Rabat %</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Rabat</span>
                  <input className="input-field"></input>
                </div>
              </div>
              <div style={{ width: "31%", marginLeft: "1vw" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Putnik</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Porez</span>
                  <input className="input-field"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span className="field-name2">Ukupno</span>
                  <input className="input-field"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "gainsboro",
          }}
        >
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "10px",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Novi
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Zatvori
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Storniraj
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Izvjestaj
          </button>
          <div style={{ marginLeft: "10%" }}>
            <input type="checkbox" id="porez" name="porez"></input>
            <label for="porez">Porez</label>
          </div>
          <div style={{ marginLeft: "10%", marginTop: "10px" }}>
            <input type="checkbox" id="zakljuceno" name="zakljuceno"></input>
            <label for="zakljuceno">Zakljuceno</label>
          </div>
          <input
            className="input-field"
            style={{ width: "80%", marginLeft: "10%", marginTop: "10px" }}
          ></input>
          <span style={{ textAlign: "center", marginTop: "10px" }}>
            Proknjizeno
          </span>
          <input
            className="input-field"
            style={{ width: "80%", marginLeft: "10%", marginTop: "10px" }}
          ></input>
          <input
            className="input-field"
            style={{ width: "80%", marginLeft: "10%", marginTop: "10px" }}
          ></input>
          <input
            className="input-field"
            style={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></input>
        </div>
      </div>
      <ListaArtikala />
    </div>
  );
}
