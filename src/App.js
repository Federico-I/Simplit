import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleAddFriend(){
    setShowAddFriend((show) => !show);
  }



  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        { showAddFriend && <FormAddFriend /> }
        <Button onClickAdd={handleAddFriend}>{ showAddFriend ? "Close" : "Add Friend" }</Button>
      </div>
      <FormSplitBill />
    </div>
  )
};

function Button({ children, onClickAdd }) {
  return(
    <button className="button" onClick={onClickAdd}>{children}</button>
  )
}

function FriendsList() {
const friends = initialFriends;

  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}/>
      ))}
    </ul>
  )
};

function Friend({ friend }) {
  return(
    <li>
      <image src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>)}
      {friend.balance > 0 && (<p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>)}
      {friend.balance === 0 && (<p className="red">You and {friend.name} {Math.abs(friend.balance)}$</p>)}
      <Button>Select</Button>
    </li>
  )
}

function FormAddFriend() {
  return (
    <form>
      <label>Friends Name</label>
      <input type="text"/>

      <label>Image Url</label>
      <input type="text"/>

      <Button>Add</Button>
    </form>
  );
};

function FormSplitBill({ friendsName }){
  return(
    <form className="form-split-bill">
      <h2>Split a bill with {friendsName}</h2>

      <label>Total bill</label>
      <input type="text"/>

      <label>Your Expenses</label>
      <input type="text"/>

      <label>Friend Expenses</label>
      <input type="text" disabled/>

      <label>Who's paying?</label>
      <select>
        <option value={user}>You</option>
        <option value={friend}>Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}