import { Box, Card, styled } from '@mui/material';

const WeatherCard = styled(Card)({
  width: 350,
  height: 235,
  position: 'relative',
  padding: 25,
  background:
    'radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%), #FFFFFF',
  boxShadow:
    '0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
  borderRadius: 23,
  transition:
    'all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CardHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  '& span:first-of-type': {
    wordBreak: 'break-all',
    fontWeight: 800,
    fontSize: 15,
    lineHeight: '135%',
    color: 'rgba(87, 77, 51, 0.66)',
  },
  '& span:last-child': {
    fontWeight: 700,
    fontSize: 15,
    lineHeight: '135%',
    color: 'rgba(87, 77, 51, 0.33)',
  },
});

const Temperature = styled(Box)({
  position: 'absolute',
  left: 25,
  bottom: 12,
  fontWeight: 700,
  fontSize: 64,
  lineHeight: '77px',
  color: 'rgba(87, 77, 51, 1)',
});

const WeatherInfo = styled(Box)({
  position: 'absolute',
  right: 25,
  bottom: 25,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  '& > div': {
    padding: '8px 12px',
    background: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 9,
    fontWeight: 700,
    fontSize: 13,
    color: 'rgba(87, 77, 51, 0.66)',
  },
});

type WeatherData = {
  value: number;
  unit: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
};

export const DisplayWeather = ({
  data,
}: {
  data: WeatherData;
}) => {
  return (
    <WeatherCard>
      <CardHeader>
        <span>{data.description}</span>
        <span>
          {new Date().toLocaleDateString('ja-JP')}
        </span>
      </CardHeader>
      <Temperature>
        {data.temperature}°C
      </Temperature>
      <WeatherInfo>
        <div>湿度: {data.humidity}%</div>
        <div>気圧: {data.pressure}hPa</div>
        <div>風速: {data.windSpeed}m/s</div>
      </WeatherInfo>
    </WeatherCard>
  );
};
