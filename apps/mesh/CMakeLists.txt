#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousMesh)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#---------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    cgltf
    GIT_REPOSITORY https://github.com/jkuhlmann/cgltf.git
    GIT_TAG v1.15
)
FetchContent_MakeAvailable(cgltf)

FetchContent_Declare(
    cglm
    GIT_REPOSITORY https://github.com/recp/cglm.git
    GIT_TAG v0.9.6
)
FetchContent_MakeAvailable(cglm)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(msh2gltf
    src/msh2gltf.c
)

target_include_directories(msh2gltf PUBLIC
    ${cgltf_SOURCE_DIR}
)

target_link_libraries(msh2gltf
    m
    cglm
    vicious
)
