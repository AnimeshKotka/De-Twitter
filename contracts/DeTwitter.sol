// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// decentralize twitter

error DeTitter_AlreadySignIn();
error DeTitter_UserNametaken();
error DeTitter_EmptyContain();
error DeTitter_ContainTooLarge();

contract DeTwitter {
  // structures
  struct User {
    address user_address;
    uint256 post_count;
    string name;
    string username;
    string imgURI;
  }

  struct Post {
    uint256 post_id;
    string post;
    address owner;
    uint256 like_count;
    uint256 dislike_count;
    uint256 comment_count;
  }

  struct Comment {
    uint256 post_id;
    address comment_by;
    uint256 uproot_count;
    uint256 downroot_count;
    string comment;
  }

  // state variables

  // address[] private s_users;
  mapping(uint256 => Post) public s_posts;
  uint256[] public s_post_ids;
  /**
   * @dev this variable is use checking if user is exists and usrname will act as a id
   */
  mapping(string => User) private s_users;
  mapping(address => string) private s_usernames;
  mapping(uint256 => Comment[]) private s_postToComment;

  // State functions

  function signUp(
    string memory _username,
    string memory _name,
    string memory _imgURI
  ) public {
    if (bytes(s_usernames[msg.sender]).length != 0) {
      revert DeTitter_AlreadySignIn();
    }

    if (s_users[_username].user_address != address(0)) {
      revert DeTitter_UserNametaken();
    }
    s_usernames[msg.sender] = _username;
    s_users[_username] = User({
      user_address: msg.sender,
      post_count: 0,
      name: _name,
      username: _username,
      imgURI: _imgURI
    });
  }

  // user post something

  function AddNewDeTwitt(string memory _post) public {
    if (bytes(s_usernames[msg.sender]).length <= 0) {
      revert DeTitter_AlreadySignIn();
    }

    if (bytes(_post).length <= 0) {
      revert DeTitter_EmptyContain();
    }

    if (bytes(_post).length > 288) {
      revert DeTitter_ContainTooLarge();
    }

    // Comment[] storage comments = new Comment[](10);
    s_post_ids.push(s_post_ids.length);
    Post memory post = Post({
      post_id: s_post_ids.length,
      post: _post,
      owner: msg.sender,
      like_count: 0,
      dislike_count: 0,
      comment_count: 0
    });
    s_posts[s_post_ids.length] = post;
  }

  function GetAllDeTwittes() public view returns (Post[] memory) {
    Post[] memory posts = new Post[](s_post_ids.length);
    for (uint i = 0; i < s_post_ids.length; i++) {
      posts[i] = s_posts[s_post_ids[i]];
    }

    return posts;
  }

  function deleteDeTweet(uint256 post_id) public {
    for (uint i = 0; i < s_post_ids.length; i++) {
      if (s_post_ids[i] == post_id) {
        s_post_ids[i] = s_post_ids[s_post_ids.length - 1];
        s_post_ids.pop();
      }
    }
    delete s_posts[post_id];
  }

  function likeDeTweet(uint256 post_id) public {
    s_posts[post_id].like_count++;
  }

  function dislikeDeTweet(uint256 post_id) public {
    s_posts[post_id].dislike_count++;
  }

  function commentDeTweet(uint256 _post_id, string memory _comment) public {
    Comment memory comment = Comment({
      post_id: _post_id,
      comment_by: msg.sender,
      uproot_count: 0,
      downroot_count: 0,
      comment: _comment
    });
    s_postToComment[_post_id].push(comment);
    s_posts[_post_id].comment_count++;
  }

  // user like the post
  // user comment the post
  // user uproot/down root the comment

  // pure functions
}
