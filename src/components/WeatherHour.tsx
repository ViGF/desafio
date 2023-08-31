'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface LocalizationProps {
  longitude: number | undefined
  latitude: number | undefined
}

interface WeatherDataProps {
  list: {
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
  }[]
  city: {
    name: string
    country: string
  }
}

export function WeatherHour({ latitude, longitude }: LocalizationProps) {
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

    const getWeatherData = async () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=${apiKey}&units=metric&cnt=5`,
      )
        .then((data) => data.json())
        .then((data) => setWeatherData(data))
    }

    getWeatherData()
  }, [latitude, longitude])

  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {weatherData?.list.map((data) => {
        return (
          <div className="flex pt-2" key={data.dt}>
            <div className="flex flex-col justify-center items-center bg-primary px-6 py-4 rounded font-semibold">
              <p className="text-xs">{dayjs.unix(data.dt).format('DD MMM')}</p>
              <p className="text-sm">{dayjs.unix(data.dt).format('h:mm A')}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt="Ilustração de uma nuvem cobrindo a metade do sol e gotas de água"
                width={50}
                height={50}
                quality={100}
                className="w-12 h-12"
              />
              <p className="mb-2">{data.main.temp}º</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
