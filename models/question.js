'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Card Id Required !"
        },
        notNull: {
          msg: "Card Id Required !"
        }
      }
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Card Name Required !"
        },
        notNull: {
          msg: "Card Name Required !"
        }
      }
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Question Required !"
        },
        notNull: {
          msg: "Question Required !"
        }
      }
    },
    firstClue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First Clue Required !"
        },
        notNull: {
          msg: "First Clue Required !"
        }
      }
    },
    secondClue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Second Clue Required !"
        },
        notNull: {
          msg: "Second Clue Required !"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};