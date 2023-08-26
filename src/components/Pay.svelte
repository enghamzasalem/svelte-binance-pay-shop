
  <script>
    function generateRandomNumberBasedOnTime() {
  const currentTime = new Date().getTime();
  const randomSeed = currentTime % 1000000; // Use the last 6 digits of the current time

  const random = Math.floor(Math.random() * randomSeed);

  return random;
}
  export let data
  export let merchantId
  // export let merchantTradeNo  
  export let defaultTradeType = 'WEB';
  export let defaultCurrency = 'USDT';
  export let defaultProductType = '02';

  let tradeType = defaultTradeType;
  let totalFee = data.priceRange.maxVariantPrice.amount;
  let currency = defaultCurrency;
  let productType = defaultProductType;
  let productName = data.title;
  let productDetail = data.handle;


  let qrcodeLink = '';
  let qrContent = '';
  let checkoutUrl = '';

  async function createOrder() {
    try {
      const response = await fetch('/pay', {
        method: 'POST',
        body: JSON.stringify({
          merchantTradeNo:generateRandomNumberBasedOnTime(),
          tradeType,
          totalFee,
          currency,
          productType,
          productName,
          productDetail
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.status === 'SUCCESS') {
          qrcodeLink = data.data.qrcodeLink;
          qrContent = data.data.qrContent;
          checkoutUrl = data.data.checkoutUrl;
        }
      } else {
        alert("Failed to create Binance Pay order")
        console.error('Failed to create Binance Pay order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<main>
  
  <button  class="mt-6 flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100" on:click={createOrder}>Binance Pay {totalFee}$  </button>

  {#if qrcodeLink}
    <div>
      <h2>QR Code Link:</h2>
      <a href={qrcodeLink} target="_blank">
        <img src={qrcodeLink} alt="QR Code" />
      </a>
    </div>
    <div>
      <h2>QR Content:</h2>
      <a href={qrContent} target="_blank">{qrContent}</a>
    </div>
    <div>
      <h2>Checkout URL:</h2>
      <a href={checkoutUrl} target="_blank">{checkoutUrl}</a>
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 2em;
  }
    .buttonBlue{
    background: 
    #f3bb2b;
    color: white;
    display: block;
    padding: 5px;
    margin: 3px;
    border-radius: 10px;
    font-size: 15px;
}
</style>
