import { userService } from "../../service/user.service";
import { Card } from "../model/card.model";
import { User } from "../model/user.model";

export const initDatabase = async () => {
  try {
    const usersData = [
      {
        name: {
          first: "admin",
          last: "user",
        },
        phone: "0527345882",
        email: "Admin@example.com",
        password: "Ab1234!",
        image: {
          url: "https://example.com/images/johndoe.jpg",
          alt: "Profile picture of John Doe",
        },
        address: {
          city: "New York",
          country: "USA",
          houseNumber: "123",
          state: "NY",
          street: "Main St",
          zip: "34555",
        },
        isBusiness: true,
        isAdmin: true,
      },
      {
        name: {
          first: "Business",
          last: "user",
        },
        phone: "0527345883",
        email: "Business@example.com",
        password: "Ab1234Ab!",
        image: {
          url: "https://example.com/images/johndoe.jpg",
          alt: "Profile picture of John Doe",
        },
        address: {
          city: "New York",
          country: "USA",
          houseNumber: "123",
          state: "NY",
          street: "Main St",
          zip: "34555",
        },
        isBusiness: true,
      },
      {
        name: {
          first: "Regular",
          last: "user",
        },
        phone: "0527345884",
        email: "Regular@example.com",
        password: "Ab1234Ab!",
        image: {
          url: "https://example.com/images/johndoe.jpg",
          alt: "Profile picture of John Doe",
        },
        address: {
          city: "New York",
          country: "USA",
          houseNumber: "123",
          state: "NY",
          street: "Main St",
          zip: "34555",
        },
        isBusiness: false,
      },
    ];

    const cardData = [
      {
        title: "First Card",
        subtitle: "Software Engineer",
        description:
          "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
        phone: "050-1234567",
        email: "FirstCard@example.com",
        web: "http://www.johndoe.com",
        address: {
          street: "123 Main St",
          city: "San Francisco",
          state: "California",
          zip: "94101",
          country: "USA",
          houseNumber: "123",
        },
        image: {
          url: "https://picsum.photos/200",
          alt: "John Doe",
        },
      },
      {
        title: "Second Card",
        subtitle: "Software Engineer",
        description:
          "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
        phone: "050-1234567",
        email: "SecondCard@example.com",
        web: "http://www.johndoe.com",
        address: {
          street: "123 Main St",
          city: "San Francisco",
          state: "California",
          zip: "94101",
          country: "USA",
          houseNumber: "123",
        },
        image: {
          url: "https://picsum.photos/200",
          alt: "John Doe",
        },
      },
      {
        title: "Third Card",
        subtitle: "Software Engineer",
        description:
          "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
        phone: "050-1234567",
        email: "ThirdCard@example.com",
        web: "http://www.johndoe.com",
        address: {
          street: "123 Main St",
          city: "San Francisco",
          state: "California",
          zip: "94101",
          country: "USA",
          houseNumber: "123",
        },
        image: {
          url: "https://picsum.photos/200",
          alt: "John Doe",
        },
      },
    ];

    // const savedUsers = await Promise.all(
    //   usersData.map(async (userData) => {
    //     const user = new User(userData);
    //     return userService.saveUser(user);
    //   })
    // );

    // const userId = savedUsers[0]._id;
    // const savedCards = await Promise.all(
    //   cardData.map(async (card) => {
    //     return Card.create({ ...card, user_id: userId });
    //   })
    // );
    const savedUsers = await Promise.all(
      usersData.map(async (userData) => {
        // Check if any user with the same data already exists
        const existingUser = await User.findOne({
          email: userData.email, // Adjust this based on your user identification criteria
        });

        if (existingUser) {
          // User already exists, return existing user
          return existingUser;
        } else {
          // User doesn't exist, create and save
          const user = new User(userData);
          return userService.saveUser(user);
        }
      })
    );

    // Get the ID of the first saved user (you might want to adjust this logic based on your needs)
    const userId = savedUsers[0]._id;

    // Save or find cards associated with the user
    const savedCards = await Promise.all(
      cardData.map(async (card) => {
        // Check if any card with the same data already exists for the user
        const existingCard = await Card.findOne({
          title: card.title, // Adjust this based on your card identification criteria
          user_id: userId,
        });

        if (existingCard) {
          // Card already exists, return existing card
          return existingCard;
        } else {
          // Card doesn't exist, create and save
          const newCard = new Card({ ...card, user_id: userId });
          return newCard.save();
        }
      })
    );

    return { savedUsers, savedCards };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
