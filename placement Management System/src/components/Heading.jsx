//navbar component
//props :properties
const Heading = function({name,year}){
  //use de-structuring
  return(
    <>
    <h2>welcome {name}</h2>
    <h2>passing year {year}</h2>
    </>
  )
};
export default Heading;   

