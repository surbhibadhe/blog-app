
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  readTime: string;
  tags: string[];
  problem?: {
    statement: string;
    examples: {
      input: string;
      output: string;
      explanation?: string;
    }[];
    constraints: string[];
    approach: string;
    solution: string;
    complexity: {
      time: string;
      space: string;
    };
  };
};

export type BlogUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "Two Sum",
    body:
      "Given an array of integers and a target, return the indices of two numbers whose sum equals the target. Learn how a hash map reduces the time complexity from quadratic to linear.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "5 min",
    tags: ["Arrays", "Hash Map", "LeetCode"],
    problem: {
      statement:
        "Given an integer array nums and an integer target, return the indices of two distinct elements whose values add up to target. Assume exactly one solution exists.",
      examples: [
        {
          input: "nums = [2, 7, 11, 15], target = 9",
          output: "[0, 1]",
          explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
        },
        {
          input: "nums = [3, 2, 4], target = 6",
          output: "[1, 2]",
        },
      ],
      constraints: [
        "2 <= nums.size() <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "Exactly one valid solution exists.",
        "Do not use the same element twice.",
      ],
      approach:
        "Iterate through the array. For each number x, calculate target - x. If that complement is already in a hash map, return the stored index and the current index. Otherwise, store x and its index. Looking up a complement takes O(1) average time.",
      solution: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];

        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }

        seen[nums[i]] = i;
    }

    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;

    vector<int> answer = twoSum(nums, target);
    cout << answer[0] << " " << answer[1] << endl;

    return 0;
}`,
      complexity: {
        time: "O(n) average",
        space: "O(n)",
      },
    },
  },
  {
    userId: 1,
    id: 2,
    title: "Binary Search",
    body:
      "Search for a target in a sorted array by repeatedly eliminating half of the remaining search space.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "6 min",
    tags: ["Arrays", "Binary Search", "Algorithms"],
    problem: {
      statement:
        "Given a sorted array of distinct integers and a target, return the target's index. Return -1 if it does not exist.",
      examples: [
        {
          input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
          output: "4",
        },
        {
          input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
          output: "-1",
        },
      ],
      constraints: [
        "1 <= nums.size() <= 10^4",
        "All elements are distinct.",
        "nums is sorted in ascending order.",
      ],
      approach:
        "Maintain left and right boundaries. Calculate the middle index. If the middle element equals the target, return it. If the middle element is smaller, search the right half; otherwise, search the left half. Stop when left exceeds right.",
      solution: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

int main() {
    vector<int> nums = {-1, 0, 3, 5, 9, 12};
    cout << search(nums, 9) << endl;
    return 0;
}`,
      complexity: {
        time: "O(log n)",
        space: "O(1)",
      },
    },
  },
  {
    userId: 1,
    id: 3,
    title: "Valid Parentheses",
    body:
      "Determine whether a string containing parentheses, braces, and brackets is valid. Use a stack to match each closing bracket with its corresponding opening bracket.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "7 min",
    tags: ["Stack", "Strings", "LeetCode"],
    problem: {
      statement:
        "Given a string containing only (, ), {, }, [ and ], determine whether the brackets are correctly matched and properly nested.",
      examples: [
        {
          input: 's = "([])"',
          output: "true",
        },
        {
          input: 's = "([)]"',
          output: "false",
        },
      ],
      constraints: [
        "1 <= s.length() <= 10^4",
        "s contains only bracket characters.",
      ],
      approach:
        "Push opening brackets onto a stack. For each closing bracket, check that the stack is non-empty and its top contains the matching opening bracket. Reject mismatches and return true only if the stack is empty at the end.",
      solution: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;

            char top = st.top();
            st.pop();

            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }

    return st.empty();
}

