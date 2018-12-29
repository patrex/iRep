import router from '../server/app';

const port = process.env.PORT || 3000;
const server = router.listen( port, () => console.log("Server running on localhost:" + port) );

export default server;