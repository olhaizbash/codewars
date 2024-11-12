class Hotel {
  constructor() {
    this.rooms = [];
  }

  createRoom(roomNumber, roomType, maxAmountOfPersons) {
    this.rooms.push({
      roomNumber,
      roomType,
      maxAmountOfPersons,
      isBooked: false,
      bookingInfo: null,
    });
    console.log(`Номер ${roomNumber} типу ${roomType} створено.`);
  }

  bookRoom(roomNumber, guestName, guestAmount, date) {
    const room = this.rooms.find((room) => room.roomNumber === roomNumber);
    if (!room) {
      console.log(`Номер ${roomNumber} не знайдено.`);
      return;
    }
    if (room.isBooked) {
      console.log(`Номер ${roomNumber} вже заброньовано.`);
      return;
    }

    if (room.maxAmountOfPersons < guestAmount) {
      console.log(
        `У ${roomNumber} недостатньо спальниї місць для ${guestAmount} людей спробуйте інший.`
      );
      return;
    }

    room.isBooked = true;
    room.bookingInfo = {
      guestName,
      date,
      guestAmount,
    };
    console.log(
      `Номер ${roomNumber} заброньовано для ${guestName} на ${date}.`
    );
  }

  getBookedRooms() {
    const bookedRooms = this.rooms.filter((room) => room.isBooked);
    if (bookedRooms.length === 0) {
      console.log("Немає заброньованих номерів.");
      return;
    }
    console.log("Інформація про заброньовані номери:");
    bookedRooms.forEach((room) => {
      console.log(
        `Номер ${room.roomNumber}, тип ${room.roomType}, заброньовано для ${room.bookingInfo.guestName} на ${room.bookingInfo.date}`
      );
    });
  }
}

const hotel = new Hotel();

const createRoomBound = hotel.createRoom.bind(hotel);
const bookRoomBound = hotel.bookRoom.bind(hotel);
const getBookedRoomsBound = hotel.getBookedRooms.bind(hotel);

createRoomBound(101, "Люкс", 2);
createRoomBound(102, "Стандарт", 5);

bookRoomBound(101, "Олексій", 3, "2024-11-10");
bookRoomBound(102, "Марія", 2, "2024-11-11");

getBookedRoomsBound();
