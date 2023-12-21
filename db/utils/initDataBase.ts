import chalk from "chalk";
import { userService } from "../../service/user.service";
import { Card } from "../model/card.model";
import { User } from "../model/user.model";

export const initDatabase = async () => {
  try {
    const usersData = [
      {
        name: {
          first: "admin",
          middle: "",
          last: "user",
        },
        phone: "0527345882",
        email: "Admin@example.com",
        password: "Ab1234Ab!",
        image: {
          url: "https://example.com/images/johndoe.jpg",
          alt: "Profile picture of John Doe",
        },
        address: {
          city: "New York",
          country: "USA",
          houseNumber: 123,
          state: "NY",
          street: "Main St",
          zip: 34555,
        },
        isBusiness: true,
        isAdmin: true,
      },
      {
        name: {
          first: "Business",
          middle: "",
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
          houseNumber: 123,
          state: "NY",
          street: "Main St",
          zip: 34555,
        },
        isBusiness: true,
      },
      {
        name: {
          first: "Regular",
          middle: "",
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
          houseNumber: 123,
          state: "NY",
          street: "Main St",
          zip: 34555,
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

    // Check if users data exists
    const usersCount = await User.countDocuments({});
    if (usersCount === 0) {
      // Users data not found, create and save to the database
      for (const userData of usersData) {
        await userService.saveUser(userData);
      }

      console.log(chalk.greenBright("Users data created and saved."));
    } else {
      console.log(chalk.redBright("Users data already exists, not saving."));
    }

    const firstUser = await User.findOne({});
    if (firstUser) {
      const userId = firstUser._id;

      // Check if cards for the user with userId exist
      const cardsCount = await Card.countDocuments({ user_id: userId });
      if (cardsCount === 0) {
        // Cards for the user with userId not found, create and save to the database
        const cardsWithUserId = cardData.map((card) => ({
          ...card,
          user_id: userId,
        }));
        await Card.insertMany(cardsWithUserId);
        console.log(
          chalk.greenBright(
            "Card data for the user with userId created and saved."
          )
        );
      } else {
        console.log(
          chalk.redBright(
            "Card data for the user with userId already exists, not saving."
          )
        );
      }
    }
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};
