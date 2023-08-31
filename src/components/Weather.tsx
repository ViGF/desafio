'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as dayjs from 'dayjs'
import { WeatherHour } from './WeatherHour'
import 'dayjs/locale/pt-br'

interface LocalizationProps {
  longitude: number
  latitude: number
}

interface WeatherDataProps {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  dt: number
  name: string
  sys: {
    country: string
  }
}

export function Weather() {
  const [localization, setLocalization] = useState<LocalizationProps | null>(
    null,
  )

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)

  dayjs.locale('pt-br')

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords
          setLocalization({ latitude, longitude })
        },
        (error) => {
          console.log(error)
        },
      )

      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state !== 'granted') {
          const defaultLocalization = {
            latitude: -23.5489,
            longitude: -46.6388,
          }

          setLocalization(defaultLocalization)
        }
      })
    }
  }, [])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

    const getWeatherData = async () => {
      if (localization) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${localization.latitude}&lon=${localization.longitude}&lang=pt_br&appid=${apiKey}&units=metric`,
        )
          .then((data) => data.json())
          .then((data) => setWeatherData(data))
      }
    }

    getWeatherData()
  }, [localization])

  return (
    <>
      {weatherData && (
        <>
          <div className="flex flex-1 flex-col max-sm:pb-5 items-center justify-center md:gap-8">
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
              alt="Ilustração de como é o clima. Exemplos: nuvem, sol, nuvem com gotas e raios"
              width={90}
              height={90}
              quality={100}
              className="w-24 h-24"
            />
            <div className="text-center md:text-left px-1">
              <h1 className="text-4xl md:text-5xl">
                {weatherData?.name} - {weatherData?.sys.country}
              </h1>
              <p className="pt-1">
                Última atualização -{' '}
                <span className="font-semibold">
                  {dayjs.unix(weatherData.dt).format('MMMM D, YYYY h:mm A')}
                </span>
              </p>
              <p className="font-semibold">
                {weatherData?.weather[0].description}
              </p>
              <div className="mt-8 px-3 md:px-0 hidden md:block">
                <p className="font-semibold text-left">
                  Próximas temperaturas:
                </p>
                <WeatherHour
                  latitude={localization?.latitude}
                  longitude={localization?.longitude}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 w-full flex-col gap-2 py-20 mt-4 md:mt-0 md:py-0 md:h-[70vh] justify-center items-center md:rounded-tl-full md:rounded-bl-full bg-blue md:max-w-[35vw]">
            <h2 className="font-bold text-8xl">{weatherData?.main.temp}º</h2>
          </div>
          <div className="mt-8 px-3 pb-10 md:hidden">
            <p className="font-semibold text-left">Próximas temperaturas:</p>
            <WeatherHour
              latitude={localization?.latitude}
              longitude={localization?.longitude}
            />
          </div>
        </>
      )}
      {!weatherData && <p>Carregando...</p>}
    </>
  )
}
