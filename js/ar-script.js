const modelPaths = {
    plant: 'models/3D Plant.fbx',
    tank: 'models/3D Tank.fbx',
    full: 'models/FULL 3D.fbx'
};

let currentModel = null;
let currentButton = null;

function loadModel(modelName, button) {
    const loader = new THREE.FBXLoader();
    loader.load(modelPaths[modelName], (fbx) => {
        if (currentModel) {
            document.querySelector('#ar-model').removeObject3D('mesh');
        }
        fbx.scale.set(0.01, 0.01, 0.01);
        document.querySelector('#ar-model').setObject3D('mesh', fbx);
        currentModel = fbx;

        // Update button styles
        if (currentButton) {
            currentButton.style.border = '2px solid white';
        }
        button.style.border = '2px solid #00ff00';
        currentButton = button;
    });
}

document.querySelectorAll('.model-button').forEach(button => {
    button.addEventListener('click', () => {
        const modelName = button.getAttribute('data-model');
        loadModel(modelName, button);
    });
});

// Load the plant model by default
const defaultButton = document.querySelector('[data-model="plant"]');
loadModel('plant', defaultButton);
