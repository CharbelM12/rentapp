module.exports={
    EmailMissing:{
            status:401,
            message:"this Email address does not exist"
    },
    IncorrectPassword:{
        status:401,
        message:"the password you have entered is incorrect"
    },
    UserNotFound:{
        status:404,
        message:"User not found"
    },
    NotAuhtorized:{
        status:403,
        message:"Not authorized"
    },
    NotAuthenticated:{
        status:401,
        message:"Not Authenticated"
    },
    BrandNotFound:{
        statusCode:401,
        message:"No Brand was found"
    },
    CategoryNotFound:{
      status:404,
      message:"No Category  was found"
    },
    CarNotFound:{
        status:404,
        message:"No Car was found"
    },
    ReservationNotFound:{
        status:404,
        message:"No Reservation  was found"
    },
    CarReserved:{
     status:400,
     message:"Car already reserved for the chosen dates"
    },
    NotConnected:{
     status:502,
     message:"Failed to connect to database"
    },
    EmailExists:{
        status:409,
        message:"Email address already exists"
    },
    InternalServerError:{
        status:500,
        message:"Internal Server Error"
    },
    NameExists:{
        status:409,
        message:"Name already exists"
    }
}