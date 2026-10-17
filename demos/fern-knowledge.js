/* Public gameplay Q&A selected from the saved approved knowledge snapshot. No user or channel data. */
export const examples=[
  {
    "id": 1,
    "question": "How do I choose my bloodline",
    "answer": "You can choose your bloodline by doing the command /bloodline"
  },
  {
    "id": 3,
    "question": "How do I use my bloodline ability?",
    "answer": "You can use your ability by **Shift + Offhand (F)** or **/ability**"
  },
  {
    "id": 4,
    "question": "Are there vaults on FernSMP for extra item storage, or is it only ender chest?",
    "answer": "Yes, FernSMP has vaults that give you extra space to store your items! You can access them using `/pv`."
  },
  {
    "id": 5,
    "question": "How do I complete jobs on the server?",
    "answer": "You can complete jobs by using `/jobs` and selecting a job, such as `Miner`. Once you’ve finished mining, open `/jobs` again, select `Miner`, and click the green candles to claim your reward!"
  },
  {
    "id": 6,
    "question": "How do you get in-game money in FernSMP?",
    "answer": "You can earn in-game money by using the `/jobs` command, receiving `/gifts` for consistent play, or selling items via the Auction House with `/ah sell <price>` while holding the item(s)."
  },
  {
    "id": 19,
    "question": "How do I equip a title in-game?",
    "answer": "You can equip a title in-game by using the `/title` command."
  },
  {
    "id": 39,
    "question": "What is the server ip?",
    "answer": "You can join using the ip `play.fernsmp.net` and if you're on Bedrock use the port `19132` or add `FernSMP` as a friend in the social tab."
  },
  {
    "id": 43,
    "question": "What's the fastest way to get claim blocks",
    "answer": "You can earn claim blocks by killing mobs for souls, which can be spent in /souls."
  },
  {
    "id": 44,
    "question": "Can I find my old claim blocks if I don’t have the cords and didn’t set it as my home?",
    "answer": "Yes! If you made a claim and forgot where it was, you can use `/claimslist` to view your claims. If you still can't find it, you can open a ticket and we can provide the coordinates or possibly teleport you there."
  },
  {
    "id": 56,
    "question": "How do I sell items using a chest shop?",
    "answer": "Hold the item you want to sell, look at your chest, and run `/qs create <price>`. For example, hold iron and use `/qs create 9`."
  },
  {
    "id": 57,
    "question": "Where can I find the chest-shop setup guide?",
    "answer": "Run `/howtoshop` in-game for the breakdown of how to make a chest shop."
  },
  {
    "id": 58,
    "question": "How do I collect items I bought from the auction house?",
    "answer": "Open `/ah`, select the Bought Items section, and collect your purchased items there. They may be waiting in that menu rather than appearing immediately in your inventory."
  },
  {
    "id": 59,
    "question": "What is the correct command to list an item on the auction house?",
    "answer": "Use `/ah sell <price>`. For example, `/ah sell 60000`."
  },
  {
    "id": 60,
    "question": "How do I trade directly with another player?",
    "answer": "Use `/trade <player>` to trade with another player."
  },
  {
    "id": 65,
    "question": "How do I set my guild home?",
    "answer": "Use `/guild sethome` to set your guild home."
  },
  {
    "id": 66,
    "question": "How do I replace my lost claiming shovel?",
    "answer": "Run `/kit claim` to receive a claiming shovel. You can also craft a golden shovel: two sticks and one gold ingot. Golden shovels act as claiming tools."
  },
  {
    "id": 67,
    "question": "How do I claim land?",
    "answer": "Get a golden shovel using `/kit claim`, then use it to select opposite corners of the area you want to claim."
  },
  {
    "id": 74,
    "question": "How do I reload the server resource pack on Java?",
    "answer": "In your multiplayer server list, select FernSMP, choose Edit, and set Server Resource Packs to Enabled. Reconnect so the pack can load."
  },
  {
    "id": 79,
    "question": "How do I gain levels and check my progress?",
    "answer": "FernSMP recommends killing mobs, collecting ores such as diamond, lapis and gold, completing tasks, and doing jobs to gain levels. Use `/levels` to check your progress."
  },
  {
    "id": 80,
    "question": "What are relics used for?",
    "answer": "Relics are mostly cosmetic or fun blocks. Some produce particles for decorating your base, while others, such as the Rock Paper Scissors table, let you play a minigame with friends."
  }
];
const normalize=text=>text.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
export function matchSampleAnswer(text){
 const value=normalize(text);
 const exact=examples.find(item=>normalize(item.question)===value);
 if(exact)return exact;
 const rules=[
 [5,/how.*(jobs|complete.*job)/], [1,/how.*(choose|pick|select).*bloodline/],
 [3,/how.*(use|activate).*ability/], [4,/(how|where).*vault|extra.*storage/],
 [6,/how.*(earn|make|get).*money/], [19,/how.*equip.*title/],
 [39,/(server.*ip|join.*server|what.*ip)/], [58,/(collect|where).*bought.*items|items.*bought.*auction/],
 [57,/(guide|help).*chest.*shop|chest.*shop.*guide/], [60,/how.*trade/],
 [65,/how.*guild.*home/], [66,/(lost|replace|new).*claim.*shovel/],
 [67,/how.*claim.*land/], [74,/(reload|enable).*resource.*pack/],
 [79,/how.*(gain|level up|level.*progress)/], [80,/(what|how).*relic/]
 ];
 const id=rules.find(([,rule])=>rule.test(value))?.[0];
 return examples.find(item=>item.id===id)||null;
}
