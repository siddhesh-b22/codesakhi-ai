
import { Problem } from '../types';

// This acts as your MongoDB database
export const ALL_PROBLEMS: Problem[] = [
  {
    id: 'q1',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Arrays',
    companies: ['google', 'meta', 'amazon'],
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. Complexity must be O(log(m+n)).',
    examples: [{ input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' }],
    testCases: [{ input: [[1, 3], [2]], expected: 2.0 }],
    constraints: ['nums1.length == m', 'nums2.length == n'],
    starterCode: {
      'javascript': 'var findMedianSortedArrays = function(nums1, nums2) {\n    \n};',
      'python': 'class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        pass'
    },
    tags: ['Binary Search', 'Arrays']
  },
  {
    id: 'q2',
    title: 'Two Sum II',
    difficulty: 'Easy',
    category: 'Arrays',
    companies: ['amazon', 'infosys', 'tcs'],
    description: 'Find two numbers such that they add up to a specific target number.',
    examples: [{ input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' }],
    testCases: [{ input: [[2, 7, 11, 15], 9], expected: [1, 2] }],
    constraints: ['2 <= numbers.length <= 3 * 10^4'],
    starterCode: {
      'javascript': 'var twoSum = function(numbers, target) {\n    \n};',
      'python': 'class Solution:\n    def twoSum(self, numbers, target):\n        pass'
    },
    tags: ['Two Pointers', 'Arrays']
  },
  {
    id: 'q3',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Strings',
    companies: ['google', 'zomato', 'meta'],
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [{ input: 's = "babad"', output: '"bab"' }],
    testCases: [{ input: ["babad"], expected: "bab" }],
    constraints: ['1 <= s.length <= 1000'],
    starterCode: {
      'javascript': 'var longestPalindrome = function(s) {\n    \n};',
      'python': 'class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass'
    },
    tags: ['Strings', 'DP']
  },
  {
    id: 'q4',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    companies: ['meta', 'amazon', 'zomato'],
    description: 'Return the level order traversal of nodes\' values.',
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    testCases: [],
    constraints: ['0 <= nodes <= 2000'],
    starterCode: {
      'javascript': 'var levelOrder = function(root) {\n    \n};',
      'python': 'class Solution:\n    def levelOrder(self, root):\n        pass'
    },
    tags: ['Trees', 'BFS']
  },
  {
    id: 'q5',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked List',
    companies: ['google', 'meta'],
    description: 'Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [{ input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }],
    testCases: [],
    constraints: ['k == lists.length', '0 <= k <= 10^4'],
    starterCode: {
      'javascript': 'var mergeKLists = function(lists) {\n    \n};',
      'python': 'class Solution:\n    def mergeKLists(self, lists):\n        pass'
    },
    tags: ['Heap', 'Linked List']
  },
  // Adding more dummy problems to simulate a large database
  ...Array.from({ length: 95 }).map((_, i) => ({
    id: `q_extra_${i}`,
    title: `Logical Challenge #${i + 6}`,
    difficulty: (['Easy', 'Medium', 'Hard'] as const)[Math.floor(Math.random() * 3)],
    category: (['Arrays', 'Strings', 'Linked List', 'Trees', 'DP', 'Recursion', 'Graphs', 'Math'] as const)[Math.floor(Math.random() * 8)],
    companies: [(['google', 'amazon', 'meta', 'zomato', 'tcs', 'infosys'] as const)[Math.floor(Math.random() * 6)]],
    description: 'A specialized logical problem focusing on memory efficiency and optimal runtime.',
    examples: [{ input: '...', output: '...' }],
    testCases: [],
    constraints: ['Time: 1s', 'Space: 256MB'],
    starterCode: { 'javascript': '// Write logic here\n', 'python': '# Write logic here\n' },
    tags: ['Logic', 'Interview']
  }))
];

export const problemService = {
  getProblemById: (id: string) => ALL_PROBLEMS.find(p => p.id === id),
  getProblemsByCompany: (companyId: string) => ALL_PROBLEMS.filter(p => p.companies.includes(companyId.toLowerCase())),
  getProblemsByCategory: (category: string) => ALL_PROBLEMS.filter(p => p.category === category),
  getAllProblems: () => ALL_PROBLEMS,
  getCategories: () => Array.from(new Set(ALL_PROBLEMS.map(p => p.category)))
};
