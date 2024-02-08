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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const [selectFriendBill, setSelectFriendBill] = useState("");

  function handleAddFriend(){
    setShowAddFriend((show) => !show);
  }

  function handleAdd(friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false);
  }

  function handleFriendBill(friend){
    setSelectFriendBill((cur) => (cur?.id === friend.id ? null : "friend"));
    setShowAddFriend(false);
  };

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelectFriend={handleFriendBill} activeFriend={selectFriendBill}/>
        { showAddFriend && <FormAddFriend onAddFriend={handleAdd} /> }
        <Button onClickAdd={handleAddFriend}>{ showAddFriend ? "Close" : "Add Friend" }</Button>
      </div>
      {selectFriendBill && <FormSplitBill selectedFriend={selectFriendBill}/>}
    </div>
  )
};

function Button({ children, onClickAdd }) {
  return(
    <button className="button" onClick={onClickAdd}>{children}</button>
  )
}

function FriendsList({ friends, onSelectFriend, activeFriend }) {


  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelectFriend={onSelectFriend} activeFriend={activeFriend}/>
      ))}
    </ul>
  )
};

function Friend({ friend, onSelectFriend, activeFriend }) {
  const activeSelected = activeFriend?.id === friend.id;

  return(
    <li className={ activeSelected ? "selected" : ""}>
      <image src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>)}
      {friend.balance > 0 && (<p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>)}
      {friend.balance === 0 && (<p className="red">You and {friend.name} {Math.abs(friend.balance)}$</p>)}
      <Button onClick={() => onSelectFriend(friend)}>{activeFriend ? "Close" : "Select"}</Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {

  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  function handleName(e) {
    setName(e.target.value)
  }

  function handleImage(e) {
    setProfileImg(e.target.value) 
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!name || !profileImg) return;

    const id = crypto.randomUUID;

    const newFriend = {
      id,
      name,
      profileImg: `${profileImg}=${id}`,
      balance: 0,
    }
    onAddFriend(newFriend);
  }



  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friends Name</label>
      <input type="text" value={name} onChange={handleName}/>

      <label>Image Url</label>
      <input type="text" value={profileImg} onChange={handleImage}/>

      <Button>Add</Button>
    </form>
  );
};

function FormSplitBill({ selectedFriend }){

  const [bill, setBill] =useState();
  const [paiedByUser, setPaiedByUser] = useState();
  const [whoIsPaying, setWhoIsPaying] = useState();

  const paidByFriend = bill ? bill - paiedByUser : "";

  return(
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Total bill</label>
      <input value={bill} onChange={(e) => setBill(Number(e.target.value))} type="text"/>

      <label>Your Expenses</label>
      <input value={paiedByUser} onChange={(e) => setPaiedByUser(Number(e.target.value))} type="text"/>

      <label>{selectedFriend.name} Expenses</label>
      <input type="text" disabled value={paidByFriend}/>

      <label >Who's paying?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectedFriend.name}</option>
      </select>

      <Button >Split Bill</Button>
    </form>
  )
}