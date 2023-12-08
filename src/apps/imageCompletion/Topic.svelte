<script>
  import checkmark from './assets/checkmark.svg'
  import WideButton from "@lib/WideButton.svelte"

  export let topic

  let selected = undefined

  const topics = [
      {
        name: 'Transportation',
        img: 'https://i.pinimg.com/564x/d0/92/c2/d092c2e0473bca9180c523887d8722ef.jpg',
      },
      {
        name: 'Household appliance',
        img: 'https://i.pinimg.com/564x/f1/c8/63/f1c863cbf93fcaa82825e3a699f51344.jpg',
      },
      {
        name: 'Electronic Products',
        img: 'https://i.pinimg.com/564x/1c/3e/a5/1c3ea5b14e57483c6cd42dc1b3866607.jpg',
      },
      {
        name: 'Furniture & Interior Design',
        img: 'https://i.pinimg.com/564x/f6/56/4e/f6564e1921fd3433e1f44e7f90a5fd1e.jpg',
      },
    ]

  function select(topic) {
    if (selected === topic) {
      selected = undefined
    } else {
      selected =topic
    }
  } 
</script>

<div class="topic-selection">
    <h1>Which of the following areas do you want to design?</h1>
    
    <div class="selections">
      {#each topics as topic}
        <button on:click={ () => select(topic) } >
          <div class="card">
            <div class="shade"></div>
            <h3>{topic.name}</h3>
            <img src={topic.img} alt="Choose topic {topic.name}">
            {#if selected === topic}
              <div class="selected">
                <img class="checkmark" src={checkmark} alt="checkmark">
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    {#if selected}
      <div class="button">
        <WideButton on:click={ () => topic = selected.name }>Select</WideButton>
      </div>
    {/if}

</div>

<style>
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    text-align: left;
  }
  
  div.topic-selection {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1 {
    display: block;
    text-align: center;
    padding-top: 4em;
    margin-bottom: 2em;
  }

  .selections {
    display: flex;
    margin: 0 auto 4em;
  }

  .card {
    position: relative;
    height: 320px;
    width: 240px;
    border-radius: 10px;
    overflow: hidden;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
  }

  button:not(:last-of-type) {
    margin-right: 1em;
  }

  h3 {
    padding-left: 1em;
    position: absolute;
    z-index: 1;
  }

  .shade, .selected {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* So that it doesn't interfere with any interactions on the image */
    z-index: 1;
  }

  .shade {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  }

  .selected {
    background-color: rgba(255, 221, 169, .7);
    display: flex;
    justify-content: center;
  }

  img.checkmark {
    width: 50%;
    margin: auto;
    object-fit: contain;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .button {
    width: 400px;
    margin: 0 auto;
  }

</style>
