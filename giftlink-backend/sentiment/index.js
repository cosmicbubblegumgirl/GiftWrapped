/* jshint esversion: 11, node: true */
const natural = require('natural');

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer('English', stemmer, 'afinn');

function getSentimentScore(text = '') {
  return analyzer.getSentiment(String(text).split(/\s+/));
}

module.exports = {
  getSentimentScore
};
