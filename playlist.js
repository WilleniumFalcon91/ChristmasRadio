// Curated Christmas stations. Each video ID was verified against YouTube's
// oEmbed endpoint before being added here.
const STATIONS = [
  {
    id: "crooners",
    name: "Crooner's Lounge",
    freq: "88.1",
    color: "#c89b5a",
    songs: [
      { title: "White Christmas", artist: "Bing Crosby", videoId: "LwT3LS1e9aY" },
      { title: "The Christmas Song", artist: "Nat King Cole", videoId: "Z57yI62PUys" },
      { title: "Let It Snow! Let It Snow! Let It Snow!", artist: "Dean Martin", videoId: "2TA3IKH8Y5c" },
      { title: "Have Yourself a Merry Little Christmas", artist: "Frank Sinatra", videoId: "n4oP0DhTpyQ" },
      { title: "It's the Most Wonderful Time of the Year", artist: "Andy Williams", videoId: "cbZTfrhcamA" },
      { title: "Rudolph the Red-Nosed Reindeer", artist: "Burl Ives", videoId: "5UqZi5OU6zM" },
      { title: "Christmas Time Is Here", artist: "Vince Guaraldi Trio", videoId: "JM6fZmcpMCo" },
      { title: "Sleigh Ride", artist: "Ella Fitzgerald", videoId: "UhLTjXGJ34U" },
      { title: "(There's No Place Like) Home for the Holidays", artist: "Perry Como", videoId: "NT8pIpzDX0g" },
      { title: "Peace on Earth / Little Drummer Boy", artist: "Bing Crosby & David Bowie", videoId: "lCpXMy5GalI" },
      { title: "Deck the Halls", artist: "Nat King Cole", videoId: "wQlQQ55wNyA" },
      { title: "Sleigh Ride", artist: "Johnny Mathis", videoId: "Lzw9B6r6CL4" },
      { title: "Santa Baby", artist: "Eartha Kitt", videoId: "Mk_GmhD053E" }
    ]
  },
  {
    id: "pop",
    name: "Top of the Pops",
    freq: "94.5",
    color: "#c23b3b",
    songs: [
      { title: "All I Want for Christmas Is You", artist: "Mariah Carey", videoId: "yXQViqx6GMY" },
      { title: "Last Christmas", artist: "Wham!", videoId: "x1js8c-njcw" },
      { title: "Rockin' Around the Christmas Tree", artist: "Brenda Lee", videoId: "DSHGd4lmLd4" },
      { title: "Santa Tell Me", artist: "Ariana Grande", videoId: "nlR0MkrRklg" },
      { title: "Underneath the Tree", artist: "Kelly Clarkson", videoId: "EM2Fnp_qnE8" },
      { title: "It's Beginning to Look a Lot Like Christmas", artist: "Michael Bublé", videoId: "0bhsXykXxfg" },
      { title: "Merry Christmas Everyone", artist: "Shakin' Stevens", videoId: "N-PyWfVkjZc" },
      { title: "Mistletoe", artist: "Justin Bieber", videoId: "5_ApWtsogTw" },
      { title: "Merry Christmas, Happy Holidays", artist: "*NSYNC", videoId: "wKj92352UAE" },
      { title: "Mary, Did You Know?", artist: "Pentatonix", videoId: "NtoK9dI5uoU" },
      { title: "One More Sleep", artist: "Leona Lewis", videoId: "nQdp_UCnMLc" },
      { title: "Holidays", artist: "Meghan Trainor ft. Earth, Wind & Fire", videoId: "2nzAxt27aDI" },
      { title: "You Make It Feel Like Christmas", artist: "Gwen Stefani ft. Blake Shelton", videoId: "3ZT9_H4-hbM" },
      { title: "Where Are You Christmas", artist: "Faith Hill", videoId: "P1qXL1cEgi4" }
    ]
  },
  {
    id: "rock",
    name: "Rock & Soul Sleigh Ride",
    freq: "101.3",
    color: "#3b7a3f",
    songs: [
      { title: "Run Rudolph Run", artist: "Chuck Berry", videoId: "8FW7GoFUbag" },
      { title: "Wonderful Christmastime", artist: "Paul McCartney", videoId: "e6C1HBwVDZU" },
      { title: "Happy Xmas (War Is Over)", artist: "John Lennon & Yoko Ono", videoId: "BA8-XtdxB2E" },
      { title: "Fairytale of New York", artist: "The Pogues ft. Kirsty MacColl", videoId: "j9jbdgZidu8" },
      { title: "Do They Know It's Christmas?", artist: "Band Aid", videoId: "2_P7RW6Mm5g" },
      { title: "Christmas (Baby Please Come Home)", artist: "Darlene Love", videoId: "4EvZOXEoJ84" },
      { title: "Lonely This Christmas", artist: "Mud", videoId: "EtQ5f1xkdMc" },
      { title: "Santa Claus Is Comin' to Town", artist: "Bruce Springsteen", videoId: "76WFkKp8Tjs" },
      { title: "Merry Xmas Everybody", artist: "Slade", videoId: "PTslBTBl1X8" },
      { title: "I Wish It Could Be Christmas Everyday", artist: "Wizzard", videoId: "IJPc7esgvsA" },
      { title: "Driving Home for Christmas", artist: "Chris Rea", videoId: "mkd1_S7g544" },
      { title: "Father Christmas", artist: "The Kinks", videoId: "szmFnUfMOss" },
      { title: "I Believe in Father Christmas", artist: "Greg Lake", videoId: "yfY4b1NszpY" },
      { title: "Please Come Home for Christmas", artist: "Eagles", videoId: "7Rv3wfwIVBc" }
    ]
  },
  {
    id: "novelty",
    name: "Novelty & Nostalgia",
    freq: "107.9",
    color: "#8a5bc2",
    songs: [
      { title: "Feliz Navidad", artist: "José Feliciano", videoId: "N8NcQzMQN_U" },
      { title: "Grandma Got Run Over by a Reindeer", artist: "Elmo & Patsy", videoId: "MgIwLeASnkw" },
      { title: "Rudolph the Red-Nosed Reindeer", artist: "Gene Autry", videoId: "RasL_erhu4Y" },
      { title: "Christmas Eve / Sarajevo", artist: "Trans-Siberian Orchestra", videoId: "MHioIlbnS_A" },
      { title: "The Chipmunk Song (Christmas Don't Be Late)", artist: "Alvin and the Chipmunks", videoId: "mDtOwSjIDFw" },
      { title: "I Want a Hippopotamus for Christmas", artist: "Gayla Peevey", videoId: "4vshk1tq-Ag" },
      { title: "Dominick the Donkey (The Italian Christmas Donkey)", artist: "Lou Monte", videoId: "Ca5wXojemRM" }
    ]
  },
  {
    id: "carols",
    name: "Carols & Classics",
    freq: "91.7",
    color: "#1f7a6c",
    songs: [
      { title: "Silent Night", artist: "The Tabernacle Choir at Temple Square", videoId: "9H08rBEx4nE" },
      { title: "O Holy Night", artist: "Josh Groban", videoId: "hJw-ey1DPRA" },
      { title: "Hark! The Herald Angels Sing", artist: "The Kingdom Choir", videoId: "j3gihkJMgts" },
      { title: "Joy to the World", artist: "Mormon Tabernacle Choir", videoId: "eO6oaHaubto" },
      { title: "We Three Kings of Orient Are", artist: "Choir of King's College, Cambridge", videoId: "DlL8_ydggxA" },
      { title: "O Come All Ye Faithful", artist: "Josh Groban ft. Mormon Tabernacle Choir", videoId: "oJpGwu31sKk" },
      { title: "Angels We Have Heard on High", artist: "Craig Duncan", videoId: "squV8lcvrS0" },
      { title: "Carol of the Bells", artist: "Pentatonix", videoId: "WSUFzC6_fp8" }
    ]
  },
  {
    id: "elvis",
    name: "Elvis's Christmas",
    freq: "103.9",
    color: "#b8860b",
    songs: [
      { title: "Blue Christmas", artist: "Elvis Presley", videoId: "B6WnnZRSKYs" },
      { title: "Santa Claus Is Back in Town", artist: "Elvis Presley", videoId: "Ae7CtryWCkc" },
      { title: "Here Comes Santa Claus (Right Down Santa Claus Lane)", artist: "Elvis Presley", videoId: "yWcFiGKm-JU" },
      { title: "Santa Bring My Baby Back (To Me)", artist: "Elvis Presley", videoId: "QG579cx6DuI" },
      { title: "I'll Be Home for Christmas", artist: "Elvis Presley", videoId: "xtGt4Ypwj5s" },
      { title: "If Every Day Was Like Christmas", artist: "Elvis Presley", videoId: "Bd1K6aC2Ab0" },
      { title: "It Won't Seem Like Christmas (Without You)", artist: "Elvis Presley", videoId: "FvEKtn876cw" },
      { title: "Merry Christmas Baby", artist: "Elvis Presley", videoId: "1Z8uJS6I-M0" }
    ]
  },
  {
    id: "comedy",
    name: "Laughing All the Way",
    freq: "96.9",
    color: "#e07a3e",
    songs: [
      { title: "You're a Mean One, Mr. Grinch", artist: "Thurl Ravenscroft", videoId: "60CYXuc7ATk" },
      { title: "Jingle Bells", artist: "The Singing Dogs", videoId: "qSEBFlBtyIE" },
      { title: "The Twelve Pains of Christmas", artist: "Bob Rivers", videoId: "Z_WMemdeizo" },
      { title: "Nuttin' for Christmas", artist: "Stan Freberg", videoId: "opQBBAT57kA" },
      { title: "¿Dónde Está Santa Claus?", artist: "Augie Rios", videoId: "VdIk_AHeuqg" },
      { title: "Christmas Dragnet", artist: "Stan Freberg", videoId: "Jr6Ap56Uhs8" },
      { title: "I Yust Go Nuts at Christmas", artist: "Yogi Yorgesson", videoId: "jYX-MWcxkk4" },
      { title: "Santa's Beard", artist: "They Might Be Giants", videoId: "7GN6dO096Gg" }
    ]
  },
  {
    id: "northpole",
    name: "North Pole Radio",
    freq: "105.5",
    color: "#4fc3d9",
    songs: [
      { title: "Frosty the Snowman", artist: "Gene Autry", videoId: "bdEpPXVOmTA" },
      { title: "Up on the House Top", artist: "Gene Autry", videoId: "2Kmq7hh8Ofg" },
      { title: "Jolly Old Saint Nicholas", artist: "Traditional", videoId: "LiO6DtK7t3k" },
      { title: "Must Be Santa", artist: "Raffi", videoId: "TNtq9fzu7vA" },
      { title: "Santa Tracker Update", artist: "NORAD Tracks Santa", videoId: "GhTLGBq-Uyg" },
      { title: "We Wish You a Merry Christmas", artist: "Traditional", videoId: "yZVYXO2txTY" }
    ]
  },
  {
    id: "funkjazz",
    name: "Funk & Jazz Christmas",
    freq: "98.3",
    color: "#6a3b8f",
    songs: [
      { title: "Santa Claus Go Straight to the Ghetto", artist: "James Brown", videoId: "_F09nATpn7Y" },
      { title: "Back Door Santa", artist: "Clarence Carter", videoId: "38BCklcvALI" },
      { title: "What Christmas Means to Me", artist: "Stevie Wonder", videoId: "GeSB1KQapgE" },
      { title: "Santa Claus Is Coming to Town", artist: "Jackson 5", videoId: "nYmPZrvThW8" },
      { title: "Christmas in Hollis", artist: "Run-D.M.C.", videoId: "SDamm0KxtOw" },
      { title: "Jingle Bells", artist: "Booker T. & the M.G.'s", videoId: "vzzXoWGYmAo" },
      { title: "Jingle Bells", artist: "Oscar Peterson", videoId: "_o7emga9FIA" },
      { title: "Have Yourself a Merry Little Christmas", artist: "Diana Krall", videoId: "pLDAfhN-aIM" }
    ]
  }
];