int main() {
    cout << boolalpha << isValid("([])") << endl;
    return 0;
}`,
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
    },
  },
  {
    userId: 1,
    id: 4,
    title: "Reverse a Linked List",
    body:
      "Reverse the direction of every pointer in a singly linked list without creating a second list. Understand how previous, current, and next pointers work together.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "8 min",
    tags: ["Linked List", "Pointers", "Interviews"],
    problem: {
      statement:
        "Given the head of a singly linked list, reverse the list and return its new head.",
      examples: [
        {
          input: "1 -> 2 -> 3 -> 4 -> 5",
          output: "5 -> 4 -> 3 -> 2 -> 1",
        },
        {
          input: "1 -> 2",
          output: "2 -> 1",
        },
      ],
      constraints: [
        "The number of nodes is between 0 and 5000.",
        "-5000 <= node value <= 5000",
      ],
      approach:
        "Track previous, current, and next nodes. Save the next node before changing current->next to point backward. Advance both pointers until the list ends. The previous pointer becomes the new head.",
      solution: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);

    head = reverseList(head);

    while (head != nullptr) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;

    return 0;
}`,
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
  },
  {
    userId: 1,
    id: 5,
    title: "REST APIs and HTTP Status Codes",
    body:
      "Understand how a backend exposes resources through HTTP endpoints, how clients send requests, and how status codes communicate the outcome.",
    category: "Backend",
    difficulty: "Medium",
    readTime: "9 min",
    tags: ["HTTP", "REST", "Spring Boot"],
  },
  {
    userId: 1,
    id: 6,
    title: "SQL Joins Explained",
    body:
      "Learn how INNER JOIN, LEFT JOIN, RIGHT JOIN, and self joins combine relational data, with examples from users, orders, and products.",
    category: "Backend",
    difficulty: "Medium",
    readTime: "8 min",
    tags: ["SQL", "DBMS", "Databases"],
  },
  {
    userId: 1,
    id: 7,
    title: "Design a Rate Limiter",
    body:
      "Explore how backend services protect endpoints from excessive requests using fixed-window, sliding-window, and token-bucket strategies.",
    category: "System Design",
    difficulty: "Hard",
    readTime: "12 min",
    tags: ["System Design", "APIs", "Scalability"],
  },
  {
    userId: 1,
    id: 8,
    title: "Find the First Non-Repeating Character",
    body:
      "Use frequency counting to identify the first character that appears exactly once. Compare ordered and unordered map-based approaches.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "5 min",
    tags: ["Strings", "Hash Map", "Frequency"],
    problem: {
      statement:
        "Given a string, return the index of the first character that appears exactly once. Return -1 if no such character exists.",
      examples: [
        {
          input: 's = "leetcode"',
          output: "0",
        },
        {
          input: 's = "aabb"',
          output: "-1",
        },
      ],
      constraints: [
        "1 <= s.length() <= 10^5",
        "s contains lowercase English letters.",
      ],
      approach:
        "Count each character in a first pass. Scan the string again and return the index of the first character whose frequency is one.",
      solution: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int firstUniqChar(string s) {
    vector<int> frequency(26, 0);

    for (char c : s) {
        frequency[c - 'a']++;
    }

    for (int i = 0; i < s.size(); i++) {
        if (frequency[s[i] - 'a'] == 1) {
            return i;
        }
    }

    return -1;
}

int main() {
    cout << firstUniqChar("leetcode") << endl;
    return 0;
}`,
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
  },
  {
    userId: 1,
    id: 9,
    title: "Database Indexing",
    body:
      "Understand how database indexes reduce the work needed to locate rows, why B-tree indexes are common, and when indexes can hurt write performance.",
    category: "Backend",
    difficulty: "Medium",
    readTime: "7 min",
    tags: ["SQL", "Performance", "Databases"],
  },
  {
    userId: 1,
    id: 10,
    title: "Merge Two Sorted Lists",
    body:
      "Combine two sorted linked lists into one sorted list by comparing their current nodes and linking the smaller node at each step.",
    category: "DSA",
    difficulty: "Easy",
    readTime: "8 min",
    tags: ["Linked List", "Pointers", "Algorithms"],
    problem: {
      statement:
        "Given the heads of two sorted singly linked lists, merge them into one sorted list by reusing their nodes.",
      examples: [
        {
          input: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
          output: "[1, 1, 2, 3, 4, 4]",
        },
        {
          input: "list1 = [], list2 = [0]",
          output: "[0]",
        },
      ],
      constraints: [
        "Each list has between 0 and 50 nodes.",
        "-100 <= node value <= 100",
        "Both lists are sorted in ascending order.",
      ],
      approach:
        "Use a dummy node and a tail pointer. Compare the current nodes from both lists, attach the smaller one to tail, and advance that list. Finally, attach whichever list still has remaining nodes.",
      solution: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (a != nullptr && b != nullptr) {
        if (a->val <= b->val) {
            tail->next = a;
            a = a->next;
        } else {
            tail->next = b;
            b = b->next;
        }

        tail = tail->next;
    }

    tail->next = (a != nullptr) ? a : b;
    return dummy.next;
}

int main() {
    ListNode* a = new ListNode(1);
    a->next = new ListNode(2);

    ListNode* b = new ListNode(1);
    b->next = new ListNode(3);

    ListNode* merged = mergeTwoLists(a, b);

    while (merged != nullptr) {
        cout << merged->val << " ";
        merged = merged->next;
    }
    cout << endl;

    return 0;
}`,
      complexity: {
        time: "O(n + m)",
        space: "O(1) auxiliary",
      },
    },
  },
];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    throw new Error("Blog post not found");
  }

  return post;
}

export async function getUser(userId: number): Promise<BlogUser> {
  return {
    id: userId,
    name: "Alex Morgan",
    username: "alexmorgan",
    email: "alex@example.com",
  };
}
