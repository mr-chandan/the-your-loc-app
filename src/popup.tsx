import axios from "axios"
import countries from "i18n-iso-countries"
import { Loader2 } from "lucide-react"
import React, { useState } from "react"

import "~style.css"

countries.registerLocale(require("i18n-iso-countries/langs/en.json"))

const Popup: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [ip, setIp] = useState("")
  const [error, seterror] = useState("")

  const fetchData = async () => {
    try {
      setLoading(true)

      const ipResponse = await axios.get("https://api.ipify.org?format=json")
      setIp(ipResponse.data.ip)

      await axios
        .get(`https://ipinfo.io/${ip}?token=${process.env.PLASMO_PUBLIC_TOKEN}`)
        .then((response) => {
          setCountry(response.data?.country)
          setCity(response.data?.city)
        })
    } catch (error) {
      seterror("There was a error location Your location")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 min-h-[500px] min-w-[500px] bg-dark flex flex-col items-center justify-center gap-2">
      <div className="text-primary font-inter">
        {country && city ? (
          <div className="text-sm">
            Your country is {countries.getName(country, "en")} and city is{" "}
            {city}
          </div>
        ) : error ? (
          <div className="text-error text-sm">{error}</div>
        ) : (
          <div className="text-lighttext text-sm">
            Know your location by clicking hear
          </div>
        )}
      </div>

      <button
        className="bg-primary font-inter p-2 rounded-md text-primaryforeground font-[500] text-sm"
        onClick={fetchData}
        disabled={loading}>
        {loading ? (
          <div className=" flex flex-row gap-3 text-center align-middle items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin align-middle " />
            Please wait...
          </div>
        ) : (
          "Show my location"
        )}
      </button>
    </div>
  )
}

export default Popup
