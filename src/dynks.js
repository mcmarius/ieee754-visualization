
module.exports = function ( target, getCurrentValue, callback ) {

    target.classList.add("dynks-enabled");

    const options = {
        gap: target.dataset.dynksGap || 5,
        min: !isNaN(parseInt(target.dataset.dynksMin)) ? +target.dataset.dynksMin : -Infinity,
        max: !isNaN(parseInt(target.dataset.dynksMax)) ? +target.dataset.dynksMax : +Infinity
    };

    target.addEventListener("mousedown", function (mouseDownEvent) {
        const initialPosition = mouseDownEvent.pageX;
        let lastValue = Number(getCurrentValue());
        let lastSlot = 0;

        function handleMouseMove(mouseMoveEvent) {
            let currentSlot = (mouseMoveEvent.pageX - initialPosition) / options.gap;
            currentSlot = ~~currentSlot;

            const slotDiff = currentSlot - lastSlot;

            if (slotDiff !== 0) {
                let multiplier = 1;
                if (mouseMoveEvent.shiftKey) multiplier = 10;

                let currentValue = lastValue + slotDiff * multiplier;

                if (currentValue < options.min) {
                    currentValue = options.min;
                    target.classList.add("dynks-out-of-range");
                } else if (currentValue > options.max) {
                    currentValue = options.max;
                    target.classList.add("dynks-out-of-range");
                } else {
                    target.classList.remove("dynks-out-of-range");
                }

                callback( currentValue );

                if (lastValue !== currentValue) {
                    lastValue = currentValue;
                    lastSlot = currentSlot;
                }
            }

            mouseMoveEvent.preventDefault();
        }

        function handleMouseUp() {
            target.classList.remove("dynks-active");
            target.classList.remove("dynks-out-of-range");
            document.documentElement.classList.remove("dynks-moving");
            document.removeEventListener("mousemove", handleMouseMove, false );
            document.removeEventListener("mouseup", handleMouseUp, false );
        }

        document.addEventListener( "mousemove", handleMouseMove, false );
        document.addEventListener( "mouseup", handleMouseUp, false );

        target.classList.add("dynks-active");
        document.documentElement.classList.add("dynks-moving");

        mouseDownEvent.preventDefault();
    }, false );

};
