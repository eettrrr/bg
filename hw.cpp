#include <iostream>
#include <string>
#include <math.h>
#include <assert.h>
using namespace std;

class Number {
private:
public:
	virtual string toString() = 0;
	virtual Number* add(Number* other) = 0;
	virtual Number* multiply(Number* other) = 0;
	virtual Number* subtract(Number* other) = 0;
	virtual Number* divide(Number* other) = 0;
	virtual Number* getElement(int loc) = 0;
};

class Decimal : public Number {
private:
	int decimal;
public:
	Decimal(string nu) {
		decimal = atoi(&nu[0]);
	}
	Decimal(int nu) {
		decimal = nu;
	}

	Number* getElement(int loc) {
		int val = decimal / pow(10, loc);
		val %= 10;
		return new Decimal(val);
	}

	int getDecimal() { return decimal; }

	string toString() {
		return to_string(decimal);
	}

	int getLength() {
		return log10(decimal)+1;
	}
	
	Number* add(Number* other) {
		return new Decimal(decimal + ((Decimal*)other)->getDecimal());
	}

	Number* multiply(Number* other) {
		return new Decimal(decimal * ((Decimal*)other)->getDecimal());
	}


	Number* subtract(Number* other) {
		return new Decimal(decimal - ((Decimal*)other)->getDecimal());
	}

	Number* divide(Number* other) {
		return new Decimal(decimal / ((Decimal*)other)->getDecimal());
	}
};

class Engine {
protected:
	int maxLength = 0;
public:
	virtual void show(Number* first, Number* second)=0;
	void setMaxLength(int _len) {
		if (_len > maxLength)
		{
			maxLength = _len;
		}
	}
	void showSpaces(int numOfSpaces)
	{
		assert(numOfSpaces >= 0);
		for (int i = 0; i < numOfSpaces; i++)
		{
			cout << " ";
		}
	}
	void showLine(string str, int leftTo = 0, string prefix = "")
	{	
		cout << prefix;
		showSpaces(maxLength - str.length() - leftTo- prefix.length());
		cout << str << endl;
	}
};

class Multiplier : public Engine {
public:
	void showBars() {
		for (int i = 0; i < maxLength; i++)
		{
			cout << "-";
		}
		cout << endl;
	}
	void show(Number* first, Number* second) {
		setMaxLength(first->toString().length());
		setMaxLength(second->toString().length() + 2);
		Number* result = first->multiply(second);
		setMaxLength(result->toString().length()+1);
		showLine(first->toString());
		showLine(second->toString(),0,"x");
		showBars();
		for (int i = 0; i < second->toString().length(); i++)
		{
			Number* temp = first->multiply(second->getElement(i));
			showLine(temp->toString(),i);
		}
		showBars();
		showLine(result->toString());
	}
};

class Solver {
protected:
	Number* firstNumber;
	Number* secondNumber;
	Engine* engine;
public:
	void setEngine(Engine* en) {
		engine = en;
	}
	void setTwoNumbers(Number* first, Number* second) {
		firstNumber = first;
		secondNumber = second;
	}
	void calculate() {
		engine->show(firstNumber, secondNumber);
	}
};

class temp {
public:
	void operator+(int b) {
		cout << "hi" << endl;
	}
};
int main(int argc, char** argv) {
	Solver solver;
	Decimal* first = new Decimal(0);
	Decimal* second = new Decimal(45);

	Multiplier* multi = new Multiplier();
	solver.setEngine(multi);
	solver.setTwoNumbers(first, second);
	solver.calculate();
	return 0;
}
