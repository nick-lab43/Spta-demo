const ALLOWED_ORIGIN='https://nick-lab43.github.io';
const LAT=-23.9045;
const LON=29.4689;
const USER_AGENT='SPTA-Polokwane-Weather/1.0 (+https://nick-lab43.github.io/Spta-demo/)';
function json(body,status,headers={}){return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});}
function cors(origin){return {'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'Accept','Access-Control-Max-Age':'86400','Vary':'Origin'};}
function conditionFromSymbol(symbol=''){
 const s=symbol.toLowerCase();
 if(s.includes('thunder'))return 'Thunderstorms';
 if(s.includes('snow'))return 'Snow';
 if(s.includes('sleet'))return 'Sleet';
 if(s.includes('rain'))return s.includes('heavyrain')?'Heavy rain':'Rain';
 if(s.includes('fog'))return 'Fog';
 if(s.includes('clearsky'))return 'Clear sky';
 if(s.includes('fair'))return 'Fair';
 if(s.includes('partlycloudy'))return 'Partly cloudy';
 if(s.includes('cloudy'))return 'Cloudy';
 return 'Variable conditions';
}
export default {async fetch(request){
 const origin=request.headers.get('Origin')||'';
 if(origin!==ALLOWED_ORIGIN)return json({error:'Origin not allowed'},403);
 const headers=cors(origin);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='GET')return json({error:'Method not allowed'},405,headers);
 const url=new URL('https://api.met.no/weatherapi/locationforecast/2.0/complete');
 url.search=new URLSearchParams({lat:String(LAT),lon:String(LON)}).toString();
 try{
  const upstream=await fetch(url.toString(),{headers:{Accept:'application/json','User-Agent':USER_AGENT},cf:{cacheTtl:10800,cacheEverything:true}});
  if(!upstream.ok)return json({error:'Weather provider request failed'},502,headers);
  const payload=await upstream.json();
  const series=payload.properties?.timeseries;
  if(!Array.isArray(series)||!series.length)return json({error:'Weather provider returned incomplete data'},502,headers);
  const first=series[0],instant=first.data?.instant?.details||{};
  const symbol=first.data?.next_1_hours?.summary?.symbol_code||first.data?.next_6_hours?.summary?.symbol_code||'';
  const rainNext6h=series.slice(0,6).reduce((sum,item)=>sum+Number(item.data?.next_1_hours?.details?.precipitation_amount||0),0);
  const result={temperature:Number(instant.air_temperature),feelsLike:Number.isFinite(Number(instant.apparent_air_temperature))?Number(instant.apparent_air_temperature):null,humidity:Number.isFinite(Number(instant.relative_humidity))?Number(instant.relative_humidity):null,windSpeed:Number.isFinite(Number(instant.wind_speed))?Number(instant.wind_speed)*3.6:null,rainNext6h:Number.isFinite(rainNext6h)?Math.round(rainNext6h*10)/10:null,symbol,condition:conditionFromSymbol(symbol),updatedAt:first.time};
  if(!Number.isFinite(result.temperature))return json({error:'Temperature unavailable'},502,headers);
  return new Response(JSON.stringify(result),{status:200,headers:{...headers,'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=10800'}});
 }catch{return json({error:'Weather provider is temporarily unavailable'},502,headers);}
}};
