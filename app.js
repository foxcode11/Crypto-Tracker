const form =document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');
var update

form.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    if(update)
    { 
        clearTimeout(update);
    }
    const ctype=form.elements.coinType.value;
    fetchPrice(ctype);
});

const fetchPrice=async(ctype)=>{
    const r=await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`)

    const name=r.data.coin.name;
    const price=r.data.coin.price;
    const volume=r.data.coin.volume;
    const change=r.data.coin.priceChange1d;
    const img=r.data.coin.icon;

    res.innerHTML=`
<tr>
    <th>Property</th>
    <th>Value</th>
</tr>
<tr>
    <td >Icon</td>
    <td ><img src="${img}"></td>
</tr>
<tr>
    <td>Name</td>
    <td>${name}</td>
</tr>
<tr>
    <td>Price</td>
    <td>${price}</td>
</tr>
<tr>
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr>
    <td>Last Updated</td>
    <td>${change}</td>
</tr>`
}

update=setTimeout(()=>fetchPrice(ctype),10000);