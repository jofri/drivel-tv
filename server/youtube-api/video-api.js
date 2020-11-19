
const fetch = require('node-fetch');
const Video = require('../models/Video-model');

// Function that checks if video info is stored in DB - else, add it using YouTube API
exports.storeVideosToDb = async (videoIds) => {

  // As YouTube video API only allows requests of information for 50 videos at a time:
  // Split full video array into chuncks of 50, then look up relevant data and store in DB
  async function splitAndStore (videos) {
    try {
      const playlists = splitToPlaylists(videos, 50); // Split videos to 50 vid long chuncks
      for (const playlist of playlists) {
        await storeVideos(playlist); // Store vids in DB
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  // Logic for splitting array into 50 vid chuncks
  function splitToPlaylists (array, size) {
    return Array.from(
      { length: Math.ceil(array.length / size) },
      (_, index) => array.slice(index * size, (index + 1) * size)
    );
  }

  // Function to retrive relevant data from YouTube API and store in DB using Mongoose
  async function storeVideos (playlist) {

    // Fetch video data using YouTube API
    const response = await fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=' + playlist.toString() + '&key=' + process.env.YT_API_KEY);
    const youtubeJSON = await response.json();
    const vidObjArray = await Promise.all(youtubeJSON.items.map( async video => { // For evey returned video, create new object

      // If thumnail resolution does not exist, use the next avalible size
      let imageUrl;
      if (video.snippet.thumbnails.maxres) imageUrl = video.snippet.thumbnails.maxres.url;
      else if (video.snippet.thumbnails.standard) imageUrl = video.snippet.thumbnails.standard.url;
      else if (video.snippet.thumbnails.high) imageUrl = video.snippet.thumbnails.high.url;
      else imageUrl = 'No thumbnail';

      // Create new video object
      const vidObj = {
        youtubeId: video.id,
        title: video.snippet.title,
        thumbnailUrl: imageUrl,
        length: video.contentDetails.duration,
      };

      // Store in DB
      await Video.findOneAndUpdate(
        {youtubeId: video.id},
        {$setOnInsert: vidObj}, // Insert document if it does not exist
        { upsert: true, new: true, runValidators: true },
        function (error) {
          if (error) {
            console.log(error);
            throw new Error (error);
          }
        }
      );
      // Return all new objects as vidObjArray
      return vidObj;
    }));
    return vidObjArray;
  }

  return await splitAndStore(videoIds);

};


//const videoIdsTest =  [ 'VGt-BZ-SxGI', 'Wog1Zwx9jV0', 'zTxxlPGohz0', 'k1mAqt9yKYY', 'YuihlgsgNSo', 'NTJY_EhT8OM', 'srScJAs2i1c', 'wHQKij7tATE', 'WzC2f5PSIyw', '-Anyq7-N0zY', 'p-DPZ6M6-7E', 'SyElmtT8MQw', 'yzJokj2gelY', 'UNiRYCTpcGM', 'XozZYCqNo8Q', 'EtlL3Hfavus', 's-Us4JlPdF8', 'RJ2XlUga7Mc', 'RzhV6Vt_xY8', 'dJg1ptpqN2g', '3Ag0BzLkaD4', 'y58011M73cQ', 'l0hait9qXOE', 'leOb6ndKiWU', '5LG1WrOWpl8', 'lyG942-zMmg', '8Le7yEPA5SY', 'oOzJAgwfhxo', 'Gc1I9itun8Q', 'hl0Qna3VNjE', 'qpLFWwo7tL0', 'cNR9Z0uVoFg', 'Nmuk3yrkIno', 'DIDe8JctUGs', 'KDZ9BrrjTV0', 'UA59y8iCRCQ', 'd1-pLmKhgIg', 'VsVjKpsyN7o', 'mhgS6TNkX9Q', 'Kbl3b_mmyXE', 'jReT0ktW1Gc', 'h7n-wXauzPU', 'xvJ7BHGcbr0', 'yncoNo7tr2s', '8iqy9RjIyWQ', 'GYpOapkr5MA', 'YaSpTSMWZig', 'YVxaK8WQhJo', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'kEGaLDmQD8M', 'oLAw5EGe1zY', 'Wm-HtcQ48_I', 'z5qkTlWe6VM', 'a3hiqH-put4', 'PDvNrq93ktI', 'IxS9vKLydys', 'aLiK_nP7wTI', 'V-4sLymIv0M', 'uve3CQWxRq0', '2D2vWXt1uII', 'IzB4JqA9l6A', 'XpxiH5lOKTw', 'HLZA-s_W0Ak', 'usnzZJPOnJw', 'QKlUTCtY0Zs', 'HKNj9CSzKxA', '2K4_dNwyc5o', 'ZAA-BWvG_0o', 'UAlIq7BKNxg', 'hT0uqXlZ70A', 'mOwX1ZNY2Jc', 'JqvdAuuXVyA', 'G5JBZk-DiQU', 'xejFV2JCmSM', 'yB4Q3ezW9fM', 'ZzjGNTd76Jg', 'OvpG-3H8t9M', 'T2lYBUyslKk', '1B1f9PGLbIs', '8HHZiNdrZGA', 'aOXAtnb-grk', 'evcMQ7Lk8NU', 'DofeZTYjPLg', 'yyU9leR9KIU' , 'VGt-BZ-SxGI', 'Wog1Zwx9jV0', 'zTxxlPGohz0', 'k1mAqt9yKYY', 'YuihlgsgNSo', 'NTJY_EhT8OM', 'srScJAs2i1c', 'wHQKij7tATE', 'WzC2f5PSIyw', '-Anyq7-N0zY', 'p-DPZ6M6-7E', 'SyElmtT8MQw', 'yzJokj2gelY', 'UNiRYCTpcGM', 'XozZYCqNo8Q', 'EtlL3Hfavus', 's-Us4JlPdF8', 'RJ2XlUga7Mc', 'RzhV6Vt_xY8', 'dJg1ptpqN2g', '3Ag0BzLkaD4', 'y58011M73cQ', 'l0hait9qXOE', 'leOb6ndKiWU', '5LG1WrOWpl8', 'lyG942-zMmg', '8Le7yEPA5SY', 'oOzJAgwfhxo', 'Gc1I9itun8Q', 'hl0Qna3VNjE', 'qpLFWwo7tL0', 'cNR9Z0uVoFg', 'Nmuk3yrkIno', 'DIDe8JctUGs', 'KDZ9BrrjTV0', 'UA59y8iCRCQ', 'd1-pLmKhgIg', 'VsVjKpsyN7o', 'mhgS6TNkX9Q', 'Kbl3b_mmyXE', 'jReT0ktW1Gc', 'h7n-wXauzPU', 'xvJ7BHGcbr0', 'yncoNo7tr2s', '8iqy9RjIyWQ', 'GYpOapkr5MA', 'YaSpTSMWZig', 'YVxaK8WQhJo', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'kEGaLDmQD8M', 'oLAw5EGe1zY', 'Wm-HtcQ48_I', 'z5qkTlWe6VM', 'a3hiqH-put4', 'PDvNrq93ktI', 'IxS9vKLydys', 'aLiK_nP7wTI', 'V-4sLymIv0M', 'uve3CQWxRq0', '2D2vWXt1uII', 'IzB4JqA9l6A', 'XpxiH5lOKTw', 'HLZA-s_W0Ak', 'usnzZJPOnJw', 'QKlUTCtY0Zs', 'HKNj9CSzKxA', '2K4_dNwyc5o', 'ZAA-BWvG_0o', 'UAlIq7BKNxg', 'hT0uqXlZ70A', 'mOwX1ZNY2Jc', 'JqvdAuuXVyA', 'G5JBZk-DiQU', 'xejFV2JCmSM', 'yB4Q3ezW9fM', 'ZzjGNTd76Jg', 'OvpG-3H8t9M', 'T2lYBUyslKk', '1B1f9PGLbIs', '8HHZiNdrZGA', 'aOXAtnb-grk', 'evcMQ7Lk8NU', 'DofeZTYjPLg', 'yyU9leR9KIU', 'VGt-BZ-SxGI', 'Wog1Zwx9jV0', 'zTxxlPGohz0', 'k1mAqt9yKYY', 'YuihlgsgNSo', 'NTJY_EhT8OM', 'srScJAs2i1c', 'wHQKij7tATE', 'WzC2f5PSIyw', '-Anyq7-N0zY', 'p-DPZ6M6-7E', 'SyElmtT8MQw', 'yzJokj2gelY', 'UNiRYCTpcGM', 'XozZYCqNo8Q', 'EtlL3Hfavus', 's-Us4JlPdF8', 'RJ2XlUga7Mc', 'RzhV6Vt_xY8', 'dJg1ptpqN2g', '3Ag0BzLkaD4', 'y58011M73cQ', 'l0hait9qXOE', 'leOb6ndKiWU', '5LG1WrOWpl8', 'lyG942-zMmg', '8Le7yEPA5SY', 'oOzJAgwfhxo', 'Gc1I9itun8Q', 'hl0Qna3VNjE', 'qpLFWwo7tL0', 'cNR9Z0uVoFg', 'Nmuk3yrkIno', 'DIDe8JctUGs', 'KDZ9BrrjTV0', 'UA59y8iCRCQ', 'd1-pLmKhgIg', 'VsVjKpsyN7o', 'mhgS6TNkX9Q', 'Kbl3b_mmyXE', 'jReT0ktW1Gc', 'h7n-wXauzPU', 'xvJ7BHGcbr0', 'yncoNo7tr2s', '8iqy9RjIyWQ', 'GYpOapkr5MA', 'YaSpTSMWZig', 'YVxaK8WQhJo', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'uq6PgSa6-28', 'TDb1gsbcLIY', 'kEGaLDmQD8M', 'oLAw5EGe1zY', 'Wm-HtcQ48_I', 'z5qkTlWe6VM', 'a3hiqH-put4', 'PDvNrq93ktI', 'IxS9vKLydys', 'aLiK_nP7wTI', 'V-4sLymIv0M', 'uve3CQWxRq0', '2D2vWXt1uII', 'IzB4JqA9l6A', 'XpxiH5lOKTw', 'HLZA-s_W0Ak', 'usnzZJPOnJw', 'QKlUTCtY0Zs', 'HKNj9CSzKxA', '2K4_dNwyc5o', 'ZAA-BWvG_0o', 'UAlIq7BKNxg', 'hT0uqXlZ70A', 'mOwX1ZNY2Jc', 'JqvdAuuXVyA', 'G5JBZk-DiQU', 'xejFV2JCmSM', 'yB4Q3ezW9fM', 'ZzjGNTd76Jg', 'OvpG-3H8t9M', 'T2lYBUyslKk', '1B1f9PGLbIs', '8HHZiNdrZGA', 'aOXAtnb-grk', 'evcMQ7Lk8NU', 'DofeZTYjPLg', 'yyU9leR9KIU' ];



