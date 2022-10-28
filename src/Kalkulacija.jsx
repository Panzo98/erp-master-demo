import React, { useState, useEffect } from "react";
import ListaArtikala from "./ListaArtikala";
import axios from "axios";

export default function Kalkulacija() {
  const [selectedSkladiste, setSelectedSkladiste] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedArtikal, setSelectedArtikal] = useState(null);
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
  const [artikli, setArtikli] = useState([]);
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

  const changeSkladiste = async (e) => {
    try {
      let response = await axios.get(
        `${baseURL}/skladiste_ima_artikal/${JSON.parse(e.target.value).id}`
      );
      setSelectedArtikal(null);
      setArtikli(response.data);
      setSelectedSkladiste(JSON.parse(e.target.value));
    } catch (error) {
      alert("error");
    }
  };

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
                selected={selectedSkladiste?.naziv}
                onChange={changeSkladiste}
              >
                <option value={null} selected disabled hidden></option>
                {skladiste.map((elem, index) => (
                  <option value={JSON.stringify(elem)}>{elem.naziv}</option>
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
              <span className="field-name">Partner</span>
              <select
                style={{ width: "30%", height: "36px" }}
                className="input-field"
                selected={selectedPartner?.name}
                onChange={(e) => setSelectedPartner(JSON.parse(e.target.value))}
              >
                <option value={null} selected disabled hidden></option>
                {partner.map((elem, index) => (
                  <option value={JSON.stringify(elem)}>{elem.naziv}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <span className="field-name">Datum</span>
              <div>
                <input className="input-field" type="date"></input>
                <span style={{ marginRight: "20px", marginLeft: "50px" }}>
                  Valuta
                </span>
                <input className="input-field" type="date"></input>
              </div>
            </div>
            <div className="row">
              <span className="field-name">Dokument</span>
              <input
                style={{ width: "calc(85% - 4px)" }}
                className="input-field"
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "1vw",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "32%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "15px",
                  }}
                >
                  <span className="field-name2">Izvorna vr.</span>
                  <input className="input-field"></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "15px",
                  }}
                >
                  <span className="field-name2">Fakturna vr.</span>
                  <input className="input-field"></input>
                </div>
              </div>
              <div style={{ width: "32%", marginLeft: "0.5vw" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "15px",
                  }}
                >
                  <span className="field-name2">Kurs</span>
                  <input className="input-field"></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "15px",
                  }}
                >
                  <span className="field-name2">Rabat </span>
                  <input className="input-field"></input>
                </div>
              </div>
              <div style={{ width: "31%", marginLeft: "1vw" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "15px",
                  }}
                >
                  <span className="field-name2">Neop. troskovi</span>
                  <input className="input-field"></input>
                </div>
              </div>
            </div>

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
              <span className="field-name">Artikal</span>
              <select
                style={{ width: "85%", height: "36px" }}
                className="input-field"
                onChange={(e) => {
                  if (!JSON.parse(e.target.value))
                    return setSelectedArtikal("");
                  setSelectedArtikal(JSON.parse(e.target.value));
                }}
                selected={selectedArtikal?.naziv ? selectedArtikal?.naziv : ""}
                defaultValue={selectedArtikal}
              >
                <option value={""} selected disabled></option>
                {artikli.map((elem, index) => (
                  <option value={JSON.stringify(elem.artikal)}>
                    {elem?.artikal?.naziv}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "1vw",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "23.7%" }}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Vrijednost fakture dobavljaca
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                <span className="field-name2">Kolicina</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Izvorna cijena</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Fakturna cijena</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Vrijednost</span>
                <input className="input-field"></input>
              </div>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Ulazni PDV
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Uvecanje</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Ulazni PDV</span>
                <input className="input-field"></input>
              </div>
            </div>
            <div style={{ width: "23.7%", marginLeft: "0.5vw" }}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Rabat{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Rabat %</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Po jedinici</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Vrijednost</span>
                <input className="input-field"></input>
              </div>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Neoporezivi troskovi{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Iznos </span>
                <input className="input-field"></input>
              </div>
            </div>
            <div style={{ width: "23.7%", marginLeft: "1vw" }}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Zavisni troskovi{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Grupe</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">%</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Po jedinici</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Vrijednost</span>
                <input className="input-field"></input>
              </div>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Razlika u cijeni
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">%</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Po jedinici</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Vrijednost</span>
                <input className="input-field"></input>
              </div>
            </div>
            <div style={{ width: "23.7%", marginLeft: "1vw" }}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Troskovi
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Uvecanje</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Akciza</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Taksa</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Carina</span>
                <input className="input-field"></input>
              </div>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Kalkulisanje vrijednosti{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Izlazni PDV</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Cijena</span>
                <input className="input-field"></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                }}
              >
                <span className="field-name2">Vrijednost</span>
                <input className="input-field"></input>
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
            Knjizi
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
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Izvjestaj 2
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Izvjestaj 3 (MP)
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Izvjestaj 4 (Ulaz mat.)
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Cijene
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Brisi stavku
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Brisi dokument
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Barcode import
          </button>
          <button
            style={{
              width: "80%",
              marginLeft: "10%",
              height: "40px",
              marginBottom: "15px",
            }}
          >
            Serije i rokovi
          </button>
          <div style={{ marginLeft: "10%" }}>
            <input type="checkbox" id="porez" name="porez"></input>
            <label for="porez">Bez PDV-a</label>
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
        </div>
      </div>
      {/* <ListaArtikala /> */}
    </div>
  );
}
