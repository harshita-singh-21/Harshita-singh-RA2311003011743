require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/realtime-editor', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// Document Schema
const Document = mongoose.model('Document', new mongoose.Schema({
    _id: String,
    data: Object
}));

// Fetch or Create Document
const getDocument = async (id) => {
    if (!id) return null;
    let doc = await Document.findById(id);
    if (!doc) doc = await Document.create({ _id: id, data: {} });
    return doc;
};

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('🔗 New User Connected');

    socket.on('get-document', async (docId) => {
        const document = await getDocument(docId);
        socket.join(docId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(docId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data) => {
            await Document.findByIdAndUpdate(docId, { data });
        });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));