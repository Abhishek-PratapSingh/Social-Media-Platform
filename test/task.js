const server = require('../index')
let chai = require('chai')
let chaihttp=require('chai-http')
// const delay = require('delay')
//Assertion Style
chai.should()
chai.use(chaihttp)
chai.use(require("chai-sorted"));

let defaultUser = {
     // name : "pratap",
     email: "pratap123@email.com",
     password: "pratap"
};

const dummyPost ={
     title : "CSE",
     description : "CSE is the trending degree nowdays"
}

const userId="63aab02b121a380036383e8e"
const postId="63ac732f377ccda1fc090d3b"

let token;

describe('Testing the REST APIs' , ()=>{

     //Testing Auth
     beforeEach("User Authenticated" , done => {
          // this.timeout(0);
          chai.request(server)
          .post("/api/authenticate/login")
          .send(defaultUser)
          .end((err, res) => {
          //   console.log(res.body.token)   
            token = res.body.token;
            res.should.have.status(200);
          //   console.log(res.body)
            done();
          });
    });

    describe('POST /api/follow/:id' , ()=>{
        
     it("testing whether a user can follow another user" ,  (done)=>{
        // await delay(1000)
   //      this.timeout(3000)
        chai.request(server)
        .post(`/api/follow/${userId}`)
        .set({ authtoken : `${token}` })
        .end((err,res)=>{
             
             res.should.have.status(200);
             done();
        })
     })
   })

   describe('POST /api/unfollow/:id' , ()=>{
        
     it("testing whether a user can unfollow another user" ,  (done)=>{
        // await delay(1000)
   //      this.timeout(3000)
        chai.request(server)
        .post(`/api/unfollow/${userId}`)
        .set({ authtoken : `${token}` })
        .end((err,res)=>{
             
          //    console.log(res.body)
             res.should.have.status(200);
             done();
        })
     })
   })

   describe('GET /api/user' , ()=>{
        
     it("User Successful Profile Check" ,  (done)=>{
        // await delay(1000)
   //      this.timeout(3000)
        chai.request(server)
        .get('/api/user')
        .set({ authtoken : `${token}` })
        .send({userId})
        .end((err,res)=>{
             
          //    console.log(res.body)
             res.should.have.status(200);
             done();
        })
     })
   }) 

   describe('GET /api/user' , ()=>{
        
     it("User Unsuccessful Profile Check" ,  (done)=>{
        // await delay(1000)
   //      this.timeout(3000)
        chai.request(server)
        .get('/api/user')
        .set({ authtoken : `${token}` })
        .send(userId)
        .end((err,res)=>{
             
          //    console.log(res.body)
             res.should.have.status(500);
             done();
        })
     })
   }) 


       //Creating Post
       describe('POST /api/posts' , ()=>{
        
          it("Post successful creation check" ,  (done)=>{
             // await delay(1000)
        //      this.timeout(3000)
             chai.request(server)
             .post('/api/posts')
             .set({ authtoken : `${token}` })
             .send(dummyPost)
             .end((err,res)=>{
                  // console.log(res.body)
                  // console.log(token)
                  res.should.have.status(200);
                  done();
             })
          })
     })

     describe('POST /api/posts' , ()=>{
        
          it("Post creation with Title field missing" ,  (done)=>{
             // await delay(1000)
        //      this.timeout(3000)
             chai.request(server)
             .post('/api/posts')
             .set({ authtoken : `${token}` })
             .send({ description : "ECE is not the trending degree nowdays"})
             .end((err,res)=>{
                  // console.log(res.body)
                  // console.log(token)
                  res.should.have.status(500);
                  done();
             })
          })
     })

     // describe('DELETE /api/posts/:id' , ()=>{
        
     //      it("Successful Delete of Post" ,  (done)=>{
     //         // await delay(1000)
     //    //      this.timeout(3000)
     //         chai.request(server)
     //         .delete(`/api/posts/${postId}`)
     //         .set({ authtoken : `${token}` })
     //         .end((err,res)=>{
                 
     //              res.should.have.status(200);
     //              done();
     //         })
     //      })
     // })

     describe('DELETE /api/posts/:id' , ()=>{
        
          it("UnSuccessful Delete of Post" ,  (done)=>{
             // await delay(1000)
        //      this.timeout(3000)
             chai.request(server)
             .delete(`/api/posts/`)
             .send(postId)
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
                 
                  res.should.have.status(404);
                  done();
             })
          })
     })

     describe('POST /api/like/:id' , ()=>{
        
          it("Able to Like a Post" ,  (done)=>{
          
             chai.request(server)
             .post(`/api/like/${postId}`)
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
                  res.should.have.status(200);
                  done();
             })
          })
     })
     describe('POST /api/unlike/:id' , ()=>{
        
          it("Able to Unlike a Post" ,  (done)=>{
          
             chai.request(server)
             .post(`/api/unlike/${postId}`)
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
                  res.should.have.status(200);
                  done();
             })
          })
     })

     describe('POST /api/like/:id' , ()=>{
        
          it("Failed to Like a Post User Unauthorized" , (done)=>{
          
             chai.request(server)
             .post(`/api/like/${postId}`)
          //    .set({ authtoken : `${token}` })
             .end((err,res)=>{
                  res.should.have.status(401);
                  done();
             })
          })
     })

     describe('POST /api/comment/:id' , ()=>{
        
          it("Successful Comment over a Post" , (done)=>{
          
             chai.request(server)
             .post(`/api/like/${postId}`)
             .send({comment : "great workkk"})
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
                  res.should.have.status(200);
                  done();
             })
          })
     })
    
     describe('GET /api/posts/:id' , ()=>{
        
          it("Successful Post fetch" , (done)=>{
          
             chai.request(server)
             .get(`/api/posts/${postId}`)
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
               //    console.log(res.body)
                  res.should.have.status(200);
                  done();
             })
          })
     })
      
     describe('GET /api/posts/:id' , ()=>{
        
          it("Unavaible Post fetch" , (done)=>{
             const wrongId='psmsndndi1111i3js0'
             chai.request(server)
             .get(`/api/posts/${wrongId}`)
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
                 // console.log(res.body)
                  res.should.have.status(500);
                  done();
             })
          })
     })

      //fetching all posts of User
      describe('GET /api/all_posts' , ()=>{
        
          it("fetching all posts of User" ,  (done)=>{
            
             chai.request(server)
             .get('/api/all_posts')
             .set({ authtoken : `${token}` })
             .end((err,res)=>{
               //    console.log(res.body.posts)
                  res.should.have.status(200);
                  res.body.posts.should.have.sortedBy("createdAt", {descending: true});
                  done();
             })
          })
        })
    

});

