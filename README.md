# Theme: Playing cards will be given out to n (number) people 
Purpose: Total 52 cards containing 1-13 of each Spade(S), Heart(H), Diamond(D), Club(C) will be given to n people randomly.

## Language/Tech Used
- ReactJs `{front-end}`
- Docker

## Usage Manual

To get the frontend running locally via docker:

1. Clone this repo.

2. cd to current folder of cloned repo.

3. Build docker image by running the following command:

```
docker build -t custom/tyrell:1.0 .
```

4. If the build for the Docker image runs successfully, you should be able to list your image with the following command:

```
docker images
```
5. Use the following command to run the docker image at port 4100:

```
docker run --name my-react-app -p 4100:3000 -d custom/tyrell:1.0
```

6. You should be able to view the webpage at http://localhost:4100 after running the aforementioned command. 

7. Alternatively, you can view a live demo at https://tyrell-47488.web.app/.


## Source code explanation

The algorithm to distribute `52` cards to `n` number of peoples are done in `src/containers/Home/index.js` file.

1. To initialize deck of 52 cards

```
 const deck = [];

    // Spade = S, Heart = H, Diamond = D, Club = C
    const suits = ["S", "H", "D", "C"];

    // Card 2 to 9 are, as it is,1=A,10=X,11=J,12=Q,13=K
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];

    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < values.length; x++) {
        const card = suits[i] + '-' + values[x];
        deck.push(card);
      }
    }

```
2. To shuffle the deck

```
    // Shuffle deck by switching the values of two random cards for 1000 turns        
    for (var z = 0; z < 1000; z++) {
      const location1 = Math.floor((Math.random() * deck.length));
      const location2 = Math.floor((Math.random() * deck.length));
      const tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }

```
3. Distribution algorithm

```
    const arr = [];
    let cardPos = 0;
    let playerCounter = 0;

    for (var q = 0; q < n; q++) {
      const playerlist = [];
      let distFreq = Math.floor(noOfCards / n);
      cardPos = playerCounter;

      if (q < noOfCards % n) {
        distFreq++;
      }

      if (distFreq > 0) {
        for (var p = 0; p < distFreq; p++) {
          playerlist.push(deck[cardPos]);
          cardPos += n;
        }
        playerCounter++;
        arr.push(playerlist);
      }
    }

```
## Screenshots
Input Page

![Page 1](https://i.imgur.com/D8BDGrf.png)


