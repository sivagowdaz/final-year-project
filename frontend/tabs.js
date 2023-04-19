class Window {
    constructor(window, windowName, windowNum, next = null) {
        this.window = window;
        this.windowName = windowName;
        this.windowNum = windowNum;
        this.next = next;
    }
}

class WindowsList {
    constructor() {
        this.head = null;
        this.length = 1;
        this.currentWindow = null;
    }

    insertEnd (window, windowName) {
        if(this.head == null) {
            this.head = new Window(window, windowName, this.length);
            this.currentWindow = this.head.window;
        } else {
            let cur = this.head
            while(cur.next != null) {
                cur = cur.next;
            }
            cur.next = new Window(window, windowName, this.length);
            this.currentWindow = cur.next.window;
        }
        this.length++;
    }

    printData () {
        let cur = this.head
        let dataList = []
        while(cur) {
            dataList.push({windowName:cur.windowName, windowNum:cur.windowNum})
            cur = cur.next
        }
        return dataList;
    }

    getTopWindow () {
        let cur = this.head;
        while(cur.next != null) {
            cur = cur.next;
        }
        return cur;
    }

    getWindowByPos (position) {
        let cur = this.head;
        while(cur) {
            if(cur.windowNum == position) {
                return cur
            }
            cur = cur.next
        }
    }

    destroyAllWindows () {
        let cur = this.head;
        while(cur) {
            cur.window.close();
            cur = cur.next
        }
        this.currentWindow = null;
        this.head = null;
    }

    comeBack () {
        let prevWindow = this.getWindowByPos(this.length - 2);
        this.currentWindow = prevWindow.window;
        prevWindow.window.show();
        let topWindow = this.getTopWindow();
        topWindow.window.close();
        prevWindow.next = null;
        this.length--;
    }
}

module.exports = {WindowsList}

